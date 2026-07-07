import type { Item } from "@/types/database";

export function computeMargin(
  item: Pick<Item, "resale_price" | "purchase_price" | "shipping_cost_in" | "shipping_cost_out">
): number | null {
  if (item.resale_price === null) return null;
  return item.resale_price - item.purchase_price - item.shipping_cost_in - item.shipping_cost_out;
}
