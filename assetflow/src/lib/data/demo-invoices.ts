/**
 * Génération des quittances de démonstration (Module 3) à partir des baux.
 * Produit, pour chaque bail actif, les quittances des 4 derniers mois avec un
 * mélange réaliste de statuts (payé / en retard / partiel / en attente).
 * Déterministe et relatif à la date du jour.
 */

import { invoiceTotals, monthlyEquivalent, type InvoiceType, type PaymentMethod } from "@/core";
import { demoLeases, type RawLease } from "./demo-seed";

export interface DemoPayment {
  id: string;
  amount: number;
  paidOn: string;
  method: PaymentMethod;
  reference: string | null;
}

export interface DemoInvoice {
  id: string;
  number: string;
  type: InvoiceType;
  leaseId: string;
  periodStart: string;
  periodEnd: string;
  issueDate: string;
  dueDate: string;
  vatRate: number;
  lines: { label: string; amount: number }[];
  payments: DemoPayment[];
}

function iso(y: number, m1: number, d: number): string {
  return `${y}-${String(m1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function lastDayOfMonth(y: number, m1: number): number {
  return new Date(Date.UTC(y, m1, 0)).getUTCDate();
}

// Bail résidentiel → pas de TVA ; commercial/pro → 20 %.
function vatRateFor(lease: RawLease): number {
  return lease.leaseType === "residential_bare" ||
    lease.leaseType === "residential_furnished"
    ? 0
    : 0.2;
}

// Mauvais payeurs de démo (pour illustrer retard / partiel).
const OVERDUE_LEASE = "50000000-0000-0000-0000-000000000022"; // Kusmi
const PARTIAL_LEASE = "50000000-0000-0000-0000-000000000001"; // Boulangerie

function buildInvoicesForLease(lease: RawLease, now: Date): DemoInvoice[] {
  const vatRate = vatRateFor(lease);
  const lines = lease.charges.map((c) => ({
    label: c.label,
    amount: monthlyEquivalent(c.amount, c.periodicity),
  }));
  const { ttc } = invoiceTotals(lines, vatRate);

  const out: DemoInvoice[] = [];
  for (let offset = 3; offset >= 0; offset--) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - offset, 1));
    const y = d.getUTCFullYear();
    const m1 = d.getUTCMonth() + 1;
    const yyyymm = `${y}${String(m1).padStart(2, "0")}`;

    const payments: DemoPayment[] = [];
    const fullyPaid = (): void => {
      payments.push({
        id: `pay-${lease.reference}-${yyyymm}`,
        amount: ttc,
        paidOn: iso(y, m1, 7),
        method: "transfer",
        reference: `VIR-${yyyymm}`,
      });
    };

    if (offset >= 2) {
      fullyPaid(); // mois anciens : soldés
    } else if (offset === 1) {
      if (lease.id === OVERDUE_LEASE) {
        // rien : impayé du mois précédent → en retard
      } else if (lease.id === PARTIAL_LEASE) {
        payments.push({
          id: `pay-${lease.reference}-${yyyymm}`,
          amount: Math.round(ttc * 0.5 * 100) / 100,
          paidOn: iso(y, m1, 9),
          method: "transfer",
          reference: `VIR-${yyyymm}`,
        });
      } else {
        fullyPaid();
      }
    }
    // offset 0 (mois courant) : non encore encaissé → en attente

    out.push({
      id: `inv-${lease.reference}-${yyyymm}`,
      number: `${lease.reference}-${yyyymm}`,
      type: "rent_receipt",
      leaseId: lease.id,
      periodStart: iso(y, m1, 1),
      periodEnd: iso(y, m1, lastDayOfMonth(y, m1)),
      issueDate: iso(y, m1, 1),
      dueDate: iso(y, m1, 5),
      vatRate,
      lines,
      payments,
    });
  }
  return out;
}

/** Toutes les quittances de démo (baux actifs uniquement). */
export function buildDemoInvoices(now: Date = new Date()): DemoInvoice[] {
  return demoLeases
    .filter((l) => l.status === "active")
    .flatMap((l) => buildInvoicesForLease(l, now));
}
