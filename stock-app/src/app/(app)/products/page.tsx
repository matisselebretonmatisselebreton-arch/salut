import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { listProducts } from "@/lib/services/products";
import { getSignedPhotoUrl } from "@/lib/storage/signedUrl";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { formatEuros } from "@/lib/utils/currency";
import { CATEGORIES } from "@/types/database";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { category, search } = await searchParams;
  const supabase = await createClient();
  const products = await listProducts(supabase, { category, search });

  // Signed thumbnail (first image) per product.
  const thumbnails = await Promise.all(
    products.map(async (p) => {
      const first = p.product_images?.sort((a, b) => a.position - b.position)[0];
      return first ? getSignedPhotoUrl("product-photos", first.storage_path) : null;
    })
  );
  const thumbById = new Map(products.map((p, i) => [p.id, thumbnails[i]]));

  // Group products by category, then by brand.
  const byCategory = new Map<string, Map<string, typeof products>>();
  for (const p of products) {
    if (!byCategory.has(p.category)) byCategory.set(p.category, new Map());
    const brandMap = byCategory.get(p.category)!;
    const brand = p.brand || "Sans marque";
    if (!brandMap.has(brand)) brandMap.set(brand, []);
    brandMap.get(brand)!.push(p);
  }

  // Show categories in the canonical order, plus any extras that exist.
  const orderedCategories = [
    ...CATEGORIES.filter((c) => byCategory.has(c)),
    ...Array.from(byCategory.keys()).filter((c) => !CATEGORIES.includes(c as never)),
  ];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Catalogue</h1>
        <LinkButton href="/products/new">Nouveau produit</LinkButton>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/products"
          className={`rounded-full px-3 py-1 text-sm ${
            !category
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
          }`}
        >
          Toutes
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/products?category=${encodeURIComponent(cat)}`}
            className={`rounded-full px-3 py-1 text-sm ${
              category === cat
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Aucun produit. Commence par en ajouter un au catalogue.
        </p>
      )}

      <div className="space-y-8">
        {orderedCategories.map((cat) => {
          const brandMap = byCategory.get(cat)!;
          const brands = Array.from(brandMap.keys()).sort();
          return (
            <section key={cat}>
              <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">{cat}</h2>
              <div className="space-y-5">
                {brands.map((brand) => (
                  <div key={brand}>
                    <h3 className="mb-2 text-sm font-medium uppercase tracking-wide text-zinc-500">
                      {brand}
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {brandMap.get(brand)!.map((product) => {
                        const thumb = thumbById.get(product.id);
                        return (
                          <Link key={product.id} href={`/products/${product.id}`}>
                            <Card className="h-full transition-colors hover:border-zinc-400 dark:hover:border-zinc-600">
                              {thumb && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={thumb}
                                  alt=""
                                  className="mb-3 h-40 w-full rounded-lg object-cover"
                                />
                              )}
                              <h4 className="font-medium text-zinc-900 dark:text-zinc-50">
                                {product.name}
                              </h4>
                              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                Achat {formatEuros(product.reference_purchase_price)} · Revente est.{" "}
                                {formatEuros(product.estimated_resale_price)}
                              </p>
                            </Card>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
