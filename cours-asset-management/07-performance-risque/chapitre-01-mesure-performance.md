# Chapitre 1 — Mesure de la Performance

## Introduction

La mesure de la performance est au cœur du métier de l'asset management : elle permet d'évaluer si un gérant crée de la valeur pour ses clients, et de comparer des fonds entre eux. Les indicateurs doivent être **ajustés du risque** pour être pertinents : un fonds qui fait +20 % en prenant 10× plus de risque qu'un autre ne performe pas mieux au sens économique.

---

## 1. Calcul du rendement

### 1.1 Rendement simple vs composé

```
Rendement arithmétique (simple) :
  R = (VL_fin - VL_deb) / VL_deb

Rendement géométrique (composé) sur plusieurs périodes :
  R_annualisé = (∏(1 + Rₜ))^(1/n) - 1

Exemple : R₁ = +20 %, R₂ = -20 %, R₃ = +15 %
  Rendement arithmétique moyen = (20 - 20 + 15) / 3 = 5 %/an
  Rendement géométrique = (1,20 × 0,80 × 1,15)^(1/3) - 1 = (1,1040)^(1/3) - 1 = 3,37 %/an
  
  LE rendement réel pour l'investisseur est le géométrique.
  L'arithmétique surestime toujours le rendement réel.
```

### 1.2 Time-Weighted Return vs Money-Weighted Return

**TWR (Time-Weighted Return)** : élimine l'impact des entrées/sorties de capitaux. Mesure la performance du **gérant**.

```
TWR = [∏(1 + Sous-période return)] - 1

Sous-période délimitée par chaque flux externe (souscription/rachat).

Exemple :
  Portefeuille de 100 M€ au 01/01
  Au 01/07 : valeur = 110 M€, souscription de 50 M€
  Au 31/12 : valeur = 170 M€
  
  Sous-période 1 : R₁ = (110 - 100) / 100 = +10 %
  Sous-période 2 : R₂ = (170 - 160) / 160 = +6,25 %
  (160 M€ car 110 + 50 souscription)
  
  TWR = (1,10 × 1,0625) - 1 = 1,169 - 1 = 16,9 %
```

**MWR / IRR (Money-Weighted Return)** : tient compte du timing et montant des flux. Mesure la performance de **l'investisseur**.

```
MWR = TRI de tous les flux

Flux : -100 M€ (01/01), -50 M€ (01/07), +170 M€ (31/12)

-100 - 50×(1+r)^(-0,5) + 170×(1+r)^(-1) = 0
Résolution numérique → MWR ≈ 14,5 %

MWR < TWR ici car l'apport de 50 M€ a été fait juste avant la moindre performance du S2.
```

**Règle** : pour comparer des gérants, toujours utiliser le **TWR**. Pour mesurer ce que l'investisseur a réellement gagné, utiliser le **MWR**.

---

## 2. Mesures de performance ajustées du risque

### 2.1 Ratio de Sharpe

```
Sharpe = (Rp - rf) / σp

Rp : rendement annualisé du portefeuille
rf : taux sans risque (OAT 3 mois, €STR)
σp : volatilité annualisée du portefeuille

Interprétation : rendement excédentaire par unité de risque total
```

**Limites** :
- Pénalise la volatilité à la hausse (jours de forte hausse réduisent le Sharpe)
- Suppose une distribution normale des rendements
- Pas pertinent pour les stratégies non-linéaires (options)

### 2.2 Ratio de Sortino

```
Sortino = (Rp - MAR) / σ_downside

MAR : Minimum Acceptable Return (souvent rf ou 0)
σ_downside = √[E((min(0, Rₜ - MAR))²)] = écart-type des rendements négatifs uniquement

Avantage : ne pénalise que la volatilité à la baisse
Pertinent pour les stratégies asymétriques
```

### 2.3 Ratio de Treynor

```
Treynor = (Rp - rf) / βp

βp : bêta du portefeuille vs l'indice de marché

Pertinent pour : un portefeuille bien diversifié, où le risque spécifique est éliminé
→ mesure le rendement par unité de risque systématique
```

### 2.4 Alpha de Jensen

```
Jensen Alpha = Rp - [rf + βp × (Rm - rf)]

= Rendement observé - Rendement prédit par le MEDAF

αJ > 0 → Surperformance → le gérant a créé de la valeur au-delà du risque systématique
αJ < 0 → Sous-performance
```

### 2.5 Ratio d'Information

```
IR = (Rp - Rb) / TE

Rp - Rb : rendement actif (outperformance vs benchmark Rb)
TE : Tracking Error = σ(Rp - Rb) = volatilité de l'outperformance

Interprétation : régularité de la surperformance
IR > 0,5 → bon gérant actif
IR > 1,0 → excellent gérant actif (rare)
```

**Relation Sharpe-Information Ratio** :
```
Sharpe_p² = Sharpe_b² + IR²

Un bon gérant améliore le Sharpe du benchmark proportionnellement à son IR.
```

### 2.6 M² (Modigliani-Modigliani)

