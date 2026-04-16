/**
 * Creative Generator Agent — produit N variations × M formats par produit.
 *
 * Stratégie :
 *  1. Lire produit + copy + branding pour assembler les `AdProps`.
 *  2. Insérer 1 ligne `creative_variations` par (template × variation_index).
 *  3. Pour chaque variation × format : insérer `rendered_videos` (status=pending)
 *     puis lancer `pnpm --filter @dropship/remotion run render`. En cas d'échec,
 *     marquer `failed`. L'upload Storage Supabase est best-effort si bucket dispo.
 *  4. Si `dryRun=true`, on insère les variations mais on ne lance pas le rendu.
 */
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type {
  ColorPalette,
  Locale,
  TemplateStyle,
  VideoFormat,
} from "../types/index.js";

import { getSupabase, withAgentLogging } from "../services/supabase.js";
import { agentLog, AgentError, envBool } from "./common.js";

export interface CreativeGeneratorInput {
  productId: string;
  templates?: TemplateStyle[];
  variationsPerTemplate?: number;
  formats?: VideoFormat[];
  language?: Locale;
  dryRun?: boolean;
}

export interface CreativeGeneratorOutput {
  productId: string;
  variationsCreated: number;
  videosRendered: number;
  videosFailed: number;
  details: Array<{
    variationId: string;
    template: TemplateStyle;
    hook: string;
    renders: Array<{ format: VideoFormat; videoId: string; status: string }>;
  }>;
}

const COMPOSITION_BY_FORMAT: Record<VideoFormat, string | null> = {
  vertical_9_16: "MasterAd-Vertical",
  square_1_1: "MasterAd-Square",
  horizontal_16_9: null, // pas de composition 16:9 en MVP
};

interface BuildVariationParams {
  brandName: string;
  productName: string;
  productImages: string[];
  hook: string;
  benefits: string[];
  ctaText: string;
  priceBefore: string;
  priceAfter: string;
  voiceOverUrl: string | null;
  templateStyle: TemplateStyle;
  language: Locale;
  colors: ColorPalette;
}

function buildAdProps(params: BuildVariationParams): Record<string, unknown> {
  return {
    brandName: params.brandName,
    productName: params.productName,
    productImages:
      params.productImages.length > 0
        ? params.productImages
        : ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"],
    hookText: params.hook,
    benefits: params.benefits.slice(0, 3),
    ctaText: params.ctaText,
    priceBefore: params.priceBefore,
    priceAfter: params.priceAfter,
    musicUrl: null,
    voiceOverUrl: params.voiceOverUrl,
    templateStyle: params.templateStyle,
    language: params.language,
    colors: {
      primary: params.colors.primary ?? "#FF3366",
      secondary: params.colors.secondary ?? "#0F172A",
      accent: params.colors.accent ?? "#FACC15",
      background: params.colors.background ?? "#FFFFFF",
      foreground: params.colors.foreground ?? "#0F172A",
    },
  };
}

function pickHooks(all: string[], count: number, offset: number): string[] {
  if (all.length === 0) return Array(count).fill("Découvrez notre nouveauté");
  const out: string[] = [];
  for (let i = 0; i < count; i += 1) {
    out.push(all[(offset + i) % all.length] as string);
  }
  return out;
}

