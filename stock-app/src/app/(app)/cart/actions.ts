"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import * as cart from "@/lib/services/cart";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non authentifié.");
  return { supabase, userId: user.id };
}

export async function addToCartAction(productId: string) {
  const { supabase, userId } = await requireUser();
  await cart.addToCart(supabase, userId, productId);
  revalidatePath("/cart");
  revalidatePath("/products");
}

export async function removeCartLineAction(lineId: string) {
  const { supabase } = await requireUser();
  await cart.removeCartLine(supabase, lineId);
  revalidatePath("/cart");
}

function parseCartForm(formData: FormData) {
  const lines = JSON.parse(String(formData.get("lines_json"))) as cart.CartLineUpdate[];
  const meta: cart.CartMeta = {
    label: (formData.get("label") as string) || null,
    orderDate: String(formData.get("order_date")),
    shippingFranceEstimated: Number(formData.get("shipping_france_estimated") || 0),
    notes: (formData.get("notes") as string) || null,
  };
  return { lines, meta };
}

export async function saveCartAction(orderId: string, formData: FormData) {
  const { supabase } = await requireUser();
  const { lines, meta } = parseCartForm(formData);
  await cart.updateCartLines(supabase, lines);
  await cart.updateCartMeta(supabase, orderId, meta);
  revalidatePath("/cart");
}

export async function validateCartAction(orderId: string, formData: FormData) {
  const { supabase } = await requireUser();
  const { lines, meta } = parseCartForm(formData);
  await cart.updateCartLines(supabase, lines);
  await cart.updateCartMeta(supabase, orderId, meta);
  await cart.validateCart(supabase, orderId);
  revalidatePath("/cart");
  revalidatePath("/orders");
  redirect(`/orders/${orderId}`);
}
