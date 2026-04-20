/**
 * Extracteur AliExpress (scraping HTML).
 *
 * ⚠️  AVERTISSEMENT — Le scraping d'AliExpress peut violer ses CGU. Cet
 * extracteur est destiné à la recherche produit personnelle uniquement.
 * Respecter robots.txt + ne pas redistribuer les données scrapées.
 *
 * Stratégie :
 *   1. Fetch HTML brut avec un User-Agent réaliste.
 *   2. AliExpress embarque la fiche produit dans un objet `runParams` injecté
 *      dans une balise <script>. On l'extrait par regex puis JSON.parse.
 *   3. Fallback : si le payload n'est pas trouvé, parsing best-effort via
 *      cheerio (titre OG, prix meta).
 *   4. Calcul d'un score 0-100 selon la pondération produit (cf. README DB).
 */
import { load } from "cheerio";
import { fetch } from "undici";

import { createLogger } from "../utilitaires/logger.js";
import { isRetryableHttpError, withRetry } from "../utilitaires/retry.js";

const log = createLogger("aliexpress");

const DEFAULT_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";

export interface AliExpressProduct {
  url: string;
  productId: string | null;
  title: string;
  priceBuy: number | null;
  priceCurrency: string;
  rating: number | null;
  ordersCount: number | null;
  warehouseRegion: string | null;
  imageUrls: string[];
  raw: { source: "runParams" | "fallback"; payloadKeys?: string[] };
}

export interface ScrapeOptions {
  /** UA HTTP. Défaut : Chrome récent. */
  userAgent?: string;
  /** Timeout en ms. */
  timeoutMs?: number;
}

const PRODUCT_ID_RE = /\/item\/(\d+)\.html/;
const RUN_PARAMS_RE = /window\.runParams\s*=\s*(\{[\s\S]*?\});/;

function extractRunParams(html: string): Record<string, unknown> | null {
  const match = RUN_PARAMS_RE.exec(html);
  if (!match) return null;
  try {
    return JSON.parse(match[1] as string) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function extractFromRunParams(
  payload: Record<string, unknown>,
): Partial<AliExpressProduct> | null {
  const data = (payload.data ?? payload) as Record<string, unknown>;
  const titleModule = data.titleModule as { subject?: string } | undefined;
  const priceModule = data.priceModule as
    | {
        minActivityAmount?: { value?: number; currency?: string };
        formatedPrice?: string;
      }
    | undefined;
  const titleRating = data.titleModule as
    | { feedbackRating?: { averageStar?: number } }
    | undefined;
  const tradeModule = data.tradeModule as
    | { formatTradeCount?: string }
    | undefined;
  const imageModule = data.imageModule as
    | { imagePathList?: string[] }
    | undefined;
  const inventoryModule = data.inventoryModule as
    | { sourceType?: string }
    | undefined;

  const ordersString = tradeModule?.formatTradeCount;
  const ordersCount = ordersString
    ? parseOrders(ordersString)
    : null;

  return {
    title: titleModule?.subject ?? "",
    priceBuy: priceModule?.minActivityAmount?.value ?? null,
    priceCurrency: priceModule?.minActivityAmount?.currency ?? "USD",
    rating: titleRating?.feedbackRating?.averageStar ?? null,
    ordersCount,
    warehouseRegion: inventoryModule?.sourceType ?? null,
    imageUrls: imageModule?.imagePathList ?? [],
  };
}

/** "1,234+ sold" / "1,2k+ vendus" → 1234 / 1200. Best-effort. */
function parseOrders(s: string): number | null {
  const cleaned = s.toLowerCase().replace(/[\s,+]/g, "");
  const match = cleaned.match(/(\d+(\.\d+)?)(k|m)?/);
  if (!match) return null;
  const n = parseFloat(match[1] as string);
  const suffix = match[3];
  if (suffix === "k") return Math.round(n * 1000);
  if (suffix === "m") return Math.round(n * 1_000_000);
  return Math.round(n);
}

function fallbackParse(html: string): Partial<AliExpressProduct> {
  const $ = load(html);
  const ogTitle = $('meta[property="og:title"]').attr("content") ?? "";
  const ogImage = $('meta[property="og:image"]').attr("content") ?? "";
  return {
    title: ogTitle,
    imageUrls: ogImage ? [ogImage] : [],
    priceBuy: null,
    priceCurrency: "USD",
    rating: null,
    ordersCount: null,
    warehouseRegion: null,
  };
}

export async function scrapeAliExpressProduct(
  url: string,
  options: ScrapeOptions = {},
): Promise<AliExpressProduct> {
  const { userAgent = DEFAULT_USER_AGENT, timeoutMs = 20_000 } = options;

  log.debug({ url }, "scrape AliExpress");

  const html = await withRetry(
    async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const res = await fetch(url, {
          headers: {
            "user-agent": userAgent,
            "accept-language": "fr-FR,fr;q=0.9,en;q=0.8",
          },
          signal: controller.signal,
        });
        if (!res.ok) {
          const err: Error & { status?: number } = new Error(
            `AliExpress HTTP ${res.status}`,
          );
          err.status = res.status;
          throw err;
        }
        return res.text();
      } finally {
        clearTimeout(timeout);
      }
    },
    { shouldRetry: isRetryableHttpError, maxAttempts: 3 },
  );

  const productId = PRODUCT_ID_RE.exec(url)?.[1] ?? null;
  const runParams = extractRunParams(html);
  let parsed: Partial<AliExpressProduct>;
  let source: "runParams" | "fallback" = "fallback";

  if (runParams) {
    parsed = extractFromRunParams(runParams) ?? fallbackParse(html);
    source = parsed.title ? "runParams" : "fallback";
  } else {
    parsed = fallbackParse(html);
  }

  return {
    url,
    productId,
    title: parsed.title ?? "",
    priceBuy: parsed.priceBuy ?? null,
    priceCurrency: parsed.priceCurrency ?? "USD",
    rating: parsed.rating ?? null,
    ordersCount: parsed.ordersCount ?? null,
    warehouseRegion: parsed.warehouseRegion ?? null,
    imageUrls: parsed.imageUrls ?? [],
    raw: { source, payloadKeys: runParams ? Object.keys(runParams) : undefined },
  };
}

