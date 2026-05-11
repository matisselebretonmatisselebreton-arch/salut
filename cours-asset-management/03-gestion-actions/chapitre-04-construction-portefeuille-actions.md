# Chapitre 4 — Construction et Gestion d'un Portefeuille Actions

## Introduction

La **construction de portefeuille** est l'étape qui transforme les convictions d'investissement (analyses fondamentales, signaux quantitatifs, vues macro) en un portefeuille concret, gérable et conforme aux contraintes institutionnelles. C'est un exercice d'optimisation multi-contraintes qui réconcilie l'alpha attendu avec les risques, les coûts et les exigences réglementaires.

Un portefeuille bien construit maximise l'exploitation des convictions tout en restant dans les limites du mandat.

---

## 1. Le cadre de construction : mandat et contraintes

### 1.1 Structure d'un mandat actions

```
Mandat type (Long-Only, actions mondiales, gérant actif) :

OBJECTIF :
  Surperformer le MSCI World de +2 % par an net de frais
  sur un horizon de 3–5 ans

BENCHMARK : MSCI World (1 600 titres, 23 pays développés)

CONTRAINTES :
  Tracking Error : 2–4 % annualisée
  Taille de position max par émetteur : 5 % du portefeuille
  Taille de position max vs. benchmark : benchmark ± 4 %
  Liquidité : chaque ligne doit être liquidable en 5 jours (max 15 % du volume journalier)
  Turnover max : 60 %/an (aller simple)
  ESG : exclusion des secteurs tabac, armements controversés, charbon >25 % CA
  Cash : max 5 %
```

### 1.2 Les contraintes types et leur impact

| Contrainte | Rationale | Impact sur le portefeuille |
|-----------|---------|--------------------------|
| **Tracking Error max** | Limite le risque actif vs. benchmark | Borne les écarts de pondération |
| **Position max** | Concentration / régulation | Limite les paris de conviction |
| **Liquidité min** | Possibilité de liquider rapidement | Exclut les small/micro caps illiquides |
| **Turnover max** | Coûts de transaction | Limite les rotations fréquentes |
| **Secteurs** | Diversification / réglementaires | Borne les paris sectoriels |
| **Pays** | Diversification géographique | Évite la sur-concentration pays |
| **Devises** | Risque de change pour les fonds en EUR | Peut imposer une couverture partielle |

---

## 2. Mesures du risque actif

### 2.1 La tracking error (TE)

```
Tracking Error (annualisée) :
  TE = σ(Rp − Rbenchmark) = √[Var(Rp − Rbenchmark)]

Décomposition de la TE² :
  TE² = (w_p − w_b)ᵀ × Σ × (w_p − w_b)

  Où :
    w_p : vecteur des poids du portefeuille
    w_b : vecteur des poids du benchmark
    Σ   : matrice de variance-covariance

Règle de Grinold pour la TE cible :
  TE = IR × σ_α  (si on cible un IR donné)
  
  Pour IR = 0,5 et σ_α ≈ TE :
  → C'est circulaire. En pratique, la TE est imposée par le mandat.
```

### 2.2 Décomposition de la contribution au risque actif

```
Contribution au risque actif (Active Risk Contribution) :
  ARC_i = (w_p_i − w_b_i) × (Σ × (w_p − w_b))_i / TE

Contribution relative au risque actif (%ARC) :
  %ARC_i = ARC_i / TE

Pour un portefeuille équilibré en risque actif :
  %ARC doit être proportionnel à la conviction sur chaque titre

Exemple :
  Titre LVMH (overweight +3 %) : %ARC = 8 % (forte conviction)
  Titre Total (neutral, 0 %) : %ARC = 0 %
  Titre Volkswagen (underweight -2 %) : %ARC = 5 % (conviction baissière)
```

---

## 3. Les structures de portefeuille

### 3.1 Gestion long-only active (actif pur)

