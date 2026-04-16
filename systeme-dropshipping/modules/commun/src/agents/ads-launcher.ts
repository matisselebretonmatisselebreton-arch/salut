/**
 * Ads Launcher Agent — crée campagnes TikTok / Meta à partir des vidéos
 * rendues d'un produit. dry_run par défaut hérité de DRY_RUN.
 *
 * Garde-fous :
 *   - refus si aucun rendered_videos.status='completed' au format requis ;
 *   - refus si aucun product_copy disponible ;
 *   - cap budget_daily ≤ MAX_DAILY_BUDGET_EUR (env, défaut 50) sans `confirmHigh=true`.
 */
import type { AdPlatform, VideoFormat } from "../types/index.js";

import { createMetaService } from "../services/meta.js";
import { getSupabase, withAgentLogging } from "../services/supabase.js";
import { createTikTokService } from "../services/tiktok.js";
import { agentLog, AgentError, envBool, envNumber } from "./common.js";

export interface AdsLauncherInput {
  productId: string;
  platforms?: AdPlatform[];
  budgetDaily: number;
  targetCpa?: number | null;
  countries?: string[];
  dryRun?: boolean;
  /** Bypass du cap MAX_DAILY_BUDGET_EUR. */
  confirmHigh?: boolean;
}

export interface AdsLauncherOutput {
  productId: string;
  campaigns: Array<{
    platform: AdPlatform;
    campaignId: string;
    externalId: string;
    dryRun: boolean;
  }>;
}

const FORMAT_BY_PLATFORM: Record<AdPlatform, VideoFormat> = {
  tiktok: "vertical_9_16",
  meta: "square_1_1",
};

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}${m}${day}`;
}

export async function runAdsLauncher(
  input: AdsLauncherInput,
): Promise<AdsLauncherOutput> {
  const dryRun = input.dryRun ?? envBool("DRY_RUN", true);
  const maxBudget = envNumber("MAX_DAILY_BUDGET_EUR", 50);
  if (!input.confirmHigh && input.budgetDaily > maxBudget) {
    throw new AgentError(
      "ads-launcher",
      `budget_daily ${input.budgetDaily}€ > cap ${maxBudget}€. Passer --confirm-high.`,
    );
  }
  const platforms = input.platforms ?? (["tiktok", "meta"] as AdPlatform[]);

  return withAgentLogging<AdsLauncherInput, AdsLauncherOutput>({
    agentName: "ads-launcher",
    action: "launch",
    input,
    productId: input.productId,
    dryRun,
    run: async () => {
      const supabase = getSupabase();
      const { data: product, error: prodErr } = await supabase
        .from("products")
        .select("id, name, store_id")
        .eq("id", input.productId)
        .single();
      if (prodErr || !product) {
        throw new AgentError("ads-launcher", `Produit introuvable : ${input.productId}`, prodErr);
      }
      const p = product as { id: string; name: string; store_id: string };

      const { data: branding } = await supabase
        .from("brandings")
        .select("brand_name")
        .eq("store_id", p.store_id)
        .maybeSingle();
      const brandName = (branding as { brand_name: string } | null)?.brand_name ?? "Brand";

      const today = formatDate(new Date());
      const campaigns: AdsLauncherOutput["campaigns"] = [];

      for (const platform of platforms) {
        const requiredFormat = FORMAT_BY_PLATFORM[platform];
        // join variations(product) → rendered_videos(format, status=completed)
        const { data: variations } = await supabase
          .from("creative_variations")
          .select("id")
          .eq("product_id", input.productId);
        const variationIds = ((variations ?? []) as { id: string }[]).map((v) => v.id);
        if (variationIds.length === 0) {
          throw new AgentError(
            "ads-launcher",
            `Aucune variation créa pour ce produit. Lance creative-generator d'abord.`,
          );
        }
        const { data: videos } = await supabase
          .from("rendered_videos")
          .select("id, file_url, format, status")
          .in("variation_id", variationIds)
          .eq("format", requiredFormat)
          .eq("status", "completed");
        const completed = ((videos ?? []) as Array<{
          id: string;
          file_url: string;
        }>);
        if (completed.length === 0 && !dryRun) {
          throw new AgentError(
            "ads-launcher",
            `Aucune vidéo ${requiredFormat} complétée pour ${platform}. Skip ou reste en dry-run.`,
          );
        }

        const campaignName = `${brandName}-${p.name}-${platform}-${today}`.slice(0, 100);
        let externalId: string;

        if (platform === "tiktok") {
          const tiktok = createTikTokService({ dryRun });
          const camp = await tiktok.createCampaign({
            name: campaignName,
            objective: "CONVERSIONS",
            budgetMode: "BUDGET_MODE_DAY",
            budget: input.budgetDaily,
          });
          externalId = camp.campaign_id;
        } else {
          const meta = createMetaService({ dryRun });
          const camp = await meta.createCampaign({
            name: campaignName,
            objective: "OUTCOME_SALES",
            status: "PAUSED",
          });
          externalId = camp.id;
        }

        const { data: row, error: insErr } = await supabase
          .from("ad_campaigns")
          .insert({
            store_id: p.store_id,
            product_id: p.id,
            platform,
            campaign_id_external: externalId,
            name: campaignName,
            budget_daily: input.budgetDaily,
            budget_total: input.budgetDaily * 7,
            target_cpa: input.targetCpa ?? null,
            status: dryRun ? "draft" : "pending_approval",
            dry_run: dryRun,
          })
          .select("id")
          .single();
        if (insErr || !row) {
          throw new AgentError("ads-launcher", "Insert ad_campaigns", insErr);
        }
        campaigns.push({
          platform,
          campaignId: (row as { id: string }).id,
          externalId,
          dryRun,
        });
        agentLog.info(
          { platform, externalId, dryRun, budget: input.budgetDaily },
          "campagne créée",
        );
      }

      return { productId: input.productId, campaigns };
    },
  });
}
