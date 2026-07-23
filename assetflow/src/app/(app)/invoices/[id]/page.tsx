import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, formatMoney, formatPercent } from "@/core";
import { getRepository } from "@/lib/data";
import { getRequestLocale, getT } from "@/i18n/server";
import { PaymentStatusBadge } from "@/components/PaymentStatusBadge";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getRequestLocale();
  const t = await getT(locale);

  const invoice = await getRepository().getInvoice(id);
  if (!invoice) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/invoices" className="text-sm text-muted hover:text-foreground">
          ← {t("nav.invoices")}
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold">{invoice.number ?? "—"}</h1>
          <span className="rounded-full bg-primary/10 px-3 py-0.5 text-sm text-primary">
            {t(`invoice:type.${invoice.type}`)}
          </span>
          <PaymentStatusBadge
            status={invoice.paymentStatus}
            label={t(`invoice:status.${invoice.paymentStatus}`)}
          />
        </div>
        <p className="mt-1 text-muted">
          <Link href={`/leases/${invoice.leaseId}`} className="hover:underline">
            {invoice.leaseReference}
          </Link>
          {" · "}
          {invoice.tenantName} · {invoice.assetName}
        </p>
        <p className="text-sm text-muted">
          {t("invoice:fields.period")} :{" "}
          {formatDate(invoice.periodStart, locale)} → {formatDate(invoice.periodEnd, locale)}
          {invoice.dueDate
            ? ` · ${t("invoice:fields.dueDate")} : ${formatDate(invoice.dueDate, locale)}`
            : ""}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Détail des lignes + totaux */}
        <section className="rounded-xl border border-border p-5">
          <h2 className="mb-4 text-lg font-semibold">{t("invoice:detail.lines")}</h2>
          <table className="w-full text-sm">
            <tbody>
              {invoice.lines.map((l, i) => (
                <tr key={i} className="border-b border-border">
                  <td className="py-2">{l.label}</td>
                  <td className="py-2 text-right">{formatMoney(l.amount, locale)}</td>
                </tr>
              ))}
              <tr>
                <td className="pt-3 text-muted">{t("invoice:detail.ht")}</td>
                <td className="pt-3 text-right">{formatMoney(invoice.totalHt, locale)}</td>
              </tr>
              <tr>
                <td className="py-1 text-muted">
                  {t("invoice:detail.vat")} ({formatPercent(invoice.vatRate, locale)})
                </td>
                <td className="py-1 text-right">{formatMoney(invoice.totalVat, locale)}</td>
              </tr>
              <tr>
                <td className="pt-2 font-semibold">{t("invoice:detail.ttc")}</td>
                <td className="pt-2 text-right font-semibold">
                  {formatMoney(invoice.totalTtc, locale)}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Encaissements */}
        <section className="rounded-xl border border-border p-5">
          <h2 className="mb-4 text-lg font-semibold">{t("invoice:detail.payments")}</h2>
          {invoice.payments.length === 0 ? (
            <p className="text-muted">{t("invoice:detail.noPayments")}</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-muted">
                <tr>
                  <th className="pb-2 font-medium">{t("invoice:detail.paidOn")}</th>
                  <th className="pb-2 font-medium">{t("invoice:detail.method")}</th>
                  <th className="pb-2 font-medium">{t("invoice:detail.reference")}</th>
                  <th className="pb-2 text-right font-medium">{t("invoice:fields.paid")}</th>
                </tr>
              </thead>
              <tbody>
                {invoice.payments.map((p) => (
                  <tr key={p.id} className="border-t border-border">
                    <td className="py-2">{formatDate(p.paidOn, locale)}</td>
                    <td className="py-2 text-muted">{t(`invoice:method.${p.method}`)}</td>
                    <td className="py-2 text-muted">{p.reference ?? "—"}</td>
                    <td className="py-2 text-right">{formatMoney(p.amount, locale)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="mt-4 flex justify-between border-t border-border pt-3 text-sm">
            <span className="text-muted">{t("invoice:fields.outstanding")}</span>
            <span
              className={
                invoice.outstanding > 0 ? "font-semibold text-status-urgent" : "text-status-ok"
              }
            >
              {formatMoney(invoice.outstanding, locale)}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
