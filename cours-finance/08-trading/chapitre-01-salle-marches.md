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

---

## Approfondissement théorique

### Microstructure des marchés et market making

La **microstructure des marchés** est la discipline qui étudie les mécanismes de formation des prix et d'exécution des ordres à un niveau granulaire. Elle est au cœur du métier de market maker (teneur de marché).

#### Le modèle de Glosten-Milgrom (1985)

Le modèle de **Glosten et Milgrom** est l'un des modèles fondateurs de la microstructure. Il explique pourquoi le spread bid-ask existe même en l'absence de coûts d'inventaire, en introduisant le concept d'**asymétrie d'information**.

Le modèle repose sur les hypothèses suivantes :
- Le market maker fait face à deux types d'agents : des traders **informés** (qui connaissent la vraie valeur de l'actif) et des traders **non informés** (qui tradent pour des raisons de liquidité).
- Le market maker ne peut pas distinguer a priori à quel type il a affaire.

```
Valeur fondamentale de l'actif : V ∈ {V_H, V_L}  avec V_H > V_L
Probabilité a priori : P(V = V_H) = μ

Pour un ordre d'achat entrant :
  P(informé | achat) = α · μ / [α · μ + (1-α) · 0.5]

Le market maker fixe :
  Ask = E[V | ordre d'achat]
  Bid = E[V | ordre de vente]

Spread = Ask - Bid = f(α, μ, V_H - V_L)
```

Où `α` est la proportion de traders informés dans la population. Plus `α` est élevé, plus le spread est large, car le market maker doit se protéger de la sélection adverse.

#### Le coût d'adverse selection

L'**adverse selection cost** (coût de sélection adverse) représente la perte espérée subie par le market maker lorsqu'il traite avec un trader informé. C'est la composante principale du spread dans les marchés peu liquides.

```
Spread total = Coût d'adverse selection + Coût d'inventaire + Coût de traitement

Adverse selection component = 2 · α · (V_H - V_L) · μ · (1-μ)
```

En pratique, les market makers modèlent ce coût via l'**Amihud illiquidity ratio** :

```
ILLIQ_t = |R_t| / Volume_t

Où :
  R_t = rendement du jour t
  Volume_t = volume négocié en valeur ($)
```

Un ratio élevé signifie que les prix bougent beaucoup pour un volume donné : le marché est illiquide et le coût d'adverse selection est fort.

#### Payment for Order Flow (PFOF)

Le **PFOF** est une pratique par laquelle un broker reçoit une rémunération de la part d'un market maker pour lui router les ordres de ses clients. Très répandue aux États-Unis (Robinhood, Citadel Securities), elle est controversée en Europe où MiFID II la réglemente strictement.

```
Mécanisme PFOF :
  Broker (retail) → Order flow → Market maker
                 ← Rémunération ←

Avantage pour le client : meilleur prix d'exécution vs. bourse (price improvement)
Risque : conflit d'intérêts entre broker et client (meilleur exécution vs. rémunération maximale)
```

Le PFOF soulève la question de la **Best Execution** : le broker est-il obligé d'exécuter au meilleur prix disponible, ou peut-il prioriser la rémunération reçue ?

#### Fragmentation des marchés et dark pools

Depuis MiFID I (2007) et MiFID II (2018), les marchés européens sont fragmentés entre :
- **Marchés réglementés** (Euronext, Xetra) : transparents, avec carnet d'ordres visible
- **MTF** (Multilateral Trading Facilities) : ex. Chi-X, BATS Europe
- **Dark pools** : pas de transparence pré-trade, prix dérivés du marché de référence

```
Fragmentation : même action tradée sur 15+ venues différentes
Consolidation nécessaire : tape consolidée (ESMA European Consolidated Tape)

Part de marché typique (actions européennes, 2024) :
  Euronext     ~25%
  CBOE Europe  ~20%
  Aquis        ~6%
  Dark pools   ~8-10%
  SI (internalisateurs systématiques) ~15%
```

---

## Exemples numériques supplémentaires

