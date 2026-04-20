/**
 * Product Research Agent — sourcing + scoring AliExpress.
 *
 * Stratégie : on accepte une liste d'URLs (--urls=a,b,c ou --urls-file=path)
 * pour rester respectueux des CGU AliExpress (pas de crawl massif). L'agent
 * scrape, score, puis insère dans `product_candidates` (status=pending).
 *
 * Une exécution = 1 thème, ≤ max_results candidats persistés (défaut env).
 */
import { readFileSync } from "node:fs";

import {
  scoreCandidate,
  scrapeAliExpressProduct,
  searchAliExpress,
} from "../extracteurs/aliexpress.js";
import { getSupabase, withAgentLogging } from "../services/supabase.js";
import { agentLog, AgentError, envNumber } from "./common.js";

export interface ProductResearchInput {
  /** Nom OU id du thème (au moins l'un des deux). */
  theme?: string;
  themeId?: string;
  /** URLs AliExpress à analyser (si vide → erreur explicite). */
  urls: string[];
  /** Multiplicateur prix achat → vente (défaut 2.5x). */
  priceSellMultiplier?: number;
  /** Score minimum pour persister (défaut env MIN_SCORE_TO_PERSIST). */
  minScore?: number;
  /** Cap nombre de candidats persistés (défaut env MAX_CANDIDATES_PER_THEME). */
  maxResults?: number;
}

export interface ProductResearchOutput {
  themeId: string;
  candidatesScraped: number;
  candidatesPersisted: number;
  insertedIds: string[];
  skipped: { url: string; reason: string }[];
}

interface ResolvedTheme {
  id: string;
  name: string;
}

async function resolveTheme(input: ProductResearchInput): Promise<ResolvedTheme> {
  const supabase = getSupabase();
  if (input.themeId) {
    const { data, error } = await supabase
      .from("themes")
      .select("id, name")
      .eq("id", input.themeId)
      .single();
    if (error || !data) {
      throw new AgentError("product-research", `Thème introuvable : ${input.themeId}`, error);
    }
    return data as ResolvedTheme;
  }
  if (!input.theme) {
    throw new AgentError("product-research", "theme ou themeId requis");
  }
  // Upsert idempotent par nom.
  const { data: existing } = await supabase
    .from("themes")
    .select("id, name")
    .eq("name", input.theme)
    .maybeSingle();
  if (existing) return existing as ResolvedTheme;
  const { data, error } = await supabase
    .from("themes")
    .insert({ name: input.theme, status: "researching" })
    .select("id, name")
    .single();
  if (error || !data) {
    throw new AgentError("product-research", "Création du thème échouée", error);
  }
  return data as ResolvedTheme;
}

const KEYWORD_MAP: Record<string, string[]> = {
  sport: ["fitness gadget", "yoga accessories", "resistance bands", "sport watch", "outdoor camping gear"],
  cuisine: ["kitchen gadget", "cooking tools", "silicone utensils", "food storage", "kitchen organizer"],
  animaux: ["pet accessories", "dog toys", "cat bed", "pet grooming", "pet feeding bowl"],
  beauty: ["skincare tool", "makeup organizer", "beauty gadget", "hair accessories", "LED face mask"],
  tech: ["phone accessories", "wireless earbuds", "USB gadget", "LED desk lamp", "smart home gadget"],
};

function generateKeywords(themeName: string, themeDesc: string | null): string[] {
  const name = themeName.toLowerCase();
  if (KEYWORD_MAP[name]) return KEYWORD_MAP[name]!;

  const keywords = [name];
  if (themeDesc) {
    const words = themeDesc
      .toLowerCase()
      .replace(/[^a-zàâäéèêëïîôùûüÿçœæ\s-]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 3);
    const unique = [...new Set(words)].slice(0, 4);
    keywords.push(...unique.map((w) => `${w} gadget`));
  }
  return keywords.slice(0, 5);
}

