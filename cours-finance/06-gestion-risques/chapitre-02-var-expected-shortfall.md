# Chapitre 2 — Mesure du risque de marché : VaR et Expected Shortfall

## Introduction

La **VaR** (Value at Risk) est la mesure de risque de marché la plus répandue dans la pratique bancaire et financière. Elle quantifie la perte maximale probable sur un portefeuille pour un niveau de confiance et un horizon donnés.

---

## 1. Définition de la VaR

### 1.1 Définition formelle

```
VaR(α, h) = q_(1-α)(L_h)
```

La VaR à `(1-α) %` de confiance sur `h` jours est le quantile `(1-α)` de la distribution des pertes sur `h` jours.

**Exemple** : VaR 99 % à 1 jour = 1 M€ signifie :

> "La perte quotidienne ne dépassera pas 1 M€ dans 99 % des cas.
> Il y a 1 % de chance de perdre plus de 1 M€ sur une journée."

### 1.2 Paramètres clés

| Paramètre | Valeur courante |
|-----------|----------------|
| Niveau de confiance | 95 % ou 99 % |
| Horizon | 1 jour (trading) ou 10 jours (Bâle) |

---

## 2. Méthodes de calcul de la VaR

### 2.1 VaR paramétrique (méthode analytique)

Hypothèse : les rendements suivent une **loi normale**.

```
VaR(α) = -μ_P + z_α × σ_P
```

Où `z_α` est le quantile de la loi normale :
- z_95% = 1,645
- z_99% = 2,326

Pour un portefeuille :

```
VaR = W × σ_P × z_α × √h
```

- `W` : valeur du portefeuille
- `σ_P` : écart-type quotidien du portefeuille
- `h` : horizon en jours (règle de la racine carrée du temps)

**Exemple** :
- Portefeuille = 10 M€, σ = 1,5 %/jour, niveau de confiance 99 %
- VaR (1 jour, 99 %) = 10 000 000 × 1,5 % × 2,326 = **348 900 €**
- VaR (10 jours, 99 %) = 348 900 × √10 = **1 103 066 €**

### 2.2 VaR historique (Historical Simulation)

1. Recueillir les **rendements historiques** sur les N dernières périodes (ex : 500 jours).
2. Appliquer ces rendements au portefeuille actuel.
3. Trier les P&L simulés par ordre croissant.
4. La VaR 99 % est le 1er percentile (5ème pire perte sur 500 observations).

**Avantages** : aucune hypothèse de distribution, capture les fat tails.
**Limites** : dépend de la période historique choisie, lente à s'adapter.

### 2.3 VaR par simulation de Monte Carlo

1. Modéliser les processus stochastiques des facteurs de risque.
2. Simuler N scénarios (ex : 100 000 chemins).
3. Calculer la P&L du portefeuille pour chaque scénario.
4. Lire le quantile correspondant au niveau de confiance.

**Avantages** : flexible, intègre les non-linéarités (options).
**Limites** : coûteux en calcul, dépend de la qualité des modèles.

---

## 3. Propriétés et limites de la VaR

### 3.1 Limites fondamentales

| Limite | Description |
|--------|-------------|
| **Ne dit rien sur la queue** | La VaR ne mesure pas la perte si le seuil est dépassé |
| **Non sous-additive** | VaR(A+B) peut être > VaR(A) + VaR(B) → ne récompense pas la diversification |
| **Dépend de la distribution** | En queues épaisses (fat tails), la VaR normale sous-estime les risques |
| **Pro-cyclique** | Faible volatilité → faible VaR → prise de risque excessive |

### 3.2 Backtesting de la VaR

Le backtesting vérifie que la VaR n'est dépassée que dans la proportion attendue de cas.

```
Nombre de dépassements / Nombre de jours ≈ (1 - niveau de confiance)
```

**Zones du trafic light (Bâle)** :