### Exemple 1 : Décomposition complète du P&L d'un desk Equity

Considérons un trader equity qui gère un book d'options sur actions. En début de journée, sa position est :

```
Position : Long 100 calls sur Total SA
  Strike K = 55 €, échéance 3 mois
  Sous-jacent S₀ = 53 €, σ_implicite = 25%
  Delta = 0,42, Gamma = 0,08 (par €), Vega = 12 (€ par point de vol)
  Theta = -3,5 (€ par jour)
  Valeur de la position = 100 × 350 € = 35 000 €
```

En fin de journée :

```
Mouvement du sous-jacent : S₁ = 54,20 €  →  ΔS = +1,20 €
Mouvement de volatilité   : σ₁ = 26,5%   →  Δσ = +1,5 vol points
Passage du temps          : Δt = 1 jour
```

Calcul du P&L décomposé :

```
Delta P&L = Delta × ΔS × Notionnel
          = 0,42 × 1,20 × 100 × 100 actions
          = 0,42 × 1,20 × 10 000
          = +5 040 €

Gamma P&L = ½ × Gamma × (ΔS)² × Notionnel
           = 0,5 × 0,08 × (1,20)² × 10 000
           = 0,5 × 0,08 × 1,44 × 10 000
           = +576 €

Vega P&L  = Vega × Δσ × Notionnel
           = 12 × 1,5 × 100
           = +1 800 €

Theta P&L = -3,5 × 100 = -350 €

P&L expliqué total = +5 040 + 576 + 1 800 - 350 = +7 066 €
```

Si le MtM réel donne +7 120 €, l'unexplained P&L = +54 € (résidu acceptable, sans doute dû aux termes d'ordre supérieur — Vanna, Volga — non capturés).

**Conclusion** : le P&L est dominé par le delta (mouvement directionnel du sous-jacent), suivi par le vega (réévaluation de la volatilité implicite).

---

### Exemple 2 : Calcul du coût de sélection adverse et calibration du spread

Un market maker tient un marché sur l'action ABC (liquidité modérée). Il observe :

```
Données historiques (20 jours) :
  Volume moyen journalier : 500 000 titres
  Taille moyenne des ordres : 1 000 titres
  Nombre de trades par jour : 500
  Volatilité journalière : σ_daily = 1,5%
  Prix actuel : S = 100 €
```

Calibration du modèle de Glosten-Milgrom :

```
Paramètres estimés :
  α (proportion de traders informés) = 20%
  V_H = 101,5 €, V_L = 98,5 €  → range = 3 €
  μ (probabilité de V_H) = 0,5

Adverse selection component :
  AS = 2 × α × (V_H - V_L) × μ × (1-μ)
     = 2 × 0,20 × 3,00 × 0,5 × 0,5
     = 2 × 0,20 × 3,00 × 0,25
     = 0,30 €

Coût d'inventaire (spread de Kyle) :
  λ = σ²_daily / (2 × profondeur)
    = (0,015 × 100)² / (2 × 50 000)
    = 2,25 / 100 000 = 0,0000225 €/titre

  Pour un ordre de 1 000 titres :
  Price impact = λ × 1 000 = 0,0225 €

Spread total recommandé :
  Half-spread = AS/2 + λ × Q_moyen/2
              = 0,15 + 0,011 = 0,161 €
  Spread = ~0,32 €  soit ~32 bps sur 100 €
```

Le market maker affichera donc une fourchette bid-ask de l'ordre de 99,84 € / 100,16 €.

---

### Exemple 3 : Analyse d'un incident de risque opérationnel (style Knight Capital)

Scénario : un algorithme de market making est déployé en production à 09h30. Un paramètre de taille de lot est mal configuré (lot size = 10 000 au lieu de 100).

