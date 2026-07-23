import { describe, expect, it } from "vitest";
import { formatMoney, formatArea, formatPercent, formatDate } from "../format";

// Intl peut produire des espaces insécables ; on normalise pour comparer.
const norm = (s: string) => s.replace(/ | /g, " ");

describe("formatMoney", () => {
  it("formate en euros à la française", () => {
    expect(norm(formatMoney(1234, "fr"))).toBe("1 234 €");
  });
  it("formate en euros à l'anglaise", () => {
    expect(norm(formatMoney(1234, "en"))).toBe("€1,234");
  });
  it("renvoie un tiret pour null/NaN", () => {
    expect(formatMoney(null, "fr")).toBe("—");
    expect(formatMoney(Number.NaN, "en")).toBe("—");
  });
});

describe("formatArea", () => {
  it("ajoute l'unité m²", () => {
    expect(norm(formatArea(2500, "fr"))).toBe("2 500 m²");
  });
});

describe("formatPercent", () => {
  it("convertit un ratio en pourcentage", () => {
    expect(formatPercent(0.25, "fr")).toContain("25");
    expect(formatPercent(0.25, "fr")).toContain("%");
  });
  it("renvoie un tiret pour null", () => {
    expect(formatPercent(null, "fr")).toBe("—");
  });
});

describe("formatDate", () => {
  it("formate une date ISO", () => {
    expect(formatDate("2026-01-15", "en")).toBe("15 January 2026");
  });
  it("renvoie un tiret pour une date invalide", () => {
    expect(formatDate("pas-une-date", "fr")).toBe("—");
  });
});