```
M² = rf + Sharpe_p × σ_benchmark

Ramène tous les portefeuilles à la même volatilité (celle du benchmark)
→ Performance en % directement comparable
```

### 2.7 Maximum Drawdown et ratio Calmar

```
Drawdown(t) = (VL(t) - Max VL sur [0,t]) / Max VL sur [0,t]

Max Drawdown = Min(Drawdown(t)) sur toute la période

Ratio Calmar = Rendement annualisé / |Max Drawdown|

Exemple : fonds +12 %/an, max drawdown -24 % → Calmar = 12/24 = 0,50
```

---

## 3. Mesures de risque

### 3.1 VaR (Value at Risk)

```
VaR(α, T) = perte maximum avec probabilité 1-α sur l'horizon T

Méthode historique :
  Classer les rendements historiques dans l'ordre croissant
  VaR 99 % = percentile 1 % des rendements journaliers × valeur du portefeuille

Méthode paramétrique (hypothèse normale) :
  VaR(99%, 1 jour) = μ - 2,326 × σ_quotidien × Valeur
  (z-score pour 1 % de probabilité = 2,326)

Méthode Monte Carlo :
  Simuler 10 000 scénarios de rendement → classer → extraire le percentile
```

**Exemple** :
```
Portefeuille 100 M€, σ journalière = 1 %, μ journalier = 0,03 %
VaR 99 % 1 jour = -(0,03 % - 2,326 × 1 %) × 100 M€
               = -(-2,296 %) × 100 M€
               = 2,296 M€

VaR 99 % 10 jours = VaR 1 jour × √10 = 2,296 × 3,162 = 7,26 M€
```

### 3.2 CVaR / Expected Shortfall

```
ES(α) = E[perte | perte > VaR(α)]
      = Perte moyenne dans les α % pires cas

ES est plus prudent que la VaR car il capture les pertes extrêmes.
Bâle III/IV a remplacé la VaR par l'ES (97,5 %) pour les banques.
```

### 3.3 Stress tests

Les stress tests modélisent des scénarios extrêmes non capturés par la VaR :
- **Scénarios historiques** : krach 2008, COVID 2020, crise de taux 2022
- **Scénarios hypothétiques** : flash crash, défaut souverain Zone Euro
- **Analyse de sensibilité** : impact d'une variation de +200 pb des taux, -30 % des actions

---

## 4. Approfondissement théorique

### La persistance de la performance et la chance vs compétence

**Question fondamentale** : un gérant qui surperforme une année est-il compétent ou chanceux ?

**Test statistique de la significativité de l'alpha** :
```
t-statistique = α / (SE_α)
  SE_α = TE / √T (où T = nombre de périodes)
  
Pour un alpha annuel de 1 % sur 5 ans, TE = 4 % :
  SE_α = 4 % / √5 = 1,79 %
  t = 1 % / 1,79 % = 0,56 (non significatif à 95 %)
  
Pour être significatif à 95 % (t > 1,96) avec TE = 4 % :
  α requis = 1,96 × 4 % / √T
  Sur 5 ans : α requis = 1,96 × 1,79 % = 3,5 % (très élevé !)
  Sur 20 ans : α requis = 1,96 × 4 % / √20 = 1,75 %
  
→ Il faut 20+ ans pour valider statistiquement un alpha de 1,75 %
→ Conclusion : la plupart des "surperformances" observées ne sont pas statistiquement significatives
```

**Fama & French (2010)** : après déduction des frais, seulement ~3 % des gérants actifs US surperforment significativement leur benchmark sur 10 ans.

---

## Exemples numériques

### Exemple 1 — Calcul complet des métriques

Fonds actions sur 3 ans : R₁ = +18 %, R₂ = -8 %, R₃ = +22 %. Benchmark : +12 %, -5 %, +15 %. rf annuel = 2 %. β du fonds = 1,15.

```
Rendement géométrique fonds = (1,18 × 0,92 × 1,22)^(1/3) - 1
  = (1,3258)^(1/3) - 1 = 1,0984 - 1 = 9,84 %/an

Rendement géométrique benchmark = (1,12 × 0,95 × 1,15)^(1/3) - 1
  = (1,2236)^(1/3) - 1 = 1,0699 - 1 = 6,99 %/an

Rendements actifs : +6 %, -3 %, +7 %
TE = σ(rendements actifs) = √[(6-3,33)² + (-3-3,33)² + (7-3,33)²] / 2
   = √[7,13 + 40,07 + 13,47] / 2 = √[60,67/2] = √30,33 = 5,51 %

IR = (9,84 % - 6,99 %) / 5,51 % = 2,85 % / 5,51 % = 0,517

Volatilité du fonds (annuelle, approx) = σ(18, -8, 22) = σ sur 3 points
  Moyenne = 10,67 %
  σ = √[(18-10,67)² + (-8-10,67)² + (22-10,67)²] / 2 = √[53,76 + 348,44 + 128,44] / 2
    = √265,32 = 16,29 %

Sharpe = (9,84 - 2) / 16,29 = **0,481**
Treynor = (9,84 - 2) / 1,15 = **6,82 %**
Alpha Jensen = 9,84 % - [2 % + 1,15 × (6,99 % - 2 %)] = 9,84 % - [2 % + 5,74 %] = **+2,10 %**
IR = **0,517**
```