```
Simulation des 30 premières minutes :

Marché : action XYZ, spread = 0,05 €, prix mid = 50 €

Chaque cycle (toutes les 100ms) :
  - L'algo envoie 1 ordre achat de 10 000 titres au bid (49,975 €)
  - L'algo envoie 1 ordre vente de 10 000 titres à l'ask (50,025 €)

Mais le paramètre erroné crée un déséquilibre : 
  seuls les ordres d'achat sont exécutés correctement,
  les ordres de vente sont ignorés (bug de routing)

En 30 minutes (18 000 secondes / 100ms = 1 800 cycles) :
  Achats exécutés : 1 800 × 10 000 = 18 000 000 titres
  Position nette : Long 18 000 000 titres × 50 € = 900 000 000 € (!)
  
Impact de marché :
  L'algo achète massivement → prix monte vers 51 €
  P&L latent = 18 M × (51 - 50) = +18 M€ (apparent)
  
À la fermeture forcée de la position (liquidation d'urgence) :
  Prix de liquidation moyen : 49 € (impact inverse)
  P&L réalisé = 18 M × (49 - 50) = -18 000 000 € 
             + coûts de transaction ≈ 18 M × 0,05 = -900 000 €
  
  Perte totale estimée : ~19 M€ en 30 minutes
```

**Leçons** : kill switch obligatoire, limites de position en temps réel, monitoring automatique du P&L avec seuil d'alerte à 1% de la perte maximale tolérable.

---

## Applications professionnelles

### Workflow quotidien d'un trader professionnel

La journée d'un trader senior en salle des marchés suit un rythme précis, dicté par les ouvertures et fermetures des marchés mondiaux :

**Phase de préparation (06h30 – 08h45)**

Le trader commence par lire le **morning pack** préparé par l'équipe de recherche : résumé des marchés asiatiques, indicateurs économiques publiés dans la nuit, résultats d'entreprises, événements géopolitiques. Il consulte ses positions overnight sur le système de risk management (Bloomberg POMS ou propriétaire) pour identifier les PnL ouverts et les déltas résiduels. Si le desk gère des options, il recalibre les surfaces de volatilité implicite en fonction des mouvements de nuit.

Le **morning meeting** (07h30 en général) réunit le desk, les sales et parfois les économistes maison. Chaque trader présente ses positions, ses vues et ses ordres à passer à l'ouverture.

**Phase de trading actif (08h45 – 17h30)**

Les premières minutes après l'ouverture (09h00 Euronext) sont cruciales : forte volatilité, large spread, flux d'ordres déséquilibrés. Le trader experienced sait lire le **flux d'ordres** (order flow) pour anticiper la direction du marché à court terme. Il surveille simultanément :

```
Outils moniteur typique d'un trader actions (8 écrans) :
  Écran 1 : Bloomberg — flux macro et news
  Écran 2 : Carnet d'ordres (Level 2) — bid/ask en profondeur
  Écran 3 : Système interne P&L temps réel
  Écran 4 : Risk dashboard — greeks, VaR, limites
  Écran 5 : Chat Bloomberg (IB) — communication avec sales et contreparties
  Écran 6 : Graphiques et analyse technique
  Écran 7 : OMS (Fidessa, Bloomberg EMSX)
  Écran 8 : Watchlist — positions annexes et benchmarks
```

**Phase de clôture (16h30 – 19h00)**

La dernière heure de trading voit souvent des mouvements de rééquilibrage liés aux **index reconstitutions** (fin de mois, fin de trimestre) et aux **ETF rebalancing**. Le trader doit décider s'il porte des positions overnight ou s'il rentre flat (position nulle). Après la fermeture, il prépare l'explication du P&L pour le middle office et renseigne son blotter (journal de trades).

### Outils et plateformes réelles

| Catégorie | Outil | Usage |
|-----------|-------|-------|
| **Données de marché** | Bloomberg Terminal, Refinitiv Eikon | Cours, news, analytics |
| **OMS** | Fidessa, Bloomberg EMSX, FlexTrade | Saisie et routage d'ordres |
| **Risk** | Murex, Calypso, Summit | Calcul des greeks, VaR, limites |
| **Algos d'exécution** | ITG POSIT, Liquidnet, Instinet | TWAP, VWAP, implementation shortfall |
| **Communication** | Bloomberg IB (messaging), ICE Chat | Communication inter-desks |
| **Analyse** | FactSet, Capital IQ | Fondamentaux, modèles DCF |
| **Back-testing** | Python/pandas, Matlab, propriétaire | Développement de stratégies |

