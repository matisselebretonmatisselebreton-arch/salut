/**
 * Implémentation Supabase du dépôt (mode `supabase`).
 * Utilise le client serveur (JWT utilisateur) → les policies RLS filtrent
 * automatiquement par organisation (§6).
 *
 * Module 2 : l'occupation des lots est dérivée des baux actifs via la couche
 * core (isLeaseActiveOn / occupiedUnitIds) — même logique qu'en mode démo.
 */

import "server-only";
import {
  computeLeaseDeadlines,
  computeOccupancy,
  monthlyEquivalent,
  occupiedUnitIds,
  outstandingAmount,
  paymentStatus,
  type ChargePeriodicity,
  type LeaseWithUnits,
} from "@/core";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { AssetRepository } from "./repository";
import type {
  AssetDTO,
  DeadlineDTO,
  InvoiceDetailDTO,
  InvoiceSummaryDTO,
  InvoicingSummary,
  LeaseChargeDTO,
  LeaseDetailDTO,
  LeaseSummaryDTO,
  PortfolioDTO,
  TenantDetailDTO,
  TenantDTO,
  UnitDTO,
} from "./types";

const ASSET_SELECT = `
  id, portfolio_id, name, asset_type,
  address_line1, postal_code, city, country,
  surface_useful, surface_gla,
  acquisition_date, acquisition_value, net_book_value,
  construction_year, epc_rating, certifications, cover_image_url,
  units:units ( id, reference, floor, surface, is_rentable, archived_at )
`;

const LEASE_SELECT = `
  id, reference, lease_type, status, asset_id, tenant_id,
  start_date, end_date, notice_period_months, deposit_amount,
  index_type, base_index_value, base_index_period, revision_month,
  asset:assets ( name ),
  tenant:tenants ( display_name ),
  lease_units ( unit_id, unit:units ( reference ) ),
  lease_charges ( charge_type, label, amount, periodicity )
`;

const INVOICE_SELECT = `
  id, number, type, status, period_start, period_end, issue_date, due_date,
  vat_rate, total_ht, total_vat, total_ttc,
  lease:leases ( id, reference, asset:assets ( name ), tenant:tenants ( display_name ) ),
  invoice_lines ( label, amount ),
  payments ( id, amount, paid_on, method, reference )
`;

/* eslint-disable @typescript-eslint/no-explicit-any */

function mapInvoiceSummary(row: any): InvoiceSummaryDTO {
  const ttc = Number(row.total_ttc);
  const paid = (row.payments ?? []).reduce((s: number, p: any) => s + Number(p.amount), 0);
  return {
    id: row.id,
    number: row.number,
    type: row.type,
    leaseId: row.lease?.id ?? row.lease_id,
    leaseReference: row.lease?.reference ?? null,
    tenantName: row.lease?.tenant?.display_name ?? "—",
    assetName: row.lease?.asset?.name ?? "—",
    periodStart: row.period_start,
    periodEnd: row.period_end,
    issueDate: row.issue_date,
    dueDate: row.due_date,
    totalTtc: ttc,
    paidAmount: paid,
    outstanding: outstandingAmount(ttc, paid),
    paymentStatus: paymentStatus(ttc, paid, row.due_date),
  };
}

function mapInvoiceDetail(row: any): InvoiceDetailDTO {
  return {
    ...mapInvoiceSummary(row),
    totalHt: Number(row.total_ht),
    totalVat: Number(row.total_vat),
    vatRate: Number(row.vat_rate),
    lines: (row.invoice_lines ?? []).map((l: any) => ({
      label: l.label,
      amount: Number(l.amount),
    })),
    payments: (row.payments ?? []).map((p: any) => ({
      id: p.id,
      amount: Number(p.amount),
      paidOn: p.paid_on,
      method: p.method,
      reference: p.reference,
    })),
  };
}

/** Récupère l'ensemble des lots occupés d'un actif à partir de ses baux actifs. */
async function occupiedIdsForAsset(
  supabase: SupabaseClient,
  assetId: string,
): Promise<Set<string>> {
  const { data, error } = await supabase
    .from("leases")
    .select("status, start_date, end_date, lease_units ( unit_id )")
    .eq("asset_id", assetId)
    .is("archived_at", null);
  if (error) throw error;

  const coverage: LeaseWithUnits[] = (data ?? []).map((l: any) => ({
    status: l.status,
    startDate: l.start_date,
    endDate: l.end_date,
    unitIds: (l.lease_units ?? []).map((lu: any) => lu.unit_id),
  }));
  return occupiedUnitIds(coverage);
}

