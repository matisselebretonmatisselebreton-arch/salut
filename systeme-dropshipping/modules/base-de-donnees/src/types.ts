/**
 * Types TypeScript reflétant le schéma Supabase (`schema.sql`).
 *
 * Convention :
 *  - Les tables sont décrites par 3 types : `Row` (lecture), `Insert` (création),
 *    `Update` (mise à jour partielle). C'est la convention `supabase gen types`.
 *  - Tant qu'on n'a pas branché `supabase gen types typescript --project-id`,
 *    on maintient ces types à la main pour que le reste du code reste typé.
 *
 * Quand un projet Supabase est dispo, régénérer avec :
 *   pnpm dlx supabase gen types typescript --project-id <PROJECT_ID> \
 *     --schema public > modules/base-de-donnees/src/types.ts
 */

// =============================================================================
// ENUMs (miroir des `CREATE TYPE ... AS ENUM` du schéma)
// =============================================================================

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

export type TemplateStyle = "punchy" | "minimal" | "ugc";

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

// =============================================================================
// JSONB helpers
// =============================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

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

export interface ProductScoreCriteria {
  margin?: number;
  rating?: number;
  orders?: number;
  warehouse_score?: number;
  novelty?: number;
  [key: string]: number | undefined;
}

// =============================================================================
// TABLE ROWS — 1 type par table (snake_case = colonnes SQL)
// =============================================================================

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
  criteria_json: ProductScoreCriteria;
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

