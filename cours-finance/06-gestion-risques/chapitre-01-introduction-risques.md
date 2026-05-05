# Chapitre 1 — Identification et classification des risques financiers

## Introduction

La gestion des risques est au cœur de l'activité bancaire et financière. Le **risk management** consiste à identifier, mesurer, surveiller et contrôler les risques pour éviter les pertes catastrophiques et respecter les exigences réglementaires.

---

## 1. Taxonomie des risques financiers

### 1.1 Risque de marché

Risque de perte lié à des variations défavorables des **variables de marché** :

| Facteur | Exemples |
|---------|---------|
| **Risque de taux** | Hausse des taux d'intérêt → baisse du portefeuille obligataire |
| **Risque actions** | Chute des marchés actions → perte sur portefeuille equity |
| **Risque de change** | Dépréciation d'une devise → perte sur positions FX |
| **Risque de matières premières** | Volatilité du pétrole, métaux, etc. |
| **Risque de volatilité** | Variation de la volatilité implicite (vega) |

### 1.2 Risque de crédit

Risque de perte lié au **défaut d'une contrepartie** (incapacité à honorer ses obligations) :

- **Risque de défaut** : la contrepartie ne rembourse pas.
- **Risque de dégradation** (downgrade risk) : détérioration de la qualité de crédit.
- **Risque de contrepartie** (CCR) : risque sur les instruments dérivés OTC.
- **Risque de concentration** : exposition excessive à un secteur ou un débiteur.

### 1.3 Risque de liquidité

- **Risque de liquidité de marché** : impossibilité de liquider une position sans impact majeur sur le prix.
- **Risque de liquidité de financement** : incapacité à lever des fonds à court terme (run bancaire).

### 1.4 Risque opérationnel

Risque de pertes liées à des **défaillances humaines, des processus, des systèmes ou des événements externes** :

- Fraudes internes / externes
- Erreurs de traitement (back-office)
- Pannes informatiques
- Catastrophes naturelles
- Risques juridiques

### 1.5 Autres risques

| Risque | Description |
|--------|-------------|
| **Risque systémique** | Contagion financière (effet domino) |
| **Risque de modèle** | Erreurs dans les modèles de pricing/VaR |
| **Risque de réputation** | Scandales, controverses |
| **Risque de taux de concentration** | Exposition à un seul débiteur / secteur |

---

## 2. Le processus de gestion des risques

```
1. Identification → Cartographie des risques
         ↓
2. Mesure → VaR, ratings, scénarios de stress
         ↓
3. Surveillance → Systèmes de limites, reporting
         ↓
4. Contrôle / Atténuation → Couvertures, diversification, provisions
         ↓
5. Reporting → Direction, régulateurs, investisseurs
```

---

## 3. Gouvernance des risques

### 3.1 Les trois lignes de défense (Three Lines of Defense)

| Ligne | Acteurs | Rôle |
|-------|---------|------|
| **1ère ligne** | Métiers, traders, commerciaux | Propriétaires du risque, gestion au quotidien |
| **2ème ligne** | Risk management, conformité | Supervision, définition des politiques de risque |
| **3ème ligne** | Audit interne | Évaluation indépendante de l'ensemble du dispositif |

### 3.2 Rôle du Chief Risk Officer (CRO)

Le **CRO** est le responsable de la gestion des risques à l'échelle du groupe :
- Définit l'**appétit pour le risque** (risk appetite).
- Supervise les comités de risque.
- Reporte au Conseil d'Administration.

### 3.3 Comités de risque

- **ALCO** (Asset-Liability Committee) : gestion du risque de taux et de liquidité du bilan bancaire.
- **Credit Committee** : décisions de crédit sur les expositions significatives.
- **Market Risk Committee** : validation des limites et modèles de risque de marché.

---

## 4. Le cadre réglementaire de Bâle III

### 4.1 Évolution historique

| Accord | Date | Focus |
|--------|------|-------|
| Bâle I | 1988 | Exigences minimales de fonds propres (8 %) |
| Bâle II | 2004 | Pilier 1 (quantitatif), Pilier 2 (surveillance), Pilier 3 (transparence) |
| Bâle III | 2010–2023 | Renforcement fonds propres, liquidité (LCR, NSFR), levier |

### 4.2 Structure de Bâle III

