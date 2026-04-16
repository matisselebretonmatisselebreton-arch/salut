/**
 * Page Créatives — variations + vidéos rendues, par produit.
 */
import { Badge } from "@/components/Badge";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { formatDateTime, truncate } from "@/lib/formatters";
import { getServerSupabase, hasSupabaseConfig } from "@/lib/supabase-server";
import type {
  CreativeVariationRow,
  ProductRow,
  RenderedVideoRow,
} from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface VariationWithExtras extends CreativeVariationRow {
  product_name: string | null;
  videos: RenderedVideoRow[];
}

async function loadCreatives(): Promise<VariationWithExtras[]> {
  const sb = getServerSupabase();
  const [vQ, pQ, rvQ] = await Promise.all([
    sb
      .from("creative_variations")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100),
    sb.from("products").select("id, name"),
    sb.from("rendered_videos").select("*"),
  ]);
  const variations = (vQ.data ?? []) as CreativeVariationRow[];
  const products = (pQ.data ?? []) as Pick<ProductRow, "id" | "name">[];
  const videos = (rvQ.data ?? []) as RenderedVideoRow[];

  const productMap = new Map(products.map((p) => [p.id, p.name]));
  const vidMap = new Map<string, RenderedVideoRow[]>();
  for (const v of videos) {
    const list = vidMap.get(v.variation_id) ?? [];
    list.push(v);
    vidMap.set(v.variation_id, list);
  }
  return variations.map((v) => ({
    ...v,
    product_name: productMap.get(v.product_id) ?? null,
    videos: vidMap.get(v.id) ?? [],
  }));
}

export default async function CreativesPage(): Promise<JSX.Element> {
  if (!hasSupabaseConfig()) {
    return (
      <>
        <PageHeader title="Créatives" />
        <EmptyState
          title="Supabase non configuré"
          cta={{ label: "Setup", cmd: "pnpm run setup" }}
        />
      </>
    );
  }
  const items = await loadCreatives();
  return (
    <>
      <PageHeader
        title="Créatives"
        subtitle="Variations vidéo (hooks Claude, voix, musique) + rendus Remotion."
      />
      {items.length === 0 ? (
        <EmptyState
          title="Aucune créative"
          description="Lancez le générateur de créatives sur des produits live."
          cta={{
            label: "CLI",
            cmd: "pnpm run workflow:generate-creatives -- --store-id=<uuid>",
          }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {items.map((v) => (
            <article
              key={v.id}
              className="rounded-lg border border-neutral-200 bg-white p-4"
            >
              <header className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-neutral-900">
                    {v.product_name ?? v.product_id}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {v.template_style} • {v.language}
                  </p>
                </div>
                <Badge value={v.status} />
              </header>

              <p className="mt-3 text-sm italic text-neutral-700">
                « {truncate(v.hook_text, 120)} »
              </p>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-neutral-500">
                {v.voice_over_url ? (
                  <a
                    href={v.voice_over_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded bg-neutral-100 px-2 py-0.5 hover:bg-neutral-200"
                  >
                    Voix off
                  </a>
                ) : null}
                {v.music_id ? (
                  <span className="rounded bg-neutral-100 px-2 py-0.5">
                    Musique : {v.music_id}
                  </span>
                ) : null}
              </div>

              {v.videos.length > 0 ? (
                <div className="mt-3 border-t border-neutral-100 pt-3">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                    Rendus
                  </p>
                  <ul className="space-y-1 text-xs">
                    {v.videos.map((rv) => (
                      <li key={rv.id} className="flex items-center justify-between gap-2">
                        <a
                          href={rv.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="truncate text-blue-600 hover:underline"
                        >
                          {rv.format}
                        </a>
                        <Badge value={rv.status} />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <p className="mt-3 text-[10px] text-neutral-400">
                {formatDateTime(v.created_at)}
              </p>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
