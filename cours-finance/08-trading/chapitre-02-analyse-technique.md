# Chapitre 2 — Analyse technique

## Introduction

L'**analyse technique** (AT) est l'étude des graphiques de cours et de volumes pour anticiper les mouvements futurs des prix. Elle repose sur trois postulats fondamentaux formulés par Charles Dow (fin XIXe siècle) :

1. **Le marché actualise tout** : les prix reflètent toutes les informations disponibles (fondamentales, psychologiques, politiques).
2. **Les prix évoluent en tendances** : un mouvement en cours a tendance à se poursuivre jusqu'à un signal de retournement.
3. **L'histoire se répète** : les comportements humains étant cycliques, les configurations graphiques se reproduisent.

> **Note** : l'analyse technique est complémentaire de l'analyse fondamentale. Les praticiens combinent souvent les deux approches.

---

## 1. Les types de graphiques

### 1.1 Le graphique en chandeliers japonais (Candlestick)

Le chandelier est la représentation la plus utilisée en trading actif :

```
      │   ← Ombre haute (High)
    ┌─┴─┐
    │   │ ← Corps (Open → Close)
    │   │   Corps vert/blanc = hausse (Close > Open)
    └─┬─┘   Corps rouge/noir = baisse (Close < Open)
      │   ← Ombre basse (Low)
```

Chaque chandelier représente une période (1 min, 5 min, 1h, 1j, 1 semaine...).

### 1.2 Graphique en barres (OHLC)

```
    │ ← High
  ──┤ ← Open (trait gauche)
    │
    ├── ← Close (trait droit)
    │ ← Low
```

### 1.3 Graphique en ligne

Relie les cours de clôture. Simple mais perd les informations intraday.

### 1.4 Graphique en point & figure

Élimine le temps pour ne conserver que les mouvements de prix significatifs. Utile pour identifier les supports/résistances sans bruit.

---

## 2. La théorie de Dow et les tendances

### 2.1 Les six principes de Dow

1. Les indices actualisent tout.
2. Il existe trois tendances simultanées (primaire, secondaire, tertiaire).
3. Les tendances primaires ont trois phases.
4. Les indices doivent se confirmer mutuellement.
5. Le volume confirme la tendance.
6. Une tendance est en vigueur jusqu'à preuve du contraire.

### 2.2 Identification de la tendance

```
TENDANCE HAUSSIÈRE         TENDANCE BAISSIÈRE         RANGE (NEUTRE)
     /\/\                      \  /\                   ─────────────
    /    \                      \/  \  /               ─────────────
   /      \                          \/
Sommets et creux             Sommets et creux        Pas de direction
 croissants                    décroissants             claire
```

**Règle** :
- Tendance haussière = **Higher Highs (HH) + Higher Lows (HL)**
- Tendance baissière = **Lower Highs (LH) + Lower Lows (LL)**

### 2.3 Les phases d'une tendance haussière (Dow)

```
Phase 1 — Accumulation : les "mains fortes" achètent discrètement (pessimisme général)
Phase 2 — Participation : la tendance est reconnue, le grand public entre
Phase 3 — Distribution : les "mains fortes" vendent à la foule euphorique
```

---

## 3. Supports et résistances

### 3.1 Définitions

- **Support** : niveau de prix où la demande est suffisamment forte pour stopper une baisse.
- **Résistance** : niveau de prix où l'offre est suffisamment forte pour stopper une hausse.

**Principes** :
- Un support cassé devient résistance (et vice versa) → **principe de polarité**.
- Plus un niveau a été testé souvent, plus il est significatif.
- Un niveau rompu avec fort volume est plus fiable.

### 3.2 Identification des supports/résistances

```
     R2 ──────────────────── (ancienne résistance, maintenant résistance)
     R1 ──────────────────── (résistance actuelle)
     
     Cours actuel ↑
     
     S1 ──────────────────── (support immédiat)
     S2 ──────────────────── (support historique fort)
```

### 3.3 Niveaux de Fibonacci

Les retracements de Fibonacci (23,6 %, 38,2 %, 50 %, 61,8 %, 78,6 %) sont des niveaux de support/résistance très surveillés après une impulsion directionnelle.

```
Mouvement impulsif de A (0 %) vers B (100 %)
Retracement vers :
  23,6 % → support faible
  38,2 % → support modéré
  50,0 % → support important (psychologique)
  61,8 % → support clé (golden ratio)
  78,6 % → support profond
```

**Exemple** : Une action monte de 40 € à 60 € (+20 €). Le retracement 61,8 % se situe à :
```
60 - 20 × 61,8 % = 60 - 12,36 = 47,64 €
```

---

## 4. Indicateurs techniques

### 4.1 Moyennes mobiles (Moving Averages)

#### Moyenne mobile simple (SMA)

```
SMA(n) = (C_t + C_{t-1} + ... + C_{t-n+1}) / n
```

- `n` : nombre de périodes (ex : SMA 20, SMA 50, SMA 200)

#### Moyenne mobile exponentielle (EMA)

