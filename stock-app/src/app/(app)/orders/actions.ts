"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import * as ordersService from "@/lib/services/orders";
import * as itemsService from "@/lib/services/items";
import { deletePhoto } from "@/lib/storage/upload";
import type { OrderStatus, QcStatus } from "@/types/database";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non authentifié.");
  return { supabase, userId: user.id };
}

export async function createOrderAction(formData: FormData) {
  const { supabase, userId } = await requireUser();

  const rawLines = JSON.parse(String(formData.get("lines_json"))) as {
    productId: string;
    quantity: number;
    unitPurchasePrice: number;
    shippingCostAllocated: number;
  }[];

  if (rawLines.length === 0) throw new Error("Ajoute au moins une ligne de produit.");

  const order = await ordersService.createOrder(supabase, userId, {
    supplierId: String(formData.get("supplier_id")),
    orderDate: String(formData.get("order_date")),
    shippingCost: Number(formData.get("shipping_cost") || 0),
    notes: (formData.get("notes") as string) || null,
    lines: rawLines.map((line) => ({
      productId: line.productId,
      quantity: line.quantity,
      unitPurchasePrice: line.unitPurchasePrice,
      shippingCostAllocated: line.shippingCostAllocated,
    })),
  });

  revalidatePath("/orders");
  redirect(`/orders/${order.id}`);
}

export async function updateOrderStatusAction(orderId: string, status: OrderStatus) {
  const { supabase } = await requireUser();
  await ordersService.updateOrderStatus(supabase, orderId, status);
  revalidatePath(`/orders/${orderId}`);
  revalidatePath("/orders");
}

export async function receiveOrderAction(orderId: string) {
  const { supabase, userId } = await requireUser();
  await ordersService.receiveOrder(supabase, userId, orderId);
  revalidatePath(`/orders/${orderId}`);
  revalidatePath("/orders");
  revalidatePath("/stock");
}

export async function updateItemQcAction(
  orderId: string,
  itemId: string,
  qcStatus: QcStatus,
  qcNotes: string | null
) {
  const { supabase } = await requireUser();
  await itemsService.updateItemQc(supabase, itemId, { qcStatus, qcNotes });
  revalidatePath(`/orders/${orderId}`);
  revalidatePath("/orders");
  revalidatePath("/stock");
}

export async function addItemImageAction(orderId: string, itemId: string, storagePath: string) {
  const { supabase, userId } = await requireUser();
  await itemsService.addItemImage(supabase, userId, itemId, storagePath);
  revalidatePath(`/orders/${orderId}`);
}

export async function removeItemImageAction(orderId: string, imageId: string, storagePath: string) {
  const { supabase } = await requireUser();
  await supabase.from("item_images").delete().eq("id", imageId);
  await deletePhoto("qc-photos", storagePath);
  revalidatePath(`/orders/${orderId}`);
}
