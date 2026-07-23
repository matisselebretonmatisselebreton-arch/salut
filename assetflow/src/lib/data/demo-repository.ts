/**
 * Implémentation en mémoire du dépôt (mode `demo`).
 * Assemble les DTOs à partir du seed et calcule les KPI via la couche `core`.
 *
 * Module 2 : l'occupation des lots est DÉRIVÉE des baux actifs
 * (occupiedUnitIds) — plus aucun booléen d'occupation saisi à la main.
 */

import {
  computeLeaseDeadlines,
  computeOccupancy,
  invoiceTotals,
  monthlyEquivalent,
  occupiedUnitIds,
  outstandingAmount,
  paymentStatus,
  type LeaseWithUnits,
} from "@/core";
import type { AssetRepository } from "./repository";
import type {
  AssetDTO,
  DeadlineDTO,
  InvoiceDetailDTO,
  InvoiceSummaryDTO,
  InvoicingSummary,
  LeaseDetailDTO,
  LeaseSummaryDTO,
  PortfolioDTO,
  TenantDetailDTO,
  TenantDTO,
  UnitDTO,
} from "./types";
import {
  demoAssets,
  demoLeases,
  demoPortfolios,
  demoTenants,
  demoUnits,
  type RawAsset,
  type RawLease,
} from "./demo-seed";
import { buildDemoInvoices, type DemoInvoice } from "./demo-invoices";

// Ensemble des lots occupés aujourd'hui, dérivé une fois des baux actifs.
const leaseCoverage: LeaseWithUnits[] = demoLeases.map((l) => ({
  status: l.status,
  startDate: l.startDate,
  endDate: l.endDate,
  unitIds: l.unitIds,
}));
const occupiedIds = occupiedUnitIds(leaseCoverage);

function unitsOf(assetId: string): UnitDTO[] {
  return demoUnits
    .filter((u) => u.assetId === assetId)
    .map(({ id, reference, floor, surface, isRentable }) => ({
      id,
      reference,
      floor,
      surface,
      isRentable,
      isOccupied: occupiedIds.has(id), // dérivé des baux
    }));
}

function assetName(assetId: string): string {
  return demoAssets.find((a) => a.id === assetId)?.name ?? "—";
}

function tenantName(tenantId: string): string {
  return demoTenants.find((t) => t.id === tenantId)?.displayName ?? "—";
}

function monthlyTotal(lease: RawLease): number {
  return lease.charges.reduce(
    (sum, c) => sum + monthlyEquivalent(c.amount, c.periodicity),
    0,
  );
}

function toAssetDTO(raw: RawAsset): AssetDTO {
  const units = unitsOf(raw.id);
  return {
    id: raw.id,
    portfolioId: raw.portfolioId,
    name: raw.name,
    assetType: raw.assetType,
    addressLine1: raw.addressLine1,
    postalCode: raw.postalCode,
    city: raw.city,
    country: raw.country,
    surfaceUseful: raw.surfaceUseful,
    surfaceGla: raw.surfaceGla,
    acquisitionDate: raw.acquisitionDate,
    acquisitionValue: raw.acquisitionValue,
    netBookValue: raw.netBookValue,
    constructionYear: raw.constructionYear,
    epcRating: raw.epcRating,
    certifications: raw.certifications,
    coverImageUrl: raw.coverImageUrl,
    units,
    occupancy: computeOccupancy(units),
  };
}

function toPortfolioDTO(id: string): PortfolioDTO {
  const p = demoPortfolios.find((x) => x.id === id)!;
  const assets = demoAssets.filter((a) => a.portfolioId === id).map(toAssetDTO);
  const allUnits = assets.flatMap((a) => a.units);
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    assetCount: assets.length,
    totalValue: assets.reduce((sum, a) => sum + (a.netBookValue ?? 0), 0),
    occupancyByArea: computeOccupancy(allUnits).byArea,
  };
}

function toLeaseSummary(lease: RawLease): LeaseSummaryDTO {
  return {
    id: lease.id,
    reference: lease.reference,
    leaseType: lease.leaseType,
    status: lease.status,
    assetId: lease.assetId,
    assetName: assetName(lease.assetId),
    tenantId: lease.tenantId,
    tenantName: tenantName(lease.tenantId),
    startDate: lease.startDate,
    endDate: lease.endDate,
    monthlyTotal: monthlyTotal(lease),
    unitCount: lease.unitIds.length,
  };
}

function toLeaseDetail(lease: RawLease): LeaseDetailDTO {
  return {
    ...toLeaseSummary(lease),
    noticePeriodMonths: lease.noticePeriodMonths,
    depositAmount: lease.depositAmount,
    indexType: lease.indexType,
    baseIndexValue: lease.baseIndexValue,
    baseIndexPeriod: lease.baseIndexPeriod,
    revisionMonth: lease.revisionMonth,
    units: lease.unitIds.map((uid) => {
      const u = demoUnits.find((x) => x.id === uid);
      return { id: uid, reference: u?.reference ?? "—" };
    }),
    charges: lease.charges.map((c) => ({
      chargeType: c.chargeType,
      label: c.label,
      amount: c.amount,
      periodicity: c.periodicity,
    })),
  };
}

function toTenantDTO(id: string): TenantDTO {
  const t = demoTenants.find((x) => x.id === id)!;
  const activeLeaseCount = demoLeases.filter(
    (l) => l.tenantId === id && l.status === "active",
  ).length;
  return {
    id: t.id,
    kind: t.kind,
    displayName: t.displayName,
    email: t.email,
    activeLeaseCount,
  };
}

