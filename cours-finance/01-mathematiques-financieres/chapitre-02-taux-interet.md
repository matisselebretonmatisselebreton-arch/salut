# Chapitre 2 — Les taux d'intérêt : conventions et conversions

## Introduction

Les taux d'intérêt sont omniprésents en finance : coût d'un crédit, rendement d'un placement, taux de référence des banques centrales. Maîtriser leurs conventions et leurs conversions est indispensable pour comparer des produits financiers.

---

## 1. Typologies de taux

### 1.1 Taux fixe vs. taux variable

| Type | Définition | Exemple |
|------|-----------|---------|
| **Taux fixe** | Inchangé sur toute la durée | Crédit immobilier à 3,5 % sur 20 ans |
| **Taux variable** | Révisé périodiquement selon un indice de référence | Euribor 3 mois + 1 % |
| **Taux mixte** | Fixe les premières années, puis variable | Crédit sur 25 ans : fixe 5 ans puis variable |

### 1.2 Taux nominal vs. taux réel

La **relation de Fisher** :

```
(1 + r_nominal) = (1 + r_réel) × (1 + π)
```

Approximation (valable pour de faibles taux) :

```
r_réel ≈ r_nominal - π
```

- `π` : taux d'inflation

**Exemple** : taux nominal = 5 %, inflation = 2 % → taux réel ≈ 3 %

### 1.3 Taux brut vs. taux net

Le taux net tient compte de la fiscalité applicable aux revenus financiers (en France : prélèvement forfaitaire unique — PFU — de 30 %).

```
r_net = r_brut × (1 - taux_imposition)
```

---

## 2. Périodicité et conventions de calcul

### 2.1 Taux proportionnel

Un taux annuel `r` est dit **proportionnel** à un taux mensuel `r_m` si :

```
r_m = r / 12
```

**Usage** : intérêts simples, crédits à court terme.

### 2.2 Taux équivalent

Un taux annuel `r` est dit **équivalent** à un taux mensuel `r_m` si un placement d'un an au taux mensuel produit le même résultat qu'un placement d'un an au taux annuel (intérêts composés) :

```
(1 + r_m)¹² = (1 + r)
→ r_m = (1 + r)^(1/12) - 1
```

**Exemple** : taux annuel = 12 %
- Taux mensuel proportionnel : 12 % / 12 = **1,00 %**
- Taux mensuel équivalent : (1,12)^(1/12) - 1 = **0,9489 %**

> En régime d'intérêts composés, on utilise **toujours** les taux équivalents.

### 2.3 Tableau de conversion des taux équivalents

| Taux annuel | Taux trimestriel | Taux mensuel | Taux journalier (base 365) |
|-------------|-----------------|--------------|---------------------------|
| 4 % | (1,04)^(1/4) - 1 = 0,9853 % | (1,04)^(1/12) - 1 = 0,3274 % | (1,04)^(1/365) - 1 = 0,01072 % |
| 6 % | 1,4674 % | 0,4868 % | 0,01597 % |
| 8 % | 1,9427 % | 0,6434 % | 0,02108 % |
| 12 % | 2,8737 % | 0,9489 % | 0,03096 % |

---

## 3. Taux Actuariel et Taux de Rendement Actuariel (TRA)

### Définition

Le **taux actuariel** est le taux d'actualisation qui égalise la valeur actuelle des flux entrants et sortants d'un instrument financier. C'est le standard pour comparer des obligations et des placements.

Pour une obligation :

```
Prix = Σ [Coupon / (1 + TRA)ᵗ] + Valeur nominale / (1 + TRA)ⁿ
```

---

## 4. Taux Annuel Effectif Global (TAEG)

### Définition

Le **TAEG** est le taux actuariel annuel qui reflète le coût total d'un crédit : intérêts + frais de dossier + assurance. C'est le seul taux comparable légalement entre offres de crédit.

### Calcul

Le TAEG résout l'équation :

```
Montant emprunté = Σ [Mensualité / (1 + TAEG)^(t/12)]
```

**Exemple** : Crédit de 10 000 €, 12 mensualités de 870 €, frais de dossier 100 €

Le TAEG est le taux `r` tel que :

```
10 000 - 100 = Σ (870 / (1 + r)^(t/12))   pour t = 1 à 12
```

---

## 5. Structure par terme des taux (courbe des taux)

### Définition

