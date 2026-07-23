import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Middleware d'authentification (mode Supabase uniquement).
 *
 * - Mode démo (pas d'URL Supabase configurée) : passage direct, aucune garde —
 *   l'app reste utilisable sans infra, comme avant.
 * - Mode Supabase : rafraîchit la session (pattern @supabase/ssr) et protège
 *   toutes les routes ; un visiteur non connecté est redirigé vers /login.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function isSupabaseMode(): boolean {
  if (process.env.ASSETFLOW_DATA_SOURCE === "demo") return false;
  return !!SUPABASE_URL && !SUPABASE_URL.includes("placeholder") && !!SUPABASE_ANON;
}

export async function middleware(request: NextRequest) {
  if (!isSupabaseMode()) return NextResponse.next();

  let response = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL!, SUPABASE_ANON!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // getUser() (et non getSession()) : valide le JWT auprès du serveur Supabase.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoginPage = request.nextUrl.pathname.startsWith("/login");

  if (!user && !isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  if (user && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  // Tout sauf les assets statiques.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
