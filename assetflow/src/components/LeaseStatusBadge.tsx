import type { LeaseStatus } from "@/core";

const STYLES: Record<LeaseStatus, string> = {
  active: "bg-status-ok/10 text-status-ok",
  draft: "bg-muted/10 text-muted",
  terminated: "bg-status-urgent/10 text-status-urgent",
  expired: "bg-status-warn/10 text-status-warn",
};

/** Pastille de statut de bail avec libellé traduit fourni par l'appelant. */
export function LeaseStatusBadge({
  status,
  label,
}: {
  status: LeaseStatus;
  label: string;
}) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${STYLES[status]}`}
    >
      {label}
    </span>
  );
}
