/**
 * État vide : pas de données ou config Supabase manquante.
 */
interface Props {
  title: string;
  description?: string;
  cta?: { label: string; cmd: string };
}

export function EmptyState({ title, description, cta }: Props): JSX.Element {
  return (
    <div className="rounded-lg border border-dashed border-neutral-300 bg-white p-10 text-center">
      <div className="text-base font-semibold text-neutral-900">{title}</div>
      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm text-neutral-600">
          {description}
        </p>
      ) : null}
      {cta ? (
        <div className="mt-4 inline-block rounded-md bg-neutral-900 px-3 py-2 text-left">
          <div className="text-[10px] uppercase tracking-widest text-neutral-400">
            {cta.label}
          </div>
          <code className="font-mono text-xs text-white">{cta.cmd}</code>
        </div>
      ) : null}
    </div>
  );
}
