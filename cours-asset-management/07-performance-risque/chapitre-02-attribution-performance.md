# Chapitre 2 — Attribution de Performance

## Introduction

L'**attribution de performance** (performance attribution) permet de décomposer la surperformance (ou sous-performance) d'un fonds par rapport à son benchmark, en identifiant l'origine des gains : décisions d'allocation entre classes d'actifs, sélection de titres, ou effet de change.

C'est un outil indispensable pour comprendre les décisions du gérant et pour le reporting client.

---

## 1. Le modèle de Brinson-Hood-Beebower (BHB)

### 1.1 Présentation du modèle

Le modèle **BHB (1986)** est le standard de l'industrie pour l'attribution multi-classes d'actifs. Il décompose la surperformance en **3 effets** :

```
Surperformance totale = Effet Allocation + Effet Sélection + Effet Interaction

Notations :
  wᵢ = poids du fonds dans le segment i
  Wᵢ = poids du benchmark dans le segment i
  rᵢ = rendement du fonds dans le segment i
  Rᵢ = rendement du benchmark dans le segment i
  Rb = rendement total du benchmark = Σ Wᵢ × Rᵢ
```

**Effet Allocation (AAE)** :
```
AAE_i = (wᵢ - Wᵢ) × (Rᵢ - Rb)

Mesure la valeur ajoutée par les décisions de surpondération/sous-pondération d'un segment.
→ Positif si le gérant surpondère un segment qui surperforme le benchmark global
→ Négatif si le gérant surpondère un segment qui sous-performe le benchmark global
```

**Effet Sélection (SSE)** :
```
SSE_i = Wᵢ × (rᵢ - Rᵢ)

Mesure la valeur ajoutée par le choix de titres au sein d'un segment.
→ Positif si les titres choisis surperforment le benchmark du segment
```

**Effet Interaction (ISE)** :
```
ISE_i = (wᵢ - Wᵢ) × (rᵢ - Rᵢ)

Interaction entre allocation active et sélection active.
Souvent inclus dans l'effet sélection (modèle Brinson-Fachler).
```

### 1.2 Application numérique complète

Un fonds global actions, benchmark MSCI World, décomposé en 3 régions :

| Région | w_fonds | W_bench | r_fonds | R_bench |
|--------|---------|---------|---------|---------|
| USA | 50 % | 65 % | +15 % | +12 % |
| Europe | 35 % | 25 % | +8 % | +10 % |
| Émergents | 15 % | 10 % | +18 % | +16 % |

```
Rendement benchmark = 65%×12% + 25%×10% + 10%×16% = 7,8 + 2,5 + 1,6 = 11,9 %
Rendement fonds = 50%×15% + 35%×8% + 15%×18% = 7,5 + 2,8 + 2,7 = 13,0 %
Surperformance = 13,0 % - 11,9 % = +1,1 %

Effet Allocation :
  USA :  (50%-65%) × (12%-11,9%) = -15% × 0,1% = -0,015 %
  Euro : (35%-25%) × (10%-11,9%) = +10% × (-1,9%) = -0,19 %
  EM :   (15%-10%) × (16%-11,9%) = +5% × 4,1% = +0,205 %
  Total Allocation = -0,015 - 0,190 + 0,205 = +0,000 % (neutre)

Effet Sélection :
  USA :  65% × (15%-12%) = 65% × 3% = +1,95 %
  Euro : 25% × (8%-10%) = 25% × (-2%) = -0,50 %
  EM :   10% × (18%-16%) = 10% × 2% = +0,20 %
  Total Sélection = +1,95 - 0,50 + 0,20 = +1,65 %

Effet Interaction :
  USA :  (50%-65%) × (15%-12%) = -15% × 3% = -0,45 %
  Euro : (35%-25%) × (8%-10%) = +10% × (-2%) = -0,20 %
  EM :   (15%-10%) × (18%-16%) = +5% × 2% = +0,10 %
  Total Interaction = -0,45 - 0,20 + 0,10 = -0,55 %

Vérification : 0,000 + 1,65 + (-0,55) = +1,10 % ✓ (= surperformance observée)

Conclusion : La surperformance vient entièrement de la sélection de titres (+1,65 %),
partiellement compensée par un effet d'interaction négatif (-0,55 %).
L'allocation géographique n'a pas contribué.
```

---

## 2. Attribution multi-niveau

### 2.1 Attribution à plusieurs niveaux (hiérarchie d'attribution)

Pour un fonds multi-actifs ou sectoriel, l'attribution se fait à plusieurs niveaux :

```
Niveau 1 (Classes d'actifs) : Actions vs Obligations vs Alternatifs
  → Combien vient de l'allocation entre classes ?

Niveau 2 (Géographies) : USA vs Europe vs EM vs Japon
  → Combien vient des décisions géographiques ?

Niveau 3 (Secteurs) : Technologie vs Finance vs Santé vs Énergie
  → Combien vient des paris sectoriels ?

Niveau 4 (Titres) : Apple vs Microsoft vs Google...
  → Combien vient de la sélection de titres individuels ?
```

