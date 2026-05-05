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

---

## Approfondissement théorique

### La table de capitalisation (cap table) et la gestion de la dilution

La **cap table** (tableau de capitalisation) est le document central qui retrace qui détient quoi dans une start-up :

```
Fondateurs : 60 %
Seed investors : 15 %
Série A VC : 20 %
ESOP (Stock Options Pool) : 5 %
Total : 100 %
```

**Dilution anti-dilutive : la clause full ratchet vs. broad-based weighted average**

En cas de **down round** (levée à une valorisation inférieure au tour précédent), les investisseurs peuvent activer leur protection anti-dilution :

**Full ratchet** : le prix de conversion des preferred shares est ajusté au nouveau prix du down round. Protection maximale pour l'investisseur → dilution massive des fondateurs.

**Broad-based weighted average** (BBWA) : ajustement pondéré par les volumes — plus équitable :
```
Prix ajusté = ((A + B) / (A + C)) × Prix ancien
A = Nb actions avant down round
B = Argent levé dans le down round / Nouveau prix
C = Nb nouvelles actions émises
```

**Liquidation preference et participating preferred shares** :

| Type | Mécanisme |
|------|-----------|
| **Non-participating** (1×) | Investisseur récupère 1× sa mise OU se convertit en ordinaires |
| **Participating** (1×) | Investisseur récupère 1× sa mise ET participe au reste pro-rata |
| **Multiple liquidation preference** | Investisseur récupère 2× (ou 3×) sa mise avant les fondateurs |

**Exemple participating vs. non-participating** avec investissement de 10 M€, mise totale des fondateurs 2 M€, exit à 30 M€ :

```
Non-participating : VC prend max(10, 30 × 80 %) = max(10, 24) = 24 M€ → VC convertit
Participating : VC prend 10 M€ + (30 - 10) × 80 % = 10 + 16 = 26 M€ → fondateurs 4 M€
```

### Le modèle économique du fonds VC

Un fonds VC est structuré comme un **Limited Partnership** :
- **LP (Limited Partners)** : investisseurs institutionnels (fonds de pension, family offices, BPI, universités endowments). Apportent ~99 % du capital.
- **GP (General Partner)** : l'équipe de gestion VC. Apporte ~1 % du capital.

**Économie du fonds VC** :
```
Management fees : 2 % × capital engagé / an pendant la période d'investissement
Carried interest : 20 % du profit après remboursement du capital aux LP et hurdle rate (8 %)
```

**Exemple** : Fonds de 100 M€, durée 10 ans, rendement de 3× (300 M€ retournés) :
```
Management fees = 2 % × 100 M€ × 5 ans = 10 M€ (pendant la période d'investissement)
Capital remboursé aux LP = 100 M€
Profit = 300 - 100 = 200 M€
Hurdle rate 8 % sur 10 ans = 100 × (1,08)^10 = 215 M€ → le GP doit d'abord rembourser 215 M€
Si retour = 300 M€ :
  LP reçoivent : 215 M€ (capital + hurdle) + 80 % × (300 - 215) = 215 + 68 = 283 M€
  GP carried = 20 % × 85 M€ = 17 M€ (en plus des management fees)
```

### La valorisation en pré-revenu : méthode scorecard et Berkus

Pour les start-ups à stade très précoce (pré-revenu), des méthodes qualitatives s'appliquent :

**Méthode Berkus (Dave Berkus)** : attribue une valeur à chaque composante de la start-up :

| Critère | Valeur max (k€) |
|---------|-----------------|
| Idée (résout un vrai problème) | 500 |
| Prototype fonctionnel | 500 |
| Qualité de l'équipe | 500 |
| Relations commerciales / premiers contrats | 500 |
| Déploiement produit sur le marché | 500 |
| **Valeur pré-money max** | **2 500 k€** |

**Méthode Scorecard (Ohio TechAngels)** : compare la start-up à une start-up "médiane" du secteur.

---

## Exemples numériques supplémentaires

### Exemple 1 — Simulation de cap table sur 3 tours

**Fondateurs** : 1 M actions ordinaires (100 % au départ)

**Seed (600 k€ à 3 M€ pre-money)** :
```
Post-money = 3 + 0,6 = 3,6 M€
Actions émises pour seed = 0,6/3,6 × 1 M / (1 - 0,6/3,6) = ... 
Méthode directe : prix/action = 3 M€ / 1 M actions = 3 €
Nouvelles actions = 600 k€ / 3 € = 200 000 actions
Total : fondateurs 1 M / 1,2 M = 83,3 %, seed 16,7 %
```

