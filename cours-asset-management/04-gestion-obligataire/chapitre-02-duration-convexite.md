# Chapitre 2 — Duration, Convexité et Sensibilité aux Taux

## Introduction

La **duration** est la mesure centrale du risque de taux en gestion obligataire. Elle quantifie la sensibilité du prix d'une obligation (ou d'un portefeuille) aux variations des taux d'intérêt. Maîtriser la duration et la convexité est fondamental pour tout gérant obligataire : c'est la base du positionnement tactique sur la courbe, de l'immunisation des fonds de pension et du hedging de taux.

---

## 1. La Duration de Macaulay

### 1.1 Définition intuitive

La duration de Macaulay mesure la **durée de vie moyenne pondérée** des flux d'une obligation. C'est le délai moyen auquel l'investisseur reçoit ses flux, pondéré par leur valeur actuelle relative :

```
Duration de Macaulay :
  D_Mac = Σₜ [t × VAN(Flux_t)] / Prix plein

  = Σₜ [t × Flux_t / (1+r)^t] / Prix plein

  Où :
    t = date de chaque flux (en années)
    Flux_t = coupon ou nominal à la date t
    r = YTM de l'obligation
    Prix plein = Σ VAN(Flux_t)
```

**Propriétés** :
- Obligation zéro-coupon : D_Mac = Maturité (tous les flux à maturité)
- Obligation à coupon : D_Mac < Maturité (flux intermédiaires ramènent la durée en avant)
- Obligation perpétuelle : D_Mac = (1+r)/r

### 1.2 Duration de Macaulay — formule simplifiée pour obligation à coupon fixe annuel

```
D_Mac = [1 − (1+r)^−N] × (1+r) / [c × ((1+r)^N − 1) + r]
         + N × (1 − c/r × (1 − (1+r)^−N)) × (1+r)^−N / Prix_pied

Simplification pour obligation au pair (P = 100, r = c) :
  D_Mac = (1+r)/r × [1 − 1/(1+r)^N]

Exemple : obligation au pair, coupon 4%, 10 ans :
  D_Mac = (1,04/0,04) × [1 − 1/(1,04)^10]
         = 26 × [1 − 0,6756]
         = 26 × 0,3244 = 8,43 ans
```

---

## 2. La Duration Modifiée

### 2.1 Définition et formule

La **duration modifiée** (Modified Duration) mesure la sensibilité du prix d'une obligation à une variation des taux :

```
Duration Modifiée :
  D_mod = D_Mac / (1 + r/m)

  m = fréquence de paiement des coupons (1 pour annuel, 2 pour semestriel)

  Approximation de la variation de prix :
  ΔP/P ≈ −D_mod × Δr

  Plus précisément :
  ΔP ≈ −D_mod × P × Δr
```

**Interprétation** : si D_mod = 7 ans et les taux montent de 1 % (100 bps), le prix de l'obligation baisse d'environ 7 %.

### 2.2 Le DV01 (Dollar Value of a Basis Point) / PVBP

```
DV01 (ou PVBP — Price Value of a Basis Point) :
  DV01 = D_mod × P × 0,0001

  = Variation en euros (ou dollars) du prix pour une hausse de 1 basis point (0,01 %)

  DV01 = ΔP pour Δr = 0,0001

Exemple :
  Obligation : Valeur de marché = 10 M€, D_mod = 7 ans
  DV01 = 7 × 10 000 000 × 0,0001 = 7 000 €/bp

  → Si les taux montent de 10 bps : Perte ≈ 70 000 €
  → Si les taux montent de 100 bps : Perte ≈ 700 000 € (mais la convexité corrige)
```

### 2.3 Duration d'un portefeuille obligataire

```
Duration modifiée d'un portefeuille :
  D_mod_p = Σᵢ wᵢ × D_mod_i

  wᵢ = Valeur marché de l'obligation i / Valeur totale du portefeuille

  DV01 du portefeuille :
  DV01_p = Σᵢ DV01_i = D_mod_p × Valeur_portefeuille × 0,0001
```

---

## 3. La Convexité

### 3.1 Définition

La relation prix-taux n'est pas linéaire : elle est **convexe**. La convexité mesure la courbure de cette relation et permet d'affiner l'approximation de la variation de prix :