function spawnRender(
  composition: string,
  propsJson: string,
  outputPath: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(
      "pnpm",
      [
        "--filter",
        "@dropship/remotion",
        "run",
        "render",
        composition,
        outputPath,
        `--props=${propsJson}`,
      ],
      { stdio: "inherit", shell: process.platform === "win32" },
    );
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Render exit ${code}`));
    });
  });
}

export async function runCreativeGenerator(
  input: CreativeGeneratorInput,
): Promise<CreativeGeneratorOutput> {
  const dryRun = input.dryRun ?? envBool("DRY_RUN", true);
  const templates = input.templates ?? (["punchy", "minimal", "ugc"] as TemplateStyle[]);
  const variationsPerTemplate = input.variationsPerTemplate ?? 3;
  const formats =
    input.formats ?? (["vertical_9_16", "square_1_1"] as VideoFormat[]);

  return withAgentLogging<CreativeGeneratorInput, CreativeGeneratorOutput>({
    agentName: "creative-generator",
    action: "generate",
    input,
    productId: input.productId,
    dryRun,
    run: async () => {
      const supabase = getSupabase();
      const { data: product, error: prodErr } = await supabase
        .from("products")
        .select("id, name, store_id, images_urls, price, cost")
        .eq("id", input.productId)
        .single();
      if (prodErr || !product) {
        throw new AgentError(
          "creative-generator",
          `Produit introuvable : ${input.productId}`,
          prodErr,
        );
      }
      const p = product as {
        id: string;
        name: string;
        store_id: string;
        images_urls: string[];
        price: number;
        cost: number | null;
      };

      const language: Locale = input.language ?? "fr";
      const { data: copyRow } = await supabase
        .from("product_copy")
        .select("title, hooks_json, bullet_points_json")
        .eq("product_id", input.productId)
        .eq("language", language)
        .maybeSingle();
      if (!copyRow) {
        throw new AgentError(
          "creative-generator",
          `Aucun product_copy en ${language} pour ce produit. Lance copywriter d'abord.`,
        );
      }
      const copy = copyRow as {
        title: string;
        hooks_json: string[];
        bullet_points_json: string[];
      };

      const { data: brandingRow } = await supabase
        .from("brandings")
        .select("brand_name, color_palette_json")
        .eq("store_id", p.store_id)
        .maybeSingle();
      const branding = (brandingRow ?? {
        brand_name: "Brand",
        color_palette_json: {},
      }) as { brand_name: string; color_palette_json: ColorPalette };

      const ctaText = language === "fr" ? "Profitez-en maintenant" : "Get yours now";
      const currency = language === "fr" ? "€" : "$";
      const priceAfter = `${p.price.toFixed(2)} ${currency}`;
      const priceBefore = `${(p.price * 1.5).toFixed(2)} ${currency}`;

      const renderRoot = path.resolve(
        process.cwd(),
        "donnees",
        "renders",
        p.id,
      );
      mkdirSync(renderRoot, { recursive: true });

      const details: CreativeGeneratorOutput["details"] = [];
      let videosRendered = 0;
      let videosFailed = 0;

      let hookOffset = 0;
      for (const template of templates) {
        const hooks = pickHooks(copy.hooks_json, variationsPerTemplate, hookOffset);
        hookOffset += variationsPerTemplate;
        for (let v = 0; v < variationsPerTemplate; v += 1) {
          const hook = hooks[v] as string;
          const { data: variation, error: varErr } = await supabase
            .from("creative_variations")
            .insert({
              product_id: input.productId,
              template_style: template,
              hook_text: hook,
              music_id: null,
              voice_over_url: null,
              color_scheme_json: branding.color_palette_json,
              language,
              status: "pending",
            })
            .select("id")
            .single();
          if (varErr || !variation) {
            throw new AgentError("creative-generator", "Insert variation", varErr);
          }
          const variationId = (variation as { id: string }).id;
          const renders: CreativeGeneratorOutput["details"][number]["renders"] = [];

          for (const format of formats) {
            const composition = COMPOSITION_BY_FORMAT[format];
            if (!composition) {
              continue;
            }
            const adProps = buildAdProps({
              brandName: branding.brand_name,
              productName: copy.title || p.name,
              productImages: p.images_urls,
              hook,
              benefits: copy.bullet_points_json,
              ctaText,
              priceBefore,
              priceAfter,
              voiceOverUrl: null,
              templateStyle: template,
              language,
              colors: branding.color_palette_json,
            });
            const outputFile = path.join(
              renderRoot,
              `${variationId}-${format}.mp4`,
            );

            const { data: video, error: vidErr } = await supabase
              .from("rendered_videos")
              .insert({
                variation_id: variationId,
                format,
                file_url: outputFile,
                status: dryRun ? "pending" : "rendering",
              })
              .select("id")
              .single();
            if (vidErr || !video) {
              throw new AgentError("creative-generator", "Insert rendered_videos", vidErr);
            }
            const videoId = (video as { id: string }).id;

            if (dryRun) {
              renders.push({ format, videoId, status: "pending" });
              continue;
            }

            try {
              await spawnRender(composition, JSON.stringify(adProps), outputFile);
              const stats = statSync(outputFile);
              await supabase
                .from("rendered_videos")
                .update({
                  status: "completed",
                  file_size_bytes: stats.size,
                  duration_seconds: 15,
                })
                .eq("id", videoId);
              videosRendered += 1;
              renders.push({ format, videoId, status: "completed" });
              // best-effort upload Supabase Storage si bucket dispo.
              await maybeUploadToStorage(videoId, outputFile);
            } catch (err) {
              videosFailed += 1;
              const message = err instanceof Error ? err.message : String(err);
              await supabase
                .from("rendered_videos")
                .update({ status: "failed", error_message: message })
                .eq("id", videoId);
              renders.push({ format, videoId, status: "failed" });
            }
          }

          await supabase
            .from("creative_variations")
            .update({ status: dryRun ? "pending" : "rendered" })
            .eq("id", variationId);

          details.push({ variationId, template, hook, renders });
        }
      }

      return {
        productId: input.productId,
        variationsCreated: details.length,
        videosRendered,
        videosFailed,
        details,
      };
    },
  });
}

async function maybeUploadToStorage(
  videoId: string,
  filePath: string,
): Promise<void> {
  const bucket = process.env.SUPABASE_BUCKET_CREATIVES ?? "creatives";
  try {
    const supabase = getSupabase();
    const buffer = readFileSync(filePath);
    const remotePath = `${videoId}.mp4`;
    const { error: upErr } = await supabase.storage
      .from(bucket)
      .upload(remotePath, buffer, { contentType: "video/mp4", upsert: true });
    if (upErr) {
      agentLog.warn({ err: upErr }, "upload Storage skip");
      return;
    }
    const { data } = supabase.storage.from(bucket).getPublicUrl(remotePath);
    await supabase
      .from("rendered_videos")
      .update({ file_url: data.publicUrl })
      .eq("id", videoId);
  } catch (err) {
    agentLog.warn({ err }, "upload Storage erreur (non bloquante)");
  }
}
