# Chapitre 2 — Allocation Stratégique d'Actifs (SAA)

## Introduction

L'**Allocation Stratégique d'Actifs** (SAA — Strategic Asset Allocation) est le processus par lequel un investisseur institutionnel détermine la répartition à long terme de son portefeuille entre les différentes classes d'actifs. Elle constitue la **décision d'investissement la plus importante**, représentant selon Brinson, Hood & Beebower (1986) plus de **91 % de la variabilité des performances** à long terme.

Contrairement à l'allocation tactique (TAA), qui ajuste le portefeuille à court terme, la SAA est définie pour un horizon de **5 à 30 ans** et reflète les objectifs, les contraintes et la tolérance au risque structurelle de l'investisseur.

---

## 1. Définition et principes fondamentaux

### 1.1 Définition formelle

La SAA définit un **portefeuille de référence** (policy portfolio) qui maximise l'utilité espérée de l'investisseur sur son horizon de placement :

```
max   U = E[Rp] - (λ/2) × σ²p
{wᵢ}

sous contraintes :
  Σ wᵢ = 1
  wᵢ ≥ wᵢ_min  (contraintes de borne inférieure)
  wᵢ ≤ wᵢ_max  (contraintes de borne supérieure)
```

- `λ` : coefficient d'aversion au risque de l'investisseur
- `E[Rp]` : rendement espéré du portefeuille
- `σ²p` : variance du portefeuille

### 1.2 SAA vs. TAA : les différences essentielles

| Critère | SAA | TAA |
|---------|-----|-----|
| **Horizon** | 5–30 ans | 1–12 mois |
| **Objectif** | Atteindre les objectifs long terme | Exploiter les inefficiences court terme |
| **Révision** | Annuelle ou pluriannuelle | Mensuelle ou hebdomadaire |
| **Moteur** | Primes de risque structurelles | Cycle économique, valorisations |
| **Décision** | Comité de gouvernance / conseil | Comité d'investissement |
| **Dérive tolérée** | ±3 à 5 % autour des poids cibles | Ajustements actifs |

### 1.3 Horizon de placement et objectifs de rendement

L'horizon de placement détermine la capacité à absorber les drawdowns temporaires et donc la proportion d'actifs risqués :

| Type d'investisseur | Horizon | Allocation actions cible |
|--------------------|---------|------------------------|
| Fonds souverain (ex. NBIM Norvège) | 20–30 ans | 60–70 % |
| Fonds de pension à prestations définies | 15–20 ans | 30–50 % |
| Fonds de pension à cotisations définies (retraite lointaine) | 20–35 ans | 70–90 % |
| Fonds de pension (retraite proche) | 5–10 ans | 20–40 % |
| Assureur vie (unités de compte) | 10–15 ans | 30–50 % |
| Fondation universitaire (endowment) | Perpétuel | 60–80 % |
| Family office | Variable | 40–60 % |

---

## 2. Le calibrage des rendements espérés : la méthode des blocs de construction (Building Blocks)

### 2.1 Principe

La méthode des **building blocks** (blocs de construction) décompose le rendement espéré d'une classe d'actifs en ses composantes fondamentales, plutôt que de se fier uniquement aux rendements historiques qui peuvent être trompeurs.

```
Rendement espéré = Actif sans risque
                 + Prime de risque de duration (obligations)
                 + Prime de crédit (obligations corporate)
                 + Prime de risque actions (ERP)
                 + Prime d'illiquidité (PE, infra, real estate)
                 + Prime de change (si applicable)
```

### 2.2 Construction du taux sans risque

```
rf = Taux réel à court terme + Inflation anticipée

Exemple (zone euro, 2024) :
  Taux réel BCE ≈ 1,5 %
  Inflation anticipée à 10 ans ≈ 2,0 %
  → rf nominal ≈ 3,5 %
```

### 2.3 Primes de risque par classe d'actifs

| Classe d'actif | Composantes du rendement espéré | Rendement nominal cible |
|----------------|--------------------------------|------------------------|
| **Obligations d'État 10 ans** | rf + prime de terme (0,5–1 %) | 4,0–4,5 % |
| **Obligations IG** | Obligations État + spread crédit (0,8–1,2 %) | 4,8–5,7 % |
| **Obligations HY** | Obligations État + spread (3–4 %) × (1 – taux de défaut) | 6,5–7,5 % |
| **Actions mondiales** | rf + ERP (4,5–5,5 %) | 8,0–9,0 % |
| **Actions émergentes** | rf + ERP + prime pays (1–2 %) | 9,0–10,0 % |
| **Immobilier coté** | Actions + prime immo − prime liquidité | 7,5–8,5 % |
| **Private Equity** | Actions + prime illiquidité (2–4 %) | 10,0–13,0 % |
| **Infrastructure** | rf + prime réelle (3–4 %) + inflation | 6,5–8,0 % |

