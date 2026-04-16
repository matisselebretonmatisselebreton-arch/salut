/**
 * Tableau de bord — vue d'ensemble : KPIs globaux + dernières actions agents.
 */
import { Badge } from "@/components/Badge";
import { EmptyState } from "@/components/EmptyState";
import { KpiCard } from "@/components/KpiCard";
import { PageHeader } from "@/components/PageHeader";
import { formatCurrency, formatDateTime, formatNumber, truncate } from "@/lib/formatters";
import { getServerSupabase, hasSupabaseConfig } from "@/lib/supabase-server";
import type {
  AdCampaignRow,
  AdMetricRow,
  AgentLogRow,
  ProductRow,
  StoreRow,
  ThemeRow,
} from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface DashboardData {
  themes: number;
  themesActive: number;
  stores: number;
  storesLive: number;
  products: number;
  productsLive: number;
  campaigns: number;
  campaignsActive: number;
  totalSpend: number;
  totalRevenue: number;
  roas: number | null;
  recentLogs: AgentLogRow[];
}

async function loadData(): Promise<DashboardData> {
  const sb = getServerSupabase();
  const [themesQ, storesQ, productsQ, campaignsQ, metricsQ, logsQ] = await Promise.all([
    sb.from("themes").select("id, status"),
    sb.from("stores").select("id, status"),
    sb.from("products").select("id, status"),
    sb.from("ad_campaigns").select("id, status"),
    sb.from("ad_metrics").select("spend, revenue"),
    sb
      .from("agent_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const themes = (themesQ.data ?? []) as Pick<ThemeRow, "id" | "status">[];
  const stores = (storesQ.data ?? []) as Pick<StoreRow, "id" | "status">[];
  const products = (productsQ.data ?? []) as Pick<ProductRow, "id" | "status">[];
  const campaigns = (campaignsQ.data ?? []) as Pick<AdCampaignRow, "id" | "status">[];
  const metrics = (metricsQ.data ?? []) as Pick<AdMetricRow, "spend" | "revenue">[];
  const recentLogs = (logsQ.data ?? []) as AgentLogRow[];

  const totalSpend = metrics.reduce((acc, m) => acc + Number(m.spend ?? 0), 0);
  const totalRevenue = metrics.reduce((acc, m) => acc + Number(m.revenue ?? 0), 0);

  return {
    themes: themes.length,
    themesActive: themes.filter((t) => t.status === "active").length,
    stores: stores.length,
    storesLive: stores.filter((s) => s.status === "live").length,
    products: products.length,
    productsLive: products.filter((p) => p.status === "live").length,
    campaigns: campaigns.length,
    campaignsActive: campaigns.filter((c) => c.status === "active").length,
    totalSpend,
    totalRevenue,
    roas: totalSpend > 0 ? totalRevenue / totalSpend : null,
    recentLogs,
  };
}

export default async function HomePage(): Promise<JSX.Element> {
  if (!hasSupabaseConfig()) {
    return (
      <>
        <PageHeader
          title="Tableau de bord"
          subtitle="Vue d'ensemble du système multi-agent"
        />
        <EmptyState
          title="Supabase non configuré"
          description="Renseignez SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env puis relancez la commande."
          cta={{ label: "Setup", cmd: "pnpm run setup" }}
        />
      </>
    );
  }

  const data = await loadData();
  return (
    <>
      <PageHeader
        title="Tableau de bord"
        subtitle="Vue d'ensemble du système multi-agent — données temps réel."
      />

      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiCard
          label="Thèmes"
          value={formatNumber(data.themes)}
          hint={`${data.themesActive} actifs`}
        />
        <KpiCard
          label="Boutiques"
          value={formatNumber(data.stores)}
          hint={`${data.storesLive} en ligne`}
        />
        <KpiCard
          label="Produits"
          value={formatNumber(data.products)}
          hint={`${data.productsLive} en ligne`}
        />
        <KpiCard
          label="Campagnes"
          value={formatNumber(data.campaigns)}
          hint={`${data.campaignsActive} actives`}
        />
      </section>

      <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <KpiCard label="Dépenses totales" value={formatCurrency(data.totalSpend)} />
        <KpiCard
          label="Revenus totaux"
          value={formatCurrency(data.totalRevenue)}
          tone="success"
        />
        <KpiCard
          label="ROAS global"
          value={data.roas == null ? "—" : `${data.roas.toFixed(2)}×`}
          tone={
            data.roas == null ? "default" : data.roas >= 2 ? "success" : "warning"
          }
        />
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500">
          Dernières actions agents
        </h2>
        {data.recentLogs.length === 0 ? (
          <EmptyState
            title="Aucune action enregistrée"
            description="Lancez un workflow pour générer des logs d'agents."
            cta={{ label: "CLI", cmd: "pnpm run workflow:full -- --theme=<uuid>" }}
          />
        ) : (
          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wider text-neutral-500">
                <tr>
                  <th className="px-4 py-2">Agent</th>
                  <th className="px-4 py-2">Action</th>
                  <th className="px-4 py-2">Statut</th>
                  <th className="px-4 py-2">Durée</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.recentLogs.map((log) => (
                  <tr key={log.id} className="border-t border-neutral-100">
                    <td className="px-4 py-2 font-medium text-neutral-900">
                      {log.agent_name}
                    </td>
                    <td className="px-4 py-2 text-neutral-600">
                      {truncate(log.action, 40)}
                    </td>
                    <td className="px-4 py-2">
                      <Badge value={log.status} />
                    </td>
                    <td className="px-4 py-2 text-neutral-600">
                      {log.duration_ms == null
                        ? "—"
                        : `${formatNumber(log.duration_ms)} ms`}
                    </td>
                    <td className="px-4 py-2 text-neutral-500">
                      {formatDateTime(log.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
