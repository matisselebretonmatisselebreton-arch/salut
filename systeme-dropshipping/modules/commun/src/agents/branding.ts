/**
 * Branding Agent — génère identité de marque via Claude (tier creative=opus).
 *
 * 1 store = 1 ligne brandings (UNIQUE). Si la ligne existe déjà, l'agent
 * ne ré-écrit pas par défaut (idempotent) ; passer `{ overwrite: true }`.
 */
import { createAnthropicService } from "../services/anthropic.js";
import { getSupabase, withAgentLogging } from "../services/supabase.js";
import type { ColorPalette } from "../types/index.js";
import { agentLog, AgentError, extractJsonBlock, hasAnthropicCredits } from "./common.js";

export interface BrandingInput {
  storeId: string;
  overwrite?: boolean;
}

export interface BrandingOutput {
  brandingId: string;
  brandName: string;
  created: boolean;
}

interface ClaudeBrandingPayload {
  brand_name: string;
  domain_suggestions: string[];
  color_palette: ColorPalette;
  font_primary: string;
  font_secondary: string;
  storytelling: string;
}

const SYSTEM_PROMPT = `Tu es un directeur de marque DTC e-commerce expérimenté.
Tu réponds toujours UNIQUEMENT avec un objet JSON valide, sans prose autour, schéma exact :
{
  "brand_name": "<≤ 12 char, prononçable, pas de marque déposée>",
  "domain_suggestions": ["xxx.com", ...] (5 max, .com préférés),
  "color_palette": { "primary": "#RRGGBB", "secondary": "#RRGGBB", "accent": "#RRGGBB", "background": "#RRGGBB", "foreground": "#RRGGBB" },
  "font_primary": "<Google Font sans-serif lisible>",
  "font_secondary": "<Google Font display ou serif>",
  "storytelling": "<3-5 paragraphes vision/mission/valeurs/ton, langue du store, pas de claim médical>"
}`;

function buildUserPrompt(args: {
  storeName: string;
  themeName: string;
  themeDescription: string | null;
  language: string;
  market: string;
}): string {
  return `Crée l'identité de marque pour cette boutique :
- nom interne : ${args.storeName}
- thème : ${args.themeName}
- description thème : ${args.themeDescription ?? "(non fournie)"}
- marché : ${args.market}
- langue : ${args.language}

Contraintes :
- brand_name unique, mémorable, ≤ 12 caractères
- palette cohérente avec l'univers du thème
- storytelling rédigé en ${args.language === "fr" ? "français" : "anglais"}
- 5 suggestions de domaines en .com (et 1 en .${args.market.toLowerCase() === "fr" ? "fr" : "co"} si pertinent)`;
}

export async function runBranding(input: BrandingInput): Promise<BrandingOutput> {
  return withAgentLogging<BrandingInput, BrandingOutput>({
    agentName: "branding",
    action: "create",
    input,
    storeId: input.storeId,
    run: async () => {
      const supabase = getSupabase();

      const { data: store, error: storeErr } = await supabase
        .from("stores")
        .select("id, name, language, market, theme_id")
        .eq("id", input.storeId)
        .single();
      if (storeErr || !store) {
        throw new AgentError("branding", `Store introuvable : ${input.storeId}`, storeErr);
      }
      const { data: theme } = await supabase
        .from("themes")
        .select("name, description")
        .eq("id", (store as { theme_id: string }).theme_id)
        .single();

      const { data: existing } = await supabase
        .from("brandings")
        .select("id, brand_name")
        .eq("store_id", input.storeId)
        .maybeSingle();
      if (existing && !input.overwrite) {
        agentLog.info({ storeId: input.storeId }, "branding déjà présent, skip");
        const e = existing as { id: string; brand_name: string };
        return { brandingId: e.id, brandName: e.brand_name, created: false };
      }

      const themeName = (theme as { name: string } | null)?.name ?? "store";
      const storeLanguage = (store as { language: string }).language;
      const storeMarket = (store as { market: string }).market;

      let payload: ClaudeBrandingPayload;

      if (hasAnthropicCredits()) {
        const ai = createAnthropicService();
        const raw = await ai.chat(
          [
            {
              role: "user",
              content: buildUserPrompt({
                storeName: (store as { name: string }).name,
                themeName,
                themeDescription: (theme as { description: string | null } | null)?.description ?? null,
                language: storeLanguage,
                market: storeMarket,
              }),
            },
          ],
          { tier: "creative", system: SYSTEM_PROMPT, maxTokens: 2000 },
        );
        const parsed = extractJsonBlock<ClaudeBrandingPayload>(raw);
        if (!parsed) {
          throw new AgentError("branding", "Réponse Claude non parsable en JSON");
        }
        payload = parsed;
      } else {
        agentLog.info("Mode template (sans API Anthropic)");
        const slug = themeName.slice(0, 8).replace(/\s/g, "");
        payload = {
          brand_name: slug.charAt(0).toUpperCase() + slug.slice(1) + "ify",
          domain_suggestions: [`${slug}shop.com`, `${slug}store.com`, `my${slug}.com`, `get${slug}.com`, `${slug}.fr`],
          color_palette: { primary: "#2563EB", secondary: "#1E40AF", accent: "#F59E0B", background: "#FFFFFF", foreground: "#111827" } as ColorPalette,
          font_primary: "Inter",
          font_secondary: "Playfair Display",
          storytelling: storeLanguage === "fr"
            ? `Bienvenue chez ${slug.charAt(0).toUpperCase() + slug.slice(1)}ify. Nous sélectionnons les meilleurs produits ${themeName} pour vous. Notre mission : qualité, prix juste, livraison rapide. Rejoignez notre communauté de passionnés.`
            : `Welcome to ${slug.charAt(0).toUpperCase() + slug.slice(1)}ify. We curate the best ${themeName} products for you. Our mission: quality, fair prices, fast shipping. Join our community.`,
        };
      }

      const upsertPayload = {
        store_id: input.storeId,
        brand_name: payload.brand_name,
        color_palette_json: payload.color_palette,
        font_primary: payload.font_primary,
        font_secondary: payload.font_secondary,
        storytelling: payload.storytelling,
        domain_suggestions: payload.domain_suggestions,
      };

      const { data, error } = await supabase
        .from("brandings")
        .upsert(upsertPayload, { onConflict: "store_id" })
        .select("id, brand_name")
        .single();
      if (error || !data) {
        throw new AgentError("branding", "Insertion brandings échouée", error);
      }
      return {
        brandingId: (data as { id: string }).id,
        brandName: (data as { brand_name: string }).brand_name,
        created: !existing,
      };
    },
  });
}
