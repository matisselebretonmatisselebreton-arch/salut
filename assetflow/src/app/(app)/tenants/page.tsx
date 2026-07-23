import Link from "next/link";
import { getRepository } from "@/lib/data";
import { getRequestLocale, getT } from "@/i18n/server";

export default async function TenantsPage() {
  const locale = await getRequestLocale();
  const t = await getT(locale);
  const tenants = await getRepository().listTenants();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("tenant:list.title")}</h1>
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white">
          {t("tenant:list.new")}
        </button>
      </div>

      {tenants.length === 0 ? (
        <p className="text-muted">{t("tenant:list.empty")}</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-card text-left text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">{t("tenant:fields.name")}</th>
                <th className="px-4 py-3 font-medium">{t("tenant:fields.kind")}</th>
                <th className="px-4 py-3 font-medium">{t("tenant:fields.email")}</th>
                <th className="px-4 py-3 font-medium">{t("tenant:fields.activeLeases")}</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant) => (
                <tr key={tenant.id} className="border-t border-border hover:bg-card">
                  <td className="px-4 py-3">
                    <Link
                      href={`/tenants/${tenant.id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {tenant.displayName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {t(`tenant:kind.${tenant.kind}`)}
                  </td>
                  <td className="px-4 py-3 text-muted">{tenant.email ?? "—"}</td>
                  <td className="px-4 py-3">{tenant.activeLeaseCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
