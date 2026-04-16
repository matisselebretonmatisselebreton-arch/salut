/**
 * Page Candidats produit — kanban-light avec actions Approuver / Rejeter.
 * Server actions appelées via formulaires natifs (no JS requis).
 */
import { Badge } from "@/components/Badge";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import {
  approveCandidate,
  rejectCandidate,
} from "@/lib/actions/candidates";
import {
  formatCurrency,
  formatDateTime,
  formatNumber,
  truncate,
} from "@/lib/formatters";
import { getServerSupabase, hasSupabaseConfig } from "@/lib/supabase-server";
import type { ProductCandidateRow } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function loadCandidates(): Promise<ProductCandidateRow[]> {
  const sb = getServerSupabase();
  const { data } = await sb
    .from("product_candidates")
    .select("*")
    .order("score", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .limit(200);
  return (data ?? []) as ProductCandidateRow[];
}

function CandidateCard({
  c,
}: {
  c: ProductCandidateRow;
}): JSX.Element {
  const margin =
    c.price_buy != null && c.price_sell_suggested != null
      ? c.price_sell_suggested - c.price_buy
      : null;
  return (
    <article className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-neutral-900">
            {c.name}
          </h3>
          <a
            href={c.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-0.5 block truncate text-xs text-neutral-500 hover:underline"
          >
            {truncate(c.source_url, 40)}
          </a>
        </div>
        <Badge value={c.status} />
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div>
          <dt className="text-neutral-500">Score</dt>
          <dd className="font-mono font-semibold text-neutral-900">
            {c.score == null ? "—" : c.score.toFixed(2)}
          </dd>
        </div>
        <div>
          <dt className="text-neutral-500">Marge</dt>
          <dd className="font-mono font-semibold text-neutral-900">
            {margin == null ? "—" : formatCurrency(margin)}
          </dd>
        </div>
        <div>
          <dt className="text-neutral-500">Prix achat</dt>
          <dd className="font-mono text-neutral-700">
            {formatCurrency(c.price_buy)}
          </dd>
        </div>
        <div>
          <dt className="text-neutral-500">Prix vente</dt>
          <dd className="font-mono text-neutral-700">
            {formatCurrency(c.price_sell_suggested)}
          </dd>
        </div>
        <div>
          <dt className="text-neutral-500">Note</dt>
          <dd className="font-mono text-neutral-700">
            {c.rating == null ? "—" : `${c.rating.toFixed(1)} / 5`}
          </dd>
        </div>
        <div>
          <dt className="text-neutral-500">Commandes</dt>
          <dd className="font-mono text-neutral-700">
            {formatNumber(c.orders_count)}
          </dd>
        </div>
      </dl>

      {c.notes ? (
        <p className="mt-3 text-xs text-neutral-600">{truncate(c.notes, 140)}</p>
      ) : null}

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[10px] text-neutral-400">
          {formatDateTime(c.created_at)}
        </span>
        {c.status === "pending" ? (
          <div className="flex gap-1">
            <form action={approveCandidate}>
              <input type="hidden" name="id" value={c.id} />
              <button
                type="submit"
                className="rounded-md bg-green-600 px-2 py-1 text-xs font-medium text-white hover:bg-green-700"
              >
                Approuver
              </button>
            </form>
            <form action={rejectCandidate}>
              <input type="hidden" name="id" value={c.id} />
              <button
                type="submit"
                className="rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700"
              >
                Rejeter
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default async function CandidatesPage(): Promise<JSX.Element> {
  if (!hasSupabaseConfig()) {
    return (
      <>
        <PageHeader title="Candidats produit" />
        <EmptyState
          title="Supabase non configuré"
          cta={{ label: "Setup", cmd: "pnpm run setup" }}
        />
      </>
    );
  }
  const items = await loadCandidates();
  const groups: Record<"pending" | "approved" | "rejected" | "imported", ProductCandidateRow[]> = {
    pending: [],
    approved: [],
    rejected: [],
    imported: [],
  };
  for (const c of items) groups[c.status].push(c);

  return (
    <>
      <PageHeader
        title="Candidats produit"
        subtitle="Approuvez les pépites — ils seront ensuite poussés sur Shopify."
      />
      {items.length === 0 ? (
        <EmptyState
          title="Aucun candidat"
          description="Lancez l'agent de recherche produit."
          cta={{
            label: "CLI",
            cmd: "pnpm run workflow:research -- --theme-id=<uuid>",
          }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {(["pending", "approved", "imported", "rejected"] as const).map((col) => (
            <section key={col}>
              <header className="mb-3 flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  {col}
                </h2>
                <span className="text-xs text-neutral-400">
                  {groups[col].length}
                </span>
              </header>
              <div className="flex flex-col gap-3">
                {groups[col].map((c) => (
                  <CandidateCard key={c.id} c={c} />
                ))}
                {groups[col].length === 0 ? (
                  <p className="rounded-lg border border-dashed border-neutral-200 px-3 py-6 text-center text-xs text-neutral-400">
                    Vide
                  </p>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