// Quittances de démo, construites une fois à partir des baux actifs.
const demoInvoices: DemoInvoice[] = buildDemoInvoices();

function leaseRef(leaseId: string): string | null {
  return demoLeases.find((l) => l.id === leaseId)?.reference ?? null;
}
function leaseAssetId(leaseId: string): string {
  return demoLeases.find((l) => l.id === leaseId)?.assetId ?? "";
}
function leaseTenantId(leaseId: string): string {
  return demoLeases.find((l) => l.id === leaseId)?.tenantId ?? "";
}

function toInvoiceSummary(inv: DemoInvoice): InvoiceSummaryDTO {
  const totals = invoiceTotals(inv.lines, inv.vatRate);
  const paid = inv.payments.reduce((s, p) => s + p.amount, 0);
  return {
    id: inv.id,
    number: inv.number,
    type: inv.type,
    leaseId: inv.leaseId,
    leaseReference: leaseRef(inv.leaseId),
    tenantName: tenantName(leaseTenantId(inv.leaseId)),
    assetName: assetName(leaseAssetId(inv.leaseId)),
    periodStart: inv.periodStart,
    periodEnd: inv.periodEnd,
    issueDate: inv.issueDate,
    dueDate: inv.dueDate,
    totalTtc: totals.ttc,
    paidAmount: paid,
    outstanding: outstandingAmount(totals.ttc, paid),
    paymentStatus: paymentStatus(totals.ttc, paid, inv.dueDate),
  };
}

function toInvoiceDetail(inv: DemoInvoice): InvoiceDetailDTO {
  const totals = invoiceTotals(inv.lines, inv.vatRate);
  return {
    ...toInvoiceSummary(inv),
    totalHt: totals.ht,
    totalVat: totals.vat,
    vatRate: inv.vatRate,
    lines: inv.lines,
    payments: inv.payments.map((p) => ({
      id: p.id,
      amount: p.amount,
      paidOn: p.paidOn,
      method: p.method,
      reference: p.reference,
    })),
  };
}

export class DemoRepository implements AssetRepository {
  async listPortfolios(): Promise<PortfolioDTO[]> {
    return demoPortfolios.map((p) => toPortfolioDTO(p.id));
  }

  async getPortfolio(id: string): Promise<PortfolioDTO | null> {
    return demoPortfolios.some((p) => p.id === id) ? toPortfolioDTO(id) : null;
  }

  async listAssetsByPortfolio(portfolioId: string): Promise<AssetDTO[]> {
    return demoAssets
      .filter((a) => a.portfolioId === portfolioId)
      .map(toAssetDTO);
  }

  async getAsset(id: string): Promise<AssetDTO | null> {
    const raw = demoAssets.find((a) => a.id === id);
    return raw ? toAssetDTO(raw) : null;
  }

  async listTenants(): Promise<TenantDTO[]> {
    return demoTenants.map((t) => toTenantDTO(t.id));
  }

  async getTenant(id: string): Promise<TenantDetailDTO | null> {
    if (!demoTenants.some((t) => t.id === id)) return null;
    const leases = demoLeases
      .filter((l) => l.tenantId === id)
      .map(toLeaseSummary);
    return { ...toTenantDTO(id), leases };
  }

  async listLeases(): Promise<LeaseSummaryDTO[]> {
    return demoLeases.map(toLeaseSummary);
  }

  async getLease(id: string): Promise<LeaseDetailDTO | null> {
    const raw = demoLeases.find((l) => l.id === id);
    return raw ? toLeaseDetail(raw) : null;
  }

  async listLeasesByAsset(assetId: string): Promise<LeaseSummaryDTO[]> {
    return demoLeases.filter((l) => l.assetId === assetId).map(toLeaseSummary);
  }

  async listUpcomingDeadlines(horizonMonths = 18): Promise<DeadlineDTO[]> {
    const out: DeadlineDTO[] = [];
    for (const lease of demoLeases) {
      const deadlines = computeLeaseDeadlines(
        {
          status: lease.status,
          startDate: lease.startDate,
          endDate: lease.endDate,
          noticePeriodMonths: lease.noticePeriodMonths,
          revisionMonth: lease.revisionMonth,
        },
        new Date(),
        horizonMonths,
      );
      for (const d of deadlines) {
        out.push({
          leaseId: lease.id,
          leaseReference: lease.reference,
          tenantName: tenantName(lease.tenantId),
          assetName: assetName(lease.assetId),
          type: d.type,
          date: d.date,
        });
      }
    }
    return out.sort((a, b) => a.date.localeCompare(b.date));
  }

  async listInvoices(): Promise<InvoiceSummaryDTO[]> {
    return demoInvoices
      .map(toInvoiceSummary)
      .sort((a, b) => b.periodStart.localeCompare(a.periodStart));
  }

  async getInvoice(id: string): Promise<InvoiceDetailDTO | null> {
    const inv = demoInvoices.find((i) => i.id === id);
    return inv ? toInvoiceDetail(inv) : null;
  }

  async invoicingSummary(): Promise<InvoicingSummary> {
    const summaries = demoInvoices.map(toInvoiceSummary);
    return {
      totalOutstanding: summaries.reduce((s, i) => s + i.outstanding, 0),
      overdueCount: summaries.filter((i) => i.paymentStatus === "overdue").length,
      paidCount: summaries.filter((i) => i.paymentStatus === "paid").length,
      pendingCount: summaries.filter(
        (i) => i.paymentStatus === "pending" || i.paymentStatus === "partial",
      ).length,
    };
  }
}