---

## Erreurs fréquentes et pièges

### Erreur 1 : Biais de confirmation et ancrage psychologique

L'un des biais cognitifs les plus dangereux en trading est le **biais de confirmation** : le trader cherche inconsciemment des informations qui confirment sa position existante et ignore les signaux contraires. Si un trader est long sur une action et que les résultats sont décevants, il sera tenté de minimiser les mauvaises nouvelles ("c'est temporaire") et de sur-pondérer les éléments positifs mineurs.

L'**ancrage** est connexe : le trader est "ancré" sur son prix d'achat et ne peut envisager une sortie en dessous de ce niveau. Le marché, lui, ne sait pas à quel prix vous avez acheté. La seule question pertinente est : si je n'avais pas cette position, est-ce que je l'initierais maintenant ?

**Remède** : utiliser des stop-loss systématiques, pré-définis avant d'entrer en position. Se forcer à écrire une **thèse d'investissement** avec les conditions d'invalidation avant d'initier le trade.

### Erreur 2 : Over-trading et churning

L'**over-trading** désigne le fait de passer trop d'ordres, souvent par ennui, par volonté d'être "actif" ou par excès de confiance. Chaque transaction génère des coûts (spread, commissions, impact de marché) qui s'accumulent rapidement.

```
Exemple chiffré :
  Trader avec capital de 100 000 €
  Tourne son capital 10 fois par mois (1 000 000 € de volume)
  Coût de transaction : 10 bps (spread + commission)
  
  Coût mensuel = 1 000 000 × 0,10% = 1 000 €
  Coût annuel  = 12 000 € = 12% du capital
  
  → Le trader doit générer 12% de alpha net juste pour couvrir ses frais !
```

**Remède** : tenir un journal de trading avec analyse de la **hit rate** et du **profit factor**. Poser la question avant chaque trade : "Quel est mon edge sur cette transaction ?"

### Erreur 3 : Revenge trading

Le **revenge trading** est la tendance à essayer de "récupérer" rapidement ses pertes après une mauvaise séquence, en prenant des positions plus grosses et moins réfléchies. C'est un cercle vicieux : la pression émotionnelle dégrade la qualité des décisions, ce qui aggrave les pertes, ce qui augmente la pression.

Jérôme Kerviel a clairement présenté ce pattern : après une perte initiale sur ses positions directionnelles fin 2007, il a augmenté massivement son exposition pour "récupérer", atteignant des positions de 50 milliards d'euros.

**Remède** : règle stricte du **daily loss limit** avec obligation de s'arrêter de trader pour la journée si cette limite est franchie. Certaines firmes implémentent cette règle de façon automatique dans les systèmes.

### Erreur 4 : Position sizing inadapté — ignorer la corrélation

Un débutant calcule souvent la taille de ses positions de façon isolée, sans tenir compte des corrélations entre positions. Or, deux positions "distinctes" peuvent être très corrélées.

```
Exemple :
  Position 1 : Long Total SA (secteur énergie)
  Position 2 : Long Shell (secteur énergie)
  Position 3 : Long Schlumberger (services pétroliers)

Ces 3 positions ont toutes une corrélation ≥ 0,70 avec le prix du pétrole.
En cas de choc sur le pétrole (−20%), les 3 positions perdent simultanément.

Calcul naïf du risque :
  VaR individuelle de chaque position = 10 000 €
  VaR totale supposée = 30 000 €

Calcul correct avec corrélation ρ = 0,75 :
  VaR_portfolio = √(VaR₁² + VaR₂² + VaR₃² + 2ρ(VaR₁VaR₂ + VaR₁VaR₃ + VaR₂VaR₃))
                = √(3 × 10 000² + 2 × 0,75 × 3 × 10 000²)
                = 10 000 × √(3 + 4,5) = 10 000 × √7,5 ≈ 27 386 €
                
  Mais pour ρ = 1 : VaR = 30 000 € (additive pure)
  En stress, ρ → 1 : le bénéfice de diversification disparaît !
```