```
Long-Only Active :
  wᵢ ≥ 0  pour tous les titres
  Σ wᵢ = 1

  Caractéristiques :
  - Benchmark = MSCI World (ou indice régional)
  - Active share = 40–80 % (mesure l'écart vs. benchmark)
  - TE = 1–5 %
  - Frais typiques = 0,5–1,5 %/an
  
Active Share :
  AS = (1/2) × Σᵢ |w_p_i − w_b_i|  (somme des écarts absolus / 2)
  
  AS = 100 % → aucun titre en commun avec le benchmark
  AS = 0 % → réplication parfaite du benchmark
  AS > 60 % → "High conviction active manager"
  AS < 20 % → "Closet indexer" (actif déguisé en passif)
```

### 3.2 Stratégie 130/30

```
130/30 (Enhanced Active) :
  Positions longues : 130 % du portefeuille
  Positions courtes : -30 % du portefeuille
  Exposition nette : 130 % − 30 % = 100 % (neutre en marché)

  Avantage : utilise les convictions négatives (les titres que le gérant
  croit sous-performants), ce qui n'est pas possible en long-only
  
  Exemple :
  Long ASML (conviction forte positive) : +5 % du portefeuille
  Short Volkswagen (conviction négative) : -3 % du portefeuille
  
  Règle de construction :
    Générer les positions courtes à partir des signaux négatifs les plus forts
    (signaux value, quality, momentum inversés)
    
  Performance attendue vs. long-only :
    +0,5 à +1,5 %/an d'alpha supplémentaire (utilisation des shorts)
    TE légèrement supérieure (+0,5–1 %)
```

### 3.3 Stratégie market neutral

```
Market Neutral :
  βp = 0 (exposition marché nulle)
  Exposition nette long − short ≈ 0 %
  
  Structure typique :
    Long 100 % → titres surpondérés vs. short 100 % → titres sous-pondérés
    Ou : Long 50 % + Short 50 % (notionnels)
  
  Profil rendement/risque :
    Rendement : alpha pur (sans prime de marché)
    Risque : risque idiosyncratique uniquement
    Sharpe attendu : 0,5–1,5 (si bon modèle alpha)
    
  Frais : 2/20 (hedge funds) ou 0,5–1 % (versions institutionnelles)
  
  Convient pour :
    - Fonds de pension voulant une source de diversification décorrélée du marché
    - Multi-strategy hedge funds
```

### 3.4 Comparaison des structures

| Structure | Exposition marché | TE | Active Share | Frais | Alpha pur |
|-----------|------------------|-----|--------------|-------|-----------|
| **Long-only passif (ETF)** | 100 % (β=1) | 0 % | 0 % | 0,05–0,20 % | 0 |
| **Long-only actif** | 100 % (β≈1) | 1–5 % | 40–80 % | 0,5–1,5 % | Partiel |
| **130/30** | 100 % (β≈1) | 2–6 % | 60–90 % | 0,8–1,5 % | Amélioré |
| **Market neutral** | 0 % (β=0) | ≈ 5–10 % | 100 % | 1–2 % | Pur |
| **Long/short hedge fund** | 30–60 % (β=0,3–0,6) | Variable | 100 % | 2/20 | Pur+ |

---

## 4. Construction du portefeuille par conviction

### 4.1 Le processus de sizing des positions

```
Taille optimale d'une position (Kelly Criterion adapté) :
  w_i* = α_i / (λ × σ²_ε_i)

  α_i : alpha attendu sur le titre i
  σ²_ε_i : variance idiosyncratique du titre i
  λ : coefficient d'aversion au risque idiosyncratique

Taille pratique (contraintes appliquées) :
  w_i = min(w_i*, wᵢ_max) × (conviction_i / Σ conviction)
  
  Règle des tiers (gérant de conviction) :
    Tier 1 — Conviction maximale (alpha > 20 %) : 4–5 % du portefeuille
    Tier 2 — Conviction forte (alpha 10–20 %) : 2–4 %
    Tier 3 — Conviction standard (alpha 5–10 %) : 1–2 %
    Tier 4 — Positions de diversification (alpha < 5 %) : 0,5–1 %
```

### 4.2 Concentration vs. diversification

