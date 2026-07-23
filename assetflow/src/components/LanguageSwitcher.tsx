"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import type { Locale } from "@/core";
import { persistLocale } from "@/i18n/persistLocale";

/**
 * Bascule FR/EN. Écrit la préférence dans un cookie lu côté serveur
 * (getRequestLocale) puis rafraîchit le rendu — pas de flash de langue.
 */
export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();
  const { i18n, t } = useTranslation();

  function switchTo(next: Locale) {
    if (next === locale) return;
    persistLocale(next);
    void i18n.changeLanguage(next);
    router.refresh();
  }

  return (
    <div
      className="flex items-center gap-1 text-sm"
      role="group"
      aria-label={t("language.label")}
    >
      {(["fr", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-pressed={locale === l}
          className={
            locale === l
              ? "rounded px-2 py-1 font-semibold text-primary"
              : "rounded px-2 py-1 text-muted hover:text-foreground"
          }
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
