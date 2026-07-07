"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import * as suppliersService from "@/lib/services/suppliers";
import type { SupplierStatus } from "@/types/database";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non authentifié.");
  return { supabase, userId: user.id };
}

export async function createSupplierAction(formData: FormData) {
  const { supabase, userId } = await requireUser();

  const supplier = await suppliersService.createSupplier(supabase, userId, {
    name: String(formData.get("name")),
    platform: (formData.get("platform") as string) || null,
    contact_wechat: (formData.get("contact_wechat") as string) || null,
    contact_phone: (formData.get("contact_phone") as string) || null,
    contact_link: (formData.get("contact_link") as string) || null,
    reliability_score: formData.get("reliability_score")
      ? Number(formData.get("reliability_score"))
      : null,
    status: (formData.get("status") as SupplierStatus) || "to_test",
    notes: (formData.get("notes") as string) || null,
    first_order_date: (formData.get("first_order_date") as string) || null,
  });

  revalidatePath("/suppliers");
  redirect(`/suppliers/${supplier.id}`);
}

export async function updateSupplierAction(id: string, formData: FormData) {
  const { supabase } = await requireUser();

  await suppliersService.updateSupplier(supabase, id, {
    name: String(formData.get("name")),
    platform: (formData.get("platform") as string) || null,
    contact_wechat: (formData.get("contact_wechat") as string) || null,
    contact_phone: (formData.get("contact_phone") as string) || null,
    contact_link: (formData.get("contact_link") as string) || null,
    reliability_score: formData.get("reliability_score")
      ? Number(formData.get("reliability_score"))
      : null,
    status: (formData.get("status") as SupplierStatus) || "to_test",
    notes: (formData.get("notes") as string) || null,
    first_order_date: (formData.get("first_order_date") as string) || null,
  });

  revalidatePath("/suppliers");
  revalidatePath(`/suppliers/${id}`);
}

export async function archiveSupplierAction(id: string) {
  const { supabase } = await requireUser();
  await suppliersService.archiveSupplier(supabase, id);
  revalidatePath("/suppliers");
  redirect("/suppliers");
}