```
Approximation avec convexité (deuxième ordre) :
  ΔP/P ≈ −D_mod × Δr + (1/2) × Convexité × (Δr)²

  Convexité :
  Conv = [1 / (P × (1+r)²)] × Σₜ [t × (t+1) × Flux_t / (1+r)^t]

  Pour une obligation à coupon c, maturité N, YTM r, prix P :
  Conv ≈ [2/r² × (1 − (1+r)^−N) − 2N/r × (1+r)^−(N+1) + N²(1+r)^−N] / P
```

### 3.2 Impact pratique de la convexité

```
Pour une obligation de duration modifiée = 7 et convexité = 60 :

  Variation de prix pour Δr = +2 % (200 bps) :
  
  Approximation linéaire (sans convexité) :
    ΔP/P ≈ −7 × 0,02 = −14 %
  
  Approximation avec convexité :
    ΔP/P ≈ −7 × 0,02 + (1/2) × 60 × (0,02)²
          = −0,14 + 0,5 × 60 × 0,0004
          = −0,14 + 0,012
          = −12,8 %
  
  La convexité réduit la perte de 1,2 points de pourcentage
  → C'est l'avantage de la convexité positive pour l'investisseur

Asymétrie de la convexité :
  Taux montent de 2 % : ΔP ≈ −12,8 % (meilleur que −14 %)
  Taux baissent de 2 % : ΔP ≈ +16,0 % (mieux que +14 %)
  → L'obligation convexe gagne plus en cas de baisse qu'elle ne perd en cas de hausse
```

### 3.3 La convexité positive et négative

```
Convexité positive (standard) :
  La plupart des obligations plain vanilla
  → La courbe prix-taux est convexe vers le haut

Convexité négative :
  Obligations callable : quand les taux baissent, l'émetteur rembourse
    → Le prix est "capé" (le prix monte moins qu'une non-callable)
    → MBS (Mortgage-Backed Securities) : les ménages remboursent par anticipation
      quand les taux baissent → risque de prépaiement = convexité négative

  Impact :
  Pour une baisse de taux de 2 % :
    Obligation callable : prix monte seulement de +8 % (vs. +16 % sans call)
    car la probabilité d'exercice du call augmente avec la baisse des taux
```

---

## 4. Sensibilité aux mouvements de courbe

### 4.1 Déplacement parallèle de la courbe

```
Déplacement parallèle : tous les taux bougent de la même quantité
  ΔP/P ≈ −D_mod × Δr + (1/2) × Conv × (Δr)²

Exemple :
  Portefeuille obligataire : D_mod = 6, Conv = 50, Valeur = 100 M€
  Hausse de 1 % (100 bps) :
    ΔP = −6% × 100 M€ + 0,5 × 50 × (1%)² × 100 M€
       = −6 M€ + 0,25 M€ = −5,75 M€
```

### 4.2 Déplacement non-parallèle de la courbe

**Steepening** (pentification) : les taux longs montent plus que les taux courts.

```
Mesure du risque de steepening : Key Rate Duration (KRD)
  KRD_t = sensibilité du prix à un déplacement de la courbe au point de maturité t

  Exemple : obligation 10 ans
    KRD_2 = 0,8 (sensibilité au taux 2 ans : faible)
    KRD_5 = 1,5 (sensibilité au taux 5 ans : modérée)
    KRD_10 = 5,2 (sensibilité au taux 10 ans : dominante)
    KRD_30 = 0,0 (aucune sensibilité au taux 30 ans)
    
    D_mod total ≈ Σ KRD_t = 0,8 + 1,5 + 5,2 + 0 = 7,5
```

**Flattening** (aplatissement) : les taux longs baissent relativement aux taux courts.

**Butterfly** : les taux intermédiaires bougent différemment des taux courts et longs.

```
Mesure butterfly :
  Butterfly spread = 2 × taux_5Y − taux_2Y − taux_10Y

  Butterfly positif (hump) : les taux intermédiaires sont élevés vs. la courbe
  Butterfly négatif (inverted hump) : les taux intermédiaires sont bas vs. la courbe
```

---

## 5. Immunisation et Cash Flow Matching

### 5.1 L'immunisation par la duration

L'**immunisation** est une stratégie qui protège un portefeuille contre les variations de taux en alignant la duration des actifs avec celle des passifs :