**Pilier 1 — Exigences minimales de fonds propres** :

```
Ratio de solvabilité = Fonds propres / Actifs pondérés par les risques (RWA) ≥ 8 %

dont : CET1 (Common Equity Tier 1) ≥ 4,5 %
       Tier 1 ≥ 6 %
       Total capital ≥ 8 %
       + Coussins de conservation (2,5 %)
       + Coussins contracycliques (0–2,5 %)
```

**Ratio de levier** :

```
Ratio de levier = Tier 1 / Exposition totale ≥ 3 %
```

**Ratios de liquidité** :

```
LCR (Liquidity Coverage Ratio) : Actifs liquides / Sorties nettes 30 jours ≥ 100 %
NSFR (Net Stable Funding Ratio) : Financement stable disponible / Financement stable requis ≥ 100 %
```

---

## 5. Exercices

### Exercice 1
Classifiez les risques suivants : (a) chute des taux d'intérêt sur un portefeuille d'obligations, (b) défaut d'un émetteur corporate, (c) erreur informatique causant un double paiement, (d) impossibilité de vendre un actif illiquide rapidement.

> **Correction** :
> (a) **Risque de marché** (taux d'intérêt) — impact sur la valeur du portefeuille.
> (b) **Risque de crédit** (défaut) — non-remboursement d'une obligation.
> (c) **Risque opérationnel** — défaillance d'un système informatique.
> (d) **Risque de liquidité de marché** — impossibilité de céder l'actif.

### Exercice 2
Une banque a un ratio CET1 de 11 % et un coussin de conservation de 2,5 %. Quel est son ratio CET1 au-dessus des exigences minimales ? Peut-elle distribuer des dividendes librement ?

> **Correction** :
> Exigence minimale CET1 = 4,5 % + 2,5 % = 7 %
> Ratio au-dessus de l'exigence = 11 % - 7 % = **4 %** de coussin disponible.
> La distribution de dividendes est libre si le ratio reste au-dessus du minimum (7 %). ✓

---

## Points clés à retenir

- Les risques financiers se décomposent en : marché, crédit, liquidité, opérationnel et autres.
- Le processus de gestion des risques : identifier → mesurer → surveiller → contrôler → reporter.
- Les trois lignes de défense garantissent l'indépendance du contrôle.
- Bâle III impose des exigences de fonds propres (CET1), de levier et de liquidité (LCR, NSFR).

---

## Approfondissement théorique

### La théorie des risques extrêmes et la distribution des pertes

La majorité des modèles de risque supposent des distributions normales. En réalité, les pertes financières présentent des **queues épaisses** (fat tails) : les événements extrêmes sont beaucoup plus fréquents que la loi normale ne le prédit.

**Théorie des valeurs extrêmes (Extreme Value Theory — EVT)** :
La distribution de Pareto généralisée (GPD) modélise les queues de distribution :

```
P(X > x | X > u) ≈ (1 + ξ(x-u)/β)^(-1/ξ)
```

- `ξ` : paramètre de forme (tail index)
- `u` : seuil (valeur au-delà duquel la GPD s'applique)
- `β` : paramètre d'échelle

Pour les marchés financiers, ξ ≈ 0,3–0,5 → queues épaisses (Pareto).

### Le risque systémique et les cascades de défauts

La crise de 2008 a illustré le **risque systémique** : la faillite de Lehman Brothers (15 septembre 2008) a déclenché une cascade de défauts via les expositions croisées.

**Mécanismes de contagion** :
1. **Effet direct** : créances sur l'entité en défaut.
2. **Liquidité** : ruée sur la trésorerie (bank run).
3. **Sentiment** : perte de confiance généralisée → gel des marchés interbancaires.
4. **Fire sales** : liquidation forcée d'actifs → baisse des prix → pertes latentes pour d'autres entités.

**Mesures du risque systémique** :
- **CoVaR (Adrian & Brunnermeier, 2011)** : VaR du système financier conditionnelle à la détresse d'une institution.
- **SRISK** : capital manquant d'une institution en cas de crise systémique.
- **Expected Shortfall systémique** : perte espérée du système au-delà d'un seuil.

### Bâle IV et évolutions réglementaires

**Bâle IV (finalisation de Bâle III, 2023–2025)** apporte des changements majeurs :

1. **Output floor** : exigence minimale pour les banques utilisant des modèles internes (IRBA, modèles internes de marché) = 72,5 % de l'exigence en approche standard.
2. **FRTB (Fundamental Review of the Trading Book)** : révision complète du cadre pour le risque de marché, migration vers l'Expected Shortfall.
3. **CVA simplifié** : nouveau cadre pour le risque de valorisation des dérivés.

---

## Exemples numériques supplémentaires

### Exemple 1 — Calcul du LCR et NSFR

**Banque ALPHA** (données simplifiées, en Mds €) :

| Actifs liquides de haute qualité (HQLA) | Montant |
|----------------------------------------|---------|
| Numéraire et réserves banque centrale  | 5       |
| Titres d'État (0 % pondération risque) | 15      |
| Obligations souveraines AA             | 8       |
| **HQLA total**                         | **28**  |

Sorties nettes sur 30 jours :
- Dépôts retail (taux de fuite 5 % sur 30 jours) : 200 Mds × 5 % = 10
- Lignes de crédit confirmées non tirées (taux fuite 10 %) : 50 × 10 % = 5
- Dettes wholesale CT (taux fuite 100 %) : 8
- **Sorties nettes totales : 23 Mds €**

```
LCR = HQLA / Sorties nettes = 28 / 23 = 122 % > 100 % ✓
```

La banque satisfait à l'exigence LCR.

### Exemple 2 — Perte opérationnelle et pertes historiques

**Affaire Kerviel (Société Générale, 2008)** : perte de **4,9 Mds €** due à des positions non autorisées sur futures d'indices européens. Classification : **risque opérationnel — fraude interne**.

Exigence de fonds propres pour risque opérationnel (approche BIA — Basic Indicator Approach) :

```
Capital opérationnel = α × Produit Net Bancaire moyen (3 ans)
α = 15 % (coefficient Bâle III)
```

Pour une banque avec PNB moyen = 10 Mds € :
```
Capital opérationnel = 15 % × 10 = 1,5 Mds €
```

→ La perte de 4,9 Mds aurait effacé 3× le capital opérationnel requis — preuve que les modèles sous-estiment le risque opérationnel de queue.

### Exemple 3 — Ratio de solvabilité et exigences CET1

**Banque BETA** (données en Mds €) :

| Poste | Montant |
|-------|---------|
| CET1 (capital actions + réserves) | 12 |
| Tier 1 (CET1 + AT1 hybrids) | 15 |
| Tier 2 (dettes subordonnées) | 5 |
| Total capital | 20 |
| RWA (Actifs pondérés des risques) | 150 |

```
Ratio CET1 = 12 / 150 = 8 %    ≥ 4,5 % ✓ mais < 7 % (avec coussin conservation) → restrictions dividendes
Ratio Tier 1 = 15 / 150 = 10 % ≥ 6 % ✓
Ratio Total = 20 / 150 = 13,3 % ≥ 8 % ✓
Ratio de levier = Tier 1 / Exposition = 15 / 500 = 3 % = minimum ✓ (mais limite)
```

---

## Applications professionnelles

### Direction des risques en banque (Risk Management Framework)

La gouvernance des risques en pratique chez une grande banque (ex. BNP Paribas) :

**Comité des risques (Board Risk Committee)** :
- Supervise le risk appetite statement global.
- Valide les limites d'exposition par métier, secteur, géographie.

**Risk Appetite Statement (RAS)** :
```
Ex : "Le Groupe n'accepte pas une perte supérieure à X% du CET1 sur
un horizon 1 an dans un scénario de stress sévère. Le levier (D/EBITDA)
des contreparties corporate financées ne doit pas dépasser 5× sauf exception."
```

**Reporting de risque** :
- **Daily P&L** : rapport quotidien du P&L réalisé vs. P&L théorique (Greek-based).
- **VaR Dashboard** : VaR par desk, par facteur de risque, backtesting.
- **Risk appetite consumption** : consommation des limites vs. tolerances.

### Assurance : Solvabilité II

En assurance, le cadre **Solvabilité II** (2016) impose :
- **SCR (Solvency Capital Requirement)** : capital pour survivre à un choc 1/200 ans.
- **MCR (Minimum Capital Requirement)** : capital minimal absolu.
- Pilier 2 : gouvernance des risques, ORSA (Own Risk and Solvency Assessment).
- Pilier 3 : transparence et reporting.

**SCR modulaire** :
```
SCR_total = √(Σᵢ Σⱼ ρᵢⱼ × SCRᵢ × SCRⱼ)
```
Modules : risque de marché, risque de crédit (spread), risque vie, risque non-vie, risque opérationnel.

---

## Erreurs fréquentes et pièges

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Croire que la VaR couvre tout** | La VaR ne dit rien sur les pertes au-delà du seuil | Compléter avec l'Expected Shortfall et les stress tests |
| **Sous-estimer le risque de liquidité** | En crise, la liquidité disparaît là où on en a le plus besoin | LCR/NSFR et tests de résistance de liquidité |
| **Confondre risque de marché et risque de crédit** | Une obligation corporate comporte du risque de taux ET du risque de crédit | Décomposer les expositions par facteur de risque |
| **Croire que la diversification élimine tout risque** | Le risque systémique n'est pas diversifiable | Distinguer risque idiosyncratique (diversifiable) et systémique |
| **Modèle de corrélation stable** | En crise, les corrélations augmentent fortement (actifs très liés tombent ensemble) | Tester les corrélations en conditions de stress (crisis correlation) |

---

## Exercices supplémentaires

### Exercice 1
Une banque a : CET1 = 8 Mds €, Tier 1 = 10 Mds €, Tier 2 = 3 Mds €, RWA = 90 Mds €. Calculez les 3 ratios de solvabilité. La banque satisfait-elle aux exigences minimales de Bâle III (avec coussin de conservation de 2,5 %) ?

> **Correction** :
> Ratio CET1 = 8 / 90 = **8,9 %** ≥ 4,5 % + 2,5 % = 7 % ✓
> Ratio Tier 1 = 10 / 90 = **11,1 %** ≥ 6 % ✓
> Ratio Total = 13 / 90 = **14,4 %** ≥ 8 % + 2,5 % = 10,5 % ✓
> La banque satisfait à toutes les exigences avec des coussins confortables.

### Exercice 2
Classifiez les scénarios de risque suivants et estimez si un stress test historique ou hypothétique est approprié : (a) krach boursier de type 2008, (b) cyber-attaque majeure sur les systèmes bancaires, (c) sortie d'un pays de la zone euro, (d) fraude découverte dans un fonds de pension client.

> **Correction** :
> (a) Krach 2008 → **Risque de marché + risque de crédit** → stress test historique (replay de 2008) ✓
> (b) Cyber-attaque → **Risque opérationnel** → stress test hypothétique (événement sans précédent complet) ✓
> (c) Sortie zone euro → **Risque de marché (FX) + risque de crédit souverain** → stress test hypothétique (jamais vu) ✓
> (d) Fraude → **Risque opérationnel + risque de réputation** → analyse de scénario spécifique ✓

### Exercice 3
Calculez le capital requis pour risque opérationnel (approche BIA) pour une banque dont les PNB des 3 dernières années sont : N-2 = 8 Mds €, N-1 = 9 Mds €, N = 10 Mds €.

> **Correction** :
> PNB moyen = (8 + 9 + 10) / 3 = **9 Mds €**
> Capital requis = 15 % × 9 = **1,35 Mds €**

### Exercice 4
Expliquez pourquoi la crise de 2008 a révélé les limites du modèle de corrélation gaussienne utilisé pour les CDO. Quel était le principal défaut de la "copule gaussienne" de Li ?

> **Correction** :
> Le modèle de Li (2000) modélisait les corrélations entre défauts par une copule gaussienne avec une corrélation fixe ρ. Les tranches senior des CDO hypothécaires étaient notées AAA car la probabilité de pertes simultanées semblait très faible.
>
> **Défauts principaux** :
> 1. La corrélation était calibrée sur des données historiques incluant peu de crises graves → sous-estimation.
> 2. En cas de stress systémique (crise immobilière généralisée), les défauts sont fortement corrélés (queues épaisses dans la distribution conjointe).
> 3. La copule gaussienne a des queues fines → elle sous-estime dramatiquement la probabilité de défauts conjoints massifs.
>
> **Conséquence** : les tranchages AAA des CDO subprime n'avaient pas la protection supposée → pertes catastrophiques lors de la crise 2007-2008.
