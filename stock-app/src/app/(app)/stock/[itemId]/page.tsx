import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getItem } from "@/lib/services/items";
import { getSignedPhotoUrls } from "@/lib/storage/signedUrl";
import { Card } from "@/components/ui/Card";
import { Badge, QC_STATUS_BADGE, STOCK_STATUS_BADGE } from "@/components/ui/Badge";
import { SellItemForm } from "@/components/stock/SellItemForm";
import { sellItemAction } from "@/app/(app)/stock/actions";
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

  const qcBadge = QC_STATUS_BADGE[item.qc_status];
  const stockBadge = STOCK_STATUS_BADGE[item.stock_status];
  const sellAction = sellItemAction.bind(null, item.id);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          {item.products?.name} — exemplaire #{item.unit_number}
        </h1>
        <Link href={`/products/${item.products?.id}`} className="text-sm text-zinc-500 hover:underline">
          Voir le produit
        </Link>
        <div className="mt-2 flex gap-2">
          <Badge color={qcBadge.color}>{qcBadge.label}</Badge>
          <Badge color={stockBadge.color}>{stockBadge.label}</Badge>
        </div>
      </div>

      <Card>
        <h2 className="mb-3 font-medium text-zinc-900 dark:text-zinc-50">Achat</h2>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-zinc-500">Fournisseur</dt>
            <dd className="text-zinc-900 dark:text-zinc-50">{item.products?.suppliers?.name}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Prix d&apos;achat</dt>
            <dd className="text-zinc-900 dark:text-zinc-50">{formatEuros(item.purchase_price)}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Livraison Chine → moi</dt>
            <dd className="text-zinc-900 dark:text-zinc-50">{formatEuros(item.shipping_cost_in)}</dd>
          </div>
        </dl>
        {item.qc_notes && (
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Note qualité : {item.qc_notes}
          </p>
        )}
      </Card>

      {images.length > 0 && (
        <Card>
          <h2 className="mb-3 font-medium text-zinc-900 dark:text-zinc-50">Photos de contrôle</h2>
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
        <SellItemForm item={item} action={sellAction} />
      </Card>
    </div>
  );
}
