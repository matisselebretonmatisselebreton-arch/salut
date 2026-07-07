import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Supplier, SupplierStatus } from "@/types/database";

type Client = SupabaseClient<Database>;

export interface SupplierFilters {
  status?: SupplierStatus;
  includeArchived?: boolean;
}

export async function listSuppliers(supabase: Client, filters: SupplierFilters = {}) {
  let query = supabase.from("suppliers").select("*").order("name");

  if (filters.status) query = query.eq("status", filters.status);
  if (!filters.includeArchived) query = query.is("archived_at", null);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getSupplierWithOrders(supabase: Client, id: string) {
  const { data: supplier, error: supplierError } = await supabase
    .from("suppliers")
    .select("*")
    .eq("id", id)
    .single();
  if (supplierError) throw supplierError;

  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("*")
    .eq("supplier_id", id)
    .order("order_date", { ascending: false });
  if (ordersError) throw ordersError;

  return { supplier, orders: orders ?? [] };
}

export async function createSupplier(
  supabase: Client,
  userId: string,
  input: Omit<Supplier, "id" | "user_id" | "created_at" | "updated_at" | "archived_at">
) {
  const { data, error } = await supabase
    .from("suppliers")
    .insert({ ...input, user_id: userId })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateSupplier(
  supabase: Client,
  id: string,
  input: Partial<Omit<Supplier, "id" | "user_id" | "created_at" | "updated_at">>
) {
  const { data, error } = await supabase
    .from("suppliers")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function archiveSupplier(supabase: Client, id: string) {
  const { error } = await supabase
    .from("suppliers")
    .update({ archived_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}
