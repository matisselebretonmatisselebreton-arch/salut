import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Product } from "@/types/database";

type Client = SupabaseClient<Database>;

export interface ProductFilters {
  category?: string;
  brand?: string;
  search?: string;
}

export async function listProducts(supabase: Client, filters: ProductFilters = {}) {
  let query = supabase
    .from("products")
    .select("*, product_images(id, storage_path, position)")
    .order("category")
    .order("brand", { nullsFirst: false })
    .order("name");

  if (filters.category) query = query.eq("category", filters.category);
  if (filters.brand) query = query.eq("brand", filters.brand);
  if (filters.search) query = query.ilike("name", `%${filters.search}%`);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getProduct(supabase: Client, id: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*, product_images(id, storage_path, position)")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

// The received exemplaires of a product carry its reception ratings, comments
// and photos — surfaced on the product's showcase page.
export async function getProductItems(supabase: Client, productId: string) {
  const { data, error } = await supabase
    .from("items")
    .select(
      "id, rating, rating_comment, unit_number, stock_status, created_at, item_images(id, storage_path, position)"
    )
    .eq("product_id", productId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

// How many times a product has been ordered (validated orders only, i.e. not
// the live cart), in distinct orders and total units.
export async function getProductOrderStats(supabase: Client, productId: string) {
  const { data, error } = await supabase
    .from("order_lines")
    .select("quantity, orders!inner(id, status)")
    .eq("product_id", productId)
    .neq("orders.status", "draft");
  if (error) throw error;

  const rows = (data ?? []) as unknown as { quantity: number; orders: { id: string } }[];
  const units = rows.reduce((sum, r) => sum + r.quantity, 0);
  const orderCount = new Set(rows.map((r) => r.orders.id)).size;
  return { units, orderCount };
}

export async function listBrands(supabase: Client, userId: string) {
  const { data, error } = await supabase
    .from("products")
    .select("brand")
    .eq("user_id", userId)
    .not("brand", "is", null);
  if (error) throw error;
  const brands = new Set((data ?? []).map((row) => row.brand as string));
  return Array.from(brands).sort();
}

export async function createProduct(
  supabase: Client,
  userId: string,
  input: Omit<Product, "id" | "user_id" | "created_at" | "updated_at">
) {
  const { data, error } = await supabase
    .from("products")
    .insert({ ...input, user_id: userId })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProduct(
  supabase: Client,
  id: string,
  input: Partial<Omit<Product, "id" | "user_id" | "created_at" | "updated_at">>
) {
  const { data, error } = await supabase
    .from("products")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProduct(supabase: Client, id: string) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

export async function addProductImage(
  supabase: Client,
  userId: string,
  productId: string,
  storagePath: string,
  position = 0
) {
  const { data, error } = await supabase
    .from("product_images")
    .insert({ user_id: userId, product_id: productId, storage_path: storagePath, position })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProductImage(supabase: Client, id: string) {
  const { error } = await supabase.from("product_images").delete().eq("id", id);
  if (error) throw error;
}
