import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCartCount } from "@/lib/services/cart";
import { NavLinks } from "@/components/layout/NavLinks";
import { SignOutButton } from "@/components/layout/SignOutButton";
import { MobileNav } from "@/components/layout/MobileNav";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const cartCount = await getCartCount(supabase, user.id);

  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
      <MobileNav cartCount={cartCount} />
      <aside className="hidden w-60 shrink-0 flex-col border-r border-zinc-200 p-4 dark:border-zinc-800 sm:flex">
        <span className="mb-6 px-3 text-lg font-semibold">Stock App</span>
        <NavLinks cartCount={cartCount} />
        <div className="mt-auto space-y-2">
          <p className="truncate px-3 text-xs text-zinc-400">{user.email}</p>
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 p-4 sm:p-8">{children}</main>
    </div>
  );
}
