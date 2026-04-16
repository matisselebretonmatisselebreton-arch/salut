/**
 * Page Produits — catalogue inter-boutiques (statut, prix, marge).
 */
import { Badge } from "@/components/Badge";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { formatCurrency, formatDateTime, truncate } from "@/lib/formatters";
import { getServerSupabase, hasSupabaseConfig } from "@/lib/supabase-server";
import type { ProductRow, StoreRow } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ProductWithStore extends ProductRow {
  store_name: string | null;
}

async function loadProducts(): Promise<ProductWithStore[]> {
  const sb = getServerSupabase();
  const [pQ, sQ] = await Promise.all([
    sb
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200),
    sb.from("stores").select("id, name"),
  ]);
  const products = (pQ.data ?? []) as ProductRow[];
  const stores = (sQ.data ?? []) as Pick<StoreRow, "id" | "name">[];
  const map = new Map(stores.map((s) => [s.id, s.name]));
  return products.map((p) => ({
    ...p,
    store_name: map.get(p.store_id) ?? null,
  }));
}

export default async function ProductsPage(): Promise<JSX.Element> {
  if (!hasSupabaseConfig()) {
    return (
      <>
        <PageHeader title="Produits" />
        <EmptyState
          title="Supabase non configuré"
          cta={{ label: "Setup", cmd: "pnpm run setup" }}
        />
      </>
    );
  }
  const products = await loadProducts();
  return (
    <>
      <PageHeader
        title="Produits"
        subtitle="Produits déployés sur Shopify (limit 200, ordre récent)."
      />
      {products.length === 0 ? (
        <EmptyState
          title="Aucun produit"
          description="Approuvez des candidats puis lancez le builder."
          cta={{ label: "CLI", cmd: "pnpm run workflow:full -- --theme-id=<uuid>" }}
        />
      ) : (
        <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-4 py-2">Nom</th>
                <th className="px-4 py-2">Boutique</th>
                <th className="px-4 py-2 text-right">Prix</th>
                <th className="px-4 py-2 text-right">Coût</th>
                <th className="px-4 py-2 text-right">Marge</th>
                <th className="px-4 py-2">Statut</th>
                <th className="px-4 py-2">Shopify ID</th>
                <th className="px-4 py-2">Créé</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const margin = p.cost == null ? null : p.price - p.cost;
                return (
                  <tr key={p.id} className="border-t border-neutral-100">
                    <td className="px-4 py-2 font-medium text-neutral-900">
                      {truncate(p.name, 50)}
                    </td>
                    <td className="px-4 py-2 text-neutral-600">
                      {p.store_name ?? "—"}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums">
                      {formatCurrency(p.price)}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums">
                      {formatCurrency(p.cost)}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums">
                      {formatCurrency(margin)}
                    </td>
                    <td className="px-4 py-2">
                      <Badge value={p.status} />
                    </td>
                    <td className="px-4 py-2 font-mono text-xs text-neutral-500">
                      {p.shopify_product_id ?? "—"}
                    </td>
                    <td className="px-4 py-2 text-neutral-500">
                      {formatDateTime(p.created_at)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
