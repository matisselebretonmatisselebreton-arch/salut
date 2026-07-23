-- ============================================================================
-- AssetFlow — Données de démonstration (Module 1)
-- ----------------------------------------------------------------------------
-- Miroir SQL du seed en mémoire (src/lib/data/demo-seed.ts).
-- À exécuter APRÈS la migration 0001, sur une base Supabase.
--
-- NOTE RLS : pour VOIR ces données via l'app, ton utilisateur doit être membre
-- de l'organisation de démo. Après t'être inscrit, exécute (avec ton user_id) :
--   insert into organization_members (organization_id, user_id, role)
--   values ('00000000-0000-0000-0000-0000000000a1', '<ton-auth-uid>', 'org_admin');
-- ============================================================================

insert into organizations (id, name, default_locale) values
  ('00000000-0000-0000-0000-0000000000a1', 'Foncière Démo', 'fr')
on conflict (id) do nothing;

insert into portfolios (id, organization_id, name, description) values
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-0000000000a1', 'Bureaux Île-de-France', 'Immeubles de bureaux à Paris et proche couronne.'),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-0000000000a1', 'Commerces & Résidentiel régions', 'Actifs commerciaux et résidentiels en régions.')
on conflict (id) do nothing;

insert into assets (id, organization_id, portfolio_id, name, asset_type, address_line1, postal_code, city, country, surface_useful, surface_gla, acquisition_date, acquisition_value, net_book_value, construction_year, epc_rating, certifications) values
  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-0000000000a1', '10000000-0000-0000-0000-000000000001', 'Le Hausmann', 'office', '12 boulevard Haussmann', '75009', 'Paris', 'FR', 3200, 3400, '2019-06-15', 24500000, 23800000, 1908, 'D', array['HQE']),
  ('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-0000000000a1', '10000000-0000-0000-0000-000000000001', 'Silex Défense', 'office', '3 esplanade du Général de Gaulle', '92800', 'Puteaux', 'FR', 8600, 9100, '2021-11-30', 61000000, 62500000, 2016, 'B', array['BREEAM','HQE']),
  ('20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-0000000000a1', '10000000-0000-0000-0000-000000000002', 'Retail Park Confluence', 'retail', '45 cours Charlemagne', '69002', 'Lyon', 'FR', 5400, 5400, '2020-03-10', 18200000, 17900000, 2009, 'C', array[]::text[]),
  ('20000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-0000000000a1', '10000000-0000-0000-0000-000000000002', 'Résidence Bellevue', 'residential', '8 rue des Tilleuls', '33000', 'Bordeaux', 'FR', 2100, null, '2018-09-01', 7600000, 7950000, 1995, 'E', array[]::text[])
on conflict (id) do nothing;

insert into units (id, asset_id, reference, floor, surface, is_rentable, is_occupied) values
  ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'RDC commerce', 'RDC', 420, true, true),
  ('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 'Plateau 1', '1er', 640, true, true),
  ('30000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000001', 'Plateau 2', '2e', 640, true, true),
  ('30000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000001', 'Plateau 3', '3e', 640, true, false),
  ('30000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000001', 'Plateau 4', '4e', 620, true, true),
  ('30000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000001', 'Parties communes', null, 240, false, false),
  ('30000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000002', 'Plateau A', '1-4', 4300, true, true),
  ('30000000-0000-0000-0000-000000000012', '20000000-0000-0000-0000-000000000002', 'Plateau B', '5-8', 4300, true, true),
  ('30000000-0000-0000-0000-000000000021', '20000000-0000-0000-0000-000000000003', 'Cellule 1', 'RDC', 1800, true, true),
  ('30000000-0000-0000-0000-000000000022', '20000000-0000-0000-0000-000000000003', 'Cellule 2', 'RDC', 1800, true, true),
  ('30000000-0000-0000-0000-000000000023', '20000000-0000-0000-0000-000000000003', 'Cellule 3', 'RDC', 1800, true, false),
  ('30000000-0000-0000-0000-000000000031', '20000000-0000-0000-0000-000000000004', 'Apt 1', 'RDC', 65, true, true),
  ('30000000-0000-0000-0000-000000000032', '20000000-0000-0000-0000-000000000004', 'Apt 2', '1er', 72, true, true),
  ('30000000-0000-0000-0000-000000000033', '20000000-0000-0000-0000-000000000004', 'Apt 3', '2e', 68, true, true),
  ('30000000-0000-0000-0000-000000000034', '20000000-0000-0000-0000-000000000004', 'Apt 4', '3e', 80, true, false)
on conflict (id) do nothing;
