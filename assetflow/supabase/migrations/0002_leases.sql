-- ============================================================================
-- AssetFlow — Migration 0002 : Module 2 (Baux & locataires)
-- ----------------------------------------------------------------------------
-- Ajoute Tenant, Lease, la liaison bail↔lots (multi-lots pour le commercial),
-- LeaseCharge (loyer / charges) et la configuration d'indexation.
--
-- OCCUPATION : units.is_occupied (migration 0001) devient DÉRIVÉE des baux
-- actifs et n'est plus la source de vérité. L'app calcule l'occupation au
-- moment de la lecture via core/lease (isLeaseActiveOn). La colonne est
-- conservée pour compatibilité mais ne doit plus être écrite manuellement.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- ENUMS
-- ----------------------------------------------------------------------------
create type tenant_kind as enum ('individual', 'company');

create type lease_type as enum (
  'residential_bare',       -- habitation nue
  'residential_furnished',  -- habitation meublée
  'commercial_369',         -- bail commercial 3/6/9
  'professional',           -- bail professionnel
  'derogatory',             -- bail dérogatoire (précaire)
  'civil'                   -- bail civil
);

create type lease_status as enum ('draft', 'active', 'terminated', 'expired');

-- Indice de révision. Historique des valeurs appliquées → table lease_index_applications.
create type index_type as enum ('irl', 'ilc', 'ilat', 'none');

create type charge_type as enum ('base_rent', 'charges_provision', 'other');
create type charge_periodicity as enum ('monthly', 'quarterly', 'yearly');

-- ----------------------------------------------------------------------------
-- TENANT (locataire — personne physique ou morale)
-- ----------------------------------------------------------------------------
create table tenants (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  kind            tenant_kind not null default 'individual',
  -- Nom d'affichage (calculé à la saisie : "Nom Prénom" ou raison sociale).
  display_name    text not null,
  first_name      text,
  last_name       text,
  company_name    text,
  siret           text,
  email           text,
  phone           text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  created_by      uuid references auth.users(id),
  archived_at     timestamptz
);
create index tenants_org_idx on tenants (organization_id) where archived_at is null;

-- ----------------------------------------------------------------------------
-- LEASE (bail)
-- Un bail appartient à un actif ; il couvre 1..n lots via lease_units.
-- ----------------------------------------------------------------------------
create table leases (
  id                   uuid primary key default gen_random_uuid(),
  organization_id      uuid not null references organizations(id) on delete cascade,
  asset_id             uuid not null references assets(id) on delete restrict,
  tenant_id            uuid not null references tenants(id) on delete restrict,
  reference            text,
  lease_type           lease_type not null,
  status               lease_status not null default 'draft',

  start_date           date,
  end_date             date,
  notice_period_months integer,          -- durée de préavis
  deposit_amount       numeric(14, 2),   -- dépôt de garantie
  currency             text not null default 'EUR',
  vat_applicable       boolean not null default false,

  -- Indexation (paramétrable, avec historique dans lease_index_applications).
  index_type           index_type not null default 'none',
  base_index_value     numeric(10, 2),   -- valeur de l'indice de référence
  base_index_period    text,             -- ex. "T1 2024"
  revision_month       integer,          -- mois de révision (1..12)

  signed_at            timestamptz,
  notes                text,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),
  created_by           uuid references auth.users(id),
  archived_at          timestamptz
);
create index leases_asset_idx on leases (asset_id) where archived_at is null;
create index leases_tenant_idx on leases (tenant_id) where archived_at is null;
create index leases_org_idx on leases (organization_id) where archived_at is null;

-- Liaison bail ↔ lots (many-to-many ; un bail commercial peut couvrir plusieurs lots).
create table lease_units (
  id        uuid primary key default gen_random_uuid(),
  lease_id  uuid not null references leases(id) on delete cascade,
  unit_id   uuid not null references units(id) on delete restrict,
  unique (lease_id, unit_id)
);
create index lease_units_unit_idx on lease_units (unit_id);

-- Lignes financières du bail (loyer de base, provisions de charges, autres).
create table lease_charges (
  id          uuid primary key default gen_random_uuid(),
  lease_id    uuid not null references leases(id) on delete cascade,
  charge_type charge_type not null,
  label       text,
  amount      numeric(14, 2) not null,
  periodicity charge_periodicity not null default 'monthly',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index lease_charges_lease_idx on lease_charges (lease_id);

-- Historique des indices appliqués (traçabilité des révisions de loyer §4.2).
create table lease_index_applications (
  id             uuid primary key default gen_random_uuid(),
  lease_id       uuid not null references leases(id) on delete cascade,
  applied_on     date not null,
  index_type     index_type not null,
  old_index      numeric(10, 2),
  new_index      numeric(10, 2),
  old_rent       numeric(14, 2),
  new_rent       numeric(14, 2),
  created_at     timestamptz not null default now(),
  created_by     uuid references auth.users(id)
);
create index lease_index_app_lease_idx on lease_index_applications (lease_id);

-- updated_at triggers
create trigger trg_tenants_updated_at before update on tenants
  for each row execute function set_updated_at();
create trigger trg_leases_updated_at before update on leases
  for each row execute function set_updated_at();
create trigger trg_lease_charges_updated_at before update on lease_charges
  for each row execute function set_updated_at();

-- ============================================================================
-- ROW-LEVEL SECURITY (même stratégie qu'en 0001 : appartenance à l'org)
-- ============================================================================
alter table tenants                  enable row level security;
alter table leases                   enable row level security;
alter table lease_units              enable row level security;
alter table lease_charges            enable row level security;
alter table lease_index_applications enable row level security;

create policy tenants_all on tenants
  for all using (is_org_member(organization_id))
  with check (is_org_member(organization_id));

create policy leases_all on leases
  for all using (is_org_member(organization_id))
  with check (is_org_member(organization_id));

-- Les tables filles héritent de l'org via le bail parent.
create policy lease_units_all on lease_units
  for all using (
    exists (select 1 from leases l where l.id = lease_id and is_org_member(l.organization_id))
  )
  with check (
    exists (select 1 from leases l where l.id = lease_id and is_org_member(l.organization_id))
  );

create policy lease_charges_all on lease_charges
  for all using (
    exists (select 1 from leases l where l.id = lease_id and is_org_member(l.organization_id))
  )
  with check (
    exists (select 1 from leases l where l.id = lease_id and is_org_member(l.organization_id))
  );

create policy lease_index_app_all on lease_index_applications
  for all using (
    exists (select 1 from leases l where l.id = lease_id and is_org_member(l.organization_id))
  )
  with check (
    exists (select 1 from leases l where l.id = lease_id and is_org_member(l.organization_id))
  );
