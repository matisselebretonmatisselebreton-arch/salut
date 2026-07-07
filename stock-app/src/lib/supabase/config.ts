// Central Supabase connection config.
//
// These are the project's PUBLIC client values:
//   - the project URL, and
//   - the anon key, which is meant to be shipped in the browser bundle.
// Data access is protected by Row Level Security (see the SQL migrations),
// so exposing the anon key is safe — this is how every Supabase web client
// works.
//
// We hardcode them on purpose. Reading them from environment variables in the
// hosting dashboard repeatedly introduced an invisible non-ASCII character
// during copy-paste, which either broke the HTTP headers outright or, once
// stripped, produced a key with a missing character ("Invalid API key").
// Hardcoding the known-good values makes deploys bulletproof.

export const SUPABASE_URL = "https://acwpfdxpcwdxchwqocgx.supabase.co";

export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjd3BmZHhwY3dkeGNod3FvY2d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MTUwMDQsImV4cCI6MjA5ODk5MTAwNH0.AUIQ6l5sOpt51sSKYDOA7-iXH1HT_VKJqQlZQ9jvddk";