### Exemple 2 — VaR d'un portefeuille multi-actifs

Portefeuille 200 M€ : 60 % actions (σ=15 %), 40 % obligations (σ=6 %), ρ=-0,20. Calculer VaR 99 %, 1 jour.

```
σ portefeuille annuelle (calculée précédemment ≈ 9,45 %)
σ quotidienne = 9,45 % / √252 = 0,595 %

VaR 99 % 1 jour = 2,326 × 0,595 % × 200 M€ = 2,775 M€

Autrement dit : avec 99 % de probabilité, le portefeuille ne perdra pas plus de 2,775 M€ en un jour.
```

### Exemple 3 — Analyse du Max Drawdown

VL du fonds sur 10 mois : 100, 105, 103, 110, 107, 102, 108, 112, 109, 115.

```
Maximum jusqu'à chaque date :
  100, 105, 105, 110, 110, 110, 110, 112, 112, 115

Drawdown à chaque date :
  0, 0, (103-105)/105=-1,9%, 0, (107-110)/110=-2,7%, (102-110)/110=-7,3%, ...

Max Drawdown = -7,3 % (observé au mois 6 : VL=102 vs pic 110)

Rendement annualisé = (115/100)^(12/10) - 1 = 1,183 - 1 = 18,3 %
Ratio Calmar = 18,3 % / 7,3 % = 2,51 (excellent)
```

---

## Applications professionnelles

### Rapport de performance mensuel type

Un fonds multi-actifs envoie ce rapport à ses clients chaque mois :

```
═══════════════════════════════════════════════════════
RAPPORT MENSUEL — FONDS ÉQUILIBRÉ DYNAMIQUE — Octobre 2024
═══════════════════════════════════════════════════════

Performance (nette de frais)
  Mois : +1,23 %          Benchmark : +0,87 %     Actif : +0,36 %
  YTD : +8,45 %           Benchmark : +6,21 %     Actif : +2,24 %
  3 ans annualisé : +7,2 % Benchmark : +5,8 %

Indicateurs de risque (données glissantes 3 ans)
  Volatilité : 7,8 %      Benchmark : 6,5 %
  Sharpe : 0,79           Benchmark : 0,65
  Max Drawdown : -9,2 %   IR : 0,58
  Tracking Error : 3,9 %  Beta : 0,95

Allocation au 31/10/2024
  Actions : 58 % (cible 60 %)
  Obligations : 32 % (cible 30 %)
  Alternatifs : 8 % (cible 8 %)
  Cash : 2 %
═══════════════════════════════════════════════════════
```

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Comparer Sharpe et Treynor sans contexte** | Sharpe mesure le risque total, Treynor le risque systématique | Utiliser Sharpe pour standalone, Treynor pour un composant d'un portefeuille |
| **Utiliser le MWR pour comparer des gérants** | Le MWR dépend du timing des flux, pas seulement des décisions du gérant | Toujours utiliser le TWR pour la comparaison inter-gérants |
| **Ignorer la significativité statistique** | Un alpha de +1 %/an sur 3 ans n'est statistiquement pas différent de 0 | Calculer le t-stat et l'intervalle de confiance |
| **Confondre VaR et perte maximale** | La VaR dit : "on ne perd pas plus que X avec 99 % de proba" → 1 % du temps, on peut perdre bien plus | Compléter par CVaR/ES et stress tests |

---

## Exercices

### Exercice 1
Un fonds dégage +7,5 %/an sur 5 ans, volatilité 12 %, beta 0,9. Benchmark +5 %/an, volatilité 10 %. rf = 2 %. Calculez Sharpe, Treynor, alpha Jensen et IR (TE = 4 %).

> **Correction** :
> Sharpe = (7,5 - 2) / 12 = **0,458**
> Treynor = (7,5 - 2) / 0,9 = **6,11 %**
> Alpha Jensen = 7,5 - [2 + 0,9 × (5 - 2)] = 7,5 - 4,7 = **+2,8 %**
> IR = (7,5 - 5) / 4 = **0,625**

### Exercice 2
Un portefeuille de 500 M€ a une volatilité annualisée de 10 %. Calculez la VaR 95 % et 99 % à 1 jour et à 10 jours.

> **Correction** :
> σ quotidienne = 10 % / √252 = 0,630 %
>
> VaR 95 % 1 jour = 1,645 × 0,630 % × 500 M€ = **5,18 M€**
> VaR 99 % 1 jour = 2,326 × 0,630 % × 500 M€ = **7,33 M€**
>
> VaR 95 % 10 jours = 5,18 × √10 = **16,38 M€**
> VaR 99 % 10 jours = 7,33 × √10 = **23,18 M€**
