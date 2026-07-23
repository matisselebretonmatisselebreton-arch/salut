import Link from "next/link";
import { getRepository } from "@/lib/data";
import { getRequestLocale, getT } from "@/i18n/server";
import { LeaseTable } from "@/components/LeaseTable";

export default async function LeasesPage() {
  const locale = await getRequestLocale();
  const t = await getT(locale);
  const leases = await getRepository().listLeases();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("lease:list.title")}</h1>
        <Link
          href="/leases/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white"
        >
          {t("lease:list.new")}
        </Link>
      </div>

      {leases.length === 0 ? (
        <p className="text-muted">{t("lease:list.empty")}</p>
      ) : (
        <LeaseTable leases={leases} locale={locale} />
      )}
    </div>
  );
}
