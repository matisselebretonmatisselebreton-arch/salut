# Chapitre 3 — Structure du capital et théorèmes de Modigliani-Miller

## Introduction

La structure du capital désigne la combinaison de fonds propres et de dettes utilisée pour financer les actifs d'une entreprise. La question centrale est : **existe-t-il une structure optimale qui maximise la valeur de l'entreprise ?**

---

## 1. Les théorèmes de Modigliani-Miller (1958–1963)

### 1.1 Proposition I — sans impôt (1958)

> En l'absence d'impôts, de coûts de transaction et d'asymétrie d'information, **la valeur d'une entreprise est indépendante de sa structure financière.**

```
V_L = V_U
```

- V_L : valeur de l'entreprise endettée (Levered)
- V_U : valeur de l'entreprise non endettée (Unlevered)

**Intuition** : la structure financière découpe simplement le gâteau différemment (entre créanciers et actionnaires), mais ne change pas la taille du gâteau.

### 1.2 Proposition II — sans impôt

Le coût des capitaux propres d'une entreprise endettée est supérieur au WACC car les actionnaires portent le risque financier en plus du risque opérationnel :

```
kE = kU + (kU - kD) × D/E
```

- kU : coût des capitaux propres sans dette
- kD : coût de la dette
- D/E : ratio d'endettement

Le WACC reste constant (indépendant de la structure financière).

### 1.3 Proposition I — avec impôt (1963)

En présence de l'impôt sur les sociétés, les **intérêts sont déductibles** → **avantage fiscal de la dette** (tax shield) :

```
V_L = V_U + t × D
```

- `t × D` : valeur actuelle du bouclier fiscal = taux d'IS × montant de la dette

**Conséquence** : plus la dette est élevée, plus l'entreprise vaut. La structure optimale serait 100 % dette — mais des facteurs réels (coûts de détresse financière) contrebalancent cet avantage.

---

## 2. La théorie du compromis (Trade-off Theory)

### Principe

La valeur de l'entreprise endettée est :

```
V_L = V_U + PV(Bouclier fiscal) - PV(Coûts de détresse financière)
```

**Coûts de détresse financière** :
- **Directs** : frais juridiques de faillite, administrateurs judiciaires.
- **Indirects** : perte de clients (doutes sur la pérennité), départ de talents, renégociation des contrats.

### Structure optimale

```
Valeur
  │            *  ← optimum
  │          /  \
  │         /    \___
  │        /
  │_______/
  └──────────────────── D/E
```

L'optimum est atteint quand la valeur marginale du bouclier fiscal = coût marginal de la détresse financière.

---

## 3. La théorie du financement hiérarchique (Pecking Order)

**Myers & Majluf (1984)** : en présence d'asymétrie d'information, les entreprises préfèrent les sources de financement dans l'ordre suivant :

```
1. Autofinancement (CAF) — pas de signal au marché
2. Dette (émission d'obligations) — signal neutre
3. Capitaux propres (émission d'actions) — signal négatif : le marché y voit une indication que l'action est surévaluée
```

**Implication** : il n'y a pas de structure cible fixe ; la structure financière évolue au fil des besoins de financement.

---

## 4. Ratios et indicateurs de structure financière

### 4.1 Gearing

```
Gearing = Dette nette / Capitaux propres
```

### 4.2 Ratio dette nette / EBITDA

```
Levier = Dette nette / EBITDA
```

Niveaux de référence :
- Investment grade : < 3×
- LBO typique : 4–6×
- Stress financier : > 6×

### 4.3 Couverture des charges financières (ICR)

```
ICR = EBIT / Charges financières
```

Référence banques : > 3×

---

## 5. Ajustement du bêta pour l'effet de levier

### Bêta désendetté (Asset Beta)

Pour évaluer le risque opérationnel pur (hors structure financière) :

```
βA = βE / [1 + (1 - t) × D/E]
```

- βE : bêta des capitaux propres (observable en bourse)
- βA : bêta de l'actif économique (bêta désendetté)

### Réendettement (releveraging)

Pour une nouvelle structure de capital D'/E' :

```
βE' = βA × [1 + (1 - t) × D'/E']
```

**Application** : lors d'un DCF d'une entreprise non cotée, on :
1. Collecte les βE de comparables cotés
2. Désendette ces βE au niveau de structure de chaque comparable
3. Fait la moyenne des βA
4. Réendette au niveau de structure cible de la cible

---

## 6. Covenants et clauses de dette