### 2.4 Estimation de l'ERP (Equity Risk Premium)

L'ERP est la composante la plus difficile à calibrer et la plus discutée en finance :

```
Méthode 1 — Historical approach :
  ERP = Rendement actions historique − rf historique
  ≈ 9,5 % − 3,5 % = 6,0 % (arithmétique, USA, 1900–2023)
  ≈ 7,5 % − 4,5 % = 3,0 % (géométrique, monde, 1900–2023)

Méthode 2 — Gordon-Shapiro implicite (forward-looking) :
  ERP = D₁/P₀ + g − rf
      = Dividend yield + Croissance BPA − Taux sans risque
  ≈ 1,5 % + 5,0 % − 3,5 % = 3,0 % (USA, 2024)

Méthode 3 — Modèle de Damodaran (2024) :
  ERP implicite USA ≈ 4,5–5,0 %
  ERP implicite Europe ≈ 5,5–6,0 %
```

**Consensus de marché** : ERP = 3,5–5,0 % selon l'approche et la période de référence.

---

## 3. La frontière efficiente multi-actifs

### 3.1 Formalisation du problème d'optimisation

Pour N classes d'actifs, le problème de Markowitz s'écrit :

```
min σ²p = wᵀ Σ w
 w

sous contrainte : wᵀ μ = μ*  (rendement cible)
                  wᵀ 1 = 1   (somme des poids = 1)
                  w ≥ 0       (pas de vente à découvert, optionnel)
```

où :
- `w` : vecteur des poids (N×1)
- `Σ` : matrice de variance-covariance (N×N)
- `μ` : vecteur des rendements espérés (N×1)
- `μ*` : rendement cible du portefeuille

### 3.2 Le portefeuille de marché et le CAPM comme point de départ

Le **CAPM** (Capital Asset Pricing Model) fournit un point d'ancrage théorique pour la SAA. Le portefeuille de marché mondial (MSCI ACWI) représente les poids d'équilibre :

```
E[Rᵢ] = rf + βᵢ × (E[RM] − rf)

βᵢ = Cov(Rᵢ, RM) / Var(RM) = ρᵢM × σᵢ / σM
```

**En pratique**, les rendements d'équilibre CAPM servent de **prior** : on part des poids du portefeuille de marché mondial et on s'en écarte selon nos vues d'investissement (cf. Black-Litterman, chapitre 3).

### 3.3 Frontière efficiente avec classes d'actifs institutionnelles

Exemple de frontière avec 7 classes d'actifs :

| Portefeuille | Rendement | Volatilité | Sharpe |
|-------------|-----------|-----------|--------|
| Minimum variance | 5,2 % | 5,8 % | 0,29 |
| Conservateur (20 % actions) | 5,8 % | 6,5 % | 0,35 |
| Équilibré (40 % actions) | 6,8 % | 8,2 % | 0,40 |
| Croissance (60 % actions) | 7,8 % | 10,5 % | 0,41 |
| Dynamique (80 % actions) | 8,6 % | 13,0 % | 0,38 |
| Maximum Sharpe | 7,2 % | 8,8 % | 0,42 |

---

## 4. Processus SAA d'une grande institution — le fonds de pension

### 4.1 Les étapes du processus

```
ÉTAPE 1 — Définition des objectifs et contraintes
  ↓ Actuariat, juristes, conseil d'administration
ÉTAPE 2 — Étude actif-passif (ALM)
  ↓ Modélisation des engagements vs. actifs
ÉTAPE 3 — Définition de l'univers d'investissement
  ↓ Sélection des classes d'actifs éligibles
ÉTAPE 4 — Calibrage des hypothèses de marché à long terme
  ↓ Rendements espérés, volatilités, corrélations
ÉTAPE 5 — Optimisation et sélection du portefeuille
  ↓ Frontière efficiente + analyse de scénarios
ÉTAPE 6 — Approbation et implémentation
  ↓ Conseil d'administration → mandats de gestion
ÉTAPE 7 — Suivi, révision et rééquilibrage
  ↓ Suivi trimestriel, révision annuelle ou triannuelle
```

