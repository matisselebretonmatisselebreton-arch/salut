import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Product, ProductValidationStatus } from "@/types/database";

type Client = SupabaseClient<Database>;

// Seed categories always offered in the product form. The list stays
// extensible: any category typed on the site is picked up as a suggestion
// afterwards (see listCategories), no migration needed.
export const DEFAULT_CATEGORIES = [
  "Chaussures",
  "Vêtements",
  "Accessoire",
  "Produit électronique",
];

export interface ProductFilters {
  category?: string;
  supplierId?: string;
  validationStatus?: ProductValidationStatus;
}

export async function listProducts(supabase: Client, filters: ProductFilters = {}) {
  let query = supabase
    .from("products")
    .select("*, suppliers(name), product_images(id, storage_path, position)")
    .order("created_at", { ascending: false });

  if (filters.category) query = query.eq("category", filters.category);
  if (filters.supplierId) query = query.eq("supplier_id", filters.supplierId);
  if (filters.validationStatus) query = query.eq("validation_status", filters.validationStatus);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getProductWithImages(supabase: Client, id: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*, suppliers(id, name), product_images(id, storage_path, position)")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function listCategories(supabase: Client, userId: string) {
  const { data, error } = await supabase
    .from("products")
    .select("category")
    .eq("user_id", userId)
    .not("category", "is", null);
  if (error) throw error;

  const categories = new Set((data ?? []).map((row) => row.category as string));
  return Array.from(categories).sort();
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
