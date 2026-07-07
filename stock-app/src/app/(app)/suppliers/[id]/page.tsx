import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSupplierWithOrders } from "@/lib/services/suppliers";
import { Card } from "@/components/ui/Card";
import { Badge, ORDER_STATUS_BADGE, SUPPLIER_STATUS_BADGE } from "@/components/ui/Badge";
import { SupplierForm } from "@/components/suppliers/SupplierForm";
import { ArchiveSupplierButton } from "@/components/suppliers/ArchiveSupplierButton";
import { updateSupplierAction } from "@/app/(app)/suppliers/actions";
import { formatEuros } from "@/lib/utils/currency";

export default async function SupplierDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  let supplier, orders;
  try {
    ({ supplier, orders } = await getSupplierWithOrders(supabase, id));
  } catch {
    notFound();
  }

  const badge = SUPPLIER_STATUS_BADGE[supplier.status];
  const updateAction = updateSupplierAction.bind(null, supplier.id);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            {supplier.name}
          </h1>
          <Badge color={badge.color}>{badge.label}</Badge>
        </div>
        <ArchiveSupplierButton supplierId={supplier.id} />
      </div>

      <Card>
        <h2 className="mb-4 font-medium text-zinc-900 dark:text-zinc-50">Informations</h2>
        <SupplierForm supplier={supplier} action={updateAction} submitLabel="Enregistrer" />
      </Card>

      <Card>
        <h2 className="mb-4 font-medium text-zinc-900 dark:text-zinc-50">
          Historique des commandes
        </h2>
        {orders.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Aucune commande pour ce fournisseur.</p>
        ) : (
          <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {orders.map((order) => {
              const orderBadge = ORDER_STATUS_BADGE[order.status];
              return (
                <li key={order.id} className="flex items-center justify-between py-3">
                  <Link href={`/orders/${order.id}`} className="hover:underline">
                    Commande du {order.order_date}
                  </Link>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-zinc-500">{formatEuros(order.shipping_cost)}</span>
                    <Badge color={orderBadge.color}>{orderBadge.label}</Badge>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}