**Série A (5 M€ à 15 M€ pre-money)** :
```
Prix/action = 15 M€ / 1,2 M actions = 12,50 €
Nouvelles actions = 5 M€ / 12,50 = 400 000 actions
Total = 1,6 M actions
Fondateurs : 1 M / 1,6 M = 62,5 %, seed : 200 k / 1,6 M = 12,5 %, VC A = 25 %
```

**Série B (10 M€ à 40 M€ pre-money)** :
```
Prix/action = 40 M€ / 1,6 M = 25 €
Nouvelles actions = 10 M€ / 25 = 400 000
Total = 2 M actions
Fondateurs : 50 %, Seed : 10 %, VC A : 20 %, VC B : 20 %
```

### Exemple 2 — Exit et waterfall

À la sortie (cession pour 80 M€), avec la cap table ci-dessus et ces liquidation preferences :
- Seed : 1× non-participating (LP = 600 k€)
- VC A : 1× non-participating (LP = 5 M€)
- VC B : 1× non-participating (LP = 10 M€)

```
Waterfall :
1. VC B recouvre 10 M€ → 70 M€ restants
2. VC A recouvre 5 M€ → 65 M€ restants
3. Seed recouvre 0,6 M€ → 64,4 M€ restants

Choix conversion ou liquidation preference :
- VC B : 1× LP = 10 M€ vs. conversion 20 % × 80 = 16 M€ → se CONVERTIT
- VC A : 1× LP = 5 M€ vs. conversion 20 % × 80 = 16 M€ → se CONVERTIT
- Seed : 1× LP = 0,6 M€ vs. conversion 10 % × 80 = 8 M€ → se CONVERTIT

Tous se convertissent → distribution pro-rata :
Fondateurs (50 %) : 40 M€
Seed (10 %) : 8 M€ → MOIC = 8 / 0,6 = 13,3×
VC A (20 %) : 16 M€ → MOIC = 16 / 5 = 3,2×
VC B (20 %) : 16 M€ → MOIC = 16 / 10 = 1,6× (performance faible)
```

### Exemple 3 — Portfolio construction et power law

Un fonds VC de 100 M€ fait 20 investissements de 5 M€ chacun :

| Résultat | Nb investissements | Retour |
|----------|-------------------|--------|
| Faillite | 10 | 0 |
| 1× | 4 | 20 M€ |
| 2–3× | 4 | 50 M€ |
| 10× | 1 | 50 M€ |
| 30× (unicorn) | 1 | 150 M€ |
| **Total** | **20** | **270 M€** |

```
MOIC fonds = 270 / 100 = 2,7× sur l'ensemble du portefeuille
L'unicorn (1 investissement sur 20) rapporte 150/270 = 55 % du retour total
```

→ La **loi de puissance** : une start-up génère plus de retour que toutes les autres réunies.

---

## Applications professionnelles

### Structure organisationnelle d'un fonds VC

**Processus d'investissement** :
1. **Sourcing** : 1 000+ opportunités/an via réseau, accélérateurs (Y Combinator, Station F), conférences.
2. **Screening** : 100 dossiers analysés en détail.
3. **Due diligence** : 10 opportunités en due diligence approfondie.
4. **Investment Committee** : 3–5 investissements réalisés.
5. **Post-investissement** : accompagnement mensuel, siège au board, introductions.

**Indicateurs de performance du fonds VC** :
- **IRR net** (après management fees et carried interest) : cible > 20 %
- **TVPI (Total Value to Paid-In)** : (valeur portefeuille actuel + distributions) / capital investi
- **DPI (Distributions to Paid-In)** : cash retourné / capital investi
- **RVPI (Residual Value to Paid-In)** : valeur portefeuille non réalisé / capital investi

### Écosystème VC mondial

| Géographie | Caractéristiques | Acteurs majeurs |
|-----------|-----------------|-----------------|
| **Silicon Valley** | Epicentre mondial, tickets élevés | Sequoia, a16z, Benchmark |
| **New York** | Focus fintech, media, B2B SaaS | Tiger Global, General Atlantic |
| **Paris (La French Tech)** | Licornes en hausse, fort soutien BPI | Partech, Eurazeo, Kima |
| **Londres** | Hub financier européen post-Brexit | Index Ventures, Balderton |
| **Asie** | Croissance rapide, marché immense | SoftBank, Sequoia Asia |

