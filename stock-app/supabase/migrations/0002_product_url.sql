-- Products can carry a source/supplier link (e.g. the 1688/Taobao/agent URL).
-- Kept on the product itself so a fiche produit is self-contained: name,
-- category, photos and link.
alter table products add column if not exists product_url text;