**Remède** : construire une matrice de corrélation du portfolio. Utiliser la méthode de **risk budgeting** (chaque position contribue au maximum X% au risque total du book).

### Erreur 5 : Ignorer les coûts d'impact de marché

Les traders débutants sur des stratégies backtestées ignorent souvent le **market impact** : le fait que passer un ordre gros modifie le prix en votre défaveur. Un backtest sans impact de marché est systématiquement trop optimiste.

```
Modèle simple de market impact (linéaire) :
  ΔP / P = λ × Q / ADV

Où :
  Q   = taille de l'ordre
  ADV = volume journalier moyen
  λ   = coefficient d'impact (typiquement 0,1 à 0,5 pour les actions liquides)

Exemple :
  Ordre de 50 000 actions sur une valeur dont l'ADV = 500 000
  Q / ADV = 10%
  ΔP / P = 0,3 × 10% = 3%
  
  Sur un prix de 100 €, l'achat se fait en moyenne à 101,5 € (en moyenne)
  Coût d'impact = 50 000 × 1,5 € = 75 000 €
```

Ce coût de 75 000 € doit être soustrait du P&L simulé. Toute stratégie qui requiert des ordres importants doit intégrer ce modèle.

---

## Exercices supplémentaires

### Exercice 3 — Décomposition du P&L par sensibilités (niveau intermédiaire)

Un trader de taux détient un portefeuille obligataire avec les caractéristiques suivantes en début de journée :

```
Portefeuille :
  - 10 M€ nominal d'OAT 10 ans, coupon 3%, prix = 98,50, DV01 = 900 €/bp
  - Short 100 contrats futures OAT (multiplicateur 1 000 €, DV01 = 90 €/bp/contrat)
  - Position nette DV01 = 900 - 100 × 90 = 900 - 9 000 = -8 100 €/bp (short duration)

Mouvements de marché en journée :
  - Taux 10 ans OAT : -5 bps (de 3,50% à 3,45%)
  - Pente 2-10 ans : +2 bps (flattening / pentification)
```

**Question** : calculez le P&L du portefeuille. Interprétez le résultat.

> **Correction** :
>
> Le trader est **short duration** (DV01 négatif). Les taux baissent de 5 bps → les obligations montent → le trader perd sur cette composante.
>
> ```
> P&L = DV01_net × Δtaux (en bps)
>      = -8 100 € × (-5)
>      = +40 500 €
> ```
>
> Wait — il faut vérifier le signe. Une position **short duration** (DV01 négatif) **gagne** quand les taux **montent** et **perd** quand les taux baissent.
>
> Les taux baissent de 5 bps → le portefeuille perd :
>
> ```
> P&L = DV01_net × Δtaux
>      = -8 100 × (-5) = +40 500 €
> ```
>
> Ici, la convention est : DV01 = gain pour une baisse de 1 bp. Donc avec DV01_net = -8 100 (short), une baisse de 5 bps génère :
> -8 100 × (-5) = +40 500 € de P&L. Le short duration a gagné car les taux ont... attendu, recalculons avec la bonne convention.
>
> **Convention standard** : DV01 > 0 signifie que la position gagne quand les taux baissent.
> DV01_net = -8 100 (short duration) → position qui **perd** quand les taux baissent.
>
> ```
> P&L duration = DV01_net × (-Δtaux_en_bps)
>              = -8 100 × (-(-5))   [les taux baissent de 5 bps → Δtaux = -5 bps]
>              = -8 100 × 5 = -40 500 €
> ```
>
> Le trader perd 40 500 € sur sa position duration, car il était short et les taux ont baissé (les obligations ont monté).
>
> La composante de pente (steepening/flattening) affecterait différemment la position selon la structure du book. Si le trader avait une exposition neutre à la pente, ce composant est nul.
>
> **P&L total ≈ -40 500 €** sur la journée.

---

