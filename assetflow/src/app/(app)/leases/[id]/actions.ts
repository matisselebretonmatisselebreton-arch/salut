"use server";

import { z } from "zod";
import { reviseRent } from "@/core";
import { resolveDataSource } from "@/lib/data/repository";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const input = z.object({
  leaseId: z.string().uuid(),
  baseRent: z.number().positive(),
  baseIndex: z.number().positive(),
  newIndex: z.number().positive(),
});

export type RecordIndexationInput = z.infer<typeof input>;

export type RecordIndexationResult =
  | { ok: true; demo: boolean; newRent: number }
  | { ok: false; error: string };

/**
 * Enregistre une révision de loyer. Le calcul passe par le moteur core
 * (reviseRent) — jamais recalculé côté client pour l'enregistrement.
 * En mode démo : non persisté. En Supabase : trace dans lease_index_applications.
 */
export async function recordIndexation(
  raw: RecordIndexationInput,
): Promise<RecordIndexationResult> {
  const parsed = input.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "invalid" };
  const { leaseId, baseRent, baseIndex, newIndex } = parsed.data;

  const revision = reviseRent(baseRent, baseIndex, newIndex);

  if (resolveDataSource() === "demo") {
    return { ok: true, demo: true, newRent: revision.newRent };
  }

  const supabase = await createSupabaseServerClient();
  const { data: lease, error: le } = await supabase
    .from("leases")
    .select("index_type")
    .eq("id", leaseId)
    .maybeSingle();
  if (le || !lease) return { ok: false, error: "lease_not_found" };

  const { error } = await supabase.from("lease_index_applications").insert({
    lease_id: leaseId,
    applied_on: new Date().toISOString().slice(0, 10),
    index_type: lease.index_type,
    old_index: baseIndex,
    new_index: newIndex,
    old_rent: baseRent,
    new_rent: revision.newRent,
  });
  if (error) return { ok: false, error: error.message };

  return { ok: true, demo: false, newRent: revision.newRent };
}
