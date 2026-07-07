import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

type Client = SupabaseClient<Database>;

export interface DateRange {
  from?: string;
  to?: string;
}

interface ItemForReporting {
  id: string;
  purchase_price: number;
  shipping_cost_in: number;
  shipping_cost_out: number;
  resale_price: number | null;
  margin: number | null;
  qc_status: string;
  stock_status: string;
  sale_date: string | null;
  product_id: string;
  products: { name: string; supplier_id: string; suppliers: { name: string } } | null;
}

async function fetchAllItemsForReporting(supabase: Client): Promise<ItemForReporting[]> {
  const { data, error } = await supabase
    .from("items")
    .select(
      "id, purchase_price, shipping_cost_in, shipping_cost_out, resale_price, margin, qc_status, stock_status, sale_date, product_id, products(name, supplier_id, suppliers(name))"
    );
  if (error) throw error;
  return (data ?? []) as unknown as ItemForReporting[];
}

function inRange(dateStr: string | null, range: DateRange) {
  if (!dateStr) return false;
  if (range.from && dateStr < range.from) return false;
  if (range.to && dateStr > range.to) return false;
  return true;
}

export async function getDashboardSummary(supabase: Client, range: DateRange = {}) {
  const items = await fetchAllItemsForReporting(supabase);

  const soldInRange = items.filter((item) => item.sale_date && inRange(item.sale_date, range));
  const totalMargin = soldInRange.reduce((sum, item) => sum + (item.margin ?? 0), 0);

  const stockItems = items.filter((item) => item.stock_status === "in_stock");
  const stockValue = stockItems.reduce(
    (sum, item) => sum + item.purchase_price + item.shipping_cost_in,
    0
  );

  const qcDone = items.filter((item) => item.qc_status !== "pending");
  const qcDefects = qcDone.filter((item) =>
    ["minor_defect", "rejected", "to_return"].includes(item.qc_status)
  );
  const globalDefectRate = qcDone.length > 0 ? qcDefects.length / qcDone.length : 0;

  const bySupplier = new Map<
    string,
    { name: string; margins: number[]; qcDone: number; qcDefects: number }
  >();
  for (const item of items) {
    const supplierId = item.products?.supplier_id;
    const supplierName = item.products?.suppliers?.name;
    if (!supplierId || !supplierName) continue;

    if (!bySupplier.has(supplierId)) {
      bySupplier.set(supplierId, { name: supplierName, margins: [], qcDone: 0, qcDefects: 0 });
    }
    const entry = bySupplier.get(supplierId)!;
    if (item.margin !== null) entry.margins.push(item.margin);
    if (item.qc_status !== "pending") {
      entry.qcDone += 1;
      if (["minor_defect", "rejected", "to_return"].includes(item.qc_status)) entry.qcDefects += 1;
    }
  }

  const bestSuppliers = Array.from(bySupplier.entries())
    .map(([supplierId, entry]) => ({
      supplierId,
      name: entry.name,
      averageMargin:
        entry.margins.length > 0
          ? entry.margins.reduce((a, b) => a + b, 0) / entry.margins.length
          : null,
      defectRate: entry.qcDone > 0 ? entry.qcDefects / entry.qcDone : null,
    }))
    .sort((a, b) => (b.averageMargin ?? -Infinity) - (a.averageMargin ?? -Infinity));

  const byProduct = new Map<string, { name: string; totalMargin: number; unitsSold: number }>();
  for (const item of soldInRange) {
    const productName = item.products?.name ?? "Produit supprimé";
    if (!byProduct.has(item.product_id)) {
      byProduct.set(item.product_id, { name: productName, totalMargin: 0, unitsSold: 0 });
    }
    const entry = byProduct.get(item.product_id)!;
    entry.totalMargin += item.margin ?? 0;
    entry.unitsSold += 1;
  }

  const topProducts = Array.from(byProduct.entries())
    .map(([productId, entry]) => ({ productId, ...entry }))
    .sort((a, b) => b.totalMargin - a.totalMargin);

  return {
    totalMargin,
    stockValue,
    stockCount: stockItems.length,
    globalDefectRate,
    bestSuppliers,
    topProducts,
  };
}
