/**
 * Badge coloré selon un statut DB (ENUM).
 * Mapping centralisé pour rester cohérent dans toute l'app.
 */
type Tone = "neutral" | "info" | "success" | "warning" | "danger";

const STATUS_TONE: Record<string, Tone> = {
  // ProductCandidateStatus
  pending: "warning",
  approved: "success",
  rejected: "danger",
  imported: "info",
  // StoreStatus
  planning: "neutral",
  building: "warning",
  live: "success",
  paused: "warning",
  archived: "neutral",
  // ProductStatus
  draft: "neutral",
  discontinued: "neutral",
  // VideoStatus
  rendering: "info",
  completed: "success",
  failed: "danger",
  // AdCampaignStatus
  pending_approval: "warning",
  active: "success",
  killed: "danger",
  // AgentLogStatus
  success: "success",
  error: "danger",
  partial: "warning",
  skipped: "neutral",
};

const TONE_CLASS: Record<Tone, string> = {
  neutral: "bg-neutral-100 text-neutral-700",
  info: "bg-blue-100 text-blue-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-red-700",
};

interface Props {
  value: string | null | undefined;
  tone?: Tone;
}

export function Badge({ value, tone }: Props): JSX.Element {
  const v = value ?? "—";
  const t = tone ?? STATUS_TONE[v] ?? "neutral";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASS[t]}`}
    >
      {v}
    </span>
  );
}
