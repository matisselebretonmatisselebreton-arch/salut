-- ============================================================================
-- AssetFlow — Migration 0001 : socle multi-tenant + Module 1 (Référentiel patrimoine)
-- ----------------------------------------------------------------------------
-- Principes appliqués (voir prompt maître §3, §6, §9) :
--   * Multi-tenant STRICT : isolation par organization_id, garantie au niveau
--     base via Row-Level Security (RLS) — pas seulement dans le code applicatif.
--   * Soft-delete : les entités financières / patrimoniales ne sont jamais
--     supprimées physiquement (colonne archived_at), pour l'auditabilité.
--   * Audit : created_at / updated_at / created_by sur chaque table.
--   * Source de vérité unique : Organization > Portfolio > Asset > Building > Unit.
-- ============================================================================

create extension if not exists "pgcrypto";      -- gen_random_uuid()

-- ----------------------------------------------------------------------------
-- ENUMS
-- ----------------------------------------------------------------------------
create type asset_type as enum (
  'office',        -- bureau
  'retail',        -- commerce
  'residential',   -- résidentiel
  'logistics',     -- logistique
  'mixed'          -- mixte
);

create type org_role as enum (
  'org_admin',        -- Admin organisation
  'asset_manager',    -- Asset Manager / Gérant
  'property_manager', -- Property Manager / Gestionnaire locatif
  'accountant',       -- Comptable
  'investor',         -- Investisseur (lecture seule)
  'tenant'            -- Locataire (portail dédié)
);

-- Niveau de permission d'un utilisateur SUR un portefeuille donné.
create type portfolio_permission as enum (
  'owner',   -- gestion complète
  'editor',  -- édition
  'viewer'   -- lecture seule
);

