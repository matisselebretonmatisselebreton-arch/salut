/**
 * Helpers partagés aux 8 agents : extraction JSON des réponses Claude,
 * sélection de modèle, formatage des erreurs.
 */
import { createLogger } from "../utilitaires/logger.js";

export const agentLog = createLogger("agent");

/**
 * Claude renvoie souvent du JSON entouré de ```json … ``` ou de prose.
 * Extrait le 1er bloc JSON valide. Retourne `null` si rien d'exploitable.
 */
export function extractJsonBlock<T = unknown>(raw: string): T | null {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]+?)```/);
  const candidate = fenced ? fenced[1] : raw;
  if (!candidate) return null;
  // Tentative directe.
  try {
    return JSON.parse(candidate.trim()) as T;
  } catch {
    // Fallback : trouve la 1ʳᵉ accolade ouvrante / 1er crochet ouvrant.
    const start = candidate.search(/[{[]/);
    if (start < 0) return null;
    const opener = candidate[start];
    const closer = opener === "{" ? "}" : "]";
    let depth = 0;
    for (let i = start; i < candidate.length; i += 1) {
      const c = candidate[i];
      if (c === opener) depth += 1;
      else if (c === closer) {
        depth -= 1;
        if (depth === 0) {
          try {
            return JSON.parse(candidate.slice(start, i + 1)) as T;
          } catch {
            return null;
          }
        }
      }
    }
    return null;
  }
}

/** Booléen lu depuis l'env (défaut donné). */
export function envBool(key: string, fallback: boolean): boolean {
  const v = process.env[key];
  if (v === undefined) return fallback;
  return v.toLowerCase() === "true" || v === "1";
}

/** Nombre lu depuis l'env (défaut donné). */
export function envNumber(key: string, fallback: number): number {
  const v = process.env[key];
  if (!v) return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

export function hasAnthropicCredits(): boolean {
  return process.env.ANTHROPIC_API_KEY !== undefined
    && process.env.ANTHROPIC_NO_API !== "true";
}

export class AgentError extends Error {
  constructor(
    public agentName: string,
    message: string,
    public cause?: unknown,
  ) {
    super(`[${agentName}] ${message}`);
    this.name = "AgentError";
  }
}
