import Link from "next/link";
import { formatMoney } from "@/core";
import { getRepository } from "@/lib/data";
import { getRequestLocale, getT } from "@/i18n/server";
import { OccupancyBadge } from "@/components/OccupancyBadge";

export default async function PortfoliosPage() {
  const locale = await getRequestLocale();
  const t = await getT(locale);
  const portfolios = await getRepository().listPortfolios();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("portfolio:list.title")}</h1>
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white">
          {t("portfolio:list.new")}
        </button>
      </div>

      {portfolios.length === 0 ? (
        <p className="text-muted">{t("portfolio:list.empty")}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {portfolios.map((p) => (
            <Link
              key={p.id}
              href={`/portfolios/${p.id}`}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 transition hover:border-primary"
            >
              <div>
                <h2 className="font-semibold">{p.name}</h2>
                {p.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-muted">
                    {p.description}
                  </p>
                )}
              </div>
              <dl className="mt-auto grid grid-cols-3 gap-2 text-sm">
                <div>
                  <dt className="text-muted">{t("portfolio:list.kpi.assets")}</dt>
                  <dd className="font-semibold">{p.assetCount}</dd>
                </div>
                <div>
                  <dt className="text-muted">
                    {t("portfolio:list.kpi.totalValue")}
                  </dt>
                  <dd className="font-semibold">
                    {formatMoney(p.totalValue, locale)}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">
                    {t("portfolio:list.kpi.occupancy")}
                  </dt>
                  <dd>
                    <OccupancyBadge ratio={p.occupancyByArea} locale={locale} />
                  </dd>
                </div>
              </dl>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