| Dépassements sur 250 jours | Zone | Action |
|---------------------------|------|--------|
| 0–4 | Verte | Aucune |
| 5–9 | Jaune | Enquête |
| ≥ 10 | Rouge | Multiplicateur majoré |

---

## 4. Expected Shortfall (ES) — CVaR

### 4.1 Définition

L'**Expected Shortfall** (ES), ou **CVaR** (Conditional VaR), mesure la **perte moyenne au-delà de la VaR** :

```
ES(α) = E[L | L > VaR(α)]
```

C'est la moyenne des `(1-α) %` pires pertes.

**Exemple** : avec les 500 rendements historiques et une VaR 99 % (5 obs. au-delà), l'ES est la moyenne des 5 pires pertes.

### 4.2 Avantages de l'ES vs VaR

| Critère | VaR | ES |
|---------|-----|-----|
| Sous-additivité | Non | Oui (mesure cohérente) |
| Information sur la queue | Non | Oui |
| Standard Bâle IV (FRTB) | Non | Oui (ES 97,5 %) |

### 4.3 Passage de la VaR à l'ES (loi normale)

```
ES(α) = μ + σ × φ(z_α) / (1 - α)
```

- `φ(z_α)` : densité de la loi normale au quantile z_α

---

## 5. Stress tests et scénarios

### 5.1 Définition

Les **stress tests** évaluent l'impact de scénarios extrêmes (mais plausibles) sur la valeur d'un portefeuille, au-delà de ce que capte la VaR normale.

### 5.2 Types de stress tests

| Type | Description | Exemple |
|------|-------------|---------|
| **Historique** | Rejouer des crises passées | Crise 2008, COVID 2020, crise euro 2011 |
| **Hypothétique** | Scénario construit (adverse) | Guerre, krach obligataire |
| **Inverse (reverse stress)** | Trouver le scénario qui ruinerait la banque | "Quel choc détruirait nos fonds propres ?" |

### 5.3 Stress tests réglementaires

- **EBA** (European Banking Authority) : stress tests européens annuels.
- **Fed** (DFAST/CCAR) : stress tests américains.
- Ils définissent un scénario de base et un scénario adverse sur 3 ans.

---

## 6. Exercices

### Exercice 1
Un portefeuille de 5 M€ a un écart-type quotidien de 2 %. Calculez la VaR 95 % et 99 % à 1 jour, puis la VaR 99 % à 10 jours.

> **Correction** :
> VaR 95 % 1j = 5 000 000 × 2 % × 1,645 = **164 500 €**
> VaR 99 % 1j = 5 000 000 × 2 % × 2,326 = **232 600 €**
> VaR 99 % 10j = 232 600 × √10 = **735 342 €**

### Exercice 2
Sur 250 jours de backtesting, la VaR 99 % d'une banque est dépassée 8 fois. Dans quelle zone Bâle se trouve-t-elle ? Quelle action doit-elle envisager ?

> **Correction** : 8 dépassements → **zone jaune** → enquête interne sur la qualité du modèle. Le régulateur peut appliquer un multiplicateur majoré sur les exigences de capital.

---

## Points clés à retenir

- La VaR mesure la perte maximale probable à un niveau de confiance donné.
- Trois méthodes : paramétrique (normale), historique (non paramétrique), Monte Carlo (flexible).
- La VaR a des limites : elle ne mesure pas la queue, n'est pas sous-additive.
- L'Expected Shortfall (ES) est une mesure cohérente qui comble les lacunes de la VaR ; c'est le standard Bâle IV.
- Les stress tests complètent la VaR pour capturer les scénarios extrêmes.

---

## Approfondissement théorique

### Les propriétés d'une mesure de risque cohérente

**Artzner, Delbaen, Eber & Heath (1999)** ont défini les quatre axiomes d'une **mesure de risque cohérente** ρ :

