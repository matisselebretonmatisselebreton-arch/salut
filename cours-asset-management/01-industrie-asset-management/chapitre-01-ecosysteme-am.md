# Chapitre 1 — L'écosystème de l'Asset Management

## Introduction

L'**asset management** (gestion d'actifs) désigne l'activité consistant à gérer des portefeuilles d'instruments financiers pour le compte de clients (particuliers, institutionnels, entreprises). Les sociétés de gestion agissent en tant que **mandataires** : elles prennent des décisions d'investissement au nom de leurs clients, en échange de frais de gestion.

L'industrie mondiale représente environ **115 000 milliards de dollars d'actifs sous gestion (AUM — Assets Under Management)** en 2024, soit plus d'une fois le PIB mondial.

---

## 1. Les acteurs de l'écosystème

### 1.1 Les sociétés de gestion (asset managers)

L'**asset manager** (ou gestionnaire d'actifs) est l'acteur central : il crée des fonds, les gère et perçoit des frais.

**Grandes catégories** :

| Type | Exemples | AUM estimé |
|------|---------|-----------|
| Gérants universels (universal AM) | BlackRock, Vanguard, Fidelity | >10 000 Md$ chacun |
| Gérants spécialisés actions | Comgest, Oddo BHF AM | <500 Md$ |
| Gérants obligataires spécialisés | PIMCO, Muzinich | 500–2 000 Md$ |
| Gérants alternatifs (hedge funds) | Bridgewater, Man Group | 50–200 Md$ |
| Gérants de PE / infrastructure | Blackstone, KKR | 500–1 000 Md$ |
| Gérants ESG / Impact | Mirova, Robeco | 50–200 Md$ |

**Modèle économique** : les revenus proviennent principalement des **management fees** (0,05 % à 2 %/an des AUM selon la classe d'actif) et des **performance fees** (carried interest de 20 % au-delà d'un hurdle rate pour les alternatifs).

### 1.2 Les investisseurs institutionnels (clients)

| Investisseur | Caractéristiques | Horizon |
|-------------|-----------------|---------|
| **Fonds de pension** (pension funds) | Passif à long terme (retraites), contraintes ALM, horizon >20 ans | Long terme |
| **Compagnies d'assurance** | Investissent les primes, contraintes Solvabilité II, matching actif/passif | Long terme |
| **Fonds souverains** (sovereign wealth funds) | Gestion des réserves nationales (Norvège : 1 700 Md$), peu de contraintes de liquidité | Long terme |
| **Fondations / Endowments** | Modèle Yale (Swensen), allocation diversifiée dont alternatives | Perpétuel |
| **Family offices** | Gestion de fortune des grandes familles, très personnalisé | Variable |
| **Trésoreries d'entreprise** | Gestion de la trésorerie excédentaire, risque faible | Court terme |

### 1.3 La chaîne de valeur (value chain)

```
Investisseurs finaux (épargnants, retraités)
        ↓
Distributeurs (banques, CGP, plateformes)
        ↓
Société de gestion (asset manager)
  ├── Front Office : gérants, analystes → décisions d'investissement
  ├── Middle Office : risk management, compliance, performance
  └── Back Office : valorisation (NAV), comptabilité fonds, reporting
        ↓
Dépositaire (custodian) : conservation des actifs, contrôle
        ↓
Marchés financiers / Sous-jacents
```

### 1.4 Les prestataires de services

