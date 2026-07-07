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

export const ORDER_STATUS_BADGE: Record<string, { label: string; color: keyof typeof COLORS }> = {
  draft: { label: "Panier", color: "zinc" },
  ordered: { label: "Commandée", color: "blue" },
  at_warehouse: { label: "À l'entrepôt", color: "amber" },
  in_transit: { label: "En transit", color: "blue" },
  received: { label: "Reçue", color: "green" },
};

export const STOCK_STATUS_BADGE: Record<string, { label: string; color: keyof typeof COLORS }> = {
  received: { label: "Reçu", color: "amber" },
  for_sale: { label: "En vente", color: "blue" },
  sold: { label: "Vendu", color: "green" },
};
