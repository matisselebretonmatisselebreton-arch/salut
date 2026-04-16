/**
 * Page Analytics — performance produit (vue product_performance_summary)
 * + métriques journalières agrégées.
 */
import { EmptyState } from "@/components/EmptyState";
import { KpiCard } from "@/components/KpiCard";
import { PageHeader } from "@/components/PageHeader";
import { formatCurrency, formatDate, formatNumber } from "@/lib/formatters";
import { getServerSupabase, hasSupabaseConfig } from "@/lib/supabase-server";
import type { AdMetricRow, ProductPerformanceSummaryRow } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface DailyMetric {
  date: string;
  spend: number;
  revenue: number;
  conversions: number;
  roas: number | null;
}

async function loadAnalytics(): Promise<{
  perfs: ProductPerformanceSummaryRow[];
  daily: DailyMetric[];
}> {
  const sb = getServerSupabase();
  const [perfQ, dailyQ] = await Promise.all([
    sb
      .from("product_performance_summary")
      .select("*")
      .order("total_revenue", { ascending: false })
      .limit(50),
    sb
      .from("ad_metrics")
      .select("date, spend, revenue, conversions")
      .order("date", { ascending: false })
      .limit(500),
  ]);
  const perfs = (perfQ.data ?? []) as ProductPerformanceSummaryRow[];
  const metrics = (dailyQ.data ?? []) as Pick<
    AdMetricRow,
    "date" | "spend" | "revenue" | "conversions"
  >[];

  const byDay = new Map<
    string,
    { spend: number; revenue: number; conversions: number }
  >();
  for (const m of metrics) {
    const cur = byDay.get(m.date) ?? { spend: 0, revenue: 0, conversions: 0 };
    cur.spend += Number(m.spend ?? 0);
    cur.revenue += Number(m.revenue ?? 0);
    cur.conversions += Number(m.conversions ?? 0);
    byDay.set(m.date, cur);
  }
  const daily: DailyMetric[] = Array.from(byDay.entries())
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .slice(0, 30)
    .map(([date, v]) => ({
      date,
      spend: v.spend,
      revenue: v.revenue,
      conversions: v.conversions,
      roas: v.spend > 0 ? v.revenue / v.spend : null,
    }));
  return { perfs, daily };
}

export default async function AnalyticsPage(): Promise<JSX.Element> {
  if (!hasSupabaseConfig()) {
    return (
      <>
        <PageHeader title="Analytics" />
        <EmptyState
          title="Supabase non configuré"
          cta={{ label: "Setup", cmd: "pnpm run setup" }}
        />
      </>
    );
  }
  const { perfs, daily } = await loadAnalytics();

  const totalSpend = perfs.reduce((acc, p) => acc + Number(p.total_spend ?? 0), 0);
  const totalRevenue = perfs.reduce(
    (acc, p) => acc + Number(p.total_revenue ?? 0),
    0,
  );
  const totalConv = perfs.reduce(
    (acc, p) => acc + Number(p.total_conversions ?? 0),
    0,
  );

  return (
    <>
      <PageHeader
        title="Analytics"
        subtitle="Top produits + courbe ROAS journalière."
      />

      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiCard label="Dépenses" value={formatCurrency(totalSpend)} />
        <KpiCard label="Revenus" value={formatCurrency(totalRevenue)} tone="success" />
        <KpiCard label="Conversions" value={formatNumber(totalConv)} />
        <KpiCard
          label="ROAS"
          value={totalSpend > 0 ? `${(totalRevenue / totalSpend).toFixed(2)}×` : "—"}
          tone={
            totalSpend === 0
              ? "default"
              : totalRevenue / totalSpend >= 2
                ? "success"
                : "warning"
          }
        />
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500">
          Top produits
        </h2>
        {perfs.length === 0 ? (
          <EmptyState
            title="Aucune donnée de performance"
            description="Lancez le workflow analyze pour ingérer les métriques."
            cta={{ label: "CLI", cmd: "pnpm run workflow:analyze" }}
          />
        ) : (
          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wider text-neutral-500">
                <tr>
                  <th className="px-4 py-2">Produit</th>
                  <th className="px-4 py-2">Boutique</th>
                  <th className="px-4 py-2 text-right">Camp.</th>
                  <th className="px-4 py-2 text-right">Dépensé</th>
                  <th className="px-4 py-2 text-right">Revenus</th>
                  <th className="px-4 py-2 text-right">Conv.</th>
                  <th className="px-4 py-2 text-right">CPA moy.</th>
                  <th className="px-4 py-2 text-right">ROAS</th>
                </tr>
              </thead>
              <tbody>
                {perfs.map((p) => (
                  <tr key={p.product_id} className="border-t border-neutral-100">
                    <td className="px-4 py-2 font-medium text-neutral-900">
                      {p.product_name}
                    </td>
                    <td className="px-4 py-2 text-neutral-600">
                      {p.store_name ?? "—"}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums">
                      {p.campaigns_count}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums">
                      {formatCurrency(Number(p.total_spend))}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums">
                      {formatCurrency(Number(p.total_revenue))}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums">
                      {formatNumber(Number(p.total_conversions))}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums">
                      {formatCurrency(p.avg_cpa)}
                    </td>
                    <td
                      className={`px-4 py-2 text-right tabular-nums ${
                        p.roas == null
                          ? ""
                          : p.roas >= 2
                            ? "text-green-600"
                            : "text-red-600"
                      }`}
                    >
                      {p.roas == null ? "—" : `${p.roas.toFixed(2)}×`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500">
          30 derniers jours
        </h2>
        {daily.length === 0 ? (
          <EmptyState title="Aucune métrique journalière" />
        ) : (
          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wider text-neutral-500">
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2 text-right">Dépensé</th>
                  <th className="px-4 py-2 text-right">Revenus</th>
                  <th className="px-4 py-2 text-right">Conv.</th>
                  <th className="px-4 py-2 text-right">ROAS</th>
                </tr>
              </thead>
              <tbody>
                {daily.map((d) => (
                  <tr key={d.date} className="border-t border-neutral-100">
                    <td className="px-4 py-2 text-neutral-700">{formatDate(d.date)}</td>
                    <td className="px-4 py-2 text-right tabular-nums">
                      {formatCurrency(d.spend)}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums">
                      {formatCurrency(d.revenue)}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums">
                      {formatNumber(d.conversions)}
                    </td>
                    <td
                      className={`px-4 py-2 text-right tabular-nums ${
                        d.roas == null
                          ? ""
                          : d.roas >= 2
                            ? "text-green-600"
                            : "text-red-600"
                      }`}
                    >
                      {d.roas == null ? "—" : `${d.roas.toFixed(2)}×`}
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
