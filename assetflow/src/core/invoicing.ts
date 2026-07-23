/**
 * Moteur de facturation (Module 3, §4.3), isolé et testé.
 *
 * Calcule les montants HT / TVA / TTC d'une quittance ou facture, et dérive le
 * statut de paiement à partir des encaissements et de la date d'échéance.
 * Aucune de ces règles ne vit dans l'UI (§9) : web, mobile et PDF partagent CE
 * module, garantissant des montants identiques partout.
 */

export type InvoiceType = "rent_receipt" | "invoice"; // quittance / facture
export type InvoiceStatus = "draft" | "issued" | "cancelled";
export type PaymentMethod = "transfer" | "check" | "card" | "cash" | "other";

/** Statut de règlement dérivé (jamais stocké en dur — recalculé). */
export type PaymentStatus = "paid" | "partial" | "overdue" | "pending";

export interface InvoiceLineAmount {
  /** Montant HT de la ligne. */
  amount: number;
}

export interface InvoiceTotals {
  /** Total hors taxes. */
  ht: number;
  /** Montant de TVA. */
  vat: number;
  /** Total toutes taxes comprises. */
  ttc: number;
}

/** Arrondi au centime. */
function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/**
 * Totalise les lignes HT et applique un taux de TVA (ex. 0.2 pour 20 %).
 * La TVA est calculée sur le total HT puis arrondie, pour éviter les écarts de
 * centimes dus à un arrondi ligne par ligne.
 */
export function invoiceTotals(
  lines: readonly InvoiceLineAmount[],
  vatRate: number,
): InvoiceTotals {
  const ht = round2(lines.reduce((sum, l) => sum + l.amount, 0));
  const vat = round2(ht * vatRate);
  return { ht, vat, ttc: round2(ht + vat) };
}

/**
 * Statut de règlement d'une facture :
 * - `paid`    : encaissé ≥ TTC
 * - `partial` : 0 < encaissé < TTC
 * - `overdue` : non soldé et échéance dépassée
 * - `pending` : non soldé, échéance non dépassée
 */
export function paymentStatus(
  ttc: number,
  paidAmount: number,
  dueDateISO: string | null,
  on: Date = new Date(),
): PaymentStatus {
  if (paidAmount >= ttc && ttc > 0) return "paid";

  const overdue =
    dueDateISO != null &&
    new Date(`${dueDateISO}T00:00:00Z`).getTime() <
      Date.UTC(on.getUTCFullYear(), on.getUTCMonth(), on.getUTCDate());

  if (paidAmount > 0) return overdue ? "overdue" : "partial";
  return overdue ? "overdue" : "pending";
}

/** Reste dû (TTC - encaissé), borné à 0. */
export function outstandingAmount(ttc: number, paidAmount: number): number {
  return round2(Math.max(0, ttc - paidAmount));
}
