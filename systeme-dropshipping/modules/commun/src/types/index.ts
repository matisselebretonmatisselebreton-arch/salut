/**
 * Types partagés entre agents, scripts et dashboard.
 * Alignés sur le schéma Supabase (étape 2). Complétés à l'étape 5.
 */
export type Locale = "fr" | "en";
export type TemplateStyle = "punchy" | "minimal" | "ugc";
export type Platform = "tiktok" | "meta";
export type RenderFormat = "vertical" | "square";

export interface AgentRunContext {
  agentName: string;
  storeId?: string;
  productId?: string;
  dryRun: boolean;
}
