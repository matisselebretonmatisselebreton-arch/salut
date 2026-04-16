/**
 * Retry exponential backoff générique.
 * Utilisé par tous les clients API pour amortir les rate-limits / 5xx.
 */

export interface RetryOptions {
  /** Nombre de tentatives max (1ère incluse). Défaut 4. */
  maxAttempts?: number;
  /** Délai initial en ms. Défaut 500. */
  initialDelayMs?: number;
  /** Multiplicateur appliqué à chaque échec. Défaut 2. */
  backoffFactor?: number;
  /** Plafond de délai par tentative. Défaut 16000. */
  maxDelayMs?: number;
  /** Renvoyer `true` pour réessayer, `false` pour propager l'erreur. */
  shouldRetry?: (error: unknown, attempt: number) => boolean;
  /** Hook appelé avant chaque retry (pour logging). */
  onRetry?: (error: unknown, attempt: number, delayMs: number) => void;
}

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const {
    maxAttempts = 4,
    initialDelayMs = 500,
    backoffFactor = 2,
    maxDelayMs = 16_000,
    shouldRetry = () => true,
    onRetry,
  } = options;

  let attempt = 0;
  let lastError: unknown;
  let delay = initialDelayMs;

  while (attempt < maxAttempts) {
    attempt += 1;
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt >= maxAttempts || !shouldRetry(err, attempt)) {
        throw err;
      }
      onRetry?.(err, attempt, delay);
      await sleep(delay);
      delay = Math.min(delay * backoffFactor, maxDelayMs);
    }
  }
  throw lastError;
}

/**
 * Helper : retry uniquement sur les erreurs réseau et 429/5xx HTTP.
 * Les 4xx (sauf 429) sont des erreurs de payload → pas de retry.
 */
export function isRetryableHttpError(error: unknown): boolean {
  if (!error || typeof error !== "object") return true; // erreurs réseau brutes
  const status = (error as { status?: number }).status;
  if (typeof status !== "number") return true;
  return status === 429 || (status >= 500 && status < 600);
}
