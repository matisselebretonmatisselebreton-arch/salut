import Link from "next/link";
import {
  alertLevel,
  computeOccupancy,
  formatDate,
  formatMoney,
  formatPercent,
} from "@/core";
import { getRepository } from "@/lib/data";
import { getRequestLocale, getT } from "@/i18n/server";
import { PaymentStatusBadge } from "@/components/PaymentStatusBadge";

export default async function DashboardPage() {
  const locale = await getRequestLocale();
  const t = await getT(locale);
  const repo = getRepository();

  // Agrégation transverse (Modules 1→4).
  const [portfolios, leases, invSummary, invoices, deadlines, budgets] =
    await Promise.all([
      repo.listPortfolios(),
      repo.listLeases(),
      repo.invoicingSummary(),
      repo.listInvoices(),
      repo.listUpcomingDeadlines(),
      repo.listBudgets(),
    ]);

  const assetLists = await Promise.all(
    portfolios.map((p) => repo.listAssetsByPortfolio(p.id)),
  );
  const allUnits = assetLists.flat().flatMap((a) => a.units);
  const occupancy = computeOccupancy(allUnits).byArea;

  const totalValue = portfolios.reduce((s, p) => s + p.totalValue, 0);
  const assetCount = portfolios.reduce((s, p) => s + p.assetCount, 0);
  const annualRent = leases
    .filter((l) => l.status === "active")
    .reduce((s, l) => s + l.monthlyTotal * 12, 0);
  const overrunCount = budgets.reduce((s, b) => s + b.overrunCount, 0);
  const soonDeadlines = deadlines.filter((d) => alertLevel(d.date) !== "none");
  const overdueInvoices = invoices.filter((i) => i.paymentStatus === "overdue");

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">{t("dashboard:title")}</h1>

      {/* Tuiles KPI */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Tile label={t("dashboard:tiles.patrimonyValue")} value={formatMoney(totalValue, locale)} />
        <Tile label={t("dashboard:tiles.assets")} value={String(assetCount)} />
        <Tile
          label={t("dashboard:tiles.occupancy")}
          value={formatPercent(occupancy, locale)}
          tone={occupancy != null && occupancy < 0.9 ? "warn" : "ok"}
        />
        <Tile label={t("dashboard:tiles.annualRent")} value={formatMoney(annualRent, locale)} />
        <Tile
          label={t("dashboard:tiles.outstanding")}
          value={formatMoney(invSummary.totalOutstanding, locale)}
          tone={invSummary.totalOutstanding > 0 ? "warn" : "ok"}
        />
        <Tile
          label={t("dashboard:tiles.overdue")}
          value={String(invSummary.overdueCount)}
          tone={invSummary.overdueCount > 0 ? "urgent" : "ok"}
          href="/invoices"
        />
        <Tile
          label={t("dashboard:tiles.upcomingDeadlines")}
          value={String(soonDeadlines.length)}
          tone={soonDeadlines.length > 0 ? "warn" : "ok"}
          href="/deadlines"
        />
        <Tile
          label={t("dashboard:tiles.budgetOverruns")}
          value={String(overrunCount)}
          tone={overrunCount > 0 ? "urgent" : "ok"}
          href="/budgets"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Prochaines échéances */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{t("dashboard:sections.nextDeadlines")}</h2>
            <Link href="/deadlines" className="text-sm text-primary hover:underline">
              {t("nav.deadlines")} →
            </Link>
          </div>
          {soonDeadlines.length === 0 ? (
            <p className="text-muted">{t("dashboard:sections.none")}</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {soonDeadlines.slice(0, 5).map((d, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-border px-4 py-2 text-sm"
                >
                  <Link href={`/leases/${d.leaseId}`} className="text-primary hover:underline">
                    {d.leaseReference}
                  </Link>
                  <span className="text-muted">{t(`deadline:type.${d.type}`)}</span>
                  <span>{formatDate(d.date, locale)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Impayés */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{t("dashboard:sections.overdueInvoices")}</h2>
            <Link href="/invoices" className="text-sm text-primary hover:underline">
              {t("nav.invoices")} →
            </Link>
          </div>
          {overdueInvoices.length === 0 ? (
            <p className="text-muted">{t("dashboard:sections.none")}</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {overdueInvoices.slice(0, 5).map((inv) => (
                <li
                  key={inv.id}
                  className="flex items-center justify-between rounded-lg border border-border px-4 py-2 text-sm"
                >
                  <Link href={`/invoices/${inv.id}`} className="text-primary hover:underline">
                    {inv.number}
                  </Link>
                  <span className="text-muted">{inv.tenantName}</span>
                  <span className="flex items-center gap-2">
                    {formatMoney(inv.outstanding, locale)}
                    <PaymentStatusBadge
                      status={inv.paymentStatus}
                      label={t(`invoice:status.${inv.paymentStatus}`)}
                    />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

function Tile({
  label,
  value,
  tone = "default",
  href,
}: {
  label: string;
  value: string;
  tone?: "default" | "ok" | "warn" | "urgent";
  href?: string;
}) {
  const color =
    tone === "urgent"
      ? "text-status-urgent"
      : tone === "warn"
        ? "text-status-warn"
        : tone === "ok"
          ? "text-status-ok"
          : "text-foreground";
  const inner = (
    <div className="rounded-xl border border-border p-4 transition hover:border-primary">
      <div className="text-sm text-muted">{label}</div>
      <div className={`mt-1 text-2xl font-bold ${color}`}>{value}</div>
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}
