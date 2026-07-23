import type { Locale } from "@/core";
import { formatPercent } from "@/core";

/**
 * Badge de taux d'occupation avec code couleur de statut (§5) :
 * vert ≥ 90 %, orange 70–90 %, rouge < 70 %. Tiret si non calculable.
 */
export function OccupancyBadge({
  ratio,
  locale,
}: {
  ratio: number | null;
  locale: Locale;
}) {
  const label = formatPercent(ratio, locale);

  let cls = "bg-muted/10 text-muted";
  if (ratio != null) {
    if (ratio >= 0.9) cls = "bg-status-ok/10 text-status-ok";
    else if (ratio >= 0.7) cls = "bg-status-warn/10 text-status-warn";
    else cls = "bg-status-urgent/10 text-status-urgent";
  }

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-sm font-medium ${cls}`}
    >
      {label}
    </span>
  );
}
