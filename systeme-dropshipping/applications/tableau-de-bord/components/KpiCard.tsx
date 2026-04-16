/**
 * Carte KPI minimaliste.
 */
interface Props {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "success" | "warning" | "danger";
}

const TONE: Record<NonNullable<Props["tone"]>, string> = {
  default: "text-neutral-900",
  success: "text-green-600",
  warning: "text-amber-600",
  danger: "text-red-600",
};

export function KpiCard({ label, value, hint, tone = "default" }: Props): JSX.Element {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5">
      <div className="text-xs font-medium uppercase tracking-wider text-neutral-500">
        {label}
      </div>
      <div className={`mt-2 text-3xl font-bold ${TONE[tone]}`}>{value}</div>
      {hint ? (
        <div className="mt-1 text-xs text-neutral-500">{hint}</div>
      ) : null}
    </div>
  );
}
