# Chapitre 1 — Décisions d'investissement et critères de sélection

## Introduction

La décision d'investissement est au cœur de la création de valeur. Elle consiste à allouer des ressources rares (capital) à des projets dont les flux futurs doivent compenser l'immobilisation du capital et rémunérer le risque pris.

En grande entreprise comme en banque d'investissement, la sélection des investissements suit un processus rigoureux : identification des flux pertinents, choix du taux d'actualisation adapté au risque du projet, application des critères de décision et analyse de robustesse. Ce chapitre détaille chacune de ces étapes.

---

## 1. Identification et estimation des flux pertinents

### 1.1 Le principe des flux incrementaux

On retient uniquement les flux **supplémentaires** générés par le projet, par rapport à la situation sans projet.

**Flux à inclure** :
- Variation du CA attribuable au projet
- Variation des charges opérationnelles
- Investissement initial (CAPEX)
- Variation du BFR
- Valeur résiduelle en fin de projet

**Flux à exclure** :
- **Coûts irrécupérables** (sunk costs) : dépenses déjà engagées, indépendamment de la décision
- **Coûts d'opportunité** : la valeur de la meilleure alternative doit être prise en compte (ex : loyer implicite d'un terrain propriété de l'entreprise)

### 1.2 Construction du tableau de flux

```
Année 0          Années 1 à n        Année n (fin)
──────────       ─────────────       ──────────────
- Investissement + EBE × (1-t)       + Valeur résiduelle
- ΔBFR           + Amortissements    + Récupération BFR
                 × t (économie IS)
                 - ΔBFR annuel
```

**Formulation synthétique** :

```
CF_t = (ΔCA - ΔCharges) × (1 - t) + Amortissements × t - ΔCAPEX - ΔBFR
```

Le terme `Amortissements × t` est le **bouclier fiscal** des amortissements (tax shield).

### 1.3 Valeur résiduelle

```
Valeur résiduelle nette = Valeur de cession - IS sur plus-value
Plus-value = Prix de cession - Valeur nette comptable
```

### 1.4 Traitement du BFR — précisions

Le BFR (Besoin en Fonds de Roulement) est souvent oublié dans les calculs naïfs, mais son impact peut être considérable :

- **À l'ouverture du projet** : la hausse des stocks et des créances clients génère un besoin de financement immédiat → flux négatif en année 0 ou dès la montée en puissance.
- **En cours de projet** : si l'activité croît, le BFR s'accroît chaque année (flux négatif annuel).
- **En fin de projet** : le BFR est totalement récupéré (flux positif) car les stocks sont vendus et les créances encaissées.

**Règle pratique** : le BFR est souvent estimé à X jours de CA (ex : 45 jours de CA). Si le CA augmente de 1 M€, le ΔBFR = 1 M€ × 45/365 ≈ 123 k€.

---

## 2. Critères de sélection

### 2.1 Valeur Actuelle Nette (VAN) — critère principal

```
VAN = Σ [CF_t / (1 + k)^t]   pour t = 0 à n
```

- `k` : coût du capital (WACC)

**Règle** : retenir tout projet avec VAN > 0.

**Pour des projets mutuellement exclusifs** : choisir celui avec la VAN maximale.

### 2.2 Taux de Rendement Interne (TRI)

```
VAN(TRI) = 0
```

**Règle** : accepter si TRI > coût du capital.

**Limites** :
- Hypothèse de réinvestissement au TRI (souvent irréaliste).
- Plusieurs TRI possibles si les flux changent de signe plus d'une fois.
- Ne pas utiliser pour comparer des projets de tailles différentes.

### 2.3 Délai de récupération (Payback)

```
Payback = Nombre de périodes pour que Σ CF_t ≥ 0
```

**Avantage** : simple, mesure le risque de liquidité.
**Limite** : ignore les flux après le payback et la valeur temps.

### 2.4 Délai de récupération actualisé

Identique au payback classique, mais avec des flux actualisés.

### 2.5 Indice de profitabilité (IP)

```
IP = VAN / Investissement initial
```

Utile en cas de **rationnement du capital** : on priorise les projets selon leur IP décroissant.

---

## 3. Choix du taux d'actualisation

### 3.1 WACC (Weighted Average Cost of Capital)

Le **WACC** est le coût moyen pondéré des ressources de financement (capitaux propres + dette) :

```
WACC = kE × [E / (E + D)] + kD × (1 - t) × [D / (E + D)]
```

- `kE` : coût des capitaux propres
- `kD` : coût de la dette avant IS
- `t` : taux d'imposition
- `E` : valeur de marché des capitaux propres
- `D` : valeur de marché de la dette

