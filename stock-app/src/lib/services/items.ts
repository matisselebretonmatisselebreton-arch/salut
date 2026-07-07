import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, StockStatus } from "@/types/database";

type Client = SupabaseClient<Database>;

export interface StockFilters {
  productId?: string;
  stockStatus?: StockStatus;
}

export async function listItems(supabase: Client, filters: StockFilters = {}) {
  let query = supabase
    .from("items")
    .select("*, products(id, name, brand, category), item_images(id, storage_path, position)")
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
      "*, products(id, name, brand, category, estimated_resale_price), item_images(id, storage_path, position)"
    )
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export interface RatingInput {
  rating: number | null;
  ratingComment?: string | null;
}

export async function rateItem(supabase: Client, id: string, input: RatingInput) {
  const { data, error } = await supabase
    .from("items")
    .update({ rating: input.rating, rating_comment: input.ratingComment ?? null })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Put an item up for sale with an asking price and channel (e.g. Vinted).
export async function listForSale(
  supabase: Client,
  id: string,
  input: { askingPrice: number; saleChannel?: string | null; listedAt?: string }
) {
  const { data, error } = await supabase
    .from("items")
    .update({
      asking_price: input.askingPrice,
      sale_channel: input.saleChannel ?? null,
      listed_at: input.listedAt ?? new Date().toISOString().slice(0, 10),
      stock_status: "for_sale",
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function unlist(supabase: Client, id: string) {
  const { data, error } = await supabase
    .from("items")
    .update({ asking_price: null, listed_at: null, stock_status: "received" })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export interface SaleInput {
  soldPrice: number;
  vintedFee?: number;
  saleChannel?: string | null;
  saleDate: string;
}

export async function sellItem(supabase: Client, id: string, input: SaleInput) {
  const { data, error } = await supabase
    .from("items")
    .update({
      sold_price: input.soldPrice,
      vinted_fee: input.vintedFee ?? 0,
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

// Revert a sale back to "for sale" (keeps the asking price if it was set).
export async function cancelSale(supabase: Client, id: string) {
  const { data, error } = await supabase
    .from("items")
    .update({ sold_price: null, vinted_fee: 0, sale_date: null, stock_status: "for_sale" })
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
