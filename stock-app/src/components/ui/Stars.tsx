export function Stars({ rating }: { rating: number | null }) {
  if (rating === null) return <span className="text-zinc-400">Non noté</span>;
  return (
    <span className="text-amber-500" title={`${rating}/5`}>
      {"★".repeat(rating)}
      <span className="text-zinc-300 dark:text-zinc-600">{"★".repeat(5 - rating)}</span>
    </span>
  );
}
