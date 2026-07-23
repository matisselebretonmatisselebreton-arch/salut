"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

/**
 * Connexion / création de compte (mode Supabase).
 * Utilise le client navigateur @supabase/ssr : les cookies de session sont
 * posés côté client puis lus par le middleware et les Server Components.
 */
export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    setInfo(null);

    const supabase = createSupabaseBrowserClient();
    if (mode === "signIn") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(
          error.message.includes("Invalid login credentials")
            ? t("auth:login.errors.invalid_credentials")
            : t("auth:login.errors.generic", { message: error.message }),
        );
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(t("auth:login.errors.generic", { message: error.message }));
      } else {
        setInfo(t("auth:login.checkEmail"));
        setMode("signIn");
      }
    }
    setPending(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary">{t("app.name")}</h1>
          <p className="mt-1 text-muted">{t("auth:login.subtitle")}</p>
        </div>

        <form
          onSubmit={submit}
          className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
        >
          <h2 className="text-lg font-semibold">
            {mode === "signIn" ? t("auth:login.title") : t("auth:login.signUp")}
          </h2>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">{t("auth:login.email")}</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-border bg-transparent px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">{t("auth:login.password")}</span>
            <input
              type="password"
              required
              minLength={6}
              autoComplete={mode === "signIn" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border border-border bg-transparent px-3 py-2"
            />
          </label>

          {error && <p className="text-sm text-status-urgent">{error}</p>}
          {info && <p className="text-sm text-status-ok">{info}</p>}

          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-primary px-4 py-2 font-medium text-white disabled:opacity-40"
          >
            {mode === "signIn" ? t("auth:login.signIn") : t("auth:login.signUp")}
          </button>

          <button
            type="button"
            onClick={() => {
              setMode(mode === "signIn" ? "signUp" : "signIn");
              setError(null);
            }}
            className="text-sm text-muted hover:text-foreground"
          >
            {mode === "signIn"
              ? t("auth:login.switchToSignUp")
              : t("auth:login.switchToSignIn")}
          </button>
        </form>
      </div>
    </main>
  );
}
