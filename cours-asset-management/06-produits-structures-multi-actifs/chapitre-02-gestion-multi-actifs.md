# Chapitre 2 — Gestion Multi-Actifs et Allocation Dynamique

## Introduction

La **gestion multi-actifs** (multi-asset management) consiste à gérer simultanément plusieurs classes d'actifs au sein d'un portefeuille unique, avec un double objectif : **optimiser le couple rendement/risque** sur le long terme et **gérer la volatilité** dans le temps. C'est l'approche privilégiée des fonds diversifiés, des fonds de fonds et des mandats institutionnels.

---

## 1. Les approches de la gestion multi-actifs

### 1.1 Allocation stratégique vs tactique (rappel et approfondissement)

```
Allocation Stratégique (SAA) : poids cibles à long terme (5–10 ans)
  → Décision de comité d'investissement, révisée annuellement
  → Ex. : 50 % Actions / 30 % Obligations / 20 % Alternatifs

Allocation Tactique (TAA) : déviations à court terme (3–12 mois)
  → Décision basée sur les vues macro, valorisations, momentum
  → Budget de dérivation limité : ±5 à ±15 % par classe d'actif

Allocation de marché (Market Timing) : déviations très court terme
  → Plus difficile à justifier systématiquement, risque de TE élevée
```

### 1.2 Approche top-down

```
Macro → Thèmes → Classes d'actifs → Géographie → Secteurs → Titres

Exemple de processus :
  1. Analyse macroéconomique : croissance +2,5 %, inflation 3 %, taux stables
  2. Phase de cycle : expansion tardive (late cycle)
  3. Implications :
     - Actions défensives > cycliques
     - Durée obligataire courte (taux en zone de plateau)
     - OR + Commodities comme hedge inflation
  4. Allocation tactique :
     + Surpondérer : Actions Europe (value), Or, Obligations courtes
     - Sous-pondérer : Tech growth, Obligations longues, High Yield
```

### 1.3 Approche bottom-up (agrégation)

Construire l'allocation globale en partant des meilleures idées par segment :
- Équipe actions sélectionne 50 valeurs → allocation actions déduite des pondérations
- Équipe crédit sélectionne 80 émetteurs → allocation crédit déduite
- Consolidation au niveau du portefeuille → risques agrégés (corrélations, concentrations)

---

## 2. Gestion dynamique et stratégies CPPI

### 2.1 Stratégies d'allocation dynamique

**Buy-and-hold** : allocation fixe, aucun rééquilibrage.

**Rééquilibrage calendaire** : revenir à l'allocation cible à intervalles réguliers (mensuel, trimestriel).

**Rééquilibrage par seuil** : revenir à l'allocation cible si une classe d'actifs s'écarte de plus de X % du poids cible.

```
Exemple de règle de rééquilibrage par seuil :
  Cible actions = 60 %, tolérance ±5 %
  Actions deviennent 67 % (au-dessus de 65 %) → Vendre des actions, acheter obligations
  Actions tombent à 53 % (en dessous de 55 %) → Acheter actions
  
  Avantage : discipline, achète bas, vend haut mécaniquement
  Inconvénient : coûts de transaction, fiscalité sur plus-values
```

### 2.2 Constant Proportion Portfolio Insurance (CPPI)

La CPPI est une stratégie qui **garantit dynamiquement** un plancher de capital tout en permettant de participer à la hausse.

```
Mécanisme CPPI :

  E = Valeur du portefeuille
  F = Floor (plancher de capital, ex. 90 % du capital initial)
  Coussin (Cushion) C = E - F
  Multiplicateur M = 3 à 5 (levier sur le coussin)
  
  Allocation en actif risqué = M × C

Exemple concret (M=3, F=90, E initial = 100) :
  
  État initial : E=100, F=90, C=10
  Allocation risquée = 3 × 10 = 30 → 30 % en actions
  Allocation sûre = 70 → 70 % en obligations
  
  Si marchés montent (E = 115) :
    C = 115 - 90 = 25
    Allocation risquée = 3 × 25 = 75 → 75 % en actions (augmentation)
  
  Si marchés baissent (E = 95) :
    C = 95 - 90 = 5
    Allocation risquée = 3 × 5 = 15 → 15 % en actions (réduction)
  
  Si marchés s'effondrent brusquement (E tombe à 88 < 90) :
    C négatif → impossible de garantir le plancher !
    → Risque de gap : si la baisse est trop rapide, CPPI ne protège pas
```

**Limites de la CPPI** :
- **Risque de gap** : un krach soudain peut traverser le plancher avant le rééquilibrage
- **Cash-lock** : si l'exposition risquée → 0, le portefeuille est "verrouillé" en cash et ne peut plus participer à la reprise
- **Coûts de transaction** : rééquilibrage fréquent en période de forte volatilité

**CPPI vs Options** :
```
Option put = CPPI parfaite (mais coûteuse et limitée à une durée fixe)
CPPI = réplication dynamique de l'option (moins cher, mais risque de gap)
```

