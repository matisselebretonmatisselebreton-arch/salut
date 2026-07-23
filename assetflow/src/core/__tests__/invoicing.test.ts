import { describe, expect, it } from "vitest";
import {
  invoiceTotals,
  outstandingAmount,
  paymentStatus,
} from "../invoicing";

const FROM = new Date("2026-07-23T00:00:00Z");

describe("invoiceTotals", () => {
  it("totalise les lignes HT sans TVA", () => {
    const r = invoiceTotals([{ amount: 1100 }, { amount: 120 }], 0);
    expect(r).toEqual({ ht: 1220, vat: 0, ttc: 1220 });
  });

  it("applique la TVA sur le total HT", () => {
    const r = invoiceTotals([{ amount: 7000 }, { amount: 850 }], 0.2);
    expect(r.ht).toBe(7850);
    expect(r.vat).toBe(1570);
    expect(r.ttc).toBe(9420);
  });

  it("arrondit la TVA au centime", () => {
    const r = invoiceTotals([{ amount: 333.33 }], 0.2);
    expect(r.vat).toBe(66.67);
    expect(r.ttc).toBe(400);
  });
});

describe("paymentStatus", () => {
  it("paid quand l'encaissé couvre le TTC", () => {
    expect(paymentStatus(1000, 1000, "2026-08-01", FROM)).toBe("paid");
    expect(paymentStatus(1000, 1200, "2026-08-01", FROM)).toBe("paid");
  });

  it("partial quand encaissé partiel et échéance non dépassée", () => {
    expect(paymentStatus(1000, 400, "2026-08-01", FROM)).toBe("partial");
  });

  it("overdue quand non soldé et échéance dépassée", () => {
    expect(paymentStatus(1000, 0, "2026-07-01", FROM)).toBe("overdue");
    expect(paymentStatus(1000, 400, "2026-07-01", FROM)).toBe("overdue");
  });

  it("pending quand rien d'encaissé et échéance à venir", () => {
    expect(paymentStatus(1000, 0, "2026-08-01", FROM)).toBe("pending");
  });

  it("pending si pas de date d'échéance et rien d'encaissé", () => {
    expect(paymentStatus(1000, 0, null, FROM)).toBe("pending");
  });
});

describe("outstandingAmount", () => {
  it("calcule le reste dû", () => {
    expect(outstandingAmount(1000, 400)).toBe(600);
  });
  it("ne descend jamais sous zéro (trop-perçu)", () => {
    expect(outstandingAmount(1000, 1200)).toBe(0);
  });
});
