import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { listProducts, listCategories } from "@/lib/services/products";
import { listSuppliers } from "@/lib/services/suppliers";
import { getSignedPhotoUrl } from "@/lib/storage/signedUrl";
import { Card } from "@/components/ui/Card";
import { Badge, PRODUCT_VALIDATION_BADGE } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import type { ProductValidationStatus } from "@/types/database";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; supplierId?: string; status?: string }>;
}) {
  const { category, supplierId, status } = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [products, suppliers, categories] = await Promise.all([
    listProducts(supabase, {
      category,
      supplierId,
      validationStatus: (status as ProductValidationStatus) || undefined,
    }),
    listSuppliers(supabase),
    listCategories(supabase, user!.id),
  ]);

  const thumbnails = await Promise.all(
    products.map(async (product) => {
      const firstImage = product.product_images?.sort((a, b) => a.position - b.position)[0];
      if (!firstImage) return null;
      return getSignedPhotoUrl("product-photos", firstImage.storage_path);
    })
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Produits</h1>
        <LinkButton href="/products/new">Nouveau produit</LinkButton>
      </div>

      <form className="mb-6 flex flex-wrap gap-3" method="get">
        <select
          name="category"
          defaultValue={category ?? ""}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        >
          <option value="">Toutes catégories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          name="supplierId"
          defaultValue={supplierId ?? ""}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        >
          <option value="">Tous fournisseurs</option>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}
            </option>
          ))}
        </select>
        <select
          name="status"
          defaultValue={status ?? ""}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        >
          <option value="">Tous statuts</option>
          <option value="pending_test">En attente de test</option>
          <option value="validated">Validé</option>
          <option value="rejected">Refusé</option>
        </select>
        <button
          type="submit"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Filtrer
        </button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => {
          const badge = PRODUCT_VALIDATION_BADGE[product.validation_status];
          const thumbnail = thumbnails[index];
          return (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="h-full transition-colors hover:border-zinc-400 dark:hover:border-zinc-600">
                {thumbnail && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={thumbnail}
                    alt=""
                    className="mb-3 h-40 w-full rounded-lg object-cover"
                  />
                )}
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-medium text-zinc-900 dark:text-zinc-50">{product.name}</h2>
                  <Badge color={badge.color}>{badge.label}</Badge>
                </div>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {product.suppliers?.name}
                  {product.category ? ` · ${product.category}` : ""}
                </p>
              </Card>
            </Link>
          );
        })}
        {products.length === 0 && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Aucun produit pour le moment.</p>
        )}
      </div>
    </div>
  );
}
