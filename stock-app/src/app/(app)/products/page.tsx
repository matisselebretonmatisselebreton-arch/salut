import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { listProducts } from "@/lib/services/products";
import { getSignedPhotoUrl } from "@/lib/storage/signedUrl";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { AddToCartButton } from "@/components/catalog/AddToCartButton";
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

  const thumbnails = await Promise.all(
    products.map(async (p) => {
      const first = p.product_images?.sort((a, b) => a.position - b.position)[0];
      return first ? getSignedPhotoUrl("product-photos", first.storage_path) : null;
    })
  );
  const thumbById = new Map(products.map((p, i) => [p.id, thumbnails[i]]));

  const byCategory = new Map<string, Map<string, typeof products>>();
  for (const p of products) {
    if (!byCategory.has(p.category)) byCategory.set(p.category, new Map());
    const brandMap = byCategory.get(p.category)!;
    const brand = p.brand || "Sans marque";
    if (!brandMap.has(brand)) brandMap.set(brand, []);
    brandMap.get(brand)!.push(p);
  }

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

      <form method="get" className="mb-6 flex flex-wrap items-center gap-2">
        <input
          type="search"
          name="search"
          defaultValue={search}
          placeholder="Rechercher un produit…"
          className="w-56 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
        {category && <input type="hidden" name="category" value={category} />}
        <button
          type="submit"
          className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Rechercher
        </button>
      </form>

      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href={search ? `/products?search=${encodeURIComponent(search)}` : "/products"}
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
                          <Card key={product.id} className="flex h-full flex-col overflow-hidden !p-0">
                            <Link href={`/products/${product.id}`} className="block">
                              {thumb ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={thumb} alt="" className="h-48 w-full object-cover" />
                              ) : (
                                <div className="flex h-48 w-full items-center justify-center bg-zinc-100 text-sm text-zinc-400 dark:bg-zinc-800">
                                  Pas de photo
                                </div>
                              )}
                            </Link>
                            <div className="flex flex-1 flex-col p-4">
                              <div className="mb-1 flex items-start justify-between gap-2">
                                <Link
                                  href={`/products/${product.id}`}
                                  className="font-medium text-zinc-900 hover:underline dark:text-zinc-50"
                                >
                                  {product.name}
                                </Link>
                                <Badge color="zinc">{product.category}</Badge>
                              </div>
                              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Achat {formatEuros(product.reference_purchase_price)}
                              </p>
                              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                                Revente est. {formatEuros(product.estimated_resale_price)}
                              </p>
                              <div className="mt-4 flex gap-2">
                                <AddToCartButton productId={product.id} />
                                <Link
                                  href={`/products/${product.id}/edit`}
                                  className="inline-flex items-center justify-center rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                                >
                                  Modifier
                                </Link>
                              </div>
                            </div>
                          </Card>
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
