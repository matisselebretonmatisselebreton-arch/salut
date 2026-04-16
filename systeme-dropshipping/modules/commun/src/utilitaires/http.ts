/**
 * Wrapper HTTP partagé pour tous les clients API.
 * - Utilise undici.fetch (déjà inclus dans Node 20+, importé pour stabilité).
 * - Lance HttpError typé (avec status + body) sur réponse non-2xx.
 * - Intègre withRetry sur les erreurs retryables.
 */
import { fetch, type RequestInit } from "undici";

import { isRetryableHttpError, withRetry, type RetryOptions } from "./retry.js";

export class HttpError extends Error {
  readonly status: number;
  readonly body: unknown;
  readonly url: string;

  constructor(message: string, init: { status: number; body: unknown; url: string }) {
    super(message);
    this.name = "HttpError";
    this.status = init.status;
    this.body = init.body;
    this.url = init.url;
  }
}

export interface JsonRequestOptions extends RequestInit {
  /** Override les options retry par défaut. */
  retry?: RetryOptions | false;
  /** Timeout en ms (par défaut 20s). */
  timeoutMs?: number;
}

async function parseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
}

/**
 * GET / POST / PATCH / DELETE JSON, avec retry et timeout.
 * Renvoie le body parsé (T), ou throw HttpError si non-2xx après retries.
 */
export async function fetchJson<T>(
  url: string,
  options: JsonRequestOptions = {},
): Promise<T> {
  const { retry, timeoutMs = 20_000, headers, ...rest } = options;

  const run = async (): Promise<T> => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = (await fetch(url, {
        ...rest,
        headers: {
          accept: "application/json",
          ...(rest.body && !(rest.body instanceof FormData)
            ? { "content-type": "application/json" }
            : {}),
          ...(headers as Record<string, string> | undefined),
        },
        signal: controller.signal,
      })) as unknown as Response;

      const body = await parseBody(response);
      if (!response.ok) {
        throw new HttpError(`HTTP ${response.status} on ${url}`, {
          status: response.status,
          body,
          url,
        });
      }
      return body as T;
    } finally {
      clearTimeout(timeout);
    }
  };

  if (retry === false) return run();
  return withRetry(run, { shouldRetry: isRetryableHttpError, ...(retry ?? {}) });
}
