import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, OrderStatus } from "@/types/database";

type Client = SupabaseClient<Database>;

export interface NewOrderLine {
  productId: string;
  quantity: number;
  unitPurchasePrice: number;
  comment?: string | null;
}

export interface NewOrderInput {
  label?: string | null;
  orderDate: string;
  shippingFranceEstimated: number;
  notes?: string | null;
  status: OrderStatus;
  lines: NewOrderLine[];
}

export async function listOrders(supabase: Client, filters: { status?: OrderStatus } = {}) {
  let query = supabase
    .from("orders")
    .select("*, order_lines(id, quantity, unit_purchase_price)")
    .order("order_date", { ascending: false });

  if (filters.status) query = query.eq("status", filters.status);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getOrderWithLines(supabase: Client, id: string) {
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();
  if (orderError) throw orderError;

  const { data: lines, error: linesError } = await supabase
    .from("order_lines")
    .select("*, products(id, name, brand, category), items(*, item_images(id, storage_path, position))")
    .eq("order_id", id)
    .order("created_at");
  if (linesError) throw linesError;

  return { order, lines: lines ?? [] };
}

// Order total = purchase cost of every unit + the France shipping we know
// about (actual once re-evaluated, otherwise the estimate).
export function computeOrderTotal(
  lines: { quantity: number; unit_purchase_price: number }[],
  shippingEstimated: number,
  shippingActual: number | null
) {
  const linesTotal = lines.reduce((sum, l) => sum + l.quantity * l.unit_purchase_price, 0);
  return linesTotal + (shippingActual ?? shippingEstimated);
}

export async function createOrder(supabase: Client, userId: string, input: NewOrderInput) {
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: userId,
      label: input.label ?? null,
      order_date: input.orderDate,
      shipping_france_estimated: input.shippingFranceEstimated,
      notes: input.notes ?? null,
      status: input.status,
    })
    .select()
    .single();
  if (orderError) throw orderError;

  if (input.lines.length > 0) {
    const { error: linesError } = await supabase.from("order_lines").insert(
      input.lines.map((line) => ({
        user_id: userId,
        order_id: order.id,
        product_id: line.productId,
        quantity: line.quantity,
        unit_purchase_price: line.unitPurchasePrice,
        comment: line.comment ?? null,
      }))
    );
    if (linesError) {
      await supabase.from("orders").delete().eq("id", order.id);
      throw linesError;
    }
  }

  return order;
}

export async function updateOrderStatus(supabase: Client, id: string, status: OrderStatus) {
  const { error } = await supabase.from("orders").update({ status }).eq("id", id);
  if (error) throw error;
}

// Re-evaluated France shipping, entered when the parcel reaches the warehouse.
export async function setShippingActual(supabase: Client, id: string, amount: number) {
  const { error } = await supabase
    .from("orders")
    .update({ shipping_france_actual: amount, status: "at_warehouse" })
    .eq("id", id);
  if (error) throw error;
}

// Reception: one item per unit ordered. The known France shipping (actual if
// re-evaluated, else the estimate) is split evenly across every unit so each
// item carries its true landed cost for margin.
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
  if (!lines || lines.length === 0) throw new Error("Cette commande n'a aucune ligne.");

  const totalQuantity = lines.reduce((sum, line) => sum + line.quantity, 0);
  const shipping = order.shipping_france_actual ?? order.shipping_france_estimated;
  const perUnitShipping = totalQuantity > 0 ? shipping / totalQuantity : 0;

  const itemsToInsert = lines.flatMap((line) =>
    Array.from({ length: line.quantity }, (_, index) => ({
      user_id: userId,
      order_line_id: line.id,
      product_id: line.product_id,
      unit_number: index + 1,
      purchase_price: line.unit_purchase_price,
      shipping_cost_in: perUnitShipping,
      stock_status: "received" as const,
    }))
  );

  const { error: itemsError } = await supabase.from("items").insert(itemsToInsert);
  if (itemsError) throw itemsError;

  const { error: updateError } = await supabase
    .from("orders")
    .update({ status: "received", received_at: new Date().toISOString().slice(0, 10) })
    .eq("id", orderId);
  if (updateError) throw updateError;
}

export async function deleteOrder(supabase: Client, id: string) {
  const { error } = await supabase.from("orders").delete().eq("id", id);
  if (error) throw error;
}