```
Portefeuille concentré (20–40 titres) :
  Avantages :
    - Plein impact de chaque idée d'investissement
    - Meilleure connaissance de chaque position
    - Potentiellement higher alpha (si bonnes idées)
  Inconvénients :
    - Risque idiosyncratique élevé (une faillite = -5% du portefeuille)
    - TE élevée (4–8 %)
    - Difficile à justifier institutionnellement

Portefeuille diversifié (60–150 titres) :
  Avantages :
    - Risque idiosyncratique réduit
    - TE plus modérée (2–4 %)
    - Plus adapté aux contraintes institutionnelles
  Inconvénients :
    - Dilution de l'alpha (les meilleures idées sont "noyées")
    - Plus difficile à gérer et monitorer
    - Risque de "closet indexing"

Règle de Mauboussin :
  Au-delà de 40–50 positions, les bénéfices marginaux de diversification
  idiosyncratique sont quasi-nuls (loi de la diversification de Markowitz).
  Les positions 51+ ne diminuent presque plus le risque spécifique.
```

---

## 5. Contraintes ESG et impact sur la construction

### 5.1 Intégration ESG dans un portefeuille actions

```
Types d'approches ESG :

1. Exclusion (screening négatif) :
   Exclure certains secteurs/émetteurs de l'univers investissable
   Impact : réduit l'univers, légère hausse de la TE
   
2. ESG Tilt (scoring positif) :
   Surpondérer les titres à haut score ESG, sous-pondérer les mauvais
   Impact : impose une contrainte supplémentaire sur le portefeuille
   
3. Engagement (stewardship) :
   Dialogue avec les entreprises, vote aux AG
   Impact : pas de contrainte directe sur les poids
   
4. Impact Investing :
   Allocation vers des entreprises/projets à impact positif mesurable
   Impact : univers très restreint, TE très élevée
   
5. Alignement climatique (Paris Agreement) :
   Réduire l'intensité carbone du portefeuille de X %/an
   Contrainte : ΣᵢwᵢCO₂ᵢ ≤ seuil_cible × (1 − décroissance)ᵗ
```

### 5.2 Impact des exclusions ESG sur la frontière efficiente

```
Etude de cas : exclusion du secteur tabac (2–3 % du MSCI World) :

Impact théorique :
  Perte de diversification : légère (tabac a une corrélation faible avec techno)
  Réduction de l'alpha potentiel : faible (tabac n'est pas le secteur avec le plus
    d'opportunités)
  
Étude empirique (Derwall et al., 2005 ; Renneboog et al., 2008) :
  Coût de l'exclusion tabac : 0,0 à 0,2 %/an de rendement en moins
  Coût des exclusions multiples (tabac + charbon + armes) : 0,1–0,4 %/an

Contrainte carbone (intensité CO₂) :
  Contrainte : Intensité_portefeuille ≤ 50 % de l'intensité benchmark
  
  Impact : ±1–2 % de TE supplémentaire
  Secteurs exclus/sous-pondérés : utilities, matériaux de base, énergie
  Secteurs surpondérés : technologie, santé, services financiers
```

---

## 6. Rééquilibrage et coûts de transaction

### 6.1 Stratégies de rééquilibrage

```
Rééquilibrage calendaire :
  Mensuel ou trimestriel → activer des ordres à date fixe
  Pro : simple à implémenter
  Con : peut générer des transactions inutiles si peu de dérive

Rééquilibrage par seuils (trigger-based) :
  Rééquilibrer si w_i s'écarte de > δ de son poids cible
  δ = seuil de déclenchement (ex : ±0,5 % par titre, ±2 % par secteur)
  Pro : coûts réduits
  Con : monitoring plus complexe

Rééquilibrage optimal avec pénalité de coût :
  min ||w_actuel − w_cible||² s.c. Coûts_transaction ≤ Budget_coût
  → Trouver le portefeuille le plus proche du cible sous contrainte de budget
```

### 6.2 Modélisation des coûts de transaction

