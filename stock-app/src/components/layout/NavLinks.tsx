"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/dashboard", label: "Tableau de bord" },
  { href: "/products", label: "Catalogue" },
  { href: "/cart", label: "Panier" },
  { href: "/orders", label: "Commandes" },
  { href: "/stock", label: "Ventes & stock" },
];

export function NavLinks({ onNavigate, cartCount = 0 }: { onNavigate?: () => void; cartCount?: number }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {LINKS.map((link) => {
        const active = pathname?.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            <span>{link.label}</span>
            {link.href === "/cart" && cartCount > 0 && (
              <span
                className={`ml-2 inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
                  active
                    ? "bg-white/20 text-current"
                    : "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                }`}
              >
                {cartCount}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
