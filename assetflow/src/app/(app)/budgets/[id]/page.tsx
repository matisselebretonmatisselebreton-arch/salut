import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, formatMoney, formatPercent, type Locale } from "@/core";
import { getRepository, type BudgetDetailDTO } from "@/lib/data";
import { getRequestLocale, getT } from "@/i18n/server";

type TFn = Awaited<ReturnType<typeof getT>>;

export default async function BudgetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getRequestLocale();
  const t = await getT(locale);

  const budget = await getRepository().getBudget(id);
  if (!budget) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/budgets" className="text-sm text-muted hover:text-foreground">
          ← {t("nav.budgets")}
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold">
            {budget.assetName} — {budget.fiscalYear}
          </h1>
          {budget.overrunCount > 0 && (
            <span className="rounded-full bg-status-urgent/10 px-3 py-0.5 text-sm text-status-urgent">
              {budget.overrunCount} {t("budget:fields.overruns").toLowerCase()}
            </span>
          )}
        </div>
      </div>

      <BvaTable budget={budget} locale={locale} t={t} />
      <ExpensesTable budget={budget} locale={locale} t={t} />
    </div>
  );
}

function VarianceText({ value, pct, locale }: { value: number; pct: number | null; locale: Locale }) {
  const color = value > 0 ? "text-status-urgent" : value < 0 ? "text-status-ok" : "text-muted";
  return (
    <span className={color}>
      {value > 0 ? "+" : ""}
      {formatMoney(value, locale)}
      {pct != null ? ` (${value > 0 ? "+" : ""}${formatPercent(pct / 100, locale, 1)})` : ""}
    </span>
  );
}

function BvaTable({ budget, locale, t }: { budget: BudgetDetailDTO; locale: Locale; t: TFn }) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold">{t("budget:detail.bva")}</h2>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-card text-left text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">{t("budget:detail.poste")}</th>
              <th className="px-4 py-3 font-medium text-right">{t("budget:fields.budgeted")}</th>
              <th className="px-4 py-3 font-medium text-right">{t("budget:fields.actual")}</th>
              <th className="px-4 py-3 font-medium text-right">{t("budget:fields.variance")}</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {budget.lines.map((l) => (
              <tr key={l.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <div className="font-medium">{l.label}</div>
                  <div className="text-xs text-muted">{t(`budget:category.${l.category}`)}</div>
                </td>
                <td className="px-4 py-3 text-right">{formatMoney(l.budgeted, locale)}</td>
                <td className="px-4 py-3 text-right">{formatMoney(l.actual, locale)}</td>
                <td className="px-4 py-3 text-right">
                  <VarianceText value={l.variance} pct={l.variancePct} locale={locale} />
                </td>
                <td className="px-4 py-3">
                  {l.isOverrun && (
                    <span
                      className="rounded-full bg-status-urgent/10 px-2 py-0.5 text-xs font-medium text-status-urgent"
                      title={t("budget:detail.overrunAlert")}
                    >
                      ⚠ {t("budget:detail.overrunAlert")}
                    </span>
                  )}
                </td>
              </tr>
            ))}
            <tr className="border-t-2 border-border bg-card font-semibold">
              <td className="px-4 py-3">{t("budget:detail.total")}</td>
              <td className="px-4 py-3 text-right">{formatMoney(budget.totalBudgeted, locale)}</td>
              <td className="px-4 py-3 text-right">{formatMoney(budget.totalActual, locale)}</td>
              <td className="px-4 py-3 text-right">
                <VarianceText value={budget.variance} pct={budget.variancePct} locale={locale} />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ExpensesTable({ budget, locale, t }: { budget: BudgetDetailDTO; locale: Locale; t: TFn }) {
  const statusColor: Record<string, string> = {
    paid: "text-status-ok",
    approved: "text-primary",
    submitted: "text-status-warn",
    rejected: "text-status-urgent",
  };
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold">{t("budget:detail.expenses")}</h2>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-card text-left text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">{t("budget:detail.date")}</th>
              <th className="px-4 py-3 font-medium">{t("budget:detail.supplier")}</th>
              <th className="px-4 py-3 font-medium">{t("budget:detail.label")}</th>
              <th className="px-4 py-3 font-medium">{t("budget:detail.line")}</th>
              <th className="px-4 py-3 font-medium">{t("budget:detail.nature")}</th>
              <th className="px-4 py-3 font-medium text-right">{t("budget:detail.amount")}</th>
              <th className="px-4 py-3 font-medium">{t("budget:detail.status")}</th>
            </tr>
          </thead>
          <tbody>
            {budget.expenses.map((e) => (
              <tr key={e.id} className="border-t border-border">
                <td className="px-4 py-3 whitespace-nowrap">{formatDate(e.incurredOn, locale)}</td>
                <td className="px-4 py-3">{e.supplier ?? "—"}</td>
                <td className="px-4 py-3 text-muted">{e.label}</td>
                <td className="px-4 py-3 text-muted">{e.budgetLineLabel ?? "—"}</td>
                <td className="px-4 py-3">{t(`budget:nature.${e.nature}`)}</td>
                <td className="px-4 py-3 text-right">{formatMoney(e.amount, locale)}</td>
                <td className={`px-4 py-3 ${statusColor[e.status] ?? ""}`}>
                  {t(`budget:status.${e.status}`)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