### 4.2 Étude actif-passif (ALM) pour un fonds de pension

Le fonds de pension doit couvrir ses **engagements actuariels** (pensions futures) dont la valeur actuarielle est :

```
Valeur engagements = Σ [ Pₜ / (1 + r_actuariel)^t ]

Taux de couverture = Valeur actifs / Valeur engagements

Objectif : Taux de couverture ≥ 100 % (avec une marge de sécurité)
```

**Duration des engagements** : typiquement 15–25 ans pour un fonds mature.

**Conséquence pour la SAA** : le fonds doit détenir des obligations longues pour réduire le **risque de duration** (gap entre duration actifs et passifs).

```
Allocation LDI typique (Liability-Driven Investing) :
  40–60 % Obligations longues (matching des engagements)
  20–30 % Actions mondiales (moteur de performance)
  10–15 % Actifs réels (infra, immobilier)
  5–10 % Actifs alternatifs (diversification)
```

---

## 5. Contraintes de la SAA institutionnelle

### 5.1 Contraintes de liquidité

Les actifs illiquides génèrent une prime de risque mais exposent à un **risque de vente forcée** :

```
Règle de liquidité :
  Actifs liquides ≥ Engagements de court terme × Facteur de stress (1,5–2×)

Pour un fonds de pension mature (25 % de retraités actifs) :
  Paiements annuels ≈ 4–6 % des actifs
  → Minimum 10–12 % d'actifs liquides (2–3 ans de paiements)
```

| Classe d'actif | Délai de liquidation | Coût de liquidation |
|----------------|---------------------|---------------------|
| Actions cotées (large cap) | 1–3 jours | 0,1–0,2 % |
| Obligations d'État | 1–2 jours | 0,05–0,1 % |
| Obligations crédit IG | 3–5 jours | 0,2–0,5 % |
| Obligations HY | 5–15 jours | 0,5–1,5 % |
| Immobilier coté (REIT) | 1–5 jours | 0,1–0,3 % |
| Immobilier non coté | 6–24 mois | 2–5 % |
| Private Equity | 3–7 ans | 5–15 % (décote secondaire) |
| Infrastructure non cotée | 2–5 ans | 3–8 % |

### 5.2 Contraintes réglementaires

| Type d'investisseur | Régulation | Contraintes principales |
|--------------------|-----------|------------------------|
| Fonds de pension français | FRPS, code des assurances | Limites actifs non cotés, tests de couverture |
| Assureur vie | Solvabilité II | Capital requis selon SCR par classe d'actif |
| OPCVM | UCITS IV | 10 % max par émetteur, dérivés limités |
| FIA (AIFMD) | Directive AIFM | Reporting, levier encadré |
| Fonds souverain | Statuts internes | Ex. : NBIM max 5 % dans une seule société |

### 5.3 Contraintes éthiques et ESG

Les contraintes ESG (Environmental, Social, Governance) modifient l'univers d'investissement et donc la frontière efficiente :

```
Exclusions typiques :
  - Armements controversés (mines antipersonnel, bombes à sous-munitions)
  - Tabac (filtre courant dans les mandats européens)
  - Charbon thermique (seuil : >5–25 % du CA selon la politique)
  - Pétrole sables bitumineux (certains fonds nordiques)

Contraintes d'intégration ESG :
  - Score ESG moyen portefeuille > score benchmark
  - Intensité carbone < X tCO₂e/M€ investis
  - Alignement trajectoire < 2°C (Paris Agreement)
```

**Impact sur la frontière efficiente** : les exclusions réduisent légèrement le rendement espéré ou augmentent légèrement le risque (selon études : pénalité de 0,1–0,3 %/an en diversification).

---

## 6. Le rééquilibrage (Rebalancing)

### 6.1 Dérive des poids et nécessité du rééquilibrage

Au fil du temps, les performances différentielles des classes d'actifs font dériver les poids du portefeuille :

```
Exemple : SAA initiale 60 % actions / 40 % obligations
  Actions : +15 % (rendement annuel fort)
  Obligations : +2 %
  
  Poids actions après 1 an sans rééquilibrage :
  w_actions = (0,60 × 1,15) / (0,60 × 1,15 + 0,40 × 1,02)
             = 0,69 / (0,69 + 0,408)
             = 0,69 / 1,098
             = 62,8 % (dérive de +2,8 pts)
```

