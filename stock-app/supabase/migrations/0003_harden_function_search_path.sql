-- Security hardening (Supabase linter 0011): pin the function's search_path
-- so it can't be hijacked via a mutable role search_path.
create or replace function set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
