-- Initial schema for the China purchase/resale tracking app.
-- Mono-user today, but every root table carries user_id so a second
-- user can be onboarded later purely via RLS, no restructuring.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- updated_at trigger helper
-- ---------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ---------------------------------------------------------------------------
-- suppliers
-- ---------------------------------------------------------------------------
create table suppliers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  platform text,
  contact_wechat text,
  contact_phone text,
  contact_link text,
  reliability_score smallint check (reliability_score between 1 and 5),
  status text not null default 'to_test' check (status in ('to_test', 'validated', 'to_avoid')),
  notes text,
  first_order_date date,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index suppliers_user_id_idx on suppliers(user_id);
create index suppliers_status_idx on suppliers(status);

create trigger suppliers_set_updated_at
  before update on suppliers
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- products
-- ---------------------------------------------------------------------------
create table products (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  supplier_id uuid not null references suppliers(id) on delete restrict,
  name text not null,
  category text,
  description text,
  validation_status text not null default 'pending_test'
    check (validation_status in ('pending_test', 'validated', 'rejected')),
  quality_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index products_user_id_idx on products(user_id);
create index products_supplier_id_idx on products(supplier_id);
create index products_category_idx on products(category);
create index products_validation_status_idx on products(validation_status);

create trigger products_set_updated_at
  before update on products
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- product_images
-- ---------------------------------------------------------------------------
create table product_images (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  storage_path text not null,
  position smallint not null default 0,
  created_at timestamptz not null default now()
);

create index product_images_product_id_idx on product_images(product_id);

-- ---------------------------------------------------------------------------
-- orders
-- ---------------------------------------------------------------------------
create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  supplier_id uuid not null references suppliers(id) on delete restrict,
  order_date date not null default current_date,
  status text not null default 'ordered'
    check (status in ('ordered', 'in_transit', 'received', 'inspected')),
  shipping_cost numeric(10, 2) not null default 0,
  received_at date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index orders_user_id_idx on orders(user_id);
create index orders_supplier_id_idx on orders(supplier_id);
create index orders_status_idx on orders(status);
create index orders_order_date_idx on orders(order_date);

create trigger orders_set_updated_at
  before update on orders
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- order_lines
-- ---------------------------------------------------------------------------
create table order_lines (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  unit_purchase_price numeric(10, 2) not null check (unit_purchase_price >= 0),
  shipping_cost_allocated numeric(10, 2) not null default 0,
  created_at timestamptz not null default now()
);

create index order_lines_order_id_idx on order_lines(order_id);
create index order_lines_product_id_idx on order_lines(product_id);

-- ---------------------------------------------------------------------------
-- items: one row per physical unit, tracked and resold individually
-- ---------------------------------------------------------------------------
create table items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  order_line_id uuid not null references order_lines(id) on delete cascade,
  product_id uuid not null references products(id) on delete restrict,
  unit_number integer not null check (unit_number > 0),
  purchase_price numeric(10, 2) not null check (purchase_price >= 0),
  shipping_cost_in numeric(10, 2) not null default 0,
  qc_status text not null default 'pending'
    check (qc_status in ('pending', 'conforming', 'minor_defect', 'rejected', 'to_return')),
  qc_notes text,
  stock_status text not null default 'in_stock'
    check (stock_status in ('in_stock', 'reserved', 'sold', 'returned')),
  resale_price numeric(10, 2),
  shipping_cost_out numeric(10, 2) not null default 0,
  sale_channel text,
  sale_date date,
  margin numeric(10, 2) generated always as (
    resale_price - purchase_price - shipping_cost_in - shipping_cost_out
  ) stored,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (order_line_id, unit_number)
);

create index items_user_id_idx on items(user_id);
create index items_order_line_id_idx on items(order_line_id);
create index items_product_id_idx on items(product_id);
create index items_stock_status_idx on items(stock_status);
create index items_qc_status_idx on items(qc_status);
create index items_sale_date_idx on items(sale_date);

create trigger items_set_updated_at
  before update on items
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- item_images: QC / condition photos per physical unit
-- ---------------------------------------------------------------------------
create table item_images (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id uuid not null references items(id) on delete cascade,
  storage_path text not null,
  position smallint not null default 0,
  created_at timestamptz not null default now()
);

create index item_images_item_id_idx on item_images(item_id);

-- ---------------------------------------------------------------------------
-- Row Level Security: every table scoped to auth.uid() = user_id
-- ---------------------------------------------------------------------------
alter table suppliers enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table orders enable row level security;
alter table order_lines enable row level security;
alter table items enable row level security;
alter table item_images enable row level security;

create policy "suppliers_owner" on suppliers
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "products_owner" on products
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "product_images_owner" on product_images
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "orders_owner" on orders
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "order_lines_owner" on order_lines
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "items_owner" on items
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "item_images_owner" on item_images
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Storage buckets: private, access via signed URLs generated server-side
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('product-photos', 'product-photos', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('qc-photos', 'qc-photos', false)
on conflict (id) do nothing;

-- Objects are stored under a "<user_id>/..." prefix so RLS can scope access
-- per user without a lookup table.
create policy "product_photos_owner" on storage.objects
  for all using (
    bucket_id = 'product-photos' and auth.uid()::text = (storage.foldername(name))[1]
  ) with check (
    bucket_id = 'product-photos' and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "qc_photos_owner" on storage.objects
  for all using (
    bucket_id = 'qc-photos' and auth.uid()::text = (storage.foldername(name))[1]
  ) with check (
    bucket_id = 'qc-photos' and auth.uid()::text = (storage.foldername(name))[1]
  );
