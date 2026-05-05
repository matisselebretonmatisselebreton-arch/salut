# Chapitre 2 — Actions et obligations : valorisation

## Introduction

Actions et obligations sont les deux instruments fondamentaux des marchés financiers. Leur valorisation repose sur le même principe : la valeur actuelle des flux futurs qu'ils génèrent.

---

## PARTIE A — LES OBLIGATIONS

## 1. Caractéristiques d'une obligation

Une **obligation** est un titre de créance émis par un État ou une entreprise. Elle confère à son détenteur le droit de percevoir des **coupons** (intérêts périodiques) et le **remboursement du nominal** à l'échéance.

| Caractéristique | Définition |
|----------------|-----------|
| **Valeur nominale** | Montant sur lequel est calculé le coupon (ex : 1 000 €) |
| **Coupon** | Intérêt périodique = Taux nominal × Valeur nominale |
| **Maturité** | Date de remboursement du nominal |
| **Prix** | Exprimé en % du nominal (pied de coupon) |
| **Taux actuariel (YTM)** | Taux de rendement si l'obligation est conservée jusqu'à maturité |

---

## 2. Valorisation d'une obligation

### Formule de prix

```
Prix = Σ [C / (1 + r)^t] + N / (1 + r)^n
```

- `C` : coupon annuel
- `N` : valeur nominale
- `r` : taux actuariel (YTM — Yield to Maturity)
- `n` : nombre de périodes

### Exemple

Obligation nominale 1 000 €, coupon 5 %, maturité 3 ans, YTM demandé 6 % :

```
Prix = 50/1,06 + 50/1,06² + 1050/1,06³
Prix = 47,17 + 44,50 + 881,68 = 973,35 €
```

Prix < 1 000 € car le taux de coupon (5 %) < YTM (6 %) → décote.

### Relation prix / taux

**Relation inverse** : quand les taux montent, les prix des obligations baissent.

```
YTM > Taux coupon → Prix < Pair (décote)
YTM = Taux coupon → Prix = Pair (au pair)
YTM < Taux coupon → Prix > Pair (prime)
```

---

## 3. Duration et sensibilité

### 3.1 Duration de Macaulay

La **duration** mesure la durée de vie moyenne pondérée des flux, en années.

```
D = Σ [t × (CF_t / (1 + r)^t)] / Prix
```

**Propriétés** :
- Duration = maturité pour une obligation zéro-coupon.
- Duration < maturité pour une obligation avec coupons.
- Plus la duration est élevée, plus l'obligation est sensible aux variations de taux.

### 3.2 Duration modifiée (sensibilité)

```
D* = D / (1 + r)
```

### 3.3 Impact d'une variation de taux sur le prix

```
ΔP/P ≈ -D* × Δr
```

**Exemple** : Duration modifiée = 4 ans, taux augmente de +50 bp (0,5 %)

```
ΔP/P ≈ -4 × 0,5 % = -2 %
```

Le prix de l'obligation baisse d'environ 2 %.

### 3.4 Convexité

La duration est une approximation linéaire. La **convexité** corrige le biais pour les variations importantes de taux :

```
ΔP/P ≈ -D* × Δr + 0,5 × Convexité × (Δr)²
```

---

## 4. Types d'obligations

| Type | Caractéristique |
|------|----------------|
| **OAT** (Obligation Assimilable du Trésor) | Obligation d'État français |
| **Corporate bond** | Émise par une entreprise (IG ou HY) |
| **Obligation zéro-coupon** | Pas de coupon, émise en dessous du pair |
| **Obligation convertible** | Peut être convertie en actions |
| **Obligation à taux variable** | Coupon indexé sur un taux de référence (Euribor) |
| **Obligation indexée inflation** | Nominal ou coupon indexé sur l'inflation (OATi) |

### Notation de crédit

| Moody's | S&P | Fitch | Catégorie |
|---------|-----|-------|-----------|
| Aaa–Baa3 | AAA–BBB- | AAA–BBB- | Investment Grade (IG) |
| Ba1–B3 | BB+–B- | BB+–B- | High Yield (HY) / Spéculatif |
| Caa1–D | CCC–D | CCC–D | Détresse financière / Défaut |

---

## PARTIE B — LES ACTIONS

## 5. Caractéristiques d'une action

Une **action** est un titre de propriété représentant une fraction du capital d'une société. Elle confère :
- Droit aux **dividendes** (revenu).
- Droit de **vote** en AGO/AGE.
- Droit sur l'**actif net** en cas de liquidation.

---

## 6. Modèles de valorisation des actions

### 6.1 Modèle de Gordon-Shapiro (Dividend Discount Model)

Croissance perpétuelle des dividendes au taux `g` :

```
P₀ = D₁ / (kE - g)
```