### Exercice 4 — Calcul du coût d'adverse selection et calibration du spread (niveau avancé)

Un market maker sur options observe les données suivantes sur une séance :

```
Transactions sur CALL BNP Paribas K=60€, échéance 1 mois :
  Transaction 1 : vente 100 calls à 2,10 € (market maker vend, client achète)
  Transaction 2 : vente 50 calls à 2,08 €
  Transaction 3 : achat 80 calls à 2,05 € (market maker achète, client vend)
  Transaction 4 : vente 120 calls à 2,15 €
  Transaction 5 : achat 60 calls à 2,02 €

Prix de clôture du call : 2,18 €
```

**Questions** :
1. Calculez le P&L réalisé du market maker sur les transactions 1 à 5.
2. Calculez le P&L MtM total (position ouverte valorisée à 2,18 €).
3. Identifiez si les acheteurs ou vendeurs étaient davantage "informés".

> **Correction** :
>
> **Position nette du market maker** :
> ```
> Ventes : 100 + 50 + 120 = 270 calls vendus
> Achats : 80 + 60 = 140 calls achetés
> Position nette : Short 130 calls
> ```
>
> **P&L réalisé (sur les 140 calls achetés puis revendus — partial)**
> ```
> Revenus des ventes (totaux) = 100 × 2,10 + 50 × 2,08 + 120 × 2,15
>                             = 210 + 104 + 258 = 572 €
> Coûts des achats (totaux) = 80 × 2,05 + 60 × 2,02
>                           = 164 + 121,20 = 285,20 €
> P&L brut = 572 - 285,20 = +286,80 € sur le flux traité
> ```
>
> **P&L MtM de la position résiduelle (short 130 calls)** :
> ```
> Prix moyen de vente des 130 calls résiduels :
>   On a vendu en net 270 calls, acheté 140. Les 130 restants sont issus des ventes.
>   Prix moyen des ventes : 572 / 270 ≈ 2,118 €
> 
> P&L MtM = (prix moyen de vente - prix de clôture) × position short
>          = (2,118 - 2,18) × 130 = -0,062 × 130 = -8,06 €
> ```
>
> **Interprétation** : les acheteurs (clients qui achetaient des calls) étaient davantage informés : le prix de clôture (2,18 €) est supérieur au prix moyen des transactions, ce qui signifie que les calls ont monté. Les acheteurs ont réalisé un profit, aux dépens du market maker (coût d'adverse selection).

---

### Exercice 5 — Analyse d'un book de risque et optimisation des limites (niveau avancé)

Un desk equity options présente le bilan de risque suivant en fin de journée :

```
Book equity options (10 positions différentes) :
  Delta net     = +450 000 € (long delta)
  Gamma net     = +8 500 €/% (long gamma — position longue d'options)
  Vega net      = -25 000 € (short vega — vendeur de volatilité nette)
  Theta net     = +3 200 €/jour (gain de time decay)

Limites allouées :
  Delta limit   : ±500 000 €
  Gamma limit   : ±10 000 €/%
  Vega limit    : ±30 000 €
  Stop-loss day : -50 000 €

Scénario de stress test :
  Baisse du sous-jacent de 3%
  Hausse de la volatilité de +5 vol points
```

**Question** : calculez l'impact du scénario de stress sur le P&L et vérifiez si les limites sont respectées après le choc.

> **Correction** :
>
> **P&L sous stress :**
> ```
> Impact Delta = Delta × ΔS = +450 000 × (-0,03) = -13 500 €
>
> Impact Gamma = ½ × Gamma × (ΔS)² = 0,5 × 8 500 × (0,03)² = 0,5 × 8 500 × 0,0009 = +3,83 €
>   (Le gamma est long, donc le portefeuille est convexe — bénéfice de la grande baisse)
>   Note : gamma exprimé en €/% donc : Impact = ½ × 8 500 × 3² = +38 250 €  [si ΔS en %]
>
> Impact Vega = Vega × Δσ = -25 000 × 5 = -125 000 €
>   (Short vega, la vol monte → perte significative)
>
> P&L stress total = -13 500 + 38 250 - 125 000 = -100 250 €
> ```
>
> **Vérification des limites :**
> ```
> Stop-loss day = -50 000 € → BREACHED (-100 250 € < -50 000 €)
>
> Delta post-choc (approximation) :
>   Delta ≈ Delta initial + Gamma × ΔS
>          = +450 000 + 8 500 × (-3) = +450 000 - 25 500 = +424 500 € → OK (<500 000€)
>
> Vega : inchangé en première approximation → -25 000 € → OK (<30 000€)
> ```
>
> **Conclusion** : le stop-loss journalier serait franchi dans ce scénario de stress. Le trader devrait réduire son exposition vega (acheter de la volatilité) pour se protéger contre ce type de scénario. Une vente de calls out-of-the-money ou l'achat de variance swaps permettrait de réduire le short vega net.

---

### Exercice 6 — Microstructure : estimation du spread et adverse selection (niveau expert)

Un analyste en microstructure étudie les transactions sur l'action CAP Gemini pendant une heure :

```
Données (10 transactions) :
  Heure    | Prix  | Sens       | Volume
  09:05:12 | 185,4 | Achat      | 2 000
  09:08:33 | 185,2 | Vente      | 1 500
  09:12:01 | 185,6 | Achat      | 3 000
  09:15:44 | 185,5 | Achat      | 800
  09:19:22 | 185,3 | Vente      | 2 200
  09:23:55 | 185,1 | Vente      | 4 000
  09:27:08 | 184,9 | Vente      | 1 800
  09:31:19 | 185,0 | Achat      | 900
  09:35:42 | 185,2 | Achat      | 1 200
  09:40:00 | 185,4 | Vente      | 600
```

**Questions** :
1. Estimez le spread effectif moyen par la méthode de Roll (1984).
2. Identifiez la composante informationnelle en utilisant la méthode de Glosten-Harris.

> **Correction** :
>
> **Méthode de Roll — spread effectif :**
>
> La méthode de Roll estime le spread à partir de la covariance des variations de prix successives.
> ```
> ΔP_t = P_t - P_{t-1}
>
> Variations :
> ΔP₁ = 185,2 - 185,4 = -0,2
> ΔP₂ = 185,6 - 185,2 = +0,4
> ΔP₃ = 185,5 - 185,6 = -0,1
> ΔP₄ = 185,3 - 185,5 = -0,2
> ΔP₅ = 185,1 - 185,3 = -0,2
> ΔP₆ = 184,9 - 185,1 = -0,2
> ΔP₇ = 185,0 - 184,9 = +0,1
> ΔP₈ = 185,2 - 185,0 = +0,2
> ΔP₉ = 185,4 - 185,2 = +0,2
>
> Produits ΔP_t × ΔP_{t-1} :
> (-0,2)(+0,4) = -0,08
> (+0,4)(-0,1) = -0,04
> (-0,1)(-0,2) = +0,02
> (-0,2)(-0,2) = +0,04
> (-0,2)(-0,2) = +0,04
> (-0,2)(+0,1) = -0,02
> (+0,1)(+0,2) = +0,02
> (+0,2)(+0,2) = +0,04
>
> Covariance estimée = moyenne = (-0,08 - 0,04 + 0,02 + 0,04 + 0,04 - 0,02 + 0,02 + 0,04) / 8
>                   = 0,02 / 8 = +0,0025
>
> Si Cov(ΔP_t, ΔP_{t-1}) < 0 → Spread de Roll = 2 × √(-Cov)
> Ici la covariance est positive (faible), ce qui indique une légère tendance → 
> le spread de Roll n'est pas applicable directement (il suppose Cov < 0).
> On constate une légère momentum dans les prix.
> ```
>
> **Interprétation** : la covariance légèrement positive des variations de prix suggère qu'il y a de l'information dans le flux d'ordres (les achats sont suivis de hausses, les ventes de baisses). C'est la signature d'une composante informationnelle significative, cohérente avec la présence de traders informés dans cet échantillon.
