/**
 * Copywriter Agent — copy multilingue par produit (1 ligne par langue).
 */
import type { EmailSequence, FaqEntry, Locale } from "../types/index.js";

import { createAnthropicService } from "../services/anthropic.js";
import { getSupabase, withAgentLogging } from "../services/supabase.js";
import { agentLog, AgentError, extractJsonBlock } from "./common.js";

export interface CopywriterInput {
  productId: string;
  languages?: Locale[];
  tone?: string;
  overwrite?: boolean;
}

export interface CopywriterOutput {
  productId: string;
  generated: { language: Locale; copyId: string; created: boolean }[];
}

interface ClaudeCopyPayload {
  title: string;
  description: string;
  bullet_points: string[];
  faq: FaqEntry[];
  hooks: string[];
  email_sequences: Record<string, EmailSequence[]>;
}

const SYSTEM_PROMPT = `Tu es un copywriter direct-response e-commerce expert.
Tu réponds UNIQUEMENT avec un objet JSON conforme au schéma :
{
  "title": "<50-70 char, bénéfice + mot-clé>",
  "description": "<150-300 mots, structure problème → solution → preuve → CTA>",
  "bullet_points": ["...", "..."] (5 à 7),
  "faq": [{ "question": "...", "answer": "..." }] (6 à 10, livraison/garantie/usage/retours),
  "hooks": ["...", ...] (8 à 12, ≤ 60 char chacun, pour ads vidéo),
  "email_sequences": {
    "abandon_cart": [{ "subject": "...", "body": "...", "send_after_hours": 1 }] (2-3),
    "post_purchase": [{ "subject": "...", "body": "...", "send_after_hours": 24 }] (2-3)
  }
}
Garde-fous (politique TikTok/Meta) :
- Pas de claims médicaux ("guérit", "soigne").
- Pas de "avant/après" non vérifiables.
- Pas de promesses chiffrées non sourcées.
- Pas de superlatifs absolus ("le meilleur du monde").`;

function buildUserPrompt(args: {
  productName: string;
  productDescription: string | null;
  brandTone: string | null;
  language: Locale;
}): string {
  return `Rédige le copy de ce produit, en ${args.language === "fr" ? "français" : "anglais"} :
- nom : ${args.productName}
- description brute : ${args.productDescription ?? "(aucune)"}
- ton de marque : ${args.brandTone ?? "moderne, direct, chaleureux"}

Adapte culturellement (idiomes, devises, référentiels), n'invente pas de chiffres.`;
}

export async function runCopywriter(
  input: CopywriterInput,
): Promise<CopywriterOutput> {
  return withAgentLogging<CopywriterInput, CopywriterOutput>({
    agentName: "copywriter",
    action: "write",
    input,
    productId: input.productId,
    run: async () => {
      const supabase = getSupabase();
      const { data: product, error: prodErr } = await supabase
        .from("products")
        .select("id, name, description, store_id")
        .eq("id", input.productId)
        .single();
      if (prodErr || !product) {
        throw new AgentError("copywriter", `Produit introuvable : ${input.productId}`, prodErr);
      }
      const p = product as { id: string; name: string; description: string | null; store_id: string };

      const { data: branding } = await supabase
        .from("brandings")
        .select("storytelling")
        .eq("store_id", p.store_id)
        .maybeSingle();
      const tone =
        input.tone ??
        (branding as { storytelling: string | null } | null)?.storytelling ??
        null;

      const supportedLocales = (process.env.SUPPORTED_LOCALES ?? "fr,en")
        .split(",")
        .map((l) => l.trim()) as Locale[];
      const languages = input.languages ?? supportedLocales;

      const ai = createAnthropicService();
      const generated: CopywriterOutput["generated"] = [];

      for (const language of languages) {
        const { data: existing } = await supabase
          .from("product_copy")
          .select("id")
          .eq("product_id", input.productId)
          .eq("language", language)
          .maybeSingle();
        if (existing && !input.overwrite) {
          agentLog.info({ productId: input.productId, language }, "copy déjà présent, skip");
          generated.push({
            language,
            copyId: (existing as { id: string }).id,
            created: false,
          });
          continue;
        }

        const raw = await ai.chat(
          [
            {
              role: "user",
              content: buildUserPrompt({
                productName: p.name,
                productDescription: p.description,
                brandTone: tone,
                language,
              }),
            },
          ],
          { tier: "creative", system: SYSTEM_PROMPT, maxTokens: 4000 },
        );
        const payload = extractJsonBlock<ClaudeCopyPayload>(raw);
        if (!payload) {
          throw new AgentError("copywriter", `JSON invalide pour ${language}`);
        }

        const { data, error } = await supabase
          .from("product_copy")
          .upsert(
            {
              product_id: input.productId,
              language,
              title: payload.title,
              description: payload.description,
              bullet_points_json: payload.bullet_points,
              faq_json: payload.faq,
              hooks_json: payload.hooks,
              email_sequences_json: payload.email_sequences,
            },
            { onConflict: "product_id,language" },
          )
          .select("id")
          .single();
        if (error || !data) {
          throw new AgentError("copywriter", `Insert copy ${language}`, error);
        }
        generated.push({
          language,
          copyId: (data as { id: string }).id,
          created: !existing,
        });
      }

      return { productId: input.productId, generated };
    },
  });
}