```
Condition d'immunisation classique (Redington, 1952) :
  1. D_actifs = D_passifs (duration matching)
  2. Convexité actifs ≥ Convexité passifs (protection asymétrique)
  3. Valeur actifs ≥ Valeur actuelle passifs

Si ces conditions sont satisfaites :
  → Pour de petits mouvements parallèles de la courbe :
     La variation de valeur des actifs ≈ Variation de valeur des passifs
     → Le surplus (Actifs − Passifs) est préservé

Limite : l'immunisation n'est parfaite que pour de petits déplacements parallèles.
  Pour les déplacements non-parallèles ou les grands chocs → rebalancement nécessaire.
```

### 5.2 Cash Flow Matching (adossement pur)

```
Cash Flow Matching :
  Stratégie la plus prudente : les flux des actifs correspondent exactement
  aux flux des passifs (coupon par coupon, nominal par nominal)
  
  Exemple (fonds de pension, engagements connus) :
  
  Année | Engagement | Obligation achetée        | Flux coupon | Flux nominal
  ------|-----------|-----------------------------|-------------|-------------
  2025  | 5 M€      | ZC 1 an, 5 M€ nominal      | 0           | 5 M€
  2026  | 7 M€      | Oblig 5% 2 ans, 6,67 M€    | 0,33 M€     | 6,67 M€
  2027  | 8 M€      | Oblig 4% 3 ans, 7,5 M€     | 0,50 M€     | 7,5 M€
  [...]
  
  Avantage : sécurité maximale, aucune réestimation du taux de réinvestissement
  Inconvénient : coûteux (doit acheter des obligations pour chaque maturité),
                 obligatoire d'avoir des obligations disponibles pour chaque échéance
```

---

## 6. Hedging avec des futures de taux

### 6.1 Les futures sur obligations (Bond Futures)

```
Principaux contrats :
  Euro Bund Future (Eurex) : sous-jacent = obligation synthétique 10 ans, EUR
    Nominal : 100 000 €, cotation en % du nominal
  
  T-Note Future (CME) : sous-jacent = US Treasury 10 ans
    Nominal : 100 000 USD
  
  SCHATZ (Eurex) : 2 ans EUR
  BOBL (Eurex) : 5 ans EUR

Pricing du future obligataire :
  F = (P_spot − Coupon couru) × (1+r)^T − Coupons reçus × (1+r)^(T-t_i)
  
  Où r = taux de financement (repo), T = maturité du contrat

  En simplifiant : F ≈ P_spot × (1+r)^T / Facteur de conversion
```

### 6.2 Calcul du ratio de couverture (hedge ratio)

```
Hedging d'un portefeuille obligataire avec des futures :

  DV01_portefeuille = Duration × Valeur portefeuille × 0,0001

  Nombre de contrats futures à shorter :
  N = − DV01_portefeuille / DV01_future

  DV01_future = D_mod_obligation_livrée × Prix_future × Nominal_contrat × 0,0001
              / Facteur_conversion

Exemple :
  Portefeuille : 50 M€ d'OAT 10 ans, D_mod = 8,5
  DV01_port = 8,5 × 50 000 000 × 0,0001 = 42 500 €/bp
  
  Bund Future : D_mod_livrable ≈ 8,0, Prix = 131,50, Nominal = 100 000 €
  DV01_future = 8,0 × 131 500 × 100 000 × 0,0001 = 10 520 €/bp par contrat
  
  N = 42 500 / 10 520 = 4,04 ≈ 4 contrats (short)
  
  → Shorter 4 contrats Bund Future hedgera approximativement
    le risque de taux du portefeuille contre un déplacement parallèle
```

---

## Approfondissement théorique

### La duration Key Rate et la gestion non-parallèle

Les mouvements de courbe sont rarement parallèles. La gestion sophistiquée utilise les **Key Rate Durations** :

```
Décomposition en 6–8 points de courbe typique :
  KRD_3M, KRD_6M, KRD_1Y, KRD_2Y, KRD_5Y, KRD_10Y, KRD_20Y, KRD_30Y

Exemple de KRD d'une obligation 7 ans :
  KRD_5Y = 3,2 ans
  KRD_7Y = 3,8 ans (point dominant, mais interpolé entre 5 et 10 ans)
  KRD_10Y = 1,1 ans
  
  Σ KRD = 3,2 + 3,8 + 1,1 = 8,1 ≈ D_mod (cohérence)

Stratégie de steepening via KRD :
  Objectif : bénéficier d'un steepening 5-10 ans
  → Acheter des obligations 5 ans (KRD_5Y positif élevé)
  → Shorter des obligations 10 ans (KRD_10Y négatif)
  → Duration nette = 0 (pas de risque de déplacement parallèle)
  → Gain si le spread 10Y−5Y s'écarte
```

