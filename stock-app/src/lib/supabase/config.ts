// Central Supabase connection config.
//
// Env vars set in the hosting dashboard sometimes pick up an invisible,
// non-ASCII character during copy-paste (zero-width space, smart quote…).
// That character is illegal in an HTTP header value and makes the browser
// throw "Failed to read the 'headers' property … String contains non
// ISO-8859-1 code point" the moment the Supabase client tries to fetch.
//
// We defensively strip anything outside printable ASCII, then fall back to
// the project's known public values. The anon/publishable key is designed to
// be exposed in the client bundle — data access is protected by RLS — so
// keeping a fallback here is safe for this single-tenant app.

function clean(value: string | undefined, fallback: string): string {
  const stripped = (value ?? "").replace(/[^\x20-\x7E]/g, "").trim();
  return stripped || fallback;
}

export const SUPABASE_URL = clean(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  "https://acwpfdxpcwdxchwqocgx.supabase.co"
);

export const SUPABASE_ANON_KEY = clean(
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  "sb_publishable_JJOtgLvJABC389n8-LU8Sw_ttP7sJ9Y"
);