```
Coûts de transaction complets :
  CT = Spread bid-ask / 2 + Impact de marché + Frais de courtage + Taxe
  
  Pour une action mid-cap (MSCI Europe, 3 Md€ de capitalisation) :
    Spread bid-ask : 0,08 %
    Frais courtage : 0,03 %
    Taxe sur transactions financières (France) : 0,30 % (>1 Md€ cap)
    Impact de marché (1 % du volume journalier) : 0,15–0,30 %
    
    Total aller : 0,08/2 + 0,03 + 0,30 + 0,20 = 0,57 %
    Total aller-retour : ~1,0–1,2 %
    
  Pour une action large-cap (S&P 500, 100 Md€+ capitalisation) :
    Spread bid-ask : 0,01–0,02 %
    Frais courtage : 0,01–0,02 %
    Impact de marché : 0,05–0,10 %
    
    Total aller : ~0,08–0,14 %
    Total aller-retour : 0,15–0,30 %
```

---

## Approfondissement théorique

### L'Active Share et la performance (Cremers & Petajisto, 2009)

```
Cremers & Petajisto (2009) montrent que l'Active Share prédit la surperformance :

  AS > 60 % ("High Active Share") : +1,2 % à +2,6 %/an en moyenne vs. benchmark
  AS 40–60 % ("Closet indexers") : sous-performance de 0,0 à 0,3 %/an
  AS < 40 % ("Index-like") : sous-performance de 0,5 à 1,5 %/an (après frais)

Nuance (Frazzini, Friedman & Pomorski, 2016) :
  Une fois ajustés pour la liquidité et les coûts de transaction,
  les avantages du high Active Share sont moins évidents.
  
  Les gérants avec AS élevé gèrent plus souvent des petites caps (less liquid) →
  risque de style, pas uniquement compétence.
```

### Le modèle d'analyse d'attribution de Brinson-Hood-Beebower

```
Modèle d'attribution de performance (Brinson, 1986) :

  Performance = Allocation + Sélection + Interaction

  Effet d'Allocation (au niveau secteur/pays) :
    AA_s = (w_p_s − w_b_s) × (R_b_s − R_b_total)
    
    → Bénéfice de surpondérer/sous-pondérer des secteurs

  Effet de Sélection :
    SS_s = w_b_s × (R_p_s − R_b_s)
    
    → Performance liée au choix de titres dans chaque secteur

  Effet d'Interaction :
    IS_s = (w_p_s − w_b_s) × (R_p_s − R_b_s)
    
    → Interaction entre déviations de poids ET de performance

  Performance totale vs. benchmark = Σ_s (AA_s + SS_s + IS_s)
```

---

## Exemples numériques

### Exemple 1 — Construction d'un portefeuille concentré avec contraintes TE

**Mandat** : 40 titres, benchmark CAC 40, TE cible 4 %, Active Share ~70 %.

```
Étape 1 — Génération des convictions :
  15 titres HIGH conviction (alpha estimé >15 %) : positions 3–5 %
  15 titres MEDIUM conviction (alpha 8–15 %) : positions 1,5–3 %
  10 titres LOW conviction (hedge/benchmark aware) : positions 0,5–1,5 %
  
  Titres totaux en portefeuille : 40

Étape 2 — Calcul des poids cibles :
  [Exemple simplifié sur 5 titres représentatifs]
  
  Titre          | Poids CAC40 | Conviction | Poids cible
  --------------|-------------|------------|------------
  LVMH          | 12,0 %      | HIGH (+15%) | 16,0 % (+4%)
  Total Energies| 7,5 %       | LOW (neutre)| 7,0 % (-0,5%)
  Airbus        | 6,0 %       | HIGH (+20%) | 9,5 % (+3,5%)
  BNP Paribas   | 4,5 %       | MEDIUM     | 6,0 % (+1,5%)
  Dassault Syst.| 3,0 %       | HIGH (+18%) | 5,0 % (+2%)
  [...]

Étape 3 — Vérification TE et Active Share :
  TE estimée (modèle Barra) : 3,8 % → dans le budget ✓
  Active Share = 0,5 × Σ|w_p_i − w_b_i| ≈ 68 % → haute conviction ✓
  
  Concentration : 5 premières positions = 43,5 % (acceptable pour 40 titres)
  
Étape 4 — Contraintes ESG :
  Exclusions appliquées : pétrole sables bitumineux → néant dans le CAC 40
  Score ESG moyen portefeuille : 7,2 / 10 (vs. 6,5 pour le CAC 40) ✓
```

