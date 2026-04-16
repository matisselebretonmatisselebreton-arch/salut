/**
 * Page Boutiques — liste Shopify avec lien vers le domaine.
 */
import { Badge } from "@/components/Badge";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { formatDateTime } from "@/lib/formatters";
import { getServerSupabase, hasSupabaseConfig } from "@/lib/supabase-server";
import type { StoreRow, ThemeRow } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface StoreWithTheme extends StoreRow {
  theme_name: string | null;
  products_count: number;
}

async function loadStores(): Promise<StoreWithTheme[]> {
  const sb = getServerSupabase();
  const [storesQ, themesQ, productsQ] = await Promise.all([
    sb.from("stores").select("*").order("created_at", { ascending: false }),
    sb.from("themes").select("id, name"),
    sb.from("products").select("store_id"),
  ]);
  const stores = (storesQ.data ?? []) as StoreRow[];
  const themes = (themesQ.data ?? []) as Pick<ThemeRow, "id" | "name">[];
  const products = (productsQ.data ?? []) as { store_id: string }[];
  const themeMap = new Map(themes.map((t) => [t.id, t.name]));
  const pCount = new Map<string, number>();
  for (const p of products) {
    pCount.set(p.store_id, (pCount.get(p.store_id) ?? 0) + 1);
  }
  return stores.map((s) => ({
    ...s,
    theme_name: themeMap.get(s.theme_id) ?? null,
    products_count: pCount.get(s.id) ?? 0,
  }));
}

export default async function StoresPage(): Promise<JSX.Element> {
  if (!hasSupabaseConfig()) {
    return (
      <>
        <PageHeader title="Boutiques" />
        <EmptyState
          title="Supabase non configuré"
          cta={{ label: "Setup", cmd: "pnpm run setup" }}
        />
      </>
    );
  }
  const stores = await loadStores();
  return (
    <>
      <PageHeader
        title="Boutiques"
        subtitle="Une boutique Shopify par thème — pages générées par l'agent Builder."
      />
      {stores.length === 0 ? (
        <EmptyState
          title="Aucune boutique"
          description="Lancez l'agent build-store sur un thème actif."
          cta={{
            label: "CLI",
            cmd: "pnpm run workflow:build-store -- --theme-id=<uuid>",
          }}
        />
      ) : (
        <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-4 py-2">Boutique</th>
                <th className="px-4 py-2">Thème</th>
                <th className="px-4 py-2">Domaine</th>
                <th className="px-4 py-2">Marché</th>
                <th className="px-4 py-2">Langue</th>
                <th className="px-4 py-2">Statut</th>
                <th className="px-4 py-2 text-right">Produits</th>
                <th className="px-4 py-2">Créée</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((s) => (
                <tr key={s.id} className="border-t border-neutral-100">
                  <td className="px-4 py-2 font-medium text-neutral-900">
                    {s.name}
                  </td>
                  <td className="px-4 py-2 text-neutral-600">
                    {s.theme_name ?? "—"}
                  </td>
                  <td className="px-4 py-2">
                    {s.shopify_domain ? (
                      <a
                        href={`https://${s.shopify_domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {s.shopify_domain}
                      </a>
                    ) : (
                      <span className="text-neutral-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-neutral-700">{s.market}</td>
                  <td className="px-4 py-2 uppercase text-neutral-700">
                    {s.language}
                  </td>
                  <td className="px-4 py-2">
                    <Badge value={s.status} />
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {s.products_count}
                  </td>
                  <td className="px-4 py-2 text-neutral-500">
                    {formatDateTime(s.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