- `D₁` : dividende attendu en année 1
- `kE` : coût des capitaux propres (MEDAF)
- `g` : taux de croissance perpétuel du dividende

**Exemple** :
- Dividende actuel : 2 €, croissance : 4 %, kE = 9 %
- D₁ = 2 × 1,04 = 2,08 €
- P₀ = 2,08 / (0,09 - 0,04) = 2,08 / 0,05 = **41,60 €**

### 6.2 Modèle à plusieurs phases

Croissance forte pendant `n` années, puis croissance stable :

```
P₀ = Σ [Dₜ / (1 + kE)ᵗ] + Pₙ / (1 + kE)ⁿ

Pₙ = D_(n+1) / (kE - g_stable)
```

### 6.3 Valorisation par les multiples

**PER** :

```
Cours = BPA × PER_sectoriel
```

**EV/EBITDA** (déjà vu en Module 3) → retrouver la valeur des capitaux propres en soustrayant la dette nette.

---

## 7. Rendement total d'une action

```
Rendement total = (Cours final - Cours initial + Dividendes) / Cours initial
               = Plus-value + Dividend Yield
```

**Exemple** :
- Cours achat : 40 €, cours vente : 46 €, dividende perçu : 2 €
- Rendement = (46 - 40 + 2) / 40 = 8 / 40 = **20 %**

---

## 8. Exercices

### Exercice 1
Obligation nominale 1 000 €, coupon 4 %, 5 ans, YTM 5 %. Calculez le prix.

> **Correction** :
> P = 40/1,05 + 40/1,05² + 40/1,05³ + 40/1,05⁴ + 1040/1,05⁵
> P = 38,10 + 36,28 + 34,55 + 32,91 + 814,46 = **956,30 €**

### Exercice 2
Une obligation a une duration modifiée de 5 ans. Si les taux augmentent de 75 bp, de combien le prix varie-t-il approximativement ?

> **Correction** : ΔP/P ≈ -5 × 0,75 % = **-3,75 %**

### Exercice 3
Une entreprise verse un dividende de 3 €. Le taux de croissance anticipé est 5 % et kE = 11 %. Quel est le cours théorique ?

> **Correction** : P₀ = 3 × 1,05 / (0,11 - 0,05) = 3,15 / 0,06 = **52,50 €**

---

## Points clés à retenir

- Prix d'une obligation = somme actualisée des coupons + nominal actualisé.
- Relation inverse prix/taux : hausse des taux → baisse des prix.
- La duration mesure la sensibilité au taux : D* × Δr ≈ variation relative du prix.
- Les actions se valorisent par DDM (dividendes actualisés) ou par multiples.
- Rendement total = plus-value + dividendes.

---

## Approfondissement théorique

### La structure par terme des taux d'intérêt

La **courbe des taux** (yield curve) représente les taux actuariels en fonction de la maturité. Elle est fondamentale pour la valorisation des obligations et constitue un indicateur économique avancé.

**Formes de la courbe** :

```
Taux
  |   /‾‾‾‾‾‾‾‾ Normale (pentue) : tx LT > tx CT
  |  /
  | /
  |/______________ Maturité

Taux
  |____
       \
        \_________  Inversée : tx CT > tx LT (signal récession)

Taux
  |‾‾‾‾‾‾‾‾‾‾‾‾‾  Plate : peu différenciée
```

**Théories explicatives** :

| Théorie | Explication |
|---------|-------------|
| **Anticipations pures** | La courbe reflète les anticipations des taux courts futurs |
| **Préférence pour la liquidité** | Les investisseurs exigent une prime pour les maturités longues |
| **Segmentation** | Chaque segment de courbe a des offrants et demandeurs distincts |
| **Habitat préféré** | Les acteurs ont des préférences pour certaines maturités mais s'en éloignent si la prime est suffisante |

**Duration de portefeuille** : dans un portefeuille obligataire, la duration est la moyenne pondérée des durations individuelles :
```
D_portfolio = Σ wᵢ × Dᵢ
```

### Les obligations à haut rendement et les spreads de crédit

Les **obligations High Yield** (BB+ et en dessous) offrent des rendements supérieurs aux IG pour compenser le risque de crédit. Le **spread de crédit** est la différence de rendement vs. l'obligation d'État de même maturité :

```
Spread = YTM_corporate - YTM_souverain (même maturité)
       ≈ PD × LGD (lien avec le risque de crédit)
```

**Exemple** : OAT 10 ans = 3 %, Corporate BBB+ 10 ans = 4,2 % → Spread = 120 bp.

**Indices de spreads** : iTraxx (Europe, CDS sur investment grade), CDX (USA). Ces indices varient selon l'appétit pour le risque des marchés.

### Évaluation des obligations convertibles

Une **obligation convertible** (OC) combine une obligation classique et une option d'achat sur les actions de l'émetteur :

