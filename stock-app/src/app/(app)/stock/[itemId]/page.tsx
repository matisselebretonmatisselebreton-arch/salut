import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getItem } from "@/lib/services/items";
import { getSignedPhotoUrls } from "@/lib/storage/signedUrl";
import { Card } from "@/components/ui/Card";
import { Badge, STOCK_STATUS_BADGE } from "@/components/ui/Badge";
import { Stars } from "@/components/ui/Stars";
import { ItemSaleForm } from "@/components/stock/ItemSaleForm";
import { formatEuros } from "@/lib/utils/currency";

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) {
  const { itemId } = await params;
  const supabase = await createClient();

  let item;
  try {
    item = await getItem(supabase, itemId);
  } catch {
    notFound();
  }

  const images = [...(item.item_images ?? [])].sort((a, b) => a.position - b.position);
  const urls = await getSignedPhotoUrls(
    "qc-photos",
    images.map((img) => img.storage_path)
  );
  const badge = STOCK_STATUS_BADGE[item.stock_status];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          {item.products?.brand ? `${item.products.brand} · ` : ""}
          {item.products?.name} — #{item.unit_number}
        </h1>
        <Link href={`/products/${item.products?.id}`} className="text-sm text-zinc-500 hover:underline">
          Voir la fiche produit
        </Link>
        <div className="mt-2 flex items-center gap-3">
          <Badge color={badge.color}>{badge.label}</Badge>
          <Stars rating={item.rating} />
        </div>
      </div>

      <Card>
        <h2 className="mb-3 font-medium text-zinc-900 dark:text-zinc-50">Coûts</h2>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-zinc-500">Prix d&apos;achat</dt>
            <dd className="text-zinc-900 dark:text-zinc-50">{formatEuros(item.purchase_price)}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Part de livraison</dt>
            <dd className="text-zinc-900 dark:text-zinc-50">{formatEuros(item.shipping_cost_in)}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Coût de revient</dt>
            <dd className="text-zinc-900 dark:text-zinc-50">
              {formatEuros(item.purchase_price + item.shipping_cost_in)}
            </dd>
          </div>
        </dl>
        {item.rating_comment && (
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Note de réception : {item.rating_comment}
          </p>
        )}
      </Card>

      {images.length > 0 && (
        <Card>
          <h2 className="mb-3 font-medium text-zinc-900 dark:text-zinc-50">Photos</h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {urls.map((url, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={url} alt="" className="aspect-square rounded-lg object-cover" />
            ))}
          </div>
        </Card>
      )}

      <Card>
        <h2 className="mb-3 font-medium text-zinc-900 dark:text-zinc-50">Revente</h2>
        <ItemSaleForm item={item} />
      </Card>
    </div>
  );
}
