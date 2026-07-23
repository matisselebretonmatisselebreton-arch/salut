import Link from "next/link";
import { formatMoney, formatPercent } from "@/core";
import { getRepository } from "@/lib/data";
import { getRequestLocale, getT } from "@/i18n/server";

export default async function BudgetsPage() {
  const locale = await getRequestLocale();
  const t = await getT(locale);
  const budgets = await getRepository().listBudgets();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{t("budget:list.title")}</h1>

      {budgets.length === 0 ? (
        <p className="text-muted">{t("budget:list.empty")}</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-card text-left text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">{t("budget:fields.asset")}</th>
                <th className="px-4 py-3 font-medium">{t("budget:fields.fiscalYear")}</th>
                <th className="px-4 py-3 font-medium text-right">{t("budget:fields.budgeted")}</th>
                <th className="px-4 py-3 font-medium text-right">{t("budget:fields.actual")}</th>
                <th className="px-4 py-3 font-medium text-right">{t("budget:fields.variancePct")}</th>
                <th className="px-4 py-3 font-medium">{t("budget:fields.overruns")}</th>
              </tr>
            </thead>
            <tbody>
              {budgets.map((b) => (
                <tr key={b.id} className="border-t border-border hover:bg-card">
                  <td className="px-4 py-3">
                    <Link href={`/budgets/${b.id}`} className="font-medium text-primary hover:underline">
                      {b.assetName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted">{b.fiscalYear}</td>
                  <td className="px-4 py-3 text-right">{formatMoney(b.totalBudgeted, locale)}</td>
                  <td className="px-4 py-3 text-right">{formatMoney(b.totalActual, locale)}</td>
                  <td
                    className={
                      "px-4 py-3 text-right font-medium " +
                      (b.variance > 0 ? "text-status-urgent" : "text-status-ok")
                    }
                  >
                    {b.variancePct != null
                      ? formatPercent(b.variancePct / 100, locale, 1)
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {b.overrunCount > 0 ? (
                      <span className="rounded-full bg-status-urgent/10 px-2.5 py-0.5 text-xs font-medium text-status-urgent">
                        {b.overrunCount}
                      </span>
                    ) : (
                      <span className="text-status-ok">✓</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
