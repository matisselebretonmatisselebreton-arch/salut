"use client";
/**
 * Lien de nav avec highlight si la route correspond.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  children: React.ReactNode;
}

export function ActiveLink({ href, children }: Props): JSX.Element {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? "bg-neutral-900 text-white"
          : "text-neutral-700 hover:bg-neutral-100"
      }`}
    >
      {children}
    </Link>
  );
}
