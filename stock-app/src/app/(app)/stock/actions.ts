"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import * as itemsService from "@/lib/services/items";
import { deletePhoto } from "@/lib/storage/upload";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non authentifié.");
  return { supabase, userId: user.id };
}

function refreshItemViews(itemId: string) {
  revalidatePath("/stock");
  revalidatePath(`/stock/${itemId}`);
  revalidatePath("/dashboard");
}

export async function listForSaleAction(itemId: string, formData: FormData) {
  const { supabase } = await requireUser();
  await itemsService.listForSale(supabase, itemId, {
    askingPrice: Number(formData.get("asking_price")),
    saleChannel: (formData.get("sale_channel") as string) || null,
  });
  refreshItemViews(itemId);
}

export async function sellItemAction(itemId: string, formData: FormData) {
  const { supabase } = await requireUser();
  await itemsService.sellItem(supabase, itemId, {
    soldPrice: Number(formData.get("sold_price")),
    vintedFee: Number(formData.get("vinted_fee") || 0),
    saleChannel: (formData.get("sale_channel") as string) || null,
    saleDate: String(formData.get("sale_date")),
  });
  refreshItemViews(itemId);
}

export async function unlistAction(itemId: string) {
  const { supabase } = await requireUser();
  await itemsService.unlist(supabase, itemId);
  refreshItemViews(itemId);
}

export async function cancelSaleAction(itemId: string) {
  const { supabase } = await requireUser();
  await itemsService.cancelSale(supabase, itemId);
  refreshItemViews(itemId);
}

export async function addItemImageAction(itemId: string, storagePath: string) {
  const { supabase, userId } = await requireUser();
  await itemsService.addItemImage(supabase, userId, itemId, storagePath);
  refreshItemViews(itemId);
}

export async function removeItemImageAction(imageId: string, storagePath: string) {
  const { supabase } = await requireUser();
  await supabase.from("item_images").delete().eq("id", imageId);
  await deletePhoto("qc-photos", storagePath);
  revalidatePath("/stock");
}