### Covenants financiers (maintenance)

| Covenant | Formule | Exemple |
|---------|---------|---------|
| Gearing maximum | D nette / CP ≤ X | ≤ 2× |
| Levier maximum | D nette / EBITDA ≤ X | ≤ 4× |
| Couverture minimum | EBITDA / Charges financières ≥ X | ≥ 3× |

### Autres protections

- **Clause de pari passu** : égalité de rang entre créanciers.
- **Negative pledge** : interdiction de nantir des actifs sans accord du prêteur.
- **Change of control** : remboursement anticipé en cas de changement de contrôle.

---

## 7. Exercices

### Exercice 1
Une entreprise non endettée vaut 500 M€ et son taux d'IS est 25 %. Elle s'endette à hauteur de 200 M€. Quelle est sa nouvelle valeur selon MM avec impôt ?

> **Correction** : V_L = V_U + t × D = 500 + 0,25 × 200 = 500 + 50 = **550 M€**

### Exercice 2
Une entreprise a un bêta d'actif de 0,9, D/E = 1, t = 25 %. Calculez son bêta des capitaux propres.

> **Correction** : βE = βA × [1 + (1 - 0,25) × 1] = 0,9 × 1,75 = **1,575**

### Exercice 3
L'entreprise GAMMA a : EBIT = 80 M€, charges financières = 20 M€, dette nette = 200 M€, capitaux propres = 150 M€. Calculez le gearing, le levier (EBITDA = 100 M€) et l'ICR. Interprétez.

> **Correction** :
> Gearing = 200 / 150 = **1,33×** (acceptable mais significatif)
> Levier = 200 / 100 = **2×** (confortable, investment grade)
> ICR = 80 / 20 = **4×** (couverture suffisante, > 3×)
> Diagnostic : structure financière dans les limites raisonnables.

---

## Points clés à retenir

- MM sans impôt : structure financière neutre sur la valeur.
- MM avec impôt : la dette crée de la valeur via le bouclier fiscal.
- Le trade-off équilibre bouclier fiscal et coûts de détresse : il existe un optimum.
- La pecking order explique le comportement empirique des entreprises : autofinancement d'abord.
- Pour valoriser une cible, on désendette/réendette le bêta selon la structure financière cible.

---

## Approfondissement théorique

### Market Timing et la théorie de l'opportunité de marché

**Baker & Wurgler (2002)** proposent la **Market Timing Theory** : les entreprises émettent des actions quand elles sont surévaluées (cours élevé) et rachètent leurs actions quand elles sont sous-évaluées. La structure financière serait donc le résultat cumulatif des décisions de market timing passées, non une cible optimale.

**Implication** : les entreprises ayant émis beaucoup d'actions en période de hautes valorisations ont tendance à avoir des ratios dettes/capitaux propres durablement bas.

**Evidence** : le ratio M/B (Market-to-Book) historique prédit la structure financière actuelle → preuve empirique du market timing.

### La théorie des signaux (Signaling Theory)

**Ross (1977)** modélise la dette comme un **signal de qualité** : un dirigeant qui sait que son entreprise est solide s'endette davantage (il sait qu'elle peut honorer ses dettes). Une entreprise fragile ne peut pas imiter ce signal (trop coûteux).

→ Annonces d'émission d'obligations → signal positif (confiance dans les cash-flows futurs)
→ Annonces d'augmentation de capital → signal négatif (le management pense l'action surévaluée)

Ce raisonnement renforce la **Pecking Order** : l'émission d'actions est toujours interprétée négativement.

**Myers (1984)** introduit le concept de "**debt overhang**" : si une entreprise très endettée souhaite lever des capitaux pour investir, les nouveaux actionnaires craignent que la valeur revienne principalement aux créanciers → sous-investissement.

### Les coûts de détresse financière : évidence empirique

**Andrade & Kaplan (1998)** étudient les LBO des années 1980 tombés en détresse financière. Ils estiment les **coûts indirects** de la détresse à 10–20 % de la valeur de l'entreprise (perte de clients, fournisseurs exigeant paiement comptant, départs de talents).

**Coûts directs** (faillite légale) : 3–5 % de la valeur des actifs (honoraires avocats, administrateurs judiciaires).

→ Total coûts de détresse : **15–25 %** de la valeur de l'entreprise en cas de faillite.

Cela tempère significativement le gain du bouclier fiscal dans la trade-off theory.

---

## Exemples numériques supplémentaires

### Exemple 1 — Trade-off Theory : structure optimale