```
Valeur OC = Valeur obligation pure (plancher obligataire)
           + Valeur de l'option de conversion (prime de conversion)
```

- **Plancher obligataire** : PV des flux futurs actualisé au taux de marché pour l'émetteur.
- **Prime de conversion** : valeur de l'option BSM (K = prix de conversion, S = cours actuel).

**Parité** = Cours action × Ratio de conversion (nb actions par obligation)

En pratique, si parité > valeur nette obligataire : l'OC se comporte comme une action. Sinon : comme une obligation.

---

## Exemples numériques supplémentaires

### Exemple 1 — Duration et immunisation de portefeuille

Un gérant obligataire a des engagements futurs de 1 M€ dans 6 ans. Il veut immuniser ce portefeuille contre les variations de taux. Il dispose de deux obligations :

**OBL A** : maturité 3 ans, coupon 4 %, YTM 5 % → Duration ≈ 2,85 ans
**OBL B** : maturité 10 ans, coupon 6 %, YTM 5 % → Duration ≈ 7,80 ans

```
Pour immuniser à 6 ans :
w_A × 2,85 + w_B × 7,80 = 6,0
w_A + w_B = 1

Résoudre : w_B = (6,0 - 2,85) / (7,80 - 2,85) = 3,15 / 4,95 = 63,6 %
w_A = 36,4 %
```

→ Le gérant doit investir **63,6 % en OBL B** et **36,4 % en OBL A** pour immuniser son engagement à 6 ans.

### Exemple 2 — Valorisation complète avec convexité

Obligation : nominal 1 000 €, coupon 5 %, maturité 5 ans, YTM actuel = 4 %.

**Prix actuel** :
```
P = 50/(1,04) + 50/(1,04)² + 50/(1,04)³ + 50/(1,04)⁴ + 1050/(1,04)⁵
P = 48,08 + 46,23 + 44,45 + 42,74 + 863,00 = 1 044,50 €
```

**Duration de Macaulay** (simplifiée à 4,55 ans pour cet exemple)
**Duration modifiée** : D* = 4,55 / 1,04 = 4,38 ans
**Convexité** : C ≈ 23,5 (pour cet exemple)

**Impact d'une hausse de taux de +100 bp** :
```
ΔP/P ≈ -D* × Δr + 0,5 × C × (Δr)²
       = -4,38 × 0,01 + 0,5 × 23,5 × (0,01)²
       = -0,0438 + 0,001175 = -0,0426 → -4,26 %

Nouveau prix ≈ 1 044,50 × (1 - 0,0426) = 1 044,50 × 0,9574 = **999,9 €** ≈ pair
```

La convexité **atténue** la baisse de prix vs. la seule duration (-4,38 %).

### Exemple 3 — Modèle DDM à deux phases

**Entreprise OMEGA** : secteur technologie, dividende actuel = 1 €.
Phase 1 (3 ans) : g₁ = 20 % (croissance élevée).
Phase 2 (perpétuité) : g₂ = 4 % (croissance stable).
kE = 10 %.

```
Phase 1 :
D₁ = 1 × 1,20 = 1,20 € → VA = 1,20 / 1,10 = 1,091
D₂ = 1,20 × 1,20 = 1,44 → VA = 1,44 / 1,21 = 1,190
D₃ = 1,44 × 1,20 = 1,728 → VA = 1,728 / 1,331 = 1,298

Phase 2 (prix en fin d'an 3) :
P₃ = D₄ / (kE - g₂) = 1,728 × 1,04 / (0,10 - 0,04) = 1,797 / 0,06 = 29,95 €
VA(P₃) = 29,95 / 1,331 = 22,50 €

P₀ = 1,091 + 1,190 + 1,298 + 22,50 = 26,08 €
```

---

## Applications professionnelles

### Gestion obligataire en assurance

Les assureurs-vie détiennent d'importants portefeuilles obligataires pour couvrir leurs engagements long terme (contrats d'assurance-vie, retraites). La **gestion actif-passif (ALM)** consiste à :

1. **Mesurer la duration du passif** (engagements actuariels) : typiquement 10–20 ans.
2. **Construire un portefeuille obligataire** dont la duration = duration du passif → immunisation du risque de taux.
3. **Gérer l'écart de duration** (mismatch) : si les taux montent et la duration actif < duration passif → valeur du passif baisse plus que l'actif → perte économique.

**Directive Solvabilité II** : impose de mesurer la sensibilité du bilan à une hausse des taux de +50 bp → **ORSA (Own Risk and Solvency Assessment)**.

### Trésorerie d'entreprise : gestion de la dette obligataire