**La dette bénéficie d'un avantage fiscal** : les intérêts sont déductibles → coût effectif = kD × (1 - t).

### 3.2 Coût des capitaux propres : le MEDAF (CAPM)

```
kE = rf + β × (E[Rm] - rf)
```

- `rf` : taux sans risque (obligations d'État 10 ans)
- `β` : bêta de l'action (sensibilité au risque systématique)
- `E[Rm] - rf` : prime de risque du marché (≈ 5–6 % historiquement)

**Exemple** :
- rf = 3 %, β = 1,2, prime de risque = 5,5 %
- kE = 3 % + 1,2 × 5,5 % = 3 % + 6,6 % = **9,6 %**

### 3.3 Exemple de calcul du WACC

| Source | Valeur marché | Coût | Poids |
|--------|-------------|------|-------|
| Capitaux propres | 600 M€ | 9,6 % | 60 % |
| Dette | 400 M€ | 5 % × (1-25 %) = 3,75 % | 40 % |

```
WACC = 9,6 % × 60 % + 3,75 % × 40 % = 5,76 % + 1,50 % = 7,26 %
```

### 3.4 Cas particulier : projet à risque différent de l'entreprise

Lorsqu'un projet présente un risque opérationnel différent de celui de l'entreprise dans son ensemble (ex : une entreprise industrielle qui investit dans un projet logiciel), il faut ajuster le taux d'actualisation :

1. Trouver des entreprises comparables **spécialisées** dans le secteur du projet.
2. Désendetter leur bêta pour obtenir un bêta d'actif (βA).
3. Réendetter ce bêta à la structure financière cible du projet.
4. Calculer un WACC spécifique au projet.

Cette approche est appelée **approche du bêta pur** (pure play approach).

---

## 4. Analyse de sensibilité et risque

### 4.1 Analyse de sensibilité

On fait varier un paramètre clé (taux d'actualisation, croissance du CA, marge opérationnelle) et on observe l'impact sur la VAN.

**Tableau de sensibilité (exemple)** :

| WACC \ Croissance CA | 2 % | 4 % | 6 % |
|---------------------|-----|-----|-----|
| 6 % | 450 | 620 | 830 |
| 8 % | 280 | 420 | 580 |
| 10 % | 120 | 230 | 360 |

### 4.2 Analyse de scénarios

| Scénario | Hypothèses | VAN |
|----------|-----------|-----|
| Pessimiste | Croissance -2 %, marges -3 pts | -150 k€ |
| Central | Base | +350 k€ |
| Optimiste | Croissance +4 %, marges +2 pts | +800 k€ |

### 4.3 Monte Carlo

Simulation probabiliste : on tire aléatoirement des valeurs pour chaque paramètre incertain selon leur distribution statistique et on obtient une distribution de VAN.

### 4.4 Taux de rendement interne modifié (TRIM)

Le **TRIM** (ou MIRR en anglais) corrige la principale limite du TRI en distinguant deux taux :
- Taux de réinvestissement des flux intermédiaires positifs (souvent le WACC ou le taux de placement disponible).
- Taux de financement des flux négatifs (coût de la dette).

```
TRIM : [FV des flux positifs réinvestis au taux de réinvestissement]^(1/n)
        / [PV des flux négatifs financés au taux de financement] - 1
```

Le TRIM est plus réaliste que le TRI car il n'impose pas que les flux soient réinvestis au TRI lui-même.

---

## 5. Approfondissement théorique

### 5.1 La VAN étendue et les options réelles

La VAN classique suppose que le projet est accepté ou refusé définitivement aujourd'hui. Or, en réalité, les managers disposent de **flexibilité** :

- **Option d'abandon** : possibilité de stopper le projet si les résultats sont décevants.
- **Option d'expansion** : possibilité d'investir davantage si le projet réussit.
- **Option de report** : possibilité d'attendre une information supplémentaire avant de décider.

La **VAN étendue** intègre la valeur de ces options :

```
VAN étendue = VAN classique + Valeur des options réelles
```

Cette approche s'appuie sur les outils de valorisation d'options (Black-Scholes, arbres binomiaux) pour quantifier la valeur de la flexibilité managériale. Elle est particulièrement pertinente pour les projets phasés (exploration pétrolière, R&D pharmaceutique, investissements dans des marchés émergents).

### 5.2 Ajustement de la VAN pour le financement (APV)

La méthode **APV** (Adjusted Present Value), développée par Myers (1974), décompose la valeur d'un projet en deux composantes :

```
APV = VAN de base (projet entièrement financé par fonds propres)
    + PV(Bouclier fiscal de la dette liée au projet)
    + PV(Coûts de détresse financière liée à la dette)
```

Cette méthode est particulièrement adaptée lorsque la structure de financement change au cours du projet (LBO, projets en partenariat public-privé), car le WACC suppose une structure de capital stable.

**Comparaison APV vs. VAN/WACC** :

| Critère | VAN/WACC | APV |
|---------|----------|-----|
| Structure financière stable | Adapté | Adapté |
| Structure financière variable | Difficile | Idéal |
| LBO | Difficile | Standard |
| Projets phasés | Complexe | Recommandé |

---

## 6. Erreurs fréquentes et pièges

**1. Oublier les coûts d'opportunité**
Un terrain appartenant à l'entreprise n'est pas "gratuit". Si le projet l'utilise, on doit intégrer en coût d'opportunité sa valeur locative de marché (ou le prix auquel il aurait pu être cédé).

**2. Inclure les frais d'études déjà engagés**
Les études de faisabilité réalisées avant la décision d'investissement sont des sunk costs. Les intégrer dans les flux du projet revient à biaiser la décision : ces dépenses sont perdues quoi qu'il arrive.

**3. Oublier l'impact fiscal des amortissements**
Le bouclier fiscal (Amortissements × t) réduit significativement le coût réel de l'investissement. Un amortissement annuel de 100 k€ avec IS à 25 % génère 25 k€ d'économie fiscale réelle chaque année.

**4. Négliger la variation du BFR**
Sur un projet de développement, l'accroissement du BFR peut représenter 10 à 20 % du CA supplémentaire. L'oublier conduit à surestimer les flux nets de trésorerie.

**5. Confondre résultat comptable et flux de trésorerie**
La VAN se calcule sur des flux de trésorerie, non des résultats comptables. Les amortissements sont une charge non décaissée : ils n'apparaissent dans le calcul des flux qu'au travers du bouclier fiscal.

---

## 7. Exemples numériques supplémentaires

### Exemple A — Projet avec variation de BFR et valeur résiduelle

**Données** :
- Investissement en équipement : 500 k€ (amortissement linéaire sur 5 ans)
- Valeur résiduelle à l'issue : 50 k€ (VNC = 0 après amortissement complet)
- Augmentation du CA : 250 k€/an
- Charges variables supplémentaires : 120 k€/an
- Augmentation du BFR : 40 k€ au démarrage, récupéré en année 5
- Taux d'IS : 25 %
- WACC : 9 %

**Construction des flux** :

```
Amortissement annuel = 500 / 5 = 100 k€
Bouclier fiscal = 100 × 25 % = 25 k€/an

Flux opérationnel annuel (années 1 à 5) :
= (250 - 120) × (1 - 0,25) + 25
= 130 × 0,75 + 25
= 97,5 + 25 = 122,5 k€

Année 0 : -500 - 40 = -540 k€
Années 1 à 4 : +122,5 k€
Année 5 : +122,5 + 50 × (1 - 0,25) + 40 = 122,5 + 37,5 + 40 = 200 k€
```

Note : la cession à 50 k€ génère une plus-value de 50 k€ (VNC = 0), imposée à 25 % → produit net = 37,5 k€.

**Calcul de la VAN** :

```
Facteur d'actualisation à 9 % :
Année 1 : 1/1,09 = 0,917
Année 2 : 0,842
Année 3 : 0,772
Année 4 : 0,708
Année 5 : 0,650

VAN = -540 + 122,5 × (0,917 + 0,842 + 0,772 + 0,708) + 200 × 0,650
    = -540 + 122,5 × 3,239 + 130
    = -540 + 396,8 + 130
    = -13,2 k€
```

**Conclusion** : VAN légèrement négative → **projet à rejeter** au WACC de 9 %. Cependant, la sensibilité est élevée : une baisse du WACC à 8 % ou une légère hausse de marge inverserait la décision.

---

### Exemple B — Comparaison de projets de durées différentes

Deux machines mutuellement exclusives :
- Machine A : coût 200 k€, durée de vie 3 ans, flux annuels 90 k€
- Machine B : coût 300 k€, durée de vie 5 ans, flux annuels 85 k€
- WACC : 8 %

La comparaison directe des VAN est biaisée par les durées différentes. On utilise l'**Annuité Équivalente** (AE ou EAC — Equivalent Annual Cost) :

```
VAN_A = -200 + 90 × [1 - 1,08^(-3)] / 0,08 = -200 + 90 × 2,577 = +31,9 k€
AE_A = 31,9 / 2,577 = +12,4 k€/an

VAN_B = -300 + 85 × [1 - 1,08^(-5)] / 0,08 = -300 + 85 × 3,993 = +39,4 k€
AE_B = 39,4 / 3,993 = +9,9 k€/an
```

La machine A crée davantage de valeur par an → **choisir A** malgré une VAN totale inférieure.

---

## 8. Exercices

### Exercice 1
Un projet nécessite 200 k€ d'investissement. Les flux opérationnels annuels après IS sont de 60 k€ pendant 4 ans. La valeur résiduelle est nulle. Le WACC est 8 %. Calculez la VAN et le TRI. Concluez.

> **Correction** :
> VAN = -200 + 60 × [1 - (1,08)^(-4)] / 0,08
> VAN = -200 + 60 × 3,312 = -200 + 198,7 = **-1,3 k€** → projet à **refuser** (très légèrement négatif)
>
> Pour le TRI, chercher le taux tel que VAN = 0 :
> À 7,9 % : VAN ≈ 0 → **TRI ≈ 7,9 %** < 8 % (WACC) → confirme le refus.

### Exercice 2
Deux projets mutuellement exclusifs A et B :
- A : investissement 100, VAN = 30, IP = 0,30
- B : investissement 400, VAN = 80, IP = 0,20

Lequel choisir si le capital est limité à 150 k€ ? Si le capital est illimité ?

> **Correction** :
> - Capital limité : IP de A (0,30) > IP de B (0,20) → **choisir A** (meilleure création de valeur par euro investi).
> - Capital illimité : VAN de B (80) > VAN de A (30) → **choisir B** (valeur absolue créée plus élevée).

### Exercice 3 — Calcul complet avec bouclier fiscal et BFR
Une entreprise envisage un projet d'expansion :
- Investissement machine : 300 k€, amortissable sur 4 ans en linéaire, valeur résiduelle 60 k€ (VNC à 4 ans = 0)
- Hausse du CA : 200 k€/an
- Charges variables additionnelles : 80 k€/an
- Hausse du BFR à l'ouverture : 30 k€ (récupération totale à la fin)
- Taux IS : 25 %
- WACC : 10 %

Calculez la VAN et concluez.

> **Correction** :
>
> Amortissement annuel = 300 / 4 = 75 k€
> Bouclier fiscal annuel = 75 × 0,25 = 18,75 k€
>
> Flux opérationnel annuel = (200 - 80) × 0,75 + 18,75 = 90 + 18,75 = **108,75 k€**
>
> Valeur résiduelle nette = 60 × (1 - 0,25) = 45 k€ (plus-value totale car VNC = 0)
>
> Flux :
> - Année 0 : -300 - 30 = **-330 k€**
> - Années 1 à 3 : **+108,75 k€**
> - Année 4 : 108,75 + 45 + 30 = **+183,75 k€**
>
> Facteur annuité 10 %, 4 ans = 3,170
>
> VAN ≈ -330 + 108,75 × (3,170 - 0,683) + 183,75 × 0,683
>
> Note : on sépare les flux homogènes :
> VAN = -330 + 108,75 × 3,170 - (183,75 - 108,75) × 0,683 + 183,75 × 0,683
> Calcul direct :
> An 1 : 108,75 / 1,10 = 98,86
> An 2 : 108,75 / 1,21 = 89,88
> An 3 : 108,75 / 1,331 = 81,70
> An 4 : 183,75 / 1,4641 = 125,51
> VAN = -330 + 98,86 + 89,88 + 81,70 + 125,51 = **+65,95 k€** → **projet à retenir**

### Exercice 4 — Analyse de sensibilité
Reprenez les données de l'exercice 3. La direction commerciale n'est pas certaine de l'hypothèse de croissance de CA à 200 k€/an. Calculez la VAN si le CA n'augmente que de 150 k€/an. Quel est le seuil de CA supplémentaire pour que la VAN soit nulle ?

> **Correction** :
>
> Avec ΔCAS = 150 k€ :
> Flux opérationnel = (150 - 80) × 0,75 + 18,75 = 52,5 + 18,75 = 71,25 k€
>
> An 1 : 71,25 / 1,10 = 64,77
> An 2 : 71,25 / 1,21 = 58,88
> An 3 : 71,25 / 1,331 = 53,53
> An 4 : (71,25 + 45 + 30) / 1,4641 = 146,25 / 1,4641 = 99,89
> VAN = -330 + 64,77 + 58,88 + 53,53 + 99,89 = **-52,9 k€** → projet à rejeter
>
> La VAN passe de +65,95 k€ à -52,9 k€ pour une baisse de 50 k€ de CA → très sensible.
>
> Seuil de rentabilité en CA : par interpolation linéaire, la VAN = 0 pour ΔCAS ≈ 174 k€/an (soit une marge de sécurité de 13 % par rapport aux 200 k€ prévus).

### Exercice 5 — TRIM
Un projet génère les flux suivants : CF₀ = -1 000 k€, CF₁ = +400 k€, CF₂ = -200 k€ (remise à niveau), CF₃ = +700 k€, CF₄ = +600 k€. Le TRI conventionnel donne plusieurs solutions. Calculez le TRIM avec un taux de réinvestissement de 8 % et un taux de financement de 6 %.

> **Correction** :
>
> Valeur future des flux positifs réinvestis à 8 % en fin d'année 4 :
> CF₁ réinvesti = 400 × (1,08)³ = 400 × 1,2597 = 503,9 k€
> CF₃ réinvesti = 700 × (1,08)¹ = 756 k€
> CF₄ = 600 k€ (déjà en fin de période)
> FV totale = 503,9 + 756 + 600 = **1 859,9 k€**
>
> Valeur actuelle des flux négatifs financés à 6 % en début :
> CF₀ = -1 000 k€
> CF₂ actualisé = -200 / (1,06)² = -177,9 k€
> PV totale = 1 000 + 177,9 = **1 177,9 k€**
>
> TRIM = (1 859,9 / 1 177,9)^(1/4) - 1 = (1,579)^0,25 - 1 ≈ **12,1 %**
>
> Si le WACC est inférieur à 12,1 %, le projet est accepté.

---

## 9. Applications professionnelles

### En direction financière d'entreprise

Le service de contrôle de gestion et la direction financière utilisent les outils de ce chapitre dans les **comités d'investissement** (Capex committees). Typiquement :
- Tout projet > 500 k€ fait l'objet d'un business case formalisé avec VAN, TRI, payback et analyse de sensibilité.
- Les hypothèses (croissance CA, marges) sont challengées par la direction générale et les opérationnels.
- Un **post-audit** est réalisé 1 à 2 ans après la mise en service pour comparer les flux réels aux prévisions.

### En banque d'investissement (M&A)

Dans le cadre d'une acquisition, le **business case** de l'acquéreur intègre systématiquement :
- Les flux incrémentaux liés aux synergies (coûts et revenus).
- Le coût d'intégration (restructurations, IT, rebranding) comme flux négatif.
- Une analyse d'accrétivité/dilution sur le BPA.

### En Private Equity

Les fonds de PE modélisent la **sortie** dès l'entrée : ils projettent les flux de l'entreprise cible sur 5 ans, estiment la valeur de sortie (multiple d'EBITDA), et calculent le TRI sur la mise de fonds propres après remboursement de la dette.

---

## 10. Points de vigilance et nuances importantes

- **L'inflation** : les flux nominaux doivent être actualisés à un taux nominal ; les flux réels à un taux réel. Mélanger les deux est une erreur grave. Relation de Fisher : (1 + r_nominal) = (1 + r_réel) × (1 + inflation).

- **La durée du projet** : rallonger artificiellement la durée d'un projet pour améliorer sa VAN est trompeur. Les flux lointains sont fortement actualisés ; une VAN positive sur 20 ans peut reposer sur des hypothèses fragiles.

- **Les projets corrélés** : dans un portefeuille de projets, les effets de corrélation (cannibalisation, complémentarité) doivent être pris en compte. Un projet peut détruire la VAN d'un projet existant.

- **Les options réelles** : la VAN classique sous-estime la valeur des projets flexibles (possibilité d'expansion, d'abandon). Dans les secteurs à forte incertitude (tech, pharma, énergie), la VAN étendue est plus pertinente.

---

## Points clés à retenir

- Seuls les flux incrémentaux entrent dans le calcul : oublier les sunk costs, intégrer les coûts d'opportunité.
- La VAN est le critère principal ; le TRI est un indicateur complémentaire mais à utiliser avec précaution.
- Le WACC est le taux d'actualisation approprié pour les projets à risque moyen de l'entreprise.
- En cas de rationnement du capital, classer par indice de profitabilité.
- Le TRIM corrige les biais du TRI en distinguant taux de réinvestissement et taux de financement.
- Les options réelles (expansion, abandon, report) enrichissent la VAN classique dans les environnements incertains.
