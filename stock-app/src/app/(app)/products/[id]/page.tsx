import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProduct, getProductItems, getProductOrderStats } from "@/lib/services/products";
import { getSignedPhotoUrls } from "@/lib/storage/signedUrl";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Stars } from "@/components/ui/Stars";
import { LinkButton } from "@/components/ui/Button";
import { AddToCartButton } from "@/components/catalog/AddToCartButton";
import { formatEuros } from "@/lib/utils/currency";
import type { ItemImage } from "@/types/database";

interface ProductItem {
  id: string;
  rating: number | null;
  rating_comment: string | null;
  unit_number: number;
  stock_status: string;
  created_at: string;
  item_images: ItemImage[];
}

export default async function ProductShowcasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  let product;
  try {
    product = await getProduct(supabase, id);
  } catch {
    notFound();
  }

  const [items, orderStats] = await Promise.all([
    getProductItems(supabase, id) as Promise<ProductItem[]>,
    getProductOrderStats(supabase, id),
  ]);

  // Catalog photos (big gallery).
  const catalogImgs = [...(product.product_images ?? [])].sort((a, b) => a.position - b.position);
  const catalogUrls = await getSignedPhotoUrls(
    "product-photos",
    catalogImgs.map((i) => i.storage_path)
  );

  // Reception photos (from the received exemplaires).
  const receptionImgs = items.flatMap((it) =>
    [...it.item_images].sort((a, b) => a.position - b.position)
  );
  const receptionUrls = await getSignedPhotoUrls(
    "qc-photos",
    receptionImgs.map((i) => i.storage_path)
  );

  const rated = items.filter((i) => i.rating !== null);
  const avgRating =
    rated.length > 0
      ? Math.round((rated.reduce((s, i) => s + (i.rating ?? 0), 0) / rated.length) * 10) / 10
      : null;
  const comments = items.filter((i) => i.rating_comment);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href="/products" className="text-sm text-zinc-500 hover:underline">
            ← Catalogue
          </Link>
          <h1 className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            {product.name}
          </h1>
          <p className="mt-1 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <Badge color="zinc">{product.category}</Badge>
            {product.brand && <span>{product.brand}</span>}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <LinkButton href={`/products/${product.id}/edit`} variant="secondary">
            Modifier
          </LinkButton>
        </div>
      </div>

      {/* Big photo gallery */}
      {catalogUrls.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {catalogUrls.map((url, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={url}
              alt=""
              className={`w-full rounded-xl object-cover ${i === 0 ? "sm:col-span-2 max-h-[28rem]" : "h-64"}`}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-56 items-center justify-center rounded-xl bg-zinc-100 text-sm text-zinc-400 dark:bg-zinc-800">
          Aucune photo — ajoute-en via « Modifier »
        </div>
      )}

      {/* Key facts + add to cart */}
      <Card>
        <div className="grid gap-4 sm:grid-cols-4">
          <div>
            <p className="text-xs text-zinc-500">Prix d&apos;achat réf.</p>
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {formatEuros(product.reference_purchase_price)}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Revente estimée</p>
            <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
              {formatEuros(product.estimated_resale_price)}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Commandé</p>
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {orderStats.units} ex.
            </p>
            <p className="text-xs text-zinc-400">
              sur {orderStats.orderCount} commande{orderStats.orderCount > 1 ? "s" : ""}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Note moyenne</p>
            {avgRating !== null ? (
              <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{avgRating}/5</p>
            ) : (
              <p className="text-sm text-zinc-400">Non noté</p>
            )}
          </div>
        </div>
        <div className="mt-4 max-w-xs">
          <AddToCartButton productId={product.id} />
        </div>
        {product.product_url && (
          <a
            href={product.product_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block break-all text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            Lien source ↗
          </a>
        )}
        {product.description && (
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">{product.description}</p>
        )}
      </Card>

      {/* Reception photos */}
      {receptionUrls.length > 0 && (
        <Card>
          <h2 className="mb-3 font-medium text-zinc-900 dark:text-zinc-50">
            Photos prises à la réception
          </h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
            {receptionUrls.map((url, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={url} alt="" className="aspect-square rounded-lg object-cover" />
            ))}
          </div>
        </Card>
      )}

      {/* Ratings & comments */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-medium text-zinc-900 dark:text-zinc-50">Avis à la réception</h2>
          {avgRating !== null && (
            <span className="text-sm text-zinc-500">
              {avgRating}/5 · {rated.length} exemplaire{rated.length > 1 ? "s" : ""}
            </span>
          )}
        </div>
        {comments.length === 0 && rated.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Pas encore d&apos;exemplaire reçu/noté. Les notes et commentaires saisis à la réception
            apparaîtront ici.
          </p>
        ) : (
          <ul className="divide-y divide-zinc-100 dark:divide-zinc-900">
            {items
              .filter((i) => i.rating !== null || i.rating_comment)
              .map((i) => (
                <li key={i.id} className="flex items-start justify-between gap-4 py-2 text-sm">
                  <div>
                    <Stars rating={i.rating} />
                    {i.rating_comment && (
                      <p className="mt-0.5 text-zinc-600 dark:text-zinc-400">{i.rating_comment}</p>
                    )}
                  </div>
                  <span className="shrink-0 text-xs text-zinc-400">#{i.unit_number}</span>
                </li>
              ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
