# Chapitre 2 — Types de fonds et véhicules d'investissement

## Introduction

Un **véhicule d'investissement** est la structure juridique qui permet à plusieurs investisseurs de mettre en commun leurs capitaux pour les faire gérer par un professionnel. Le choix du véhicule dépend du type d'investisseurs ciblés, des actifs investis, des contraintes réglementaires et fiscales.

---

## 1. Les véhicules collectifs (fonds)

### 1.1 La SICAV et le FCP

En France et en Europe, les deux grandes formes juridiques sont :

| Critère | **SICAV** | **FCP** |
|---------|---------|--------|
| Forme juridique | Société Anonyme (ou SAS) | Copropriété de valeurs mobilières |
| Personnalité morale | Oui | Non (représentée par la SGP) |
| Capital | Variable | Variable |
| Gouvernance | Conseil d'administration, AG | Gérée par la SGP seule |
| Taille minimale | 8 M€ (UCITS) | 400 000 € |
| Droit de vote | Oui (actionnaires) | Non (porteurs de parts) |

**Mécanisme de souscription/rachat** :
```
Investisseur rachète → VL calculée à la date J (cut-off à 12h00)
→ Règlement J+2 ou J+3 selon les fonds
→ Valeur reçue = Nombre de parts rachetées × VL J
```

### 1.2 La Valeur Liquidative (VL ou NAV)

```
VL = (Total actifs - Total passifs) / Nombre de parts en circulation
```

Calcul quotidien pour les UCITS. Hebdomadaire ou mensuel pour les FIA.

### 1.3 Les catégories de parts (share classes)

Un même fonds peut avoir plusieurs catégories de parts avec des caractéristiques différentes :

| Catégorie | Caractéristiques typiques |
|-----------|--------------------------|
| **Part R** (Retail) | Accessible au grand public, frais plus élevés (1,5–2 %) |
| **Part I** (Institutional) | Ticket minimum élevé (500 K€–1 M€), frais réduits (0,5–1 %) |
| **Part C** (Capitalisation) | Les revenus sont réinvestis, pas de distribution |
| **Part D** (Distribution) | Les dividendes/coupons sont versés aux porteurs |
| **Part H** (Hedged) | Couverture du risque de change |
| **Part G** (GP) | Part du gérant, souvent sans frais |

---

## 2. Les fonds UCITS

### 2.1 Définition et cadre réglementaire

**UCITS** (Undertakings for Collective Investment in Transferable Securities) = OPCVM en français. Directive européenne (UCITS I en 1985, actuellement UCITS V de 2014).

**Caractéristiques-clés** :
- **Passeport européen** : un fonds UCITS enregistré en France peut être commercialisé dans toute l'UE sans re-enregistrement lourd.
- **Liquidité quotidienne** : souscription/rachat au moins deux fois par semaine.
- **Règles de diversification** :
  - Maximum 10 % en un seul émetteur (règle des 10 %)
  - Maximum 20 % dans les actifs d'un seul groupe
  - Maximum 35 % en titres d'un même État souverain
  - Maximum 10 % en OPCVM tiers
- **Actifs éligibles** : valeurs mobilières cotées, instruments du marché monétaire, dépôts bancaires, OPCVM, dérivés (pour couverture ou exposition efficace).
- **Effet de levier limité** : exposition globale ≤ 100 % de l'actif net (approche par les engagements) ou contrôle via VaR.

### 2.2 Avantages des UCITS

- **Protection des investisseurs** forte (ségrégation des actifs, dépositaire indépendant)
- **Passeport européen** = large base de distribution
- **Standardisation** = facilite la due diligence des investisseurs institutionnels
- **Fiscalité** : souvent avantageux pour les investisseurs non-résidents (statut UCITS reconnu mondialement : Asie, Amérique Latine)

---

## 3. Les Fonds d'Investissement Alternatifs (FIA)

### 3.1 Le cadre AIFM

Directive AIFM (Alternative Investment Fund Managers) de 2011 : encadre les gestionnaires de **FIA** (tout fonds non UCITS).

**Types de FIA** :