### 2.2 Modèle factoriel d'attribution

**Attribution basée sur les facteurs** (Fama-French, Barra) :

```
Rp = rf + βMKT × (Rm-rf) + βSMB × SMB + βHML × HML + βMOM × MOM + αp

Attribution :
  Rendement de marché : βMKT × (Rm-rf)
  Prime de taille : βSMB × SMB
  Prime de valeur : βHML × HML
  Prime momentum : βMOM × MOM
  Alpha pur : αp (ce que les facteurs n'expliquent pas)

Exemple :
  Rp = +14 %, rf = 2 %, Rm = 10 %
  βMKT = 1,05, βSMB = 0,3, βHML = -0,2, βMOM = 0,15
  SMB = +3 %, HML = -2 %, MOM = +5 %
  
  Contribution marché = 1,05 × (10-2) = 8,4 %
  Contribution taille = 0,3 × 3 % = 0,9 %
  Contribution valeur = -0,2 × (-2 %) = 0,4 %
  Contribution momentum = 0,15 × 5 % = 0,75 %
  
  Alpha pur = 14 - 2 - 8,4 - 0,9 - 0,4 - 0,75 = 1,55 %
  
  Conclusion : alpha pur = +1,55 %. Le gérant génère de l'alpha résiduel
  même après contrôle de ses expositions factorielles.
```

---

## 3. Attribution de performance obligataire

### 3.1 Décomposition pour un fonds obligataire

L'attribution d'un fonds obligataire décompose le rendement en :

```
Rendement total = Income return + Price return (duration) + Spread return + Résiduel

1. Effet taux sans risque (yield curve change) :
   = - Duration × ΔTaux_sans_risque
   
2. Effet portage (carry) :
   = Coupon couru / Prix × Horizon

3. Effet roll-down :
   = (Prix dans 1 an si courbe inchangée - Prix actuel) / Prix actuel
   (bénéfice de la descente sur la courbe)

4. Effet sélection crédit :
   = - Duration_spread × ΔSpread × Wᵢ vs Wbench

5. Effet change (si fonds multi-devises) :
   = Variation de la devise pondérée par l'exposition
```

**Exemple** :
```
Fonds obligataire corporate, benchmark Bloomberg Euro Aggregate

Rendement fonds : +4,2 %
  - Portage : +3,5 %
  - Roll-down : +0,4 %
  - Duration vs bench (-0,5 an) : +0,2 % (taux ont légèrement monté)
  - Sélection crédit : +0,1 % (meilleure sélection d'émetteurs)

Rendement benchmark : +3,8 %
Surperformance : +0,4 %

Attribution :
  Durée sous-pondérée : +0,15 %
  Sélection crédit supérieure : +0,25 %
  Total : +0,40 % ✓
```

---

## 4. Approfondissement théorique

### Limites du modèle BHB

Le modèle BHB présente plusieurs limitations académiquement reconnues :

1. **Dépendance au découpage sectoriel** : changer la granularité de l'attribution (3 régions vs 10 secteurs) modifie les résultats sans changer la réalité économique.

2. **Problème des poids** : BHB utilise les poids de début de période. Or, en milieu de période, les poids évoluent (rendements, flux). Solution : **linked performance attribution** sur sous-périodes.

3. **Effet interaction non intuitif** : l'effet interaction est difficile à interpréter économiquement → Brinson & Fachler (1985) l'ont inclus dans la sélection.

4. **Attribution en transaction cost** : les frais de transaction réduisent la performance mais sont souvent ignorés dans l'attribution → dégrader la performance calculée de l'impact des coûts.

**Modèle de Brinson-Fachler (BF)** — alternative à BHB :
```
Effet Allocation = (wᵢ - Wᵢ) × (Rᵢ - Rb) [identique à BHB]
Effet Sélection = wᵢ × (rᵢ - Rᵢ) [intègre l'interaction]
```

---

## Exemples numériques supplémentaires

### Exemple 1 — Fonds sectoriel

Un fonds Europe est décomposé en 4 secteurs :

| Secteur | w_fonds | W_bench | r_fonds | R_bench |
|---------|---------|---------|---------|---------|
| Tech | 30 % | 20 % | +25 % | +22 % |
| Finance | 25 % | 28 % | +5 % | +6 % |
| Santé | 25 % | 22 % | +10 % | +9 % |
| Énergie | 20 % | 30 % | +8 % | +3 % |