### Exemple 2 — Attribution de performance BHB

**Fonds Actions Europe** vs. MSCI Europe (données trimestrielles fictives) :

```
Données :

Secteur      | Poids fonds | Poids bench | Rend. fonds | Rend. bench
-------------|-------------|-------------|-------------|-------------
Technologie  | 22 %        | 17 %        | +8 %        | +6 %
Finance      | 18 %        | 18 %        | +4 %        | +5 %
Santé        | 16 %        | 14 %        | +7 %        | +7 %
Industrie    | 14 %        | 15 %        | +5 %        | +4 %
Consommation | 10 %        | 12 %        | +6 %        | +6 %
Autres       | 20 %        | 24 %        | +3 %        | +4 %
TOTAL        | 100 %       | 100 %       |             |

Performance benchmark = 0,17×6% + 0,18×5% + 0,14×7% + 0,15×4% + 0,12×6% + 0,24×4%
                      = 1,02 + 0,90 + 0,98 + 0,60 + 0,72 + 0,96 = 5,18 %

Performance fonds = 0,22×8% + 0,18×4% + 0,16×7% + 0,14×5% + 0,10×6% + 0,20×3%
                  = 1,76 + 0,72 + 1,12 + 0,70 + 0,60 + 0,60 = 5,50 %

Surperformance totale = 5,50% − 5,18% = +0,32%

Attribution BHB :
  Effet Allocation (Techno) = (22%−17%) × (6%−5,18%) = 5% × 0,82% = +0,041%
  Effet Allocation (Finance) = (18%−18%) × (5%−5,18%) = 0% × ... = 0%
  Effet Allocation (Industrie) = (14%−15%) × (4%−5,18%) = -1% × -1,18% = +0,012%
  [...]
  Total Effet Allocation ≈ +0,09%
  
  Effet Sélection (Techno) = 17% × (8%−6%) = 17% × 2% = +0,34%
  Effet Sélection (Finance) = 18% × (4%−5%) = 18% × -1% = -0,18%
  [...]
  Total Effet Sélection ≈ +0,18%
  
  Effet Interaction ≈ +0,05%
  
  Total = 0,09% + 0,18% + 0,05% = +0,32% ✓
  
  Conclusion : la surperformance vient principalement de la sélection en Technologie (+0,34%).
```

### Exemple 3 — Impact du rééquilibrage sur le portefeuille

**Portefeuille initial** : 100 M€, poids cibles définis, dérives observées après 3 mois.

```
Titre      | Poids cible | Poids actuel | Dérive    | Montant à traiter
-----------|-------------|-------------|-----------|------------------
ASML       | 5,0 %       | 6,2 %       | +1,2 %    | Vendre 1,2 M€
SAP        | 4,0 %       | 4,8 %       | +0,8 %    | Vendre 0,8 M€
Novo Nordisk| 3,5 %      | 4,2 %       | +0,7 %    | Vendre 0,7 M€
Siemens    | 3,0 %       | 2,4 %       | -0,6 %    | Acheter 0,6 M€
Stellantis | 2,0 %       | 1,3 %       | -0,7 %    | Acheter 0,7 M€

Stratégie rééquilibrage complet (seuil = ±0,5 %) :
  Total achats = 1,3 M€, Total ventes = 2,7 M€ (différence = variation liquidités)
  Coût aller-retour (large cap, 0,25 %) : (1,3 + 2,7) / 2 × 0,25 % = 0,005 M€ = 5 000 €
  
Stratégie rééquilibrage partiel (seuil = ±1 %) :
  Seul ASML déclenche (dérive = +1,2 % > 1 %) : Vendre 1,2 M€
  Coût : 1,2 M€ × 0,25 % = 3 000 € → économie de 2 000 € vs. rééquilibrage complet

Analyse coût-bénéfice :
  Rééquilibrage complet améliore la conformité au poids cibles → TE réduite de 0,1–0,2 %
  Économie de coûts du rééquilibrage partiel : 2 000 €
  Impact de la dérive sur la TE : négligeable pour des dérives < 1 %
  
  Conclusion : rééquilibrage partiel (seuil ±1 %) est optimal ici.
```

