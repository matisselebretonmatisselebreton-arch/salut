/**
 * Client Meta Marketing API (Graph API v21+).
 *
 * Périmètre MVP :
 *   - createCampaign
 *   - createAdSet
 *   - createAdCreative (vidéo)
 *   - createAd
 *   - getInsights (impressions, spend, clicks, actions, action_values)
 *
 * Mode dry-run : si options.dryRun === true (ou DRY_RUN=true env), aucun appel
 * réel n'est fait, on renvoie des IDs simulés `dry-run-meta-<random>`.
 */
import { randomUUID } from "node:crypto";

import { fetchJson } from "../utilitaires/http.js";
import { requireEnv } from "../utilitaires/env.js";
import { createLogger } from "../utilitaires/logger.js";

const log = createLogger("meta");
const GRAPH_VERSION = "v21.0";

export interface MetaConfig {
  accessToken?: string;
  adAccountId?: string;
  pageId?: string;
  pixelId?: string;
  dryRun?: boolean;
}

export interface CreateCampaignInput {
  name: string;
  objective?: "OUTCOME_SALES" | "OUTCOME_TRAFFIC" | "OUTCOME_AWARENESS";
  status?: "ACTIVE" | "PAUSED";
}

export interface CreateAdSetInput {
  campaignId: string;
  name: string;
  dailyBudgetCents: number;
  countries?: string[];
  ageMin?: number;
  ageMax?: number;
  status?: "ACTIVE" | "PAUSED";
}

export interface CreateAdCreativeInput {
  name: string;
  videoId?: string;
  imageHash?: string;
  bodyText: string;
  linkUrl: string;
  callToAction?: "SHOP_NOW" | "LEARN_MORE" | "ORDER_NOW";
}

export interface CreateAdInput {
  adSetId: string;
  creativeId: string;
  name: string;
  status?: "ACTIVE" | "PAUSED";
}

export interface MetaInsightsRow {
  date_start: string;
  date_stop: string;
  impressions: string;
  clicks: string;
  spend: string;
  actions?: Array<{ action_type: string; value: string }>;
  action_values?: Array<{ action_type: string; value: string }>;
}

export interface MetaService {
  createCampaign(input: CreateCampaignInput): Promise<{ id: string }>;
  createAdSet(input: CreateAdSetInput): Promise<{ id: string }>;
  createAdCreative(input: CreateAdCreativeInput): Promise<{ id: string }>;
  createAd(input: CreateAdInput): Promise<{ id: string }>;
  getInsights(
    objectId: string,
    options?: { since?: string; until?: string },
  ): Promise<MetaInsightsRow[]>;
}

const isDryRun = (override?: boolean): boolean =>
  override ?? process.env.DRY_RUN === "true";

export function createMetaService(config: MetaConfig = {}): MetaService {
  const accessToken = config.accessToken ?? requireEnv("META_ACCESS_TOKEN");
  const adAccountId = config.adAccountId ?? requireEnv("META_AD_ACCOUNT_ID");
  const pageId = config.pageId ?? process.env.META_PAGE_ID ?? "";
  const pixelId = config.pixelId ?? process.env.META_PIXEL_ID ?? "";
  const dryRun = isDryRun(config.dryRun);

  const baseUrl = `https://graph.facebook.com/${GRAPH_VERSION}`;
  const auth = (extra: Record<string, string> = {}): string => {
    const params = new URLSearchParams({ access_token: accessToken, ...extra });
    return params.toString();
  };

  const post = async <T>(path: string, body: Record<string, unknown>): Promise<T> => {
    if (dryRun) {
      log.info({ path, body }, "meta DRY_RUN — appel simulé");
      return { id: `dry-run-meta-${randomUUID()}` } as T;
    }
    return fetchJson<T>(`${baseUrl}${path}?${auth()}`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  return {
    async createCampaign(input) {
      return post(`/${adAccountId}/campaigns`, {
        name: input.name,
        objective: input.objective ?? "OUTCOME_SALES",
        status: input.status ?? "PAUSED",
        special_ad_categories: [],
      });
    },
    async createAdSet(input) {
      return post(`/${adAccountId}/adsets`, {
        name: input.name,
        campaign_id: input.campaignId,
        daily_budget: input.dailyBudgetCents,
        billing_event: "IMPRESSIONS",
        optimization_goal: "OFFSITE_CONVERSIONS",
        targeting: {
          geo_locations: { countries: input.countries ?? ["FR"] },
          age_min: input.ageMin ?? 18,
          age_max: input.ageMax ?? 65,
        },
        status: input.status ?? "PAUSED",
        promoted_object: pixelId
          ? { pixel_id: pixelId, custom_event_type: "PURCHASE" }
          : undefined,
      });
    },
    async createAdCreative(input) {
      return post(`/${adAccountId}/adcreatives`, {
        name: input.name,
        object_story_spec: {
          page_id: pageId,
          video_data: input.videoId
            ? {
                video_id: input.videoId,
                title: input.name,
                message: input.bodyText,
                call_to_action: {
                  type: input.callToAction ?? "SHOP_NOW",
                  value: { link: input.linkUrl },
                },
              }
            : undefined,
          link_data: input.imageHash
            ? {
                image_hash: input.imageHash,
                link: input.linkUrl,
                message: input.bodyText,
                call_to_action: {
                  type: input.callToAction ?? "SHOP_NOW",
                  value: { link: input.linkUrl },
                },
              }
            : undefined,
        },
      });
    },
    async createAd(input) {
      return post(`/${adAccountId}/ads`, {
        name: input.name,
        adset_id: input.adSetId,
        creative: { creative_id: input.creativeId },
        status: input.status ?? "PAUSED",
      });
    },
    async getInsights(objectId, options = {}) {
      const params: Record<string, string> = {
        fields: "impressions,clicks,spend,actions,action_values",
        time_increment: "1",
      };
      if (options.since && options.until) {
        params.time_range = JSON.stringify({
          since: options.since,
          until: options.until,
        });
      }
      const url = `${baseUrl}/${objectId}/insights?${auth(params)}`;
      const res = await fetchJson<{ data: MetaInsightsRow[] }>(url, { method: "GET" });
      return res.data;
    },
  };
}
