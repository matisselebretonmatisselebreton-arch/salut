/**
 * Guide la création du projet Supabase + applique le schéma SQL.
 * Implémentation complète à l'étape 2.
 */
console.log(`
┌───────────────────────────────────────────────────────────────┐
│  DROPSHIP SYSTEM — Setup base de données                       │
└───────────────────────────────────────────────────────────────┘

Procédure manuelle (en attendant l'implémentation auto à l'étape 2) :

  1. Aller sur https://supabase.com/dashboard et créer un nouveau projet
  2. Settings > API :
       • Copier "Project URL"          → SUPABASE_URL
       • Copier "anon public"          → SUPABASE_ANON_KEY
       • Copier "service_role"         → SUPABASE_SERVICE_ROLE_KEY
  3. SQL Editor > ouvrir 'packages/db/schema.sql' et tout exécuter
  4. Storage > créer un bucket public nommé 'creatives'
  5. Lancer :  pnpm run validate-env

`);
