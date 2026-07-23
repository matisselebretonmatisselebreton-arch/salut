-- ============================================================================
-- AssetFlow — Migration 0004 : Module 4 (Budget de charges & exploitation)
-- ----------------------------------------------------------------------------
-- Budget prévisionnel par actif et par exercice, ses postes, et les dépenses
-- réelles (factures fournisseurs) qui alimentent le "Réalisé".
--
-- Le RÉALISÉ d'un poste = somme des dépenses approuvées/payées imputées.
-- L'écart Budget vs Réalisé et les alertes de dépassement sont calculés à la
-- lecture via core/budget (computeBudgetVsActual) — jamais stockés.
-- ============================================================================

create type budget_category as enum (
  'maintenance',      -- entretien
  'property_tax',     -- taxes foncières
  'insurance',        -- assurances
  'management_fees',  -- syndic / honoraires de gestion
  'security',         -- gardiennage
  'energy',           -- énergie
  'utilities',        -- fluides / charges diverses
  'other'
);

create type expense_nature as enum ('capex', 'opex');
create type expense_status as enum ('submitted', 'approved', 'paid', 'rejected');

-- ----------------------------------------------------------------------------
-- BUDGET (par actif, par exercice)
-- ----------------------------------------------------------------------------
create table budgets (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid not null references organizations(id) on delete cascade,
  asset_id         uuid not null references assets(id) on delete cascade,
  fiscal_year      integer not null,
  label            text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  created_by       uuid references auth.users(id),
  archived_at      timestamptz,
  unique (asset_id, fiscal_year)
);
create index budgets_asset_idx on budgets (asset_id) where archived_at is null;
create index budgets_org_idx on budgets (organization_id) where archived_at is null;

-- Postes budgétaires.
create table budget_lines (
  id                uuid primary key default gen_random_uuid(),
  budget_id         uuid not null references budgets(id) on delete cascade,
  category          budget_category not null,
  label             text not null,
  budgeted_amount   numeric(14, 2) not null default 0,
  -- Seuil d'alerte de dépassement en %, paramétrable par poste (§4.4).
  alert_threshold_pct numeric(5, 2) not null default 10,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create index budget_lines_budget_idx on budget_lines (budget_id);

-- ----------------------------------------------------------------------------
-- EXPENSE (dépense réelle / facture fournisseur)
-- Workflow : submitted → approved → paid (ou rejected).
-- ----------------------------------------------------------------------------
create table expenses (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid not null references organizations(id) on delete cascade,
  asset_id         uuid not null references assets(id) on delete restrict,
  budget_line_id   uuid references budget_lines(id) on delete set null,
  supplier         text,
  label            text not null,
  amount           numeric(14, 2) not null,
  nature           expense_nature not null default 'opex',
  status           expense_status not null default 'submitted',
  incurred_on      date not null default current_date,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  created_by       uuid references auth.users(id),
  archived_at      timestamptz
);
create index expenses_asset_idx on expenses (asset_id) where archived_at is null;
create index expenses_line_idx on expenses (budget_line_id);
create index expenses_org_idx on expenses (organization_id) where archived_at is null;

-- updated_at triggers
create trigger trg_budgets_updated_at before update on budgets
  for each row execute function set_updated_at();
create trigger trg_budget_lines_updated_at before update on budget_lines
  for each row execute function set_updated_at();
create trigger trg_expenses_updated_at before update on expenses
  for each row execute function set_updated_at();

-- ============================================================================
-- ROW-LEVEL SECURITY (appartenance à l'organisation)
-- ============================================================================
alter table budgets      enable row level security;
alter table budget_lines enable row level security;
alter table expenses     enable row level security;

create policy budgets_all on budgets
  for all using (is_org_member(organization_id))
  with check (is_org_member(organization_id));

create policy budget_lines_all on budget_lines
  for all using (
    exists (select 1 from budgets b where b.id = budget_id and is_org_member(b.organization_id))
  )
  with check (
    exists (select 1 from budgets b where b.id = budget_id and is_org_member(b.organization_id))
  );

create policy expenses_all on expenses
  for all using (is_org_member(organization_id))
  with check (is_org_member(organization_id));
