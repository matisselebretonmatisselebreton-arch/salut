import type { Locale } from "@/core";

import frCommon from "./resources/fr/common.json";
import enCommon from "./resources/en/common.json";
import frPortfolio from "./resources/fr/portfolio.json";
import enPortfolio from "./resources/en/portfolio.json";
import frAsset from "./resources/fr/asset.json";
import enAsset from "./resources/en/asset.json";
import frTenant from "./resources/fr/tenant.json";
import enTenant from "./resources/en/tenant.json";
import frLease from "./resources/fr/lease.json";
import enLease from "./resources/en/lease.json";
import frDeadline from "./resources/fr/deadline.json";
import enDeadline from "./resources/en/deadline.json";
import frInvoice from "./resources/fr/invoice.json";
import enInvoice from "./resources/en/invoice.json";
import frBudget from "./resources/fr/budget.json";
import enBudget from "./resources/en/budget.json";

export const LOCALES: readonly Locale[] = ["fr", "en"] as const;
export const DEFAULT_LOCALE: Locale = "fr";
export const LOCALE_COOKIE = "assetflow.locale";

export const NAMESPACES = [
  "common",
  "portfolio",
  "asset",
  "tenant",
  "lease",
  "deadline",
  "invoice",
  "budget",
] as const;
export const DEFAULT_NAMESPACE = "common";

/**
 * Toutes les ressources de traduction, regroupées.
 * Ajouter un module = ajouter un namespace ici (jamais de texte en dur ailleurs).
 */
export const resources = {
  fr: {
    common: frCommon,
    portfolio: frPortfolio,
    asset: frAsset,
    tenant: frTenant,
    lease: frLease,
    deadline: frDeadline,
    invoice: frInvoice,
    budget: frBudget,
  },
  en: {
    common: enCommon,
    portfolio: enPortfolio,
    asset: enAsset,
    tenant: enTenant,
    lease: enLease,
    deadline: enDeadline,
    invoice: enInvoice,
    budget: enBudget,
  },
} as const;

/** Normalise une valeur arbitraire en locale supportée. */
export function resolveLocale(value: string | undefined | null): Locale {
  if (!value) return DEFAULT_LOCALE;
  const short = value.slice(0, 2).toLowerCase();
  return (LOCALES as readonly string[]).includes(short)
    ? (short as Locale)
    : DEFAULT_LOCALE;
}
