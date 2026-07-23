"use server";

import { z } from "zod";
import { resolveDataSource } from "@/lib/data/repository";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/** Schéma de validation du bail créé par le wizard (partagé serveur). */
const leaseInput = z.object({
  leaseType: z.enum([
    "residential_bare",
    "residential_furnished",
    "commercial_369",
    "professional",
    "derogatory",
    "civil",
  ]),
  tenantId: z.string().uuid(),
  assetId: z.string().uuid(),
  unitIds: z.array(z.string().uuid()).min(1),
  reference: z.string().optional(),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  noticePeriodMonths: z.number().int().nonnegative().optional(),
  depositAmount: z.number().nonnegative().optional(),
  baseRent: z.number().nonnegative(),
  chargesProvision: z.number().nonnegative().optional(),
  indexType: z.enum(["irl", "ilc", "ilat", "none"]).default("none"),
  baseIndexValue: z.number().optional(),
  baseIndexPeriod: z.string().optional(),
  revisionMonth: z.number().int().min(1).max(12).optional(),
  notes: z.string().optional(),
});

export type LeaseInput = z.infer<typeof leaseInput>;

export type CreateLeaseResult =
  | { ok: true; demo: boolean; leaseId?: string }
  | { ok: false; error: string };

/**
 * Crée un bail (statut brouillon). En mode démo, ne persiste pas (données en
 * mémoire) mais valide la saisie. En mode Supabase, insère bail + lots + charges.
 */
export async function createLease(raw: LeaseInput): Promise<CreateLeaseResult> {
  const parsed = leaseInput.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "invalid" };
  }
  const input = parsed.data;

  if (resolveDataSource() === "demo") {
    // Mode démo : la validation a réussi, mais rien n'est enregistré.
    return { ok: true, demo: true };
  }

  const supabase = await createSupabaseServerClient();

  // organization_id dérivé de l'actif (RLS garantit que l'utilisateur y a accès).
  const { data: asset, error: assetErr } = await supabase
    .from("assets")
    .select("organization_id")
    .eq("id", input.assetId)
    .maybeSingle();
  if (assetErr || !asset) {
    return { ok: false, error: "asset_not_found" };
  }

  const { data: lease, error: leaseErr } = await supabase
    .from("leases")
    .insert({
      organization_id: asset.organization_id,
      asset_id: input.assetId,
      tenant_id: input.tenantId,
      reference: input.reference ?? null,
      lease_type: input.leaseType,
      status: "draft",
      start_date: input.startDate,
      end_date: input.endDate ?? null,
      notice_period_months: input.noticePeriodMonths ?? null,
      deposit_amount: input.depositAmount ?? null,
      index_type: input.indexType,
      base_index_value: input.baseIndexValue ?? null,
      base_index_period: input.baseIndexPeriod ?? null,
      revision_month: input.revisionMonth ?? null,
      notes: input.notes ?? null,
    })
    .select("id")
    .single();
  if (leaseErr || !lease) {
    return { ok: false, error: leaseErr?.message ?? "insert_failed" };
  }

  const { error: unitsErr } = await supabase
    .from("lease_units")
    .insert(input.unitIds.map((unit_id) => ({ lease_id: lease.id, unit_id })));
  if (unitsErr) return { ok: false, error: unitsErr.message };

  const charges = [
    { lease_id: lease.id, charge_type: "base_rent", label: null, amount: input.baseRent, periodicity: "monthly" },
    ...(input.chargesProvision
      ? [{ lease_id: lease.id, charge_type: "charges_provision", label: null, amount: input.chargesProvision, periodicity: "monthly" }]
      : []),
  ];
  const { error: chargesErr } = await supabase.from("lease_charges").insert(charges);
  if (chargesErr) return { ok: false, error: chargesErr.message };

  return { ok: true, demo: false, leaseId: lease.id };
}
