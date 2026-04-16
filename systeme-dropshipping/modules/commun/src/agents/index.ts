/**
 * Implémentations TypeScript des 8 sous-agents (étape 6).
 * Les fichiers `.claude/agents/*.md` (étape 3) définissent les prompts utilisés
 * par Claude Code en mode interactif. Ces implémentations TS exposent la même
 * logique en mode automatique pour le pipeline (workflow:* / orchestrator).
 */
export {
  runProductResearch,
  readUrlsFile,
  type ProductResearchInput,
  type ProductResearchOutput,
} from "./product-research.js";

export {
  runBranding,
  type BrandingInput,
  type BrandingOutput,
} from "./branding.js";

export {
  runCopywriter,
  type CopywriterInput,
  type CopywriterOutput,
} from "./copywriter.js";

export {
  runShopifyBuilder,
  type ShopifyBuilderInput,
  type ShopifyBuilderOutput,
  type ShopifyOperation,
} from "./shopify-builder.js";

export {
  runCreativeGenerator,
  type CreativeGeneratorInput,
  type CreativeGeneratorOutput,
} from "./creative-generator.js";

export {
  runAdsLauncher,
  type AdsLauncherInput,
  type AdsLauncherOutput,
} from "./ads-launcher.js";

export {
  runAnalytics,
  type AnalyticsInput,
  type AnalyticsOutput,
} from "./analytics.js";

export {
  runOrchestrator,
  type OrchestratorInput,
  type OrchestratorOutput,
} from "./orchestrator.js";

export { AgentError, agentLog } from "./common.js";