**Entreprise ZETA** non endettée vaut 1 000 M€. IS = 25 %, coût de la dette = 5 %.
Coûts de détresse financière :

| Niveau dette (D) | Bouclier fiscal (t×D) | Coûts détresse estimés | VL |
|-----------------|----------------------|----------------------|----|
| 0 | 0 | 0 | 1 000 |
| 100 | 25 | 5 | 1 020 |
| 200 | 50 | 15 | 1 035 |
| 300 | 75 | 35 | 1 040 |
| 400 | 100 | 75 | 1 025 |
| 500 | 125 | 150 | 975 |

**Optimum** : D = 300 M€ → VL = 1 040 M€. Au-delà, les coûts de détresse augmentent plus vite que le bouclier fiscal.

### Exemple 2 — Désendettement/ré-endettement du bêta en M&A

**Contexte** : valorisation d'une cible non cotée dans le secteur agroalimentaire.

**Comparables cotés** :

| Comparable | βE | D/CP | t |
|-----------|-----|------|---|
| Danone | 0,70 | 0,60 | 25 % |
| Nestlé | 0,65 | 0,50 | 20 % |
| Unilever | 0,80 | 0,80 | 25 % |

**Désendettement** :
```
Danone : βA = 0,70 / (1 + 0,75 × 0,60) = 0,70 / 1,45 = 0,483
Nestlé : βA = 0,65 / (1 + 0,80 × 0,50) = 0,65 / 1,40 = 0,464
Unilever : βA = 0,80 / (1 + 0,75 × 0,80) = 0,80 / 1,60 = 0,500

βA moyen = (0,483 + 0,464 + 0,500) / 3 = 0,482
```

**Ré-endettement pour la cible** (D/CP cible = 1,0, t = 25 %) :
```
βE cible = 0,482 × (1 + 0,75 × 1,0) = 0,482 × 1,75 = 0,844

WACC cible : rf = 2,5 %, prime marché = 5 %
kE = 2,5 % + 0,844 × 5 % = 2,5 % + 4,22 % = 6,72 %
kD après IS = 5 % × (1 - 25 %) = 3,75 %
WACC = 6,72 % × 0,5 + 3,75 % × 0,5 = 5,24 %
```

### Exemple 3 — Effet de levier sur le ROE

**Entreprise THETA** : ROCE = 14 %, IS = 25 %, trois scénarios d'endettement :

| Scénario | D/CP | Coût dette brut | Effet levier |
|---------|------|-----------------|-------------|
| Zéro dette | 0 | — | ROE = ROCE = 14 % |
| Modéré | 0,5 | 6 % | ROE = 14 % + (14 % - 4,5 %) × 0,5 = **18,75 %** |
| Élevé | 2,0 | 8 % | ROE = 14 % + (14 % - 6 %) × 2 = **30 %** |
| Stress (ROCE < kD) | 2,0 | 8 % (ROCE=7 %) | ROE = 7 % + (7 % - 6 %) × 2 = **9 %** → dégradé |

*Coût dette après IS = 6 % × 0,75 = 4,5 % ; 8 % × 0,75 = 6 %*

---

## Applications professionnelles

### Corporate Treasury : gestion de la structure de capital

Le département Trésorerie/Finance d'un groupe (ex. Airbus, LVMH) gère en permanence :

**1. Politique de financement** :
- Définir le levier cible (ex. : "Nous visons un ratio Dette nette/EBITDA de 1,5–2,0×").
- Diversifier les sources de financement : syndicated loans, obligations corporate, commercial paper, NEU-CP (France).
- Gérer la maturité de la dette : étaler les remboursements ("maturity wall" à éviter).

**2. Note de crédit** :
Les émetteurs investment grade (BBB- à AAA) bénéficient de coûts de financement bien inférieurs aux high yield. La différence de spread peut être 100–300 bp → impact significatif sur le résultat financier.

```
Emprunt de 1 Md€ sur 7 ans :
IG (BBB+) → taux = 3,5 % → intérêts annuels = 35 M€
HY (BB+) → taux = 6,0 % → intérêts annuels = 60 M€
Différentiel = 25 M€/an × 7 ans = 175 M€ d'économie sur la durée de vie
```

**3. Rachats d'actions (buybacks)** :
Quand ROCE > kD et que les opportunités d'investissement sont limitées, distribuer aux actionnaires via rachat d'actions est préférable au thésaurisation.

### Agences de notation : processus d'évaluation