La **courbe des taux** (yield curve) représente les taux d'intérêt en fonction de la maturité. Elle est fondamentale en finance de marché.

### Formes typiques

```
Taux
  |        Normale (haussière)
  |       /
  |      /
  |     /
  |____/_____________________ Maturité

Taux
  |  \
  |   \    Inversée
  |    \
  |     \____________________ Maturité

Taux
  |    ___
  |   /   \  Bosse (humped)
  |  /     \_________________ Maturité
```

### Interprétations économiques

| Forme | Signal |
|-------|--------|
| **Normale** (croissante) | Anticipations de croissance, prime de risque de maturité |
| **Inversée** (décroissante) | Anticipations de baisse de taux, signal de récession |
| **Plate** | Incertitude, transition de cycle |

### Théories explicatives

1. **Théorie des anticipations pures** : les taux longs reflètent les anticipations de taux courts futurs.
2. **Théorie de la prime de liquidité** : les investisseurs exigent une prime pour immobiliser leur argent longtemps.
3. **Théorie de la segmentation des marchés** : chaque segment de maturité obéit à une offre/demande indépendante.

---

## 6. Taux spot et taux forward

### Taux spot (zéro-coupon)

Le **taux spot** `s(t)` est le taux d'une obligation zéro-coupon de maturité `t` (pas de coupon intermédiaire, remboursement unique).

### Taux forward

Le **taux forward** `f(t₁, t₂)` est le taux implicite pour un placement entre `t₁` et `t₂`, déduit des taux spot :

```
(1 + s(t₂))^t₂ = (1 + s(t₁))^t₁ × (1 + f(t₁, t₂))^(t₂-t₁)
```

**Exemple** : `s(1) = 3 %`, `s(2) = 4 %`. Quel est le taux forward 1 an dans 1 an ?

```
(1,04)² = (1,03)¹ × (1 + f(1,2))¹
1,0816 = 1,03 × (1 + f)
1 + f = 1,0501
f(1,2) = 5,01 %
```

---

## 7. Exercices

### Exercice 1
Convertissez un taux annuel de 9 % en taux trimestriel équivalent.

> **Correction** : r_trim = (1,09)^(1/4) - 1 = 2,178 %

### Exercice 2
Un taux mensuel proportionnel de 1,2 % correspond à quel taux annuel en intérêts composés ?

> **Correction** : r_annuel = (1,012)^12 - 1 = 15,39 %

### Exercice 3
Les taux spot 1 an et 2 ans sont respectivement 2,5 % et 3,2 %. Calculez le taux forward 1 an dans 1 an.

> **Correction** : (1,032)² = (1,025) × (1 + f) → f = (1,032)²/1,025 - 1 = 3,91 %

---

## Approfondissement théorique

### La théorie des anticipations et l'hypothèse des marchés efficients

La relation entre taux spot et taux forward constitue l'un des piliers de la théorie des taux d'intérêt. Dans le cadre de la **théorie des anticipations pures** (Pure Expectations Theory, PET), formalisée notamment par Lutz (1940) et Fisher (1896), le taux forward n'est autre que la prévision de marché du taux spot futur. En d'autres termes :

```
f(t₁, t₂) = E[s(t₁, t₂)]
```

Cette relation implique que la structure par terme de taux contient toute l'information disponible sur les taux futurs, ce qui est cohérent avec l'hypothèse d'efficience informationnelle semi-forte des marchés financiers (Fama, 1970).

Cependant, plusieurs études empiriques (Fama & Bliss, 1987 ; Campbell & Shiller, 1991) ont montré que les taux forward sont de mauvais prédicteurs des taux spot futurs, suggérant l'existence d'une **prime de terme** (term premium) variable dans le temps.

### La prime de terme et ses déterminants

La **prime de terme** `TP(t)` représente la rémunération supplémentaire exigée par les investisseurs pour détenir des obligations de long terme plutôt que de renouveler des placements courts. Elle peut être décomposée comme suit :

```
Taux long(t) = Taux court moyen attendu(t) + Prime de terme(t)
```

Les déterminants empiriques de la prime de terme incluent :
- **L'incertitude macroéconomique** : plus la volatilité des taux courts est élevée, plus la prime est importante.
- **L'offre nette d'obligations** : un excès d'émissions longues pousse la prime à la hausse.
- **Les préférences d'habitat préféré** : certains investisseurs institutionnels (assureurs, fonds de pension) ont une préférence structurelle pour des maturités spécifiques.

