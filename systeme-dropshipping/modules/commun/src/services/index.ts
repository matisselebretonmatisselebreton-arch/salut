/**
 * Clients API externes. Chaque service exporte un factory qui lit les env vars
 * requises et renvoie un client pré-configuré (retry/backoff pour le réseau,
 * mode dry-run pour les opérations payantes).
 */
export {
  createAnthropicService,
  type AnthropicService,
  type ChatMessage,
  type ChatOptions,
  type ClaudeModelTier,
} from "./anthropic.js";

export {
  getSupabase,
  logAgentRun,
  withAgentLogging,
  type AgentLogEntry,
  type AgentLogStatus,
  type AgentRunner,
} from "./supabase.js";

export {
  createShopifyService,
  type ShopifyConfig,
  type ShopifyService,
  type ShopifyProduct,
  type ShopifyPage,
} from "./shopify.js";

export {
  createMetaService,
  type MetaConfig,
  type MetaService,
  type MetaInsightsRow,
  type CreateCampaignInput as MetaCreateCampaignInput,
  type CreateAdSetInput as MetaCreateAdSetInput,
  type CreateAdCreativeInput as MetaCreateAdCreativeInput,
  type CreateAdInput as MetaCreateAdInput,
} from "./meta.js";

export {
  createTikTokService,
  type TikTokConfig,
  type TikTokService,
  type TikTokReportRow,
  type TikTokCreateCampaignInput,
  type TikTokCreateAdGroupInput,
  type TikTokCreateAdInput,
} from "./tiktok.js";

export {
  createElevenLabsService,
  type ElevenLabsConfig,
  type ElevenLabsService,
  type SynthesizeOptions,
} from "./elevenlabs.js";

export {
  createPexelsService,
  type PexelsConfig,
  type PexelsService,
  type PexelsVideo,
  type PexelsVideoFile,
} from "./pexels.js";
