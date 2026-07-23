/**
 * Formatage localisé des devises, nombres, pourcentages et dates (§2 i18n).
 *
 * FR : `1 234,56 €`   —   EN : `€1,234.56`
 * On s'appuie sur Intl (natif, zéro dépendance) pour rester utilisable côté
 * serveur (PDF, emails) comme côté client (web/mobile).
 */

import type { Locale } from "./types";

const LOCALE_TAG: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-GB",
};

/** Formate un montant monétaire. `null`/`undefined` → tiret cadratin. */
export function formatMoney(
  amount: number | null | undefined,
  locale: Locale,
  currency = "EUR",
): string {
  if (amount == null || !Number.isFinite(amount)) return "—";
  return new Intl.NumberFormat(LOCALE_TAG[locale], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Formate une surface en m². */
export function formatArea(
  surface: number | null | undefined,
  locale: Locale,
): string {
  if (surface == null || !Number.isFinite(surface)) return "—";
  const n = new Intl.NumberFormat(LOCALE_TAG[locale], {
    maximumFractionDigits: 0,
  }).format(surface);
  return `${n} m²`;
}

/**
 * Formate un ratio [0..1] en pourcentage. `null` → tiret.
 * `computeOccupancy` renvoie des ratios ; on les affiche via cette fonction.
 */
export function formatPercent(
  ratio: number | null | undefined,
  locale: Locale,
  fractionDigits = 0,
): string {
  if (ratio == null || !Number.isFinite(ratio)) return "—";
  return new Intl.NumberFormat(LOCALE_TAG[locale], {
    style: "percent",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(ratio);
}

/** Formate une date (chaîne ISO ou Date) en format long localisé. */
export function formatDate(
  value: string | Date | null | undefined,
  locale: Locale,
): string {
  if (value == null) return "—";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(LOCALE_TAG[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
