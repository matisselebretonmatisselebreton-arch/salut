"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

/**
 * Affiche l'utilisateur connecté + déconnexion (mode Supabase),
 * ou un badge « Mode démo » quand aucune base n'est branchée.
 */
export function UserMenu({ email }: { email: string | null }) {
  const { t } = useTranslation();
  const router = useRouter();

  if (!email) {
    return (
      <span className="rounded-full bg-status-warn/10 px-2.5 py-0.5 text-xs font-medium text-status-warn">
        {t("auth:user.demoBadge")}
      </span>
    );
  }

  async function signOut() {
    await createSupabaseBrowserClient().auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="hidden text-muted sm:inline">{email}</span>
      <button
        type="button"
        onClick={signOut}
        className="rounded-lg border border-border px-3 py-1 text-muted hover:text-foreground"
      >
        {t("auth:user.signOut")}
      </button>
    </div>
  );
}
