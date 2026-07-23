"use client";

import { createInstance } from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { useMemo } from "react";
import type { Locale } from "@/core";
import {
  DEFAULT_NAMESPACE,
  NAMESPACES,
  resources,
} from "./settings";

/**
 * Fournit i18next aux composants clients. La locale est déterminée côté serveur
 * (cookie / Accept-Language) puis passée en prop — pas de flash de langue.
 */
export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const instance = useMemo(() => {
    const i18n = createInstance();
    i18n.use(initReactI18next).init({
      lng: locale,
      fallbackLng: "fr",
      supportedLngs: ["fr", "en"],
      ns: NAMESPACES,
      defaultNS: DEFAULT_NAMESPACE,
      resources,
      interpolation: { escapeValue: false },
    });
    return i18n;
  }, [locale]);

  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
}