| Axiome | Définition | VaR | ES |
|--------|-----------|-----|-----|
| **Monotonie** | Si X ≥ Y p.s. → ρ(X) ≤ ρ(Y) | ✓ | ✓ |
| **Translation-invariance** | ρ(X + c) = ρ(X) - c | ✓ | ✓ |
| **Homogénéité positive** | ρ(λX) = λρ(X), λ > 0 | ✓ | ✓ |
| **Sous-additivité** | ρ(X + Y) ≤ ρ(X) + ρ(Y) | ✗ | ✓ |

La VaR **n'est pas sous-additive** → elle peut ne pas encourager la diversification. Exemple pathologique : deux actifs indépendants de PD = 0,8 % chacun. En combinant, la PD de perte simultanée = très faible, mais la VaR individuelle à 99 % = 0 (aucun défaut prédit sur chaque actif isolément), alors que la VaR de la combinaison peut être positive. C'est pourquoi Bâle IV a adopté l'ES.

### Modèles GARCH pour la volatilité dynamique

La volatilité financière est **hétéroscédastique** (variable dans le temps) et exhibe des **clusters** (périodes calmes / périodes turbulentes).

**Modèle GARCH(1,1) — Bollerslev (1986)** :

```
rₜ = μ + εₜ,   εₜ = σₜ × zₜ,   zₜ ~ N(0,1)
σ²ₜ = ω + α × ε²ₜ₋₁ + β × σ²ₜ₋₁
```

Interprétation :
- `ω` : variance à long terme × (1 - α - β)
- `α` : réactivité aux chocs récents (si α élevé → forte réaction)
- `β` : persistance (si β élevé → la volatilité reste élevée longtemps)
- Condition de stationnarité : α + β < 1

**VaR dynamique (GARCH-VaR)** :
```
VaR_t(1 jour, 99 %) = z₀,₉₉ × σₜ × W
```

La VaR change chaque jour en fonction de σₜ → plus réactive en période de stress.

### Expected Shortfall : propriétés avancées

L'ES satisfait à la sous-additivité, ce qui signifie que la diversification d'un portefeuille est toujours récompensée par une ES combinée ≤ à la somme des ES individuelles.

**ES comme intégrale de VaR** :
```
ES(α) = (1 / (1-α)) × ∫_α^1 VaR(u) du
```

L'ES est la moyenne des VaR au-delà de α% → elle capture l'ensemble de la queue de distribution.

**Transition vers le FRTB (Fundamental Review of the Trading Book, Bâle IV)** :
- Migration de la VaR 99 % (10 jours) vers l'ES 97,5 % (horizons variables par asset class : 10–120 jours).
- Decomposition par facteur de risque (RRAO — Risk Factor Eligibility Assessment).
- Coût en fonds propres estimé à +40–50 % par rapport à l'ancien cadre.

---

## Exemples numériques supplémentaires

### Exemple 1 — VaR par simulation de Monte Carlo (portefeuille d'options)

Un portefeuille contient une option call sur CAC 40 (delta = 0,6, gamma = 0,02, vega = 0,5) avec valeur = 50 000 €.

Simulation de 100 000 scénarios de Δ(CAC) et ΔVol :
- ΔP ≈ Delta × ΔS + 0,5 × Gamma × ΔS² + Vega × Δσ

Si ΔS ~ N(0, 1 %²) et Δσ ~ N(0, 0,5 pt²) :

```
Résultats triés (5e percentile bas = VaR 95 %) :
VaR 95 % (1 jour) = -3 200 €
ES 95 % = moyenne des 5 % pires = -4 800 €
VaR 99 % (1 jour) = -5 600 €
ES 99 % = -7 200 €
```

Le ratio ES/VaR ≈ 1,28 → dans la normalité, ce ratio est ≈ 1,25. Des queues plus épaisses (fat tails) augmentent ce ratio.

### Exemple 2 — Comparaison des 3 méthodes de VaR