### Le modèle de Nelson-Siegel

En pratique, les banques centrales et les institutions financières modélisent la courbe des taux à l'aide du modèle de **Nelson-Siegel** (1987) :

```
s(t) = β₀ + β₁ × [(1 - e^(-t/λ)) / (t/λ)] + β₂ × [(1 - e^(-t/λ)) / (t/λ) - e^(-t/λ)]
```

Où :
- `β₀` : niveau long terme (taux à l'infini)
- `β₁` : pente (différence entre taux long et taux court)
- `β₂` : courbure (forme de bosse)
- `λ` : paramètre de décroissance exponentielle

Ce modèle à 4 paramètres capture les trois formes classiques de courbe (normale, inversée, bosse) avec une grande parcimonie.

### L'effet Fisher et ses limites empiriques

L'effet Fisher stipule une relation de long terme entre taux nominaux et inflation. Toutefois, plusieurs nuances s'imposent au niveau M2 :

1. **L'effet Fisher ex ante vs ex post** : la relation théorique porte sur l'inflation *anticipée*, non réalisée. Or, les anticipations sont inobservables directement.

2. **Les marchés indexés sur l'inflation** : les obligations indexées (OATi en France, TIPS aux États-Unis) permettent de décomposer le taux nominal en taux réel + point mort d'inflation :
```
Taux nominal ≈ Taux réel OATi + Point mort d'inflation
```

3. **L'effet Fisher partiel** : dans les pays à faible mobilité de capitaux ou en présence de rigidités financières, l'ajustement nominal-réel peut être incomplet.

### Taux continus vs. taux discrets

En finance quantitative, on travaille souvent avec des **taux à capitalisation continue** (continuous compounding), particulièrement dans la valorisation des dérivés (modèle de Black-Scholes). La relation entre taux discret `r` et taux continu `r_c` est :

```
e^(r_c × t) = (1 + r)^t
→ r_c = ln(1 + r)
→ r = e^(r_c) - 1
```

**Exemple** : un taux annuel discret de 5 % correspond à un taux continu de :
```
r_c = ln(1,05) = 4,879 %
```

Cette convention est préférable pour les modèles stochastiques car elle est additive dans le temps, ce qui simplifie considérablement les démonstrations mathématiques.

---

## Exemples numériques supplémentaires

### Exemple 1 — Construction d'une courbe des taux zéro-coupon par bootstrapping

On dispose des prix de marché des obligations suivantes (valeur nominale 1 000 €, coupons annuels) :

| Maturité | Coupon annuel | Prix observé |
|----------|--------------|-------------|
| 1 an     | 3 %          | 1 000,00 €  |
| 2 ans    | 4 %          | 1 010,50 €  |
| 3 ans    | 5 %          | 1 025,00 €  |

**Étape 1 : taux spot 1 an**

L'obligation 1 an verse un seul flux de 1 030 € à t=1.
```
1 000 = 1 030 / (1 + s₁)
s₁ = 1 030 / 1 000 - 1 = 3,00 %
```

**Étape 2 : taux spot 2 ans**

L'obligation 2 ans verse 40 € à t=1 et 1 040 € à t=2.
```
1 010,50 = 40 / (1 + s₁) + 1 040 / (1 + s₂)²
1 010,50 = 40 / 1,03 + 1 040 / (1 + s₂)²
1 010,50 - 38,835 = 1 040 / (1 + s₂)²
971,665 = 1 040 / (1 + s₂)²
(1 + s₂)² = 1 040 / 971,665 = 1,07031
s₂ = √1,07031 - 1 = 3,454 %
```

**Étape 3 : taux spot 3 ans**

L'obligation 3 ans verse 50 € à t=1, 50 € à t=2 et 1 050 € à t=3.
```
1 025 = 50/1,03 + 50/(1,03454)² + 1 050/(1 + s₃)³
1 025 = 48,544 + 46,769 + 1 050/(1 + s₃)³
929,687 = 1 050/(1 + s₃)³
(1 + s₃)³ = 1 050 / 929,687 = 1,12942
s₃ = (1,12942)^(1/3) - 1 = 4,13 %
```

**Résultat** : Courbe zéro-coupon : s₁ = 3,00 %, s₂ = 3,454 %, s₃ = 4,13 %

---

### Exemple 2 — Décomposition d'un taux nominal en composantes réelles et inflationnistes

Un investisseur envisage un placement obligataire à 5 ans au taux nominal de 4,8 %. Les anticipations d'inflation sont les suivantes :

| Année | Inflation anticipée |
|-------|-------------------|
| 1     | 1,5 %             |
| 2     | 1,8 %             |
| 3     | 2,0 %             |
| 4     | 2,2 %             |
| 5     | 2,3 %             |

**Calcul de l'inflation moyenne géométrique anticipée sur 5 ans :**
```
(1 + π_moy)⁵ = (1,015) × (1,018) × (1,020) × (1,022) × (1,023)
             = 1,015 × 1,018 × 1,020 × 1,022 × 1,023
             = 1,10367
π_moy = (1,10367)^(1/5) - 1 = 1,999 % ≈ 2,00 %
```

**Calcul du taux réel via Fisher exacte :**
```
(1 + r_réel) = (1 + r_nominal) / (1 + π)
             = 1,048 / 1,020
             = 1,02745
r_réel = 2,745 %
```

**Versus approximation Fisher :**
```
r_réel ≈ 4,8 % - 2,0 % = 2,8 %
```
Écart : 0,055 point de base — l'approximation introduit une erreur de 2 % relative ici. Cet écart devient significatif pour des taux nominaux élevés (supérieurs à 8-10 %).

---

### Exemple 3 — Calcul du TAEG d'un crédit automobile avec assurance

Un client souscrit un crédit auto aux conditions suivantes :
- Montant financé : 15 000 €
- Durée : 36 mois
- Mensualité hors assurance : 445 €
- Assurance décès-invalidité : 8 € / mois
- Frais de dossier : 200 €
- Frais de garantie : 150 €

**Calcul du montant net reçu :**
```
Montant net = 15 000 - 200 - 150 = 14 650 €
```

**Flux totaux mensuels :**
```
Mensualité totale = 445 + 8 = 453 €
```

**Équation du TAEG (taux mensuel `r_m`) :**
```
14 650 = Σ [453 / (1 + r_m)^t]  pour t = 1 à 36
```

Cette équation est résolue numériquement (Newton-Raphson ou tableur) :

| Taux mensuel testé | VA des flux | Écart |
|-------------------|------------|-------|
| 0,80 % | 14 819 € | +169 € |
| 0,90 % | 14 649 € | -1 €  |
| 0,901 % | 14 647 € | -3 €  |

**→ Taux mensuel ≈ 0,900 %**

**Conversion en TAEG annuel :**
```
TAEG = (1 + 0,009)¹² - 1 = (1,009)¹² - 1 = 11,38 %
```

Ce TAEG de 11,38 % doit figurer obligatoirement dans l'offre de crédit préalable et permet la comparaison avec toute autre offre concurrente.

---

## Applications professionnelles

### Usage en banque de détail : la tarification du crédit

Les banques commerciales utilisent la structure par terme des taux pour fixer leurs conditions de crédit. La logique est la suivante :

1. **Refinancement** : la banque se refinance sur le marché interbancaire ou obligataire à un taux `r_refinancement` correspondant à la maturité du crédit accordé.
2. **Marge nette d'intérêt** : le taux client est fixé à `r_client = r_refinancement + marge_commerciale + prime_de_risque_crédit`.
3. **Modèle ALM (Asset-Liability Management)** : le département ALM surveille l'appariement des maturités entre actifs (crédits) et passifs (dépôts, emprunts). Un mismatch de taux ou de liquidité constitue un risque majeur, régulé notamment par les ratios LCR (Liquidity Coverage Ratio) et NSFR (Net Stable Funding Ratio) de Bâle III.

### Usage en salle des marchés : le trading de taux

Les traders de taux (fixed income traders) exploitent les anomalies dans la courbe des taux :

- **Steepener / Flattener** : un trader anticipe que la courbe va se pentifier (steepener) et vend des obligations courtes pour acheter des longues. Un flattener fait l'inverse.
- **Butterfly** : stratégie à trois jambes exploitant la courbure de la courbe. On achète les points extrêmes (courts et longs) et on vend le point médian.
- **Taux forward implicites** : les taux forward sont la base de la valorisation des contrats de taux (FRA — Forward Rate Agreement, swaps de taux IRS, futures sur Euribor).

### Usage en gestion d'actifs : la duration et la sensibilité

Un gérant obligataire convertit la courbe des taux en mesures de risque de son portefeuille :

```
Duration de Macaulay = Σ [t × (flux_t / (1 + r)^t)] / Prix
Sensibilité (Modified Duration) = Duration / (1 + r)
```

La sensibilité indique la variation de prix approximative pour une variation de 1 % (100 bps) du taux. Un portefeuille de duration 7 ans perdra environ 7 % de valeur si les taux montent de 100 bps.

### Usage en contrôle de gestion : le taux de cession interne

Dans les grandes banques universelles, chaque ligne métier emprunte et prête à un **taux de cession interne (TCI)** calculé à partir de la courbe des taux swap. Ce mécanisme permet d'isoler la marge commerciale de la marge financière et d'évaluer la performance pure de chaque activité.

### Usage chez les corporates : la politique de couverture des taux

Une entreprise ayant une dette à taux variable (Euribor + spread) est exposée au risque de hausse des taux. Le trésorier d'entreprise peut :
- Souscrire un **swap taux fixe/variable** (IRS) pour fixer son coût d'emprunt.
- Acheter un **cap** de taux (option de taux plafond) pour se protéger sans renoncer à la baisse.
- Mettre en place un **tunnel** (achat d'un cap, vente d'un floor) pour réduire le coût de la couverture.

---

## Erreurs fréquentes et pièges

### Erreur 1 — Confondre taux proportionnel et taux équivalent

C'est l'erreur la plus répandue chez les étudiants débutants. On est tenté d'utiliser la simple division (taux proportionnel) même en régime d'intérêts composés.

**Exemple de l'erreur** : pour un taux annuel de 12 %, calculer le taux mensuel comme 12 %/12 = 1 %.

**Conséquence** : utiliser 1 % mensuel en capitalisation composée sur 12 mois donne `(1,01)¹² - 1 = 12,68 %`, soit 68 bps de plus que le taux annuel de 12 %. Sur un crédit de 100 000 € sur 20 ans, l'erreur peut représenter plusieurs milliers d'euros d'intérêts.

**Règle** : en régime composé, toujours utiliser `r_m = (1 + r_annuel)^(1/12) - 1`.

### Erreur 2 — Négliger la base de calcul des jours (day count convention)

En finance de marché, la convention de décompte des jours est cruciale. Il existe plusieurs conventions :

| Convention | Description | Usage |
|-----------|-------------|-------|
| Actual/365 | Jours réels / 365 | Obligations UK, dépôts GBP |
| Actual/360 | Jours réels / 360 | Marché monétaire EUR, USD |
| 30/360 | Mois de 30 jours / 360 | Obligations corporates |

Confondre Actual/360 et Actual/365 génère une erreur systématique de 365/360 - 1 = 1,39 % sur le calcul des intérêts. Sur des montants notionnels importants (plusieurs millions d'euros), c'est significatif.

### Erreur 3 — Appliquer la relation de Fisher approchée à des taux élevés

L'approximation `r_réel ≈ r_nominal - π` n'est valide que pour des taux faibles (inférieurs à 5-6 %). Au-delà, l'erreur devient substantielle :

**Exemple** : taux nominal = 20 %, inflation = 15 %.
- Approximation : r_réel ≈ 5 %
- Formule exacte : r_réel = 1,20/1,15 - 1 = 4,35 %
- Erreur : 65 bps — ce qui peut suffire à transformer un projet rentable en projet déficitaire.

### Erreur 4 — Confondre taux actuariel et taux facial d'une obligation

Le **taux facial** (coupon rate) est le pourcentage du nominal versé en coupon chaque année. Le **taux actuariel** (yield to maturity) est le taux de rentabilité interne de l'obligation, tenant compte du prix de marché. Ces deux grandeurs ne sont égales que lorsque l'obligation cote au pair (prix = 100).

```
Si prix > 100 (prime) → taux actuariel < taux facial
Si prix < 100 (décote) → taux actuariel > taux facial
```

Un étudiant qui utilise le taux facial à la place du taux actuariel dans une formule d'actualisation commettra une erreur fondamentale de valorisation.

### Erreur 5 — Négliger la distinction entre taux périodique et TAEG dans les comparaisons

Comparer des offres de crédit sur la base du taux mensuel ou du taux nominal annuel (sans tenir compte des frais) peut conduire à choisir une offre plus coûteuse. Seul le TAEG permet une comparaison légalement valide et économiquement correcte car il intègre :
- Les frais de dossier
- L'assurance emprunteur obligatoire
- Les frais de garantie (hypothèque, caution)
- Les frais d'ouverture de compte si obligatoires

---

## Exercices supplémentaires

### Exercice 1 — Conversion multi-périodicité (difficulté : ★☆☆☆)

Un livret d'épargne affiche un taux nominal annuel de 3 %, avec capitalisation mensuelle.

**Questions :**
1. Calculez le taux mensuel équivalent.
2. Calculez le taux annuel effectif (TEG) obtenu avec capitalisation mensuelle.
3. Quelle est la différence entre le taux nominal et le TEG ? Comment s'appelle cet écart ?

**Corrigé :**

1. Taux mensuel équivalent :
```
r_m = (1 + 0,03)^(1/12) - 1 = (1,03)^(0,08333) - 1
    = 1,002466 - 1 = 0,2466 %
```

2. Taux annuel effectif avec capitalisation mensuelle (en utilisant le taux *proportionnel* mensuel = 3%/12 = 0,25%) :
```
TEG = (1 + 0,0025)^12 - 1 = (1,0025)^12 - 1
    = 1,030416 - 1 = 3,0416 %
```

3. Différence : 3,0416 % - 3,0000 % = 0,0416 %. Cet écart correspond à l'**effet de la capitalisation des intérêts** sur les sous-périodes. Plus la fréquence de capitalisation est élevée, plus le TEG dépasse le taux nominal. À la limite (capitalisation continue), on obtient `e^(0,03) - 1 = 3,0455 %`.

---

### Exercice 2 — Relation de Fisher et taux réel ex post (difficulté : ★★☆☆)

En 2023, un investisseur a placé 50 000 € sur un compte à terme offrant 4,2 % annuel brut. L'inflation réalisée sur l'année a été de 5,7 %. Le PFU est de 30 %.

**Questions :**
1. Calculez le taux net d'imposition.
2. Calculez le taux réel après impôt en utilisant la formule de Fisher exacte.
3. Quel est le gain ou la perte de pouvoir d'achat en euros ?

**Corrigé :**

1. Taux net d'imposition :
```
r_net = 4,2 % × (1 - 0,30) = 4,2 % × 0,70 = 2,94 %
```

2. Taux réel après impôt (Fisher exacte) :
```
(1 + r_réel_net) = (1 + r_net) / (1 + π)
                 = 1,0294 / 1,057
                 = 0,97388
r_réel_net = -2,61 %
```

3. Gain/perte de pouvoir d'achat :
```
Valeur nominale finale = 50 000 × 1,0294 = 51 470 €
Valeur en euros constants = 51 470 / 1,057 = 48 694 €
Perte de pouvoir d'achat = 50 000 - 48 694 = 1 306 €
```

**Conclusion** : malgré un rendement nominal positif de 4,2 %, l'investisseur a perdu 1 306 € de pouvoir d'achat, car l'inflation (5,7 %) a largement dépassé le rendement net d'impôt (2,94 %).

---

### Exercice 3 — Extraction des taux forward et arbitrage (difficulté : ★★★☆)

Les taux spot suivants sont observés sur le marché :

| Maturité | Taux spot |
|----------|-----------|
| 1 an     | 2,00 %    |
| 2 ans    | 2,50 %    |
| 3 ans    | 3,00 %    |

**Questions :**
1. Calculez les taux forward f(1,2), f(2,3) et f(1,3).
2. Un investisseur peut placer à 3 ans au taux spot de 3 %, ou placer à 1 an (à 2 %), puis renouveler à f(1,2), puis à f(2,3). Montrez que les deux stratégies sont équivalentes (absence d'arbitrage).
3. Si une banque propose un dépôt de 2 ans dans 1 an au taux de 3,5 %, est-ce une opportunité d'arbitrage ? Comment en profiter ?

**Corrigé :**

1. Calcul des taux forward :

```
f(1,2) : (1,025)² = (1,02)¹ × (1 + f(1,2))¹
         1,050625 / 1,02 = 1 + f(1,2)
         f(1,2) = 3,003 %

f(2,3) : (1,03)³ = (1,025)² × (1 + f(2,3))¹
         1,092727 / 1,050625 = 1 + f(2,3)
         f(2,3) = 4,007 %

f(1,3) : (1,03)³ = (1,02)¹ × (1 + f(1,3))²
         1,092727 / 1,02 = (1 + f(1,3))²
         1,070320 = (1 + f(1,3))²
         f(1,3) = √1,070320 - 1 = 3,456 %
```

2. Vérification de l'absence d'arbitrage :
```
Stratégie 1 (placement direct 3 ans) :
1 € × (1,03)³ = 1,092727 €

Stratégie 2 (3 placements successifs) :
1 € × (1,02) × (1,03003) × (1,04007)
= 1,02 × 1,03003 × 1,04007
= 1,02 × 1,07127
= 1,092727 €
```
Les deux stratégies donnent exactement le même résultat — il n'y a pas d'arbitrage.

3. Opportunité d'arbitrage :
Le taux forward f(1,3) implicite = 3,456 %. La banque propose 3,5 % pour un dépôt 2 ans dans 1 an, soit un taux supérieur au taux d'équilibre.

**Stratégie d'arbitrage :**
- **Aujourd'hui** : emprunter `X` euros à 1 an (taux 2 %), placer `X` euros à 3 ans (taux 3 %).
- **Dans 1 an** : rembourser l'emprunt `X × 1,02`, placer le produit du désinvestissement partiel (montant équivalent) sur 2 ans à 3,5 %.
- Cette structure génère un profit sans risque grâce à l'écart entre 3,5 % et le taux forward d'équilibre de 3,456 % ≈ 4,4 bps de gain annuel.

---

### Exercice 4 — Modélisation d'une courbe des taux Nelson-Siegel (difficulté : ★★★★)

Les paramètres suivants du modèle Nelson-Siegel ont été estimés pour la courbe des taux souverains français :
- β₀ = 4,00 %
- β₁ = -2,00 %
- β₂ = 1,50 %
- λ = 2,00

**Questions :**
1. Calculez les taux zéro-coupon pour les maturités : 1 an, 2 ans, 5 ans, 10 ans, 30 ans.
2. Interprétez la forme de la courbe.
3. Si β₁ passait de -2 % à +1 %, quel impact cela aurait-il sur la forme de la courbe ? Interprétez économiquement.

**Corrigé :**

1. Application de la formule :
```
s(t) = β₀ + β₁ × φ₁(t) + β₂ × φ₂(t)

où :
φ₁(t) = (1 - e^(-t/2)) / (t/2)
φ₂(t) = (1 - e^(-t/2)) / (t/2) - e^(-t/2)
```

| Maturité t | φ₁(t)  | φ₂(t)  | s(t)   |
|-----------|--------|--------|--------|
| 1 an      | 0,7869 | 0,4148 | 4,00 - 2×0,7869 + 1,5×0,4148 = **3,047 %** |
| 2 ans     | 0,6321 | 0,3995 | 4,00 - 2×0,6321 + 1,5×0,3995 = **3,335 %** |
| 5 ans     | 0,3297 | 0,2982 | 4,00 - 2×0,3297 + 1,5×0,2982 = **3,788 %** |
| 10 ans    | 0,1813 | 0,1977 | 4,00 - 2×0,1813 + 1,5×0,1977 = **3,934 %** |
| 30 ans    | 0,0656 | 0,0919 | 4,00 - 2×0,0656 + 1,5×0,0919 = **4,007 %** |

2. Interprétation : β₁ = -2 % (négatif) → la courbe est croissante (normale). Le taux à 30 ans (4,007 %) est proche de β₀ = 4 %, valeur limite à l'infini. Le taux court (1 an) est le plus bas (3,047 %).

3. Si β₁ = +1 % (positif) → la composante β₁ × φ₁(t) s'additionne positivement pour les courtes maturités et s'annule pour les longues. Cela inverserait la courbe : les taux courts deviendraient supérieurs aux taux longs. Économiquement, cela reflèterait des anticipations de baisse des taux directeurs (politique monétaire restrictive appelée à se détendre) ou des craintes de récession à court terme.

---

## Points clés à retenir

- Taux équivalent ≠ taux proportionnel : en intérêts composés, toujours utiliser l'équivalent.
- Le TAEG est la mesure légale et comparative du coût d'un crédit.
- La courbe des taux est un baromètre des anticipations économiques.
- Les taux forward sont implicitement contenus dans la structure par terme.