- **Dépositaires** (BNP Paribas SS, State Street, Caceis) : conservation physique des actifs, calcul de la VL, contrôle du respect des contraintes d'investissement.
- **Prime brokers** : financement, prêt-emprunt de titres, exécution pour les hedge funds (Goldman Sachs, Morgan Stanley, JPMorgan).
- **Administrateurs de fonds** : calcul de la VL externalisé, transfer agency.
- **Agences de notation** (S&P, Moody's, Fitch) : notation crédit des émetteurs.
- **Fournisseurs d'indices** (MSCI, FTSE Russell, Bloomberg Barclays, S&P Dow Jones) : benchmarks de référence.
- **Data providers** (Bloomberg, Refinitiv/LSEG, FactSet) : données de marché, financières, ESG.

---

## 2. Le modèle économique d'une société de gestion

### 2.1 Structure des revenus

```
Revenus = AUM × Taux de frais moyen

Pour un fonds actions actif gérant 1 Md€ à 1,5 %/an de frais de gestion :
Revenus annuels = 1 000 M€ × 1,5 % = 15 M€/an
```

**Sensibilité aux marchés** : si les marchés baissent de 20 %, l'AUM baisse → revenus en baisse automatique, même sans rachat.

### 2.2 Compression des marges

La tendance lourde depuis 15 ans est la **fee compression** (compression des frais) :

| Type de gestion | Frais 2010 | Frais 2024 | Tendance |
|----------------|-----------|-----------|---------|
| Fonds actions actifs | 1,5–2,0 % | 0,8–1,5 % | ↓↓ |
| Fonds obligataires actifs | 0,7–1,0 % | 0,3–0,7 % | ↓↓ |
| ETF actions (passif) | 0,3–0,5 % | 0,03–0,20 % | ↓↓↓ |
| Fonds alternatifs (HF) | 2+20 % | 1+15 % | ↓ |
| Private equity | 2+20 % | 1,5+20 % | → |

**Cause principale** : la démocratisation de la gestion passive (ETF, fonds indiciels) proposée à très bas coût (Vanguard, BlackRock iShares).

### 2.3 Consolidation de l'industrie

La pression sur les marges pousse à la consolidation :
- **Amundi** (Société Générale AM + Crédit Agricole AM, puis acquisition Lyxor/Pioneer) → ~2 000 Md€ d'AUM.
- **BNP Paribas AM** a absorbé plusieurs boutiques.
- **Natixis IM** regroupe affiliés : Ostrum, Mirova, DNCA, H2O, etc.

**Modèle multi-affilié** (hub & spoke) : une holding (Natixis, Generali, Macquarie) fédère des boutiques de gestion autonomes, mutualisisant les fonctions support (distribution, compliance, IT) tout en préservant l'autonomie de gestion.

---

## 3. Les métiers de l'asset management

### 3.1 Front Office

| Métier | Rôle | Compétences clés |
|--------|------|-----------------|
| **Gérant de portefeuille** | Décisions d'achat/vente, construction du portefeuille, animation comité d'investissement | Finance quantitative, macroéconomie, conviction |
| **Analyste financier buy-side** | Analyse fondamentale d'entreprises ou d'émetteurs, recommandations pour le gérant | Comptabilité, modélisation, connaissance sectorielle |
| **Stratégiste / économiste** | Vues macro globales, allocation top-down entre classes d'actifs | Macroéconomie, géopolitique, analyse de données |
| **Gérant quantitatif** | Stratégies systématiques basées sur modèles statistiques | Python/R, statistiques, machine learning |
| **Trader buy-side** | Exécution des ordres du gérant au meilleur prix | Microstructure de marché, algo trading |

### 3.2 Middle & Back Office

| Métier | Rôle |
|--------|------|
| **Risk manager** | Mesure et contrôle des risques de marché, crédit, liquidité, contrepartie |
| **Contrôleur de gestion / Compliance** | Vérification du respect des contraintes d'investissement (UCITS, mandats) |
| **Analyste performance** | Calcul des performances, attribution, reporting GIPS |
| **Valorisateur (NAV officer)** | Calcul de la valeur liquidative quotidienne |

### 3.3 Distribution & Relations Clients

| Métier | Cible clients |
|--------|--------------|
| **Sales institutionnel** | Fonds de pension, assureurs, fonds souverains |
| **Sales retail / wholesale** | Banques privées, CGP, plateformes |
| **Relationship Manager** | Gestion de la relation client existante |
| **Consultant en investissement** (chez les institutionnels) | Sélection, due diligence et suivi de gérants externes |

---

## 4. Les tendances structurelles de l'industrie

### 4.1 Essor de la gestion passive

**Actifs en ETF mondiaux** (2024) : ~12 000 Md$ (vs. 1 000 Md$ en 2010). La part de marché des ETF en actions US dépasse 50 % des flux entrants.

**Conséquence** : les gérants actifs sont sous pression de démontrer leur alpha (valeur ajoutée). La **fraction d'actifs sous gestion active** diminue structurellement dans les pays développés.

### 4.2 Démocratisation des actifs privés (Private Markets)

Les institutionnels allouent de plus en plus vers le **private equity, infrastructure, dette privée et immobilier** pour capter une **prime d'illiquidité**. Le modèle Yale (Swensen) prônait 40–50 % en alternatifs pour les grands fonds de dotation.

### 4.3 Intégration ESG

La **finance durable** (ESG — Environmental, Social, Governance) est devenue incontournable : le règlement SFDR (Sustainable Finance Disclosure Regulation) impose une classification (Article 6, 8, 9) à tous les fonds distribués en Europe.

### 4.4 Technologie et intelligence artificielle

- **Robo-advisors** (Betterment, Vanguard Digital Advisor) : automatisation du conseil et de la gestion pour les particuliers.
- **Machine learning** : amélioration de la sélection de titres, prévision macroéconomique, détection d'anomalies.
- **NLP sur les earnings calls / rapports** : extraction d'informations de données non structurées.

---

## 5. Approfondissement théorique

### La théorie de l'agence appliquée à l'asset management

La relation **gérant–investisseur** est un problème classique d'**agence** (Jensen & Meckling, 1976) : l'investisseur (principal) délègue la gestion à un gérant (agent) dont les intérêts peuvent diverger.

**Problèmes d'agence en asset management** :
1. **Herding** (comportement moutonnier) : un gérant soucieux de sa réputation sous-performe s'il dévie trop du consensus → il suit les autres gérants même si c'est sous-optimal.
2. **Window dressing** : achat de titres performants avant publication des reportings trimestriels pour améliorer l'apparence du portefeuille.
3. **Gestion au benchmark** : le gérant ne prend pas de risque actif pour éviter la sous-performance (closet indexing).
4. **Horizon court-termiste** : pression des clients à court terme vs. horizon d'investissement long terme optimal.

**Solutions** :
- Alignement via la co-investissement (le gérant investit dans son propre fonds).
- Performance fees avec clawback (remboursement si performance ultérieure mauvaise).
- Reporting et transparence accrus (MIF II, UCITS V).
- Notation indépendante des gérants (Morningstar, eVestment).

---

## Exemples numériques

### Exemple 1 — Calcul de revenus d'une société de gestion

Une société de gestion gère :
- 2 Md€ en fonds actions actifs (frais 1,2 %/an)
- 3 Md€ en fonds obligataires (frais 0,5 %/an)
- 500 M€ en fonds alternatifs (frais 1,5 % + 20 % de perf sur gains au-delà de 5 %)
- Performance fonds alternatifs cette année : +12 %

```
Revenus actions = 2 000 M€ × 1,2 % = 24 M€
Revenus obligataires = 3 000 M€ × 0,5 % = 15 M€

Performance fee alternatifs :
  Gain total = 500 M€ × 12 % = 60 M€
  Hurdle (5 %) = 500 M€ × 5 % = 25 M€
  Surperformance = 60 M€ - 25 M€ = 35 M€
  Performance fee = 20 % × 35 M€ = 7 M€
  Management fee = 500 M€ × 1,5 % = 7,5 M€
  Revenus alternatifs = 7 M€ + 7,5 M€ = 14,5 M€

Revenus totaux = 24 + 15 + 14,5 = 53,5 M€/an
```

### Exemple 2 — Impact de la baisse des marchés sur l'AUM

Un gestionnaire avec 10 Md€ d'AUM (dont 70 % actions, 30 % obligations). Les marchés actions baissent de 25 %, les obligations progressent de 5 %.

```
AUM initial :
  Actions : 7 000 M€
  Obligations : 3 000 M€

Variation :
  Actions : 7 000 × (1 - 25 %) = 5 250 M€
  Obligations : 3 000 × (1 + 5 %) = 3 150 M€

AUM final = 5 250 + 3 150 = 8 400 M€ (−16 %)

Impact revenus (taux moyen 0,8 %) :
  Avant : 10 000 × 0,8 % = 80 M€
  Après : 8 400 × 0,8 % = 67,2 M€ (−16 % sans aucun rachat)
```

### Exemple 3 — Calcul de VL (Valeur Liquidative)

Un fonds UCITS détient :
- 1 000 actions Apple à 175 $/action
- 500 000 USD en cash
- 100 obligations à 102 % du nominal (nominal 10 000 €)
- Dépenses courus (frais de gestion) : 15 000 €
- Taux EUR/USD : 1,08

```
Valorisation :
  Actions Apple : 1 000 × 175 / 1,08 = 162 037 €
  Cash USD : 500 000 / 1,08 = 462 963 €
  Obligations : 100 × 10 000 × 102 % = 1 020 000 €

Total actifs bruts = 162 037 + 462 963 + 1 020 000 = 1 645 000 €
Passif (frais courus) = 15 000 €
Actif net = 1 645 000 - 15 000 = 1 630 000 €

Si le fonds a 16 300 parts en circulation :
VL par part = 1 630 000 / 16 300 = 100,00 €
```

---

## Applications professionnelles

### Due diligence d'un gérant (sélection de fonds)

Un consultant en investissement (investment consultant) évalue un gérant selon :

**Critères quantitatifs** :
- Performance ajustée du risque sur 3, 5 ans (Sharpe, alpha, Information Ratio)
- Cohérence du style (analyse de style de Sharpe)
- Drawdown maximal, pire mois, ratio Calmar

**Critères qualitatifs (4P)** :
- **People** : stabilité et expérience de l'équipe de gestion
- **Process** : reproductibilité du processus d'investissement
- **Portfolio** : cohérence du portefeuille avec le processus déclaré
- **Performance** : attribution des performances (alpha vs. beta, market timing vs. stock picking)

**Red flags** :
- Turnover élevé de l'équipe de gestion
- AUM qui grossit trop vite (capacity constraint)
- Performance fees sans hurdle ni high-water mark
- Stratégie changée post-sous-performance (style drift)

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Confondre AUM et revenus** | Un gérant avec 100 Md€ d'AUM peut avoir de faibles revenus si les frais sont de 0,05 % (passif) | Toujours regarder le taux de frais moyen |
| **Ignorer le dépositaire** | Le rôle de contrôle du dépositaire est essentiel (affaire Madoff : pas de dépositaire indépendant) | UCITS impose un dépositaire indépendant |
| **Confondre société de gestion et SICAV** | La SGP est la société qui gère ; la SICAV/FCP est le véhicule fonds | Ce sont deux entités juridiques distinctes |
| **Négliger la distribution** | Un excellent fonds non distribué ne collecte pas | 60–70 % du succès d'un fonds tient à sa distribution |

---

## Exercices

### Exercice 1
Une société de gestion gère 5 Md€. Elle applique 1 % de frais de gestion sur 60 % des actifs (gestion active) et 0,15 % sur 40 % (gestion passive). Ses charges fixes sont de 20 M€/an. Quel est le bénéfice opérationnel approximatif ?

> **Correction** :
> Revenus gestion active = 5 000 × 60 % × 1 % = 30 M€
> Revenus gestion passive = 5 000 × 40 % × 0,15 % = 3 M€
> Revenus totaux = 33 M€
> Bénéfice opérationnel = 33 M€ - 20 M€ = **13 M€** (marge ~39 %)

### Exercice 2
Expliquez pourquoi la gestion passive a mis sous pression les gérants actifs, et comment les gérants actifs peuvent justifier leurs frais plus élevés.

> **Correction** :
> La gestion passive (ETF) réplique un indice à très faible coût (0,05–0,20 %/an). Après frais, ~70 % des gérants actifs sous-performent leur indice sur 10 ans (SPIVA report). La pression sur les frais est donc forte.
>
> Un gérant actif justifie des frais élevés si :
> - Il génère un **alpha positif et persistant** (surperformance ajustée risque)
> - Il offre une **diversification** que les indices n'offrent pas (actifs non cotés, stratégies décorrélées)
> - Il gère un **risque spécifique** que l'investisseur ne peut pas gérer seul (small caps exotiques, crédit complexe)
> - Il apporte un **service personnalisé** (mandat dédié, contraintes ESG spécifiques)

### Exercice 3
Décrivez les étapes d'un processus de due diligence opérationnel (ODD — Operational Due Diligence) d'un gérant pour un investisseur institutionnel.

> **Correction** :
> L'ODD vise à identifier les risques opérationnels (fraude, erreurs, défaillance des systèmes) au-delà des risques d'investissement.
>
> Étapes clés :
> 1. **Revue juridique** : prospectus, statuts, contrats de délégation (dépositaire, administrateur), accords de prime brokerage
> 2. **Vérification de la ségrégation des actifs** : les actifs des clients sont-ils bien séparés des actifs propres du gérant ?
> 3. **Contrôle des valorisations** : qui calcule la VL ? Est-ce indépendant de l'équipe de gestion ?
> 4. **Systèmes IT et cybersécurité** : OMS (Order Management System), PMS (Portfolio Management System), plan de continuité d'activité (PCA)
> 5. **Structure de gouvernance** : composition du conseil, comités de risque, procédures de compliance
> 6. **Vérifications personnelles** : vérification des antécédents (background check) des dirigeants clés, casier judiciaire
> 7. **Revue des comptes audités** : rapport annuel certifié, qualité de l'auditeur
> 8. **Visite sur site** : entretiens avec l'équipe opérationnelle (CFO, CTO, compliance officer)