---

## Applications professionnelles

### Gestion d'un mandat institutionnel de 500 M€

**Contexte** : gérant d'actifs mandaté par un fonds de pension pour un portefeuille Actions Monde.

```
Structure du mandat :
  Taille : 500 M€
  Benchmark : MSCI World (EUR hedged)
  TE max : 3 %
  Frais : 0,55 %/an
  Performance target : benchmark + 2 %/an net de frais

Processus :
  1. Comité d'investissement mensuel
     → Validation des 5 thèmes sectoriels (conviction top-down)
     → Revue des 10 plus fortes convictions bottom-up
     
  2. Portefeuille : 75 titres
     - Core (50 titres) : positions 0,5–3 %, suivi fondamental léger
     - High Conviction (20 titres) : positions 3–5 %, suivi mensuel détaillé
     - Hedge/Views (5 titres) : expression de vues macro/sectorielles
     
  3. Gestion quotidienne :
     - Monitoring TE (alert si TE > 2,8 %)
     - Monitoring liquidité (alert si > 15 % du volume journalier)
     - Ordres de rééquilibrage si dérive > 0,75 %

  4. Reporting trimestriel au client :
     - Performance vs. benchmark avec attribution BHB
     - Evolution du profil risque (TE, beta, factor exposures)
     - Narrative : justification des 5 meilleures et 5 pires contributions
```

### Dialogue avec le risk manager

```
Points de contrôle risk management :
  
  Risque de concentration :
    Alert si une position dépasse 5 % du portefeuille
    Alert si les 10 premières positions > 50 % du portefeuille
  
  Risque de liquidité :
    Alert si une position > 15 % du volume journalier moyen sur 20 jours
    Stress test : "Combien de jours pour liquider le portefeuille en cas de crise ?"
    
  Risque de style involontaire :
    Monthly : exposition aux facteurs value, momentum, size, quality via BARRA
    Alert si β_value > 0,3 ou β_momentum > 0,3 (non intentionnel)
    
  Risque sectoriel :
    Alert si déviation sectorielle vs. benchmark > 10 %
    
  Risque géographique :
    Exposition USD pour un fonds EUR : si > 50 % du portfeuille non hedgé → alert
```

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Closet indexing** | Active share < 40 % pour une gestion facturée en "active" | Vérifier l'Active Share régulièrement et assumer ses convictions |
| **Concentration involontaire sur un facteur** | Toutes les convictions sont des value stocks → beta value = 0,6 | Analyser les expositions factorielles du portefeuille complet |
| **Sous-estimer la liquidité sous stress** | Une position "liquide" en temps normal peut être illiquide en crise | Backtester la liquidité dans les pires marchés (2008, 2020) |
| **Négliger les effets de change** | Un portefeuille Monde à 60% USD dans un fonds EUR non-hedgé | Décider explicitement de la politique de couverture devise |
| **Rééquilibrage à contre-tendance excessif** | Vendre systématiquement les gagnants et acheter les perdants sans réévaluer la thèse | Distinguer le rééquilibrage mécanique de la révision de thèse |
| **Ignorer les contraintes ESG dans l'optimisation** | Ajouter des exclusions a posteriori génère des inefficiences | Intégrer les contraintes ESG dès l'optimisation initiale |

---

## Exercices

### Exercice 1
Un portefeuille de 200 M€ a un Active Share de 65 % vs. son benchmark (MSCI Europe). La TE est de 3,5 %. Le gérant a produit un rendement de +8,5 % contre +7,0 % pour le benchmark sur un an. rf = 3 %. Calculez le ratio d'information et le t-stat de la surperformance, et dites si la surperformance est statistiquement significative.

