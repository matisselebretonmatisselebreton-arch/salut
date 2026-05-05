# Chapitre 4 — Théorie moderne du portefeuille

## Introduction

La **théorie moderne du portefeuille** (MPT — Modern Portfolio Theory), développée par **Harry Markowitz** (1952, Prix Nobel 1990), formalise mathématiquement le principe de diversification : en combinant des actifs dont les rendements ne sont pas parfaitement corrélés, on réduit le risque pour un niveau de rendement donné.

---

## 1. Rendement et risque d'un actif individuel

### 1.1 Rendement espéré

```
E[R] = Σ pᵢ × Rᵢ
```

Ou sur données historiques :

```
E[R] = (1/T) × Σ Rₜ
```

### 1.2 Variance et écart-type (risque total)

```
σ² = Σ pᵢ × (Rᵢ - E[R])²
σ  = √σ²
```

---

## 2. Portefeuille de deux actifs

### 2.1 Rendement du portefeuille

```
E[Rp] = w₁ × E[R₁] + w₂ × E[R₂]
```

- `w₁ + w₂ = 1`

### 2.2 Variance du portefeuille

```
σ²p = w₁² × σ₁² + w₂² × σ₂² + 2 × w₁ × w₂ × σ₁₂
```

Avec la **covariance** :

```
σ₁₂ = ρ₁₂ × σ₁ × σ₂
```

- `ρ₁₂` : coefficient de corrélation entre actifs 1 et 2 (-1 ≤ ρ ≤ +1)

### 2.3 Effet de la corrélation

| Corrélation | Effet |
|------------|-------|
| ρ = +1 | Aucune diversification possible |
| -1 < ρ < +1 | Diversification partielle : σp < moyenne pondérée |
| ρ = -1 | Diversification parfaite possible (risque annulable) |

---

## 3. Frontière efficiente

### 3.1 Définition

La **frontière efficiente** (ou frontière de Markowitz) est l'ensemble des portefeuilles qui **maximisent le rendement pour un niveau de risque donné** (ou minimisent le risque pour un rendement donné).

```
Rendement E[Rp]
  |              ← Frontière efficiente (partie supérieure)
  |           /
  |          /
  |         /  ←── Portefeuille à variance minimale (MVP)
  |        |
  |         \
  |          \__ Inefficients (dominés)
  └─────────────────────────────── Risque σp
```

### 3.2 Portefeuille à variance minimale (MVP)

```
w₁* = (σ₂² - σ₁₂) / (σ₁² + σ₂² - 2σ₁₂)
```

---

## 4. L'actif sans risque et la droite de marché des capitaux (CML)

### 4.1 Introduction de l'actif sans risque

En combinant un portefeuille risqué P et un actif sans risque (taux rf), on obtient la **droite du marché des capitaux** (CML — Capital Market Line) :

```
E[Rp] = rf + [(E[RM] - rf) / σM] × σp
```

- `RM` : rendement du portefeuille de marché M
- `σM` : écart-type du portefeuille de marché

### 4.2 Théorème de séparation de Tobin

Le **portefeuille de marché M** est le seul portefeuille risqué optimal pour tous les investisseurs, indépendamment de leur aversion au risque. Chaque investisseur combine uniquement M et l'actif sans risque.

**Conséquence** :
- Aversion au risque forte → investir surtout en rf.
- Aversion au risque faible → investir surtout en M (voire emprunter à rf pour effet de levier).

### 4.3 Ratio de Sharpe

```
Sharpe = (E[Rp] - rf) / σp
```

Mesure le rendement excédentaire par unité de risque total. Plus il est élevé, meilleur est le portefeuille.

---

## 5. Décomposition du risque

```
Risque total = Risque systématique + Risque spécifique
σ²p          = β²p × σ²M          + σ²εp
```

- **Risque systématique** (non diversifiable) : lié aux facteurs macroéconomiques (taux, croissance).
- **Risque spécifique** (diversifiable) : lié à l'entreprise. Il disparaît dans un portefeuille diversifié.

**Théorème de diversification** : avec ~20–30 titres non corrélés, le risque spécifique est quasi éliminé.

```
Risque
  |  \
  |   \      Risque spécifique
  |    \___________________________
  |          Risque systématique
  └─────────────────────────────── Nb de titres
             20
```

---

## 6. Mesures de performance

### 6.1 Ratio de Sharpe (rappel)

```
Sharpe = (Rp - rf) / σp
```

### 6.2 Ratio de Treynor

```
Treynor = (Rp - rf) / βp
```

Rendement excédentaire par unité de risque **systématique** (pertinent pour un portefeuille bien diversifié).

### 6.3 Alpha de Jensen

```
αJ = Rp - [rf + βp × (RM - rf)]
```

