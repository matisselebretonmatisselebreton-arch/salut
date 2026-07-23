import Link from "next/link";
import { getRequestLocale, getT } from "@/i18n/server";
import { LanguageSwitcher } from "./LanguageSwitcher";

/** En-tête applicatif : marque + navigation principale + sélecteur de langue. */
export async function AppHeader() {
  const locale = await getRequestLocale();
  const t = await getT(locale);

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-6">
          <Link href="/portfolios" className="text-lg font-bold text-primary">
            {t("app.name")}
          </Link>
          <nav className="flex gap-4 text-sm text-muted">
            <Link href="/portfolios" className="hover:text-foreground">
              {t("nav.portfolios")}
            </Link>
            <Link href="/leases" className="hover:text-foreground">
              {t("nav.leases")}
            </Link>
            <Link href="/tenants" className="hover:text-foreground">
              {t("nav.tenants")}
            </Link>
            <Link href="/deadlines" className="hover:text-foreground">
              {t("nav.deadlines")}
            </Link>
          </nav>
        </div>
        <LanguageSwitcher locale={locale} />
      </div>
    </header>
  );
}
