/**
 * Sidebar de navigation — server component (pas d'état).
 * Highlight de la route active via usePathname côté client (sous-composant).
 */
import Link from "next/link";

import { ActiveLink } from "./ActiveLink";

const NAV = [
  { href: "/", label: "Tableau de bord" },
  { href: "/themes", label: "Thèmes" },
  { href: "/candidates", label: "Candidats produit" },
  { href: "/stores", label: "Boutiques" },
  { href: "/products", label: "Produits" },
  { href: "/creatives", label: "Créatives" },
  { href: "/campaigns", label: "Campagnes" },
  { href: "/analytics", label: "Analytics" },
];

export function Sidebar(): JSX.Element {
  return (
    <aside className="w-64 shrink-0 border-r border-neutral-200 bg-white px-4 py-6">
      <Link href="/" className="mb-8 block px-2">
        <div className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
          dropship
        </div>
        <div className="text-lg font-bold text-neutral-900">Console</div>
      </Link>
      <nav className="flex flex-col gap-1">
        {NAV.map((item) => (
          <ActiveLink key={item.href} href={item.href}>
            {item.label}
          </ActiveLink>
        ))}
      </nav>
      <div className="mt-12 px-2 text-xs text-neutral-400">
        <p className="mb-1 font-semibold text-neutral-500">CLI</p>
        <p>
          <code className="font-mono text-[10px]">pnpm run workflow:full</code>
        </p>
        <p className="mt-2">
          <code className="font-mono text-[10px]">pnpm run validate-env -- --ping</code>
        </p>
      </div>
    </aside>
  );
}
