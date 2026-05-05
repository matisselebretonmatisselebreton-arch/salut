# Chapitre 3 — Venture Capital et financement des start-ups

## Introduction

Le **Venture Capital** (capital-risque) finance les entreprises **jeunes et à fort potentiel de croissance** qui ne peuvent pas accéder au financement bancaire classique. C'est le moteur du financement de l'innovation et des start-ups technologiques.

---

## 1. Spécificités du Venture Capital

### 1.1 Différences avec le Buyout

| Critère | Buyout (LBO) | Venture Capital |
|---------|-------------|----------------|
| Stade de l'entreprise | Mature, profitable | Jeune, en perte souvent |
| Levier financier | Élevé (dette) | Quasi nul (equity pur) |
| Business model prouvé | Oui | Non (encore en validation) |
| Risque | Modéré | Très élevé |
| Rendement cible | 20–30 % | > 30 % (pour compenser les échecs) |
| Durée d'investissement | 5–7 ans | 7–12 ans |

### 1.2 La loi de puissance (Power Law)

Dans un fonds VC, la majorité des retours est générée par **1 ou 2 investissements** ("home runs") qui compensent les nombreux échecs.

```
Distribution typique d'un fonds VC :
- 50 % des sociétés font faillite ou sont perdues
- 30 % retournent 1–2× (faible succès)
- 15 % retournent 2–5×
- 5 % retournent > 10× (les "unicorns" → compensent tout)
```

**Implication** : le VC doit construire un portefeuille diversifié et chercher le "grand gagnant".

---

## 2. Les tours de financement

### 2.1 Séquence de financement

```
Idée → Amorçage (Seed) → Série A → Série B → Série C → ... → IPO ou Cession
```

| Tour | Stade | Investisseurs | Montant typique |
|------|-------|-------------|----------------|
| **Pre-seed** | Idée, prototype | Fondateurs, FFF (Friends, Family, Fools) | < 100 k€ |
| **Seed** | MVP, 1ers clients | Business angels, seed funds | 200 k€ – 2 M€ |
| **Série A** | Product-market fit | Fonds VC | 5 – 20 M€ |
| **Série B** | Croissance accélérée | Fonds VC, growth | 20 – 100 M€ |
| **Série C+** | Scale-up | Late-stage VC, PE | 100 M€+ |
| **IPO / Exit** | Maturité | Marchés publics ou acquéreur stratégique | — |

### 2.2 La dilution

À chaque tour, les fondateurs émettent de **nouvelles actions** pour les investisseurs → **dilution** du pourcentage détenu.

```
Avant Serie A : fondateurs 100 %
Après Seed (20 % pour les investisseurs) : fondateurs 80 %
Après Série A (25 % pour les investisseurs) : fondateurs 60 %
Après Série B (20 % pour les investisseurs) : fondateurs 48 %
```

---

## 3. Valorisation des start-ups

### 3.1 Les méthodes spécifiques au VC

La valorisation des start-ups à fort potentiel mais sans profit est complexe. Les méthodes traditionnelles (DCF, multiples) s'appliquent difficilement.

**Méthode des multiples de revenus** (SaaS et croissance) :

```
Valeur = ARR (Annual Recurring Revenue) × Multiple de revenus
```

- Multiples typiques : 5–20× ARR selon la croissance et les marges.

**Méthode VC (Venture Capital Method)** :

```
1. Estimer la valeur à la sortie (exit value) dans n ans
   Exit Value = EBITDA_n × Multiple_sortie (ou revenus × multiple)

2. Actualiser au TRI cible du fonds
   Valeur post-money aujourd'hui = Exit Value / (1 + TRI)^n

3. En déduire la participation du fonds
   Participation VC = Investissement / Valeur post-money
```

### 3.2 Pre-money vs. Post-money

```
Valeur post-money = Valeur pre-money + Montant de l'investissement
% VC = Investissement / Valeur post-money
```

**Exemple** :
- Pre-money = 8 M€, Investissement = 2 M€
- Post-money = 10 M€
- % VC = 2 / 10 = **20 %**

### 3.3 Méthode VC illustrée

