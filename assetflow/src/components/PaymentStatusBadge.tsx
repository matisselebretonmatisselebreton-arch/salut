import type { PaymentStatus } from "@/core";

const STYLES: Record<PaymentStatus, string> = {
  paid: "bg-status-ok/10 text-status-ok",
  partial: "bg-status-warn/10 text-status-warn",
  pending: "bg-muted/10 text-muted",
  overdue: "bg-status-urgent/10 text-status-urgent",
};

/** Pastille de statut de règlement (couleurs §5), libellé fourni traduit. */
export function PaymentStatusBadge({
  status,
  label,
}: {
  status: PaymentStatus;
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