L'**alpha** mesure la surperformance (ou sous-performance) par rapport à ce que prédit le MEDAF.

### 6.4 Ratio d'information

```
IR = (Rp - RBenchmark) / Tracking Error
```

Mesure l'efficacité du gestionnaire actif à générer de l'alpha par rapport à son benchmark.

---

## 7. Gestion active vs. passive

| Critère | Gestion passive | Gestion active |
|---------|----------------|---------------|
| Objectif | Répliquer un indice | Battre un indice |
| Coûts | Faibles (ETF : 0,1–0,3 %) | Élevés (fonds : 1–2 %) |
| Fréquence d'opérations | Faible | Élevée |
| Alpha attendu | Nul par construction | Positif (mais rare) |
| Fondement théorique | Efficience des marchés | Anomalies, analyse |

**Études empiriques** : moins de 30 % des fonds actifs battent leur indice sur 10 ans après frais.

---

## 8. Exercices

### Exercice 1
Deux actions A et B : E[RA] = 8 %, σA = 10 % ; E[RB] = 12 %, σB = 20 % ; ρAB = 0,3. Calculez le rendement et l'écart-type d'un portefeuille 50/50.

> **Correction** :
> E[Rp] = 0,5 × 8 % + 0,5 × 12 % = **10 %**
>
> σAB = 0,3 × 10 % × 20 % = 0,006
> σ²p = 0,25 × 0,01 + 0,25 × 0,04 + 2 × 0,5 × 0,5 × 0,006
>     = 0,0025 + 0,01 + 0,003 = 0,0155
> σp = √0,0155 = **12,45 %**

> **Effet de diversification** : la moyenne pondérée des risques = 15 %, mais σp = 12,45 % (réduction de 2,55 pts grâce à la diversification).

### Exercice 2
Un fonds a réalisé +14 % sur un an. rf = 3 %, σ fonds = 18 %, β = 1,2, rendement marché = 10 %. Calculez Sharpe, Treynor et alpha de Jensen.

> **Correction** :
> Sharpe = (14 - 3) / 18 = **0,61**
> Treynor = (14 - 3) / 1,2 = **9,17 %**
> Alpha = 14 % - [3 % + 1,2 × (10 % - 3 %)] = 14 % - 11,4 % = **+2,6 %** (surperformance)

---

## Points clés à retenir

- La diversification réduit le risque spécifique mais pas le risque systématique.
- La frontière efficiente regroupe les portefeuilles optimaux risque/rendement.
- Avec un actif sans risque, tous les investisseurs détiennent le portefeuille de marché M (théorème de Tobin).
- Alpha = surperformance ajustée du risque systématique (MEDAF).
- La gestion passive domine statistiquement la gestion active sur longue période.

---

## Approfondissement théorique

### Facteurs de risque et Smart Beta

Le modèle de **Fama & French (1993, 2015)** a démontré que le rendement des portefeuilles est mieux expliqué par des **facteurs** que par le seul bêta de marché :

| Facteur | Prime historique (USA, 1963–2020) | Source |
|---------|----------------------------------|--------|
| Marché (MKT) | ~5–6 %/an | Risque économique global |
| Taille (SMB) | ~2–3 %/an | Prime de risque des petites caps |
| Valeur (HML) | ~3–4 %/an | Entreprises décotées vs. de croissance |
| Momentum (MOM) | ~4–5 %/an (mais instable) | Persistance des tendances |
| Profitabilité (RMW) | ~2 %/an | Entreprises profitables |
| Investissement (CMA) | ~1–2 %/an | Entreprises qui investissent peu (conservative) |

**Smart Beta (ou Factor Investing)** : fonds passifs qui se construisent selon des règles factorielles plutôt que selon la capitalisation boursière.

**Arbitrage et disparition des primes** : une fois une prime documentée et connue, les investisseurs l'arbitrent → prime tend à diminuer (Schwert, 2003). La prime de valeur a été très faible sur 2010–2020.

### L'optimisation de Markowitz : les limites pratiques

En théorie, la frontière efficiente se calcule par optimisation quadratique. En pratique, plusieurs problèmes surgissent :

**1. Estimation risk** : les paramètres (μ, Σ) sont estimés sur données historiques → erreurs d'estimation importantes, surtout pour les rendements espérés.

**Stabilité de la solution** : une petite variation des inputs génère de grandes variations des poids → portefeuilles instables.

**Remèdes pratiques** :
- **Portefeuille équipondéré (1/N)** : simple mais souvent performant out-of-sample (DeMiguel et al., 2009).
- **Black-Litterman (1992)** : combine les rendements d'équilibre CAPM avec les vues du gérant via le théorème de Bayes.
- **Minimum variance** : maximise la diversification sans utiliser les rendements espérés (moins d'erreurs d'estimation).
- **Risk parity** : chaque actif contribue également au risque total du portefeuille (popularisé par Bridgewater).

