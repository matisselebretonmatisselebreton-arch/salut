import Link from "next/link";
import { getRepository } from "@/lib/data";
import { getRequestLocale, getT } from "@/i18n/server";
import {
  LeaseWizard,
  type WizardAsset,
  type WizardTenant,
} from "@/components/LeaseWizard";

export default async function NewLeasePage() {
  const locale = await getRequestLocale();
  const t = await getT(locale);
  const repo = getRepository();

  // Alimente le wizard : locataires + actifs (avec leurs lots) de l'organisation.
  const [tenants, portfolios] = await Promise.all([
    repo.listTenants(),
    repo.listPortfolios(),
  ]);

  const assetLists = await Promise.all(
    portfolios.map((p) => repo.listAssetsByPortfolio(p.id)),
  );
  const wizardAssets: WizardAsset[] = assetLists.flat().map((a) => ({
    id: a.id,
    name: a.name,
    units: a.units
      .filter((u) => u.isRentable)
      .map((u) => ({ id: u.id, reference: u.reference, isOccupied: u.isOccupied })),
  }));

  const wizardTenants: WizardTenant[] = tenants.map((tn) => ({
    id: tn.id,
    name: tn.displayName,
  }));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/leases" className="text-sm text-muted hover:text-foreground">
          ← {t("nav.leases")}
        </Link>
        <h1 className="mt-2 text-2xl font-bold">{t("lease:wizard.title")}</h1>
      </div>
      <LeaseWizard tenants={wizardTenants} assets={wizardAssets} />
    </div>
  );
}
