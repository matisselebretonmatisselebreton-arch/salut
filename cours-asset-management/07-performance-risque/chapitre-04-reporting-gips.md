# Chapitre 4 — Reporting et Normes GIPS

## Introduction

Le **reporting** en asset management est l'ensemble des communications adressées aux clients, régulateurs et marchés sur la performance, le risque et la composition des portefeuilles. Les **normes GIPS** (Global Investment Performance Standards) constituent le standard mondial de présentation de la performance.

---

## 1. Les normes GIPS

### 1.1 Qu'est-ce que les GIPS ?

Les **GIPS** (Global Investment Performance Standards) sont des normes éthiques et professionnelles de présentation de la performance des investissements, développées par le **CFA Institute**. La dernière version (GIPS 2020) est en vigueur.

**Objectifs** :
- **Comparabilité** : permettre aux investisseurs de comparer des gérants différents sur une base commune
- **Transparence** : assurer une présentation complète et honnête
- **Intégrité** : empêcher les gérants de sélectionner leurs meilleures performances (cherry picking)

**Principe fondamental** : une société de gestion adhère aux GIPS pour l'**ensemble de ses actifs** (firm-wide compliance) ou pas du tout.

### 1.2 Concepts clés des GIPS

**Composite** : regroupement de tous les portefeuilles avec une **stratégie et un objectif similaires**. Un fonds ne peut pas être exlu d'un composite parce qu'il a sous-performé.

```
Exemple de composites :
  - "Global Equity Growth" : tous les mandats et fonds actions croissance monde
  - "Euro Government Bond" : tous les fonds obligataires souverains zone euro
  - "European Large Cap Value" : tous les mandats actions valeur grandes capitalisations
```

**Performance du composite** : moyenne pondérée des performances de tous les portefeuilles du composite.

**Règles de base GIPS (résumé)** :
1. Performance calculée selon les **GIPS calculation methodology** (TWR obligatoire)
2. Performance présentée sur **5 ans minimum** (ou depuis la création du composite si < 5 ans), et toujours jusqu'à l'année actuelle
3. Performance **nette de frais de gestion** (ou brute avec mention)
4. **Tous les portefeuilles** de la stratégie inclus dans le composite (pas de cherry-picking)
5. Présentation de la **dispersion** des performances au sein du composite
6. **Total AUM** de la firme pour l'année concernée

### 1.3 Structure d'un GIPS composite presentation

```
═══════════════════════════════════════════════════════════════════
SOCIÉTÉ DE GESTION XYZ — COMPOSITE "EURO EQUITY GROWTH"
═══════════════════════════════════════════════════════════════════
Année | Perf  | Bench | Nb    | AUM      | AUM    | Dispersion
      | nette | MSCI  | ptf   | composite| firme  | (std dev)
      |       | EU    |       | (M€)     | (M€)   |
──────|───────|───────|───────|──────────|────────|──────────
2024  | +8,2% | +6,5% |  12   |   850    | 15 200 | 1,8 %
2023  |+12,3% |+10,1% |  11   |   780    | 13 800 | 2,1 %
2022  | -9,5% |-12,3% |  10   |   695    | 12 300 | 2,4 %
2021  |+22,1% |+21,2% |   9   |   790    | 12 100 | 1,5 %
2020  |+15,8% |+14,5% |   9   |   620    | 10 500 | 2,2 %
═══════════════════════════════════════════════════════════════════
Notes :
- Benchmark : MSCI Europe Net Return
- Performance annualisée 5 ans : +9,8 % (composite) vs +7,8 % (benchmark)
- Tracking Error 5 ans : 3,2 %
- La firme adhère aux normes GIPS depuis 2015. Vérification indépendante disponible.
═══════════════════════════════════════════════════════════════════
```

---

## 2. Types de reporting

### 2.1 Reporting client institutionnel

Un fonds de pension ou un assureur reçoit typiquement :

**Rapport mensuel (2–4 pages)** :
- Résumé exécutif : performance, écart vs benchmark, événements clés
- Allocation actuelle vs allocation cible et benchmark
- Attribution de performance (Brinson) sur le mois et depuis le début de l'année
- Métriques de risque : VaR, TE, max drawdown, bêta
- Commentaire de gestion : vues macro, décisions prises, perspectives

**Rapport trimestriel (10–20 pages)** :
- Tout le mensuel + analyse approfondie
- Attribution sur le trimestre et l'année
- Revue du processus d'investissement
- Analyse du risque (stress tests, scénarios)
- Revue ESG (si applicable)

