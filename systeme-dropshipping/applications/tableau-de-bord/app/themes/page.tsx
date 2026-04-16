/**
 * Page Thèmes — liste les niches/thèmes business avec compteurs.
 */
import { Badge } from "@/components/Badge";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { formatDateTime, truncate } from "@/lib/formatters";
import { getServerSupabase, hasSupabaseConfig } from "@/lib/supabase-server";
import type { ThemeRow } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ThemeWithCounts extends ThemeRow {
  candidates_count: number;
  stores_count: number;
}

async function loadThemes(): Promise<ThemeWithCounts[]> {
  const sb = getServerSupabase();
  const [themesQ, candsQ, storesQ] = await Promise.all([
    sb.from("themes").select("*").order("created_at", { ascending: false }),
    sb.from("product_candidates").select("theme_id"),
    sb.from("stores").select("theme_id"),
  ]);
  const themes = (themesQ.data ?? []) as ThemeRow[];
  const cands = (candsQ.data ?? []) as { theme_id: string }[];
  const stores = (storesQ.data ?? []) as { theme_id: string }[];

  const candCount = new Map<string, number>();
  for (const c of cands) {
    candCount.set(c.theme_id, (candCount.get(c.theme_id) ?? 0) + 1);
  }
  const storeCount = new Map<string, number>();
  for (const s of stores) {
    storeCount.set(s.theme_id, (storeCount.get(s.theme_id) ?? 0) + 1);
  }
  return themes.map((t) => ({
    ...t,
    candidates_count: candCount.get(t.id) ?? 0,
    stores_count: storeCount.get(t.id) ?? 0,
  }));
}

export default async function ThemesPage(): Promise<JSX.Element> {
  if (!hasSupabaseConfig()) {
    return (
      <>
        <PageHeader title="Thèmes" />
        <EmptyState
          title="Supabase non configuré"
          cta={{ label: "Setup", cmd: "pnpm run setup" }}
        />
      </>
    );
  }
  const themes = await loadThemes();
  return (
    <>
      <PageHeader
        title="Thèmes"
        subtitle="Niches business — point de départ de chaque workflow."
      />
      {themes.length === 0 ? (
        <EmptyState
          title="Aucun thème"
          description="Créez un thème via SQL ou un script puis lancez la recherche."
          cta={{
            label: "CLI",
            cmd: "pnpm run workflow:research -- --theme-id=<uuid>",
          }}
        />
      ) : (
        <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-4 py-2">Nom</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Statut</th>
                <th className="px-4 py-2 text-right">Candidats</th>
                <th className="px-4 py-2 text-right">Boutiques</th>
                <th className="px-4 py-2">Créé</th>
              </tr>
            </thead>
            <tbody>
              {themes.map((t) => (
                <tr key={t.id} className="border-t border-neutral-100">
                  <td className="px-4 py-2 font-medium text-neutral-900">{t.name}</td>
                  <td className="px-4 py-2 text-neutral-600">
                    {truncate(t.description, 60)}
                  </td>
                  <td className="px-4 py-2">
                    <Badge value={t.status} />
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {t.candidates_count}
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {t.stores_count}
                  </td>
                  <td className="px-4 py-2 text-neutral-500">
                    {formatDateTime(t.created_at)}
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
