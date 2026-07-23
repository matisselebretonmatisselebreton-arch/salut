"use client";

import { useState } from "react";

export interface TabItem {
  key: string;
  label: string;
  content: React.ReactNode;
  /** Onglet désactivé (données issues d'un module non encore livré). */
  disabled?: boolean;
}

/**
 * Onglets accessibles (navigation clavier via les boutons natifs).
 * Le contenu de chaque onglet est rendu côté serveur et passé en prop —
 * la logique métier reste hors du composant client.
 */
export function Tabs({ items }: { items: TabItem[] }) {
  const firstEnabled = items.find((i) => !i.disabled)?.key ?? items[0]?.key;
  const [active, setActive] = useState(firstEnabled);
  const activeItem = items.find((i) => i.key === active);

  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-1 border-b border-border">
        {items.map((item) => (
          <button
            key={item.key}
            role="tab"
            type="button"
            aria-selected={active === item.key}
            disabled={item.disabled}
            onClick={() => setActive(item.key)}
            className={
              "px-4 py-2 text-sm font-medium transition " +
              (active === item.key
                ? "border-b-2 border-primary text-primary"
                : item.disabled
                  ? "cursor-not-allowed text-muted/50"
                  : "text-muted hover:text-foreground")
            }
          >
            {item.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="pt-5">
        {activeItem?.content}
      </div>
    </div>
  );
}
