import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProduct, getProductRatings, listBrands } from "@/lib/services/products";
import { getSignedPhotoUrls } from "@/lib/storage/signedUrl";
import { Card } from "@/components/ui/Card";
import { Stars } from "@/components/ui/Stars";
import { ProductForm } from "@/components/products/ProductForm";
import { ProductPhotos } from "@/components/products/ProductPhotos";
import { DeleteProductButton } from "@/components/products/DeleteProductButton";
import { updateProductAction } from "@/app/(app)/products/actions";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let product;
  try {
    product = await getProduct(supabase, id);
  } catch {
    notFound();
  }

  const [brands, ratings] = await Promise.all([
    listBrands(supabase, user!.id),
    getProductRatings(supabase, id),
  ]);

  const images = [...(product.product_images ?? [])].sort((a, b) => a.position - b.position);
  const urls = await getSignedPhotoUrls(
    "product-photos",
    images.map((img) => img.storage_path)
  );
  const existingPhotos = images.map((img, i) => ({ id: img.id, url: urls[i] }));
  const imagePaths = Object.fromEntries(images.map((img) => [img.id, img.storage_path]));

  const rated = ratings.filter((r) => r.rating !== null);
  const avgRating =
    rated.length > 0
      ? Math.round((rated.reduce((s, r) => s + (r.rating ?? 0), 0) / rated.length) * 10) / 10
      : null;

  const updateAction = updateProductAction.bind(null, product.id);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{product.name}</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {product.category}
            {product.brand ? ` · ${product.brand}` : ""}
          </p>
          {product.product_url && (
            <a
              href={product.product_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block break-all text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              {product.product_url} ↗
            </a>
          )}
        </div>
        <DeleteProductButton productId={product.id} />
      </div>

      <Card>
        <h2 className="mb-4 font-medium text-zinc-900 dark:text-zinc-50">Photos</h2>
        <ProductPhotos
          productId={product.id}
          userId={user!.id}
          existingPhotos={existingPhotos}
          imagePaths={imagePaths}
        />
      </Card>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-medium text-zinc-900 dark:text-zinc-50">
            Qualité constatée à la réception
          </h2>
          {avgRating !== null && (
            <span className="text-sm text-zinc-500">
              Moyenne : <span className="font-medium text-zinc-900 dark:text-zinc-50">{avgRating}/5</span>{" "}
              ({rated.length} exemplaire{rated.length > 1 ? "s" : ""})
            </span>
          )}
        </div>
        {ratings.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Aucun exemplaire noté pour l&apos;instant. Les notes saisies à la réception apparaîtront ici.
          </p>
        ) : (
          <ul className="divide-y divide-zinc-100 dark:divide-zinc-900">
            {ratings.map((r) => (
              <li key={r.id} className="flex items-start justify-between gap-4 py-2 text-sm">
                <div>
                  <Stars rating={r.rating} />
                  {r.rating_comment && (
                    <p className="mt-0.5 text-zinc-600 dark:text-zinc-400">{r.rating_comment}</p>
                  )}
                </div>
                <span className="shrink-0 text-xs text-zinc-400">#{r.unit_number}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card>
        <h2 className="mb-4 font-medium text-zinc-900 dark:text-zinc-50">Informations</h2>
        <ProductForm
          product={product}
          brands={brands}
          action={updateAction}
          submitLabel="Enregistrer"
        />
      </Card>
    </div>
  );
}