-- ----------------------------------------------------------------------------
-- ORGANIZATION (tenant)
-- ----------------------------------------------------------------------------
create table organizations (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  -- Langue par défaut de l'organisation (les entités portent leur propre langue
  -- de document, mais l'UI/les libellés suivent la préférence utilisateur).
  default_locale text not null default 'fr' check (default_locale in ('fr', 'en')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  archived_at   timestamptz
);

-- ----------------------------------------------------------------------------
-- USER MEMBERSHIP
-- Lien entre auth.users (Supabase Auth) et une organisation, avec rôle global.
-- ----------------------------------------------------------------------------
create table organization_members (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  user_id         uuid not null references auth.users(id) on delete cascade,
  role            org_role not null default 'asset_manager',
  locale          text not null default 'fr' check (locale in ('fr', 'en')),
  created_at      timestamptz not null default now(),
  unique (organization_id, user_id)
);

-- ----------------------------------------------------------------------------
-- PORTFOLIO
-- ----------------------------------------------------------------------------
create table portfolios (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  name            text not null,
  description     text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  created_by      uuid references auth.users(id),
  archived_at     timestamptz
);
create index portfolios_org_idx on portfolios (organization_id) where archived_at is null;

-- Droits d'accès fins par portefeuille (many-to-many, cf. §3 UserPortfolioAccess).
create table portfolio_access (
  id           uuid primary key default gen_random_uuid(),
  portfolio_id uuid not null references portfolios(id) on delete cascade,
  user_id      uuid not null references auth.users(id) on delete cascade,
  permission   portfolio_permission not null default 'viewer',
  created_at   timestamptz not null default now(),
  unique (portfolio_id, user_id)
);
create index portfolio_access_user_idx on portfolio_access (user_id);

-- ----------------------------------------------------------------------------
-- ASSET (actif immobilier)
-- ----------------------------------------------------------------------------
create table assets (
  id                uuid primary key default gen_random_uuid(),
  organization_id   uuid not null references organizations(id) on delete cascade,
  portfolio_id      uuid not null references portfolios(id) on delete restrict,
  name              text not null,
  asset_type        asset_type not null,

  -- Adresse (géocodage : lat/lng renseignés par le service de géocodage).
  address_line1     text,
  address_line2     text,
  postal_code       text,
  city              text,
  country           text not null default 'FR',
  latitude          double precision,
  longitude         double precision,

  -- Surfaces (m²). GLA/SHON/SDP selon marché — stockées séparément.
  surface_useful    numeric(12, 2),   -- surface utile
  surface_gla       numeric(12, 2),   -- Gross Leasable Area
  surface_sdp       numeric(12, 2),   -- Surface de plancher (SDP/SHON)

  -- Données patrimoniales / financières de référence.
  acquisition_date  date,
  acquisition_value numeric(16, 2),   -- valeur d'acquisition
  net_book_value    numeric(16, 2),   -- valeur nette comptable
  construction_year integer,
  epc_rating        text,             -- DPE (A..G)
  certifications    text[],           -- HQE, BREEAM, ...
  cover_image_url   text,

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  created_by        uuid references auth.users(id),
  archived_at       timestamptz
);
create index assets_portfolio_idx on assets (portfolio_id) where archived_at is null;
create index assets_org_idx on assets (organization_id) where archived_at is null;

-- ----------------------------------------------------------------------------
-- BUILDING (bâtiment — pour les actifs multi-bâtiments)
-- ----------------------------------------------------------------------------
create table buildings (
  id          uuid primary key default gen_random_uuid(),
  asset_id    uuid not null references assets(id) on delete cascade,
  name        text not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  archived_at timestamptz
);
create index buildings_asset_idx on buildings (asset_id) where archived_at is null;

-- ----------------------------------------------------------------------------
-- UNIT (lot / unité locative)
-- Le taux d'occupation se calcule à partir de is_occupied + surface (cf. core/occupancy).
-- ----------------------------------------------------------------------------
create table units (
  id           uuid primary key default gen_random_uuid(),
  asset_id     uuid not null references assets(id) on delete cascade,
  building_id  uuid references buildings(id) on delete set null,
  reference    text not null,                 -- ex. "Lot 12", "RDC-A"
  floor        text,
  surface      numeric(12, 2),                -- surface louable du lot (m²)
  -- Occupation : un lot est "louable" par défaut. is_rentable=false pour les
  -- parties communes / lots hors marché locatif (exclus du dénominateur).
  is_rentable  boolean not null default true,
  is_occupied  boolean not null default false, -- alimenté par Lease actif (Module 2)
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  archived_at  timestamptz
);
create index units_asset_idx on units (asset_id) where archived_at is null;

-- ----------------------------------------------------------------------------
-- Trigger générique : maintien de updated_at
-- ----------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare t text;
begin
  foreach t in array array['organizations','portfolios','assets','buildings','units']
  loop
    execute format(
      'create trigger trg_%1$s_updated_at before update on %1$s
       for each row execute function set_updated_at();', t);
  end loop;
end$$;

-- ============================================================================
-- ROW-LEVEL SECURITY
-- ----------------------------------------------------------------------------
-- Stratégie : un utilisateur ne voit que les données des organisations dont il
-- est membre. On s'appuie sur auth.uid() (JWT Supabase). Fonction helper pour
-- éviter la récursion de policies et centraliser la logique d'appartenance.
-- ============================================================================

-- Retourne true si l'utilisateur courant est membre de l'organisation donnée.
create or replace function is_org_member(org uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from organization_members m
    where m.organization_id = org
      and m.user_id = auth.uid()
  );
$$;

alter table organizations        enable row level security;
alter table organization_members enable row level security;
alter table portfolios           enable row level security;
alter table portfolio_access     enable row level security;
alter table assets               enable row level security;
alter table buildings            enable row level security;
alter table units                enable row level security;

-- Organizations : lecture pour ses membres.
create policy org_select on organizations
  for select using (is_org_member(id));

-- Membership : un utilisateur voit ses propres appartenances.
create policy members_select on organization_members
  for select using (user_id = auth.uid() or is_org_member(organization_id));

-- Portfolios : accès réservé aux membres de l'organisation.
create policy portfolios_all on portfolios
  for all using (is_org_member(organization_id))
  with check (is_org_member(organization_id));

-- Portfolio access rows : visibles aux membres de l'org du portefeuille.
create policy portfolio_access_all on portfolio_access
  for all using (
    exists (select 1 from portfolios p
            where p.id = portfolio_id and is_org_member(p.organization_id))
  )
  with check (
    exists (select 1 from portfolios p
            where p.id = portfolio_id and is_org_member(p.organization_id))
  );

-- Assets : accès réservé aux membres de l'organisation.
create policy assets_all on assets
  for all using (is_org_member(organization_id))
  with check (is_org_member(organization_id));

-- Buildings : héritent de l'org via l'asset parent.
create policy buildings_all on buildings
  for all using (
    exists (select 1 from assets a
            where a.id = asset_id and is_org_member(a.organization_id))
  )
  with check (
    exists (select 1 from assets a
            where a.id = asset_id and is_org_member(a.organization_id))
  );

-- Units : héritent de l'org via l'asset parent.
create policy units_all on units
  for all using (
    exists (select 1 from assets a
            where a.id = asset_id and is_org_member(a.organization_id))
  )
  with check (
    exists (select 1 from assets a
            where a.id = asset_id and is_org_member(a.organization_id))
  );