> **Correction** :
> ```
> Rendement actif = 8,5 % − 7,0 % = +1,5 %
> Ratio d'Information = Rendement actif / TE = 1,5 % / 3,5 % = 0,43
>
> t-statistic (pour 1 an de données → 12 observations mensuelles) :
>   Rendement actif mensuel = 1,5 % / 12 = 0,125 %
>   TE mensuelle = 3,5 % / √12 = 1,01 %
>   t-stat = 0,125 / (1,01 / √12) = 0,125 / 0,291 = 0,43
>
> Avec seulement 1 an de données, t-stat = 0,43 n'est PAS significatif
> (seuil de 5 % : t > 1,96)
>
> Pour la significativité, il faudrait :
>   t > 1,96 → IR × √N_années > 1,96 → N > (1,96 / 0,43)² = 20,7 ans !
>
> Conclusion : 1 an de track record est insuffisant pour conclure.
> Il faut minimum 3–5 ans pour commencer à valider la compétence.
> ```

### Exercice 2
Un gérant gère un portefeuille 130/30 avec les positions suivantes : Long TOTAL (+2 %) + Long CAPGEMINI (+3 %) au-delà des poids benchmark, Short RENAULT (-1,5 %) + Short EDF (-1,5 %). TOTAL et EDF ont une corrélation de +0,4. Calculez l'exposition nette et estimez la contribution de la stratégie short au risque actif total (σ_RENAULT=25 %, σ_EDF=30 %, ρ_Renault,EDF=0,3).

> **Correction** :
> ```
> Exposition nette :
>   Longs actifs : +2% (Total) + 3% (Capgemini) = +5%
>   Shorts actifs : -1,5% (Renault) -1,5% (EDF) = -3%
>   Exposition nette 130/30 = 100% (benchmark) + 5% - 3% = 102% (légèrement long)
>
> Contribution des shorts au risque actif :
>   Variance des shorts = (−1,5%)²×(25%)² + (−1,5%)²×(30%)² + 2×(−1,5%)×(−1,5%)×0,3×25%×30%
>                       = 0,0001406 + 0,000203 + 0,0000844
>                       = 0,0004280
>   σ_shorts = √0,000428 = 2,07 %
>
>   Contribution en % de la TE totale (si TE total = 4%) :
>   Contribution shorts ≈ 2,07 % / 4 % = 51,8 % du risque actif
>
> Corrélation Total-EDF (+0,4) :
>   Impact de la corrélation (long Total / short EDF crée un risque long-short) :
>   Σ_TE long/short = +2% × (-1,5%) × 0,4 × σ_Total × σ_EDF / TE²
>   = (-3%) × 0,4 × σ_Total × 30% / TE²
>   (terme déstabilisateur car la corrélation + entre long et short amplifie le risque)
> ```

### Exercice 3
Un gérant doit décider entre un portefeuille concentré (25 titres, TE=5 %, Active Share=75 %, coûts=1,2 %/an) et un portefeuille diversifié (80 titres, TE=2,5 %, Active Share=45 %, coûts=0,7 %/an). Quel est le ratio d'information "break-even" que doit réaliser le gérant concentré pour justifier son approche ?

> **Correction** :
> ```
> Rendement actif net = IR × TE − Frais
>
> Portefeuille diversifié (IR_div = ?) :
>   Rendement net_div = IR_div × 2,5% − 0,7%
>
> Portefeuille concentré (IR_conc = ?) :
>   Rendement net_conc = IR_conc × 5% − 1,2%
>
> Break-even : les deux approches ont le même rendement net.
> Mais si on suppose que le gérant diversifié a un IR = 0,4 (typique) :
>   Rendement net_div = 0,4 × 2,5% − 0,7% = 1,0% − 0,7% = +0,3%
>
> Pour que le concentré égale le diversifié :
>   IR_conc × 5% − 1,2% = 0,3%
>   IR_conc × 5% = 1,5%
>   IR_conc = 0,30
>
> Le gérant concentré a besoin d'un IR d'au moins 0,30 pour être aussi performant
> que le gérant diversifié (IR = 0,40).
>
> Mais si le gérant concentré a genuinement plus de conviction (IC plus élevé)
> et un IR > 0,50, son approche est clairement supérieure :
>   Rendement net = 0,50 × 5% − 1,2% = 2,5% − 1,2% = +1,3% vs. +0,3%
>
> L'approche concentrée ne vaut que si le gérant a une vraie compétence de sélection.
> ```