/**
 * Score 0-100 selon la pondération du README @dropship/db :
 *  - Marge :        30 %  (priceSell - priceBuy)
 *  - Note :         20 %  (rating / 5)
 *  - Volume :       20 %  (orders / 1000, capé)
 *  - Entrepôt :     15 %  (EU > US > CN)
 *  - Saisonnalité : 15 %  (heuristique simple)
 */
export interface ScoreInput {
  priceBuy: number | null;
  priceSellSuggested: number | null;
  rating: number | null;
  ordersCount: number | null;
  warehouseRegion: string | null;
}

export interface ScoreOutput {
  score: number;
  breakdown: {
    margin: number;
    rating: number;
    volume: number;
    warehouse: number;
    novelty: number;
  };
}

/**
 * Recherche AliExpress par mots-clés → renvoie une liste d'URLs produit.
 */
const SEARCH_URL = "https://fr.aliexpress.com/wholesale";
const PRODUCT_LINK_RE = /\/item\/(\d+)\.html/g;

export async function searchAliExpress(
  query: string,
  options: ScrapeOptions & { maxResults?: number } = {},
): Promise<string[]> {
  const { userAgent = DEFAULT_USER_AGENT, timeoutMs = 20_000, maxResults = 10 } = options;
  const searchUrl = `${SEARCH_URL}?SearchText=${encodeURIComponent(query)}`;

  log.info({ query, searchUrl }, "search AliExpress");

  const html = await withRetry(
    async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const res = await fetch(searchUrl, {
          headers: {
            "user-agent": userAgent,
            "accept-language": "fr-FR,fr;q=0.9,en;q=0.8",
          },
          signal: controller.signal,
        });
        if (!res.ok) {
          const err: Error & { status?: number } = new Error(
            `AliExpress search HTTP ${res.status}`,
          );
          err.status = res.status;
          throw err;
        }
        return res.text();
      } finally {
        clearTimeout(timeout);
      }
    },
    { shouldRetry: isRetryableHttpError, maxAttempts: 3 },
  );

  const ids = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = PRODUCT_LINK_RE.exec(html)) !== null) {
    if (match[1]) ids.add(match[1]);
  }

  const urls = Array.from(ids)
    .slice(0, maxResults)
    .map((id) => `https://fr.aliexpress.com/item/${id}.html`);

  log.info({ query, found: urls.length }, "search results");
  return urls;
}

export function scoreCandidate(input: ScoreInput): ScoreOutput {
  // Marge (30 %)
  const margin =
    input.priceBuy && input.priceSellSuggested && input.priceBuy > 0
      ? Math.min(
          1,
          (input.priceSellSuggested - input.priceBuy) / input.priceBuy / 2,
        )
      : 0;

  // Note (20 %)
  const rating = input.rating ? Math.min(1, input.rating / 5) : 0;

  // Volume (20 %) — log-scale, capé à 5000+ commandes
  const orders = input.ordersCount ?? 0;
  const volume = Math.min(1, Math.log10(orders + 1) / Math.log10(5001));

  // Entrepôt (15 %) — EU > US > autres
  const region = (input.warehouseRegion ?? "").toLowerCase();
  const warehouse = region.includes("eu") || region.includes("fr")
    ? 1
    : region.includes("us")
      ? 0.7
      : 0.4;

  // Nouveauté (15 %) — pas d'info date dans le scraping, on met 0.5 par défaut.
  const novelty = 0.5;

  const score =
    margin * 30 + rating * 20 + volume * 20 + warehouse * 15 + novelty * 15;

  return {
    score: Math.round(score),
    breakdown: { margin, rating, volume, warehouse, novelty },
  };
}
