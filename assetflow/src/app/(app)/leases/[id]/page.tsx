import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, formatMoney, monthlyEquivalent, type Locale } from "@/core";
import { getRepository, type LeaseDetailDTO } from "@/lib/data";
import { getRequestLocale, getT } from "@/i18n/server";
import { LeaseStatusBadge } from "@/components/LeaseStatusBadge";

type TFn = Awaited<ReturnType<typeof getT>>;

export default async function LeaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getRequestLocale();
  const t = await getT(locale);

  const lease = await getRepository().getLease(id);
  if (!lease) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/leases" className="text-sm text-muted hover:text-foreground">
          ← {t("nav.leases")}
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold">{lease.reference ?? "—"}</h1>
          <span className="rounded-full bg-primary/10 px-3 py-0.5 text-sm text-primary">
            {t(`lease:type.${lease.leaseType}`)}
          </span>
          <LeaseStatusBadge
            status={lease.status}
            label={t(`lease:status.${lease.status}`)}
          />
        </div>
        <p className="mt-1 text-muted">
          <Link href={`/tenants/${lease.tenantId}`} className="hover:underline">
            {lease.tenantName}
          </Link>
          {" · "}
          <Link href={`/assets/${lease.assetId}`} className="hover:underline">
            {lease.assetName}
          </Link>
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GeneralCard lease={lease} locale={locale} t={t} />
        <ChargesCard lease={lease} locale={locale} t={t} />
        <UnitsCard lease={lease} t={t} />
        <IndexationCard lease={lease} locale={locale} t={t} />
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border p-5">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      {children}
    </section>
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

function GeneralCard({ lease, locale, t }: { lease: LeaseDetailDTO; locale: Locale; t: TFn }) {
  return (
    <Card title={t("lease:detail.general")}>
      <dl className="grid grid-cols-2 gap-4">
        <Field label={t("lease:fields.period")}>
          {formatDate(lease.startDate, locale)}
          {lease.endDate ? ` → ${formatDate(lease.endDate, locale)}` : ""}
        </Field>
        <Field label={t("lease:fields.notice")}>
          {lease.noticePeriodMonths ?? t("common.notProvided")}
        </Field>
        <Field label={t("lease:fields.deposit")}>
          {formatMoney(lease.depositAmount, locale)}
        </Field>
      </dl>
    </Card>
  );
}

function ChargesCard({ lease, locale, t }: { lease: LeaseDetailDTO; locale: Locale; t: TFn }) {
  const total = lease.charges.reduce(
    (s, c) => s + monthlyEquivalent(c.amount, c.periodicity),
    0,
  );
  return (
    <Card title={t("lease:detail.charges")}>
      <table className="w-full text-sm">
        <tbody>
          {lease.charges.map((c, i) => (
            <tr key={i} className="border-b border-border last:border-0">
              <td className="py-2">
                {c.label ?? t(`lease:charge.${c.chargeType}`)}
                <span className="ml-2 text-xs text-muted">
                  ({t(`lease:periodicity.${c.periodicity}`)})
                </span>
              </td>
              <td className="py-2 text-right font-medium">
                {formatMoney(c.amount, locale)}
              </td>
            </tr>
          ))}
          <tr>
            <td className="pt-3 font-semibold">{t("lease:fields.monthlyTotal")}</td>
            <td className="pt-3 text-right font-semibold">
              {formatMoney(total, locale)}
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
}

function UnitsCard({ lease, t }: { lease: LeaseDetailDTO; t: TFn }) {
  return (
    <Card title={t("lease:detail.units")}>
      <ul className="flex flex-wrap gap-2">
        {lease.units.map((u) => (
          <li
            key={u.id}
            className="rounded-lg border border-border px-3 py-1 text-sm"
          >
            {u.reference}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function IndexationCard({ lease, locale, t }: { lease: LeaseDetailDTO; locale: Locale; t: TFn }) {
  const months = [
    "", "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre",
  ];
  return (
    <Card title={t("lease:detail.indexation")}>
      <dl className="grid grid-cols-2 gap-4">
        <Field label={t("lease:fields.indexation")}>
          {t(`lease:index.${lease.indexType}`)}
        </Field>
        <Field label={t("lease:fields.baseIndex")}>
          {lease.baseIndexValue != null
            ? `${lease.baseIndexValue} (${lease.baseIndexPeriod ?? "—"})`
            : t("common.notProvided")}
        </Field>
        <Field label={t("lease:fields.revisionMonth")}>
          {lease.revisionMonth
            ? locale === "fr"
              ? months[lease.revisionMonth]
              : new Date(2000, lease.revisionMonth - 1, 1).toLocaleString("en", {
                  month: "long",
                })
            : t("common.notProvided")}
        </Field>
      </dl>
    </Card>
  );
}
