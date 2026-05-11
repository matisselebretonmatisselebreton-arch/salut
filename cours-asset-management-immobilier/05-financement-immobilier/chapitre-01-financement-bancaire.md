# Chapitre 1 — Financement bancaire : LTV, DSCR et covenants

> **Module 5 — Financement immobilier**
> Niveau : Master / Grande École de Finance
> Prérequis : valorisation par capitalisation, notions de cash-flow, bases de comptabilité

---

## Table des matières

1. [Structure d'un financement immobilier bancaire](#1-structure)
2. [LTV — Loan-to-Value](#2-ltv)
3. [ICR et DSCR — Ratios de couverture de la dette](#3-icr-dscr)
4. [Yield on debt — Pricing de la dette](#4-yield-on-debt)
5. [Covenants financiers](#5-covenants)
6. [Amortissement et structure de remboursement](#6-amortissement)
7. [Garanties bancaires](#7-garanties)
8. [Processus de financement](#8-processus)
9. [Refinancement](#9-refinancement)
10. [Exemples numériques complets](#10-exemples)
11. [Erreurs fréquentes](#11-erreurs)
12. [Exercices avec corrections](#12-exercices)

---

## 1. Structure d'un financement immobilier bancaire {#1-structure}

### 1.1 La pile de capital (capital stack)

Le financement d'un actif immobilier repose sur une **structure en tranches** qui répartit le risque entre différents apporteurs de capitaux. On distingue classiquement trois niveaux :

```
┌─────────────────────────────────────────────┐
│           FONDS PROPRES (Equity)            │  15-25% de la valeur
│   Rendement attendu : 12-20% IRR            │
├─────────────────────────────────────────────┤
│         DETTE JUNIOR / MEZZANINE            │  75-85% LTV (tranche 65-85%)
│   Rendement attendu : 8-12%                 │
├─────────────────────────────────────────────┤
│              DETTE SENIOR                   │  65-75% LTV
│   Taux : Euribor 3M + 150-250 bps           │
└─────────────────────────────────────────────┘
```

Cette hiérarchie obéit au principe fondamental de la **subordination** : en cas de défaut, la dette senior est remboursée en priorité, puis la dette junior, puis les fonds propres. Plus une tranche est subordonée, plus le risque est élevé et plus le rendement exigé est important.

### 1.2 Proportions typiques par stratégie

| Stratégie | LTV dette senior | Mezzanine | Fonds propres | LTV totale |
|-----------|-----------------|-----------|---------------|------------|
| Core      | 50-55%          | –         | 45-50%        | 50-55%     |
| Core+     | 55-65%          | –         | 35-45%        | 55-65%     |
| Value-Add | 60-70%          | 0-10%     | 20-30%        | 60-80%     |
| Opportuniste | 65-75%       | 5-15%     | 15-25%        | 70-85%     |

### 1.3 Rôle des différents acteurs

- **Banques commerciales** (BNP Paribas Real Estate, Société Générale, Crédit Agricole) : dette senior sur actifs stabilisés, critères stricts de DSCR
- **Assureurs et fonds de dette** (AXA IM, Blackstone Mortgage Trust, Tikehau) : dette mezzanine ou whole loan, tickets plus importants
- **Fonds propres** : gestionnaires d'actifs, family offices, institutionnels

---

## 2. LTV — Loan-to-Value {#2-ltv}

### 2.1 Définition et formule

Le **LTV (Loan-to-Value)** mesure le rapport entre l'encours de dette et la valeur de l'actif :

$$\text{LTV} = \frac{\text{Montant de la dette}}{\text{Valeur de l'actif}} \times 100$$

**Exemple de base :** Un actif valorisé 20 M€ financé par une dette de 13 M€ :

$$\text{LTV} = \frac{13\,000\,000}{20\,000\,000} = 65\%$$

### 2.2 LTV au moment de l'acquisition vs LTV courante

On distingue deux mesures :

- **LTV à l'origination** : calculée sur le prix d'achat ou la valeur d'expertise au moment de la mise en place du financement
- **LTV courante (current LTV)** : recalculée périodiquement (généralement tous les 12 mois) sur la base d'une nouvelle expertise. C'est cette LTV courante qui est testée par rapport aux covenants.

$$\text{LTV courante} = \frac{\text{Encours de dette à date}}{\text{Valeur expertise récente}}$$

### 2.3 Niveaux de LTV par type d'actif et stratégie

La banque calibre son LTV en fonction du risque perçu sur l'actif :

| Type d'actif | LTV max dette senior | Justification |
|-------------|---------------------|---------------|
| Bureaux prime Paris QCA | 65-70% | Liquidité élevée, demande locative forte |
| Logistique prime | 60-65% | Revenus stables, baux longs |
| Retail prime | 55-60% | Incertitude sur valorisation retail |
| Bureaux secondaires | 50-55% | Risque de vacance élevé |
| Résidentiel | 60-70% | Liquidité élevée mais revenus plafonnés |
| Hôtellerie | 50-55% | Revenus volatils (opérationnel) |
| Actifs alternatifs | 50-60% | Liquidité réduite, marché moins profond |

### 2.4 Impact du LTV sur le pricing

Plus le LTV est élevé, plus le risque pour la banque est important et plus le spread exigé sera élevé :

| LTV | Spread typique (bps) sur Euribor 3M |
|-----|-------------------------------------|
| < 50% | 100-130 bps |
| 50-60% | 130-160 bps |
| 60-65% | 160-200 bps |
| 65-70% | 200-250 bps |
| > 70% (mezzanine) | 350-600 bps |

### 2.5 LTV-to-Cost vs LTV-to-Value

Pour les projets de développement ou de repositionnement, on utilise également le **LTC (Loan-to-Cost)** :

$$\text{LTC} = \frac{\text{Montant de la dette}}{\text{Coût total du projet (acquisition + travaux + frais)}}$$

Le LTC est plus conservateur car le coût inclut la prime de risque développement, alors que la valeur à terme intègre déjà la marge du promoteur.

---

## 3. ICR et DSCR — Ratios de couverture de la dette {#3-icr-dscr}

### 3.1 ICR — Interest Coverage Ratio

L'**ICR (Interest Coverage Ratio)** mesure la capacité du NOI à couvrir les seuls intérêts :

$$\text{ICR} = \frac{\text{NOI}}{\text{Charges d'intérêts annuelles}}$$

**Seuil standard bancaire :** ICR > 2,0x

**Interprétation :** Un ICR de 2,0x signifie que le NOI est le double des intérêts à payer — la banque dispose d'un coussin de 100% avant que l'emprunteur ne soit en difficulté pour payer ses intérêts.

### 3.2 DSCR — Debt Service Coverage Ratio

Le **DSCR (Debt Service Coverage Ratio)** est plus complet : il tient compte non seulement des intérêts mais aussi de l'amortissement du principal :

$$\text{DSCR} = \frac{\text{NOI}}{\text{Service total de la dette (intérêts + amortissement principal)}}$$

**Seuil standard bancaire :** DSCR > 1,25x à 1,30x

**Relation ICR / DSCR :**
- Sur un prêt in fine (pas d'amortissement), ICR = DSCR
- Sur un prêt amortissable, DSCR < ICR car le dénominateur est plus grand

### 3.3 NOI utilisé dans les ratios

Le NOI (Net Operating Income) retenu par la banque est **généralement le NOI stabilisé, ajusté** :
- On neutralise les revenus exceptionnels
- On prend une vacance normative de marché (même si l'actif est à 100%)
- On intègre des coûts de gestion normatifs

```
Revenus locatifs bruts (loyers passagers)
- Vacance normative (5-10% selon actif)
= Revenus locatifs nets
- Charges non récupérables (assurances, taxe foncière, gros entretien)
- Frais de gestion (3-5% des loyers)
= NOI bancaire
```

### 3.4 Sensibilité des ratios

| Scénario | NOI | Intérêts | ICR | DSCR (avec 2% amort.) |
|----------|-----|----------|-----|----------------------|
| Base | 1 000 K€ | 500 K€ | 2,0x | 1,54x |
| Stress -20% NOI | 800 K€ | 500 K€ | 1,6x | 1,23x |
| Stress +50 bps taux | 1 000 K€ | 562 K€ | 1,78x | 1,39x |
| Stress combiné | 800 K€ | 562 K€ | 1,42x | 1,11x |

---

## 4. Yield on debt — Pricing de la dette {#4-yield-on-debt}

### 4.1 Structure du taux d'intérêt

Le taux appliqué par la banque se décompose comme suit :

$$\text{Taux tout-in} = \text{Taux de référence} + \text{Spread de crédit} + \text{Marge banque}$$

En pratique sur les financements à taux variable :

$$\text{Taux tout-in} = \text{Euribor 3M} + \text{Spread (bps)}$$

**Niveau en 2024 :**
- Euribor 3M : ~3,8-4,0% (post-hausse BCE, début de baisse)
- Spread dette senior bureaux prime : 150-200 bps
- Spread dette senior logistique : 130-180 bps
- Taux tout-in approximatif : 5,5-6,0%

### 4.2 Taux fixe vs taux variable

| Paramètre | Taux variable | Taux fixe |
|-----------|--------------|-----------|
| Référence | Euribor 3M ou 1M | Swap IRS + spread |
| Risque de taux | Pour l'emprunteur | Pour la banque |
| Couverture obligatoire ? | Souvent oui (cap/swap) | Non |
| Niveau 2024 | ~5,5-6,0% | ~4,5-5,5% (swap +200 bps) |

### 4.3 Coût de couverture (hedging)

Lorsque la dette est à taux variable, la banque impose souvent une couverture :
- **Cap de taux** : limite la hausse du taux variable (prime payée upfront)
- **Swap de taux** : échange le taux variable contre un taux fixe (coût nul à la mise en place, mais risque de mark-to-market)

### 4.4 Yield on Cost et Yield on Debt (approche investisseur)

Du point de vue de l'asset manager, on compare :

$$\text{Yield on Cost} = \frac{\text{NOI}}{\text{Coût total de l'investissement}}$$

$$\text{Yield on Debt} = \frac{\text{NOI}}{\text{Encours de dette}} \quad \text{(parfois appelé Debt Yield)}$$

**Règle d'or :** Le Debt Yield doit être supérieur au taux d'intérêt, sinon le levier est destructeur de valeur.

$$\text{Si Debt Yield} > \text{Taux d'intérêt} \Rightarrow \text{Effet de levier positif}$$
$$\text{Si Debt Yield} < \text{Taux d'intérêt} \Rightarrow \text{Effet de levier négatif}$$

---

## 5. Covenants financiers {#5-covenants}

### 5.1 Définition et rôle

Les **covenants** sont des engagements contractuels pris par l'emprunteur dans le contrat de crédit. Ils permettent à la banque de détecter tôt une dégradation de la situation et d'intervenir avant une perte totale.

On distingue :
- **Covenants financiers** : ratios à respecter, testés périodiquement
- **Covenants non-financiers** : interdiction de vendre l'actif, d'accorder des sûretés supplémentaires, de modifier les baux sans accord

### 5.2 Les trois covenants financiers majeurs

**Covenant LTV :**

$$\text{LTV covenant} : \text{LTV courante} \leq 65-70\%$$

Testé tous les 12 mois (parfois 6 mois). Nécessite une expertise indépendante.

**Covenant ICR :**

$$\text{ICR covenant} : \text{ICR} \geq 1,8x \text{ à } 2,0x$$

Testé trimestriellement ou semestriellement.

**Covenant DSCR :**

$$\text{DSCR covenant} : \text{DSCR} \geq 1,25x$$

Testé semestriellement ou annuellement.

### 5.3 Conséquences d'un breach de covenant

Lorsqu'un covenant est breached (violé), plusieurs mécanismes peuvent se déclencher :

**Niveau 1 — Cash Trap (piège à cash) :**
- Les cash-flows de l'actif ne peuvent plus être distribués aux actionnaires
- Ils s'accumulent sur un compte de réserve contrôlé par la banque
- Objectif : reconstituer l'equity ou rembourser la dette

**Niveau 2 — Cure period (période de remède) :**
- L'emprunteur dispose d'un délai (généralement 30-60 jours) pour remédier au breach
- Solutions : injection de fonds propres additionnels (equity cure), remboursement partiel de la dette pour retrouver le LTV cible, amélioration du NOI (difficile à court terme)

**Niveau 3 — Remboursement accéléré (acceleration) :**
- Si le breach persiste, la banque peut exiger le remboursement immédiat de l'intégralité de la dette
- Déclenche potentiellement une vente forcée de l'actif

**Niveau 4 — Enforcement (saisie) :**
- Mise en œuvre des garanties (hypothèque, nantissement de parts)
- Vente judiciaire de l'actif en dernier recours

### 5.4 Tableau de synthèse des covenants

| Covenant | Niveau typique | Fréquence de test | Conséquence du breach |
|----------|---------------|------------------|----------------------|
| LTV | ≤ 65-70% | Annuelle (expertise) | Cash trap puis amortissement accéléré |
| ICR | ≥ 1,8-2,0x | Trimestrielle | Cash trap |
| DSCR | ≥ 1,25-1,30x | Semestrielle | Cash trap, cure period |
| LTC | ≤ 75% | À l'origination | Fin de tirage |

---

## 6. Amortissement et structure de remboursement {#6-amortissement}

### 6.1 Prêt in fine (bullet)

Structure la plus courante pour les actifs immobiliers commerciaux :
- Pendant toute la durée du prêt : paiement des **intérêts seulement**
- À l'échéance : remboursement du **capital en totalité**

**Avantage :** Maximise le cash-flow disponible pour l'investisseur pendant la période de détention.

**Risque :** Nécessite de refinancer ou de vendre l'actif à l'échéance (risque de refinancement).

```
Année 0 : Tirage 13 000 000€
Années 1-5 : Paiement intérêts = 13 000 000 × 5,9% = 767 000€/an
Année 5 : Remboursement 13 000 000€ + intérêts de la dernière période
```

### 6.2 Différé d'amortissement (interest-only period)

Structure mixte fréquente sur les actifs en repositionnement :
- **Phase 1 (1-3 ans)** : intérêts seulement — permet de préserver la trésorerie pendant les travaux
- **Phase 2 (années suivantes)** : amortissement progressif

### 6.3 Amortissement progressif (annuités constantes)

$$\text{Annuité} = \text{Capital} \times \frac{i}{1-(1+i)^{-n}}$$

Avec :
- $i$ = taux d'intérêt périodique
- $n$ = nombre de périodes

### 6.4 Durées de financement typiques

| Type d'actif | Durée typique | Structure |
|-------------|--------------|-----------|
| Bureaux/logistique prime | 5-7 ans | In fine ou différé 2 ans + amort. |
| Résidentiel | 15-25 ans | Amortissable |
| Promotion/réhabilitation | 2-3 ans | In fine (bridge) |
| Infrastructure | 20-30 ans | Amortissable |

---

## 7. Garanties bancaires {#7-garanties}

### 7.1 Hypothèque conventionnelle

La garantie la plus classique : la banque prend une **hypothèque de premier rang** sur l'immeuble.

- Permet à la banque de saisir et vendre l'immeuble en cas de défaut
- Inscrite au bureau des hypothèques (publicité foncière)
- Coût : ~1,5-2% du montant garanti (droits d'enregistrement, frais de notaire)
- Mainlevée à l'extinction de la dette (frais supplémentaires)

### 7.2 Nantissement de parts sociales

Structure souvent préférée aujourd'hui pour les actifs détenus via SCI ou SPV :
- La banque prend un **nantissement sur les parts** de la société qui détient l'immeuble
- En cas de défaut, la banque peut acquérir les parts et donc le contrôle de la société
- Avantage fiscal : évite la mainlevée hypothécaire lors de cessions ultérieures
- Procédure plus rapide qu'une saisie immobilière classique

### 7.3 DAILLY (cession de créances professionnelles)

La **cession Dailly** permet à l'emprunteur de céder à la banque ses créances locatives futures (loyers) en garantie :
- Utilisée en complément des autres garanties
- Permet à la banque d'encaisser directement les loyers en cas de défaut
- Formalisme allégé par rapport à l'hypothèque

### 7.4 Caution personnelle

- Engagement personnel du dirigeant/actionnaire de couvrir le défaut de la société emprunteuse
- De plus en plus rare pour les grands investisseurs institutionnels
- Fréquente pour les PME et les entrepreneurs individuels

### 7.5 Garanties complémentaires

- **Compte bloqué (debt service reserve)** : réserve de 3-6 mois de service de la dette
- **Assurance-vie** : rare, surtout pour les personnes physiques
- **Garantie à première demande** (GAD) : émise par une banque garante

---

## 8. Processus de financement {#8-processus}

### 8.1 Phases du processus

```
Phase 1 : Préparation du dossier (2-4 semaines)
    └── Business plan, expertises, baux, documents juridiques
    
Phase 2 : Sollicitation bancaire (1-2 semaines)
    └── Envoi du mémorandum de financement, premiers échanges
    
Phase 3 : Term sheet (2-4 semaines)
    └── Proposition indicative non contraignante, négociation des termes
    
Phase 4 : Comité de crédit (2-4 semaines)
    └── Analyse approfondie, questions/réponses, validation interne banque
    
Phase 5 : Documentation juridique (4-8 semaines)
    └── Rédaction contrat de crédit, sûretés, négociation avocats
    
Phase 6 : Conditions préalables (1-2 semaines)
    └── Levée des CP, signatures, tirage des fonds
```

**Durée totale typique : 3-5 mois**

### 8.2 Le term sheet

Document non contraignant qui formalise les principaux termes :
- Montant, LTV, maturité
- Taux d'intérêt (base + spread)
- Amortissement
- Covenants (LTV, DSCR, ICR)
- Garanties requises
- Frais d'arrangement (0,5-1% du montant)
- Conditions préalables (CP)

### 8.3 Le comité de crédit

Étape clé où la banque analyse en profondeur :
- Qualité de l'actif et de son emplacement
- Solidité des flux locatifs (WAULT, qualité des locataires)
- Expertise indépendante
- Track record du sponsor (historique de l'emprunteur)
- Analyse de stress tests (baisse de valeur, hausse de vacance)
- Stratégie de sortie

### 8.4 Conditions préalables (CP) typiques

- Expertise immobilière récente (< 3 mois)
- Rapport environnemental (Phase 1/Phase 2)
- Attestation d'assurance
- Copies des baux en vigueur
- Justificatifs KYC (connaissance du client)
- Levée de toute sûreté préexistante

---

## 9. Refinancement {#9-refinancement}

### 9.1 Motivations au refinancement

**Refinancement à l'échéance :** Obligatoire pour tout prêt in fine arrivant à maturité.

**Refinancement opportuniste :**
- Baisse des taux d'intérêt depuis l'origination
- Amélioration du LTV (hausse de valeur) → meilleur spread
- Besoin de liquidité (cash-out refinancing) : extraire des fonds propres latents

**Cash-out refinancing :**
$$\text{Cash-out} = \text{Nouvelle dette} - \text{Ancienne dette remboursée}$$

Exemple : Actif acquis 10 M€ avec 6,5 M€ de dette (LTV 65%). Après 3 ans, valeur = 13 M€. Nouvelle dette à 65% = 8,45 M€. Cash-out = 8,45 - 6,5 = **1,95 M€** pouvant être distribué aux investisseurs sans vendre l'actif.

### 9.2 Risque de refinancement

Le risque de refinancement est la possibilité de **ne pas pouvoir refinancer dans des conditions acceptables** à l'échéance :

**Facteurs aggravants :**
- Hausse des taux d'intérêt : le nouveau taux est plus élevé, réduisant le DSCR
- Baisse de la valeur de l'actif : le LTV dépasse les seuils acceptables
- Dégradation du marché locatif : NOI plus faible
- Resserrement des conditions bancaires (credit crunch)

**Illustration de la crise 2022-2023 :**
- Euribor passe de -0,5% à +4% → coût de la dette ×5
- Valeurs immobilières baissent 10-20% → LTV se dégrade
- Nombreux actifs Value-Add en difficulté de refinancement

### 9.3 Stratégies de mitigation du risque de refinancement

- Refinancer avant l'échéance (12-18 mois en avance)
- Maturités longues (7-10 ans) pour ne pas subir un mauvais point de cycle
- Taux fixe ou couverture cap/swap pour protéger le DSCR
- Réserves de liquidité (DSRA : Debt Service Reserve Account)

---

## 10. Exemples numériques complets {#10-exemples}

### Exemple 1 — Structure de financement et calcul ICR

**Contexte :** Un asset manager acquiert un immeuble de bureaux en Île-de-France pour **20 M€**.

**Structure de financement :**

```
Prix d'acquisition          20 000 000 €
Frais d'acquisition (7%)     1 400 000 €
Coût total                  21 400 000 €

Dette senior (LTV 65% sur prix)  13 000 000 €
Fonds propres                     8 400 000 €
```

**Conditions du prêt :**
- Euribor 3M au closing : 3,9%
- Spread : 200 bps
- Taux tout-in : **5,9%**
- Structure : in fine, 5 ans

**Calcul des intérêts annuels :**

$$\text{Intérêts} = 13\,000\,000 \times 5{,}9\% = 767\,000\ \text{€/an}$$

**Données locatives :**
- Surface : 2 500 m²
- Loyer : 400 €/m²/an
- Taux d'occupation : 95%
- Charges non récupérables : 50 000 €/an
- Frais de gestion : 3% des loyers encaissés

**Calcul du NOI :**

```
Loyers bruts :   2 500 × 400 = 1 000 000 €
Vacance 5% :        - 50 000 €
Loyers encaissés :  950 000 €
Charges non rép. :  - 50 000 €
Frais gestion 3% :  - 28 500 €
NOI :               871 500 €
```

**Calcul ICR :**

$$\text{ICR} = \frac{871\,500}{767\,000} = \mathbf{1{,}14x}$$

**Analyse :** L'ICR de 1,14x est **bien inférieur au seuil bancaire de 2,0x**. Ce financement ne serait pas accordé. Deux solutions :
1. Réduire la dette à un LTV de ~40% (dette 8 M€, intérêts 472 K€, ICR = 1,85x — encore insuffisant)
2. L'actif doit avoir un NOI plus élevé ou des loyers futurs plus importants

**Recalcul avec NOI de 1 534 000 € (loyer 650 €/m², pleine occupation) :**

$$\text{ICR} = \frac{1\,534\,000}{767\,000} = \mathbf{2{,}0x} \checkmark$$

---

### Exemple 2 — Breach de covenant LTV

**Contexte :** Un actif acquis **20 M€** avec dette senior de **13 M€** (LTV 65%).

**Covenant LTV contractuel : maximum 70%**

**Scenario 1 — Après 2 ans, valeur baisse à 16 M€ (marché difficile) :**

$$\text{LTV courante} = \frac{13\,000\,000}{16\,000\,000} = 81{,}25\%$$

**Breach : LTV 81,25% >> covenant de 70%**

**Analyse des conséquences :**

1. **Cash trap immédiate** : les 871 K€ de NOI annuels ne peuvent plus être distribués aux actionnaires
2. **Notification au comité de crédit de la banque** dans les 5 jours ouvrés
3. **Cure period de 60 jours** pour remédier

**Options de remédiation :**

```
Option A — Equity cure :
  Besoin = Dette - (LTV max × Valeur actuelle)
  Besoin = 13 000 000 - (70% × 16 000 000)
  Besoin = 13 000 000 - 11 200 000 = 1 800 000 € de remboursement anticipé

Option B — Attendre la revalorisation :
  Si valeur remonte à 18,6 M€, LTV = 13/18,6 = 69,9% (juste sous covenant)
  Horizon incertain, cash trap maintenue entre-temps

Option C — Refinancement :
  Refinancer avec un autre prêteur acceptant un LTV de 81% (peu probable)
  ou avec une nouvelle dette à 13 M€ sur valeur 16 M€ = LTV trop élevé
```

**Si breach non résolu après 60 jours :**
- La banque peut exiger un remboursement accéléré de la totalité de la dette (13 M€)
- Si l'emprunteur ne peut pas payer, saisie hypothécaire ou vente forcée de l'actif
- L'investisseur perd potentiellement ses 8,4 M€ de fonds propres si la vente forcée ne suffit pas à rembourser la dette intégralement

---

### Exemple 3 — Effet de levier : impact de la LTV sur l'IRR equity

**Contexte :** Un actif avec NOI de **1 M€/an**, prix d'achat calculé à un taux de cap de 5% (valeur 20 M€), horizon d'investissement 5 ans.

**Hypothèses de sortie :**
- Taux de cap de sortie : 5% (même que l'entrée)
- NOI en année 5 : 1 M€ (stable, pas de croissance)
- Prix de sortie : 1 000 000 / 5% = **20 M€** (pas de plus-value)
- Taux de la dette : 5,9% in fine

**Scénario A — LTV 60%**

```
Dette senior :  20 000 000 × 60% = 12 000 000 €
Equity :        20 000 000 × 40% =  8 000 000 €
Intérêts/an :   12 000 000 × 5,9% = 708 000 €

Cash-flow equity/an :
  NOI              1 000 000 €
  - Intérêts         708 000 €
  = Cash-flow equity   292 000 €

À la sortie (année 5) :
  Prix de vente      20 000 000 €
  - Remboursement dette 12 000 000 €
  = Produit equity     8 000 000 €

IRR equity :
  Investissement initial :  -8 000 000 €
  Cash-flows annuels :      +292 000 € × 5 ans
  Récupération : +8 000 000 € en année 5

  IRR ≈ 3,65% (très faible car pas de plus-value + levier faible)
```

**Scénario B — LTV 65%**

```
Dette senior :  20 000 000 × 65% = 13 000 000 €
Equity :        20 000 000 × 35% =  7 000 000 €
Intérêts/an :   13 000 000 × 5,9% = 767 000 €

Cash-flow equity/an :
  NOI              1 000 000 €
  - Intérêts         767 000 €
  = Cash-flow equity   233 000 €

À la sortie :
  Produit equity = 20 000 000 - 13 000 000 = 7 000 000 €

  IRR ≈ 3,33%
```

**Conclusion partielle :** Sans croissance de valeur, le levier ne crée pas de valeur si le taux de cap (5%) est inférieur au coût de la dette (5,9%).

**Scénario C — LTV 65% avec croissance NOI → cap rate de sortie 4,75%**

```
NOI année 5 :  1 200 000 € (croissance 3,7%/an composée)
Prix de sortie : 1 200 000 / 4,75% = 25 263 158 €

Produit equity : 25 263 158 - 13 000 000 = 12 263 158 €

Cash-flows equity :
  Années 1-5 : +233 000 €/an
  Année 5 : +12 263 158 €

IRR equity ≈ 13,2%
```

**Scénario D — LTV 60% avec même hypothèse favorable**

```
Produit equity : 25 263 158 - 12 000 000 = 13 263 158 €
Cash-flows equity :
  Années 1-5 : +292 000 €/an
  Année 5 : +13 263 158 €

IRR equity ≈ 10,5%
```

**Tableau comparatif :**

| Scénario | LTV | IRR equity | Multiple (EM) | Commentaire |
|----------|-----|-----------|---------------|-------------|
| A — Sans plus-value, 60% | 60% | 3,65% | 1,18× | Levier pénalisant |
| B — Sans plus-value, 65% | 65% | 3,33% | 1,17× | Idem |
| C — Avec plus-value, 65% | 65% | **13,2%** | **1,95×** | Levier amplifiant |
| D — Avec plus-value, 60% | 60% | 10,5% | 1,89× | Moins amplifié |

**Leçon fondamentale :** L'effet de levier est **positif si et seulement si le rendement de l'actif dépasse le coût de la dette**. Dans ce cas (cap rate sortie 4,75% >> coût dette 5,9%), la croissance du NOI et la compression du cap rate créent la valeur, et le levier l'amplifie.

---

## 11. Erreurs fréquentes {#11-erreurs}

### Erreur 1 — Confondre LTV et LTC

Le **LTV** est calculé sur la valeur de marché de l'actif, le **LTC** sur le coût total du projet. Pour un projet de développement, le LTC est plus conservateur car il ne prend pas en compte la marge promoteur.

Un actif coûtant 10 M€ à construire et valant 13 M€ à terme :
- Financer à 65% LTC = 6,5 M€
- Financer à 65% LTV = 8,45 M€ → surfinancement potentiel

### Erreur 2 — Utiliser le NOI réel (non stabilisé) pour les ratios

Les banques utilisent un **NOI normalisé/stabilisé**, pas le NOI actuel. Un actif à 100% de taux d'occupation ne sera pas évalué à 100% : la banque appliquera une vacance normative de 5-10% même si l'actif est plein.

**Erreur :** NOI actuel = 1 200 K€ → ICR = 1 200/600 = 2,0x ✓
**Réalité bancaire :** NOI normatif = 1 080 K€ (10% vacance) → ICR = 1 080/600 = 1,8x → peut ne pas suffire

### Erreur 3 — Ignorer le risque de refinancement sur les structures in fine

Tout investissement avec prêt in fine comporte un risque de refinancement significatif. Ne pas avoir de stratégie de sortie ou de refinancement à 12-18 mois de l'échéance est une erreur grave.

### Erreur 4 — Négliger les covenants dans les projections

Un modèle financier qui ne projette pas les covenants (LTV, DSCR) en parallèle des cash-flows est incomplet. Si le LTV breach en année 3, le cash trap peut affecter les distributions projetées.

### Erreur 5 — Confondre ICR et DSCR

- ICR = NOI / Intérêts seulement
- DSCR = NOI / (Intérêts + Amortissement)

Sur un prêt amortissable à 2% par an, la différence est significative. Vérifier toujours quelle définition est utilisée dans le contrat de crédit.

### Erreur 6 — Sous-estimer les frais de financement

Les frais d'arrangement (0,5-1%), frais d'hypothèque (~1,5-2%), frais de notaire et frais juridiques peuvent représenter 2-3% du montant du prêt. Ces coûts réduisent l'IRR equity et doivent être intégrés dans le modèle.

---

## 12. Exercices avec corrections {#12-exercices}

### Exercice 1 — Calcul de la structure de financement

**Énoncé :**
Un immeuble logistique est acquis pour **15 M€**. La banque accepte un LTV de 62% sur la valeur. Les conditions du prêt : Euribor 3M 3,7% + 170 bps, in fine 6 ans. Le NOI stabilisé est de **900 000 €/an**. Calculez :
1. Le montant de la dette et des fonds propres
2. Le taux tout-in et les intérêts annuels
3. L'ICR et le DSCR (sans amortissement)
4. Le cash-flow disponible pour l'equity chaque année

**Correction :**

```
1. Structure de financement :
   Dette = 15 000 000 × 62% = 9 300 000 €
   Fonds propres = 15 000 000 - 9 300 000 = 5 700 000 €

2. Taux et intérêts :
   Taux tout-in = 3,7% + 1,7% = 5,4%
   Intérêts annuels = 9 300 000 × 5,4% = 502 200 €

3. ICR (et DSCR puisque in fine) :
   ICR = NOI / Intérêts = 900 000 / 502 200 = 1,79x
   ⚠ ICR < 2,0x : en dessous du seuil standard
   DSCR = ICR = 1,79x (in fine, pas d'amortissement)
   DSCR > 1,25x ✓ : covenant DSCR respecté

4. Cash-flow equity :
   CF equity = NOI - Intérêts = 900 000 - 502 200 = 397 800 €/an
   Cash yield equity = 397 800 / 5 700 000 = 6,98%/an
```

---

### Exercice 2 — Analyse d'un covenant breach

**Énoncé :**
Un immeuble de bureaux acquis **25 M€** avec dette **15 M€** (LTV 60%). Covenant LTV : 65% maximum. Après 18 mois, une expertise conclut à une valeur de **20 M€**.

1. Calculez la LTV courante
2. Y a-t-il un breach ?
3. Quel montant de remboursement partiel permet de retrouver le covenant ?
4. Si l'emprunteur n'a pas la liquidité pour rembourser, quelles conséquences ?

**Correction :**

```
1. LTV courante :
   LTV = 15 000 000 / 20 000 000 = 75%

2. Breach ?
   Covenant = 65% max
   LTV courante = 75% > 65% → OUI, breach confirmé

3. Remboursement nécessaire :
   Dette max autorisée = 20 000 000 × 65% = 13 000 000 €
   Remboursement requis = 15 000 000 - 13 000 000 = 2 000 000 €

4. Conséquences si absence de liquidité :
   - Activation du cash trap : les 800 000 € de NOI/an sont bloqués
   - Cure period 60 jours : l'emprunteur tente de trouver des co-investisseurs
   - Si non résolu : remboursement accéléré des 15 M€
   - Risque de saisie hypothécaire et vente forcée
   - L'investisseur risque de perdre ses 10 M€ de fonds propres si la vente
     ne génère que ~18-19 M€ (vente forcée décotée)
```

---

### Exercice 3 — Impact du levier sur l'IRR

**Énoncé :**
Un asset manager évalue l'acquisition d'un actif de commerce de pied d'immeuble pour **8 M€**, avec un NOI actuel de **400 000 €/an** (cap rate 5%). Il prévoit une croissance du NOI de 2%/an et un cap rate de sortie de 4,8% en année 7. Taux de la dette : 5,6% in fine. Comparez les IRR equity pour les LTV 0%, 50%, 65%.

**Correction :**

```
NOI croissance annuelle : 400 000 × (1,02)^7 = 459 497 € en année 7
Prix de sortie : 459 497 / 4,8% = 9 572 854 €

Scénario 0% LTV (all-equity) :
  Investissement : -8 000 000 €
  CF années 1-7 : 400 000 → 432 ... (croissance 2%)
  Récupération : +9 572 854 €
  CF annuels approximatifs : ~416 000 €/an (moyenne)
  IRR ≈ 7,1%

Scénario 50% LTV :
  Dette = 4 000 000 €, Equity = 4 000 000 €
  Intérêts = 4 000 000 × 5,6% = 224 000 €/an
  CF equity an 1 = 400 000 - 224 000 = 176 000 €
  CF equity moyen ≈ 195 000 €/an
  Récupération = 9 572 854 - 4 000 000 = 5 572 854 €
  IRR equity ≈ 9,8%

Scénario 65% LTV :
  Dette = 5 200 000 €, Equity = 2 800 000 €
  Intérêts = 5 200 000 × 5,6% = 291 200 €/an
  CF equity an 1 = 400 000 - 291 200 = 108 800 €
  CF equity moyen ≈ 120 000 €/an
  Récupération = 9 572 854 - 5 200 000 = 4 372 854 €
  IRR equity ≈ 12,3%

Synthèse :
  | LTV  | Equity investi | IRR   | Multiple |
  |------|---------------|-------|---------|
  | 0%   | 8 000 000 €   | 7,1%  | 1,60×   |
  | 50%  | 4 000 000 €   | 9,8%  | 1,83×   |
  | 65%  | 2 800 000 €   | 12,3% | 2,18×   |

Conclusion : le levier amplifie l'IRR car le cap rate moyen (~5,2%)
dépasse le coût de la dette (5,6%) dans l'ensemble grâce à la
compression de cap rate à la sortie. L'amplification est non linéaire.
```

---

*Fin du Chapitre 1 — Module 5*

> **Points clés à retenir :**
> 1. Le LTV mesure le risque pour la banque ; le DSCR mesure la capacité de remboursement
> 2. Les covenants créent des mécanismes de protection automatiques (cash trap, acceleration)
> 3. Le levier amplifie l'IRR si et seulement si le rendement de l'actif > coût de la dette
> 4. Le risque de refinancement est structurel dans les prêts in fine — il doit être géré proactivement
