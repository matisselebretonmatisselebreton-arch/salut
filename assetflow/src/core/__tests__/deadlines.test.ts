import { describe, expect, it } from "vitest";
import { alertLevel, computeLeaseDeadlines, daysUntil } from "../deadlines";

const FROM = new Date("2026-07-23T00:00:00Z");

describe("daysUntil", () => {
  it("compte les jours jusqu'à une date future", () => {
    expect(daysUntil("2026-08-22", FROM)).toBe(30);
  });
  it("renvoie un négatif pour une date passée", () => {
    expect(daysUntil("2026-07-13", FROM)).toBe(-10);
  });
});

describe("alertLevel", () => {
  it("urgent à J-30 ou moins", () => {
    expect(alertLevel("2026-08-10", FROM)).toBe("urgent");
  });
  it("warn entre J-31 et J-60", () => {
    expect(alertLevel("2026-09-10", FROM)).toBe("warn");
  });
  it("info entre J-61 et J-90", () => {
    expect(alertLevel("2026-10-10", FROM)).toBe("info");
  });
  it("none au-delà de J-90 ou dans le passé", () => {
    expect(alertLevel("2027-01-01", FROM)).toBe("none");
    expect(alertLevel("2026-01-01", FROM)).toBe("none");
  });
});

describe("computeLeaseDeadlines", () => {
  it("ignore les baux non actifs", () => {
    expect(
      computeLeaseDeadlines(
        { status: "draft", startDate: "2020-01-01", endDate: "2029-01-01", noticePeriodMonths: 6, revisionMonth: 3 },
        FROM,
      ),
    ).toEqual([]);
  });

  it("produit la prochaine révision annuelle dans la fenêtre", () => {
    const d = computeLeaseDeadlines(
      { status: "active", startDate: "2022-09-01", endDate: null, noticePeriodMonths: null, revisionMonth: 9 },
      FROM,
    );
    expect(d).toEqual([{ type: "revision", date: "2026-09-01" }]);
  });

  it("calcule préavis (fin - préavis) et renouvellement dans l'horizon", () => {
    const d = computeLeaseDeadlines(
      { status: "active", startDate: "2019-01-01", endDate: "2027-06-30", noticePeriodMonths: 6, revisionMonth: null },
      FROM,
      18,
    );
    const types = d.map((x) => `${x.type}:${x.date}`);
    expect(types).toContain("notice:2026-12-30");
    expect(types).toContain("renewal:2027-06-30");
  });

  it("exclut les échéances au-delà de l'horizon", () => {
    const d = computeLeaseDeadlines(
      { status: "active", startDate: "2020-01-01", endDate: "2030-01-01", noticePeriodMonths: 6, revisionMonth: null },
      FROM,
      18,
    );
    // fin 2030 et préavis mi-2029 sont hors des 18 mois → aucune échéance.
    expect(d).toEqual([]);
  });

  it("borne le préavis au dernier jour du mois (31 mai − 3 mois = 28 février)", () => {
    const d = computeLeaseDeadlines(
      { status: "active", startDate: "2024-06-01", endDate: "2027-05-31", noticePeriodMonths: 3, revisionMonth: null },
      FROM,
      12,
    );
    const notice = d.find((x) => x.type === "notice");
    expect(notice?.date).toBe("2027-02-28"); // pas 2027-03-03 (débordement)
  });

  it("trie les échéances par date croissante", () => {
    const d = computeLeaseDeadlines(
      { status: "active", startDate: "2022-01-01", endDate: "2027-02-28", noticePeriodMonths: 3, revisionMonth: 1 },
      FROM,
      24,
    );
    const dates = d.map((x) => x.date);
    expect(dates).toEqual([...dates].sort());
  });
});