```
R_bench = 0,20×22% + 0,28×6% + 0,22×9% + 0,30×3%
        = 4,4 + 1,68 + 1,98 + 0,9 = 8,96 %

R_fonds = 0,30×25% + 0,25×5% + 0,25×10% + 0,20×8%
        = 7,5 + 1,25 + 2,5 + 1,6 = 12,85 %

Surperformance = 12,85 - 8,96 = +3,89 %

Effet Allocation :
  Tech :  (0,30-0,20) × (22%-8,96%) = 10% × 13,04% = +1,304 %
  Fin :   (0,25-0,28) × (6%-8,96%) = -3% × (-2,96%) = +0,089 %
  Santé : (0,25-0,22) × (9%-8,96%) = 3% × 0,04% = +0,001 %
  Énerg : (0,20-0,30) × (3%-8,96%) = -10% × (-5,96%) = +0,596 %
  Total Allocation = +1,990 %

Effet Sélection :
  Tech :  20% × (25%-22%) = 0,60 %
  Fin :   28% × (5%-6%) = -0,28 %
  Santé : 22% × (10%-9%) = +0,22 %
  Énerg : 30% × (8%-3%) = +1,50 %
  Total Sélection = +2,04 %

Effet Interaction :
  Tech :  10% × 3% = +0,30 %
  Fin :   -3% × (-1%) = +0,03 %
  Santé : 3% × 1% = +0,03 %
  Énerg : -10% × 5% = -0,50 %
  Total Interaction = -0,14 %

Vérification : 1,990 + 2,040 - 0,140 = +3,890 % ✓

Conclusions :
- La surperformance vient à 51 % de l'allocation (surpondérer Tech et sous-pondérer Énergie)
- Et à 49 % de la sélection (bons titres en Énergie et Santé)
```

---

## Applications professionnelles

### Présentation de l'attribution aux clients institutionnels

Les institutionnels (fonds de pension, assureurs) reçoivent trimestriellement un rapport d'attribution qui leur permet de :
1. Comprendre si la surperformance vient de décisions **top-down** (allocation) ou **bottom-up** (sélection)
2. Vérifier que la source de performance est **cohérente avec le mandat** (un gérant sélecteur ne devrait pas générer d'alpha principalement via l'allocation)
3. **Contrôler le respect de la stratégie** : si le gérant surperformance via un facteur non prévu (ex. Paris sur les taux dans un mandat actions), il y a un problème de gouvernance

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Attribution en une seule période** | La performance s'explique mieux par des sous-périodes (mensuel, trimestriel) | Utiliser la linked attribution sur sous-périodes |
| **Ignorer l'effet de change** | Pour un fonds multi-devises, l'effet de change peut dominer | Décomposer toujours l'effet change séparément |
| **Confondre allocation et market timing** | L'allocation actif est structurelle, le market timing est opportuniste | Distinguer les deux dans les mandats et le reporting |
| **Présenter l'attribution sans tests de significativité** | Une décomposition peut sembler précise mais être statistiquement non significative | Compléter par des intervalles de confiance sur l'attribution |

---

## Exercices

### Exercice 1
Un fonds obligataire a surperformé son benchmark de 60 pb sur le trimestre. Décomposez cette surperformance sachant : (A) duration fonds = 6,5 ans vs benchmark 7,2 ans, taux à 3 mois : +20 pb ; (B) spread crédit fonds vs benchmark : fonds plus défensif (-5 pb de spread contribution) ; (C) coupon supérieur au benchmark : +45 pb.

> **Correction** :
> Effet duration (décision de duration courte) :
> La duration du fonds est 6,5 - 7,2 = -0,7 an vs benchmark.
> Avec une hausse de taux de 20 pb : le fonds perd moins de -0,7 × 0,20 % = +0,14 % vs benchmark
>
> Effet crédit : -5 pb (le portefeuille est plus court en crédit, moins bénéfique si les spreads se resserrent)
>
> Effet coupon (portage supérieur) : +45 pb
>
> Total = +14 + (-5) + 45 = +54 pb ≈ 60 pb observés (écart = résiduel/interaction)

### Exercice 2
Pourquoi un gérant actions dont toute la surperformance provient de l'allocation géographique (et non de la sélection de titres) peut-il poser un problème de gouvernance pour un institutionnel ayant mandaté ce gérant pour ses compétences de stock picker ?

> **Correction** :
> Un institutionnel qui mandate un gérant pour ses compétences de **sélection de titres** (stock picking) s'attend à que la surperformance provienne de l'**effet sélection**, pas de l'allocation.
>
> Si la surperformance provient de l'allocation géographique :
> 1. **Dérive de mandat** (mandate drift) : le gérant prend des décisions top-down pour lesquelles il n'est pas mandaté
> 2. **Mauvaise utilisation du budget de risque** : le tracking error autorisé est consommé par des paris non prévus
> 3. **Risque de duplication** : l'institutionnel gère peut-être déjà son allocation géographique au niveau consolidé → le gérant "double" une décision déjà prise
> 4. **Problème de transparence** : si le gérant ne communique pas ce changement de comportement, c'est un manquement contractuel
>
> **Solution** : inclure dans le contrat des limites sur les déviations d'allocation géographique vs benchmark, et un reporting d'attribution régulier permettant de détecter tout style drift.