### 6.2 Stratégies de rééquilibrage

| Stratégie | Déclencheur | Avantages | Inconvénients |
|-----------|------------|-----------|---------------|
| **Calendaire** | Mensuel, trimestriel | Simple, prévisible | Coûts si faible dérive |
| **Par seuils** | Dérive > ±3–5 % | Coûts réduits, adaptatif | Complexité suivi |
| **Calendaire + seuils** | Mensuel ET dérive > 3 % | Optimal en pratique | Légèrement complexe |
| **Buy-and-hold** | Jamais | Coûts très faibles | Risque dérive excessive |

### 6.3 Impact du rééquilibrage sur la performance

Le rééquilibrage a un effet de **"vente des gagnants et achat des perdants"** qui génère un léger alpha de rééquilibrage (rebalancing premium) :

```
Rebalancing premium ≈ (1/2) × σ²_p × Δt

Pour un portefeuille 60/40 avec σ_actions=15 %, σ_oblig=5 %, ρ=-0,2 :
  Prime annuelle de rééquilibrage ≈ 0,3–0,5 %/an
  
  À condition que les classes d'actifs soient mean-reverting,
  ce qui est cohérent sur horizon long terme.
```

---

## Approfondissement théorique

### La contribution de Brinson, Hood & Beebower (1986, 1991)

L'étude de BHB est l'une des plus citées en finance institutionnelle. Analysant 91 fonds de pension US sur 1974–1983, elle décompose la performance en :

```
Performance totale = Effet SAA + Effet TAA + Effet sélection + Résiduel
                   ≈ 91,5 %  +  1,8 %    +  4,6 %         + 2,1 %
```

**Implication** : la SAA détermine l'essentiel de la performance, d'où son importance primordiale.

**Nuance** : l'étude mesure la variabilité des performances, pas le niveau absolu. Roger Ibbotson & Paul Kaplan (2000) précisent que la SAA explique 100 % du niveau moyen de performance et environ 90 % de la variabilité temporelle.

### Le modèle d'endowment (modèle Yale)

David Swensen, CIO de Yale (1985–2021), a révolutionné la SAA institutionnelle en surpondérant massivement les actifs alternatifs illiquides :

| Classe d'actif | SAA Yale 2023 | SAA traditionnelle |
|----------------|--------------|-------------------|
| Private Equity | 39 % | 10 % |
| Hedge Funds (absolute return) | 23 % | 5 % |
| Immobilier | 9,5 % | 10 % |
| Actions cotées | 12,5 % | 40 % |
| Obligations | 4,5 % | 30 % |
| Matières premières | 4,5 % | 5 % |

**Résultat** : rendement annuel Yale 1985–2021 = +13,7 %/an, vs. 60/40 = ~8 %/an.

**Prérequis** : horizon très long, gouvernance forte, accès aux meilleurs gérants (problème de réplication).

### La frontière efficiente avec aversion au risque variable

La fonction d'utilité de l'investisseur peut être calibrée pour refléter son aversion au risque :

```
Coefficient d'aversion au risque λ :
  λ = 2 si l'investisseur est prêt à accepter σ=10% pour +5% de rendement
  λ = 4 si l'investisseur est prêt à accepter σ=10% pour +2% de rendement

Portefeuille optimal :
  w* = (1/λ) × Σ⁻¹ × (μ − rf × 1)
```

---

## Exemples numériques

### Exemple 1 — Calibrage building blocks pour un portefeuille institutionnel

Un fonds de pension scandinave en zone euro définit ses rendements espérés à 10 ans pour 2024–2034 :

```
Hypothèses macroéconomiques :
  Taux sans risque (OAT 10 ans) = 3,5 %
  Inflation anticipée = 2,0 %
  Taux réel = 1,5 %

Classe d'actif         | Prime sur rf | Rendement nominal espéré
-----------------------|--------------|------------------------
Obligations d'État 10Y | +0 %         | 3,5 %
Obligations IG EUR     | +1,0 %       | 4,5 %
Obligations HY EUR     | +3,5 % × 0,8 | 6,3 % (nette de défauts)
Actions monde développé| +4,5 %       | 8,0 %
Actions émergentes     | +5,5 %       | 9,0 %
Immobilier coté (REIT) | +3,5 %       | 7,0 %
Private Equity         | +6,5 %       | 10,0 %
Infrastructure         | +3,0 %       | 6,5 %
```

