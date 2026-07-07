const formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export function formatEuros(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return "—";
  return formatter.format(amount);
}
