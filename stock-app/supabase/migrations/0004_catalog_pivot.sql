-- Pivot to a catalog + cart + resale model, no supplier entity.
-- The database holds no real data yet, so we redefine the domain tables
-- cleanly rather than chaining fragile ALTERs. Storage buckets and their
-- policies (from 0001) are left untouched.

drop table if exists item_images cascade;
drop table if exists items cascade;
drop table if exists order_lines cascade;
drop table if exists orders cascade;
drop table if exists product_images cascade;
drop table if exists products cascade;
drop table if exists suppliers cascade;

-- ---------------------------------------------------------------------------
-- products = catalogue (organisé côté UI par catégorie puis par marque)
-- ---------------------------------------------------------------------------
create table products (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  category text not null,
  brand text,
  description text,
  product_url text,
  reference_purchase_price numeric(10, 2),
  estimated_resale_price numeric(10, 2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index products_user_id_idx on products(user_id);
create index products_category_idx on products(category);
create index products_brand_idx on products(brand);

create trigger products_set_updated_at
  before update on products
  for each row execute function set_updated_at();

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
-- orders = panier / commande ; livraison France estimée puis réévaluée
-- ---------------------------------------------------------------------------
create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text,
  order_date date not null default current_date,
  status text not null default 'draft'
    check (status in ('draft', 'ordered', 'at_warehouse', 'in_transit', 'received')),
  shipping_france_estimated numeric(10, 2) not null default 0,
  shipping_france_actual numeric(10, 2),
  received_at date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index orders_user_id_idx on orders(user_id);
create index orders_status_idx on orders(status);

create trigger orders_set_updated_at
  before update on orders
  for each row execute function set_updated_at();

create table order_lines (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  unit_purchase_price numeric(10, 2) not null check (unit_purchase_price >= 0),
  comment text,
  created_at timestamptz not null default now()
);

create index order_lines_order_id_idx on order_lines(order_id);
create index order_lines_product_id_idx on order_lines(product_id);

-- ---------------------------------------------------------------------------
-- items = exemplaire reçu, noté, mis en vente puis vendu individuellement
-- ---------------------------------------------------------------------------
create table items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  order_line_id uuid not null references order_lines(id) on delete cascade,
  product_id uuid not null references products(id) on delete restrict,
  unit_number integer not null check (unit_number > 0),
  purchase_price numeric(10, 2) not null check (purchase_price >= 0),
  shipping_cost_in numeric(10, 2) not null default 0,
  rating smallint check (rating between 1 and 5),
  rating_comment text,
  stock_status text not null default 'received'
    check (stock_status in ('received', 'for_sale', 'sold')),
  asking_price numeric(10, 2),
  sold_price numeric(10, 2),
  vinted_fee numeric(10, 2) not null default 0,
  sale_channel text,
  listed_at date,
  sale_date date,
  margin numeric(10, 2) generated always as (
    sold_price - purchase_price - shipping_cost_in - vinted_fee
  ) stored,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (order_line_id, unit_number)
);

create index items_user_id_idx on items(user_id);
create index items_product_id_idx on items(product_id);
create index items_stock_status_idx on items(stock_status);

create trigger items_set_updated_at
  before update on items
  for each row execute function set_updated_at();

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
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table products enable row level security;
alter table product_images enable row level security;
alter table orders enable row level security;
alter table order_lines enable row level security;
alter table items enable row level security;
alter table item_images enable row level security;

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
