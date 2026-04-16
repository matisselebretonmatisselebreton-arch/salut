/**
 * Types partagés entre agents, scripts et dashboard.
 * Alignés sur le schéma Supabase (étape 2). Complétés à l'étape 6.
 *
 * Note : on duplique délibérément quelques types depuis @dropship/db pour
 * conserver le rootDir TS isolé par package (sinon `tsc` se plaint que les
 * fichiers source de @dropship/db sont hors rootDir de @dropship/core).
 * `@dropship/db` reste la source de vérité ; ces types doivent rester en
 * miroir 1:1 (regénération via `supabase gen types`).
 */

export type Locale = "fr" | "en";
export type TemplateStyle = "punchy" | "minimal" | "ugc";
export type VideoFormat = "vertical_9_16" | "square_1_1" | "horizontal_16_9";
export type AdPlatform = "tiktok" | "meta";
export type Platform = AdPlatform; // alias historique
export type RenderFormat = "vertical" | "square";

export interface ColorPalette {
  primary?: string;
  secondary?: string;
  accent?: string;
  background?: string;
  foreground?: string;
  [key: string]: string | undefined;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface EmailSequence {
  subject: string;
  body: string;
  send_after_hours: number;
}

export interface AgentRunContext {
  agentName: string;
  storeId?: string;
  productId?: string;
  dryRun: boolean;
}
