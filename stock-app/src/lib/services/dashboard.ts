import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

type Client = SupabaseClient<Database>;

export interface DateRange {
  from?: string;
  to?: string;
}

interface ReportingItem {
  id: string;
  purchase_price: number;
  shipping_cost_in: number;
  vinted_fee: number;
  asking_price: number | null;
  sold_price: number | null;
  margin: number | null;
  stock_status: string;
  sale_date: string | null;
  listed_at: string | null;
  product_id: string;
  products: {
    name: string;
    brand: string | null;
    category: string;
    estimated_resale_price: number | null;
  } | null;
}

async function fetchItems(supabase: Client): Promise<ReportingItem[]> {
  const { data, error } = await supabase
    .from("items")
    .select(
      "id, purchase_price, shipping_cost_in, vinted_fee, asking_price, sold_price, margin, stock_status, sale_date, listed_at, product_id, products(name, brand, category, estimated_resale_price)"
    );
  if (error) throw error;
  return (data ?? []) as unknown as ReportingItem[];
}

function inRange(dateStr: string | null, range: DateRange) {
  if (!dateStr) return false;
  if (range.from && dateStr < range.from) return false;
  if (range.to && dateStr > range.to) return false;
  return true;
}

// Best estimate of what an unsold item will fetch: its asking price if it's
// already listed, otherwise the product's estimated resale price.
function estimatedValue(item: ReportingItem): number {
  if (item.asking_price !== null) return item.asking_price;
  return item.products?.estimated_resale_price ?? 0;
}

export async function getDashboardSummary(supabase: Client, range: DateRange = {}) {
  const items = await fetchItems(supabase);

  const sold = items.filter((i) => i.stock_status === "sold");
  const soldInRange = sold.filter((i) => inRange(i.sale_date, range));
  const unsold = items.filter((i) => i.stock_status !== "sold");

  // Realized: only what has actually been sold (final prices).
  const realCA = soldInRange.reduce((s, i) => s + (i.sold_price ?? 0), 0);
  const realProfit = soldInRange.reduce((s, i) => s + (i.margin ?? 0), 0);

  // Potential: realized + an estimation of the unsold stock.
  const stockEstimatedCA = unsold.reduce((s, i) => s + estimatedValue(i), 0);
  const stockEstimatedProfit = unsold.reduce(
    (s, i) => s + (estimatedValue(i) - i.purchase_price - i.shipping_cost_in),
    0
  );
  const potentialCA = realCA + stockEstimatedCA;
  const potentialProfit = realProfit + stockEstimatedProfit;

  // Cost tied up in unsold stock.
  const stockCost = unsold.reduce((s, i) => s + i.purchase_price + i.shipping_cost_in, 0);

  const counts = {
    received: items.filter((i) => i.stock_status === "received").length,
    forSale: items.filter((i) => i.stock_status === "for_sale").length,
    sold: sold.length,
  };

  // Average days from listing to sale.
  const durations = soldInRange
    .filter((i) => i.listed_at && i.sale_date)
    .map((i) => (new Date(i.sale_date!).getTime() - new Date(i.listed_at!).getTime()) / 86400000);
  const avgDaysToSell =
    durations.length > 0 ? durations.reduce((a, b) => a + b, 0) / durations.length : null;

  // Top products by realized profit.
  const byProduct = new Map<string, { name: string; profit: number; unitsSold: number }>();
  for (const i of soldInRange) {
    const name = i.products?.name ?? "Produit supprimé";
    if (!byProduct.has(i.product_id)) byProduct.set(i.product_id, { name, profit: 0, unitsSold: 0 });
    const e = byProduct.get(i.product_id)!;
    e.profit += i.margin ?? 0;
    e.unitsSold += 1;
  }
  const topProducts = Array.from(byProduct.entries())
    .map(([productId, e]) => ({ productId, ...e }))
    .sort((a, b) => b.profit - a.profit)
    .slice(0, 8);

  // Top brands by realized profit.
  const byBrand = new Map<string, { profit: number; unitsSold: number }>();
  for (const i of soldInRange) {
    const brand = i.products?.brand || "Sans marque";
    if (!byBrand.has(brand)) byBrand.set(brand, { profit: 0, unitsSold: 0 });
    const e = byBrand.get(brand)!;
    e.profit += i.margin ?? 0;
    e.unitsSold += 1;
  }
  const topBrands = Array.from(byBrand.entries())
    .map(([brand, e]) => ({ brand, ...e }))
    .sort((a, b) => b.profit - a.profit)
    .slice(0, 8);

  return {
    realCA,
    realProfit,
    potentialCA,
    potentialProfit,
    stockEstimatedCA,
    stockCost,
    counts,
    avgDaysToSell,
    topProducts,
    topBrands,
  };
}
