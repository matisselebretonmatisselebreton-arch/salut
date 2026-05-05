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
