-- ============================================================================
-- AssetFlow — Migration 0005 : durcissement (suite à l'audit sécurité Supabase)
-- ----------------------------------------------------------------------------
-- Fixe le search_path de set_updated_at (lint 0011_function_search_path_mutable).
-- is_org_member définit déjà son search_path (migration 0001).
--
-- Note : is_org_member reste EXECUTE pour `authenticated` — c'est REQUIS, les
-- policies RLS l'appellent dans le contexte de l'utilisateur connecté. La
-- révoquer casserait la RLS. La fonction ne révèle qu'un booléen sur
-- l'appartenance de l'utilisateur COURANT à une organisation qu'il nomme :
-- surface d'attaque négligeable, exposition RPC assumée.
-- ============================================================================

alter function public.set_updated_at() set search_path = '';