---

## Erreurs fréquentes et pièges

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Valoriser trop tôt trop haut** | Une valorisation élevée en Seed rend difficile la Série A sans down round | Lever à la juste valeur, laisser de la marge pour le prochain tour |
| **Négliger la dilution de l'ESOP** | Le pool de stock options dilue les fondateurs et investisseurs | Créer le pool avant chaque tour pour ne pas impacter la valorisation |
| **Confondre post-money et liquid value** | La valeur post-money est théorique ; la liquidation preference peut réduire le retour réel des fondateurs | Modéliser le waterfall pour chaque scénario d'exit |
| **Participating preferred abusive** | En cas de participating preferred, le VC double-dip : il prend d'abord son LP puis participe au reste | Négocier non-participating ou un cap sur la participation |
| **Ignorer le vesting dans les négociations** | Sans vesting, un cofondateur qui part précocement garde ses actions → dilution pour les autres | Standard : 4 ans avec cliff 1 an, accélération simple en cas de change of control |

---

## Exercices supplémentaires

### Exercice 1
Un VC investit 8 M€ dans une start-up à une valorisation pre-money de 24 M€. Le fondateur possède 100 % avant l'opération. Calculez la valorisation post-money, le % du VC et le % du fondateur après le tour.

> **Correction** :
> Post-money = 24 + 8 = **32 M€**
> % VC = 8 / 32 = **25 %**
> % Fondateur = 24 / 32 = **75 %**

### Exercice 2
La start-up de l'exercice 1 réalise une Série B : 15 M€ levés à une valorisation pre-money de 80 M€. Calculez la nouvelle cap table et le % de dilution du fondateur.

> **Correction** :
> Prix par action Série A = 24 M€ / Nb actions existantes.
> Simplifions : supposons 1 M actions au départ → prix Seed = 24 €/action
> Actions Seed = 8 M€ / 24 = 333 333 actions
> Total après Seed = 1 333 333 actions
>
> Prix Série B = 80 M€ / 1 333 333 = 60 €/action
> Nouvelles actions Série B = 15 M€ / 60 = 250 000 actions
> Total = 1 583 333 actions
>
> | Actionnaire | Actions | % |
> |------------|---------|---|
> | Fondateur | 1 000 000 | 63,2 % |
> | Seed VC | 333 333 | 21,1 % |
> | VC Série B | 250 000 | 15,8 % |
>
> Dilution fondateur : de 75 % à 63,2 % = **-11,8 points**

### Exercice 3
Exit à 200 M€. VC Série A : 8 M€ investis, 25 %, liquidation preference 1× non-participating. VC Série B : 15 M€ investis, 15,8 %, liquidation preference 1× non-participating. Calculez le waterfall et les MOIC de chaque investisseur.

> **Correction** :
>
> **Option LP vs. conversion pour chaque investisseur** :
> VC A : 1× LP = 8 M€ vs. 25 % × 200 = 50 M€ → SE CONVERTIT
> VC B : 1× LP = 15 M€ vs. 15,8 % × 200 = 31,6 M€ → SE CONVERTIT
>
> Distribution pro-rata (tous convertis) :
> | Actionnaire | % | Montant | MOIC |
> |------------|---|---------|------|
> | Fondateur | 63,2 % | 126,4 M€ | N/A |
> | VC A | 21,1 % | 42,2 M€ | 42,2/8 = **5,3×** |
> | VC B | 15,8 % | 31,6 M€ | 31,6/15 = **2,1×** |

### Exercice 4
Décrivez les trois grandes formes de sorties VC et donnez pour chacune un avantage et un inconvénient du point de vue du fonds.

> **Correction** :
>
> **1. IPO** :
> ✓ Prix élevé (prime de liquidité), visibilité.
> ✗ Lock-up 180 jours (le VC ne peut pas vendre immédiatement), processus long et coûteux.
>
> **2. Trade sale** (vente à un industriel) :
> ✓ Liquidité immédiate, prix élevé si synergies (l'industriel paie pour les synergies).
> ✗ Le fondateur perd son indépendance, le VC doit négocier les clauses de représentation/garantie.
>
> **3. Secondary buyout** (vente à un autre fonds PE/VC) :
> ✓ Process rapide, acquéreur familier avec les structures VC.
> ✗ Prix souvent inférieur au trade sale (pas de synergies), "recycling" du risque plutôt que création de valeur réelle.
