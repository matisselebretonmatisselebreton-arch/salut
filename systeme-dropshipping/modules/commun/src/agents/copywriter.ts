/**
 * Copywriter Agent — copy multilingue par produit (1 ligne par langue).
 */
import type { EmailSequence, FaqEntry, Locale } from "../types/index.js";

import { createAnthropicService } from "../services/anthropic.js";
import { getSupabase, withAgentLogging } from "../services/supabase.js";
import { agentLog, AgentError, extractJsonBlock, hasAnthropicCredits } from "./common.js";

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

        let payload: ClaudeCopyPayload;

        if (hasAnthropicCredits()) {
          const ai = createAnthropicService();
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
          const parsed = extractJsonBlock<ClaudeCopyPayload>(raw);
          if (!parsed) {
            throw new AgentError("copywriter", `JSON invalide pour ${language}`);
          }
          payload = parsed;
        } else {
          agentLog.info({ language }, "Mode template (sans API Anthropic)");
          const isFr = language === "fr";
          payload = {
            title: isFr ? `${p.name} — Qualité premium, livraison rapide` : `${p.name} — Premium quality, fast shipping`,
            description: isFr
              ? `Découvrez ${p.name}. ${p.description ?? "Un produit soigneusement sélectionné pour vous."}  Commandez maintenant et profitez de notre garantie satisfaction.`
              : `Discover ${p.name}. ${p.description ?? "A carefully selected product for you."} Order now and enjoy our satisfaction guarantee.`,
            bullet_points: isFr
              ? ["Qualité premium garantie", "Livraison rapide", "Satisfait ou remboursé", "Service client réactif", "Design moderne"]
              : ["Premium quality guaranteed", "Fast shipping", "Money-back guarantee", "Responsive customer service", "Modern design"],
            faq: isFr
              ? [
                  { question: "Quels sont les délais de livraison ?", answer: "7 à 15 jours ouvrés selon votre localisation." },
                  { question: "Puis-je retourner le produit ?", answer: "Oui, retour gratuit sous 14 jours." },
                  { question: "Le produit est-il garanti ?", answer: "Oui, garantie satisfaction 30 jours." },
                  { question: "Comment contacter le service client ?", answer: "Par email, réponse sous 24h." },
                  { question: "Quels modes de paiement acceptez-vous ?", answer: "CB, PayPal, Apple Pay, Google Pay." },
                  { question: "Le produit est-il conforme à la description ?", answer: "Oui, photos et descriptions fidèles au produit réel." },
                ]
              : [
                  { question: "What are the shipping times?", answer: "7 to 15 business days depending on location." },
                  { question: "Can I return the product?", answer: "Yes, free returns within 14 days." },
                  { question: "Is the product guaranteed?", answer: "Yes, 30-day satisfaction guarantee." },
                  { question: "How do I contact support?", answer: "By email, response within 24h." },
                  { question: "What payment methods?", answer: "Credit card, PayPal, Apple Pay, Google Pay." },
                  { question: "Is the product as described?", answer: "Yes, photos and descriptions match the real product." },
                ],
            hooks: isFr
              ? ["Ce produit change tout", "Vous n'allez pas en revenir", "Enfin disponible en France", "Le produit viral du moment", "Arrêtez de scroller", "Regardez ce que j'ai trouvé", "Testé et approuvé", "Le secret des pros"]
              : ["This product changes everything", "You won't believe this", "Finally available", "The viral product of the moment", "Stop scrolling", "Look what I found", "Tested and approved", "The secret of pros"],
            email_sequences: {
              abandon_cart: [
                { subject: isFr ? "Vous avez oublié quelque chose..." : "You forgot something...", body: isFr ? "Votre panier vous attend !" : "Your cart is waiting!", send_after_hours: 1 },
                { subject: isFr ? "Dernière chance !" : "Last chance!", body: isFr ? "Finalisez votre commande avant rupture." : "Complete your order before it's gone.", send_after_hours: 24 },
              ],
              post_purchase: [
                { subject: isFr ? "Merci pour votre commande !" : "Thank you for your order!", body: isFr ? "Votre commande est en préparation." : "Your order is being prepared.", send_after_hours: 1 },
                { subject: isFr ? "Votre colis arrive bientôt" : "Your package is on its way", body: isFr ? "Suivez votre livraison." : "Track your delivery.", send_after_hours: 72 },
              ],
            },
          };
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
