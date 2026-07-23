import type { Locale } from "@/core";
import { LOCALE_COOKIE } from "./settings";

/**
 * Persiste la locale choisie dans un cookie (lu côté serveur par getRequestLocale).
 * Isolé hors composant : l'écriture de `document.cookie` est un effet de bord
 * volontaire, pas une mutation d'état de rendu.
 */
export function persistLocale(next: Locale): void {
  document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=31536000;samesite=lax`;
}