Moody's/S&P analysent la structure du capital selon plusieurs axes :

- **Profil de l'activité** : secteur, position concurrentielle, diversification.
- **Profil financier** : ratio de levier (Dette/EBITDA), couverture (EBITDA/intérêts), liquidité.
- **Facteurs qualitatifs** : gouvernance, management, stratégie.

Exemple de grille Moody's (simplifiée) :
| Dette/EBITDA | Couverture intérêts | Rating implicite |
|-------------|---------------------|-----------------|
| < 1× | > 8× | Aaa–Aa |
| 1–2× | 5–8× | A |
| 2–3× | 3–5× | Baa (IG) |
| 3–5× | 1,5–3× | Ba–B (HY) |
| > 5× | < 1,5× | Caa+ (distressed) |

---

## Erreurs fréquentes et pièges

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Croire que plus de dette = toujours mieux** | Le bouclier fiscal est limité par les coûts de détresse et les risques de covenant breach | Optimiser autour de la structure cible, pas à 100 % dette |
| **Ignorer la note de crédit dans le coût de la dette** | Plus d'endettement → downgrade → hausse du coût de la dette → coûts de détresse financière plus tôt | Modéliser l'impact des ratios de crédit sur le spread |
| **Confondre gearing comptable et levier économique** | La dette nette (dettes - cash) diffère de l'endettement brut | Toujours calculer la dette nette (netting du cash) |
| **Ne pas désendetter le bêta** | Comparer des bêtas d'entreprises avec des structures financières différentes | Désendetter systématiquement avant toute comparaison de risque opérationnel |
| **Oublier les provisions et engagements dans la "dette"** | Provisions retraites, engagements de lease → dette économique hors bilan | Intégrer dans la dette nette ajustée |

---

## Exercices supplémentaires

### Exercice 1
Une entreprise non endettée vaut 800 M€ (t = 25 %). Elle s'endette à 300 M€ (dette perpétuelle). (a) Quelle est sa nouvelle valeur selon MM avec impôt ? (b) Si les coûts de détresse sont estimés à 40 M€ (présents), quelle est la valeur réelle ?

> **Correction** :
> (a) V_L = 800 + 0,25 × 300 = **875 M€**
> (b) V_L ajustée = 875 - 40 = **835 M€** (supérieure à V_U = 800 M€ mais moins qu'en MM pur)

### Exercice 2
Une entreprise a ROCE = 16 %, coût de la dette avant IS = 7 %, IS = 25 %, D/CP = 1,5. Calculez le ROE. L'endettement est-il favorable ?

> **Correction** :
> Coût dette après IS = 7 % × (1 - 25 %) = 5,25 %
> ROE = ROCE + (ROCE - kD après IS) × D/CP
>     = 16 % + (16 % - 5,25 %) × 1,5 = 16 % + 10,75 % × 1,5 = 16 % + **16,1 % = 32,1 %**
> ROCE (16 %) > coût dette après IS (5,25 %) → effet de levier positif ✓

### Exercice 3
Trois comparables du secteur retail ont des bêtas capitaux propres et structures financières suivantes : A (βE=1,2, D/CP=0,8, t=25 %), B (βE=1,0, D/CP=0,5, t=25 %), C (βE=1,4, D/CP=1,2, t=25 %). La cible X visée aura D/CP = 0,6, t = 25 %. Calculez le WACC de X (rf = 2 %, prime marché = 5 %, coût dette brut = 4,5 %).

> **Correction** :
> Désendettement des comparables :
> βA_A = 1,2 / (1 + 0,75 × 0,8) = 1,2 / 1,60 = 0,750
> βA_B = 1,0 / (1 + 0,75 × 0,5) = 1,0 / 1,375 = 0,727
> βA_C = 1,4 / (1 + 0,75 × 1,2) = 1,4 / 1,90 = 0,737
> βA moyen = (0,750 + 0,727 + 0,737) / 3 = **0,738**
>
> Ré-endettement de X (D/CP = 0,6) :
> βE_X = 0,738 × (1 + 0,75 × 0,6) = 0,738 × 1,45 = **1,070**
>
> WACC de X :
> kE = 2 % + 1,070 × 5 % = **7,35 %**
> kD après IS = 4,5 % × 0,75 = 3,375 %
> Poids : E/(D+E) = 1/1,6 = 62,5 %, D/(D+E) = 37,5 %
> WACC = 7,35 % × 62,5 % + 3,375 % × 37,5 % = 4,594 % + 1,266 % = **5,86 %**
