"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatMoney, formatPercent, reviseRent, type Locale } from "@/core";
import {
  recordIndexation,
  type RecordIndexationResult,
} from "@/app/(app)/leases/[id]/actions";

/**
 * Simulateur de révision de loyer (§4.2). Le calcul utilise le moteur `core`
 * (reviseRent) — mêmes chiffres que le serveur et les futurs exports/courriers.
 */
export function RentRevisionSimulator({
  leaseId,
  baseRent,
  baseIndex,
  locale,
}: {
  leaseId: string;
  baseRent: number;
  baseIndex: number;
  locale: Locale;
}) {
  const { t } = useTranslation();
  const [newIndex, setNewIndex] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState<RecordIndexationResult | null>(null);

  const parsedIndex = Number(newIndex);
  const preview =
    newIndex && parsedIndex > 0
      ? reviseRent(baseRent, baseIndex, parsedIndex)
      : null;

  async function save() {
    if (!preview) return;
    setSaving(true);
    setSaved(await recordIndexation({ leaseId, baseRent, baseIndex, newIndex: parsedIndex }));
    setSaving(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-muted">
          {t("lease:revision.newIndex")} ({baseIndex} → …)
        </span>
        <input
          type="number"
          step="0.01"
          value={newIndex}
          onChange={(e) => {
            setNewIndex(e.target.value);
            setSaved(null);
          }}
          className="w-40 rounded-lg border border-border bg-transparent px-3 py-2"
        />
      </label>

      {preview && (
        <dl className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <dt className="text-muted">{t("lease:revision.currentRent")}</dt>
            <dd className="font-medium">{formatMoney(baseRent, locale)}</dd>
          </div>
          <div>
            <dt className="text-muted">{t("lease:revision.newRent")}</dt>
            <dd className="font-semibold text-primary">
              {formatMoney(preview.newRent, locale)}
            </dd>
          </div>
          <div>
            <dt className="text-muted">{t("lease:revision.variation")}</dt>
            <dd
              className={
                preview.variationPct >= 0 ? "text-status-ok" : "text-status-urgent"
              }
            >
              {formatPercent(preview.variationPct / 100, locale, 2)}
            </dd>
          </div>
        </dl>
      )}

      {saved?.ok ? (
        <p className="text-sm text-status-ok">{t("lease:revision.recorded")}</p>
      ) : (
        <button
          onClick={save}
          disabled={!preview || saving}
          className="self-start rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
        >
          {t("lease:revision.record")}
        </button>
      )}
    </div>
  );
}