Une grande entreprise (ex. Total Energies) gère sa dette obligataire comme un portefeuille :
- **Diversification des devises** : émissions en €, USD, JPY (pour couvrir les besoins en devises locales).
- **Diversification des maturités** : éviter les "walls" (remboursements massifs une même année).
- **Swap de taux** : transformer la dette à taux fixe en taux variable pour profiter des baisses de taux (ou vice versa).

---

## Erreurs fréquentes et pièges

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Confondre taux coupon et taux actuariel** | Le YTM ≠ coupon sauf si l'obligation est au pair | Toujours recalculer le YTM à partir du prix de marché |
| **Négliger la convexité pour les grandes variations de taux** | La duration donne une approximation linéaire, insuffisante pour Δr > 50 bp | Ajouter le terme de convexité pour les variations importantes |
| **Ignorer le risque de réinvestissement** | Les coupons sont réinvestis à un taux inconnu → le rendement effectif peut différer du YTM | Immunisation uniquement garantie pour une duration = horizon d'investissement |
| **Comparer rendement d'obligations de devises différentes** | Un rendement en USD de 5 % ≠ un rendement en EUR de 3 % sans tenir compte du différentiel de change | Convertir en monnaie commune avec hedge de change |
| **Valoriser actions avec DDM à g élevé perpétuellement** | g > kE est impossible à l'infini → formule explosive | Utiliser un modèle multiphase avec g terminal ≤ croissance économique |

---

## Exercices supplémentaires

### Exercice 1
Obligation : nominal 1 000 €, coupon 3 %, maturité 7 ans. YTM actuel = 2 %. Calculez (a) le prix, (b) la variation de prix approximative si les taux montent de 50 bp, sachant que D* = 6,5 ans.

> **Correction** :
> (a) Prix = Σ 30/(1,02)ᵗ + 1000/(1,02)⁷
> = 30 × [1 - (1,02)^(-7)] / 0,02 + 1000/1,149
> = 30 × 6,472 + 870,6 = 194,2 + 870,6 = **1 064,8 €**
>
> (b) ΔP/P ≈ -6,5 × 0,005 = -3,25 %
> Nouveau prix ≈ 1 064,8 × (1 - 0,0325) = 1 064,8 × 0,9675 = **1 030,2 €**

### Exercice 2
Une entreprise a un cours = 60 €, BPA = 4 €, dividende = 2 €. Taux de distribution = 50 %. kE = 8 %. Calculez le PER, le dividend yield et le taux de croissance implicite du DDM de Gordon.

> **Correction** :
> PER = 60 / 4 = **15×**
> Dividend yield = 2 / 60 = **3,33 %**
> DDM : 60 = D₁ / (kE - g) → g = kE - D₁/P₀ = 8 % - (2 × 1,0g) / 60
> En simplifiant : g ≈ kE - D₀/P₀ = 8 % - 3,33 % = **4,67 %** (croissance implicite)

### Exercice 3
Un gérant possède 100 000 € d'obligations (duration modifiée = 8 ans, YTM = 3 %). Il anticipe une hausse des taux de 75 bp. (a) Estimer la perte en valeur. (b) Comment peut-il couvrir ce risque avec des futures sur Bund (duration = 7 ans, prix = 140 000 €/contrat) ?

> **Correction** :
> (a) ΔP/P ≈ -8 × 0,0075 = -6 %
> Perte estimée = 100 000 × 6 % = **6 000 €**
>
> (b) Couverture avec futures Bund :
> Nb contrats = (Duration portefeuille / Duration futures) × (Valeur portefeuille / Valeur futures)
> = (8 / 7) × (100 000 / 140 000) = 1,143 × 0,714 = **0,816** → vendre **1 contrat**
>
> Gain sur les futures si taux +75 bp :
> ΔPrix futures ≈ -7 × 0,0075 × 140 000 = **-7 350 €** par contrat → gain de 7 350 € en position short
> Couverture partielle (gain 7 350 € > perte 6 000 €oucoup).

### Exercice 4
Calculez le rendement total d'une obligation achetée au prix de 950 € (nominal 1 000 €, coupon 5 %, maturité résiduelle 3 ans) et revendue après 2 ans à 1 020 € (après encaissement de 2 coupons de 50 €).

> **Correction** :
> Cash flows reçus : coupon an 1 = 50 €, coupon an 2 = 50 €, prix de vente = 1 020 €
> Flux total = 50 + 50 + 1 020 = 1 120 € sur 2 ans pour une mise de 950 €
>
> TRI (rendement annualisé) :
> 950 = 50/r + (50 + 1020)/(1+r)²
> Essayons r = 10 % : 50/1,10 + 1 070/1,21 = 45,45 + 884 = 929,5 (trop bas)
> r = 9 % : 50/1,09 + 1 070/1,188 = 45,87 + 900,5 = 946,4 (proche)
> r ≈ **9,1 %** annualisé (vs. 5,4 % du coupon seul — plus-value significative)