### La relation duration-convexité comme option

La convexité d'une obligation peut être vue comme la valeur d'une **option implicite** :

```
Analogie :
  Une obligation longue convexité ressemble à un straddle (long vol) :
    → Bénéfice si les taux bougent beaucoup (dans n'importe quel sens)
    → Coût si les taux ne bougent pas (le prix payé pour la convexité = carry faible)

  En effet, les obligations très convexes ont souvent un YTM plus faible
  (l'investisseur "paye" pour la convexité par un rendement réduit)

  Prime de convexité empirique :
    Une obligation 30 ans convexe se négocie avec 10–20 bps de prime de convexité
    vs. une obligation moins convexe de même duration
```

---

## Exemples numériques

### Exemple 1 — Calcul complet Duration de Macaulay et Duration Modifiée

**Obligation** : coupon 4 %, maturité 5 ans, nominal 100 €, YTM = 3,5 %.

```
Flux et pondérations :

t  | Flux  | VAN = Flux/(1,035)^t | Poids = VAN/P  | t × Poids
---|-------|---------------------|----------------|----------
1  | 4     | 3,865               | 3,80 %         | 0,038
2  | 4     | 3,733               | 3,67 %         | 0,073
3  | 4     | 3,605               | 3,54 %         | 0,106
4  | 4     | 3,482               | 3,42 %         | 0,137
5  | 104   | 87,175              | 85,57 %        | 4,279

Prix = 3,865+3,733+3,605+3,482+87,175 = 101,860 €

Vérification des poids : 3,80+3,67+3,54+3,42+85,57 = 100 % ✓

Duration de Macaulay :
  D_Mac = 0,038 + 0,073 + 0,106 + 0,137 + 4,279 = 4,633 ans

Duration Modifiée :
  D_mod = D_Mac / (1 + r) = 4,633 / 1,035 = 4,477 ans

DV01 (pour 1 million d'euros) :
  DV01 = 4,477 × 1 000 000 × 0,0001 = 447,7 € par bp

Vérification pratique :
  Si YTM passe de 3,50 % à 3,51 % (Δr = +1 bp) :
  P_nouveau = ∑[Flux_t / (1,0351)^t] = 101,815 €
  ΔP = 101,815 − 101,860 = -0,045 €
  ΔP pour 1 M€ = -0,045/101,86 × 1 000 000 = -442 €
  DV01 exact ≈ 442 € (vs. 447 calculé → légère différence due à la convexité)
```

### Exemple 2 — Calcul de convexité et protection contre une hausse des taux

**Portefeuille obligataire** : D_mod = 8, Convexité = 80, Valeur = 100 M€.

```
Scénario : hausse des taux de 200 bps (2 %)

Approximation linéaire (duration seule) :
  ΔP/P ≈ −8 × 0,02 = −16 %
  Perte = 16 M€

Approximation avec convexité :
  ΔP/P ≈ −8 × 0,02 + (1/2) × 80 × (0,02)²
         = −0,16 + 0,5 × 80 × 0,0004
         = −0,16 + 0,016
         = −14,4 %
  Perte = 14,4 M€

Gain de la convexité = 16 − 14,4 = 1,6 M€ (protection de 1,6 % du portefeuille)

Scénario : baisse des taux de 200 bps :
  Approximation avec convexité :
  ΔP/P ≈ +8 × 0,02 + (1/2) × 80 × (0,02)²
         = +0,16 + 0,016
         = +17,6 %
  Gain = 17,6 M€

La convexité est favorable dans les deux sens :
  − Hausse des taux : perte est moins importante (−14,4% vs −16%)
  − Baisse des taux : gain est plus important (+17,6% vs +16%)
  C'est pourquoi les obligations très convexes sont valorisées avec une prime.
```

### Exemple 3 — Hedging d'un portefeuille obligataire avec futures

