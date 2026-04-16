/**
 * Types DB — miroir local de `@dropship/db` pour rester découplé du tsconfig
 * d'un autre package (rootDir / moduleResolution). À synchroniser quand le
 * schéma change.
 */

export type ThemeStatus = "draft" | "researching" | "active" | "archived";
export type StoreStatus =
  | "planning"
  | "building"
  | "live"
  | "paused"
  | "archived";
export type Locale = "fr" | "en";
export type ProductCandidateStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "imported";
export type ProductStatus = "draft" | "live" | "paused" | "discontinued";
export type CreativeStatus = "pending" | "rendering" | "rendered" | "failed";
export type VideoFormat =
  | "vertical_9_16"
  | "square_1_1"
  | "horizontal_16_9";
export type VideoStatus = "pending" | "rendering" | "completed" | "failed";
export type AdPlatform = "tiktok" | "meta";
export type AdCampaignStatus =
  | "draft"
  | "pending_approval"
  | "active"
  | "paused"
  | "killed"
  | "completed";
export type AgentLogStatus = "success" | "error" | "partial" | "skipped";

export interface ThemeRow {
  id: string;
  name: string;
  description: string | null;
  status: ThemeStatus;
  created_at: string;
  updated_at: string;
}

export interface StoreRow {
  id: string;
  theme_id: string;
  name: string;
  shopify_domain: string | null;
  shopify_token: string | null;
  language: Locale;
  market: string;
  status: StoreStatus;
  created_at: string;
  updated_at: string;
}

export interface ProductCandidateRow {
  id: string;
  theme_id: string;
  source_url: string;
  name: string;
  price_buy: number | null;
  price_sell_suggested: number | null;
  score: number | null;
  rating: number | null;
  orders_count: number | null;
  warehouse_region: string | null;
  notes: string | null;
  status: ProductCandidateStatus;
  created_at: string;
  updated_at: string;
}

export interface ProductRow {
  id: string;
  store_id: string;
  candidate_id: string | null;
  shopify_product_id: string | null;
  name: string;
  description: string | null;
  price: number;
  cost: number | null;
  images_urls: string[];
  status: ProductStatus;
  created_at: string;
  updated_at: string;
}

export interface CreativeVariationRow {
  id: string;
  product_id: string;
  template_style: "punchy" | "minimal" | "ugc";
  hook_text: string;
  music_id: string | null;
  voice_over_url: string | null;
  language: Locale;
  status: CreativeStatus;
  created_at: string;
  updated_at: string;
}

export interface RenderedVideoRow {
  id: string;
  variation_id: string;
  format: VideoFormat;
  file_url: string;
  thumbnail_url: string | null;
  duration_seconds: number | null;
  file_size_bytes: number | null;
  status: VideoStatus;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdCampaignRow {
  id: string;
  store_id: string;
  product_id: string | null;
  platform: AdPlatform;
  campaign_id_external: string | null;
  name: string;
  budget_daily: number;
  budget_total: number | null;
  target_cpa: number | null;
  status: AdCampaignStatus;
  dry_run: boolean;
  started_at: string | null;
  paused_at: string | null;
  killed_at: string | null;
  killed_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdMetricRow {
  id: string;
  campaign_id: string;
  date: string;
  impressions: number;
  clicks: number;
  ctr: number | null;
  spend: number;
  conversions: number;
  revenue: number;
  cpa: number | null;
  roas: number | null;
  created_at: string;
}

export interface AgentLogRow {
  id: string;
  agent_name: string;
  action: string;
  store_id: string | null;
  product_id: string | null;
  status: AgentLogStatus;
  error_message: string | null;
  duration_ms: number | null;
  dry_run: boolean | null;
  created_at: string;
}

export interface ProductPerformanceSummaryRow {
  product_id: string;
  product_name: string;
  store_id: string;
  store_name: string | null;
  theme_id: string | null;
  campaigns_count: number;
  total_spend: number;
  total_revenue: number;
  total_impressions: number;
  total_clicks: number;
  total_conversions: number;
  roas: number | null;
  avg_cpa: number | null;
}
