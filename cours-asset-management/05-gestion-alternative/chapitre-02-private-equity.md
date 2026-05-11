# Chapitre 2 — Private Equity : Perspective Asset Management

## Introduction

Le **private equity** (capital-investissement) désigne l'investissement dans des entreprises **non cotées** en bourse. Pour les investisseurs institutionnels (fonds de pension, assureurs, fonds souverains, endowments), le PE représente une source de **prime d'illiquidité** de 3–5 % par rapport aux actions cotées comparables, en échange d'un capital immobilisé pendant 8–12 ans.

L'industrie mondiale du PE représente ~8 000 Md$ d'AUM en 2024 (Preqin).

---

## 1. Segments du private equity

### 1.1 Capital-risque (Venture Capital — VC)

Investissement dans des **startups et entreprises en phase de croissance précoce**.

| Phase | Stade | Taille ticket | TRI cible |
|-------|-------|-------------|---------|
| **Seed** | Idée, prototype | 100 K€ – 1 M€ | >30 % |
| **Série A** | Produit-marché validé, premières ventes | 1 M€ – 10 M€ | 25–30 % |
| **Série B/C** | Scaling, expansion géographique | 10 M€ – 100 M€ | 20–25 % |
| **Growth Equity** | Entreprise profitable, accélération | 50 M€ – 500 M€ | 15–20 % |

**Profil risque/rendement** : très concentré (5–10 % des startups génèrent 90 % des rendements), nécessite une diversification sur de nombreuses participations.

### 1.2 Leveraged Buyout (LBO)

Acquisition d'une entreprise **mature et profitable** avec un fort effet de levier financier.

```
Structure d'un LBO :
  Prix d'acquisition = 100 M€ (EV = 10x EBITDA de 10 M€)
  Financement :
    30 M€ Fonds propres (equity) → GP + LP
    50 M€ Dette senior (banques, taux variable + spread)
    20 M€ Mezzanine / Dette junior (taux plus élevé)

  Rendement pour les fonds propres si :
    - EBITDA passe de 10 M€ à 15 M€ en 5 ans (+50 %)
    - Multiple de sortie = 10x (EV = 150 M€)
    - Remboursement de la dette sur 5 ans (hypothèse : 40 M€ remboursés)
    - Valeur résiduelle de la dette à la sortie : 30 M€
    
  Valeur des fonds propres à la sortie = 150 M€ - 30 M€ = 120 M€
  Mise initiale = 30 M€
  Multiple = 120 / 30 = 4,0x MOIC
  TRI = (4,0)^(1/5) - 1 = 32 % brut de frais
```

**Créateurs de valeur dans un LBO** :
1. **Délevier** (remboursement de la dette) : mécaniquement augmente la valeur des fonds propres
2. **Croissance de l'EBITDA** : expansion organique + acquisition build-up
3. **Expansion de multiple** : acheter à 8x, revendre à 11x

### 1.3 Venture Debt et Dette Privée

La **dette privée** (private credit) est la classe d'actifs alternative en plus forte croissance :

| Sous-segment | Rendement cible | Risque |
|-------------|----------------|--------|
| **Direct lending** (dette senior) | SOFR + 5–7 % | Modéré |
| **Unitranche** (dette unique senior + mezzanine) | SOFR + 7–10 % | Modéré/Élevé |
| **Mezzanine** (dette subordonnée + warrants) | 12–16 % | Élevé |
| **Distressed debt** (entreprises en difficulté) | 15–25 % | Très élevé |
| **Venture debt** (prêts aux startups VC-backed) | 10–15 % | Élevé |

---

## 2. Métriques de performance PE

### 2.1 Le Taux de Rendement Interne (TRI / IRR)

Le TRI est le taux qui annule la VAN de tous les flux (appels de fonds négatifs, distributions positives) :

```
Σ CFₜ / (1 + TRI)^t = 0

Exemple :
  An 0 : -100 (appel de fonds)
  An 1 : -50 (deuxième appel)
  An 3 : +80 (première distribution)
  An 5 : +200 (distribution finale + sortie)

  TRI résout : -100 - 50/(1+r) + 0 + 80/(1+r)³ + 200/(1+r)⁵ = 0
  TRI ≈ 24 % (résolution numérique)
```

