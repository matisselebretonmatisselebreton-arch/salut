# Chapitre 3 — Stratégies de trading : momentum, mean reversion, arbitrage

## Introduction

Au-delà de l'analyse technique discrétionnaire, les marchés financiers accueillent une large variété de **stratégies systématiques** — c'est-à-dire fondées sur des règles reproductibles et back-testables. Ces stratégies peuvent être exécutées manuellement ou de façon algorithmique. On les regroupe en trois grandes familles : le **momentum** (tendance), le **mean reversion** (retour à la moyenne), et l'**arbitrage** (exploitation d'inefficiences de prix).

---

## 1. Stratégies de momentum (trend following)

### 1.1 Principe

Le **momentum** repose sur la persistance des mouvements de prix : un actif qui monte a tendance à continuer de monter, et inversement. C'est l'anomalie de marché documentée par **Jegadeesh & Titman (1993)** et confirmée sur des dizaines d'années et de marchés.

```
Signal momentum = Performance de l'actif sur les 12 derniers mois (excluant le dernier mois)
```

Les stratégies momentum achètent les "gagnants" et vendent à découvert les "perdants".

### 1.2 Momentum de série temporelle (Time-Series Momentum)

On prend position dans la **direction du signal** de chaque actif, indépendamment des autres :

```
Si rendement(t-12, t-1) > 0 → Long
Si rendement(t-12, t-1) < 0 → Short
```

**Moskowitz, Ooi & Pedersen (2012)** montrent que cette stratégie est positive sur une large gamme d'actifs (actions, obligations, devises, matières premières) sur 25 ans.

### 1.3 Momentum cross-sectionnel

On classe les actifs par performance relative et on achète les N meilleurs, vend les N moins bons :

```
Univers de 100 actions → Acheter les 10 meilleures performers (decile 10)
                       → Vendre les 10 pires performers (decile 1)
```

### 1.4 Stratégie de suivi de tendance (CTA / Managed Futures)

Les **CTA** (Commodity Trading Advisors) et les fonds **Managed Futures** appliquent du trend following à grande échelle sur des dizaines de marchés à terme (futures) à l'aide de systèmes automatisés.

**Indicateurs typiques utilisés** :
- Croisement de moyennes mobiles (ex : SMA 50 / SMA 200)
- Breakout de canaux (Donchian Channel : cassure du plus haut / bas des N derniers jours)
- Filtre de volatilité (ATR) pour ajuster la taille des positions

**Exemple de règle simple (Turtle Trading — Dennis & Eckhardt, 1983)** :
```
Achat si le cours dépasse le plus haut des 20 dernières séances
Vente si le cours passe sous le plus bas des 10 dernières séances
Taille de position : 1 % du capital / ATR(20)
```

### 1.5 Performance et risques du momentum

| Caractéristique | Détail |
|----------------|--------|
| **Sharpe historique** | 0,3–0,7 selon les implémentations |
| **Drawdown** | Episodes de pertes sévères lors des retournements ("momentum crash") |
| **Diversification** | Excellent diversificateur de portefeuille (décorrélé des actions en crise) |
| **Coûts** | Rotation élevée → coûts de transaction significatifs |

**Momentum crash** : lors des rebonds violents après des crises (ex. mars 2009, avril 2020), le momentum inverse s'effondre brutalement car les "perdants" rebondissent le plus fort.

---

## 2. Stratégies de mean reversion (retour à la moyenne)

### 2.1 Principe

Contrairement au momentum, le **mean reversion** suppose que les prix reviennent vers une valeur d'équilibre (moyenne historique, valeur fondamentale, relation statistique stable) après s'en être écartés.

```
Si le prix s'écarte au-dessus de la moyenne → Short (anticipation de retour)
Si le prix s'écarte en dessous de la moyenne → Long (anticipation de rebond)
```

### 2.2 Mean reversion sur actif unique

#### RSI oversold/overbought

```
RSI < 30 (survente) → Achat
RSI > 70 (surachat) → Vente
```

Simple mais générateur de faux signaux en tendance forte.

#### Bandes de Bollinger

```
Cours touche la bande inférieure (−2σ) → Achat
Cours touche la bande supérieure (+2σ) → Vente
Stop-loss : clôture hors bande de 2,5σ
```

#### Z-score sur spread

```
Z = (Prix - Moyenne mobile n jours) / Écart-type n jours

Achat si Z < -2
Vente si Z > +2
Neutralisation si |Z| < 0,5
```

### 2.3 Pairs trading (trading en paires)

Le **pairs trading** exploite la relation stable entre deux actifs fortement corrélés (ex. deux actions du même secteur, deux ETF similaires, futures sur indices liés).

**Étapes** :

