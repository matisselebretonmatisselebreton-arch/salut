/**
 * Calcul des échéances de bail (Module 2, §4.2) : révisions annuelles,
 * préavis, renouvellements — avec niveau d'alerte J-90 / J-60 / J-30.
 * Logique pure et testée, indépendante de l'UI.
 */

import type { LeaseStatus } from "./lease";

export type DeadlineType = "revision" | "notice" | "renewal";

/** none = hors fenêtre d'alerte (trop loin ou déjà passé). */
export type AlertLevel = "urgent" | "warn" | "info" | "none";

export interface LeaseDeadlineInput {
  status: LeaseStatus;
  startDate: string | null;
  endDate: string | null;
  noticePeriodMonths: number | null;
  revisionMonth: number | null; // 1..12
}

export interface Deadline {
  type: DeadlineType;
  /** Date d'échéance au format ISO `YYYY-MM-DD`. */
  date: string;
}

const MS_PER_DAY = 86_400_000;

function atUTC(d: Date): number {
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

function toISO(year: number, month1: number, day: number): string {
  const mm = String(month1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

/** Nombre de jours entiers entre `from` et la date ISO (positif = futur). */
export function daysUntil(dateISO: string, from: Date = new Date()): number {
  const target = new Date(`${dateISO}T00:00:00Z`).getTime();
  return Math.round((target - atUTC(from)) / MS_PER_DAY);
}

/**
 * Niveau d'alerte selon l'imminence :
 * J-30 → urgent, J-60 → warn, J-90 → info, sinon none (passé ou lointain).
 */
export function alertLevel(dateISO: string, from: Date = new Date()): AlertLevel {
  const d = daysUntil(dateISO, from);
  if (d < 0) return "none";
  if (d <= 30) return "urgent";
  if (d <= 60) return "warn";
  if (d <= 90) return "info";
  return "none";
}

/** Prochaine occurrence du mois de révision (1er du mois), à partir de `from`. */
function nextRevisionDate(revisionMonth: number, from: Date): string {
  const year = from.getUTCFullYear();
  const candidate = atUTC(new Date(Date.UTC(year, revisionMonth - 1, 1)));
  if (candidate >= atUTC(from)) return toISO(year, revisionMonth, 1);
  return toISO(year + 1, revisionMonth, 1);
}

function addMonths(dateISO: string, months: number): string {
  const d = new Date(`${dateISO}T00:00:00Z`);
  d.setUTCMonth(d.getUTCMonth() + months); // months peut être négatif (préavis)
  return toISO(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
}

/**
 * Échéances à venir d'un bail sur un horizon (mois). Ne renvoie que les baux
 * actifs et les échéances comprises dans [from, from + horizon].
 */
export function computeLeaseDeadlines(
  lease: LeaseDeadlineInput,
  from: Date = new Date(),
  horizonMonths = 18,
): Deadline[] {
  if (lease.status !== "active") return [];

  const horizonEnd = new Date(
    Date.UTC(from.getUTCFullYear(), from.getUTCMonth() + horizonMonths, from.getUTCDate()),
  );
  const inWindow = (iso: string) => {
    const t = new Date(`${iso}T00:00:00Z`).getTime();
    return t >= atUTC(from) && t <= atUTC(horizonEnd);
  };

  const out: Deadline[] = [];

  if (lease.revisionMonth) {
    const rev = nextRevisionDate(lease.revisionMonth, from);
    if (inWindow(rev)) out.push({ type: "revision", date: rev });
  }

  if (lease.endDate) {
    if (inWindow(lease.endDate)) out.push({ type: "renewal", date: lease.endDate });
    if (lease.noticePeriodMonths) {
      const notice = addMonths(lease.endDate, -lease.noticePeriodMonths);
      if (inWindow(notice)) out.push({ type: "notice", date: notice });
    }
  }

  return out.sort((a, b) => a.date.localeCompare(b.date));
}