function mapAsset(row: any, occupied: Set<string>): AssetDTO {
  const units: UnitDTO[] = (row.units ?? [])
    .filter((u: any) => u.archived_at == null)
    .map((u: any) => ({
      id: u.id,
      reference: u.reference,
      floor: u.floor,
      surface: u.surface,
      isRentable: u.is_rentable,
      isOccupied: occupied.has(u.id),
    }));
  return {
    id: row.id,
    portfolioId: row.portfolio_id,
    name: row.name,
    assetType: row.asset_type,
    addressLine1: row.address_line1,
    postalCode: row.postal_code,
    city: row.city,
    country: row.country,
    surfaceUseful: row.surface_useful,
    surfaceGla: row.surface_gla,
    acquisitionDate: row.acquisition_date,
    acquisitionValue: row.acquisition_value,
    netBookValue: row.net_book_value,
    constructionYear: row.construction_year,
    epcRating: row.epc_rating,
    certifications: row.certifications ?? [],
    coverImageUrl: row.cover_image_url,
    units,
    occupancy: computeOccupancy(units),
  };
}

function mapLeaseSummary(row: any): LeaseSummaryDTO {
  const charges = (row.lease_charges ?? []) as any[];
  const monthlyTotal = charges.reduce(
    (s, c) => s + monthlyEquivalent(Number(c.amount), c.periodicity as ChargePeriodicity),
    0,
  );
  return {
    id: row.id,
    reference: row.reference,
    leaseType: row.lease_type,
    status: row.status,
    assetId: row.asset_id,
    assetName: row.asset?.name ?? "—",
    tenantId: row.tenant_id,
    tenantName: row.tenant?.display_name ?? "—",
    startDate: row.start_date,
    endDate: row.end_date,
    monthlyTotal,
    unitCount: (row.lease_units ?? []).length,
  };
}