- Start-up SaaS, investissement = 5 M€, horizon = 5 ans.
- Prévision : ARR = 20 M€ dans 5 ans, multiple de sortie = 8×
- Exit Value = 160 M€
- TRI cible = 40 %
- Valeur post-money = 160 / (1,40)⁵ = 160 / 5,378 = **29,75 M€**
- % VC = 5 / 29,75 = **16,8 %**
- Valeur pre-money = 29,75 - 5 = **24,75 M€**

---

## 4. Instruments financiers du VC

### 4.1 Actions ordinaires vs. préférentielles

Les investisseurs VC reçoivent généralement des **actions préférentielles** (preferred shares) qui leur confèrent :

| Droit | Description |
|-------|-------------|
| **Liquidation preference** | En cas de cession ou liquidation, récupèrent d'abord leur mise (1× ou 2× investissement) |
| **Anti-dilution** | Protection si un tour futur est réalisé à une valorisation inférieure (down round) |
| **Droit de vote préférentiel** | Vote sur décisions clés |
| **Droits d'information** | Accès aux comptes, reporting |

### 4.2 Clauses contractuelles (term sheet)

| Clause | Description |
|--------|-------------|
| **Pro-rata rights** | Droit de participer aux tours suivants pour maintenir sa participation |
| **Tag-along** | Droit de vendre aux mêmes conditions si les fondateurs vendent |
| **Drag-along** | Obligation de vendre si la majorité des actionnaires accepte une offre |
| **Vesting** | Les fondateurs acquièrent progressivement leurs actions (ex : 4 ans avec cliff 1 an) |
| **BSPCE** | Bons de souscription de parts de créateur d'entreprise (France) — options pour les salariés |

---

## 5. Stratégies de sortie (exit)

| Type de sortie | Description | Fréquence |
|---------------|-------------|-----------|
| **IPO** (Introduction en Bourse) | La start-up se cote en bourse | Rare mais très profitable |
| **Trade sale** | Cession à un acquéreur stratégique (grande entreprise) | Le plus fréquent |
| **Secondary buyout** | Cession à un autre fonds PE | En croissance |
| **Recapitalisation** | Distribution de dividendes par endettement | Partiel |
| **Liquidation** | Faillite | Fréquent (50 % des start-ups) |

---

## 6. L'écosystème start-up français

| Acteur | Exemples |
|--------|---------|
| **Bpifrance** | Banque publique d'investissement, acteur central du VC français |
| **Station F** | Premier campus de start-ups mondial (Paris) |
| **Fonds VC français majeurs** | Eurazeo, Partech, Kima Ventures, Idinvest (Eurazeo Growth) |
| **French Tech** | Label et réseau des start-ups françaises |
| **Licornes françaises** | Doctolib, Contentsquare, Mirakl, Ledger, Exotec... |

---

## 7. Exercices

### Exercice 1
Un fonds VC investit 4 M€ dans une start-up à une valorisation pre-money de 16 M€. Calculez la participation du fonds et la valorisation post-money.

> **Correction** :
> Post-money = 16 + 4 = **20 M€**
> % Fonds = 4 / 20 = **20 %**

### Exercice 2
La start-up prévoit de réaliser 50 M€ de revenus dans 6 ans, avec un multiple de sortie de 10×. Le TRI cible du fonds est 35 %. Quelle est la valorisation post-money aujourd'hui justifiant un investissement de 5 M€ ? Quelle participation le fonds doit-il exiger ?

> **Correction** :
> Exit Value = 50 × 10 = 500 M€
> Post-money = 500 / (1,35)⁶ = 500 / 6,054 = **82,6 M€**
> % Fonds = 5 / 82,6 = **6,1 %**
> Pre-money = 82,6 - 5 = **77,6 M€**

---

## Points clés à retenir

- Le VC finance l'innovation à haut risque en exchange d'une part du capital.
- La loi de puissance : quelques succès paient pour tous les échecs.
- Chaque tour de financement dilue les fondateurs → la structure du cap table est critique.
- La valorisation par la méthode VC actualise la valeur de sortie au TRI cible.
- Les actions préférentielles protègent les investisseurs (liquidation preference, anti-dilution).
- Le vesting aligne les intérêts des fondateurs sur le long terme.
