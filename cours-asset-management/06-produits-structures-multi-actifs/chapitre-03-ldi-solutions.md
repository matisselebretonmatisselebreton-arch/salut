# Chapitre 3 — LDI et Solutions pour Institutionnels

## Introduction

La **gestion actif-passif** (ALM — Asset Liability Management) est la discipline qui vise à gérer un portefeuille d'actifs en tenant compte explicitement des engagements (passifs) de l'investisseur. C'est la problématique centrale des **fonds de pension**, **compagnies d'assurance** et **caisses de retraite**.

L'approche **LDI** (Liability-Driven Investing) met les engagements au cœur de la décision d'investissement plutôt que de se focaliser uniquement sur la performance absolue des actifs.

---

## 1. La gestion actif-passif (ALM)

### 1.1 Le bilan d'un investisseur institutionnel

```
ACTIFS                          PASSIFS
───────────────────────         ───────────────────────
Obligations longues       │     Engagements futurs
Actions                   │     (versements de pensions,
Immobilier                │      rentes viagères, etc.)
Private equity            │
Cash                      │     Fonds propres (surplus)
───────────────────────         ───────────────────────

Taux de couverture = Valeur actifs / Valeur actuarielle des engagements

Taux couverture > 100 % → Surplus (confortable)
Taux couverture < 100 % → Déficit (sous-provisionnement)
```

### 1.2 Les risques ALM

**Risque de taux** : le principal risque ALM. Les engagements de long terme sont actualisés à des taux longs → une baisse des taux fait monter la valeur des engagements plus que celle des actifs (si duration actifs < duration passifs).

```
Impact d'une baisse de taux de 100 pb :
  Duration engagements = 15 ans
  Duration actifs = 5 ans

  ΔValeur engagements ≈ -Duration_eng × ΔTaux × Valeur_eng
                       ≈ +15 × 1 % × 1 000 M€ = +150 M€ (hausse des engagements)
  
  ΔValeur actifs ≈ +5 × 1 % × 900 M€ = +45 M€ (hausse des actifs)
  
  Impact sur le surplus = +45 - 150 = -105 M€ (dégradation du surplus !)
```

**Risque inflation** : beaucoup de régimes de retraite indexent les pensions sur l'inflation → les engagements augmentent si l'inflation surprend à la hausse.

**Risque de longévité** : les retraités vivent plus longtemps qu'anticipé → les engagements dépassent les projections actuarielles.

---

## 2. Le LDI (Liability-Driven Investing)

### 2.1 Principe et objectif

L'approche LDI consiste à **immuniser** le bilan contre les risques ALM (taux, inflation) via des instruments obligataires et dérivés, tout en maintenant un **portefeuille de rendement** (return-seeking portfolio) pour générer de la performance.

```
Portefeuille total = Portefeuille LDI + Portefeuille de rendement

Portefeuille LDI (matching portfolio) :
  → Réplique les flux des engagements (duration longue, indexation inflation)
  → Instruments : obligations souveraines longues, OATi/TIPS, swaps de taux, swaps d'inflation

Portefeuille de rendement (return-seeking portfolio) :
  → Actions, PE, hedge funds, crédit → génère le surplus
  → Géré sans contrainte ALM
```

### 2.2 Immunisation par la duration

**Immunisation simple** : égaliser la duration des actifs à la duration des engagements.

```
Condition d'immunisation :
  Duration actifs = Duration engagements

Mais cette condition seule est insuffisante (immunisation du 1er ordre seulement).
Il faut également :
  Convexité actifs ≥ Convexité engagements (protection contre les grands mouvements)
  Valeur actifs ≥ Valeur engagements (surplus positif)
```

**Cash flow matching** (plus conservateur) : faire correspondre chaque flux de paiement avec un flux d'actif.

```
Exemple : Retraité à payer 1 M€/an pendant 20 ans indexé inflation 2 %.
  Construire un portefeuille d'OATi (obligations indexées inflation) avec des maturités
  correspondant à chaque flux annuel → risque ALM quasi-nul mais coûteux
```

### 2.3 Instruments LDI

**Obligations longues nominales** : OAT 20–50 ans, Bund, Gilt, Treasury. Duration très élevée (15–30 ans).

**Obligations indexées inflation** : OATi (France), Gilts linkers (UK), TIPS (USA). Protection contre l'inflation.

**Swaps de taux** (Interest Rate Swaps — IRS) :
```
Fixed payer swap : l'investisseur paie le taux fixe, reçoit le taux variable (SOFR/€STR)
  → Augmente la duration sans acheter d'obligations longues
  → Très efficace en levier pour le LDI (appel de marge en cas de mouvement de taux)

Exemple :
  Engagement : duration 18 ans, valeur 1 Md€
  Actifs : duration 6 ans, valeur 900 M€
  
  Gap de duration = Eng_dur × Eng_val - Act_dur × Act_val
                  = 18 × 1 000 - 6 × 900 = 18 000 - 5 400 = 12 600 M€.an
  
  Pour combler via IRS à duration 10 ans :
  Notionnel IRS = Gap / Duration_IRS = 12 600 / 10 = 1 260 M€ d'IRS
  → On paie le fixe sur 1 260 M€ d'IRS → duration portée à ~18 ans
```