### Gestion de portefeuille multi-actifs et corrélation en crise

En temps normal, les corrélations entre classes d'actifs permettent la diversification. En crise, les corrélations augmentent fortement (phénomène de **flight to quality**) :

| Paire | Corrélation normale | Corrélation crise 2008 |
|-------|--------------------|-----------------------|
| Actions / Obligations IG | -0,20 | -0,40 (refuge) |
| Actions / Or | -0,10 | -0,30 (refuge) |
| Actions Europe / USA | +0,60 | +0,90 |
| Actions / HY Bonds | +0,30 | +0,80 |

**Implication** : la diversification entre actions internationales disparaît précisément quand on en a le plus besoin. D'où l'intérêt d'actifs décorrelés structurellement : or, CTA (trend following), stratégies long volatilité.

---

## Exemples numériques supplémentaires

### Exemple 1 — Construction de la frontière efficiente (3 actifs)

**Actions A** : μ = 10 %, σ = 15 %
**Obligations B** : μ = 4 %, σ = 5 %
**Or C** : μ = 6 %, σ = 18 %

Corrélations : ρ_AB = -0,20, ρ_AC = 0,10, ρ_BC = -0,05

**Portefeuille équipondéré (33/33/33)** :
```
E[Rp] = (10 + 4 + 6) / 3 = 6,67 %

σ²_AB = ρ_AB × σ_A × σ_B = -0,20 × 15 % × 5 % = -0,0015
σ²_AC = 0,10 × 15 % × 18 % = +0,0027
σ²_BC = -0,05 × 5 % × 18 % = -0,00045

σ²_p = (1/3)² × [σ²_A + σ²_B + σ²_C + 2σ_AB + 2σ_AC + 2σ_BC]
     = (1/9) × [0,0225 + 0,0025 + 0,0324 + 2(-0,0015) + 2(0,0027) + 2(-0,00045)]
     = (1/9) × [0,0574 - 0,003 + 0,0054 - 0,0009]
     = (1/9) × 0,0589 = 0,00654

σ_p = √0,00654 = 8,09 %
Sharpe = (6,67 - 2) / 8,09 = 0,577
```

**Portefeuille minimum variance** (calculé numériquement) donnerait σ_p ≈ 5–6 % pour un rendement de ~5–6 %.

### Exemple 2 — Attribution de performance (performance attribution)

**Fonds Global Equity** vs. benchmark MSCI World :

| Zone | Poids fonds | Poids bench | Rendement fonds | Rendement bench |
|------|------------|------------|----------------|----------------|
| USA | 50 % | 65 % | +15 % | +12 % |
| Europe | 35 % | 25 % | +8 % | +10 % |
| Émergents | 15 % | 10 % | +18 % | +16 % |

```
Performance benchmark = 65%×12% + 25%×10% + 10%×16% = 7,8% + 2,5% + 1,6% = 11,9%
Performance fonds = 50%×15% + 35%×8% + 15%×18% = 7,5% + 2,8% + 2,7% = 13,0%
Surperformance totale = 13,0% - 11,9% = +1,1%

Attribution Brinson :
Allocation USA : (50%-65%) × (12%-11,9%) = -15% × 0,1% = -0,015% (légère pénalisation)
Sélection USA : 50% × (15%-12%) = 1,5% (forte surperformance de sélection)
```

Conclusion : la surperformance vient principalement de la **sélection de titres** en actions américaines.

### Exemple 3 — Risk parity vs. 60/40

**Portefeuille 60/40** : 60 % actions (σ=15 %), 40 % obligations (σ=5 %), ρ=-0,20

```
σ²_60/40 = (0,6)² × (15%)² + (0,4)² × (5%)² + 2 × 0,6 × 0,4 × (-0,20) × 15% × 5%
= 0,0081 + 0,0004 - 0,00072 = 0,00778
σ_60/40 = 8,82 %

Contribution au risque :
Actions : (0,6 × 15%)² + 0,6×0,4×(-0,20)×15%×5% = 0,0081 - 0,00036 = 0,00774 → 99,5% !
Obligations : ~0,005% → 0,5%
```

Le portefeuille 60/40 est **dominé par le risque actions à 99,5 %** → pas réellement diversifié en risque.

**Risk parity** : trouver les poids w_A, w_B tels que la contribution au risque soit 50/50 :
```
w_A × σ_A ≈ w_B × σ_B (approximation sans corrélation)
w_A × 15 = w_B × 5 → w_B = 3 × w_A
w_A + 3w_A = 1 → w_A = 25 %, w_B = 75 %
```

Avec levier, on monte ce portefeuille à un niveau de risque cible de 10 % → rendement amélioré.

---

## Applications professionnelles

### Asset Management : processus d'investissement