**Limites du TRI** :
- Sensible au timing des flux (J-curve) : un fonds qui distribue tôt aura un TRI plus élevé
- Hypothèse de réinvestissement au TRI → souvent irréaliste
- Ne tient pas compte de la taille (un petit fonds peut avoir un TRI élevé mais peu d'impact)

### 2.2 Les multiples (MOIC, TVPI, DPI, RVPI)

```
MOIC (Multiple on Invested Capital) = Total Value / Paid-In Capital
     = (Distributions + Valeur résiduelle) / Capital appelé

TVPI (Total Value to Paid-In) = MOIC = DPI + RVPI

DPI (Distributions to Paid-In) = Distributions / Capital appelé
  → Mesure le "cash-on-cash" déjà réalisé

RVPI (Residual Value to Paid-In) = Valeur résiduelle / Capital appelé
  → Mesure ce qui reste dans le fonds (non encore distribué)

Exemple :
  Capital appelé : 200 M€
  Distributions réalisées : 150 M€
  Valeur résiduelle des participations : 180 M€
  
  DPI = 150/200 = 0,75x (75 % du capital déjà remboursé)
  RVPI = 180/200 = 0,90x
  TVPI = 0,75 + 0,90 = 1,65x
```

### 2.3 La J-curve

```
Valeur nette
   |
   |                           /‾‾‾‾‾‾ Maturité et sorties
   |                         /
   |                       /
   |_____________________/
   |           Plateau "milieu de vie"
   |         /
   |       /
   |_____/
   |   \
   |    \   J-curve (frais + premières pertes + pas encore de valorisation)
   |     \___
   └─────────────────────────────────── Années
   0   1   2   3   4   5   6   7   8   9  10
```

Les premières années, le TVPI < 1x (en dessous du pair) car :
- Les frais de gestion sont prélevés sur le capital engagé non investi
- Les premières acquisitions sont comptabilisées à leur coût sans valorisation

### 2.4 PME (Public Market Equivalent)

Pour comparer le PE aux actions cotées, on utilise le **PME** (Kaplan & Schoar, 2005) :

```
PME = VAN des distributions reçues / VAN des appels de fonds versés
     (toutes les dates indexées sur l'indice boursier de référence)

PME > 1 → Le fonds PE a surperformé l'indice boursier
PME < 1 → Sous-performance vs le marché coté
```

---

## 3. Due Diligence PE pour un investisseur institutionnel

### 3.1 Analyse du GP (General Partner)

**Track record** :
- TRI net brut sur tous les fonds précédents (minimum 3 fonds pour avoir une vision cycle complet)
- Cohérence des rendements : si le fonds I a fait 30 % mais le fonds II fait 10 %, red flag
- Multiples de sortie vs multiples d'entrée : créent-ils vraiment de la valeur ou profitent-ils juste de la baisse des taux ?

**Équipe** :
- Composition et ancienneté
- Qui a réellement pris les décisions d'investissement ? (Key Man Risk)
- Plan de succession : que se passe-t-il si le fondateur part ?

**Alignment of interests** :
- Le GP investit-il ses propres fonds dans le fonds (GP commit, minimum 1–3 %) ?
- Structure de carried interest : qui en bénéficie (toute l'équipe ou seulement les fondateurs) ?

### 3.2 Analyse de la stratégie

- **Marché cible** : taille du marché adressable, concurrence d'autres fonds PE
- **Avantage compétitif** : deal sourcing propriétaire, expertise sectorielle, réseau opérationnel
- **Capacité** : l'AUM du fonds est-il adapté à la stratégie ? Un fonds mid-market de 5 Md$ perdrait son avantage (deals trop petits)
- **Concentration** : nombre de participations, taille max par participation

---

## 4. Approfondissement théorique

### La prime d'illiquidité

**Harris, Jenkinson & Kaplan (2014)** ont montré que les fonds PE US ont surperformé le S&P 500 de 3–4 %/an (TRI net) sur 1984–2010. La prime se décompose en :
1. **Prime d'illiquidité** : compensation pour le capital immobilisé
2. **Prime de levier** : amplification par l'effet de levier
3. **Alpha opérationnel** : vraie création de valeur par le GP

**Critique** : Phalippou (2014) conteste ces résultats en montrant que le PME est souvent inférieur à 1 si on utilise un indice small cap (les entreprises PE sont petites et plus risquées que le S&P 500).

**Lissage des valorisations** : les valorisations trimestrielles des fonds PE ne reflètent pas les variations de marché → volatilité apparente artificellement basse → surestimation du Sharpe ratio.

---

## Exemples numériques

### Exemple 1 — Construction de valeur dans un LBO

Acquisition d'une entreprise industrielle :
- Prix d'entrée : EV = 8x EBITDA = 8 × 20 M€ = 160 M€
- Financement : 60 M€ equity, 100 M€ dette (LTV = 62,5 %)
- Plan de valeur sur 5 ans :
  - EBITDA passe de 20 M€ à 30 M€ (croissance opérationnelle + acquisitions)
  - Dette remboursée de 100 M€ à 50 M€ (cash flow generation)
  - Multiple de sortie : 9x (légère expansion)

```
EV de sortie = 9 × 30 M€ = 270 M€
Dette résiduelle = 50 M€
Valeur equity à la sortie = 270 - 50 = 220 M€

MOIC = 220 / 60 = 3,67x
TRI = (3,67)^(1/5) - 1 = 29,7 %

Décomposition de la valeur créée :
  Délevier : 60 × (100-50)/100 = 30 M€ (27 % de la valeur créée)
  Croissance EBITDA : 8 × (30-20) × 60/160 = 30 M€ (27 %)
  Expansion multiple : (9-8) × 30 × 60/270 = 6,7 M€ (6 %)
  Effet de levier combiné : ~124 M€ de valeur totale pour 60 M€ investis
```

### Exemple 2 — Calcul de PME

Un fonds PE fait 3 appels de fonds (an 0: 50 M€, an 1: 30 M€, an 2: 20 M€) et 2 distributions (an 4: 60 M€, an 6: 120 M€). L'indice actions a évolué : base 100, an 0; 120 an 1; 110 an 2; 140 an 4; 170 an 6.

```
PME : indexer tous les flux sur l'indice au moment de la sortie (an 6, indice = 170)

Valeur future des appels (investissements dans l'indice) :
  An 0 : 50 × (170/100) = 85 M€
  An 1 : 30 × (170/120) = 42,5 M€
  An 2 : 20 × (170/110) = 30,9 M€
  Total "investi dans l'indice" = 158,4 M€

Valeur future des distributions (réinvesties dans l'indice) :
  An 4 : 60 × (170/140) = 72,9 M€
  An 6 : 120 × (170/170) = 120 M€
  Total "reçu via l'indice" = 192,9 M€

PME = 192,9 / 158,4 = 1,22

Interprétation : le fonds PE a surperformé l'indice de 22 % sur la durée du fonds.
```

---

## Applications professionnelles

### Programme de PE pour un fonds de pension

Un fonds de pension de 10 Md€ souhaite allouer 10 % au PE (1 Md€) :

**Problème du capital commitment vs capital investi** :
```
Les fonds PE appellent leur capital progressivement sur 3–5 ans.
Pour avoir 1 Md€ investi en permanence, il faut commiter ~1,5–2 Md€
  sur plusieurs millésimes (vintages) et plusieurs gérants.

Programme sur 5 ans :
  Vintage 2024 : commit 300 M€ → sera investi 2024–2027
  Vintage 2025 : commit 300 M€ → sera investi 2025–2028
  Vintage 2026 : commit 300 M€ → sera investi 2026–2029
  Vintage 2027 : commit 300 M€ → sera investi 2027–2030
  ...
  
Capital effectivement investi au pic (an 3–5) : ~800 M€–1 Md€
Distributions récurrentes à partir de l'an 5 réalimentent les nouveaux commits
```

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Comparer TRI et rendements actions** | Le TRI PE et le rendement annualisé d'un ETF ne sont pas comparables (timing des flux) | Utiliser le PME pour comparer |
| **Ignorer la J-curve** | Les 2–3 premières années, le TVPI < 1 : normal | Ne pas paniquer si TVPI < 1 en début de vie |
| **Sous-estimer la volatilité réelle** | Les valorisations trimestrielles lissent la volatilité | La vraie volatilité est comparable aux small caps cotées |
| **Négliger le Key Man Risk** | Si le fondateur part, la stratégie peut changer radicalement | Inclure une clause Key Man dans le LPA (Limited Partnership Agreement) |

---

## Exercices

### Exercice 1
Un fonds PE fait les flux suivants : An 0 : -100 M€, An 2 : -80 M€, An 4 : +120 M€, An 6 : +200 M€. Calculez le TVPI, le DPI (toutes distributions), le RVPI (=0, fonds liquidé) et approximez le TRI.

> **Correction** :
> Capital total appelé = 100 + 80 = **180 M€**
> Distributions totales = 120 + 200 = **320 M€**
> TVPI = DPI = 320 / 180 = **1,78x** (RVPI = 0 car fonds liquidé)
>
> Pour le TRI : -100 - 80/(1+r)² + 120/(1+r)⁴ + 200/(1+r)⁶ = 0
> Par itération : r ≈ **17,5 %** (test : -100 - 80/1,375 + 120/1,893 + 200/2,600 ≈ -100 - 58,2 + 63,4 + 76,9 ≈ -17,9 → r légèrement supérieur)
> Approximation correcte : TRI ≈ 17–18 %