| Véhicule | Usage principal | Contraintes liquidité |
|---------|---------------|----------------------|
| **FCPE** (Fonds Commun de Placement d'Entreprise) | Épargne salariale | Blocage 5 ans sauf cas de déblocage |
| **FCPI** (Fonds Commun de Placement dans l'Innovation) | Financement PME innovantes, défiscalisation | Blocage 6–10 ans |
| **FIP** (Fonds d'Investissement de Proximité) | PME régionales | Blocage 6–10 ans |
| **FPCI** (Fonds Professionnel de Capital Investissement) | Private equity institutionnel | Durée de vie 10–12 ans |
| **OPCI** (Organisme de Placement Collectif en Immobilier) | Immobilier institutionnel | Liquidité périodique |
| **SCPI** (Société Civile de Placement Immobilier) | Immobilier retail | Liquidité secondaire limitée |
| **FPS** (Fonds Professionnel Spécialisé) | Fonds sur mesure institutionnels | Très flexible |

### 3.2 Les Hedge Funds

Les hedge funds sont des FIA avec des **stratégies non conventionnelles** : ventes à découvert, effet de levier élevé, dérivés complexes, actifs illiquides.

**Principales stratégies** :

| Stratégie | Description | Rendement/Risque |
|-----------|-------------|-----------------|
| **Long/Short Equity** | Achète des actions sous-valorisées, vend à découvert les surévaluées | Modéré/Modéré |
| **Global Macro** | Paris directionnels sur macro (Soros/livre sterling 1992) | Élevé/Élevé |
| **Merger Arbitrage** | Arbitrage sur M&A annoncés | Faible/Faible |
| **Fixed Income Arbitrage** | Exploite écarts de prix entre instruments obligataires | Modéré/Modéré (avec levier) |
| **Trend Following / CTA** | Suit les tendances sur futures (Man AHL, Winton) | Variable/Modéré |
| **Multi-strategy** | Combine plusieurs stratégies | Modéré/Modéré |
| **Distressed** | Investit dans la dette de sociétés en difficulté | Élevé/Élevé |

**Structure fee** : **"2 et 20"** = 2 % de management fee + 20 % de performance fee (avec high-water mark et parfois hurdle rate). Tendance actuelle : "1 et 15" sous pression des institutionnels.

---

## 4. Les mandats de gestion

### 4.1 Mandat individuel vs. fonds collectif

| Critère | Mandat | Fonds collectif |
|---------|--------|----------------|
| Propriété des actifs | Directe (client propriétaire) | Indirecte (parts de fonds) |
| Personnalisation | Très élevée | Limitée aux classes de parts |
| Ticket minimum | 10–50 M€ | Variable (dès 1 €) |
| Transparence | Totale (rapport ligne à ligne) | Partielle (reporting mensuel) |
| Fiscalité | Optimisable | Standardisée |
| Coûts | Plus élevés (frais fixes dilués sur petit AUM) | Mutualisés |

### 4.2 Types de mandats

- **Mandat discrétionnaire** : le gérant prend toutes les décisions, le client ne donne que les grandes orientations (profil de risque, univers d'investissement, contraintes).
- **Mandat conseil** : le gérant recommande, le client décide. Plus rare en institutionnel.
- **Mandat dédié** : structure d'un fonds ad hoc à compartiment unique pour un seul client (solution "fonds de fonds dédié" ou "mandat en nourricier").

---

## 5. Les ETF (Exchange-Traded Funds)

### 5.1 Fonctionnement des ETF

Un ETF est un **fonds coté en bourse** qui réplique généralement un indice. Il combine :
- La **diversification** d'un fonds
- La **liquidité** d'une action (achat/vente intraday)

**Mécanisme de création/rachat in-kind** :

```
Participant autorisé (AP = grande banque)
  → Apporte le panier de titres composant l'indice
  → Reçoit des "creation units" (blocs de 50 000 parts ETF)
  → Vend ces parts sur le marché secondaire aux investisseurs finaux

Si ETF coté > VL (prime) :
  AP crée de nouvelles parts → prix baisse → arbitrage ramène à la VL

Si ETF coté < VL (décote) :
  AP rachète des parts → les échange contre les titres sous-jacents → prix monte
```

### 5.2 Réplication physique vs. synthétique

| Type | Mécanisme | Avantages | Inconvénients |
|------|-----------|-----------|---------------|
| **Physique totale** | Détient tous les titres de l'indice | Pas de risque contrepartie | Coûts de rebalancing élevés sur grands indices |
| **Physique optimisée** | Détient un sous-ensemble représentatif | Coûts réduits | Tracking error légèrement supérieure |
| **Synthétique (swap)** | Contrat swap avec une banque → paiement du rendement de l'indice | Accès indices illiquides, pas de withholding tax | Risque contrepartie (limité à 10 % par UCITS) |

### 5.3 Coûts d'un ETF

Le **TER** (Total Expense Ratio) est affiché mais ne représente pas le coût total :

```
Coût total réel = TER + Tracking error + Spread bid/ask × fréquence de transactions
                    + Coûts de trading (commissions broker)
```

Pour un investisseur long terme qui conserve l'ETF, le spread est amorti et le coût total ≈ TER.

---

## Approfondissement théorique

### La taxonomie Morningstar et la box de style

Morningstar classe les fonds selon une grille 3×3 :
- Axe taille : Small / Mid / Large cap
- Axe style : Valeur / Mixte / Croissance

Cette classification permet de comprendre l'exposition d'un fonds et de détecter le **style drift** (déviation par rapport au style affiché).

**Analyse de style de Sharpe (Returns-Based Style Analysis)** : régression des rendements du fonds sur des indices de style → estime les expositions implicites sans regarder les positions.

---

## Exemples numériques

### Exemple 1 — Calcul de VL avec plusieurs classes de parts

Un fonds a un actif net total de 100 M€ avec :
- Part C (capitalisation) : 800 000 parts, VL initiale = 100 €
- Part D (distribution) : 200 000 parts, VL initiale = 100 €

Le fonds génère +5 % sur le mois. La part D distribue 3 € de dividende.

```
Actif net après performance = 100 M€ × 1,05 = 105 M€

Part C (capitalisation) :
  VL nouvelle = 105 M€ × (800 000 / 1 000 000) / 800 000
  Actif attribuable = 105 M€ × 80 % = 84 M€
  VL C = 84 M€ / 800 000 = 105 €

Part D (avant distribution) :
  Actif attribuable = 105 M€ × 20 % = 21 M€
  VL D avant distrib = 21 M€ / 200 000 = 105 €
  Distribution = 3 €/part → Actif net D diminue de 200 000 × 3 € = 600 000 €
  VL D après distrib = (21 M€ - 0,6 M€) / 200 000 = 102 €
```

### Exemple 2 — Comparaison coût total fonds actif vs ETF

Investissement de 50 000 € sur 10 ans :
- **Fonds actif** : performance brute +7 %/an, frais 1,5 %/an → performance nette 5,5 %/an
- **ETF** : performance brute +7 %/an, TER 0,1 %/an → performance nette 6,9 %/an

```
Capital final fonds actif = 50 000 × (1,055)^10 = 50 000 × 1,708 = 85 394 €
Capital final ETF = 50 000 × (1,069)^10 = 50 000 × 1,943 = 97 150 €

Différence = 97 150 - 85 394 = 11 756 € (23 % de plus avec l'ETF)
```

---

## Applications professionnelles

### Sélection du bon véhicule pour un institutionnel

Un fonds de pension cherchant à investir 500 M€ en private equity évaluera :
- **FPCI** (France) vs **Limited Partnership** (structure anglosaxonne standard)
- Durée de vie : 10 ans + 2 ans d'extension → adaptation aux besoins de reporting actuariel
- **Appels de fonds** progressifs sur 3–5 ans → gestion de la trésorerie en attendant (bridge portfolio)
- **Distributions** à partir de l'année 4–5 → correspondance avec les besoins de décaissement
- **Reporting** : ILPA standards (Institutional Limited Partners Association), communication des TRI et multiples

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Confondre TER et performance nette** | TER est un coût annuel, la performance est nette de frais de gestion mais brute d'impôts | Lire le DICI / PRIIPs KID |
| **Négliger le spread ETF** | Pour un investisseur court terme, le spread bid/ask peut dépasser le TER annuel | Comparer spread × fréquence de transactions au TER |
| **Ignorer le high-water mark** | Un hedge fund avec HWM ne perçoit pas de perf fee tant qu'il n'a pas récupéré ses pertes | Toujours vérifier l'existence et le niveau du HWM |
| **Confondre OPCVM et FIA** | Règles différentes : éligibilité, liquidité, levier, investisseurs | Vérifier la classification réglementaire du fonds |

---

## Exercices

### Exercice 1
Un fonds UCITS détient : 500 000 actions X à 20 €, 200 obligations à 98 % (nominal 10 000 €), 1 M€ de cash. Les frais de gestion courus depuis la dernière VL sont 8 000 €. Il y a 180 000 parts en circulation. Calculez la VL.

> **Correction** :
> Actions X = 500 000 × 20 € = 10 000 000 €
> Obligations = 200 × 10 000 × 98 % = 1 960 000 €
> Cash = 1 000 000 €
> Total actifs bruts = 12 960 000 €
> Passif (frais courus) = 8 000 €
> Actif net = 12 952 000 €
> VL = 12 952 000 / 180 000 = **71,96 €**

### Exercice 2
Comparez un investissement de 100 K€ sur 20 ans entre : (A) fonds actif à +8 %/an brut et 1,8 % de frais ; (B) ETF à +8 %/an brut et 0,1 % de frais.

> **Correction** :
> Performance nette A = 8 % - 1,8 % = 6,2 %
> Performance nette B = 8 % - 0,1 % = 7,9 %
>
> Capital A = 100 000 × (1,062)^20 = 100 000 × 3,334 = **333 400 €**
> Capital B = 100 000 × (1,079)^20 = 100 000 × 4,536 = **453 600 €**
>
> L'écart de 1,7 %/an de frais se traduit par **+36 % de capital supplémentaire** sur 20 ans.
> C'est la démonstration mathématique de l'effet des frais sur l'accumulation à long terme.
