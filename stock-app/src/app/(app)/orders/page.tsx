import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { listOrders, computeOrderTotal } from "@/lib/services/orders";
import { Card } from "@/components/ui/Card";
import { Badge, ORDER_STATUS_BADGE } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { formatEuros } from "@/lib/utils/currency";

export default async function OrdersPage() {
  const supabase = await createClient();
  const orders = await listOrders(supabase, { excludeDraft: true });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Commandes</h1>
        <LinkButton href="/cart" variant="secondary">
          Voir le panier
        </LinkButton>
      </div>

      <div className="space-y-3">
        {orders.map((order) => {
          const badge = ORDER_STATUS_BADGE[order.status];
          const total = computeOrderTotal(
            order.order_lines ?? [],
            order.shipping_france_estimated,
            order.shipping_france_actual
          );
          return (
            <Link key={order.id} href={`/orders/${order.id}`}>
              <Card className="flex items-center justify-between transition-colors hover:border-zinc-400 dark:hover:border-zinc-600">
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-50">
                    {order.label || `Commande du ${order.order_date}`}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {order.order_date} · {(order.order_lines ?? []).length} ligne(s) ·{" "}
                    {formatEuros(total)}
                  </p>
                </div>
                <Badge color={badge.color}>{badge.label}</Badge>
              </Card>
            </Link>
          );
        })}
        {orders.length === 0 && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Aucune commande validée. Constitue un panier puis valide-le pour créer une commande.
          </p>
        )}
      </div>
    </div>
  );
}
