import Link from "next/link";
import { formatMoney, invoiceTotals, type LeaseType } from "@/core";
import { getRepository } from "@/lib/data";
import { getRequestLocale, getT } from "@/i18n/server";

// TVA : résidentiel non assujetti, sinon 20 % (aligné sur le moteur de démo).
function vatRateFor(type: LeaseType): number {
  return type === "residential_bare" || type === "residential_furnished" ? 0 : 0.2;
}

export default async function GenerateInvoicesPage() {
  const locale = await getRequestLocale();
  const t = await getT(locale);

  const leases = (await getRepository().listLeases()).filter(
    (l) => l.status === "active",
  );

  const now = new Date();
  const monthLabel = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    month: "long",
    year: "numeric",
  }).format(now);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/invoices" className="text-sm text-muted hover:text-foreground">
          ← {t("nav.invoices")}
        </Link>
        <h1 className="mt-2 text-2xl font-bold">
          {t("invoice:generate.title")} — {monthLabel}
        </h1>
      </div>

      <p className="rounded-lg bg-status-warn/10 px-4 py-3 text-sm text-status-warn">
        {t("invoice:generate.hint")}
      </p>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-card text-left text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">{t("invoice:fields.tenant")}</th>
              <th className="px-4 py-3 font-medium">{t("invoice:fields.asset")}</th>
              <th className="px-4 py-3 font-medium text-right">{t("invoice:detail.ht")}</th>
              <th className="px-4 py-3 font-medium text-right">{t("invoice:detail.vat")}</th>
              <th className="px-4 py-3 font-medium text-right">{t("invoice:detail.ttc")}</th>
            </tr>
          </thead>
          <tbody>
            {leases.map((l) => {
              const { ht, vat, ttc } = invoiceTotals(
                [{ amount: l.monthlyTotal }],
                vatRateFor(l.leaseType),
              );
              return (
                <tr key={l.id} className="border-t border-border">
                  <td className="px-4 py-3">{l.tenantName}</td>
                  <td className="px-4 py-3 text-muted">{l.assetName}</td>
                  <td className="px-4 py-3 text-right">{formatMoney(ht, locale)}</td>
                  <td className="px-4 py-3 text-right text-muted">{formatMoney(vat, locale)}</td>
                  <td className="px-4 py-3 text-right font-medium">{formatMoney(ttc, locale)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
