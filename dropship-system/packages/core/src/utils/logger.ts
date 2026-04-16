/**
 * Logger structuré (pino). Niveaux : debug | info | warn | error.
 * Niveau contrôlé par la variable d'env LOG_LEVEL (défaut : info).
 */
import pino, { type Logger } from "pino";

const level = (process.env.LOG_LEVEL ?? "info").toLowerCase();

export const log: Logger = pino({
  level,
  transport:
    process.env.NODE_ENV === "production"
      ? undefined
      : {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "HH:MM:ss",
            ignore: "pid,hostname",
          },
        },
});

export function createLogger(component: string): Logger {
  return log.child({ component });
}
