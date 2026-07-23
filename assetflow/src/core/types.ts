/**
 * Types métier partagés (framework-agnostic).
 *
 * Cette couche `core` ne dépend NI de React, NI de Next, NI de Supabase.
 * Elle est réutilisable par le web, le mobile (Expo, Phase 2) et les exports.
 * Voir prompt maître §9 : aucune formule métier dans les composants d'affichage.
 */

export type Locale = "fr" | "en";

export type AssetType =
  | "office"
  | "retail"
  | "residential"
  | "logistics"
  | "mixed";

/** Un lot / unité locative, réduit aux champs nécessaires aux calculs. */
export interface UnitForOccupancy {
  /** Surface louable du lot, en m². `null` si non renseignée. */
  surface: number | null;
  /** Le lot fait-il partie du parc louable (exclut parties communes) ? */
  isRentable: boolean;
  /** Le lot est-il actuellement occupé (bail actif) ? */
  isOccupied: boolean;
}
