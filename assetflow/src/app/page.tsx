import { getT } from "@/i18n/server";

/**
 * Page d'accueil provisoire du socle. Sert de preuve de bout en bout que
 * l'i18n serveur fonctionne. Le vrai dashboard (Module 7) et la redirection
 * vers les portefeuilles (Module 1) arriveront avec leurs écrans respectifs.
 */
export default async function Home() {
  const t = await getT();

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 px-6 py-16">
      <div className="flex items-baseline gap-3">
        <h1 className="text-4xl font-bold text-primary">{t("app.name")}</h1>
        <span className="text-muted">{t("app.tagline")}</span>
      </div>
      <p className="text-muted">
        {t("common.loading")} — socle initialisé. Modules à venir :{" "}
        {t("nav.portfolios")}, {t("nav.leases")}, {t("nav.dashboard")}.
      </p>
      <div className="flex gap-3 text-sm">
        <span className="rounded-full bg-status-ok/10 px-3 py-1 text-status-ok">
          {t("status.upToDate")}
        </span>
        <span className="rounded-full bg-status-warn/10 px-3 py-1 text-status-warn">
          {t("status.attention")}
        </span>
        <span className="rounded-full bg-status-urgent/10 px-3 py-1 text-status-urgent">
          {t("status.urgent")}
        </span>
      </div>
    </main>
  );
}