export interface BrandingRow {
  id: string;
  store_id: string;
  brand_name: string;
  logo_url: string | null;
  color_palette_json: ColorPalette;
  font_primary: string | null;
  font_secondary: string | null;
  storytelling: string | null;
  domain_suggestions: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface ProductCopyRow {
  id: string;
  product_id: string;
  language: Locale;
  title: string;
  description: string | null;
  bullet_points_json: string[];
  faq_json: FaqEntry[];
  hooks_json: string[];
  email_sequences_json: Record<string, EmailSequence[]> | null;
  created_at: string;
  updated_at: string;
}

export interface CreativeVariationRow {
  id: string;
  product_id: string;
  template_style: TemplateStyle;
  hook_text: string;
  music_id: string | null;
  voice_over_url: string | null;
  color_scheme_json: ColorPalette;
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
  raw_metrics: Json | null;
  created_at: string;
}

export interface AgentLogRow {
  id: string;
  agent_name: string;
  action: string;
  store_id: string | null;
  product_id: string | null;
  input_json: Json | null;
  output_json: Json | null;
  status: AgentLogStatus;
  error_message: string | null;
  duration_ms: number | null;
  dry_run: boolean | null;
  created_at: string;
}

// =============================================================================
// VUE — product_performance_summary
// =============================================================================

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

// =============================================================================
// INSERT / UPDATE — versions partielles (les champs auto sont optionnels)
// =============================================================================

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type AutoFields = "id" | "created_at" | "updated_at";

export type ThemeInsert = Optional<ThemeRow, AutoFields | "status" | "description">;
export type ThemeUpdate = Partial<ThemeRow>;

export type StoreInsert = Optional<
  StoreRow,
  AutoFields | "status" | "language" | "market" | "shopify_domain" | "shopify_token"
>;
export type StoreUpdate = Partial<StoreRow>;

export type ProductCandidateInsert = Optional<
  ProductCandidateRow,
  | AutoFields
  | "status"
  | "criteria_json"
  | "price_buy"
  | "price_sell_suggested"
  | "score"
  | "rating"
  | "orders_count"
  | "warehouse_region"
  | "notes"
>;
export type ProductCandidateUpdate = Partial<ProductCandidateRow>;

export type ProductInsert = Optional<
  ProductRow,
  | AutoFields
  | "status"
  | "candidate_id"
  | "shopify_product_id"
  | "description"
  | "cost"
  | "images_urls"
>;
export type ProductUpdate = Partial<ProductRow>;

export type BrandingInsert = Optional<
  BrandingRow,
  | AutoFields
  | "logo_url"
  | "color_palette_json"
  | "font_primary"
  | "font_secondary"
  | "storytelling"
  | "domain_suggestions"
>;
export type BrandingUpdate = Partial<BrandingRow>;

export type ProductCopyInsert = Optional<
  ProductCopyRow,
  | AutoFields
  | "description"
  | "bullet_points_json"
  | "faq_json"
  | "hooks_json"
  | "email_sequences_json"
>;
export type ProductCopyUpdate = Partial<ProductCopyRow>;

export type CreativeVariationInsert = Optional<
  CreativeVariationRow,
  | AutoFields
  | "status"
  | "music_id"
  | "voice_over_url"
  | "color_scheme_json"
  | "language"
>;
export type CreativeVariationUpdate = Partial<CreativeVariationRow>;

export type RenderedVideoInsert = Optional<
  RenderedVideoRow,
  | AutoFields
  | "status"
  | "thumbnail_url"
  | "duration_seconds"
  | "file_size_bytes"
  | "error_message"
>;
export type RenderedVideoUpdate = Partial<RenderedVideoRow>;

export type AdCampaignInsert = Optional<
  AdCampaignRow,
  | AutoFields
  | "status"
  | "dry_run"
  | "campaign_id_external"
  | "budget_total"
  | "target_cpa"
  | "started_at"
  | "paused_at"
  | "killed_at"
  | "killed_reason"
  | "product_id"
>;
export type AdCampaignUpdate = Partial<AdCampaignRow>;

export type AdMetricInsert = Optional<
  AdMetricRow,
  | "id"
  | "created_at"
  | "impressions"
  | "clicks"
  | "ctr"
  | "spend"
  | "conversions"
  | "revenue"
  | "cpa"
  | "roas"
  | "raw_metrics"
>;
export type AdMetricUpdate = Partial<AdMetricRow>;

export type AgentLogInsert = Optional<
  AgentLogRow,
  | "id"
  | "created_at"
  | "store_id"
  | "product_id"
  | "input_json"
  | "output_json"
  | "error_message"
  | "duration_ms"
  | "dry_run"
>;
export type AgentLogUpdate = Partial<AgentLogRow>;

// =============================================================================
// Database — schéma global compatible @supabase/supabase-js
// =============================================================================

export interface Database {
  public: {
    Tables: {
      themes: {
        Row: ThemeRow;
        Insert: ThemeInsert;
        Update: ThemeUpdate;
      };
      stores: {
        Row: StoreRow;
        Insert: StoreInsert;
        Update: StoreUpdate;
      };
      product_candidates: {
        Row: ProductCandidateRow;
        Insert: ProductCandidateInsert;
        Update: ProductCandidateUpdate;
      };
      products: {
        Row: ProductRow;
        Insert: ProductInsert;
        Update: ProductUpdate;
      };
      brandings: {
        Row: BrandingRow;
        Insert: BrandingInsert;
        Update: BrandingUpdate;
      };
      product_copy: {
        Row: ProductCopyRow;
        Insert: ProductCopyInsert;
        Update: ProductCopyUpdate;
      };
      creative_variations: {
        Row: CreativeVariationRow;
        Insert: CreativeVariationInsert;
        Update: CreativeVariationUpdate;
      };
      rendered_videos: {
        Row: RenderedVideoRow;
        Insert: RenderedVideoInsert;
        Update: RenderedVideoUpdate;
      };
      ad_campaigns: {
        Row: AdCampaignRow;
        Insert: AdCampaignInsert;
        Update: AdCampaignUpdate;
      };
      ad_metrics: {
        Row: AdMetricRow;
        Insert: AdMetricInsert;
        Update: AdMetricUpdate;
      };
      agent_logs: {
        Row: AgentLogRow;
        Insert: AgentLogInsert;
        Update: AgentLogUpdate;
      };
    };
    Views: {
      product_performance_summary: {
        Row: ProductPerformanceSummaryRow;
      };
    };
    Enums: {
      theme_status: ThemeStatus;
      store_status: StoreStatus;
      locale: Locale;
      product_candidate_status: ProductCandidateStatus;
      product_status: ProductStatus;
      template_style: TemplateStyle;
      creative_status: CreativeStatus;
      video_format: VideoFormat;
      video_status: VideoStatus;
      ad_platform: AdPlatform;
      ad_campaign_status: AdCampaignStatus;
      agent_log_status: AgentLogStatus;
    };
  };
}