**Portefeuille** : 100 M€ en actions tech. Volatilité récente : 2 %/jour.

**VaR paramétrique** (99 %, 1 jour) :
```
VaR = 100 M€ × 2 % × 2,326 = 4,65 M€
```

**VaR historique** (sur 500 jours, pire 1 % = 5 observations) :
```
5 pires rendements observés : -3,1 %, -3,6 %, -4,2 %, -5,0 %, -7,3 %
VaR historique (99 %) = 4,2 % × 100 M€ = 4,2 M€
ES historique = (-3,1 - 3,6 - 4,2 - 5,0 - 7,3) % / 5 = -4,64 % → ES = 4,64 M€
```

**Monte Carlo** (GARCH vol) : σ actuel = 2,3 %
```
VaR MC = 100 M€ × 2,3 % × 2,326 = 5,35 M€
```

**Synthèse** : VaR paramétrique < VaR historique < VaR MC. La méthode MC capte la volatilité actuelle plus élevée.

### Exemple 3 — Modèle GARCH(1,1) : prévision de volatilité

Paramètres estimés sur S&P 500 : ω = 0,000001, α = 0,08, β = 0,91
Variance à long terme : σ²_LT = ω / (1 - α - β) = 0,000001 / 0,01 = 0,0001 → σ_LT = 1 %

Volatilité actuelle σ_t = 2 % (après un choc), r_t = -3 % :

```
ε²ₜ = (-3 %)² = 0,0009
σ²ₜ₊₁ = 0,000001 + 0,08 × 0,0009 + 0,91 × (2 %)²
       = 0,000001 + 0,000072 + 0,000364 = 0,000437
σₜ₊₁ = √0,000437 = 2,09 %
```

La volatilité monte légèrement. Sur 10 jours :
```
σ²ₜ₊ₖ → ω/(1-α-β) + (α+β)^k × (σ²ₜ - ω/(1-α-β))
σ²ₜ₊₁₀ → 0,0001 + (0,99)^10 × (0,0004 - 0,0001) = 0,0001 + 0,904 × 0,0003 = 0,000371
σₜ₊₁₀ = 1,93 % → retour progressif vers la moyenne (mean reversion de la vol)
```

---

## Applications professionnelles

### Salle des marchés : gestion quotidienne des risques

**Morning risk meeting** (réunion risques du matin) :
1. Revue des P&L overnight et des P&L théoriques (greeks).
2. VaR du jour vs. VaR de la veille → changements significatifs ?
3. Limites : dépassements détectés → actions correctives immédiates.
4. Stress tests quotidiens : impact d'un krach actions -10 %, hausse taux +50 bp, vol +5 pts.

**Structure de limites typique** :
```
Limite VaR desk = 5 M€ (1 jour, 99 %)
Limite stress test = 20 M€ pour le scénario "crise 2008"
Limite de concentration = 50 M€ notionnel par émetteur
Limite de duration = 5 ans d'équivalent obligataire
```

### Régulateurs : stress tests EBA

L'**EBA (European Banking Authority)** conduit des stress tests biannuels sur les grandes banques européennes :
- **Scénario de base** : croissance du PIB zone euro en ligne avec les prévisions.
- **Scénario adverse** : récession sévère (-4 % PIB), chute actions -30 %, hausse spread souverain.
- Les banques publient leurs résultats → comparaison inter-établissements.

**Résultats typiques** : en scénario adverse, le CET1 moyen des grandes banques européennes baisse de 4–5 points de base → révèle les banques les plus vulnérables.

---

