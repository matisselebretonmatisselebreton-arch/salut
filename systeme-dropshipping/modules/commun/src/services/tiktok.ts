/**
 * Client TikTok Marketing API v1.3.
 *
 * Périmètre MVP :
 *   - createCampaign
 *   - createAdGroup
 *   - createAd (vidéo uploadée à part)
 *   - getReport (impressions, clicks, spend, conversions)
 *
 * Note : l'approbation TikTok pour la Marketing API peut prendre plusieurs
 * semaines. En attendant : dryRun=true par défaut → IDs simulés.
 */
import { randomUUID } from "node:crypto";

import { fetchJson } from "../utilitaires/http.js";
import { requireEnv } from "../utilitaires/env.js";
import { createLogger } from "../utilitaires/logger.js";

const log = createLogger("tiktok");
const API_BASE = "https://business-api.tiktok.com/open_api/v1.3";

export interface TikTokConfig {
  accessToken?: string;
  advertiserId?: string;
  pixelId?: string;
  dryRun?: boolean;
}

export interface TikTokCreateCampaignInput {
  name: string;
  objective?: "CONVERSIONS" | "TRAFFIC" | "REACH";
  budgetMode?: "BUDGET_MODE_DAY" | "BUDGET_MODE_TOTAL" | "BUDGET_MODE_INFINITE";
  budget?: number;
}

export interface TikTokCreateAdGroupInput {
  campaignId: string;
  name: string;
  dailyBudget: number;
  countries?: string[];
  ageGroups?: string[];
}

export interface TikTokCreateAdInput {
  adGroupId: string;
  name: string;
  videoId: string;
  text: string;
  callToAction?: "SHOP_NOW" | "LEARN_MORE";
  landingPageUrl: string;
}

export interface TikTokReportRow {
  stat_time_day: string;
  impressions: number;
  clicks: number;
  spend: number;
  conversions: number;
  conversion_rate?: number;
  cpc?: number;
  ctr?: number;
}

export interface TikTokService {
  createCampaign(input: TikTokCreateCampaignInput): Promise<{ campaign_id: string }>;
  createAdGroup(input: TikTokCreateAdGroupInput): Promise<{ adgroup_id: string }>;
  createAd(input: TikTokCreateAdInput): Promise<{ ad_id: string }>;
  getReport(
    options: {
      level: "AUCTION_CAMPAIGN" | "AUCTION_ADGROUP" | "AUCTION_AD";
      ids: string[];
      since: string;
      until: string;
    },
  ): Promise<TikTokReportRow[]>;
}

const isDryRun = (override?: boolean): boolean =>
  override ?? process.env.DRY_RUN === "true";

export function createTikTokService(config: TikTokConfig = {}): TikTokService {
  const accessToken = config.accessToken ?? requireEnv("TIKTOK_ACCESS_TOKEN");
  const advertiserId = config.advertiserId ?? requireEnv("TIKTOK_ADVERTISER_ID");
  const dryRun = isDryRun(config.dryRun);

  const headers = {
    "Access-Token": accessToken,
    "content-type": "application/json",
  };

  const post = async <T>(path: string, body: Record<string, unknown>): Promise<T> => {
    if (dryRun) {
      log.info({ path, body }, "tiktok DRY_RUN — appel simulé");
      // Retourne un objet "compatible" : couvre les 3 méthodes via clés possibles.
      const id = `dry-run-tiktok-${randomUUID()}`;
      return {
        campaign_id: id,
        adgroup_id: id,
        ad_id: id,
      } as T;
    }
    const res = await fetchJson<{ code: number; message: string; data: T }>(
      `${API_BASE}${path}`,
      { method: "POST", headers, body: JSON.stringify(body) },
    );
    if (res.code !== 0) {
      throw new Error(`TikTok API error ${res.code}: ${res.message}`);
    }
    return res.data;
  };

  const get = async <T>(path: string, params: Record<string, string>): Promise<T> => {
    const url = new URL(`${API_BASE}${path}`);
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
    const res = await fetchJson<{ code: number; message: string; data: T }>(
      url.toString(),
      { method: "GET", headers },
    );
    if (res.code !== 0) {
      throw new Error(`TikTok API error ${res.code}: ${res.message}`);
    }
    return res.data;
  };

  return {
    async createCampaign(input) {
      return post("/campaign/create/", {
        advertiser_id: advertiserId,
        campaign_name: input.name,
        objective_type: input.objective ?? "CONVERSIONS",
        budget_mode: input.budgetMode ?? "BUDGET_MODE_DAY",
        budget: input.budget ?? 50,
      });
    },
    async createAdGroup(input) {
      return post("/adgroup/create/", {
        advertiser_id: advertiserId,
        campaign_id: input.campaignId,
        adgroup_name: input.name,
        budget_mode: "BUDGET_MODE_DAY",
        budget: input.dailyBudget,
        location_ids: input.countries ?? ["FR"],
        age_groups: input.ageGroups ?? ["AGE_18_24", "AGE_25_34", "AGE_35_44"],
        gender: "GENDER_UNLIMITED",
        billing_event: "OCPM",
        optimization_goal: "CONVERT",
      });
    },
    async createAd(input) {
      return post("/ad/create/", {
        advertiser_id: advertiserId,
        adgroup_id: input.adGroupId,
        creatives: [
          {
            ad_name: input.name,
            ad_format: "SINGLE_VIDEO",
            video_id: input.videoId,
            ad_text: input.text,
            call_to_action: input.callToAction ?? "SHOP_NOW",
            landing_page_url: input.landingPageUrl,
          },
        ],
      });
    },
    async getReport(options) {
      const data = await get<{ list: Array<{ metrics: TikTokReportRow }> }>(
        "/report/integrated/get/",
        {
          advertiser_id: advertiserId,
          report_type: "BASIC",
          data_level: options.level,
          dimensions: JSON.stringify([
            options.level === "AUCTION_CAMPAIGN"
              ? "campaign_id"
              : options.level === "AUCTION_ADGROUP"
                ? "adgroup_id"
                : "ad_id",
            "stat_time_day",
          ]),
          metrics: JSON.stringify([
            "impressions",
            "clicks",
            "spend",
            "conversions",
            "conversion_rate",
            "cpc",
            "ctr",
          ]),
          start_date: options.since,
          end_date: options.until,
          filtering: JSON.stringify([
            {
              field_name:
                options.level === "AUCTION_CAMPAIGN"
                  ? "campaign_ids"
                  : options.level === "AUCTION_ADGROUP"
                    ? "adgroup_ids"
                    : "ad_ids",
              filter_type: "IN",
              filter_value: JSON.stringify(options.ids),
            },
          ]),
        },
      );
      return data.list.map((row) => row.metrics);
    },
  };
}
