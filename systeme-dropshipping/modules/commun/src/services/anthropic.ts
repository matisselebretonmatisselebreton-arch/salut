/**
 * Wrapper Anthropic Claude — un seul client partagé, sélection modèle simple.
 *
 * Modèles :
 *   - default (sonnet)  : la plupart des tâches (research, copy ops, analytics).
 *   - creative (opus)   : branding, hooks ads, storytelling, orchestration.
 *
 * Pas de prompt caching ici (tâches one-shot agents). Sera ajouté à l'étape
 * "scaling" si on industrialise une boucle longue conversation.
 */
import Anthropic from "@anthropic-ai/sdk";

import { requireEnv } from "../utilitaires/env.js";
import { createLogger } from "../utilitaires/logger.js";

const log = createLogger("anthropic");

export type ClaudeModelTier = "default" | "creative";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatOptions {
  /** Tier de modèle ("default" → Sonnet, "creative" → Opus). */
  tier?: ClaudeModelTier;
  /** System prompt (sinon agent générique). */
  system?: string;
  /** maxTokens (défaut 4096). */
  maxTokens?: number;
  /** Température (défaut 0.7 pour créatif, 0.2 pour default). */
  temperature?: number;
}

export interface AnthropicService {
  chat(messages: ChatMessage[], options?: ChatOptions): Promise<string>;
  /** Helper : 1 prompt user → réponse string. */
  ask(prompt: string, options?: ChatOptions): Promise<string>;
  /** Modèles résolus (utile pour log). */
  resolveModel(tier: ClaudeModelTier): string;
}

let cachedClient: Anthropic | null = null;
let cachedService: AnthropicService | null = null;

function getClient(): Anthropic {
  if (cachedClient) return cachedClient;
  cachedClient = new Anthropic({ apiKey: requireEnv("ANTHROPIC_API_KEY") });
  return cachedClient;
}

export function createAnthropicService(): AnthropicService {
  if (cachedService) return cachedService;

  const resolveModel = (tier: ClaudeModelTier): string => {
    if (tier === "creative") {
      return process.env.ANTHROPIC_MODEL_CREATIVE ?? "claude-opus-4-6";
    }
    return process.env.ANTHROPIC_MODEL_DEFAULT ?? "claude-sonnet-4-6";
  };

  const chat = async (
    messages: ChatMessage[],
    options: ChatOptions = {},
  ): Promise<string> => {
    const client = getClient();
    const tier = options.tier ?? "default";
    const model = resolveModel(tier);
    const temperature =
      options.temperature ?? (tier === "creative" ? 0.7 : 0.2);

    log.debug({ model, tier, messages: messages.length }, "anthropic.chat");

    const response = await client.messages.create({
      model,
      max_tokens: options.maxTokens ?? 4096,
      temperature,
      system: options.system,
      messages,
    });

    const text = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n");

    return text;
  };

  cachedService = {
    chat,
    ask: (prompt, options) => chat([{ role: "user", content: prompt }], options),
    resolveModel,
  };
  return cachedService;
}
