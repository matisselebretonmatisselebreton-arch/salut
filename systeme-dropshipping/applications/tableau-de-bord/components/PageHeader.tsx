/**
 * En-tête de page standard.
 */
interface Props {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, subtitle, actions }: Props): JSX.Element {
  return (
    <header className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-1 text-sm text-neutral-600">{subtitle}</p>
        ) : null}
      </div>
      {actions ? <div className="flex gap-2">{actions}</div> : null}
    </header>
  );
}