1. **Identification de la paire** : recherche de cointégration (test de Engle-Granger ou Johansen).
2. **Calcul du spread** :
   ```
   Spread = Prix_A - β × Prix_B
   ```
   où β est le ratio de couverture estimé par régression OLS.
3. **Signal sur le Z-score du spread** :
   ```
   Z = (Spread - μ_spread) / σ_spread
   Achat spread si Z < -2 (A sous-évalué / B surévalué)
   Vente spread si Z > +2 (A surévalué / B sous-évalué)
   ```

**Exemple** :
- Paire Shell / TotalEnergies (secteur pétrolier européen)
- β estimé = 0,95
- Spread habituellement centré autour de 5 € avec σ = 2 €
- Signal d'achat si Spread < 5 - 2×2 = **1 €**

**Risques** :
- Rupture de la relation de cointégration (changement fondamental d'un des actifs)
- Divergence prolongée avant retour à la moyenne (risque de liquidation forcée)

### 2.4 Stratégies de retour à la moyenne sur indices

**Statistique de retour à la moyenne sur indice (Ornstein-Uhlenbeck)** :

```
dX_t = θ(μ - X_t)dt + σdW_t
```

- `θ` : vitesse de retour à la moyenne
- `μ` : niveau d'équilibre
- `σ` : volatilité

La demi-vie du processus (temps pour revenir à mi-chemin de l'équilibre) :
```
t_1/2 = ln(2) / θ
```

Une demi-vie courte (< 5 jours) est exploitable en trading intraday/swing. Une demi-vie longue (> 20 jours) convient mieux à une stratégie positionnelle.

---

## 3. Stratégies d'arbitrage

### 3.1 L'arbitrage pur (sans risque)

En théorie, l'**arbitrage pur** consiste à exploiter une différence de prix entre deux marchés pour le même actif sans prendre de risque :

```
Achat de l'actif au prix bas sur le marché A
Vente simultanée au prix élevé sur le marché B
Profit = Différence de prix - Coûts de transaction
```

En pratique, les marchés modernes sont trop efficients pour offrir un arbitrage pur persistant. On parle plutôt d'**arbitrage quasi-sans-risque** ou de **relative value**.

### 3.2 Arbitrage cash-and-carry (futures)

Exploit la relation théorique entre prix spot et prix futures :

```
Futures théorique : F* = S × e^(r-d)T
Si F > F* → Acheter le sous-jacent + Vendre le futures (contango excessif)
Si F < F* → Vendre le sous-jacent + Acheter le futures (backwardation excessif)
```

**Limites** : coûts de financement, coûts de stockage (matières premières), contraintes de vente à découvert.

### 3.3 Arbitrage statistique (stat arb)

L'**arbitrage statistique** est une forme sophistiquée de mean reversion appliquée à un large portefeuille de paires ou de facteurs, avec une neutralisation soigneuse du risque de marché.

**Architecture typique** :

```
1. Univers : 500 actions (S&P 500)
2. Neutralisation beta : portefeuille dollar-neutre et beta-neutre
3. Signal : alpha résiduel prédit par modèles ML ou factoriels
4. Exécution : centaines de positions simultaneously (long/short)
5. Rebalancement : quotidien ou hebdomadaire
```

**Facteurs alpha typiquement exploités** :
- Momentum à court terme (1–5 jours, effet rebond)
- Révisions de bénéfices par les analystes
- Sentiment des nouvelles (NLP sur flux d'actualités)
- Indicateurs comptables (price-to-book, accruals)

### 3.4 Arbitrage de convertibles

Les **obligations convertibles** combinent une obligation et une option d'achat sur les actions de l'émetteur. L'**arbitrage de convertibles** consiste à :

1. Acheter l'obligation convertible (sous-évaluée).
2. Vendre à découvert les actions de l'émetteur (couverture delta).
3. Profiter de la convergence de la valorisation + du gamma positif (la position profite de la volatilité).

### 3.5 Arbitrage de fusions (merger arbitrage / risk arb)

Après l'annonce d'une OPA, le cours de la cible converge progressivement vers le prix de l'offre (avec une décote reflétant le risque d'échec) :

```
Spread = Prix offre - Cours actuel cible
Rendement annualisé = Spread / Cours × 365 / Jours jusqu'au closing
```

**Stratégie** :
- Achat de la cible (spread à capturer)
- Vente à découvert de l'acquéreur (si paiement en actions)

**Risque principal** : échec de l'opération (recours régulateur, refus des actionnaires) → le cours de la cible rechute vers son niveau pré-annonce.

**Exemple** :
```
Prix OPA = 50 €, cours actuel cible = 47 €
Spread = 3 €, closing estimé dans 3 mois
Rendement annualisé = (3/47) × (365/90) = 25,9 % (brut, avant risque d'échec)
```

---

## 4. Gestion du risque et dimensionnement des positions

### 4.1 Le critère de Kelly

Le **critère de Kelly** donne la fraction optimale du capital à investir pour maximiser le taux de croissance à long terme :

```
f* = (p × b - q) / b
```

- `p` : probabilité de gain
- `q = 1 - p` : probabilité de perte
- `b` : ratio gain/perte

**Exemple** : p = 55 %, b = 1 (gain = perte)
```
f* = (0,55 × 1 - 0,45) / 1 = 0,10 → Investir 10 % du capital par trade
```

En pratique, on utilise le **demi-Kelly** (f*/2) pour réduire la volatilité du portefeuille.

### 4.2 Corrélation entre stratégies

Un portefeuille de stratégies décorrélées réduit la volatilité globale sans réduire le rendement espéré :

```
Sharpe combiné ≈ Sharpe individuel × √n  (si corrélations nulles)
```

**Exemple** : 4 stratégies de Sharpe 0,5 non corrélées → Sharpe portefeuille ≈ 0,5 × √4 = **1,0**

### 4.3 Drawdown maximal et ratio de Calmar

```
Calmar = Rendement annualisé / Drawdown maximal
```

Un bon ratio de Calmar est > 1. Les stratégies de trend following ont souvent un Calmar de 0,5–1, tandis que les stratégies de mean reversion peuvent atteindre 2–3 (au prix d'une exposition au risque de crise).

---

## 5. Erreurs fréquentes et pièges

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Overfitting** | Stratégie sur-optimisée sur l'historique, ne fonctionne pas out-of-sample | Walk-forward testing, cross-validation, regularisation |
| **Sélection des données (data mining)** | Tester 1000 stratégies et garder la meilleure → résultat biaisé | Correction de Bonferroni, haircut sur le Sharpe attendu |
| **Ignorer les coûts de transaction** | Un spread de 5 bps peut anéantir une stratégie à fort turnover | Modéliser réalistement les coûts (spread, impact marché, commissions) |
| **Survivorship bias** | Backtester sur un univers d'actions actuelles (qui ont "survécu") | Utiliser des données point-in-time incluant les délistings |
| **Look-ahead bias** | Utiliser une information non disponible à la date du signal | Construction rigoureuse du pipeline de données |
| **Sous-estimation du risque de queue** | Le backtests ne reproduit pas les crises rares | Stress tests sur scénarios historiques (2008, 2020) |

---

## 6. Exercices

### Exercice 1
Un trader teste un pairs trading entre deux actions A et B. Le spread historique a une moyenne de 10 € et un écart-type de 3 €. Le spread actuel est de 4 €. Quel est le Z-score ? Quelle position prendre ?

> **Correction** :
> Z = (4 - 10) / 3 = **-2,0**
> Signal : Z < -2 → le spread est anormalement bas → A est sous-évalué par rapport à B.
> **Position** : Acheter A + Vendre B (attendre que le spread remonte vers 10 €).
> Gain potentiel si retour à la moyenne : 10 - 4 = **6 €** par unité de spread.

### Exercice 2
Une stratégie a 60 % de trades gagnants, un gain moyen de 200 € et une perte moyenne de 150 €. Calculez le ratio b, le critère de Kelly et le demi-Kelly.

> **Correction** :
> b = 200 / 150 = **1,333**
> f* = (0,60 × 1,333 - 0,40) / 1,333 = (0,800 - 0,400) / 1,333 = 0,400 / 1,333 = **30,0 %**
> Demi-Kelly = **15 %** du capital par trade

### Exercice 3
Une OPA est annoncée à 60 € par action. Le cours de la cible est à 56 €. Le closing est estimé dans 4 mois. Probabilité de succès estimée à 85 %. Calculez le rendement espéré annualisé de la stratégie de merger arb.

> **Correction** :
> En cas de succès (85 %) : gain = 60 - 56 = 4 €
> En cas d'échec (15 %) : retour au cours pré-annonce estimé à 45 € → perte = 45 - 56 = -11 €
>
> Gain espéré = 0,85 × 4 + 0,15 × (-11) = 3,40 - 1,65 = **+1,75 €**
> Rendement = 1,75 / 56 = 3,13 %
> Annualisé = 3,13 % × (12/4) = **9,38 %**

---

## Points clés à retenir

- Le **momentum** exploite la persistance des tendances : acheter les gagnants, vendre les perdants.
- Le **mean reversion** exploite les écarts à l'équilibre : le prix revient toujours vers sa moyenne.
- L'**arbitrage** exploite des inefficiences de prix entre actifs liés (stat arb, merger arb, cash-and-carry).
- Toute stratégie doit être backtestée rigoureusement en évitant overfitting, look-ahead bias et survivorship bias.
- Le critère de Kelly optimise le dimensionnement des positions ; en pratique, on utilise le demi-Kelly.
- La combinaison de stratégies décorrélées améliore le Sharpe sans augmenter le risque individuel.
