/**
 * Logger structuré (pino). Niveaux : debug | info | warn | error.
 * Niveau contrôlé par la variable d'env LOG_LEVEL (défaut : info).
 */
import pino, { type Logger } from "pino";

const level = (process.env.LOG_LEVEL ?? "info").toLowerCase();

export const log: Logger = pino({ level });

export function createLogger(component: string): Logger {
  return log.child({ component });
}