### Exemple 2 — Construction de la SAA d'un fonds de pension à prestations définies

**Contexte** : fonds de pension français, 2 Md€ d'actifs, engagements de duration 20 ans, taux de couverture cible 110 %, taux de couverture actuel 105 %.

**Étape 1 — Analyse des engagements** :
```
Duration des engagements = 20 ans
  → Couverture partielle : 50 % des actifs doivent avoir duration ≈ 20 ans
  → Cela correspond à des obligations longues (OAT 30 ans, OATI)

Paiements annuels ≈ 80 M€ (4 % des actifs)
  → Réserve de liquidité nécessaire : 2 × 80 M€ = 160 M€ (8 % du portefeuille)
```

**Étape 2 — Construction SAA** :

| Classe d'actif | Poids SAA | Montant | Rôle |
|----------------|----------|---------|------|
| Obligations État longues (> 20 ans) | 35 % | 700 M€ | Matching duration engagements |
| OATI (inflation-linked) | 10 % | 200 M€ | Protection inflation des engagements |
| Obligations IG | 10 % | 200 M€ | Rendement + réserve liquidité |
| Actions mondiales | 22 % | 440 M€ | Moteur de performance |
| Private Equity | 8 % | 160 M€ | Prime illiquidité |
| Immobilier core | 7 % | 140 M€ | Rendement + diversification |
| Infrastructure | 6 % | 120 M€ | Revenus stables + inflation |
| Liquidités | 2 % | 40 M€ | Réserve opérationnelle |

```
Rendement espéré SAA :
E[Rp] = 0,35×3,5% + 0,10×4,0% + 0,10×4,5% + 0,22×8,0%
       + 0,08×10,0% + 0,07×7,0% + 0,06×6,5% + 0,02×2,5%
      = 1,225% + 0,4% + 0,45% + 1,76% + 0,8% + 0,49% + 0,39% + 0,05%
      = 5,565 %

Volatilité estimée ≈ 7,5 %
Sharpe ≈ (5,565 − 3,5) / 7,5 = 0,275 (cohérent avec le profil LDI)
```

### Exemple 3 — Analyse de scénarios et stress test

Pour valider la SAA, on simule plusieurs scénarios économiques :

| Scénario | Probabilité | Actions | Obligations État | HY | Inflation | Rendement portefeuille |
|----------|------------|---------|-----------------|-----|-----------|----------------------|
| Soft landing | 40 % | +10 % | +2 % | +6 % | 2 % | +5,8 % |
| Récession modérée | 25 % | −15 % | +8 % | −5 % | 1 % | −1,2 % |
| Stagflation | 15 % | −10 % | −5 % | −8 % | 5 % | −3,5 % |
| Reprise forte | 20 % | +20 % | −3 % | +10 % | 3 % | +10,5 % |

```
Rendement espéré pondéré :
E[R] = 0,40×5,8% + 0,25×(−1,2%) + 0,15×(−3,5%) + 0,20×10,5%
     = 2,32% − 0,30% − 0,525% + 2,10%
     = 3,595 % (cohérent avec prudence LDI)

VaR 95 % annuelle ≈ 8–12 % (selon scénario récession/stagflation)
```

---

## Applications professionnelles

### Le processus SAA chez un grand fonds souverain

**Norges Bank Investment Management (NBIM)** — le plus grand fonds souverain du monde (1 700 Md USD) :

```
SAA officielle (2024) :
  70 % Actions mondiales (environ 9 000 entreprises)
  28 % Obligations mondiales
   2 % Immobilier non coté

Gouvernance :
  - Ministère des Finances norvégien fixe la SAA
  - NBIM implémente et gère les déviations tactiques
  - Rapport annuel au Parlement

Benchmark : FTSE All-World (actions) + Bloomberg Barclays Global Aggregate (obligations)
Tracking error autorisée : 1,25 % maximum
Rendement annualisé 1998–2023 : 6,1 %/an en USD
```

### Révision de la SAA en pratique

Une SAA se révise en général tous les 3 à 5 ans, ou lors d'un changement structurel (baisse des taux, choc démographique) :

