import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, QcStatus, StockStatus } from "@/types/database";

type Client = SupabaseClient<Database>;

export interface StockFilters {
  productId?: string;
  stockStatus?: StockStatus;
}

export async function listItems(supabase: Client, filters: StockFilters = {}) {
  let query = supabase
    .from("items")
    .select("*, products(id, name, category), item_images(id, storage_path, position)")
    .order("created_at", { ascending: false });

  if (filters.productId) query = query.eq("product_id", filters.productId);
  if (filters.stockStatus) query = query.eq("stock_status", filters.stockStatus);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getItem(supabase: Client, id: string) {
  const { data, error } = await supabase
    .from("items")
    .select(
      "*, products(id, name, category, suppliers(id, name)), item_images(id, storage_path, position), order_lines(order_id)"
    )
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export interface QcUpdateInput {
  qcStatus: QcStatus;
  qcNotes?: string | null;
}

// A rejected / to-return unit can no longer be sold, so it drops out of
// stock automatically. Once every item on an order has been through QC,
// the order itself flips to "inspected".
export async function updateItemQc(supabase: Client, id: string, input: QcUpdateInput) {
  const stockStatus: StockStatus =
    input.qcStatus === "rejected" || input.qcStatus === "to_return" ? "returned" : "in_stock";

  const { data: item, error } = await supabase
    .from("items")
    .update({ qc_status: input.qcStatus, qc_notes: input.qcNotes ?? null, stock_status: stockStatus })
    .eq("id", id)
    .select("*, order_lines(order_id)")
    .single();
  if (error) throw error;

  const orderId = (item as unknown as { order_lines: { order_id: string } }).order_lines.order_id;
  await maybeMarkOrderInspected(supabase, orderId);

  return item;
}

async function maybeMarkOrderInspected(supabase: Client, orderId: string) {
  const { data: pendingItems, error } = await supabase
    .from("items")
    .select("id, order_lines!inner(order_id)")
    .eq("order_lines.order_id", orderId)
    .eq("qc_status", "pending")
    .limit(1);
  if (error) throw error;

  if (!pendingItems || pendingItems.length === 0) {
    await supabase.from("orders").update({ status: "inspected" }).eq("id", orderId);
  }
}

export interface SaleInput {
  resalePrice: number;
  shippingCostOut?: number;
  saleChannel?: string | null;
  saleDate: string;
}

export async function sellItem(supabase: Client, id: string, input: SaleInput) {
  const { data, error } = await supabase
    .from("items")
    .update({
      resale_price: input.resalePrice,
      shipping_cost_out: input.shippingCostOut ?? 0,
      sale_channel: input.saleChannel ?? null,
      sale_date: input.saleDate,
      stock_status: "sold",
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function unsellItem(supabase: Client, id: string) {
  const { data, error } = await supabase
    .from("items")
    .update({
      resale_price: null,
      shipping_cost_out: 0,
      sale_channel: null,
      sale_date: null,
      stock_status: "in_stock",
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function addItemImage(
  supabase: Client,
  userId: string,
  itemId: string,
  storagePath: string,
  position = 0
) {
  const { data, error } = await supabase
    .from("item_images")
    .insert({ user_id: userId, item_id: itemId, storage_path: storagePath, position })
    .select()
    .single();
  if (error) throw error;
  return data;
}
