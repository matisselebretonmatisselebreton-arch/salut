# InvoicePilot

Facturation simple et conforme pour freelances et auto-entrepreneurs français.

## Architecture

- **Frontend** : HTML / CSS / JavaScript vanilla (aucun build requis)
- **Backend** : [Supabase](https://supabase.com) (authentification + base de données PostgreSQL)
- **Export PDF** : génération côté client via la fenêtre d'impression du navigateur (« Enregistrer en PDF »)

```
invoicepilot/
├── index.html        # Landing page (marketing)
├── app.html          # Application (auth + dashboard + facturation)
├── css/
│   ├── landing.css
│   └── app.css
└── js/
    ├── config.js     # URL + clé publique Supabase
    └── app.js        # Logique applicative (auth + CRUD via Supabase)
```

## Base de données

Trois tables, toutes protégées par Row Level Security (chaque utilisateur n'accède qu'à ses propres données) :

- `profiles` — infos entreprise du freelance (créée automatiquement à l'inscription via un trigger) ; contient le champ `plan` (`free` / `standard` / `pro`)
- `clients` — carnet de clients
- `invoices` — factures (lignes stockées en JSONB)
- `quotes` — devis, convertibles en facture (lignes en JSONB)
- `recurring_invoices` — modèles de factures récurrentes (mensuel/trimestriel/annuel)
- `credit_notes` — avoirs émis en annulation d'une facture
- `expenses` — factures reçues / dépenses (justificatifs dans le bucket Storage `receipts`), reliées à `suppliers`
- `suppliers` — carnet de fournisseurs (plan Pro), avec historique des achats
- `urssaf_declarations` — historique des déclarations fiscales/sociales marquées comme faites (tous statuts)

Les factures portent un numéro de bon de commande (`po_number`), un suivi des relances
(`reminder_count`, `last_reminder_at`) et une date d'encaissement (`paid_at`, pour le calcul du DSO).
Le profil porte le statut juridique (`legal_status`), le type d'activité (`activity_type`),
la périodicité URSSAF (`urssaf_period`), l'option fiscale micro (`tax_option` : barème / versement
libératoire) et la rémunération annuelle du dirigeant (`annual_remuneration`, pour les SAS/SASU).

### Formules

- **Gratuit** : 10 factures/mois, 10 devis/mois, récurrences, clients, export PDF.
- **Standard (14,99 €/mois)** : factures & devis illimités + tout le plan Gratuit, sans la comptabilité.
- **Pro (29,99 €/mois)** : tout le plan Standard + fournisseurs & dépenses, comptabilité
  (compte de résultat, bilan, **trésorerie / BFR / DSO**), suivi de TVA et **accompagnement fiscal
  & social** (calcul des cotisations et estimation de l'imposition selon le statut).

### Accompagnement fiscal & social (Pro)

Le module Comptabilité estime, selon le statut juridique du profil :

- **Micro-entrepreneur** : cotisations sur le CA encaissé par période, impôt au versement
  libératoire ou au barème (après abattement), récapitulatif annuel.
- **EI / EURL à l'IR** : bénéfice, cotisations sociales TNS (≈ 45 %), impôt sur le revenu au barème.
- **SAS / SASU / SARL à l'IS** : charges sociales du dirigeant assimilé salarié, impôt sur les
  sociétés (15 % / 25 %).

Les onglets temporels (Comptabilité, Performance) disposent d'un sélecteur de plage précis
(année, trimestre, mois, période personnalisée, raccourcis) et de cartes cliquables ouvrant le
détail ligne à ligne. Ces estimations sont indicatives et ne remplacent pas un expert-comptable.

Le paiement Stripe reste à brancher — l'activation est pour l'instant immédiate côté application.

## Configuration

La clé publique Supabase dans `js/config.js` est conçue pour être exposée côté
client : l'accès aux données est verrouillé par les politiques RLS, pas par le
secret de la clé. Ne jamais y mettre la `service_role` key.

## Authentification

Inscription / connexion par email + mot de passe via Supabase Auth. Selon la
configuration du projet Supabase, une confirmation par email peut être requise
avant la première connexion.

## Lancer en local

Servir le dossier avec n'importe quel serveur statique, par exemple :

```bash
cd invoicepilot
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Roadmap

- [x] Auth, clients, factures, dashboard, profil
- [x] Export PDF conforme (mentions légales)
- [x] Persistance Supabase + RLS
- [x] Devis → Facture (création, acceptation/refus, conversion, PDF)
- [x] Factures récurrentes (génération de rattrapage à l'ouverture de l'app)
- [ ] Relances automatiques par email
- [ ] Abonnement Pro via Stripe

### Note sur les factures récurrentes

Sans cron côté serveur, les factures dues sont générées « en rattrapage » à
l'ouverture de l'application : chaque modèle actif dont la date d'émission est
passée produit les factures manquantes, en respectant une numérotation
continue par année. Pour une génération garantie sans ouverture de l'app, il
faudra plus tard une Edge Function Supabase planifiée (pg_cron).