### 2.3 Target-Date Funds (Fonds de cycle de vie)

Fonds avec une allocation qui évolue automatiquement vers moins de risque à l'approche de la date cible (retraite) :

```
Glide Path standard :
  Age 30 : 90 % actions / 10 % obligations
  Age 40 : 80 % actions / 20 % obligations
  Age 50 : 60 % actions / 40 % obligations
  Age 60 : 40 % actions / 60 % obligations
  Age 65 : 20 % actions / 80 % obligations + monetaire

Logique : à mesure que la retraite approche, le capital accumulé est plus 
important et le temps de récupérer d'un krach est plus court.
```

---

## 3. Risk Budgeting et allocation par le risque

### 3.1 Contribution au risque

```
Contribution marginale au risque (MCTR) de l'actif i :
  MCTRᵢ = βᵢ,p × σp
  
  où βᵢ,p = Cov(rᵢ, rp) / Var(rp) = sensibilité de l'actif au portefeuille

Contribution totale au risque (CTR) :
  CTRᵢ = wᵢ × MCTRᵢ
  
  Vérification : Σ CTRᵢ = σp

Part du risque total (%CTR) :
  %CTRᵢ = CTRᵢ / σp = wᵢ × MCTRᵢ / σp
```

### 3.2 Risk parity

Construire un portefeuille où chaque classe d'actifs contribue **également** au risque total :

```
Objectif : wᵢ × MCTRᵢ = 1/N × σp pour tout i

Solution simple (sans corrélations) :
  wᵢ ∝ 1/σᵢ
  
  Exemple (3 actifs) : Actions σ=15%, Oblig σ=5%, Or σ=16%
  Poids risk parity ∝ [1/15, 1/5, 1/16] = [0,067, 0,200, 0,063]
  
  Normalisation :
  Somme = 0,330
  w_actions = 0,067 / 0,330 = 20,3 %
  w_oblig = 0,200 / 0,330 = 60,6 %
  w_or = 0,063 / 0,330 = 19,1 %
  
  Le risk parity surpondère fortement les obligations (σ faible)
  → Utilisation du levier pour amplifier le rendement à risque équilibré
```

**All Weather (Bridgewater)** : application du risk parity par scénario macroéconomique :
- Croissance en hausse/baisse × Inflation en hausse/baisse = 4 quadrants
- Allouer 25 % du **risque** à chaque quadrant

```
Quadrant 1 (Croissance ↑, Inflation ↑) : Commodités, TIPS, Actions EM
Quadrant 2 (Croissance ↑, Inflation ↓) : Actions, HY, Crédit
Quadrant 3 (Croissance ↓, Inflation ↑) : Or, Commodités, TIPS
Quadrant 4 (Croissance ↓, Inflation ↓) : Obligations nominales long, Or
```

---

## 4. Approfondissement théorique

### Mean-Variance vs Risk Parity : que dit la théorie ?

**DeMiguel, Garlappi & Uppal (2009)** ont montré que le portefeuille **équipondéré 1/N** surperforme les portfolios mean-variance optimisés out-of-sample dans la majorité des configurations testées. Raison : l'estimation des paramètres (rendements espérés surtout) est si imprécise que l'optimisation amplifie les erreurs.

**Risk parity** : évite d'estimer les rendements espérés (sources d'erreur maximale). Ne nécessite que les volatilités et corrélations (plus stables dans le temps). En pratique, le risk parity avec levier a généré des rendements similaires au 60/40 avec une moindre volatilité sur 1990–2020 (période de baisse des taux favorable aux obligations).

**Critique du risk parity** (post-2022) : avec la remontée des taux, les obligations ont beaucoup perdu. Un portefeuille risk parity (60 % obligations) a sous-performé le 60/40 en 2022 (-15 % vs -12 %).

---

## Exemples numériques

### Exemple 1 — Calcul de contribution au risque

Portefeuille 60/40 (actions/obligations), σp = 9,45 %.

```
Actions (60 %, σ=16 %) :
  Cov(actions, portefeuille) = w_a × σ_a² + w_b × σ_ab
  σ_ab = ρ × σ_a × σ_b = -0,20 × 16% × 7% = -0,00224

  Cov(r_a, r_p) = w_a × σ_a² + w_b × σ_ab = 0,60 × 0,0256 + 0,40 × (-0,00224)
               = 0,01536 - 0,000896 = 0,014464
  
  β_a,p = 0,014464 / σ²p = 0,014464 / 0,008925 = 1,620
  MCTR_a = 1,620 × 9,45 % = 15,31 %
  CTR_a = 60 % × 15,31 % = 9,19 %
  %CTR_a = 9,19 % / 9,45 % = 97,2 % (presque tout le risque !)

Obligations (40 %) :
  CTR_b = σp - CTR_a = 9,45 % - 9,19 % = 0,26 %
  %CTR_b = 0,26 % / 9,45 % = 2,8 %

Conclusion : dans un portefeuille 60/40, les actions portent 97 % du risque total.
→ Ce n'est pas un portefeuille "équilibré" en risque.
```