**Contexte** : Un gérant obligataire détient un portefeuille de 200 M€ investi en OAT 10 ans avec D_mod = 9. Il craint une hausse des taux de 50 bps dans les 2 prochains mois. Il souhaite réduire sa duration à 5 en utilisant le Bund Future.

```
Données :
  Bund Future cotation : 131,00
  D_mod de l'obligation livrée (Bund 2,5% 2034) : 9,2
  Facteur de conversion : 1,0823
  Nominal par contrat : 100 000 €

Calcul DV01s :
  DV01_portefeuille = 9 × 200 000 000 × 0,0001 = 180 000 €/bp
  DV01_duration cible = 5 × 200 000 000 × 0,0001 = 100 000 €/bp
  DV01 à couvrir = 180 000 − 100 000 = 80 000 €/bp

  DV01_Bund future par contrat :
    = (D_mod_livrable / FC) × Prix_future × Nominal × 0,0001
    = (9,2 / 1,0823) × 131 000 × 0,0001
    = 8,5 × 131 000 × 0,0001
    = 8,5 × 13,10 = 111,35 €/bp par contrat

  Nombre de contrats à shorter :
    N = DV01_à_couvrir / DV01_Bund = 80 000 / 111,35 = 718,4 ≈ 718 contrats

Simulation (si taux montent de 50 bps = 0,50 %) :

  Sans couverture :
    ΔP_portefeuille = −9 × 200 M€ × 0,0050 = −9 M€

  P&L du future (short 718 contrats, taux montent = prix baissent = gain sur short) :
    ΔP_future = +718 × 111,35 €/bp × 50 bps = +3 997 220 € ≈ +4 M€

  P&L net avec couverture :
    −9 M€ + 4 M€ = −5 M€ (perte réduite de 55 %)
    ΔP/P_net = −5/200 = −2,5 %
    Duration effective ≈ 2,5%/0,5% = 5 (conforme à l'objectif) ✓
```

---

## Applications professionnelles

### Gestion de la duration chez un gérant obligataire

```
Cadre de gestion :
  
  Duration SAA (fonds de pension, matching engagements) : 15–20 ans
  Duration TAA (position tactique) : SAA ± 3 ans
  Outil de mesure : BARRA POINT (modèle de risque obligataire)
  
  Décision mensuelle du comité d'investissement :
    "Nous pensons que les taux longs européens vont baisser dans les 3 prochains mois"
    → Allonger la duration de 15 à 17 ans
    → Outil : achat de contrats Bund Future 30 ans (BUXL)
    
  Reporting :
    DV01 total : 500 000 €/bp
    Si taux montent de 1 bp : perte estimée 500 000 €
    Budget de risque VaR 99% (10 jours) : 50 M€
```

### L'immunisation en pratique (ALM)

```
Exemple : fonds de pension avec 1 Md€ d'actifs et 900 M€ d'engagements

  Caractéristiques :
    Duration actifs = 8 ans
    Duration engagements = 18 ans
    
  Gap de duration = 8 − 18 = −10 ans
  
  Risque de gap : si les taux baissent de 1 % :
    ΔActifs = +8% × 1 Md€ = +80 M€
    ΔEngagements = +18% × 900 M€ = +162 M€
    Impact sur le surplus = +80 − 162 = −82 M€ (détérioration du surplus !)
    
  Stratégie d'immunisation partielle :
    Allonger la duration des actifs vers 12–14 ans
    (via achat d'OAT 30 ans, vente d'OAT 5 ans, overlay de swap de taux)
    
  Coût de l'immunisation :
    OAT 30Y cotent à un rendement légèrement plus élevé (+25 bps) que les OAT 10Y
    → L'allongement de duration augmente le rendement (prime de terme positive)
    → Coût en termes de liquidité réduite (les OAT 30Y sont moins liquides)
```

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Confondre duration de Macaulay et duration modifiée** | D_Mac est en années, D_mod mesure la sensibilité aux taux | D_mod = D_Mac / (1+r) — toujours utiliser D_mod pour le risk management |
| **Utiliser la duration pour de grands mouvements de taux** | La duration est une approximation linéaire — valide pour Δr < 50 bps | Pour Δr > 1 %, utiliser l'approximation avec convexité |
| **Négliger les déplacements non-parallèles** | La duration ne mesure que le risque parallèle | Utiliser les Key Rate Durations pour le risque de courbe |
| **Hedger avec le mauvais contrat future** | Le Schatz (2 ans) ne couvre pas le risque d'une obligation 10 ans | Sélectionner le contrat future dont la duration correspond à l'obligation hedgée |
| **Oublier la facteur de conversion** | Le hedge ratio doit tenir compte du facteur de conversion du futures | Toujours diviser par le facteur de conversion dans le calcul du DV01 du future |
| **Confondre convexité positive et négative** | Les obligations callables ont une convexité négative | Vérifier si l'obligation est callable/puttable avant de calculer la convexité |

