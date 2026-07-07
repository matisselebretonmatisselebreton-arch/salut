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
  const s = await getDashboardSummary(supabase, { from, to });

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

      <div className="mb-3 text-sm font-medium text-zinc-500">Réalisé (articles vendus)</div>
      <div className="grid gap-4 sm:grid-cols-2">
        <StatTile
          label="CA réalisé"
          value={formatEuros(s.realCA)}
          hint={from || to ? "Sur la période" : "Total"}
        />
        <StatTile label="Bénéfice net réalisé" value={formatEuros(s.realProfit)} hint="Après achat, livraison, frais Vinted" />
      </div>

      <div className="mb-3 mt-6 text-sm font-medium text-zinc-500">
        Potentiel (réalisé + estimation du stock)
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <StatTile
          label="CA potentiel"
          value={formatEuros(s.potentialCA)}
          hint={`dont ${formatEuros(s.stockEstimatedCA)} de stock estimé`}
        />
        <StatTile label="Bénéfice potentiel" value={formatEuros(s.potentialProfit)} />
      </div>

      <div className="mb-3 mt-6 text-sm font-medium text-zinc-500">Stock</div>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Valeur du stock (coût)" value={formatEuros(s.stockCost)} />
        <StatTile
          label="Exemplaires"
          value={`${s.counts.received + s.counts.forSale}`}
          hint={`${s.counts.received} reçus · ${s.counts.forSale} en vente · ${s.counts.sold} vendus`}
        />
        <StatTile
          label="Délai moyen de vente"
          value={s.avgDaysToSell !== null ? `${Math.round(s.avgDaysToSell)} j` : "—"}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 font-medium text-zinc-900 dark:text-zinc-50">Produits les plus rentables</h2>
          {s.topProducts.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Pas encore de ventes.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-zinc-500">
                  <th className="pb-2">Produit</th>
                  <th className="pb-2">Vendus</th>
                  <th className="pb-2">Bénéfice</th>
                </tr>
              </thead>
              <tbody>
                {s.topProducts.map((p) => (
                  <tr key={p.productId} className="border-t border-zinc-100 dark:border-zinc-900">
                    <td className="py-2">{p.name}</td>
                    <td className="py-2">{p.unitsSold}</td>
                    <td className="py-2">{formatEuros(p.profit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>

        <Card>
          <h2 className="mb-4 font-medium text-zinc-900 dark:text-zinc-50">Marques les plus rentables</h2>
          {s.topBrands.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Pas encore de ventes.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-zinc-500">
                  <th className="pb-2">Marque</th>
                  <th className="pb-2">Vendus</th>
                  <th className="pb-2">Bénéfice</th>
                </tr>
              </thead>
              <tbody>
                {s.topBrands.map((b) => (
                  <tr key={b.brand} className="border-t border-zinc-100 dark:border-zinc-900">
                    <td className="py-2">{b.brand}</td>
                    <td className="py-2">{b.unitsSold}</td>
                    <td className="py-2">{formatEuros(b.profit)}</td>
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
