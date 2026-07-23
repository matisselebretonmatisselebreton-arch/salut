import Link from "next/link";
import { notFound } from "next/navigation";
import { formatArea, formatDate, formatMoney } from "@/core";
import { getRepository } from "@/lib/data";
import { getRequestLocale, getT } from "@/i18n/server";
import { OccupancyBadge } from "@/components/OccupancyBadge";
import { Tabs, type TabItem } from "@/components/Tabs";
import type { AssetDTO } from "@/lib/data";
import type { Locale } from "@/core";

type TFn = Awaited<ReturnType<typeof getT>>;

export default async function AssetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getRequestLocale();
  const t = await getT(locale);

  const asset = await getRepository().getAsset(id);
  if (!asset) notFound();

  const comingSoon = (
    <p className="text-muted">{t("common.comingSoon")}</p>
  );

  const items: TabItem[] = [
    { key: "general", label: t("asset:tabs.general"), content: <GeneralTab asset={asset} locale={locale} t={t} /> },
    { key: "units", label: t("asset:tabs.units"), content: <UnitsTab asset={asset} locale={locale} t={t} /> },
    { key: "leases", label: t("asset:tabs.leases"), content: comingSoon, disabled: true },
    { key: "finances", label: t("asset:tabs.finances"), content: comingSoon, disabled: true },
    { key: "documents", label: t("asset:tabs.documents"), content: comingSoon, disabled: true },
    { key: "history", label: t("asset:tabs.history"), content: comingSoon, disabled: true },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href={`/portfolios/${asset.portfolioId}`}
          className="text-sm text-muted hover:text-foreground"
        >
          ← {t("nav.portfolios")}
        </Link>
        <div className="mt-2 flex items-center gap-3">
          <h1 className="text-2xl font-bold">{asset.name}</h1>
          <span className="rounded-full bg-primary/10 px-3 py-0.5 text-sm text-primary">
            {t(`asset:type.${asset.assetType}`)}
          </span>
          <OccupancyBadge ratio={asset.occupancy.byArea} locale={locale} />
        </div>
        <p className="mt-1 text-muted">
          {asset.addressLine1}, {asset.postalCode} {asset.city}
        </p>
      </div>

      <Tabs items={items} />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="font-medium">{children}</dd>
    </div>
  );
}

function GeneralTab({ asset, locale, t }: { asset: AssetDTO; locale: Locale; t: TFn }) {
  return (
    <dl className="grid grid-cols-2 gap-5 sm:grid-cols-3">
      <Field label={t("asset:fields.address")}>
        {asset.addressLine1}
        <br />
        {asset.postalCode} {asset.city}
      </Field>
      <Field label={t("asset:fields.surfaceUseful")}>
        {formatArea(asset.surfaceUseful, locale)}
      </Field>
      <Field label={t("asset:fields.surfaceGla")}>
        {formatArea(asset.surfaceGla, locale)}
      </Field>
      <Field label={t("asset:fields.acquisitionDate")}>
        {formatDate(asset.acquisitionDate, locale)}
      </Field>
      <Field label={t("asset:fields.acquisitionValue")}>
        {formatMoney(asset.acquisitionValue, locale)}
      </Field>
      <Field label={t("asset:fields.netBookValue")}>
        {formatMoney(asset.netBookValue, locale)}
      </Field>
      <Field label={t("asset:fields.constructionYear")}>
        {asset.constructionYear ?? t("common.notProvided")}
      </Field>
      <Field label={t("asset:fields.epc")}>
        {asset.epcRating ?? t("common.notProvided")}
      </Field>
      <Field label={t("asset:fields.certifications")}>
        {asset.certifications.length > 0
          ? asset.certifications.join(", ")
          : t("common.notProvided")}
      </Field>
    </dl>
  );
}

function UnitsTab({ asset, locale, t }: { asset: AssetDTO; locale: Locale; t: TFn }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted">
        {t("asset:units.count", { count: asset.units.length })}
      </p>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-card text-left text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">{t("asset:units.reference")}</th>
              <th className="px-4 py-3 font-medium">{t("asset:units.floor")}</th>
              <th className="px-4 py-3 font-medium">{t("asset:units.surface")}</th>
              <th className="px-4 py-3 font-medium">{t("asset:fields.occupancy")}</th>
            </tr>
          </thead>
          <tbody>
            {asset.units.map((u) => (
              <tr key={u.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{u.reference}</td>
                <td className="px-4 py-3 text-muted">
                  {u.floor ?? "—"}
                </td>
                <td className="px-4 py-3">{formatArea(u.surface, locale)}</td>
                <td className="px-4 py-3">
                  {!u.isRentable ? (
                    <span className="text-muted">—</span>
                  ) : u.isOccupied ? (
                    <span className="text-status-ok">{t("asset:units.occupied")}</span>
                  ) : (
                    <span className="text-status-urgent">{t("asset:units.vacant")}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
