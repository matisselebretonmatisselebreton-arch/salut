"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import * as itemsService from "@/lib/services/items";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non authentifié.");
  return { supabase, userId: user.id };
}

export async function sellItemAction(itemId: string, formData: FormData) {
  const { supabase } = await requireUser();

  await itemsService.sellItem(supabase, itemId, {
    resalePrice: Number(formData.get("resale_price")),
    shippingCostOut: Number(formData.get("shipping_cost_out") || 0),
    saleChannel: (formData.get("sale_channel") as string) || null,
    saleDate: String(formData.get("sale_date")),
  });

  revalidatePath("/stock");
  revalidatePath(`/stock/${itemId}`);
  revalidatePath("/dashboard");
}

export async function unsellItemAction(itemId: string) {
  const { supabase } = await requireUser();
  await itemsService.unsellItem(supabase, itemId);
  revalidatePath("/stock");
  revalidatePath(`/stock/${itemId}`);
  revalidatePath("/dashboard");
}