async function discoverUrls(themeName: string, themeDesc: string | null, max: number): Promise<string[]> {
  const keywords = generateKeywords(themeName, themeDesc);
  agentLog.info({ keywords }, "auto-discovery keywords (template mode)");

  const allUrls: string[] = [];
  const perKeyword = Math.ceil(max / keywords.length);
  for (const kw of keywords) {
    try {
      const urls = await searchAliExpress(kw, { maxResults: perKeyword });
      allUrls.push(...urls);
    } catch (err) {
      agentLog.warn({ keyword: kw, error: err instanceof Error ? err.message : String(err) }, "search failed");
    }
  }

  const unique = [...new Set(allUrls)].slice(0, max);
  agentLog.info({ total: unique.length }, "URLs discovered");
  return unique;
}

export async function runProductResearch(
  input: ProductResearchInput,
): Promise<ProductResearchOutput> {
  const minScore = input.minScore ?? envNumber("MIN_SCORE_TO_PERSIST", 5);
  const maxResults = input.maxResults ?? envNumber("MAX_CANDIDATES_PER_THEME", 30);
  const multiplier = input.priceSellMultiplier ?? 2.5;

  return withAgentLogging<ProductResearchInput, ProductResearchOutput>({
    agentName: "product-research",
    action: "research",
    input,
    run: async () => {
      const theme = await resolveTheme(input);

      if (!input.urls || input.urls.length === 0) {
        const { data: themeRow } = await getSupabase()
          .from("themes")
          .select("description")
          .eq("id", theme.id)
          .single();
        const desc = (themeRow as { description: string | null } | null)?.description ?? null;
        input.urls = await discoverUrls(theme.name, desc, maxResults);
        if (input.urls.length === 0) {
          throw new AgentError("product-research", "Aucun produit trouvé automatiquement pour ce thème.");
        }
      }

      agentLog.info({ theme: theme.name, urls: input.urls.length }, "research start");

      const scraped: Array<{
        url: string;
        product: Awaited<ReturnType<typeof scrapeAliExpressProduct>>;
        score: ReturnType<typeof scoreCandidate>;
      }> = [];
      const skipped: { url: string; reason: string }[] = [];

      for (const url of input.urls.slice(0, maxResults)) {
        try {
          const product = await scrapeAliExpressProduct(url);
          const sell = product.priceBuy ? product.priceBuy * multiplier : null;
          const score = scoreCandidate({
            priceBuy: product.priceBuy,
            priceSellSuggested: sell,
            rating: product.rating,
            ordersCount: product.ordersCount,
            warehouseRegion: product.warehouseRegion,
          });
          scraped.push({ url, product, score });
        } catch (err) {
          skipped.push({ url, reason: err instanceof Error ? err.message : String(err) });
        }
      }

      const supabase = getSupabase();
      const insertedIds: string[] = [];
      const eligible = scraped.filter((r) => r.score.score >= minScore);
      eligible.sort((a, b) => b.score.score - a.score.score);

      for (const row of eligible.slice(0, maxResults)) {
        const sell = row.product.priceBuy
          ? Math.round(row.product.priceBuy * multiplier * 100) / 100
          : null;
        const { data, error } = await supabase
          .from("product_candidates")
          .upsert(
            {
              theme_id: theme.id,
              source_url: row.url,
              name: row.product.title || row.product.productId || row.url,
              price_buy: row.product.priceBuy,
              price_sell_suggested: sell,
              score: row.score.score,
              criteria_json: row.score.breakdown,
              rating: row.product.rating,
              orders_count: row.product.ordersCount,
              warehouse_region: row.product.warehouseRegion,
              status: "pending",
            },
            { onConflict: "theme_id,source_url" },
          )
          .select("id")
          .single();
        if (error) {
          skipped.push({ url: row.url, reason: `db: ${error.message}` });
        } else if (data) {
          insertedIds.push((data as { id: string }).id);
        }
      }

      return {
        themeId: theme.id,
        candidatesScraped: scraped.length,
        candidatesPersisted: insertedIds.length,
        insertedIds,
        skipped,
      };
    },
  });
}

/** Lit un fichier de URLs (1 par ligne, ignore lignes vides + commentaires). */
export function readUrlsFile(filePath: string): string[] {
  const content = readFileSync(filePath, "utf-8");
  return content
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.startsWith("#"));
}
