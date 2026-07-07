import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { listItems } from "@/lib/services/items";
import { Card } from "@/components/ui/Card";
import { Badge, STOCK_STATUS_BADGE } from "@/components/ui/Badge";
import { Stars } from "@/components/ui/Stars";
import { formatEuros } from "@/lib/utils/currency";
import type { StockStatus } from "@/types/database";

export default async function StockPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const stockStatus = (status as StockStatus) || "received";

  const supabase = await createClient();
  const items = await listItems(supabase, { stockStatus });

  const grouped = new Map<string, { name: string; brand: string | null; items: typeof items }>();
  for (const item of items) {
    const product = item.products;
    if (!product) continue;
    if (!grouped.has(product.id)) {
      grouped.set(product.id, { name: product.name, brand: product.brand, items: [] });
    }
    grouped.get(product.id)!.items.push(item);
  }

  const filters: { value: StockStatus; label: string }[] = [
    { value: "received", label: "Reçus (à mettre en vente)" },
    { value: "for_sale", label: "En vente" },
    { value: "sold", label: "Vendus" },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Ventes & stock</h1>

      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Link
            key={filter.value}
            href={`/stock?status=${filter.value}`}
            className={`rounded-full px-3 py-1 text-sm ${
              stockStatus === filter.value
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {filter.label}
          </Link>
        ))}
      </div>

      <div className="space-y-6">
        {Array.from(grouped.entries()).map(([productId, group]) => (
          <Card key={productId}>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-medium text-zinc-900 dark:text-zinc-50">
                {group.brand ? `${group.brand} · ` : ""}
                {group.name}
              </h2>
              <span className="text-sm text-zinc-500">{group.items.length} exemplaire(s)</span>
            </div>
            <ul className="divide-y divide-zinc-100 dark:divide-zinc-900">
              {group.items.map((item) => {
                const badge = STOCK_STATUS_BADGE[item.stock_status];
                return (
                  <li key={item.id}>
                    <Link
                      href={`/stock/${item.id}`}
                      className="flex items-center justify-between gap-3 py-2 text-sm hover:underline"
                    >
                      <span className="flex items-center gap-2">
                        #{item.unit_number} <Stars rating={item.rating} />
                      </span>
                      <span className="flex items-center gap-3 text-zinc-500">
                        {item.stock_status === "received" &&
                          `Coût ${formatEuros(item.purchase_price + item.shipping_cost_in)}`}
                        {item.stock_status === "for_sale" &&
                          `Demandé ${formatEuros(item.asking_price)}`}
                        {item.stock_status === "sold" &&
                          `Vendu ${formatEuros(item.sold_price)} · Marge ${formatEuros(item.margin)}`}
                        <Badge color={badge.color}>{badge.label}</Badge>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Card>
        ))}
        {grouped.size === 0 && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Aucun exemplaire dans cet état.</p>
        )}
      </div>
    </div>
  );
}