**Rapport annuel** :
- Performance sur l'exercice et multi-annuelle (1, 3, 5 ans, depuis création)
- Analyse du risk management
- Gouvernance (composition équipe, turnover)
- Compte rendu GIPS certifié

### 2.2 Reporting réglementaire

**UCITS** : Rapport annuel et semestriel de chaque SICAV/FCP :
- Bilan et compte de résultat du fonds
- Portefeuille titre par titre (full holdings disclosure)
- Frais supportés (Ongoing Charges Figure — OCF)
- Informations sur les transactions avec parties liées

**AIFM** : Rapport Annexe IV trimestriel/annuel à l'AMF :
- AUM et levier brut/net
- Profil de liquidité
- Exposition aux risques principaux
- Résultats des stress tests

**SFDR** : Rapport annuel pour les fonds Articles 8 et 9 :
- Résultats vs indicateurs de durabilité
- Atteinte des objectifs ESG (pour Art. 9)
- PAI (Principal Adverse Impacts) atteints

### 2.3 Reporting ESG

Le reporting ESG est en forte croissance. Les standards convergent vers :

**TCFD** (Task Force on Climate-related Financial Disclosures) :
- Gouvernance (comment la firme intègre le risque climatique)
- Stratégie (scénarios climatiques et leur impact sur le portefeuille)
- Risk management (processus d'identification des risques climatiques)
- Métriques et cibles (empreinte carbone, température implicite du portefeuille)

**GRI** (Global Reporting Initiative) pour le reporting durabilité de la firme elle-même.

**CDP** (Carbon Disclosure Project) : reporting carbone standardisé des entreprises en portefeuille.

---

## 3. Audit et vérification

### 3.1 Vérification GIPS

Les GIPS recommandent (mais n'obligent pas) une **vérification indépendante** par un auditeur externe :

**Niveau 1 (Firm-wide verification)** : l'auditeur vérifie que les politiques et procédures de la firme sont conformes aux GIPS.

**Niveau 2 (Performance examination)** : l'auditeur vérifie un composite spécifique en profondeur.

Sociétés d'audit GIPS reconnues : PricewaterhouseCoopers, KPMG, Deloitte, Ernst & Young, ACA Performance Services.

### 3.2 Calcul et validation de la performance

**Process standard** :
```
1. Data Management : collecte des données de transaction et valorisation
   (Source : système comptable, dépositaire)
   
2. Performance Calculation :
   - Calcul de la VL quotidienne ou mensuelle
   - Calcul du TWR avec la méthode Modified Dietz (approximation efficace)
   
3. Attribution :
   - Application du modèle BHB ou factoriel
   - Validation avec le total net de performance

4. Quality Control :
   - Rapprochement avec le dépositaire (indépendant)
   - Vérification des erreurs aberrantes (outlier detection)
   
5. Distribution :
   - Publication dans le système de reporting client
   - Envoi automatisé ou manuel
```

**Méthode Modified Dietz** :
```
Rp ≈ (VF - VI - CF) / (VI + Σ CFₜ × (1 - t/T))

VF = valeur finale, VI = valeur initiale, CF = flux de la période
t = jour du flux, T = nombre de jours dans la période

Avantage : pas besoin de sous-périodes (moins précis que TWR exact mais bonne approximation)
```

---

## 4. Approfondissement théorique

### La transparence comme signal de qualité

En théorie économique (Spence, 1973 ; Grossman, 1981), les gérants de qualité ont intérêt à être **plus transparents** que les gérants médiocres, car leur performance supérieure sera visible. La transparence est un **signal de qualité**.

**Unraveling theorem (Grossman)** : dans un marché d'information, les bons gérants révèlent volontairement leurs performances → les gérants qui refusent de communiquer signalent implicitement des performances inférieures.

**GIPS comme mécanisme de signaling** : l'adhésion volontaire aux GIPS est un signal de qualité et d'intégrité envoyé aux investisseurs institutionnels, qui peuvent ainsi comparer des gérants sur une base standardisée.

**Réalité pratique** : malgré les GIPS, des distorsions persistent (choix des benchmarks, composition des composites, définition des frais). La vérification externe par un auditeur crédible est le meilleur mécanisme de contrôle.

---

## Exemples numériques

### Exemple 1 — Performance Modified Dietz

Un portefeuille de 100 M€ début de mois. Le 10ème jour (sur 30), réception d'une souscription de 20 M€. Fin de mois, valeur = 126 M€.

```
Modified Dietz :
  VI = 100 M€
  CF = +20 M€ (flux entrant positif)
  VF = 126 M€
  t = 10, T = 30
  Pondération du flux = 1 - 10/30 = 2/3
  
  Numérateur = VF - VI - CF = 126 - 100 - 20 = 6 M€
  Dénominateur = VI + CF × (2/3) = 100 + 20 × 2/3 = 100 + 13,33 = 113,33 M€
  
  R_Modified Dietz = 6 / 113,33 = 5,29 %

Vérification TWR exact :
  Sous-période 1 (jours 1-10) : début 100, fin = 100 × (1 + x₁)
  Sous-période 2 (jours 11-30) : début 100(1+x₁)+20, fin = 126
  Sans information sur la VL au jour 10, le TWR exact n'est pas calculable.
  Modified Dietz est l'approximation standard acceptée par les GIPS.
```

### Exemple 2 — Présentation GIPS non conforme vs conforme

**Non conforme** (exemples de pratiques interdites) :
```
❌ "Nos meilleurs fonds ont fait +25 %/an en 5 ans" (cherry picking)
❌ Performance présentée uniquement sur 2021-2022 (meilleure période)
❌ Inclusion de simulations de portefeuilles "back-testés"
❌ Exclusion d'un fonds qui a sous-performé du composite
```

**Conforme GIPS** :
```
✓ Performance de TOUS les portefeuilles du composite
✓ Au minimum 5 ans d'historique (ou depuis création si < 5 ans)
✓ Performance nette de frais
✓ Benchmark de référence cohérent
✓ Dispersion des rendements au sein du composite
✓ Total AUM de la firme
```

---

## Applications professionnelles

### Réponse à un RFP (Request for Proposal) institutionnel

Un gestionnaire répond à un appel d'offres d'un fonds de pension de 500 M€.

**Sections clés d'un RFP réponse** :
1. **Description de la firme** : historique, actionnariat, AUM total, effectifs, gouvernance
2. **Équipe de gestion** : CV des gérants et analystes, stabilité, key person risk
3. **Processus d'investissement** : description détaillée, reproductibilité
4. **Track record GIPS** : présentation du composite sur 5+ ans, toutes les années incluses
5. **Gestion des risques** : cadre RM, limites, incidents
6. **ESG** : politique ESG, approche d'intégration, reporting
7. **Frais** : structure de frais proposée, transparence totale
8. **Références** : coordonnées de 3–5 clients institutionnels comparables

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Cherry-picking** | Ne présenter que les fonds ou périodes les plus performants | Adhérer aux GIPS et inclure tous les portefeuilles |
| **Brute vs nette de frais** | Comparer performances brutes d'un fonds et nettes d'un autre | Toujours comparer sur la même base (nette de frais) |
| **Benchmark inapproprié** | Comparer un fonds value à un indice croissance → alpha artificiel | Choisir le benchmark qui reflète le vrai univers d'investissement |
| **Rapport annuel sans contexte** | Présenter +15 % sans mentionner que le benchmark a fait +20 % | Toujours présenter la performance relative et les raisons des écarts |

---

## Exercices

### Exercice 1
Un composite GIPS présente les performances suivantes : 2019 : +18 %, 2020 : +12 %, 2021 : +25 %, 2022 : -15 %, 2023 : +10 %. Calculez la performance géométrique annualisée sur 5 ans.

> **Correction** :
> Performance géométrique = (1,18 × 1,12 × 1,25 × 0,85 × 1,10)^(1/5) - 1
>
> 1,18 × 1,12 = 1,3216
> 1,3216 × 1,25 = 1,652
> 1,652 × 0,85 = 1,4042
> 1,4042 × 1,10 = 1,5446
>
> Performance annualisée = (1,5446)^(1/5) - 1 = 1,0906 - 1 = **9,06 %/an**

### Exercice 2
Pourquoi les normes GIPS imposent-elles d'inclure TOUS les portefeuilles d'un composite, même ceux qui ont été fermés en cours d'année ?

> **Correction** :
> L'obligation d'inclure tous les portefeuilles (y compris ceux fermés) vise à éliminer le **survivorship bias** (biais des survivants) :
>
> Sans cette règle, un gérant pourrait :
> 1. Créer plusieurs fonds avec des stratégies légèrement différentes
> 2. Fermer discrètement les fonds qui sous-performent
> 3. N'inclure dans le composite que les fonds survivants (qui ont bien performé)
> 4. Présenter artificiellement une performance supérieure à la réalité
>
> **Exemple chiffré** : 5 fonds créés en 2018. En 2023, 2 ont été fermés (performances médiocres : -5 % et -8 %). Les 3 survivants ont en moyenne +12 %. Sans GIPS : performance composite = +12 %. Avec GIPS : performance composite = (3 × 12% + 1 × -5% + 1 × -8%) / 5 = 7,0 % (chiffre nettement différent).