function mapLeaseDetail(row: any): LeaseDetailDTO {
  const charges: LeaseChargeDTO[] = (row.lease_charges ?? []).map((c: any) => ({
    chargeType: c.charge_type,
    label: c.label,
    amount: Number(c.amount),
    periodicity: c.periodicity,
  }));
  return {
    ...mapLeaseSummary(row),
    noticePeriodMonths: row.notice_period_months,
    depositAmount: row.deposit_amount,
    indexType: row.index_type,
    baseIndexValue: row.base_index_value,
    baseIndexPeriod: row.base_index_period,
    revisionMonth: row.revision_month,
    units: (row.lease_units ?? []).map((lu: any) => ({
      id: lu.unit_id,
      reference: lu.unit?.reference ?? "—",
    })),
    charges,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export class SupabaseRepository implements AssetRepository {
  async listPortfolios(): Promise<PortfolioDTO[]> {
    const supabase = await createSupabaseServerClient();
    const { data: portfolios, error } = await supabase
      .from("portfolios")
      .select("id, name, description")
      .is("archived_at", null)
      .order("name");
    if (error) throw error;

    const result: PortfolioDTO[] = [];
    for (const p of portfolios ?? []) {
      const assets = await this.listAssetsByPortfolio(p.id);
      const allUnits = assets.flatMap((a) => a.units);
      result.push({
        id: p.id,
        name: p.name,
        description: p.description,
        assetCount: assets.length,
        totalValue: assets.reduce((s, a) => s + (a.netBookValue ?? 0), 0),
        occupancyByArea: computeOccupancy(allUnits).byArea,
      });
    }
    return result;
  }

  async getPortfolio(id: string): Promise<PortfolioDTO | null> {
    const list = await this.listPortfolios();
    return list.find((p) => p.id === id) ?? null;
  }

  async listAssetsByPortfolio(portfolioId: string): Promise<AssetDTO[]> {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("assets")
      .select(ASSET_SELECT)
      .eq("portfolio_id", portfolioId)
      .is("archived_at", null)
      .order("name");
    if (error) throw error;

    const result: AssetDTO[] = [];
    for (const row of data ?? []) {
      const occupied = await occupiedIdsForAsset(supabase, row.id);
      result.push(mapAsset(row, occupied));
    }
    return result;
  }

  async getAsset(id: string): Promise<AssetDTO | null> {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("assets")
      .select(ASSET_SELECT)
      .eq("id", id)
      .is("archived_at", null)
      .maybeSingle();
    if (error) throw error;
    if (!data) return null;
    const occupied = await occupiedIdsForAsset(supabase, data.id);
    return mapAsset(data, occupied);
  }

  async listTenants(): Promise<TenantDTO[]> {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("tenants")
      .select("id, kind, display_name, email, leases:leases(status)")
      .is("archived_at", null)
      .order("display_name");
    if (error) throw error;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    return (data ?? []).map((t: any) => ({
      id: t.id,
      kind: t.kind,
      displayName: t.display_name,
      email: t.email,
      activeLeaseCount: (t.leases ?? []).filter(
        (l: any) => l.status === "active",
      ).length,
    }));
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }

  async getTenant(id: string): Promise<TenantDetailDTO | null> {
    const supabase = await createSupabaseServerClient();
    const { data: t, error } = await supabase
      .from("tenants")
      .select("id, kind, display_name, email")
      .eq("id", id)
      .is("archived_at", null)
      .maybeSingle();
    if (error) throw error;
    if (!t) return null;

    const { data: leases, error: le } = await supabase
      .from("leases")
      .select(LEASE_SELECT)
      .eq("tenant_id", id)
      .is("archived_at", null)
      .order("start_date", { ascending: false });
    if (le) throw le;

    const summaries = (leases ?? []).map(mapLeaseSummary);
    return {
      id: t.id,
      kind: t.kind,
      displayName: t.display_name,
      email: t.email,
      activeLeaseCount: summaries.filter((l) => l.status === "active").length,
      leases: summaries,
    };
  }

  async listLeases(): Promise<LeaseSummaryDTO[]> {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("leases")
      .select(LEASE_SELECT)
      .is("archived_at", null)
      .order("start_date", { ascending: false });
    if (error) throw error;
    return (data ?? []).map(mapLeaseSummary);
  }

  async getLease(id: string): Promise<LeaseDetailDTO | null> {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("leases")
      .select(LEASE_SELECT)
      .eq("id", id)
      .is("archived_at", null)
      .maybeSingle();
    if (error) throw error;
    return data ? mapLeaseDetail(data) : null;
  }

  async listLeasesByAsset(assetId: string): Promise<LeaseSummaryDTO[]> {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("leases")
      .select(LEASE_SELECT)
      .eq("asset_id", assetId)
      .is("archived_at", null)
      .order("start_date", { ascending: false });
    if (error) throw error;
    return (data ?? []).map(mapLeaseSummary);
  }

  async listUpcomingDeadlines(horizonMonths = 18): Promise<DeadlineDTO[]> {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("leases")
      .select(
        `id, reference, status, start_date, end_date, notice_period_months,
         revision_month, asset:assets ( name ), tenant:tenants ( display_name )`,
      )
      .is("archived_at", null);
    if (error) throw error;

    const now = new Date();
    const out: DeadlineDTO[] = [];
    /* eslint-disable @typescript-eslint/no-explicit-any */
    for (const l of (data ?? []) as any[]) {
      const deadlines = computeLeaseDeadlines(
        {
          status: l.status,
          startDate: l.start_date,
          endDate: l.end_date,
          noticePeriodMonths: l.notice_period_months,
          revisionMonth: l.revision_month,
        },
        now,
        horizonMonths,
      );
      for (const d of deadlines) {
        out.push({
          leaseId: l.id,
          leaseReference: l.reference,
          tenantName: l.tenant?.display_name ?? "—",
          assetName: l.asset?.name ?? "—",
          type: d.type,
          date: d.date,
        });
      }
    }
    /* eslint-enable @typescript-eslint/no-explicit-any */
    return out.sort((a, b) => a.date.localeCompare(b.date));
  }

  async listInvoices(): Promise<InvoiceSummaryDTO[]> {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("invoices")
      .select(INVOICE_SELECT)
      .is("archived_at", null)
      .order("period_start", { ascending: false });
    if (error) throw error;
    return (data ?? []).map(mapInvoiceSummary);
  }

  async getInvoice(id: string): Promise<InvoiceDetailDTO | null> {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("invoices")
      .select(INVOICE_SELECT)
      .eq("id", id)
      .is("archived_at", null)
      .maybeSingle();
    if (error) throw error;
    return data ? mapInvoiceDetail(data) : null;
  }

  async invoicingSummary(): Promise<InvoicingSummary> {
    const invoices = await this.listInvoices();
    return {
      totalOutstanding: invoices.reduce((s, i) => s + i.outstanding, 0),
      overdueCount: invoices.filter((i) => i.paymentStatus === "overdue").length,
      paidCount: invoices.filter((i) => i.paymentStatus === "paid").length,
      pendingCount: invoices.filter(
        (i) => i.paymentStatus === "pending" || i.paymentStatus === "partial",
      ).length,
    };
  }
}