### Exemple 2 — CPPI en action (krach puis reprise)

Capital initial : 100, Plancher : 80, Multiplicateur : 4.

```
État 0 : E=100, C=20, Allocation risquée = 4×20 = 80, Sûre = 20

Mois 1 : Actif risqué -10 %, actif sûr +0,2 %
  Valeur portefeuille = 80×0,90 + 20×1,002 = 72 + 20,04 = 92,04
  C = 92,04 - 80 = 12,04
  Nouvelle allocation risquée = 4×12,04 = 48,16 (vente d'actions : 72 - 48,16 = 23,84 € vendus)
  Nouvelle allocation sûre = 92,04 - 48,16 = 43,88

Mois 2 : Actif risqué +15 %, actif sûr +0,2 %
  Valeur portefeuille = 48,16×1,15 + 43,88×1,002 = 55,38 + 43,97 = 99,35
  C = 99,35 - 80 = 19,35
  Nouvelle allocation risquée = 4×19,35 = 77,40 (achat d'actions : 77,40 - 55,38 = 22,02 € achetés)

Performance vs Buy-and-Hold :
  BH (80% risqué, 20% sûr) après 2 mois = 80×0,90×1,15 + 20×1,002×1,002
                                          = 82,8 + 20,08 = 102,88
  CPPI = 99,35 (moins performant en reprise car moins exposé en mois 2)
  
  Mais CPPI garantit : en cas de krach -100 %, portefeuille ≥ 80 (plancher)
  BH : en cas de krach -100 % sur le risqué : portefeuille = 20 × 1,002² ≈ 20 (plancher non garanti)
```

---

## Applications professionnelles

### Mandat multi-actifs pour un investisseur institutionnel

**Contraintes types d'un mandat multi-actifs** :
```
Objectif : rendement annuel ≥ Inflation + 3 % sur 5 ans glissants
Contraintes :
  - Volatilité ≤ 8 %/an
  - Drawdown maximum autorisé : -15 %
  - Tracking Error vs benchmark 50/50 : ≤ 5 %
  - Minimum 20 % obligations investment grade
  - Maximum 60 % actions monde
  - Maximum 20 % actifs alternatifs
  - ESG : exclure charbon thermique, armes controversées
  
Benchmarks habituels :
  Composite : 50 % MSCI World + 30 % Bloomberg Global Agg + 20 % HFRX (HF)
  Ou : CPI + 300 bp (objectif absolu de rendement)
```

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Croire que la diversification fonctionne en crise** | Les corrélations augmentent en krach → la diversification disparaît | Inclure des actifs structurellement décorrélés (or, CTAs) |
| **Rééquilibrer trop fréquemment** | Les coûts de transaction détruisent la valeur | Utiliser des seuils de déclenchement, pas des calendriers rigides |
| **Confondre volatilité cible et protection** | CPPI protège le plancher, pas la volatilité | Définir clairement l'objectif : protection vs volatilité cible |
| **Ignorer la liquidité en CPPI** | Si actifs risqués illiquides, le rééquilibrage est impossible | Utiliser des actifs liquides (ETF, futures) pour la partie risquée |

---

## Exercices

### Exercice 1
Un portefeuille CPPI a E=120, F=100, M=3. Calculez l'allocation risquée et sûre. Si les actifs risqués baissent de 20 %, quelle est la nouvelle valeur du portefeuille et la nouvelle allocation ?

> **Correction** :
> C = 120 - 100 = 20
> Allocation risquée = 3 × 20 = 60, Allocation sûre = 120 - 60 = 60
>
> Après baisse 20 % (actif risqué), actif sûr +0,3 % :
> Valeur = 60 × 0,80 + 60 × 1,003 = 48 + 60,18 = **108,18**
> C = 108,18 - 100 = 8,18
> Nouvelle allocation risquée = 3 × 8,18 = **24,54** (forte réduction)
> Nouvelle allocation sûre = 108,18 - 24,54 = **83,64**

### Exercice 2
Calculez le poids risk parity (sans levier) pour 3 actifs : σ_actions=17 %, σ_oblig=6 %, σ_immobilier=12 %. Comparez au 60/30/10 traditionnel.

> **Correction** :
> Poids inversement proportionnels aux volatilités :
> w ∝ [1/17, 1/6, 1/12] = [0,0588, 0,1667, 0,0833]
> Somme = 0,3088
> w_actions = 0,0588 / 0,3088 = **19,0 %**
> w_oblig = 0,1667 / 0,3088 = **54,0 %**
> w_immobilier = 0,0833 / 0,3088 = **27,0 %**
>
> Comparaison :
> 60/30/10 → actions dominent le risque
> Risk parity 19/54/27 → obligations dominent les poids mais chaque actif contribue ~33 % au risque
>
> **Rendement risk parity sans levier ≈ plus faible** que 60/30/10 (obligations surpondérées)
> → Pour égaler le rendement, il faudrait appliquer un levier de ~2x sur le risk parity
