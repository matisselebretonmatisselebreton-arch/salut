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

- `profiles` — infos entreprise du freelance (créée automatiquement à l'inscription via un trigger)
- `clients` — carnet de clients
- `invoices` — factures (lignes stockées en JSONB)
- `quotes` — devis, convertibles en facture (lignes en JSONB)

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
- [ ] Factures récurrentes
- [ ] Relances automatiques par email
- [ ] Abonnement Pro via Stripe
