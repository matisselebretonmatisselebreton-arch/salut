-- ============================================================================
-- AssetFlow — Migration 0003 : Module 3 (Facturation & encaissement)
-- ----------------------------------------------------------------------------
-- Quittances / factures générées à partir des baux (loyer + charges + TVA),
-- avec leurs lignes et les encaissements rattachés.
--
-- Le STATUT DE RÈGLEMENT (payé / partiel / impayé / en retard) n'est PAS stocké :
-- il est dérivé au moment de la lecture via core/invoicing (paymentStatus), à
-- partir du TTC, des encaissements et de la date d'échéance.
-- ============================================================================

create type invoice_type as enum ('rent_receipt', 'invoice'); -- quittance / facture
create type invoice_status as enum ('draft', 'issued', 'cancelled');
create type payment_method as enum ('transfer', 'check', 'card', 'cash', 'other');

-- ----------------------------------------------------------------------------
-- INVOICE (facture / quittance)
-- ----------------------------------------------------------------------------
create table invoices (
  id               uuid primary key default gen_random_uuid(),
  organization_id  uuid not null references organizations(id) on delete cascade,
  lease_id         uuid not null references leases(id) on delete restrict,
  type             invoice_type not null default 'rent_receipt',
  status           invoice_status not null default 'issued',
  number           text,                       -- numéro de pièce (séquence métier)
  -- Période facturée (ex. mois de loyer).
  period_start     date not null,
  period_end       date not null,
  issue_date       date not null default current_date,
  due_date         date,
  currency         text not null default 'EUR',
  vat_rate         numeric(5, 4) not null default 0, -- ex. 0.2000 pour 20 %
  -- Totaux figés à l'émission (source de vérité du document émis).
  total_ht         numeric(14, 2) not null default 0,
  total_vat        numeric(14, 2) not null default 0,
  total_ttc        numeric(14, 2) not null default 0,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  created_by       uuid references auth.users(id),
  archived_at      timestamptz
);
create index invoices_lease_idx on invoices (lease_id) where archived_at is null;
create index invoices_org_idx on invoices (organization_id) where archived_at is null;

-- Lignes de facture (loyer, charges, TVA détaillée le cas échéant).
create table invoice_lines (
  id          uuid primary key default gen_random_uuid(),
  invoice_id  uuid not null references invoices(id) on delete cascade,
  label       text not null,
  amount      numeric(14, 2) not null,   -- montant HT de la ligne
  created_at  timestamptz not null default now()
);
create index invoice_lines_invoice_idx on invoice_lines (invoice_id);

-- ----------------------------------------------------------------------------
-- PAYMENT (encaissement)
-- ----------------------------------------------------------------------------
create table payments (
  id           uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  invoice_id   uuid not null references invoices(id) on delete restrict,
  amount       numeric(14, 2) not null,
  paid_on      date not null default current_date,
  method       payment_method not null default 'transfer',
  reference    text,                      -- référence de virement (rapprochement V2)
  created_at   timestamptz not null default now(),
  created_by   uuid references auth.users(id)
);
create index payments_invoice_idx on payments (invoice_id);

-- updated_at trigger
create trigger trg_invoices_updated_at before update on invoices
  for each row execute function set_updated_at();

-- ============================================================================
-- ROW-LEVEL SECURITY (appartenance à l'organisation)
-- ============================================================================
alter table invoices      enable row level security;
alter table invoice_lines enable row level security;
alter table payments      enable row level security;

create policy invoices_all on invoices
  for all using (is_org_member(organization_id))
  with check (is_org_member(organization_id));

create policy invoice_lines_all on invoice_lines
  for all using (
    exists (select 1 from invoices i where i.id = invoice_id and is_org_member(i.organization_id))
  )
  with check (
    exists (select 1 from invoices i where i.id = invoice_id and is_org_member(i.organization_id))
  );

create policy payments_all on payments
  for all using (is_org_member(organization_id))
  with check (is_org_member(organization_id));