**Swaps d'inflation** (Inflation Swap) :
- Fixed-to-floating inflation : l'investisseur reçoit l'inflation réalisée, paie un taux fixe
- Protège contre une hausse de l'inflation supérieure aux anticipations

### 2.4 LDI overlay

Le **LDI overlay** permet d'augmenter la duration du portefeuille **sans modifier les actifs physiques**. La société de gestion ajoute une couche de dérivés (IRS, swaps d'inflation) par-dessus le portefeuille existant.

```
Portefeuille physique (inchangé) :
  60 % Actions + 40 % Obligations courtes → Duration 3 ans, AUM 1 Md€

Overlay IRS (payer fixe, recevoir variable) :
  Notionnel 2 Md€, Duration IRS = 8 ans → contribution = 16 ans
  
Duration totale (physique + overlay) = 3 + 2000/1000 × 8 = 3 + 16 = 19 ans ✓
```

---

## 3. Solvabilité II et contraintes pour les assureurs

### 3.1 Cadre réglementaire

**Solvabilité II** (en vigueur depuis 2016 pour les assureurs européens) impose des exigences de capital en fonction des risques pris.

**Calcul du SCR (Solvency Capital Requirement)** :
```
SCR = Capital requis pour couvrir une perte avec probabilité 99,5 % sur 1 an
    = Equivalent à une VaR à 99,5 % des fonds propres

SCR actions monde = 39 % de l'exposition nette en actions (stress) 
SCR PE = 49 % → forte pénalité pour le PE
SCR obligations Etat UE = 0 % (aucun capital requis pour OAT, Bund)
SCR obligations Etat hors UE = selon duration × stress de spread
```

**Impact sur l'allocation** : Solvabilité II rend le private equity et les actions très coûteux en capital. Les assureurs sur-allouent aux obligations souveraines (SCR = 0) et crédit IG (SCR faible).

**Ratio de solvabilité** :
```
Ratio = Fonds propres éligibles / SCR
Minimum réglementaire : 100 %
Cible des assureurs : 150–200 %
```

---

## 4. Approfondissement théorique

### Le "duration matching" n'est pas une solution parfaite

L'immunisation par la duration (Fisher & Weil, 1971) est basée sur une hypothèse de **déplacement parallèle** de la courbe des taux. En pratique :

1. **Déformations non-parallèles** : steepening, flattening, butterfly changent la valeur des actifs et passifs différemment selon leur structure de flux.

2. **Convexité** : même si la duration est égalisée, un grand mouvement de taux peut créer un écart si la convexité des actifs ≠ convexité des passifs.

3. **Stochastique des taux** : les modèles modernes (Vasicek, Hull-White, Heath-Jarrow-Morton) modélisent l'évolution aléatoire des taux et permettent de calculer le risque ALM avec Monte Carlo.

**Solution pratique** : utiliser une **analyse des vecteurs clés de taux** (Key Rate Durations — KRD) :
- Calculer la sensibilité aux taux 2, 5, 10, 20, 30 ans séparément
- Immuniser chaque point de la courbe indépendamment
- Plus précis que la duration unique mais plus complexe à gérer

---

## Exemples numériques

### Exemple 1 — Taux de couverture et impact des taux

Un fonds de pension (données simplifiées) :
- Actifs : 1 000 M€ en obligations (duration 5 ans)
- Engagements : 950 M€ actualisés à 3 % (duration 12 ans)
- Taux de couverture initial : 1 000/950 = 105,3 %

Les taux baissent de 200 pb (3 % → 1 %) :

```
Variation valeur actifs = +5 × 2 % × 1 000 = +100 M€ → Actifs = 1 100 M€
Variation valeur engagements = +12 × 2 % × 950 = +228 M€ → Engagements = 1 178 M€

Nouveau taux de couverture = 1 100 / 1 178 = 93,4 % (déficit !)

Solution LDI :
  Ajouter IRS (duration 10 ans) sur notionnel 950 M€
  Contribution IRS à la duration : 10 × 950 / 1 000 = 9,5 ans
  Duration totale du portefeuille : 5 + 9,5 = 14,5 ans ≈ Duration engagements (12 ans)
  
  Après LDI, impact baisse taux 200 pb :
  Variation actifs (avec IRS) = +(5 + 9,5) × 2 % × 1 000 = +290 M€ → 1 290 M€
  Variation engagements = +228 M€ → 1 178 M€
  Taux de couverture = 1 290/1 178 = 109,5 % (préservé !)
```

### Exemple 2 — Cash flow matching

Un fonds de pension doit verser les pensions suivantes (M€) :
- An 1 : 10 M€
- An 2 : 12 M€
- An 3 : 11 M€
- An 4 : 13 M€
- An 5 : 10 M€ + remboursement final 150 M€

