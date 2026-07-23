import "server-only";
import { cookies, headers } from "next/headers";
import { createInstance, type i18n } from "i18next";
import type { Locale } from "@/core";
import {
  DEFAULT_NAMESPACE,
  LOCALE_COOKIE,
  NAMESPACES,
  resolveLocale,
  resources,
} from "./settings";

/**
 * Résout la locale d'une requête serveur : cookie prioritaire, puis
 * Accept-Language. Utilisable dans les Server Components, les PDF et les emails.
 */
export async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const fromCookie = cookieStore.get(LOCALE_COOKIE)?.value;
  if (fromCookie) return resolveLocale(fromCookie);

  const headerStore = await headers();
  const accept = headerStore.get("accept-language") ?? undefined;
  return resolveLocale(accept?.split(",")[0]);
}

/** Instance i18next côté serveur (une par rendu, pas d'état global partagé). */
export async function getServerI18n(locale?: Locale): Promise<i18n> {
  const lng = locale ?? (await getRequestLocale());
  const instance = createInstance();
  await instance.init({
    lng,
    fallbackLng: "fr",
    supportedLngs: ["fr", "en"],
    ns: NAMESPACES,
    defaultNS: DEFAULT_NAMESPACE,
    resources,
    interpolation: { escapeValue: false },
  });
  return instance;
}

/** Raccourci : renvoie la fonction `t` liée à la locale de la requête. */
export async function getT(locale?: Locale) {
  const instance = await getServerI18n(locale);
  return instance.getFixedT(instance.language as Locale);
}
