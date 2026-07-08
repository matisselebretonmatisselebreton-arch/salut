import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

type Client = SupabaseClient<Database>;

// The "cart" is simply the single draft order for the user. We keep at most
// one active cart: get-or-create always reuses the latest draft.
export async function getOrCreateActiveCart(supabase: Client, userId: string) {
  const { data: existing, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "draft")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  if (existing) return existing;

  const { data: created, error: createError } = await supabase
    .from("orders")
    .insert({ user_id: userId, status: "draft" })
    .select()
    .single();
  if (createError) throw createError;
  return created;
}

export async function getActiveCart(supabase: Client, userId: string) {
  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "draft")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  if (!order) return null;

  const { data: lines, error: linesError } = await supabase
    .from("order_lines")
    .select("*, products(id, name, brand, category)")
    .eq("order_id", order.id)
    .order("created_at");
  if (linesError) throw linesError;

  return { order, lines: lines ?? [] };
}

export async function getCartCount(supabase: Client, userId: string) {
  const cart = await getActiveCart(supabase, userId);
  if (!cart) return 0;
  return cart.lines.reduce((sum, line) => sum + line.quantity, 0);
}

// Add a product to the active cart: bump the quantity if it's already there,
// otherwise create a line at its reference purchase price.
export async function addToCart(supabase: Client, userId: string, productId: string) {
  const cart = await getOrCreateActiveCart(supabase, userId);

  const { data: existingLine, error: findError } = await supabase
    .from("order_lines")
    .select("*")
    .eq("order_id", cart.id)
    .eq("product_id", productId)
    .limit(1)
    .maybeSingle();
  if (findError) throw findError;

  if (existingLine) {
    const { error } = await supabase
      .from("order_lines")
      .update({ quantity: existingLine.quantity + 1 })
      .eq("id", existingLine.id);
    if (error) throw error;
    return;
  }

  const { data: product, error: productError } = await supabase
    .from("products")
    .select("reference_purchase_price")
    .eq("id", productId)
    .single();
  if (productError) throw productError;

  const { error } = await supabase.from("order_lines").insert({
    user_id: userId,
    order_id: cart.id,
    product_id: productId,
    quantity: 1,
    unit_purchase_price: product.reference_purchase_price ?? 0,
  });
  if (error) throw error;
}

export interface CartLineUpdate {
  id: string;
  quantity: number;
  unitPurchasePrice: number;
  comment: string | null;
}

export async function updateCartLines(supabase: Client, lines: CartLineUpdate[]) {
  for (const line of lines) {
    const { error } = await supabase
      .from("order_lines")
      .update({
        quantity: line.quantity,
        unit_purchase_price: line.unitPurchasePrice,
        comment: line.comment,
      })
      .eq("id", line.id);
    if (error) throw error;
  }
}

export async function removeCartLine(supabase: Client, lineId: string) {
  const { error } = await supabase.from("order_lines").delete().eq("id", lineId);
  if (error) throw error;
}

export interface CartMeta {
  label: string | null;
  orderDate: string;
  shippingFranceEstimated: number;
  notes: string | null;
}

export async function updateCartMeta(supabase: Client, orderId: string, meta: CartMeta) {
  const { error } = await supabase
    .from("orders")
    .update({
      label: meta.label,
      order_date: meta.orderDate,
      shipping_france_estimated: meta.shippingFranceEstimated,
      notes: meta.notes,
    })
    .eq("id", orderId);
  if (error) throw error;
}

// Turn the cart into a real order.
export async function validateCart(supabase: Client, orderId: string) {
  const { data: lines, error: linesError } = await supabase
    .from("order_lines")
    .select("id")
    .eq("order_id", orderId)
    .limit(1);
  if (linesError) throw linesError;
  if (!lines || lines.length === 0) throw new Error("Le panier est vide.");

  const { error } = await supabase.from("orders").update({ status: "ordered" }).eq("id", orderId);
  if (error) throw error;
}
