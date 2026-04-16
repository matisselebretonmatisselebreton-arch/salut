/**
 * Page Campagnes — Meta / TikTok avec actions pause / resume / kill.
 * Métriques agrégées depuis ad_metrics.
 */
import { Badge } from "@/components/Badge";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import {
  killCampaign,
  pauseCampaign,
  resumeCampaign,
} from "@/lib/actions/campaigns";
import { formatCurrency, formatDateTime, formatNumber } from "@/lib/formatters";
import { getServerSupabase, hasSupabaseConfig } from "@/lib/supabase-server";
import type { AdCampaignRow, AdMetricRow } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface CampaignWithStats extends AdCampaignRow {
  spend: number;
  revenue: number;
  conversions: number;
  cpa: number | null;
  roas: number | null;
}

async function loadCampaigns(): Promise<CampaignWithStats[]> {
  const sb = getServerSupabase();
  const [cQ, mQ] = await Promise.all([
    sb.from("ad_campaigns").select("*").order("created_at", { ascending: false }),
    sb
      .from("ad_metrics")
      .select("campaign_id, spend, revenue, conversions"),
  ]);
  const campaigns = (cQ.data ?? []) as AdCampaignRow[];
  const metrics = (mQ.data ?? []) as Pick<
    AdMetricRow,
    "campaign_id" | "spend" | "revenue" | "conversions"
  >[];

  const agg = new Map<
    string,
    { spend: number; revenue: number; conversions: number }
  >();
  for (const m of metrics) {
    const cur = agg.get(m.campaign_id) ?? { spend: 0, revenue: 0, conversions: 0 };
    cur.spend += Number(m.spend ?? 0);
    cur.revenue += Number(m.revenue ?? 0);
    cur.conversions += Number(m.conversions ?? 0);
    agg.set(m.campaign_id, cur);
  }
  return campaigns.map((c) => {
    const a = agg.get(c.id) ?? { spend: 0, revenue: 0, conversions: 0 };
    return {
      ...c,
      spend: a.spend,
      revenue: a.revenue,
      conversions: a.conversions,
      cpa: a.conversions > 0 ? a.spend / a.conversions : null,
      roas: a.spend > 0 ? a.revenue / a.spend : null,
    };
  });
}

export default async function CampaignsPage(): Promise<JSX.Element> {
  if (!hasSupabaseConfig()) {
    return (
      <>
        <PageHeader title="Campagnes" />
        <EmptyState
          title="Supabase non configuré"
          cta={{ label: "Setup", cmd: "pnpm run setup" }}
        />
      </>
    );
  }
  const campaigns = await loadCampaigns();
  return (
    <>
      <PageHeader
        title="Campagnes"
        subtitle="Meta & TikTok — pause/kill manuels en plus du kill-switch automatique."
      />
      {campaigns.length === 0 ? (
        <EmptyState
          title="Aucune campagne"
          description="Lancez l'agent media-buyer une fois les créatives prêtes."
          cta={{
            label: "CLI",
            cmd: "pnpm run workflow:launch-ads -- --store-id=<uuid>",
          }}
        />
      ) : (
        <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-4 py-2">Nom</th>
                <th className="px-4 py-2">Plateforme</th>
                <th className="px-4 py-2">Statut</th>
                <th className="px-4 py-2 text-right">Budget/j</th>
                <th className="px-4 py-2 text-right">Dépensé</th>
                <th className="px-4 py-2 text-right">Revenus</th>
                <th className="px-4 py-2 text-right">Conv.</th>
                <th className="px-4 py-2 text-right">CPA</th>
                <th className="px-4 py-2 text-right">ROAS</th>
                <th className="px-4 py-2">Lancée</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.id} className="border-t border-neutral-100">
                  <td className="px-4 py-2 font-medium text-neutral-900">
                    {c.name}
                    {c.dry_run ? (
                      <span className="ml-2 rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] uppercase text-neutral-600">
                        dry
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-2 text-neutral-700">{c.platform}</td>
                  <td className="px-4 py-2">
                    <Badge value={c.status} />
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {formatCurrency(c.budget_daily)}
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {formatCurrency(c.spend)}
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {formatCurrency(c.revenue)}
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {formatNumber(c.conversions)}
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {formatCurrency(c.cpa)}
                  </td>
                  <td
                    className={`px-4 py-2 text-right tabular-nums ${
                      c.roas == null
                        ? ""
                        : c.roas >= 2
                          ? "text-green-600"
                          : "text-red-600"
                    }`}
                  >
                    {c.roas == null ? "—" : `${c.roas.toFixed(2)}×`}
                  </td>
                  <td className="px-4 py-2 text-neutral-500">
                    {formatDateTime(c.started_at)}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-1">
                      {c.status === "active" ? (
                        <form action={pauseCampaign}>
                          <input type="hidden" name="id" value={c.id} />
                          <button
                            type="submit"
                            className="rounded bg-amber-500 px-2 py-1 text-[11px] font-medium text-white hover:bg-amber-600"
                          >
                            Pause
                          </button>
                        </form>
                      ) : null}
                      {c.status === "paused" ? (
                        <form action={resumeCampaign}>
                          <input type="hidden" name="id" value={c.id} />
                          <button
                            type="submit"
                            className="rounded bg-blue-600 px-2 py-1 text-[11px] font-medium text-white hover:bg-blue-700"
                          >
                            Reprendre
                          </button>
                        </form>
                      ) : null}
                      {c.status === "active" || c.status === "paused" ? (
                        <form action={killCampaign}>
                          <input type="hidden" name="id" value={c.id} />
                          <input
                            type="hidden"
                            name="reason"
                            value="kill manuel via dashboard"
                          />
                          <button
                            type="submit"
                            className="rounded bg-red-600 px-2 py-1 text-[11px] font-medium text-white hover:bg-red-700"
                          >
                            Kill
                          </button>
                        </form>
                      ) : null}
                    </div>
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
