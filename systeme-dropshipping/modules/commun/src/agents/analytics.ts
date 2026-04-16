/**
 * Analytics Agent — pull métriques + kill-switch + rapport CSV.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import type { AdPlatform } from "../types/index.js";

import { createMetaService, type MetaInsightsRow } from "../services/meta.js";
import { getSupabase, withAgentLogging } from "../services/supabase.js";
import { createTikTokService, type TikTokReportRow } from "../services/tiktok.js";
import { agentLog, AgentError, envNumber } from "./common.js";

export interface AnalyticsInput {
  since?: string;
  until?: string;
  storeId?: string;
  productId?: string;
}

export interface AnalyticsOutput {
  campaignsAnalyzed: number;
  metricsRowsUpserted: number;
  killed: Array<{ campaignId: string; reason: string }>;
  csvPath: string | null;
}

interface CampaignRow {
  id: string;
  store_id: string;
  product_id: string | null;
  platform: AdPlatform;
  campaign_id_external: string | null;
  budget_daily: number;
  target_cpa: number | null;
  status: string;
  dry_run: boolean;
  started_at: string | null;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}
function isoDaysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

function sumPurchases(insights: MetaInsightsRow): { conv: number; rev: number } {
  const conv =
    insights.actions
      ?.filter((a) => a.action_type === "purchase" || a.action_type === "omni_purchase")
      .reduce((s, a) => s + Number(a.value || 0), 0) ?? 0;
  const rev =
    insights.action_values
      ?.filter((a) => a.action_type === "purchase" || a.action_type === "omni_purchase")
      .reduce((s, a) => s + Number(a.value || 0), 0) ?? 0;
  return { conv, rev };
}

export async function runAnalytics(input: AnalyticsInput): Promise<AnalyticsOutput> {
  const since = input.since ?? isoDaysAgo(1);
  const until = input.until ?? todayIso();
  const killMultiplier = envNumber("KILL_SWITCH_CPA_MULTIPLIER", 2);

  return withAgentLogging<AnalyticsInput, AnalyticsOutput>({
    agentName: "analytics",
    action: "pull",
    input,
    storeId: input.storeId,
    productId: input.productId,
    run: async () => {
      const supabase = getSupabase();
      let q = supabase
        .from("ad_campaigns")
        .select(
          "id, store_id, product_id, platform, campaign_id_external, budget_daily, target_cpa, status, dry_run, started_at",
        )
        .eq("status", "active")
        .eq("dry_run", false);
      if (input.storeId) q = q.eq("store_id", input.storeId);
      if (input.productId) q = q.eq("product_id", input.productId);
      const { data: campaigns, error: cerr } = await q;
      if (cerr) {
        throw new AgentError("analytics", "Lecture ad_campaigns", cerr);
      }
      const list = (campaigns ?? []) as CampaignRow[];

      let upserted = 0;
      const killed: AnalyticsOutput["killed"] = [];
      const reportRows: Array<{
        campaignId: string;
        platform: string;
        spend: number;
        revenue: number;
        cpa: number | null;
        roas: number | null;
      }> = [];

      for (const c of list) {
        if (!c.campaign_id_external) continue;
        try {
          if (c.platform === "tiktok") {
            const tiktok = createTikTokService();
            const rows = await tiktok.getReport({
              level: "AUCTION_CAMPAIGN",
              ids: [c.campaign_id_external],
              since,
              until,
            });
            for (const r of rows as TikTokReportRow[]) {
              const cpa = r.conversions > 0 ? r.spend / r.conversions : null;
              const ctr = r.impressions > 0 ? r.clicks / r.impressions : null;
              const rev = 0; // TikTok ne renvoie pas la valeur d'achat directement → 0
              await supabase.from("ad_metrics").upsert(
                {
                  campaign_id: c.id,
                  date: r.stat_time_day.slice(0, 10),
                  impressions: r.impressions,
                  clicks: r.clicks,
                  ctr,
                  spend: r.spend,
                  conversions: r.conversions,
                  revenue: rev,
                  cpa,
                  roas: r.spend > 0 ? rev / r.spend : null,
                  raw_metrics: r as unknown as Record<string, unknown>,
                },
                { onConflict: "campaign_id,date" },
              );
              upserted += 1;
              reportRows.push({
                campaignId: c.id,
                platform: c.platform,
                spend: r.spend,
                revenue: rev,
                cpa,
                roas: r.spend > 0 ? rev / r.spend : null,
              });
            }
          } else {
            const meta = createMetaService();
            const rows = await meta.getInsights(c.campaign_id_external, { since, until });
            for (const r of rows) {
              const impressions = Number(r.impressions);
              const clicks = Number(r.clicks);
              const spend = Number(r.spend);
              const { conv, rev } = sumPurchases(r);
              const cpa = conv > 0 ? spend / conv : null;
              const ctr = impressions > 0 ? clicks / impressions : null;
              await supabase.from("ad_metrics").upsert(
                {
                  campaign_id: c.id,
                  date: r.date_start,
                  impressions,
                  clicks,
                  ctr,
                  spend,
                  conversions: conv,
                  revenue: rev,
                  cpa,
                  roas: spend > 0 ? rev / spend : null,
                  raw_metrics: r as unknown as Record<string, unknown>,
                },
                { onConflict: "campaign_id,date" },
              );
              upserted += 1;
              reportRows.push({
                campaignId: c.id,
                platform: c.platform,
                spend,
                revenue: rev,
                cpa,
                roas: spend > 0 ? rev / spend : null,
              });
            }
          }
        } catch (err) {
          agentLog.warn({ err, campaign: c.id }, "pull métriques échoué");
        }

        // Kill-switch (≥ 3j de métriques, CPA moyen > target × multiplier)
        if (c.target_cpa) {
          const { data: lastMetrics } = await supabase
            .from("ad_metrics")
            .select("cpa, spend, conversions")
            .eq("campaign_id", c.id)
            .order("date", { ascending: false })
            .limit(3);
          const m = (lastMetrics ?? []) as Array<{
            cpa: number | null;
            spend: number;
            conversions: number;
          }>;
          if (m.length >= 3) {
            const totalSpend = m.reduce((s, x) => s + x.spend, 0);
            const totalConv = m.reduce((s, x) => s + x.conversions, 0);
            const avgCpa = totalConv > 0 ? totalSpend / totalConv : null;
            if (avgCpa !== null && avgCpa > c.target_cpa * killMultiplier) {
              const reason = `CPA ${avgCpa.toFixed(2)}€ > target ${c.target_cpa}€ × ${killMultiplier}`;
              try {
                // best-effort : on tente de pause via API plateforme.
                // L'implémentation pause API n'est pas exposée dans MetaService/TikTokService
                // pour l'instant — on flagge en DB et l'utilisateur ferme depuis son dashboard.
                await supabase
                  .from("ad_campaigns")
                  .update({
                    status: "killed",
                    killed_at: new Date().toISOString(),
                    killed_reason: reason,
                  })
                  .eq("id", c.id);
                killed.push({ campaignId: c.id, reason });
                agentLog.warn({ campaign: c.id, reason }, "kill-switch déclenché");
              } catch (e) {
                agentLog.error({ e }, "kill-switch update failed");
              }
            }
          }
        }
      }

      // Rapport CSV
      let csvPath: string | null = null;
      if (reportRows.length > 0) {
        const exportDir = path.resolve(process.cwd(), "donnees", "exports");
        mkdirSync(exportDir, { recursive: true });
        csvPath = path.join(exportDir, `analytics-${todayIso()}.csv`);
        const header = "campaign_id,platform,spend,revenue,cpa,roas";
        const lines = reportRows.map(
          (r) =>
            `${r.campaignId},${r.platform},${r.spend.toFixed(2)},${r.revenue.toFixed(2)},${r.cpa?.toFixed(2) ?? ""},${r.roas?.toFixed(2) ?? ""}`,
        );
        writeFileSync(csvPath, [header, ...lines].join("\n"), "utf-8");
      }

      return {
        campaignsAnalyzed: list.length,
        metricsRowsUpserted: upserted,
        killed,
        csvPath,
      };
    },
  });
}
