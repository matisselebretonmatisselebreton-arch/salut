import Link from "next/link";
import { formatDate, formatMoney, type Locale } from "@/core";
import { getT } from "@/i18n/server";
import type { LeaseSummaryDTO } from "@/lib/data";
import { LeaseStatusBadge } from "./LeaseStatusBadge";

/**
 * Tableau de baux réutilisable (liste globale, historique locataire, onglet
 * actif). `show` permet de masquer la colonne redondante selon le contexte.
 */
export async function LeaseTable({
  leases,
  locale,
  hide = [],
}: {
  leases: LeaseSummaryDTO[];
  locale: Locale;
  hide?: ("tenant" | "asset")[];
}) {
  const t = await getT(locale);
  const showTenant = !hide.includes("tenant");
  const showAsset = !hide.includes("asset");

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-card text-left text-muted">
          <tr>
            <th className="px-4 py-3 font-medium">{t("lease:fields.reference")}</th>
            <th className="px-4 py-3 font-medium">{t("lease:fields.type")}</th>
            {showTenant && (
              <th className="px-4 py-3 font-medium">{t("lease:fields.tenant")}</th>
            )}
            {showAsset && (
              <th className="px-4 py-3 font-medium">{t("lease:fields.asset")}</th>
            )}
            <th className="px-4 py-3 font-medium">{t("lease:fields.period")}</th>
            <th className="px-4 py-3 font-medium">{t("lease:fields.monthlyTotal")}</th>
            <th className="px-4 py-3 font-medium">{t("lease:fields.status")}</th>
          </tr>
        </thead>
        <tbody>
          {leases.map((l) => (
            <tr key={l.id} className="border-t border-border hover:bg-card">
              <td className="px-4 py-3">
                <Link
                  href={`/leases/${l.id}`}
                  className="font-medium text-primary hover:underline"
                >
                  {l.reference ?? "—"}
                </Link>
              </td>
              <td className="px-4 py-3 text-muted">{t(`lease:type.${l.leaseType}`)}</td>
              {showTenant && (
                <td className="px-4 py-3">
                  <Link
                    href={`/tenants/${l.tenantId}`}
                    className="hover:underline"
                  >
                    {l.tenantName}
                  </Link>
                </td>
              )}
              {showAsset && (
                <td className="px-4 py-3">
                  <Link
                    href={`/assets/${l.assetId}`}
                    className="hover:underline"
                  >
                    {l.assetName}
                  </Link>
                </td>
              )}
              <td className="px-4 py-3 text-muted">
                {formatDate(l.startDate, locale)}
                {l.endDate ? ` → ${formatDate(l.endDate, locale)}` : ""}
              </td>
              <td className="px-4 py-3">{formatMoney(l.monthlyTotal, locale)}</td>
              <td className="px-4 py-3">
                <LeaseStatusBadge
                  status={l.status}
                  label={t(`lease:status.${l.status}`)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
