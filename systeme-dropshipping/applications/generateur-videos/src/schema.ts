/**
 * Schéma Zod partagé par tous les templates Remotion.
 * 1 instance d'AdProps = 1 vidéo = 1 ligne `creative_variations` côté DB.
 */
import { z } from "zod";

export const colorsSchema = z
  .object({
    primary: z.string().default("#FF3366"),
    secondary: z.string().default("#0F172A"),
    accent: z.string().default("#FACC15"),
    background: z.string().default("#FFFFFF"),
    foreground: z.string().default("#0F172A"),
  })
  .default({});

export const adPropsSchema = z.object({
  // Identité
  brandName: z.string().default("Marque"),
  productName: z.string().default("Produit"),
  // Visuels
  productImages: z
    .array(z.string().url())
    .default([
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    ]),
  // Copy
  hookText: z.string().default("Le produit qui change tout"),
  benefits: z
    .array(z.string())
    .default(["Qualité premium", "Livraison rapide", "Satisfait ou remboursé"]),
  ctaText: z.string().default("Profitez-en maintenant"),
  // Prix
  priceBefore: z.string().default("39,99 €"),
  priceAfter: z.string().default("19,99 €"),
  // Audio
  musicUrl: z.string().nullable().default(null),
  voiceOverUrl: z.string().url().nullable().default(null),
  // Contrôle
  templateStyle: z.enum(["punchy", "minimal", "ugc"]).default("punchy"),
  language: z.enum(["fr", "en"]).default("fr"),
  colors: colorsSchema,
});

export type AdProps = z.infer<typeof adPropsSchema>;
export type AdColors = z.infer<typeof colorsSchema>;

export const DEFAULT_AD_PROPS: AdProps = adPropsSchema.parse({});

/**
 * Découpage temporel partagé par les 3 templates.
 * Total : 15s à 30fps = 450 frames.
 */
export const SCENE_FRAMES = {
  hook: { start: 0, end: 90 }, //   0.0 - 3.0s : accroche plein écran
  product: { start: 90, end: 240 }, //   3.0 - 8.0s : produit + bénéfices
  price: { start: 240, end: 390 }, //   8.0 - 13.0s : prix + CTA
  outro: { start: 390, end: 450 }, //  13.0 - 15.0s : brand
} as const;

export const TOTAL_FRAMES = 450;
export const FPS = 30;
