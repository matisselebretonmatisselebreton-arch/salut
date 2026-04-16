"use server";
/**
 * Server actions sur les candidats produit (approve / reject).
 * UPDATE Supabase puis revalidation du chemin /candidates.
 */
import { revalidatePath } from "next/cache";

import { getServerSupabase } from "@/lib/supabase-server";
import type { ProductCandidateStatus } from "@/lib/types";

async function setStatus(
  id: string,
  status: ProductCandidateStatus,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!id) return { ok: false, error: "id manquant" };
  const sb = getServerSupabase();
  const { error } = await sb
    .from("product_candidates")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/candidates");
  return { ok: true };
}

export async function approveCandidate(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  await setStatus(id, "approved");
}

export async function rejectCandidate(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  await setStatus(id, "rejected");
}
