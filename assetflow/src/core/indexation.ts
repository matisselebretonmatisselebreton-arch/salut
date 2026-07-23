/**
 * Moteur d'indexation des loyers (Module 2, §4.2), isolé et testé.
 *
 * Règle de révision (IRL/ILC/ILAT) : le loyer révisé est proportionnel à la
 * variation de l'indice entre l'indice de référence (base) et le nouvel indice.
 *
 *   loyer_révisé = loyer_base × (nouvel_indice / indice_base)
 *
 * Formule financière → JAMAIS dans l'UI (§9). L'affichage web/mobile et les
 * courriers de notification consomment CE module, garantissant la cohérence.
 */

export interface RevisionResult {
  /** Loyer avant révision. */
  baseRent: number;
  /** Loyer après révision, arrondi au centime. */
  newRent: number;
  /** Écart absolu (newRent - baseRent). */
  delta: number;
  /** Variation de l'indice en pourcentage (ex. 2.5 pour +2,5 %). */
  variationPct: number;
}

/** Arrondi au centime (2 décimales). */
function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/**
 * Calcule le loyer révisé à partir de l'indice de base et du nouvel indice.
 * @throws si l'indice de base est nul, négatif ou non fini (division impossible).
 */
export function reviseRent(
  baseRent: number,
  baseIndex: number,
  newIndex: number,
): RevisionResult {
  if (!Number.isFinite(baseIndex) || baseIndex <= 0) {
    throw new Error("baseIndex must be a positive finite number");
  }
  if (!Number.isFinite(newIndex) || newIndex <= 0) {
    throw new Error("newIndex must be a positive finite number");
  }

  const ratio = newIndex / baseIndex;
  const newRent = round2(baseRent * ratio);
  return {
    baseRent,
    newRent,
    delta: round2(newRent - baseRent),
    variationPct: round2((ratio - 1) * 100),
  };
}
