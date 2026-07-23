import Link from "next/link";
import { notFound } from "next/navigation";
import { formatArea, formatMoney } from "@/core";
import { getRepository } from "@/lib/data";
import { getRequestLocale, getT } from "@/i18n/server";
import { OccupancyBadge } from "@/components/OccupancyBadge";

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getRequestLocale();
  const t = await getT(locale);

  const repo = getRepository();
  const portfolio = await repo.getPortfolio(id);
  if (!portfolio) notFound();

  const assets = await repo.listAssetsByPortfolio(id);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/portfolios" className="text-sm text-muted hover:text-foreground">
          ← {t("nav.portfolios")}
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{portfolio.name}</h1>
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white">
            {t("portfolio:detail.newAsset")}
          </button>
        </div>
        {portfolio.description && (
          <p className="mt-1 text-muted">{portfolio.description}</p>
        )}
      </div>

      <section>
        <h2 className="mb-3 text-lg font-semibold">
          {t("portfolio:detail.assets")}
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-card text-left text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">{portfolio.name}</th>
                <th className="px-4 py-3 font-medium">{t("asset:fields.address")}</th>
                <th className="px-4 py-3 font-medium">{t("asset:fields.surfaceUseful")}</th>
                <th className="px-4 py-3 font-medium">{t("asset:fields.netBookValue")}</th>
                <th className="px-4 py-3 font-medium">{t("asset:fields.occupancy")}</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((a) => (
                <tr
                  key={a.id}
                  className="border-t border-border hover:bg-card"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/assets/${a.id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {a.name}
                    </Link>
                    <div className="text-xs text-muted">
                      {t(`asset:type.${a.assetType}`)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {a.postalCode} {a.city}
                  </td>
                  <td className="px-4 py-3">{formatArea(a.surfaceUseful, locale)}</td>
                  <td className="px-4 py-3">{formatMoney(a.netBookValue, locale)}</td>
                  <td className="px-4 py-3">
                    <OccupancyBadge ratio={a.occupancy.byArea} locale={locale} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
