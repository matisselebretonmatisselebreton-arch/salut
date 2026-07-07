import type { Item } from "@/types/database";

// Net margin of a sold item: final price minus purchase, inbound shipping
// allocation and the Vinted fee. Mirrors the generated `margin` column.
export function computeMargin(
  item: Pick<Item, "sold_price" | "purchase_price" | "shipping_cost_in" | "vinted_fee">
): number | null {
  if (item.sold_price === null) return null;
  return item.sold_price - item.purchase_price - item.shipping_cost_in - item.vinted_fee;
}
