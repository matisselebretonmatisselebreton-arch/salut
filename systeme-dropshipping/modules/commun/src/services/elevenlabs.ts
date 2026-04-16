/**
 * ElevenLabs TTS — génère un mp3 voix off depuis un script texte.
 *
 * Désactivé par défaut (`ELEVENLABS_ENABLED=false`). Si activé, requiert
 * `ELEVENLABS_API_KEY` + `ELEVENLABS_VOICE_ID_FR` / `ELEVENLABS_VOICE_ID_EN`.
 */
import { fetch } from "undici";

import { requireEnv } from "../utilitaires/env.js";
import { createLogger } from "../utilitaires/logger.js";
import { withRetry, isRetryableHttpError } from "../utilitaires/retry.js";

const log = createLogger("elevenlabs");

export interface ElevenLabsConfig {
  apiKey?: string;
  voiceIdFr?: string;
  voiceIdEn?: string;
}

export interface SynthesizeOptions {
  /** Script à dire. */
  text: string;
  /** Langue → sélectionne la voix correspondante. */
  language: "fr" | "en";
  /** Modèle TTS. Défaut "eleven_multilingual_v2". */
  modelId?: string;
}

export interface ElevenLabsService {
  /** Renvoie le buffer mp3 — l'appelant l'upload (ex: vers Supabase Storage). */
  synthesizeSpeech(options: SynthesizeOptions): Promise<Buffer>;
  /** True si ELEVENLABS_ENABLED=true et la clé est présente. */
  isEnabled(): boolean;
}

export function createElevenLabsService(
  config: ElevenLabsConfig = {},
): ElevenLabsService {
  const enabled =
    process.env.ELEVENLABS_ENABLED === "true" &&
    Boolean(config.apiKey ?? process.env.ELEVENLABS_API_KEY);

  return {
    isEnabled: () => enabled,
    async synthesizeSpeech({ text, language, modelId = "eleven_multilingual_v2" }) {
      if (!enabled) {
        throw new Error(
          "ElevenLabs est désactivé. Pour l'activer : ELEVENLABS_ENABLED=true + ELEVENLABS_API_KEY.",
        );
      }
      const apiKey = config.apiKey ?? requireEnv("ELEVENLABS_API_KEY");
      const voiceId =
        language === "fr"
          ? (config.voiceIdFr ?? requireEnv("ELEVENLABS_VOICE_ID_FR"))
          : (config.voiceIdEn ?? requireEnv("ELEVENLABS_VOICE_ID_EN"));

      log.debug({ language, voiceId, length: text.length }, "synthesizeSpeech");

      return withRetry(
        async () => {
          const response = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
            {
              method: "POST",
              headers: {
                "xi-api-key": apiKey,
                "content-type": "application/json",
                accept: "audio/mpeg",
              },
              body: JSON.stringify({
                text,
                model_id: modelId,
                voice_settings: { stability: 0.45, similarity_boost: 0.75 },
              }),
            },
          );
          if (!response.ok) {
            const body = await response.text();
            const err: Error & { status?: number } = new Error(
              `ElevenLabs HTTP ${response.status}: ${body.slice(0, 200)}`,
            );
            err.status = response.status;
            throw err;
          }
          const arrayBuffer = await response.arrayBuffer();
          return Buffer.from(arrayBuffer);
        },
        { shouldRetry: isRetryableHttpError },
      );
    },
  };
}
