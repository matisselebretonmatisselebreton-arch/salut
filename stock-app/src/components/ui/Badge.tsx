const COLORS = {
  zinc: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  red: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
} as const;

export function Badge({
  children,
  color = "zinc",
}: {
  children: React.ReactNode;
  color?: keyof typeof COLORS;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${COLORS[color]}`}
    >
      {children}
    </span>
  );
}

export const SUPPLIER_STATUS_BADGE: Record<string, { label: string; color: keyof typeof COLORS }> = {
  to_test: { label: "En test", color: "amber" },
  validated: { label: "Validé", color: "green" },
  to_avoid: { label: "À éviter", color: "red" },
};

export const PRODUCT_VALIDATION_BADGE: Record<string, { label: string; color: keyof typeof COLORS }> = {
  pending_test: { label: "En attente de test", color: "amber" },
  validated: { label: "Validé", color: "green" },
  rejected: { label: "Refusé", color: "red" },
};

export const ORDER_STATUS_BADGE: Record<string, { label: string; color: keyof typeof COLORS }> = {
  ordered: { label: "Commandé", color: "zinc" },
  in_transit: { label: "En transit", color: "blue" },
  received: { label: "Reçu", color: "amber" },
  inspected: { label: "Contrôlé", color: "green" },
};

export const QC_STATUS_BADGE: Record<string, { label: string; color: keyof typeof COLORS }> = {
  pending: { label: "À contrôler", color: "amber" },
  conforming: { label: "Conforme", color: "green" },
  minor_defect: { label: "Défaut mineur", color: "amber" },
  rejected: { label: "Refusé", color: "red" },
  to_return: { label: "À retourner", color: "red" },
};

export const STOCK_STATUS_BADGE: Record<string, { label: string; color: keyof typeof COLORS }> = {
  in_stock: { label: "En stock", color: "green" },
  reserved: { label: "Réservé", color: "blue" },
  sold: { label: "Vendu", color: "zinc" },
  returned: { label: "Retourné", color: "red" },
};
