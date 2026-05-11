# Chapitre 3 — Crédit et Spreads

## Introduction

Le **risque de crédit** est le risque qu'un émetteur (entreprise ou État) ne rembourse pas sa dette. Les **spreads de crédit** mesurent la prime de risque exigée par les investisseurs par rapport à un taux sans risque. La gestion du crédit est l'un des principaux générateurs d'alpha en gestion obligataire.

---

## 1. Notation de crédit

### 1.1 Les agences de notation

Les trois grandes agences de notation (S&P, Moody's, Fitch) évaluent la capacité de remboursement des émetteurs :

| S&P / Fitch | Moody's | Catégorie | Description |
|------------|---------|-----------|-------------|
| AAA | Aaa | Investment Grade | Qualité maximale |
| AA+, AA, AA- | Aa1, Aa2, Aa3 | Investment Grade | Très haute qualité |
| A+, A, A- | A1, A2, A3 | Investment Grade | Haute qualité |
| BBB+, BBB, BBB- | Baa1, Baa2, Baa3 | Investment Grade | Bonne qualité (limite basse) |
| BB+, BB, BB- | Ba1, Ba2, Ba3 | High Yield (spéculatif) | Speculative |
| B+, B, B- | B1, B2, B3 | High Yield | Hautement spéculatif |
| CCC, CC, C | Caa, Ca, C | Distressed | Risque de défaut élevé |
| D | D | Défaut | En défaut |

**Seuil critique** : BBB- (S&P) / Baa3 (Moody's) est la limite entre IG et HY (High Yield). Un **fallen angel** est un émetteur qui passe de IG à HY → déclencheur de ventes forcées par les gérants contraints IG.

### 1.2 Déterminants de la notation

```
Analyse crédit fondamentale :

Facteurs quantitatifs :
  → Levier financier (Dette nette / EBITDA) : < 2x = excellent, 3-4x = moyen, > 5x = risqué
  → Couverture des intérêts (EBIT / Intérêts) : > 5x = solide, < 2x = fragile
  → Flux de trésorerie libre (FCF) : récurrence et croissance
  → Liquidité (cash + lignes de crédit vs dettes à court terme)

Facteurs qualitatifs :
  → Position concurrentielle (leadership, barrières à l'entrée)
  → Diversification (clients, géographies, produits)
  → Historique de gestion (track record en période difficile)
  → Actionnariat (PE vs familial vs coté)
```

---

## 2. Les mesures de spread

### 2.1 Spread nominal (ou I-spread)

```
I-spread = Rendement obligataire - Rendement de l'obligation souveraine de même maturité

Exemple : Obligation corporate BBB, YTM = 4,5 %, OAT même maturité YTM = 2,8 %
I-spread = 4,5 % - 2,8 % = 170 pb
```

### 2.2 Z-spread (Zero-coupon spread)

```
Le Z-spread est le spread constant à ajouter à tous les taux zéro coupon de la courbe sans risque
pour que la VAN des flux égale le prix de l'obligation.

P = Σ [Ct / (1 + r_t + Z)^t]

Plus précis que l'I-spread car utilise toute la courbe des taux (et non un seul point).
```

### 2.3 OAS (Option-Adjusted Spread)

```
Pour les obligations avec options (callable, puttable, MBS) :
OAS = Z-spread - Valeur de l'option (en spread)

Pour une callable bond :
  OAS < Z-spread (la valeur du call réduit le spread dû au risque crédit pur)
  
OAS mesure le spread "pur" crédit, indépendamment de la valeur de l'option intégrée.
→ Référence pour comparer des obligations avec des options différentes
```

### 2.4 DTS (Duration Times Spread)

```
DTS = Duration modifiée × Spread (en bp)

Mesure la contribution au risque de spread du portefeuille.
Une position avec DTS élevé est très sensible aux variations de spreads.

Exemple :
  Obligation HY B, duration 4 ans, spread 500 bp → DTS = 4 × 500 = 2 000 bp.ans
  
  Si le spread s'élargit de 100 bp :
  ΔP/P ≈ - Duration × ΔSpread = -4 × 1 % = -4 %
  
  Contribution DTS à la perte : approx -DTS × Δspread (en bp) / 10 000
                               = -2 000 × 100 / 10 000 = -20 % (de la valeur DTS)
```

---

## 3. Modèles de crédit

### 3.1 Modèle de Merton (1974)

Le modèle de Merton traite les fonds propres comme une **option d'achat** sur les actifs de l'entreprise.

```
Analogie :
  Valeur des actifs (V) = Valeur de la dette (D) + Valeur des fonds propres (E)
  E = max(V - D, 0) = Call sur V avec strike = D (valeur nominale de la dette)
  
  L'entreprise fait défaut si V < D à maturité de la dette.
  La dette vaut : D × e^(-rT) - Put(V, D) (dette sans risque moins un put)
  
  Plus l'effet de levier est élevé (V/D proche de 1) :
  → La dette ressemble à un put en-dehors-de-la-monnaie → spread élevé
  
  Distance au défaut (DD) = (ln(V/D) + (μ - σ²/2) × T) / (σ × √T)
  Probabilité de défaut = N(-DD)
```

### 3.2 Modèles à intensité (Reduced-form)

```
Approche Jarrow-Turnbull, Duffie-Singleton :
  Le défaut survient selon un processus de Poisson avec intensité λ (hazard rate)
  
  Spread ≈ λ × (1 - R)
  
  λ = hazard rate (probabilité de défaut par unité de temps)
  R = taux de recouvrement (recovery rate)
  
  Exemple : Spread = 200 pb, R = 40 %
  λ = 200 / (1 - 0,40) / 10 000 = 200 / 0,6 / 100 = 3,33 %/an
  → Probabilité implicite de défaut ≈ 3,33 %/an
```

---

## 4. Marchés des CDS (Credit Default Swaps)

### 4.1 Fonctionnement d'un CDS

Un **CDS** est un contrat d'assurance contre le défaut d'un émetteur :

```
Protection buyer (acheteur) → paie le spread CDS régulièrement (prime)
  ↕
Protection seller (vendeur) → paie en cas de défaut (1 - Recovery Rate) × Notionnel

Exemple : CDS 5 ans sur obligation BBB, spread = 150 bp
  
  Acheteur paie : 150 bp × 10 M€ = 150 000 €/an pendant 5 ans
  Si défaut à l'an 3 (Recovery = 40 %) :
    Vendeur paie : (1 - 40%) × 10 M€ = 6 000 000 €
    Settlement physique : acheteur livre l'obligation, reçoit 10 M€
```

### 4.2 CDS indices

**CDX (USA) et iTraxx (Europe)** : indices de CDS permettant d'investir ou couvrir un panier de 125 émetteurs corporate.

```
iTraxx Main (125 IG euros) : spread ~70-80 bp (2024)
  → Vendre protection = short risque crédit IG Europe (bull)
  → Acheter protection = hedge / long risque crédit (bear)
  
iTraxx Crossover (75 sub-IG) : spread ~300-400 bp (2024)
  → Beaucoup plus volatile, proxy HY Europe
```

---

## 5. Approfondissement théorique

### Le puzzle du crédit (credit spread puzzle)

**Fait empirique** : les spreads de crédit sont systématiquement plus élevés que ce que justifient les probabilités de défaut historiques (Elton et al., 2001).

Exemple :
```
Obligation IG 10 ans historique :
  Probabilité de défaut cumulée sur 10 ans : ~2 %
  Recovery rate moyen : 40 %
  Perte espérée par an = 2 % × (1-40%) / 10 = 0,12 %/an = 12 bp
  
  Mais les spreads IG sont de 100-150 bp !
  
  Surplus de spread = 100 - 12 = 88 bp → d'où vient-il ?
```

**Explications** :
1. **Prime de liquidité** : les obligations corporate sont moins liquides que les souverains → 30-50 pb de prime de liquidité
2. **Prime de risque systématique** : les défauts sont corrélés (arrivent en récession) → prime pour risque non-diversifiable
3. **Taxes** : les investisseurs américains paient des impôts sur les coupons → prime fiscale
4. **Incertitude sur les paramètres** (parameter uncertainty) : les probabilités de défaut et recovery rates sont incertains

---

## Exemples numériques

### Exemple 1 — Analyse crédit d'un émetteur HY

Société industrielle européenne, notation B+ :
```
Bilan et P&L (M€) :
  CA : 800, EBITDA : 120 (marge 15 %), EBIT : 70
  Dette nette : 480 (dont 300 M€ Senior Secured, 180 M€ Mezzanine)
  Cash : 50, Lignes de crédit disponibles : 100

Ratios :
  Dette nette / EBITDA = 480 / 120 = 4,0x (élevé pour B+)
  EBIT / Intérêts (ICR) = 70 / 36 = 1,94x (faible, risque)
  FCF = EBITDA - Capex - Intérêts - Impôts = 120 - 30 - 36 - 10 = 44 M€
  FCF / Dette nette = 44 / 480 = 9,2 % → remboursement de la dette en ~11 ans
  
  Analyse de liquidité :
  Dettes à rembourser < 2 ans : 80 M€
  Cash + lignes : 150 M€ → Couverture de 1,88x → OK à court terme
  
Spread historique pour ce profil (B+, secteur industriel) : 450-550 bp
YTM observable = taux souverain + spread = 3 % + 500 bp = 8 %
```

### Exemple 2 — Calcul de probabilité de défaut implicite

Obligation d'entreprise notée BB, YTM = 6,5 %, taux sans risque = 3 %, Recovery = 40 %.

```
Spread = 6,5 % - 3 % = 350 bp

λ = Spread / (1 - R) = 3,5 % / (1 - 40 %) = 3,5 % / 60 % = 5,83 %/an

Probabilité de défaut sur 5 ans :
  P(défaut < 5 ans) = 1 - e^(-λ×T) = 1 - e^(-0,0583×5) = 1 - e^(-0,2917) = 1 - 0,747 = 25,3 %
```

---

## Applications professionnelles

### Construction d'un portefeuille crédit IG/HY

Un gérant construit un portefeuille "credit alpha" :
```
Allocation :
  50 % IG (DTS moyen 300) : obligations BBB sélectionnées pour valeur relative
  30 % BB (DTS 800) : fallen angels en voie de reclassification IG
  20 % B+ sécurisés (DTS 1 600) : dette sénior secured covenant heavy
  
  DTS total = 50%×300 + 30%×800 + 20%×1600 = 150 + 240 + 320 = 710 bp.ans
  
  Si spreads s'élargissent de 50 bp uniformément :
  Impact portefeuille = -710 × 50 / 10 000 = -3,55 %
```

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Confondre I-spread et OAS** | L'OAS est ajusté des options intégrées, l'I-spread ne l'est pas | Pour les callables, toujours utiliser l'OAS |
| **Ignorer le risque de liquidité crédit** | En crise, les spreads s'élargissent ET la liquidité disparaît | Stress-tester les spreads en incluant l'élargissement du bid-ask |
| **Sous-estimer le risque de fallen angel** | La dégradation BBB→HY entraîne des ventes forcées → effet boule de neige | Surveiller les "BBB-" susceptibles de dégradation |
| **Mal interpréter la notation** | Une notation est une opinion ponctuelle, pas une garantie | Compléter par une analyse interne propriétaire |

---

## Exercices

### Exercice 1
Une obligation corporate 5 ans, coupon 6 %, prix 95 €. Taux souverain 5 ans = 3,5 %. Recovery = 45 %. Calculez le YTM approximatif, l'I-spread, et la probabilité de défaut implicite annuelle.

> **Correction** :
> YTM approximatif = [6 + (100-95)/5] / [(100+95)/2] = [6+1] / 97,5 = 7/97,5 = **7,18 %**
>
> I-spread = 7,18 % - 3,5 % = **368 pb**
>
> λ = 3,68 % / (1 - 45 %) = 3,68 / 55 % = **6,69 %/an**

### Exercice 2
Expliquez pourquoi les "fallen angels" peuvent représenter une opportunité d'investissement pour les gérants HY, et quels sont les risques associés.

> **Correction** :
> **Opportunité** : lors du passage de IG à HY, les gérants contraints IG (assureurs, fonds mandatés IG only) sont forcés de vendre → pression vendeuse artificielle → spreads s'élargissent au-delà de ce que justifient les fondamentaux → les gérants HY peuvent acheter à des niveaux attractifs avec un potentiel de compression des spreads si la société se redresse.
>
> Études empiriques : les fallen angels surperforment les obligations HY originellement émises en spéculatif de +2-3 %/an (plus grande taille, meilleure liquidité, recouvrement souvent supérieur).
>
> **Risques** : la dégradation peut continuer (BBB- → BB → B) si les problèmes sont structurels. Les ventes forcées peuvent durer plusieurs mois. Le cas Enron, Worldcom, Casino (France) illustre que certains fallen angels ne se relèvent pas.
