import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, OrderStatus } from "@/types/database";

type Client = SupabaseClient<Database>;

export interface NewOrderLine {
  productId: string;
  quantity: number;
  unitPurchasePrice: number;
  shippingCostAllocated?: number;
}

export interface NewOrderInput {
  supplierId: string;
  orderDate: string;
  shippingCost: number;
  notes?: string | null;
  lines: NewOrderLine[];
}

export async function listOrders(supabase: Client, filters: { status?: OrderStatus } = {}) {
  let query = supabase
    .from("orders")
    .select("*, suppliers(name)")
    .order("order_date", { ascending: false });

  if (filters.status) query = query.eq("status", filters.status);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getOrderWithLines(supabase: Client, id: string) {
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*, suppliers(id, name)")
    .eq("id", id)
    .single();
  if (orderError) throw orderError;

  const { data: lines, error: linesError } = await supabase
    .from("order_lines")
    .select("*, products(id, name), items(*, item_images(id, storage_path, position))")
    .eq("order_id", id)
    .order("created_at");
  if (linesError) throw linesError;

  return { order, lines: lines ?? [] };
}

// Order total = sum of purchase costs across lines + the global shipping cost.
export function computeOrderTotal(
  lines: Pick<NewOrderLine, "quantity" | "unitPurchasePrice">[],
  shippingCost: number
) {
  const linesTotal = lines.reduce((sum, line) => sum + line.quantity * line.unitPurchasePrice, 0);
  return linesTotal + shippingCost;
}

export async function createOrder(supabase: Client, userId: string, input: NewOrderInput) {
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: userId,
      supplier_id: input.supplierId,
      order_date: input.orderDate,
      shipping_cost: input.shippingCost,
      notes: input.notes ?? null,
      status: "ordered",
    })
    .select()
    .single();
  if (orderError) throw orderError;

  const { error: linesError } = await supabase.from("order_lines").insert(
    input.lines.map((line) => ({
      user_id: userId,
      order_id: order.id,
      product_id: line.productId,
      quantity: line.quantity,
      unit_purchase_price: line.unitPurchasePrice,
      shipping_cost_allocated: line.shippingCostAllocated ?? 0,
    }))
  );

  if (linesError) {
    // Roll back the order so we don't leave an order with zero lines behind.
    await supabase.from("orders").delete().eq("id", order.id);
    throw linesError;
  }

  return order;
}

export async function updateOrderStatus(supabase: Client, id: string, status: OrderStatus) {
  const { error } = await supabase.from("orders").update({ status }).eq("id", id);
  if (error) throw error;
}

// Generates one `items` row per unit ordered, splitting the order-level
// shipping cost evenly across units unless a line already has its own
// allocation. This is the "réception + génération des unités" step.
export async function receiveOrder(supabase: Client, userId: string, orderId: string) {
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();
  if (orderError) throw orderError;

  const { data: lines, error: linesError } = await supabase
    .from("order_lines")
    .select("*")
    .eq("order_id", orderId);
  if (linesError) throw linesError;
  if (!lines || lines.length === 0) throw new Error("Cette commande n'a aucune ligne de produit.");

  const totalQuantity = lines.reduce((sum, line) => sum + line.quantity, 0);

  const itemsToInsert = lines.flatMap((line) => {
    const perUnitShipping =
      line.shipping_cost_allocated > 0
        ? line.shipping_cost_allocated / line.quantity
        : order.shipping_cost / totalQuantity;

    return Array.from({ length: line.quantity }, (_, index) => ({
      user_id: userId,
      order_line_id: line.id,
      product_id: line.product_id,
      unit_number: index + 1,
      purchase_price: line.unit_purchase_price,
      shipping_cost_in: perUnitShipping,
      qc_status: "pending" as const,
      stock_status: "in_stock" as const,
    }));
  });

  const { error: itemsError } = await supabase.from("items").insert(itemsToInsert);
  if (itemsError) throw itemsError;

  const { error: updateError } = await supabase
    .from("orders")
    .update({ status: "received", received_at: new Date().toISOString().slice(0, 10) })
    .eq("id", orderId);
  if (updateError) throw updateError;
}
