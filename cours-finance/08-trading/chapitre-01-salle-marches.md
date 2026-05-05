# Chapitre 1 — La salle des marchés : organisation et métiers

## Introduction

La **salle des marchés** (trading floor) est le lieu où sont achetés et vendus les instruments financiers pour compte propre ou pour compte de clients. C'est l'un des environnements les plus exigeants de la finance, où les décisions se prennent en quelques secondes et les pertes peuvent être colossales.

Depuis la dématérialisation des années 1990, la salle des marchés est aussi (et surtout) un environnement technologique : des centaines d'écrans, des flux de données en temps réel, et des systèmes d'exécution ultrarapides.

---

## 1. Organisation d'une salle des marchés

### 1.1 Structure type

```
Direction des Marchés
│
├── Front Office ──────────────── Contact direct avec le marché
│   ├── Trading (prop + flow)
│   ├── Sales
│   └── Structuration
│
├── Middle Office ─────────────── Contrôle et support
│   ├── Risk Management (MO)
│   ├── Validation des trades
│   └── Reporting P&L
│
└── Back Office ───────────────── Traitement opérationnel
    ├── Confirmation / Règlement-livraison
    ├── Comptabilité des opérations
    └── Réconciliation
```

### 1.2 Le Front Office

Le **front office** est en contact direct avec le marché. Il génère les revenus.

#### Les traders

| Type de trader | Description | Horizon |
|---------------|-------------|---------|
| **Flow trader** | Exécute les ordres des clients (market-making) | Secondes à heures |
| **Prop trader** | Prend des positions pour compte propre (P&L propre) | Jours à semaines |
| **Structured trader** | Gère le risque de produits structurés complexes | Mois à années |
| **Quant trader** | Exécute des stratégies quantitatives/algorithmiques | Microsecondes à jours |

#### Les sales

Les **sales** sont les intermédiaires entre les clients institutionnels et les traders. Ils :
- Comprennent les besoins du client.
- Proposent des produits adaptés.
- Négocient les conditions avec le trader.
- Ne prennent pas de risque de marché directement.

#### Les structureurs

Les **structureurs** conçoivent des produits financiers sur mesure (produits structurés, dérivés exotiques) en combinant des instruments standard. Ils nécessitent des compétences à la fois en finance quantitative et en relation client.

---

## 2. Le P&L (Profit & Loss) — mesure de performance

### 2.1 Définition

Le **P&L** (ou résultat) d'un trader est la variation de valeur de son portefeuille (book) sur une période :

```
P&L journalier = Valeur book (fin de journée) - Valeur book (début de journée)
               = Δ Mark-to-Market + Revenus (coupons, dividendes) - Financement
```

### 2.2 Mark-to-Market (MtM)

Toutes les positions sont valorisées **chaque soir au prix de marché** (marked-to-market), que les gains soient réalisés ou non. C'est ce qui distingue la finance de marché de la comptabilité traditionnelle.

```
MtM d'une position = Prix de marché × Quantité détenue
```

### 2.3 Décomposition du P&L

Les traders décomposent leur P&L selon les "sensibilités" (grecques) :

```
P&L = Delta P&L + Gamma P&L + Vega P&L + Theta P&L + Autres
```

Cette décomposition permet d'identifier quelle exposition a contribué au gain ou à la perte.

### 2.4 Explained vs. Unexplained P&L

Chaque soir, le **Middle Office** compare :
- Le **P&L expliqué** : calculé à partir des mouvements de marché et des sensibilités.
- Le **P&L réel** (MtM) : valorisation directe.

Un écart significatif ("unexplained P&L") déclenche une investigation immédiate : erreur de modèle, trade non enregistré, donnée de marché incorrecte.

---

## 3. Les instruments traités

### 3.1 Par desk (équipe)

| Desk | Instruments |
|------|-------------|
| **Rates** | Obligations d'État, swaps de taux (IRS), options de taux (swaptions, caps/floors) |
| **Credit** | Obligations corporate, CDS, CLO, indices crédit (iTraxx, CDX) |
| **Equity** | Actions, futures/options sur actions et indices, variance swaps |
| **FX** | Spots, forwards, options de change, NDFs (Non Deliverable Forwards) |
| **Commodities** | Futures pétrole, gaz, métaux, agricole |
| **Exotics / Structured** | Produits structurés, dérivés exotiques (barrières, lookbacks, etc.) |

### 3.2 Le carnet d'ordres interne

Chaque trader gère un **book** : l'ensemble de ses positions. Il doit en permanence connaître :
- Sa position nette (long / short) sur chaque actif.
- Ses sensibilités (delta, gamma, vega, rho...).
- Sa limite de risque allouée (VaR, stop-loss).

---

## 4. Systèmes et technologie

### 4.1 Le flux d'exécution

```
Décision d'investissement
         ↓
OMS (Order Management System) — saisie et routage de l'ordre
         ↓
EMS (Execution Management System) — choix du lieu d'exécution
         ↓
Marchés / Contreparties — exécution
         ↓
TMS (Trade Management System) — confirmation et réconciliation
         ↓
Back Office / Règlement-Livraison
```

### 4.2 Sources de données de marché

| Fournisseur | Usage |
|-------------|-------|
| **Bloomberg Terminal** | Données de marché, analyses, messaging |
| **Refinitiv (LSEG)** | Flux temps réel, données historiques |
| **Reuters** | Actualités financières |
| **FactSet** | Données fondamentales, consensus analystes |

### 4.3 Protocoles de trading