L'EMA pondère plus fortement les cours récents :

```
EMA_t = C_t × k + EMA_{t-1} × (1 - k)
k = 2 / (n + 1)
```

L'EMA réagit plus vite aux mouvements de prix que la SMA.

#### Signaux des moyennes mobiles

| Signal | Description |
|--------|-------------|
| **Golden Cross** | SMA 50 croise SMA 200 à la hausse → signal haussier fort |
| **Death Cross** | SMA 50 croise SMA 200 à la baisse → signal baissier fort |
| **Rebond sur MA** | Le cours rebondit sur une moyenne mobile → confirmation de tendance |
| **Cassure de MA** | Le cours casse une moyenne mobile → possible retournement |

### 4.2 MACD (Moving Average Convergence Divergence)

```
MACD Line = EMA(12) - EMA(26)
Signal Line = EMA(9) de la MACD Line
Histogramme = MACD Line - Signal Line
```

**Signaux** :
- MACD croise Signal à la hausse → **signal d'achat**
- MACD croise Signal à la baisse → **signal de vente**
- **Divergence** : le cours fait un nouveau sommet mais le MACD non → signal de faiblesse (et vice versa)

### 4.3 RSI (Relative Strength Index)

```
RSI = 100 - [100 / (1 + RS)]
RS = Moyenne des hausses / Moyenne des baisses (sur n périodes, généralement 14)
```

| Zone RSI | Interprétation |
|----------|---------------|
| > 70 | **Surachat** (overbought) → risque de correction |
| 30–70 | Zone neutre |
| < 30 | **Survente** (oversold) → potentiel de rebond |

**Divergence RSI** : cours fait un nouveau sommet mais RSI non → signal de retournement baissier imminent.

### 4.4 Bandes de Bollinger

```
Bande médiane = SMA(20)
Bande supérieure = SMA(20) + 2 × σ(20)
Bande inférieure = SMA(20) - 2 × σ(20)
```

**Signaux** :
- **Squeeze** (bandes très resserrées) → faible volatilité → explosion imminente.
- Cours touchant la bande supérieure → potentiel surachat.
- Cours touchant la bande inférieure → potentiel survente.
- **%B** = (Cours - Bande inférieure) / (Bande supérieure - Bande inférieure)

### 4.5 Volume

Le volume confirme ou infirme les mouvements de prix :

| Signal | Interprétation |
|--------|---------------|
| Hausse des prix + Volume fort | Tendance haussière confirmée |
| Hausse des prix + Volume faible | Mouvement peu fiable ("fake breakout" possible) |
| Baisse des prix + Volume fort | Vente de panique, possible capitulation |
| Baisse des prix + Volume faible | Baisse peu convainquante, potentiel rebond |

**OBV** (On-Balance Volume) : indicateur de volume cumulé → divergence OBV/prix = signal fort.

### 4.6 ATR (Average True Range)

Mesure la **volatilité moyenne** du marché :

```
True Range = max(High - Low, |High - Close_prev|, |Low - Close_prev|)
ATR(n) = Moyenne(True Range, n périodes)
```

