import Link from "next/link";
import { notFound } from "next/navigation";
import { getRepository } from "@/lib/data";
import { getRequestLocale, getT } from "@/i18n/server";
import { LeaseTable } from "@/components/LeaseTable";

export default async function TenantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getRequestLocale();
  const t = await getT(locale);

  const tenant = await getRepository().getTenant(id);
  if (!tenant) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/tenants" className="text-sm text-muted hover:text-foreground">
          ← {t("nav.tenants")}
        </Link>
        <div className="mt-2 flex items-center gap-3">
          <h1 className="text-2xl font-bold">{tenant.displayName}</h1>
          <span className="rounded-full bg-primary/10 px-3 py-0.5 text-sm text-primary">
            {t(`tenant:kind.${tenant.kind}`)}
          </span>
        </div>
        {tenant.email && <p className="mt-1 text-muted">{tenant.email}</p>}
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">{t("tenant:detail.leases")}</h2>
        {tenant.leases.length === 0 ? (
          <p className="text-muted">{t("tenant:detail.noLeases")}</p>
        ) : (
          <LeaseTable leases={tenant.leases} locale={locale} hide={["tenant"]} />
        )}
      </section>
    </div>
  );
}
