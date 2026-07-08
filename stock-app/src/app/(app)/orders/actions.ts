"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import * as ordersService from "@/lib/services/orders";
import * as itemsService from "@/lib/services/items";
import type { OrderStatus } from "@/types/database";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non authentifié.");
  return { supabase, userId: user.id };
}

export async function updateOrderStatusAction(orderId: string, status: OrderStatus) {
  const { supabase } = await requireUser();
  await ordersService.updateOrderStatus(supabase, orderId, status);
  revalidatePath(`/orders/${orderId}`);
  revalidatePath("/orders");
}

export async function setShippingActualAction(orderId: string, formData: FormData) {
  const { supabase } = await requireUser();
  await ordersService.setShippingActual(supabase, orderId, Number(formData.get("shipping_actual") || 0));
  revalidatePath(`/orders/${orderId}`);
  revalidatePath("/orders");
}

export async function receiveOrderAction(orderId: string) {
  const { supabase, userId } = await requireUser();
  await ordersService.receiveOrder(supabase, userId, orderId);
  revalidatePath(`/orders/${orderId}`);
  revalidatePath("/orders");
  revalidatePath("/stock");
  revalidatePath("/dashboard");
}

export async function rateItemAction(
  orderId: string,
  itemId: string,
  rating: number | null,
  ratingComment: string | null
) {
  const { supabase } = await requireUser();
  await itemsService.rateItem(supabase, itemId, { rating, ratingComment });
  revalidatePath(`/orders/${orderId}`);
  revalidatePath("/stock");
}

export async function deleteOrderAction(orderId: string) {
  const { supabase } = await requireUser();
  await ordersService.deleteOrder(supabase, orderId);
  revalidatePath("/orders");
  redirect("/orders");
}