## Erreurs fréquentes et pièges

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Ignorer les corrélations en crise** | Les corrélations montent en période de stress → diversification inefficace | Utiliser une matrice de corrélation "stress" |
| **Calibrer la VaR sur période trop courte** | Une VaR calibrée en période calme sous-estime les chocs | Utiliser 2–3 ans minimum de données historiques incluant une crise |
| **Croire que backtesting = validation** | 4 dépassements sur 250 jours ne garantit pas que le modèle est bon | Test statistique (Kupiec, Christoffersen) |
| **Utiliser la VaR 10 jours = VaR 1 jour × √10 toujours** | La règle √T n'est valide que si les P&L sont i.i.d. normaux (non vrai avec auto-corrélation) | Simuler directement sur 10 jours ou corriger pour l'autocorrélation |
| **Oublier le risque de modèle** | La VaR dépend des hypothèses → erreur de modèle → fausse sécurité | Calculer plusieurs VaR (méthodes différentes) et comparer |

---

## Exercices supplémentaires

### Exercice 1
Calculez la VaR 99 % et l'ES 99 % (méthode paramétrique, loi normale) pour un portefeuille de 20 M€ avec σ = 1,8 %/jour.

> **Correction** :
> VaR 99 % = 20 M€ × 1,8 % × 2,326 = **837 360 €**
>
> ES 99 % = 20 M€ × 1,8 % × φ(2,326) / (1 - 0,99)
> φ(2,326) = 0,0267 (densité normale)
> ES = 20 × 0,018 × 0,0267 / 0,01 = 20 × 0,018 × 2,67 = **961 200 €**
> Ratio ES/VaR = 961 200 / 837 360 = **1,148**

### Exercice 2
Un portefeuille subit les P&L suivants sur 10 jours de stress : -2 M€, -1 M€, +0,5 M€, -3 M€, -0,2 M€, +1 M€, -4 M€, -0,5 M€, +0,3 M€, -1,5 M€. Calculez la VaR 90 % et l'ES 90 % sur cet échantillon.

> **Correction** :
> Classement des P&L (les 10 % pires = 1 observation sur 10) :
> Triés : -4, -3, -2, -1,5, -1, -0,5, -0,2, +0,3, +0,5, +1
> VaR 90 % = -(-3 M€) = **3 M€** (1er percentile 10 %)
> ES 90 % = seule observation pire que la VaR = **4 M€**

### Exercice 3
Un desk a une VaR de 2 M€ (99 %, 1 jour). Sur l'année (250 jours), la VaR a été dépassée 12 fois. Dans quelle zone Bâle se trouve-t-il ? Que doit faire la banque ?

> **Correction** :
> 12 dépassements → **zone rouge** (≥ 10 dépassements)
> Le régulateur applique le multiplicateur maximal de 4 sur les fonds propres de marché.
>
> Actions requises :
> 1. Audit immédiat du modèle de VaR.
> 2. Identification des causes (mauvaise modélisation de la distribution, données historiques inadéquates).
> 3. Renforcement des fonds propres le temps de corriger le modèle.
> 4. Reporting au régulateur (BCE/ACPR) avec plan de correction.

### Exercice 4
Comparez la VaR 99 % et l'ES 97,5 % pour un portefeuille avec σ = 2 %/jour, W = 50 M€. Pourquoi Bâle IV a-t-il choisi l'ES 97,5 % plutôt que la VaR 99 % ?

> **Correction** :
> VaR 99 % = 50 × 2 % × 2,326 = **2,326 M€**
> ES 97,5 % = 50 × 2 % × φ(1,96) / (1 - 0,975) = 50 × 0,02 × 0,0584 / 0,025 = **2,336 M€**
>
> Les deux valeurs sont proches en loi normale. Mais en distributions à queues épaisses :
> - La VaR 99 % ignore ce qui se passe dans le 1 % de pire cas.
> - L'ES 97,5 % est la **moyenne des 2,5 % pires pertes** → elle capture l'étendue de la queue.
>
> Avantages de l'ES pour Bâle IV :
> 1. Sous-additivité (encourage la diversification du capital).
> 2. Sensible à la sévérité des pertes extrêmes (pas seulement leur fréquence).
> 3. Plus stable statistiquement que la VaR en zone de quantile élevé.
