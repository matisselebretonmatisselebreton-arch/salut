import Link from "next/link";
import { getRequestLocale, getT } from "@/i18n/server";
import { resolveDataSource } from "@/lib/data/repository";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { UserMenu } from "./UserMenu";

/** Email de l'utilisateur connecté (null en mode démo → badge « Mode démo »). */
async function getUserEmail(): Promise<string | null> {
  if (resolveDataSource() !== "supabase") return null;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.email ?? null;
}

/** En-tête applicatif : marque + navigation + langue + utilisateur. */
export async function AppHeader() {
  const locale = await getRequestLocale();
  const t = await getT(locale);
  const email = await getUserEmail();

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-6">
          <Link href="/portfolios" className="text-lg font-bold text-primary">
            {t("app.name")}
          </Link>
          <nav className="flex gap-4 text-sm text-muted">
            <Link href="/dashboard" className="hover:text-foreground">
              {t("nav.dashboard")}
            </Link>
            <Link href="/portfolios" className="hover:text-foreground">
              {t("nav.portfolios")}
            </Link>
            <Link href="/leases" className="hover:text-foreground">
              {t("nav.leases")}
            </Link>
            <Link href="/tenants" className="hover:text-foreground">
              {t("nav.tenants")}
            </Link>
            <Link href="/invoices" className="hover:text-foreground">
              {t("nav.invoices")}
            </Link>
            <Link href="/budgets" className="hover:text-foreground">
              {t("nav.budgets")}
            </Link>
            <Link href="/deadlines" className="hover:text-foreground">
              {t("nav.deadlines")}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <UserMenu email={email} />
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
    </header>
  );
}