Pour matcher les flux, il investit dans des obligations à coupon zéro aux maturités correspondantes :

```
Taux zéro coupon : 3 % (1 an), 3,2 % (2 ans), 3,4 % (3 ans), 3,5 % (4 ans), 3,6 % (5 ans)

Prix des ZC :
  An 1 : 10 / 1,03 = 9,71 M€
  An 2 : 12 / (1,032)² = 11,26 M€
  An 3 : 11 / (1,034)³ = 9,96 M€
  An 4 : 13 / (1,035)⁴ = 11,33 M€
  An 5 : 160 / (1,036)⁵ = 133,46 M€

Coût total du matching portfolio = 9,71 + 11,26 + 9,96 + 11,33 + 133,46 = 175,72 M€

Ce portefeuille est parfaitement immunisé : quelles que soient les variations de taux,
les flux sont garantis → risque ALM zéro (mais coût d'investissement élevé)
```

---

## Applications professionnelles

### Gestion d'un fonds de pension paritaire (PERCO/PEROB)

**Contexte** : PEROB (Plan d'Épargne Retraite Obligatoire), un régime de retraite supplémentaire d'entreprise.

**Structure typique** :
```
Actifs : 500 M€
  50 % LDI (matching) : OAT longues, OATi, IRS
  30 % Return-seeking : Actions monde, PE
  20 % Diversification : HY, EM, Infrastructure

Engagements : 480 M€ (actualisés)
  → Duration 14 ans, dont 30 % indexés inflation

Taux de couverture : 104 %
Surplus : 20 M€

Stratégie :
  1. LDI protège le taux de couverture contre les variations de taux et d'inflation
  2. Return-seeking cherche à faire croître le surplus (améliorer TC au-dessus de 100 %)
  3. Trigger strategy : si TC tombe sous 100 %, augmenter automatiquement l'allocation LDI
     Si TC monte au-dessus de 115 %, relâcher contrainte LDI, allouer plus au return-seeking
```

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Sous-estimer la duration des engagements** | La duration des pensions peut être 20–30 ans → très longue | Utiliser des projections actuarielles détaillées |
| **Ignorer le risque de longévité** | Si les retraités vivent 5 ans de plus que prévu → déficit massif | Souscrire des contrats de réassurance longévité |
| **LDI uniquement en produits physiques** | Les obligations longues sont rares et chères | Utiliser les swaps de taux comme overlay → plus efficace |
| **Négliger les appels de marge LDI** | En 2022, la hausse des taux a généré des appels de marge massifs sur les swaps (UK LDI crisis) | Maintenir une réserve de liquidité suffisante et des seuils de variation margin |

---

## Exercices

### Exercice 1
Un assureur a des engagements de 500 M€ de duration 15 ans. Ses actifs valent 450 M€ de duration 4 ans. Calculez le gap de duration et le notionnel d'IRS (duration 10 ans) nécessaire pour immuniser le portefeuille.

> **Correction** :
> Duration actuelle des actifs (en termes de sensitivity) = 4 ans × 450 M€ = 1 800 M€.an
> Duration cible des actifs pour matcher les engagements = 15 ans × 450 M€ = 6 750 M€.an
> Gap = 6 750 - 1 800 = 4 950 M€.an
>
> Notionnel IRS (duration 10 ans) = 4 950 / 10 = **495 M€**
>
> Vérification : Duration totale = (1 800 + 495×10) / 450 = (1 800 + 4 950) / 450 = 6 750 / 450 = **15 ans** ✓

### Exercice 2
Expliquez la "LDI Crisis" britannique d'octobre 2022 et les leçons à en tirer pour la gestion ALM.

> **Correction** :
> En septembre-octobre 2022, les taux britanniques ont augmenté brutalement (+2 % en quelques jours) suite au "mini-budget" Truss-Kwarteng. Les fonds de pension britanniques avaient massivement recours aux LDI avec effet de levier via des IRS (position payer fixe).
>
> **Mécanisme de crise** :
> - Taux montent → les IRS (payer fixe) enregistrent des pertes mark-to-market
> - Appels de marge massifs et immédiats des chambres de compensation
> - Pour financer les marges, les fonds vendent des actifs liquides → gilts longues
> - Vente de gilts → taux montent encore → nouvelles pertes → nouveaux appels → cercle vicieux
> - Intervention d'urgence de la Banque d'Angleterre pour casser la boucle
>
> **Leçons** :
> 1. Maintenir un **coussin de liquidité** suffisant (minimum 10–15 % des actifs en actifs très liquides)
> 2. Tester les appels de marge dans des scénarios extrêmes (+300, +500 pb)
> 3. Limiter l'effet de levier dans les programmes LDI
> 4. Diversifier les instruments LDI (mix obligations physiques + dérivés)
> 5. Établir des accords de **financement d'urgence** (backup liquidity lines) avec les banques
