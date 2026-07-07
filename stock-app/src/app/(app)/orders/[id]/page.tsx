import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getOrderWithLines } from "@/lib/services/orders";
import { getSignedPhotoUrls } from "@/lib/storage/signedUrl";
import { Card } from "@/components/ui/Card";
import { Badge, ORDER_STATUS_BADGE } from "@/components/ui/Badge";
import { OrderStatusActions } from "@/components/orders/OrderStatusActions";
import { ItemQcCard } from "@/components/orders/ItemQcCard";
import { formatEuros } from "@/lib/utils/currency";
import type { Item, ItemImage } from "@/types/database";

interface LineWithItems {
  id: string;
  quantity: number;
  unit_purchase_price: number;
  products: { id: string; name: string } | null;
  items: (Item & { item_images: ItemImage[] })[];
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let order, lines;
  try {
    ({ order, lines } = await getOrderWithLines(supabase, id));
  } catch {
    notFound();
  }

  const typedLines = lines as unknown as LineWithItems[];
  const badge = ORDER_STATUS_BADGE[order.status];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Commande — {order.suppliers?.name}
          </h1>
          <Link href={`/suppliers/${order.suppliers?.id}`} className="text-sm text-zinc-500 hover:underline">
            Voir le fournisseur
          </Link>
        </div>
        <Badge color={badge.color}>{badge.label}</Badge>
      </div>

      <Card>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-zinc-500">Date de commande</dt>
            <dd className="text-zinc-900 dark:text-zinc-50">{order.order_date}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Frais de livraison</dt>
            <dd className="text-zinc-900 dark:text-zinc-50">{formatEuros(order.shipping_cost)}</dd>
          </div>
          {order.received_at && (
            <div>
              <dt className="text-zinc-500">Reçue le</dt>
              <dd className="text-zinc-900 dark:text-zinc-50">{order.received_at}</dd>
            </div>
          )}
          {order.notes && (
            <div className="col-span-2">
              <dt className="text-zinc-500">Notes</dt>
              <dd className="text-zinc-900 dark:text-zinc-50">{order.notes}</dd>
            </div>
          )}
        </dl>
        <div className="mt-4">
          <OrderStatusActions orderId={order.id} status={order.status} />
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 font-medium text-zinc-900 dark:text-zinc-50">Articles commandés</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-left text-zinc-500 dark:border-zinc-800">
              <th className="pb-2">Produit</th>
              <th className="pb-2">Quantité</th>
              <th className="pb-2">Prix unitaire</th>
              <th className="pb-2">Sous-total</th>
            </tr>
          </thead>
          <tbody>
            {typedLines.map((line) => (
              <tr key={line.id} className="border-b border-zinc-100 last:border-0 dark:border-zinc-900">
                <td className="py-2">{line.products?.name}</td>
                <td className="py-2">{line.quantity}</td>
                <td className="py-2">{formatEuros(line.unit_purchase_price)}</td>
                <td className="py-2">{formatEuros(line.quantity * line.unit_purchase_price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {typedLines.some((line) => line.items.length > 0) && (
        <div>
          <h2 className="mb-4 font-medium text-zinc-900 dark:text-zinc-50">
            Contrôle qualité des exemplaires
          </h2>
          <div className="space-y-4">
            {await Promise.all(
              typedLines.flatMap((line) =>
                line.items.map(async (item) => {
                  const images = [...item.item_images].sort((a, b) => a.position - b.position);
                  const urls = await getSignedPhotoUrls(
                    "qc-photos",
                    images.map((img) => img.storage_path)
                  );
                  const existingPhotos = images.map((img, i) => ({ id: img.id, url: urls[i] }));
                  const imagePaths = Object.fromEntries(
                    images.map((img) => [img.id, img.storage_path])
                  );

                  return (
                    <ItemQcCard
                      key={item.id}
                      orderId={order.id}
                      itemId={item.id}
                      productName={line.products?.name ?? ""}
                      unitNumber={item.unit_number}
                      qcStatus={item.qc_status}
                      qcNotes={item.qc_notes}
                      userId={user!.id}
                      existingPhotos={existingPhotos}
                      imagePaths={imagePaths}
                    />
                  );
                })
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
