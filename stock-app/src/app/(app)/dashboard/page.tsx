import { createClient } from "@/lib/supabase/server";
import { getDashboardSummary } from "@/lib/services/dashboard";
import { StatTile, Card } from "@/components/ui/Card";
import { formatEuros } from "@/lib/utils/currency";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string }>;
}) {
  const { from, to } = await searchParams;
  const supabase = await createClient();
  const summary = await getDashboardSummary(supabase, { from, to });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Tableau de bord</h1>
        <form className="flex items-center gap-2 text-sm" method="get">
          <input
            type="date"
            name="from"
            defaultValue={from}
            className="rounded-lg border border-zinc-300 bg-white px-2 py-1.5 dark:border-zinc-700 dark:bg-zinc-900"
          />
          <span className="text-zinc-400">→</span>
          <input
            type="date"
            name="to"
            defaultValue={to}
            className="rounded-lg border border-zinc-300 bg-white px-2 py-1.5 dark:border-zinc-700 dark:bg-zinc-900"
          />
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 px-3 py-1.5 font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            Appliquer
          </button>
        </form>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile
          label="Marge totale réalisée"
          value={formatEuros(summary.totalMargin)}
          hint={from || to ? "Sur la période sélectionnée" : "Toutes ventes confondues"}
        />
        <StatTile
          label="Valeur du stock actuel"
          value={formatEuros(summary.stockValue)}
          hint={`${summary.stockCount} exemplaire(s) en stock`}
        />
        <StatTile
          label="Taux de défaut qualité global"
          value={`${(summary.globalDefectRate * 100).toFixed(0)} %`}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 font-medium text-zinc-900 dark:text-zinc-50">
            Fournisseurs — marge moyenne & taux de défaut
          </h2>
          {summary.bestSuppliers.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Pas encore de données.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-zinc-500">
                  <th className="pb-2">Fournisseur</th>
                  <th className="pb-2">Marge moyenne</th>
                  <th className="pb-2">Défauts</th>
                </tr>
              </thead>
              <tbody>
                {summary.bestSuppliers.map((s) => (
                  <tr key={s.supplierId} className="border-t border-zinc-100 dark:border-zinc-900">
                    <td className="py-2">{s.name}</td>
                    <td className="py-2">{s.averageMargin !== null ? formatEuros(s.averageMargin) : "—"}</td>
                    <td className="py-2">
                      {s.defectRate !== null ? `${(s.defectRate * 100).toFixed(0)} %` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>

        <Card>
          <h2 className="mb-4 font-medium text-zinc-900 dark:text-zinc-50">
            Produits les plus rentables
          </h2>
          {summary.topProducts.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Pas encore de ventes.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-zinc-500">
                  <th className="pb-2">Produit</th>
                  <th className="pb-2">Unités vendues</th>
                  <th className="pb-2">Marge totale</th>
                </tr>
              </thead>
              <tbody>
                {summary.topProducts.map((p) => (
                  <tr key={p.productId} className="border-t border-zinc-100 dark:border-zinc-900">
                    <td className="py-2">{p.name}</td>
                    <td className="py-2">{p.unitsSold}</td>
                    <td className="py-2">{formatEuros(p.totalMargin)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </div>
  );
}
