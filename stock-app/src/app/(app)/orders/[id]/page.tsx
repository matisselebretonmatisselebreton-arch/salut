import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getOrderWithLines, computeOrderTotal } from "@/lib/services/orders";
import { getSignedPhotoUrls } from "@/lib/storage/signedUrl";
import { Card } from "@/components/ui/Card";
import { Badge, ORDER_STATUS_BADGE } from "@/components/ui/Badge";
import { OrderStatusActions } from "@/components/orders/OrderStatusActions";
import { ItemRatingCard } from "@/components/orders/ItemRatingCard";
import { DeleteOrderButton } from "@/components/orders/DeleteOrderButton";
import { formatEuros } from "@/lib/utils/currency";
import type { Item, ItemImage } from "@/types/database";

interface LineWithItems {
  id: string;
  quantity: number;
  unit_purchase_price: number;
  comment: string | null;
  products: { id: string; name: string; brand: string | null } | null;
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
  const total = computeOrderTotal(
    typedLines.map((l) => ({ quantity: l.quantity, unit_purchase_price: l.unit_purchase_price })),
    order.shipping_france_estimated,
    order.shipping_france_actual
  );

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            {order.label || `Commande du ${order.order_date}`}
          </h1>
          <div className="mt-1">
            <Badge color={badge.color}>{badge.label}</Badge>
          </div>
        </div>
        <DeleteOrderButton orderId={order.id} />
      </div>

      <Card>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-zinc-500">Date</dt>
            <dd className="text-zinc-900 dark:text-zinc-50">{order.order_date}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Total (articles + livraison)</dt>
            <dd className="text-zinc-900 dark:text-zinc-50">{formatEuros(total)}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Livraison estimée</dt>
            <dd className="text-zinc-900 dark:text-zinc-50">
              {formatEuros(order.shipping_france_estimated)}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500">Livraison réelle</dt>
            <dd className="text-zinc-900 dark:text-zinc-50">
              {order.shipping_france_actual !== null
                ? formatEuros(order.shipping_france_actual)
                : "—"}
            </dd>
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
      </Card>

      <Card>
        <h2 className="mb-4 font-medium text-zinc-900 dark:text-zinc-50">Articles commandés</h2>
        <ul className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {typedLines.map((line) => (
            <li key={line.id} className="py-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-zinc-900 dark:text-zinc-50">
                  {line.products?.brand ? `${line.products.brand} · ` : ""}
                  {line.products?.name} × {line.quantity}
                </span>
                <span className="text-zinc-500">{formatEuros(line.unit_purchase_price)}/u</span>
              </div>
              {line.comment && (
                <p className="mt-0.5 text-zinc-500 dark:text-zinc-400">↳ {line.comment}</p>
              )}
            </li>
          ))}
        </ul>
      </Card>

      {order.status !== "received" && (
        <Card>
          <h2 className="mb-4 font-medium text-zinc-900 dark:text-zinc-50">Suivi</h2>
          <OrderStatusActions
            orderId={order.id}
            status={order.status}
            shippingEstimated={order.shipping_france_estimated}
            shippingActual={order.shipping_france_actual}
          />
        </Card>
      )}

      {typedLines.some((line) => line.items.length > 0) && (
        <div>
          <h2 className="mb-4 font-medium text-zinc-900 dark:text-zinc-50">
            Réception & note des exemplaires
          </h2>
          <div className="space-y-4">
            {await Promise.all(
              typedLines.flatMap((line) =>
                line.items.map(async (item) => {
                  const imgs = [...item.item_images].sort((a, b) => a.position - b.position);
                  const urls = await getSignedPhotoUrls(
                    "qc-photos",
                    imgs.map((i) => i.storage_path)
                  );
                  const existingPhotos = imgs.map((img, i) => ({ id: img.id, url: urls[i] }));
                  const imagePaths = Object.fromEntries(imgs.map((img) => [img.id, img.storage_path]));
                  return (
                    <ItemRatingCard
                      key={item.id}
                      orderId={order.id}
                      itemId={item.id}
                      productName={line.products?.name ?? ""}
                      unitNumber={item.unit_number}
                      rating={item.rating}
                      ratingComment={item.rating_comment}
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