**Comité d'investissement** (Investment Committee) :
- Revue macroéconomique mensuelle : croissance, inflation, politique monétaire, cycle de crédit.
- Décisions d'allocation tactique : sur/sous-pondération par rapport aux benchmarks stratégiques.
- Revue sectorielle : secteurs cycliques vs. défensifs selon le cycle économique.

**Workflow de gestion de portefeuille** :
1. **Allocation stratégique** (SAA) : poids des classes d'actifs à long terme.
2. **Allocation tactique** (TAA) : ajustements court terme selon les vues macro.
3. **Sélection des titres** : analyse fondamentale bottom-up ou modèles quantitatifs.
4. **Construction du portefeuille** : optimisation des poids + contraintes (liquidité, tracking error, positions max).
5. **Exécution** : VWAP, algo trading pour minimiser l'impact de marché.
6. **Reporting** : performance attribution, attribution des risques, rapport mensuel aux clients.

### Pension Funds : gestion actif-passif (ALM)

Les fonds de pension gèrent des actifs pour couvrir des engagements futurs envers les retraités. La problématique est de minimiser le risque de déficit (actifs < passifs) :

```
Taux de couverture = Valeur actifs / Valeur actuarielle des engagements
Objectif : taux de couverture > 100 % avec un degré de confiance élevé
```

**Stratégie LDI (Liability-Driven Investing)** : investir dans des actifs dont les flux correspondent aux engagements (obligations à long terme indexées inflation).

---

## Erreurs fréquentes et pièges

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Optimiser avec des paramètres historiques** | Les rendements passés ne prédisent pas les rendements futurs | Utiliser Black-Litterman ou contraindre les poids |
| **Ignorer la corrélation dans la diversification** | Deux actifs corrélés à +0,9 n'apportent presque aucune diversification | Chercher des actifs réellement décorrélés |
| **Confondre Sharpe et alpha de Jensen** | Sharpe mesure le risque total ; Jensen mesure le risque systématique | Utiliser Sharpe pour les portefeuilles, Jensen pour un actif dans un portefeuille diversifié |
| **Penser que plus d'actifs = toujours mieux** | Au-delà de 30–40 actifs, le bénéfice marginal de diversification est quasi nul | Ne pas diluer un portefeuille concentré de qualité avec des positions de remplissage |
| **Négliger les coûts de rééquilibrage** | Rééquilibrer fréquemment génère des coûts de transaction | Définir des seuils de dérive (5 %) avant de rééquilibrer |

---

## Exercices supplémentaires

### Exercice 1
Un investisseur combine l'actif A (μ=12 %, σ=20 %) avec l'actif sans risque (rf=2 %). Il souhaite un écart-type de portefeuille de 15 %. Calculez les poids et le rendement espéré.

> **Correction** :
> σ_p = w_A × σ_A (car σ_rf = 0)
> 15 % = w_A × 20 % → w_A = **75 %**, w_rf = **25 %**
> E[Rp] = 75 % × 12 % + 25 % × 2 % = 9 % + 0,5 % = **9,5 %**
> Sharpe = (9,5 % - 2 %) / 15 % = **0,50**

### Exercice 2
Un fonds a réalisé : Rp = 16 %, rf = 3 %, βp = 1,3, σp = 22 %, Rbenchmark = 12 %, Tracking Error = 6 %. Calculez Sharpe, Treynor, Alpha Jensen et Ratio d'Information.

> **Correction** :
> Sharpe = (16 - 3) / 22 = **0,591**
> Treynor = (16 - 3) / 1,3 = **10,0 %**
> RM - rf = (12 - 3) = 9 %
> Alpha Jensen = 16 - [3 + 1,3 × 9] = 16 - 14,7 = **+1,3 %**
> Ratio d'Information = (16 - 12) / 6 = **0,667**
> Interprétation : le fonds génère une bonne surperformance mais son alpha vs. MEDAF est modeste (1,3 %).

### Exercice 3
Expliquez pourquoi un investisseur rationnel n'a jamais intérêt à détenir un portefeuille en dessous de la frontière efficiente, selon la théorie de Markowitz.

> **Correction** :
> Un portefeuille en dessous de la frontière efficiente est **dominé** : il existe un portefeuille sur la frontière qui offre :
> - Le même rendement espéré pour un risque plus faible (dominance en risque), OU
> - Le même risque pour un rendement plus élevé (dominance en rendement).
>
> Un investisseur rationnel préfère toujours plus de rendement pour moins de risque → il n'y a aucune justification économique à rester sur un portefeuille sous-optimal.
>
> **Exception** : si des contraintes (liquidité, réglementaires, fiscales) empêchent de détenir certains actifs, l'investisseur peut se retrouver dans une "frontière efficiente contrainte" différente de la frontière théorique.