Usage : calibrer les stop-loss (ex : stop à 2× ATR sous le point d'entrée).

---

## 5. Figures chartistes

### 5.1 Figures de retournement

#### Épaule-Tête-Épaule (Head & Shoulders)

```
          ┌─┐  ← Tête (T)
         /   \
    ┌─┐ /     \ ┌─┐  ← Épaules (E)
   / E\/       \/ E\
──/──────────────────── Ligne de cou (neckline)
```

**Signal** : cassure de la neckline vers le bas → baisse attendue ≈ hauteur tête - neckline.

Version inverse (creux) → signal de retournement haussier.

#### Double sommet / Double creux

```
DOUBLE SOMMET (M)          DOUBLE CREUX (W)
   /\    /\                    \/    \/
  /  \  /  \                  /  /\  \
 /    \/    \                /  /  \  \
```

Signal : cassure du support intermédiaire → mouvement mesuré ≈ hauteur de la figure.

### 5.2 Figures de continuation

#### Triangle ascendant

```
résistance ────────────────
           /\/\/\
          /      \  ← sommets plafonnés, creux croissants
```

Généralement résolution haussière (continuation).

#### Drapeau (Flag) et fanion (Pennant)

Formation courte après une forte impulsion, puis consolidation avant continuation :

```
   │ ← mât (impulsion)
   │  ─────
   │ /     \─ ← drapeau (consolidation)
   │        ─
   ↓ continuation
```

### 5.3 Les chandeliers japonais significatifs

| Chandelier | Description | Signal |
|-----------|-------------|--------|
| **Doji** | Open ≈ Close, longues ombres | Indécision → possible retournement |
| **Marteau (Hammer)** | Petit corps en haut, longue ombre basse | Retournement haussier en bas de tendance |
| **Étoile du soir (Evening Star)** | Séquence 3 bougies : haussier + doji + baissier | Retournement baissier en sommet |
| **Avalement haussier (Bullish Engulfing)** | Grand corps haussier englobant le corps baissier précédent | Retournement haussier |
| **Marteau inversé (Inverted Hammer)** | Petit corps en bas, longue ombre haute | Retournement haussier possible |

---

## 6. Gestion du risque en analyse technique

### 6.1 Le ratio Risk/Reward (R:R)

Avant d'entrer en position, le trader doit définir :

```
Entrée : niveau d'achat / vente
Stop-loss : niveau où la position est abandonnée (invalidation de la thèse)
Objectif (Target) : niveau de prise de bénéfice

Risk/Reward = (Target - Entrée) / (Entrée - Stop)
```

**Règle minimale** : n'entrer que si R:R ≥ 2:1 (gains potentiels = 2× risque).

**Exemple** :
- Achat à 50 €
- Stop-loss à 47 € (risque = 3 €)
- Objectif à 56 € (gain = 6 €)
- R:R = 6 / 3 = **2:1** ✓

### 6.2 La position sizing

La **position sizing** détermine la taille optimale de la position en fonction du risque accepté :

```
Taille de position = (Capital × Risque %) / (Entrée - Stop-loss)
```

**Exemple** :
- Capital = 100 000 €, risque par trade = 1 %, entrée = 50 €, stop = 47 €
- Taille = (100 000 × 1 %) / (50 - 47) = 1 000 / 3 = **333 actions**
- Risque réel = 333 × 3 € = 999 € ≈ 1 % du capital ✓

### 6.3 Le pyramidage (scaling)

Technique consistant à ajouter des positions en cours de tendance (après confirmation) :

```
1ère entrée : 50 % de la position totale visée
2ème entrée (après confirmation) : 30 %
3ème entrée : 20 %
→ Montée du stop-loss au fur et à mesure (trailing stop)
```

---

## 7. Limites de l'analyse technique

| Limite | Commentaire |
|--------|-------------|
| **Auto-réalisation** | Les signaux fonctionnent parfois parce que tout le monde les regarde |
| **Efficience des marchés** | En théorie semi-forte, les patterns passés ne devraient pas prédire l'avenir |
| **Subjectivité** | Deux analystes peuvent tracer la même figure différemment |
| **Faux signaux (whipsaws)** | Les indicateurs génèrent de nombreux faux signaux en range |
| **Lag des indicateurs** | Les moyennes mobiles et MACD sont retardés par nature |
| **Marchés peu liquides** | L'AT est moins fiable sur les actifs peu liquides (manipulation plus facile) |

**Recommandation** : utiliser l'AT en complément de l'analyse fondamentale et du contexte macro. Éviter de l'utiliser isolément.

---

## 8. Exercices

### Exercice 1
Une action présente le mouvement suivant : montée de 30 € à 50 €, puis retracement. Calculez les niveaux de retracement Fibonacci 38,2 %, 50 % et 61,8 %.

> **Correction** :
> Amplitude = 50 - 30 = 20 €
> 38,2 % : 50 - 20 × 0,382 = 50 - 7,64 = **42,36 €**
> 50 % : 50 - 20 × 0,50 = **40,00 €**
> 61,8 % : 50 - 20 × 0,618 = 50 - 12,36 = **37,64 €**

### Exercice 2
Un trader achète 100 actions à 80 € avec un stop-loss à 76 € et un objectif à 90 €. Son capital est de 50 000 €. Calculez le ratio R:R, le risque en euros et en % du capital.

> **Correction** :
> R:R = (90 - 80) / (80 - 76) = 10 / 4 = **2,5:1** ✓ (> 2:1)
> Risque en € = 100 × (80 - 76) = **400 €**
> Risque en % = 400 / 50 000 = **0,8 %** du capital (correct, < 1-2 %)

### Exercice 3
Le RSI d'une action est à 28. Le cours vient de toucher un support historique avec un fort volume. Comment interprétez-vous cette situation et quelle stratégie envisagez-vous ?

> **Correction** :
> **Interprétation** : RSI < 30 = zone de survente (signal de rebond potentiel) + support historique testé + volume élevé (capitulation probable). Trois signaux convergents → situation favorable pour un trade haussier.
>
> **Stratégie possible** :
> - Entrée : légèrement au-dessus du support (confirmation du rebond)
> - Stop-loss : sous le support (invalidation)
> - Objectif : prochaine résistance identifiée
> - Attendre une bougie de confirmation haussière (ex : marteau, engulfing haussier)

---

## Points clés à retenir

- L'analyse technique repose sur 3 postulats : le marché actualise tout, les prix suivent des tendances, l'histoire se répète.
- Les supports/résistances et les Fibonacci sont les outils les plus utilisés en pratique.
- MACD, RSI, Bandes de Bollinger sont des indicateurs de confirmation (jamais de déclenchement seul).
- Le volume valide les mouvements de prix : un breakout sans volume est suspect.
- Le ratio Risk/Reward doit être ≥ 2:1 avant d'entrer en position.
- L'AT a ses limites : subjectivité, faux signaux, lag. Toujours combiner avec le contexte macro.