```
Déclencheurs typiques de révision :
  1. Changement majeur des hypothèses de marché (ex. remontée des taux 2022)
  2. Évolution du passif (changement du régime de retraite)
  3. Changement de gouvernance (nouveau CIO, nouveau conseil)
  4. Choc de marché > 20 % (stress test de la SAA)
  5. Évolution réglementaire (Solvabilité II, IFRS 17)
```

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Utiliser uniquement les rendements historiques** | Les rendements passés sont biaisés par les conditions exceptionnelles | Utiliser la méthode building blocks + scénarios |
| **Négliger les contraintes de liquidité** | Un portefeuille sur-alloué aux illiquidités peut forcer des ventes en crise | Calibrer la contrainte liquidité avant l'optimisation |
| **Ignorer la corrélation actifs-engagements** | Un fonds de pension qui optimise les actifs sans tenir compte des passifs prend un risque caché | Imposer une SAA LDI avec couverture de duration |
| **Réviser la SAA trop fréquemment** | Révisions fréquentes génèrent des coûts et du noise | S'en tenir à la discipline : révision max tous les 3 ans |
| **Sous-estimer les coûts de mise en œuvre** | Les actifs illiquides ont des frais de gestion élevés (PE : 2/20) | Calculer les rendements nets de frais pour la comparaison |
| **Confondre SAA et TAA** | Modifier les poids SAA pour des raisons tactiques court terme | Maintenir la séparation stricte SAA / TAA |

---

## Exercices

### Exercice 1
Un family office dispose de 50 M€ à investir. Son objectif est un rendement nominal de 7 % pour un risque maximum de 10 % de volatilité annuelle. Construire une SAA simplifiée (4 classes d'actifs) en utilisant les hypothèses de rendement suivantes : Actions mondiales 8 %, Obligations IG 4,5 %, Immobilier 7 %, Liquidités 3 %.

> **Correction** :
> Pour un rendement de 7 %, on peut utiliser la combinaison :
> ```
> 60 % Actions (8 %) + 25 % Obligations IG (4,5 %) + 12 % Immobilier (7 %) + 3 % Liquidités (3 %)
>
> E[Rp] = 0,60×8% + 0,25×4,5% + 0,12×7% + 0,03×3%
>       = 4,8% + 1,125% + 0,84% + 0,09%
>       = 6,855 % ≈ 7 % ✓
>
> Estimation de la volatilité (simplification, corrélation actions/obligations = -0,20) :
> σp ≈ 0,60×16% × 0,85 (effet diversification) ≈ 8,2 % < 10 % ✓
> ```
> La SAA est cohérente avec les objectifs.

### Exercice 2
Un fonds de pension a des actifs de 1 Md€ et des engagements d'une valeur actuarielle de 950 M€ (duration 18 ans). Le portefeuille actuel est investi à 40 % en obligations (duration 8 ans) et 60 % en actions. Calculez le taux de couverture et le risque de duration du portefeuille.

> **Correction** :
> ```
> Taux de couverture = 1 000 M€ / 950 M€ = 105,3 %
>
> Duration actifs = 0,40 × 8 + 0,60 × 4 (actions ≈ 4 ans) = 3,2 + 2,4 = 5,6 ans
> Duration engagements = 18 ans
>
> Gap de duration = Duration actifs − Duration engagements
>                 = 5,6 − 18 = −12,4 ans (gap négatif important)
>
> Impact d'une hausse des taux de +1% :
>   Variation actifs ≈ −5,6 % × 1 000 M€ = −56 M€
>   Variation engagements ≈ −18 % × 950 M€ = −171 M€
>
>   Impact net sur le taux de couverture :
>   ΔActifs − ΔPassifs = −56 − (−171) = +115 M€ d'amélioration du surplus
>   → La hausse des taux améliore le taux de couverture ici
>   → Mais si les taux baissent de 1%, le surplus se détériore de 115 M€
> ```

### Exercice 3
Expliquez pourquoi le rééquilibrage d'un portefeuille 60/40 après une forte hausse des actions est assimilé à une stratégie "contra-cyclique" et en quoi il diffère de la gestion active.

> **Correction** :
> Le rééquilibrage **force mécaniquement** la vente des actifs qui ont surperformé (actions après hausse) pour revenir aux poids cibles. Cela revient à "vendre cher et acheter pas cher", ce qui est contra-cyclique.
>
> **Différence avec la gestion active** : le rééquilibrage est une décision purement mécanique basée sur des poids cibles, sans jugement sur les valorisations futures. La gestion active implique un jugement discrétionnaire sur la direction future des marchés.
>
> **Avantage du rééquilibrage** : il génère un léger "rebalancing premium" estimé à 0,3–0,5 %/an sur longue période, tout en maintenant le profil de risque ciblé.