---

## Exercices

### Exercice 1
Calculez la Duration de Macaulay d'une obligation zéro-coupon de maturité 7 ans et d'une obligation à coupon 5 % (annuel) de maturité 7 ans au pair. Comparez et expliquez la différence.

> **Correction** :
> ```
> Obligation zéro-coupon 7 ans :
>   Unique flux en t = 7 : D_Mac = 7 ans (par définition)
>   D_mod = 7 / (1+r) (dépend du YTM)
>
> Obligation 5 % au pair (r = 5%), 7 ans :
>   D_Mac = (1+r)/r × [1 − 1/(1+r)^N]
>          = (1,05/0,05) × [1 − 1/(1,05)^7]
>          = 21 × [1 − 0,7107]
>          = 21 × 0,2893 = 6,07 ans
>
>   D_mod = 6,07 / 1,05 = 5,78 ans
>
> Comparaison :
>   Zéro-coupon : D_Mac = 7 ans > D_Mac de l'obligation à coupon (6,07 ans)
>
> Explication :
>   L'obligation à coupon verse des flux intermédiaires qui "ramènent" la durée
>   de vie moyenne vers le présent. Plus le coupon est élevé, plus la duration
>   est courte (par rapport à la maturité).
>   Le zéro-coupon a la duration maximale possible pour sa maturité.
> ```

### Exercice 2
Un portefeuille de 50 M€ a une duration modifiée de 6 ans et une convexité de 45. Les taux baissent de 150 bps. Calculez la variation de prix avec et sans la correction de convexité.

> **Correction** :
> ```
> Δr = −0,015 (baisse de 150 bps)
>
> Approximation par la duration seule :
>   ΔP/P ≈ −D_mod × Δr = −6 × (−0,015) = +9,0 %
>   ΔP = +9,0 % × 50 M€ = +4,5 M€
>
> Approximation avec convexité :
>   ΔP/P ≈ −D_mod × Δr + (1/2) × Conv × (Δr)²
>          = +9,0% + (1/2) × 45 × (−0,015)²
>          = +9,0% + 0,5 × 45 × 0,000225
>          = +9,0% + 0,00506
>          = +9,506%
>   ΔP = +9,506% × 50 M€ = +4,753 M€
>
> Correction de convexité = +4,753 − 4,500 = +0,253 M€
>
> La convexité ajoute 253 K€ de gain (5,6 % du gain de duration).
> Sur de grandes variations de taux (150 bps), la convexité est significative.
> ```

### Exercice 3
Un gérant veut hedger son portefeuille de 100 M€ d'obligations 10 ans (D_mod = 8,5) avec des T-Note Futures (sous-jacent D_mod = 7,8, facteur de conversion = 0,9856, nominal 100 000 USD). Calculez le nombre de contrats à vendre pour neutraliser la duration.

> **Correction** :
> ```
> DV01_portefeuille = 8,5 × 100 000 000 × 0,0001 = 85 000 $/bp
>
> DV01_T-Note Future par contrat :
>   = (D_mod_livrable / FC) × Prix_future × Nominal × 0,0001
>
>   Supposons Prix future = 109,25 (cotation en % du nominal) :
>   DV01_future = (7,8 / 0,9856) × 109 250 × 0,0001
>               = 7,914 × 109 250 × 0,0001
>               = 7,914 × 10,925 = 86,47 $/bp par contrat
>
>   N = DV01_portefeuille / DV01_future = 85 000 / 86,47 = 983 contrats
>
>   → Shorter 983 contrats T-Note Future hedgera la duration du portefeuille
>
> Vérification (si taux montent de 50 bps) :
>   Perte portefeuille = −85 000 × 50 = −4 250 000 $
>   Gain sur future (short) = +983 × 86,47 × 50 = +4 249 000 $ ≈ +4 250 000 $ ✓
> ```
