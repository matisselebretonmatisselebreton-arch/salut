"use client";

import { useState } from "react";
import { NavLinks } from "@/components/layout/NavLinks";
import { SignOutButton } from "@/components/layout/SignOutButton";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800 sm:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-lg font-semibold">Stock App</span>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          aria-label="Menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <div className="space-y-3 px-4 pb-4">
          <NavLinks onNavigate={() => setOpen(false)} />
          <SignOutButton />
        </div>
      )}
    </div>
  );
}