- **FIX Protocol** (Financial Information eXchange) : standard mondial pour la communication des ordres.
- **FIXML** : version XML du FIX.
- **API REST/WebSocket** : pour le trading algorithmique moderne.

---

## 5. Gestion du risque en salle des marchés

### 5.1 Les limites de risque

Chaque trader se voit allouer des **limites** qu'il ne peut pas dépasser :

| Type de limite | Description |
|---------------|-------------|
| **VaR limit** | Perte maximale probable par jour |
| **Stop-loss** | Perte maximale acceptée (journalière / mensuelle) |
| **Notional limit** | Montant nominal maximum par position |
| **Greeks limits** | Delta max, gamma max, vega max |
| **Concentration limit** | Exposition max par émetteur / secteur |

### 5.2 Le processus de contrôle

```
Pré-trade : vérification des limites avant l'exécution (straight-through processing)
Post-trade : surveillance en temps réel du P&L et des limites
Fin de journée : réconciliation, rapport de risk, explication P&L
```

### 5.3 Accidents célèbres et leçons

| Affaire | Perte | Cause |
|---------|-------|-------|
| **Nick Leeson (Barings, 1995)** | 1,3 Md$ | Positions non autorisées sur futures Nikkei, absence de contrôle |
| **Jérôme Kerviel (SocGen, 2008)** | 4,9 Mds€ | Positions directionnelles non couvertes masquées par de faux hedges |
| **London Whale (JPMorgan, 2012)** | 6 Mds$ | CDS mal valorisés, positions concentrées trop importantes |
| **Knight Capital (2012)** | 440 M$ en 45 min | Bug algorithmique sur l'EMS |

**Leçons communes** :
1. Le contrôle des risques doit être indépendant du front office.
2. L'unexplained P&L doit déclencher des alertes immédiates.
3. Les limites doivent être techniques (bloquantes) et pas seulement déclaratives.

---

## 6. Les métiers quantitatifs

### 6.1 Le Quant (Quantitative Analyst)

Les **quants** développent les modèles de pricing, de gestion des risques et les stratégies algorithmiques. On distingue :

| Type | Mission |
|------|---------|
| **Front office quant (desk quant)** | Modèles de pricing pour les traders |
| **Quant researcher** | Recherche de stratégies systématiques |
| **Risk quant** | Modèles de VaR, stress tests |
| **Quant developer** | Implémentation et optimisation des modèles |

**Compétences** : mathématiques (calcul stochastique, probabilités), statistiques, programmation (Python, C++, R), finance de marché.

### 6.2 Le rôle du Structureur

Le structureur :
1. Identifie le besoin du client (exposition, protection, rendement).
2. Conçoit le produit en combinant des instruments (call + obligation = capital garanti, par exemple).
3. Prix et documente le produit.
4. Travaille avec le trader sur la couverture (hedging) du produit.

---

## 7. La journée type d'un trader actions

```
07h00  Lecture des news overnight (Asie, USA), résultats d'entreprises, flux macro
07h30  Morning meeting : vision macro, positions en cours, ordres à passer
08h00  Ouverture pré-marché, calibrage des modèles de pricing
09h00  Ouverture Euronext Paris : flux d'ordres clients, positions propres
09h00–17h30  Trading continu, gestion des limites, échanges avec les sales et clients
16h30  Préparation de la clôture : réduction des positions si besoin (fin de journée)
17h30  Fermeture Euronext : MtM final, explanation du P&L, réconciliation
18h00  Préparation du lendemain, watch list, niveaux clés à surveiller
```

---

## 8. Exercices

### Exercice 1
Un trader a en portefeuille :
- 10 000 actions à 45 € (achat à 43 €)
- Short 500 futures CAC 40 à 7 200 (valeur actuelle 7 150)
- 1 option call sur 1 000 actions, delta = 0,4, prémium payé = 5 €

Calculez le P&L MtM de chaque position et le P&L total.

> **Correction** :
> P&L actions = 10 000 × (45 - 43) = **+20 000 €**
>
> P&L futures = 500 × (7 200 - 7 150) × 10 (multiplicateur CAC) = 500 × 50 × 10 = **+250 000 €** (short, le prix baisse → gain)
>
> P&L option : l'option a un delta de 0,4, son prix a évolué approximativement de delta × ΔS. Sans information sur ΔS, on note que la prime payée = 5 € × 1 000 = 5 000 € (coût initial, pas de P&L MtM sans prix actuel de l'option).
>
> **P&L total ≈ +270 000 €** (hors option, dont on n'a pas le prix actuel)

### Exercice 2
Quelles sont les 3 principales différences entre un flow trader et un prop trader ?

> **Correction** :
> 1. **Source du P&L** : le flow trader gagne sur le spread bid-ask (service aux clients) ; le prop trader gagne (ou perd) sur ses anticipations de marché.
> 2. **Relation client** : le flow trader sert des clients externes ; le prop trader n'en a pas.
> 3. **Profil de risque** : le flow trader cherche à rester delta-neutre (il couvre immédiatement) ; le prop trader assume délibérément un risque directionnel.

---

## Points clés à retenir

- La salle des marchés se divise en front (revenus), middle (contrôle) et back office (opérations).
- Le P&L est marqué au marché chaque soir : les gains et pertes sont comptabilisés même non réalisés.
- Les limites de risque (VaR, stop-loss, greeks) encadrent l'activité de chaque trader.
- Les accidents historiques (Kerviel, Leeson) montrent l'importance critique du contrôle indépendant.
- Les quants sont au cœur de la finance de marché moderne : pricing, risque, stratégies systématiques.
