"use server";
/**
 * Server actions sur les campagnes (pause / resume / kill).
 */
import { revalidatePath } from "next/cache";

import { getServerSupabase } from "@/lib/supabase-server";

export async function pauseCampaign(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const sb = getServerSupabase();
  await sb
    .from("ad_campaigns")
    .update({
      status: "paused",
      paused_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  revalidatePath("/campaigns");
}

export async function resumeCampaign(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const sb = getServerSupabase();
  await sb
    .from("ad_campaigns")
    .update({
      status: "active",
      paused_at: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  revalidatePath("/campaigns");
}

export async function killCampaign(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  const reason = String(formData.get("reason") ?? "kill manuel via dashboard");
  if (!id) return;
  const sb = getServerSupabase();
  await sb
    .from("ad_campaigns")
    .update({
      status: "killed",
      killed_at: new Date().toISOString(),
      killed_reason: reason,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  revalidatePath("/campaigns");
}
