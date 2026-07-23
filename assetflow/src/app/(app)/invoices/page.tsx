import Link from "next/link";
import { formatDate, formatMoney } from "@/core";
import { getRepository } from "@/lib/data";
import { getRequestLocale, getT } from "@/i18n/server";
import { PaymentStatusBadge } from "@/components/PaymentStatusBadge";

export default async function InvoicesPage() {
  const locale = await getRequestLocale();
  const t = await getT(locale);
  const repo = getRepository();
  const [invoices, summary] = await Promise.all([
    repo.listInvoices(),
    repo.invoicingSummary(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("invoice:list.title")}</h1>
        <Link
          href="/invoices/generate"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white"
        >
          {t("invoice:list.generate")}
        </Link>
      </div>

      {/* Indicateurs d'encaissement */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Kpi label={t("invoice:summary.outstanding")} value={formatMoney(summary.totalOutstanding, locale)} tone="warn" />
        <Kpi label={t("invoice:summary.overdue")} value={String(summary.overdueCount)} tone="urgent" />
        <Kpi label={t("invoice:summary.pending")} value={String(summary.pendingCount)} tone="muted" />
        <Kpi label={t("invoice:summary.paid")} value={String(summary.paidCount)} tone="ok" />
      </div>

      {invoices.length === 0 ? (
        <p className="text-muted">{t("invoice:list.empty")}</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-card text-left text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">{t("invoice:fields.number")}</th>
                <th className="px-4 py-3 font-medium">{t("invoice:fields.period")}</th>
                <th className="px-4 py-3 font-medium">{t("invoice:fields.tenant")}</th>
                <th className="px-4 py-3 font-medium">{t("invoice:fields.asset")}</th>
                <th className="px-4 py-3 font-medium text-right">{t("invoice:fields.ttc")}</th>
                <th className="px-4 py-3 font-medium text-right">{t("invoice:fields.outstanding")}</th>
                <th className="px-4 py-3 font-medium">{t("invoice:fields.status")}</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-t border-border hover:bg-card">
                  <td className="px-4 py-3">
                    <Link href={`/invoices/${inv.id}`} className="font-medium text-primary hover:underline">
                      {inv.number ?? "—"}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {formatDate(inv.periodStart, locale).replace(/^\d+\s?/, "")}
                  </td>
                  <td className="px-4 py-3 text-muted">{inv.tenantName}</td>
                  <td className="px-4 py-3 text-muted">{inv.assetName}</td>
                  <td className="px-4 py-3 text-right">{formatMoney(inv.totalTtc, locale)}</td>
                  <td className="px-4 py-3 text-right">
                    {inv.outstanding > 0 ? formatMoney(inv.outstanding, locale) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <PaymentStatusBadge
                      status={inv.paymentStatus}
                      label={t(`invoice:status.${inv.paymentStatus}`)}
                    />
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

function Kpi({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "ok" | "warn" | "urgent" | "muted";
}) {
  const color =
    tone === "ok"
      ? "text-status-ok"
      : tone === "warn"
        ? "text-status-warn"
        : tone === "urgent"
          ? "text-status-urgent"
          : "text-foreground";
  return (
    <div className="rounded-xl border border-border p-4">
      <div className="text-sm text-muted">{label}</div>
      <div className={`mt-1 text-2xl font-bold ${color}`}>{value}</div>
    </div>
  );
}
