/**
 * Orchestrator Agent — coordonne les 7 sous-agents.
 *
 * Le pipeline complet exige des points de validation humaine entre étapes.
 * En mode automatique (`autoApprove=true`), on enchaîne sans pause — utile en
 * dry-run pour démo / tests d'intégration.
 *
 * Ce script ne fait pas de UI ; il imprime les transitions et attend que
 * l'humain mette à jour les `status` dans la DB pour continuer (mode interactif
 * = lecture du status entre étapes).
 */
import type { Locale, TemplateStyle } from "../types/index.js";

import { getSupabase, withAgentLogging } from "../services/supabase.js";
import { runAdsLauncher } from "./ads-launcher.js";
import { runAnalytics } from "./analytics.js";
import { runBranding } from "./branding.js";
import { agentLog, AgentError, envBool } from "./common.js";
import { runCopywriter } from "./copywriter.js";
import { runCreativeGenerator } from "./creative-generator.js";
import { runProductResearch } from "./product-research.js";
import { runShopifyBuilder } from "./shopify-builder.js";

export interface OrchestratorInput {
  theme: string;
  storeId: string;
  productUrls: string[];
  language?: Locale;
  templates?: TemplateStyle[];
  variationsPerTemplate?: number;
  budgetDaily?: number;
  targetCpa?: number;
  /** Si true, ne pas attendre validation humaine (research/branding/creas). */
  autoApprove?: boolean;
  /** Hérite par défaut de DRY_RUN env. */
  dryRun?: boolean;
}

export interface OrchestratorOutput {
  themeId: string;
  candidatesPersisted: number;
  brandingId: string | null;
  productsImported: number;
  copyGenerated: number;
  variationsCreated: number;
  campaignsCreated: number;
  analytics: { campaignsAnalyzed: number };
}

export async function runOrchestrator(
  input: OrchestratorInput,
): Promise<OrchestratorOutput> {
  const dryRun = input.dryRun ?? envBool("DRY_RUN", true);
  const language: Locale = input.language ?? "fr";
  const auto = input.autoApprove ?? false;

  return withAgentLogging<OrchestratorInput, OrchestratorOutput>({
    agentName: "orchestrator",
    action: "full-pipeline",
    input,
    storeId: input.storeId,
    dryRun,
    run: async () => {
      const supabase = getSupabase();
      agentLog.info({ theme: input.theme, dryRun, auto }, "orchestrator start");

      // 1. Research
      const research = await runProductResearch({
        theme: input.theme,
        urls: input.productUrls,
      });
      agentLog.info({ persisted: research.candidatesPersisted }, "research OK");

      if (auto) {
        await supabase
          .from("product_candidates")
          .update({ status: "approved" })
          .in("id", research.insertedIds);
      } else {
        agentLog.info(
          { ids: research.insertedIds },
          "PAUSE — approuver candidats (status='approved') puis relancer build-store/creatives/ads.",
        );
      }

      // 2. Branding
      const branding = await runBranding({ storeId: input.storeId });

      // 3. Shopify-builder : import produits + branding + pages légales
      await runShopifyBuilder({
        storeId: input.storeId,
        operations: ["apply_branding", "create_legal_pages", "import_products"],
      });
      const { count: productsImported } = await supabase
        .from("products")
        .select("id", { count: "exact", head: true })
        .eq("store_id", input.storeId);

      const { data: importedProducts } = await supabase
        .from("products")
        .select("id")
        .eq("store_id", input.storeId);
      const productIds = ((importedProducts ?? []) as { id: string }[]).map((r) => r.id);

      // 4. Copywriter (par produit)
      let copyGenerated = 0;
      for (const pid of productIds) {
        const out = await runCopywriter({ productId: pid, languages: [language] });
        copyGenerated += out.generated.length;
      }

      // 5. Creative-generator (par produit)
      let variationsCreated = 0;
      for (const pid of productIds) {
        const out = await runCreativeGenerator({
          productId: pid,
          templates: input.templates,
          variationsPerTemplate: input.variationsPerTemplate,
          language,
          dryRun,
        });
        variationsCreated += out.variationsCreated;
      }

      if (!auto) {
        agentLog.info(
          {},
          "PAUSE — approuver les vidéos (rendered_videos.status='completed') puis relancer ads.",
        );
      }

      // 6. Ads-launcher (par produit) — uniquement si on a un budget
      let campaignsCreated = 0;
      if (input.budgetDaily && input.budgetDaily > 0) {
        for (const pid of productIds) {
          try {
            const out = await runAdsLauncher({
              productId: pid,
              budgetDaily: input.budgetDaily,
              targetCpa: input.targetCpa ?? null,
              dryRun,
            });
            campaignsCreated += out.campaigns.length;
          } catch (err) {
            agentLog.warn({ err, pid }, "ads launch skip");
          }
        }
      }

      // 7. Analytics — pull initial (probablement 0 row si campagnes neuves)
      const analytics = await runAnalytics({ storeId: input.storeId });

      if (!branding) {
        throw new AgentError("orchestrator", "branding null inattendu");
      }
      return {
        themeId: research.themeId,
        candidatesPersisted: research.candidatesPersisted,
        brandingId: branding.brandingId,
        productsImported: productsImported ?? 0,
        copyGenerated,
        variationsCreated,
        campaignsCreated,
        analytics: { campaignsAnalyzed: analytics.campaignsAnalyzed },
      };
    },
  });
}
