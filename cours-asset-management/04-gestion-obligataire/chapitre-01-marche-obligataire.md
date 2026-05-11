# Chapitre 1 — Le Marché Obligataire et les Instruments

## Introduction

Le marché obligataire est le plus grand marché financier mondial avec plus de **120 000 Md USD** d'encours, soit environ 1,5 fois le PIB mondial. Il permet aux États, aux entreprises et aux institutions de financer leurs besoins à long terme en empruntant auprès d'investisseurs qui reçoivent en contrepartie des flux de revenus réguliers (coupons) et le remboursement du capital à l'échéance.

Pour un gérant d'actifs, la gestion obligataire représente une compétence fondamentale : les obligations constituent 40–60 % des portefeuilles institutionnels.

---

## 1. Anatomie d'une obligation

### 1.1 Caractéristiques fondamentales

Une obligation standard (plain vanilla) se définit par :

```
Émetteur : Qui emprunte (État, entreprise, entité publique)
Nominal (Face value) : Montant remboursé à maturité (ex. 100 €)
Coupon : Taux d'intérêt annuel appliqué au nominal (ex. 3 %/an)
Maturité : Date de remboursement du nominal (ex. 15 mars 2030)
Fréquence : Annuelle (Europe) ou semestrielle (USA)
Devise : EUR, USD, GBP, JPY, etc.
Rang : Senior secured, Senior unsecured, Subordinated

Exemple d'obligation :
  "OAT 3 % mai 2033" (Obligation Assimilable du Trésor, France)
  Émetteur : République française (AAA/Aa2)
  Nominal : 100 €
  Coupon annuel : 3 €/an (versé le 25 mai de chaque année)
  Maturité : 25 mai 2033
  Remboursement : 100 € le 25 mai 2033
```

### 1.2 Les flux d'une obligation à coupon fixe

```
Flux d'une obligation 3 % de maturité 5 ans, nominal 100 € :

t=0     t=1     t=2     t=3     t=4     t=5
|       |       |       |       |       |
Achat  +3 €    +3 €    +3 €    +3 €   +103 €
-P₀

Prix actuel P₀ = 3/(1+r) + 3/(1+r)² + 3/(1+r)³ + 3/(1+r)⁴ + 103/(1+r)⁵

Où r = taux actuariel (YTM — Yield to Maturity)
```

### 1.3 La relation prix-taux

La relation prix-taux est **inversée** : quand les taux montent, les prix baissent.

```
Pour une obligation 3 %, 10 ans, nominal 100 € :

  YTM = 2 % → Prix = 108,98 € (premium)
  YTM = 3 % → Prix = 100,00 € (au pair)
  YTM = 4 % → Prix = 91,89 € (discount)
  YTM = 5 % → Prix = 84,56 € (fort discount)

Intuition : si les taux de marché (4 %) dépassent le coupon (3 %),
l'obligation est moins attractive → son prix baisse pour que son
rendement atteigne le niveau de marché.
```

---

## 2. Le marché primaire

### 2.1 Émission d'obligations souveraines

Les États émettent leurs obligations par voie d'**adjudication** (enchères) :

```
Processus d'adjudication OAT (Agence France Trésor) :

1. Annonce (3–7 jours avant) :
   L'AFT annonce la ligne obligataire (OAT 3 % 2033) et le montant cible

2. Collecte des offres :
   Les SVT (Spécialistes en Valeurs du Trésor) soumettent leurs ordres
   sous forme de paires (prix / volume)
   
3. Séance d'adjudication :
   Les offres sont classées du prix le plus élevé au plus bas
   L'AFT sert les offres jusqu'à atteindre le montant cible
   Prix de coupure = prix minimum auquel les offres sont servies
   Taux de couverture = Total offres / Montant émis (>2× = succès)

4. Résultats :
   Prix moyen pondéré, prix marginal (cut-off), taux de couverture
```

**Principaux SVT en France** : BNP Paribas, Société Générale, Natixis, JP Morgan, Goldman Sachs, Deutsche Bank (environ 18 SVT).

### 2.2 Émission d'obligations corporate : syndication

```
Processus d'émission obligataire corporate (book building) :

SEMAINE -1 : Mandating et Roadshow
  → L'émetteur mandate 2–5 banques (Joint Bookrunners)
  → Roadshow investisseurs : conférences dans les grandes places financières
    (Paris, London, Frankfurt, New York, Hong Kong)
  → Objectif : évaluer la demande et calibrer le prix

JOUR J : Lancement et Book Building
  → Prix indicatif annoncé : ex. "mid-swap + 150 bps, [140–160 bps]"
  → Book building : collecte des ordres des investisseurs institutionnels
    - Investment managers, assureurs, fonds de pension, banques privées
    - Ordres exprimés en montant (ex. "100 M€ au spread de 145 bps")
  → Duration du book building : 2–6 heures pour les opérations standards
  → Sursouscription typical : 3–7× (book 3 à 7 fois le montant émis)

JOUR J (fin) : Pricing et Allocation
  → Prix fixé (guidance resserré ou réduit si forte demande)
    ex. "mid-swap + 130 bps" (spread meilleur que l'indication initiale)
  → Allocation par les banques (priorité aux investisseurs "qualité")
  → Signing des documents légaux

JOUR J+5 : Settlement
  → Livraison des obligations contre paiement (T+5 standard en Europe)
```

### 2.3 Rôles des participants

| Participant | Rôle | Rémunération |
|------------|------|-------------|
| **Émetteur** | Emprunte le capital | — |
| **Chef de file (bookrunner)** | Organise l'émission, tient le book | 0,15–1,5 % du nominal |
| **Co-manager** | Aide à la distribution | 0,05–0,3 % |
| **Investisseur institutionnel** | Achète l'obligation au primaire | Rendement obligataire |
| **Agence de notation** | Note l'émetteur et l'émission | Honoraires |
| **Avocat / Trustee** | Documentation légale | Honoraires fixes |

---

## 3. Le marché secondaire

### 3.1 Structure du marché secondaire

Le marché secondaire obligataire est principalement un marché **OTC (Over The Counter)** :

```
Marché OTC :
  - Transactions bilatérales entre banques, dealers et investisseurs
  - Prix négocié téléphoniquement ou via chatrooms (Bloomberg, Refinitiv)
  - Pas de carnet d'ordres centralisé
  - Market makers (dealers) cotent des prix bid/offer en continu
  
Spread bid-offer typique :
  OAT 10Y (émission benchmark) : 1–2 centimes (0,01–0,02 % du nominal)
  OAT hors benchmark : 3–10 centimes
  Obligation corporate IG : 5–25 centimes
  Obligation HY : 25–100 centimes
  Obligation EM : 25–200 centimes
```

### 3.2 Plateformes électroniques

```
Principales plateformes d'exécution obligataire :

MarketAxess (actions : 70 % du volume d'exécution IG/HY USA) :
  - Protocol RFQ (Request for Quote) : demande simultanée à plusieurs dealers
  - Améliore la transparence des prix et réduit les spreads

Bloomberg MTF (Europe) :
  - Intégré au terminal Bloomberg
  - Dominant sur les sovereign bonds européens

Tradeweb :
  - Dominant en Europe sur rates (souverains, swaps)
  - 40–50 % du volume électronique européen

MTS (Mercato dei Titoli di Stato) :
  - Spécialisé souverains européens
  - Plateforme officielle pour les SVT italiens, espagnols, français
```

---

## 4. Typologies d'obligations

### 4.1 Par type de coupon

```
Obligation à taux fixe (Fixed Rate) :
  Coupon constant = taux × nominal
  La plus courante (US Treasuries, OAT, Bunds, obligations corporates IG)

Obligation à taux variable (FRN — Floating Rate Note) :
  Coupon = taux de référence + spread
  ex. EURIBOR 3 mois + 50 bps (révisé tous les 3 mois)
  Protection contre la hausse des taux (duration ≈ 0,25 an)

Obligation zéro-coupon (Zero Coupon Bond) :
  Aucun coupon intermédiaire
  Émise en dessous du pair, remboursée au pair
  P₀ = 100 / (1 + r)^N
  Duration = Maturité (duration maximale pour une maturité donnée)
  
Obligation indexée inflation (Inflation-Linked) :
  Coupon et/ou nominal ajustés selon l'indice des prix
  OATi (France), TIPS (USA), ILG (UK)
  P = Nominal × (Index_t / Index_base) × Prix_réel
```

### 4.2 Par structure de remboursement

```
Obligations callable (remboursables par anticipation) :
  L'émetteur peut rembourser avant maturité si les taux baissent
  → Refinancement à un taux plus favorable
  Prix callable < Prix non-callable (l'investisseur cède une option à l'émetteur)
  
  Risque pour l'investisseur : réinvestissement à des taux plus bas
  = Extension risk l'inverse si les taux montent : l'émetteur ne rembourse pas

Obligations puttable :
  L'investisseur peut exiger le remboursement anticipé
  → Protège contre la hausse des taux
  Prix puttable > Prix non-puttable (l'investisseur détient une option)

Obligations convertibles :
  L'investisseur peut convertir en actions de l'émetteur
  Prix = Valeur obligataire + Valeur optionnelle (option d'achat sur l'action)
  
  Profil : obligation + call sur l'action = "upside participation, downside protection"
  Utilisateurs : hedge funds en convertible arbitrage, investisseurs equity/credit
```

### 4.3 Par type d'émetteur

```
Obligations d'État souverain :
  Exemples : OAT (France), Bund (Allemagne), BTP (Italie), Gilt (UK), Treasury (USA)
  Risque : risque de taux pur (pour les pays bien notés AAA-AA)
  
Obligations supranationales :
  Exemples : Banque Mondiale, BEI (Banque Européenne d'Investissement), EFSF
  Notation : AAA généralement
  
Obligations corporate :
  Investment Grade (notation AAA à BBB-) : obligations des grandes entreprises
  High Yield (notation BB+ et moins) : entreprises plus risquées, rémunération plus élevée
  
Green Bonds / Social Bonds / Sustainability Bonds :
  Financement de projets à impact environnemental ou social positif
  Marché : 4 000 Md USD (2024), en forte croissance
  Primauté des principes ICMA Green Bond Principles
  
Sukuk (obligations islamiques) :
  Conformes à la loi islamique (Charia) : pas d'intérêt (riba)
  Structure Ijara (location) ou Murabaha (revente)
  Revenus issus d'actifs réels, non de l'intérêt pur
  Marchés principaux : pays du Golfe, Malaisie
```

---

## 5. Calcul du prix et du rendement

### 5.1 Prix pied de coupon et prix plein

```
Prix plein (Dirty Price = Prix de règlement) :
  P_plein = Σₜ [Flux_t / (1 + r)^t]
  = Prix effectivement payé

Prix pied de coupon (Clean Price = Prix coté) :
  P_pied = P_plein − Coupon couru

Coupon couru (Accrued Interest) :
  CC = Coupon × (Jours depuis dernier coupon / Jours dans la période)

Exemple :
  Obligation 4 %, annuelle, coupon versé le 1er mars
  On est le 1er septembre (6 mois après le dernier coupon)
  
  CC = 4 % × (183/365) = 2,00 €  (convention Act/365)
  
  Si Prix pied de coupon coté = 102,50 €
  Prix plein = 102,50 + 2,00 = 104,50 €
  C'est le prix effectivement payé à la transaction.
```

### 5.2 Conventions de calcul du coupon couru

| Convention | Calcul | Utilisée pour |
|-----------|--------|---------------|
| **Act/365** (Actual/365) | Jours exacts / 365 | Gilts UK, monétaire EUR |
| **Act/360** | Jours exacts / 360 | Monétaire USD, FRN |
| **30/360** | Mois de 30 jours, année 360 | Obligations corporate USA |
| **Act/Act (ICMA)** | Jours exacts / (Jours dans la période × fréquence) | Souverains européens (OAT, Bund) |

**Importance pratique** : les conventions peuvent créer des différences de quelques centimes de coupon couru, ce qui est significatif pour des transactions de grande taille.

### 5.3 Le calcul du YTM (rendement actuariel)

```
Prix plein = Σₜ₌₁ᴺ [C / (1+r)ᵗ] + [Nominal / (1+r)ᴺ]

Pour une obligation avec coupon couru :
  Prix plein = C × (1−(1+r)^−N) / r + 100 / (1+r)^N

Résolution numérique (Newton-Raphson) :
  Pas de formule analytique pour r → itération numérique

Méthode approximative (simple) :
  r ≈ [C + (100 − P₀)/N] / [(100 + P₀)/2]

Exemple :
  Obligation 3 %, 5 ans, Prix = 98 €
  r ≈ [3 + (100−98)/5] / [(100+98)/2]
    = [3 + 0,4] / 99
    = 3,4 / 99 = 3,43 %
```

---

## Approfondissement théorique

### La structure par terme des taux d'intérêt

La **courbe des taux** représente les rendements des obligations souveraines en fonction de leur maturité :

```
Théories explicatives de la forme de la courbe :

1. Théorie des anticipations pures :
   Le taux long = moyenne géométrique des taux courts futurs attendus
   
   (1 + r_2)² = (1 + r_1) × (1 + f_1,2)
   
   f_1,2 = taux forward implicite entre t=1 et t=2

2. Théorie de la prime de terme :
   Le taux long inclut une prime pour l'incertitude supplémentaire
   r_N = E[r_courts futurs] + Prime de terme_N
   
   Prime de terme US 10Y estimée (Adrian, Crump & Moench, 2013) :
   0 à 2 % selon les périodes. Était négative 2019–2020 (QE Fed)

3. Théorie de la segmentation des marchés :
   Différentes maturités attirent des investisseurs différents (fonds de pension = long,
   banques = court) → les segments peuvent être déconnectés
   
   En pratique : combinaison des 3 théories
```

### Les taux forward

```
Taux forward entre t₁ et t₂ (implicite dans la courbe des taux spot) :

  (1 + s_t₂)^t₂ = (1 + s_t₁)^t₁ × (1 + f_t₁,t₂)^(t₂-t₁)

  f_t₁,t₂ = [(1 + s_t₂)^t₂ / (1 + s_t₁)^t₁]^(1/(t₂-t₁)) − 1

Exemple :
  Taux spot 2 ans = 3,0 %
  Taux spot 3 ans = 3,5 %
  
  Taux forward 1 an dans 2 ans :
  f_2,3 = [(1,035)³ / (1,03)²]^1 − 1
         = [1,1087 / 1,0609] − 1
         = 1,0451 − 1 = 4,51 %
  
  Interprétation : le marché "price" un taux 1 an dans 2 ans de 4,51 %.
  Si ce taux ne se réalise pas (ex. : les taux baissent), une position longue
  duration 3 ans sera profitable vs. rouler des positions 2 ans.
```

---

## Exemples numériques

### Exemple 1 — Calcul complet du prix d'une obligation

**Obligation** : OAT 2,75 % 25 octobre 2027 (5 ans restants), coupon annuel.
**YTM demandé** : 3,20 %. **Date de valorisation** : 25 avril 2025 (6 mois après le dernier coupon du 25 octobre 2024).

```
Flux futurs et actualisation :

Date        | Flux (€) | t (années depuis évaluation) | VAN au taux 3,20 %
------------|----------|------------------------------|-----------------
25 oct 2025 | 2,75     | 0,5                          | 2,75 / (1,032)^0,5 = 2,708
25 oct 2026 | 2,75     | 1,5                          | 2,75 / (1,032)^1,5 = 2,624
25 oct 2027 | 2,75     | 2,5                          | 2,75 / (1,032)^2,5 = 2,543
25 oct 2027 | 100,00   | 2,5                          | 100 / (1,032)^2,5 = 92,48

Prix plein = 2,708 + 2,624 + 2,543 + 92,48 = 100,355 €

Coupon couru (6 mois sur une période annuelle, Act/Act) :
  CC = 2,75 × (183/365) = 1,379 €

Prix pied de coupon coté = 100,355 − 1,379 = 98,976 ≈ 98,98 €

(Obligation cotée légèrement en dessous du pair car YTM 3,20 % > coupon 2,75 %)
```

### Exemple 2 — Comparaison d'émissions primaires et secondaires

**Scénario** : Lancement d'une obligation corporate EUR 500 M€.

```
Processus de pricing (jour J) :

Taux de référence :
  Mid-swap 5 ans EUR : 3,15 %

Guidance initiale : "mid-swap + 155–165 bps"
  → Rendement estimé : 3,15% + 1,55/1,65% = 4,70–4,80%

Book building (2 heures) :
  Ordres reçus : 2 100 M€ (sursouscription ×4,2)
  Répartition des ordres :
    ≤ 150 bps : 800 M€ (très agressifs)
    150–155 bps : 700 M€
    155–160 bps : 400 M€
    > 160 bps : 200 M€

Décision de pricing :
  Compte tenu de la forte demande, le spread est réduit à "mid-swap + 140 bps"
  → Rendement final : 3,15% + 1,40% = 4,55%
  
  Prix d'émission = calculé pour un rendement de 4,55% sur 5 ans
  (avec coupon arrêté à 4,50% → prix légèrement en dessous du pair : 99,78 €)

Allocation (500 M€) :
  Insurance / pension funds : 180 M€ (36%) → "real money" prioritaire
  Fonds d'investissement : 200 M€ (40%)
  Banques privées : 70 M€ (14%)
  Hedge funds : 50 M€ (10%)
  
  Géographie : 50% France, 25% Allemagne/Autriche, 15% UK, 10% reste
  
Spread de secondaire (lendemain) :
  Cotation : 4,45% (le spread s'est serré de 10 bps → cours monté à 100,40 €)
  Les investisseurs primaires ont un gain immédiat de +0,40 % → "new issue premium" typique
```

### Exemple 3 — Calcul de la prime green bond

**Comparaison** : obligation verte vs. obligation classique du même émetteur.

```
Émetteur : EDF SA (notation BBB+)

Obligation classique EDF 3,625% 2030 (non-verte) :
  YTM sur le marché secondaire : 4,35%
  Spread vs. OAT 5 ans : +105 bps

Obligation verte EDF 3,375% 2030 (financement projets renouvelables) :
  YTM sur le marché secondaire : 4,18%
  Spread vs. OAT 5 ans : +88 bps

"Greenium" (prime verte) :
  4,35% − 4,18% = 0,17% = 17 bps
  
  L'obligation verte est financée 17 bps MOINS CHÈRE pour l'émetteur
  = La "prime verte" avantage l'émetteur (et coûte légèrement à l'investisseur)
  
  Tendance 2023–2024 : le greenium oscille entre 5 et 25 bps selon les émetteurs
  et les conditions de marché. Il tend à diminuer avec la croissance de l'offre.

Impact pour le gérant obligataire :
  Fonds à mandat ESG : obligation verte préférée même avec un rendement légèrement
  inférieur (respect des critères ESG du mandat)
  
  Fonds sans contrainte ESG : obligation classique préférée (+17 bps de rendement)
```

---

## Applications professionnelles

### Participation au marché primaire

```
Stratégie d'un gérant obligataire sur le marché primaire :

Avant l'émission :
  1. Analyse de la valorisation relative (fair value du spread)
     → Est-ce que le spread offert est attractif vs. le secondaire ?
  2. Analyse du crédit (mise à jour de la thèse sur l'émetteur)
  3. Calibrage du montant à demander :
     - Si sursouscription ×4 attendue → demander 4× le montant voulu
     - Si forte conviction → placer un ordre agressif (spread bas)
  
Pendant le book building :
  4. Suivi du guidage des bookrunners (messages "books covered", guidance réduite)
  5. Ajustement de l'ordre si la dynamique change

Post-émission :
  6. Monitoring de la performance vs. secondaire (premium réalisé)
  7. Décision : conserver en portefeuille ou revendre en secondaire (flip)
```

---

## Erreurs fréquentes

| Erreur | Description | Remède |
|--------|-------------|--------|
| **Confondre prix pied de coupon et prix plein** | Le coupon couru peut représenter 1–4 % du nominal — le prix de règlement est le prix plein | Toujours calculer la transaction en prix plein (dirty price) |
| **Ignorer la convention de calcul** | Act/365 vs Act/Act peut créer des différences de quelques bps de rendement | Vérifier la convention pour chaque marché (OAT = Act/Act, Gilt = Act/365) |
| **Confondre YTM et coupon** | Une obligation à coupon 3 % achetée à 98 € a un YTM > 3 % | Le YTM intègre à la fois les coupons ET le gain/perte de capital vers le pair |
| **Sous-estimer le risque de liquidité** | Le marché primaire est liquide mais le secondaire pour certaines lignes peut être très illiquide | Vérifier le volume journalier secondaire avant tout achat |
| **Négliger le coupon couru dans le P&L** | Comptabiliser le prix pied et oublier le coupon couru dans le P&L | Le P&L obligataire inclut le coupon couru accumulé (running yield) |

---

## Exercices

### Exercice 1
Calculez le prix plein, le coupon couru et le prix pied de coupon d'une obligation de nominal 100 €, coupon annuel 4 %, maturité dans 3 ans, YTM demandé = 3,5 %, date d'évaluation = 6 mois après le dernier coupon versé (convention Act/Act, 183 jours sur 365).

> **Correction** :
> ```
> t = 0,5 ans (premier coupon dans 6 mois), puis t = 1,5 et t = 2,5
>
> Prix plein = 4/(1,035)^0,5 + 4/(1,035)^1,5 + 104/(1,035)^2,5
>
> (1,035)^0,5 = 1,01737
> (1,035)^1,5 = 1,05268
> (1,035)^2,5 = 1,09022
>
> VAN₁ = 4 / 1,01737 = 3,932 €
> VAN₂ = 4 / 1,05268 = 3,800 €
> VAN₃ = 104 / 1,09022 = 95,394 €
>
> Prix plein = 3,932 + 3,800 + 95,394 = 103,126 €
>
> Coupon couru = 4 × (183/365) = 4 × 0,5014 = 2,005 €
>
> Prix pied de coupon = 103,126 − 2,005 = 101,12 €
>
> Interprétation : obligation au-dessus du pair car YTM (3,5 %) < coupon (4 %)
> ```

### Exercice 2
Un investisseur achète une obligation zéro-coupon de maturité 10 ans, nominal 1 000 €, au prix de 613,91 €. Calculez le taux actuariel et le rendement si les taux montent à 7 % dès le lendemain (la maturité reste 10 ans).

> **Correction** :
> ```
> Taux actuariel initial :
>   613,91 × (1 + r)^10 = 1 000
>   (1 + r)^10 = 1 000 / 613,91 = 1,6289
>   1 + r = (1,6289)^(1/10) = 1,0500
>   r = 5 % ✓
>
> Nouveau prix si YTM = 7 % :
>   P_nouveau = 1 000 / (1,07)^10 = 1 000 / 1,9672 = 508,35 €
>
> Variation de prix :
>   ΔP = 508,35 − 613,91 = -105,56 €
>   ΔP% = -105,56 / 613,91 = -17,19 %
>
> C'est une chute massive ! Les obligations zéro-coupon ont la duration
> la plus élevée (duration = maturité = 10 ans pour un zéro-coupon)
> → elles sont les plus sensibles aux variations de taux.
> ```

### Exercice 3
Comparez le rendement d'une obligation callable vs. non-callable : l'obligation non-callable 5 % 10 ans est cotée à YTM 4,8 %. L'obligation callable identique (call au pair dans 5 ans) est cotée à YTM 5,2 %. Calculez le Yield-to-Call (YTC) et expliquez pourquoi l'obligation callable offre un rendement plus élevé.

> **Correction** :
> ```
> YTM de l'obligation non-callable : 4,8 %
> YTM de l'obligation callable : 5,2 %
>
> Option-Adjusted Spread (OAS) approximatif = 5,2% − 4,8% = 0,40%
> → L'émetteur paie 40 bps supplémentaires pour obtenir le droit de rembourser par anticipation
>
> Yield-to-Call (YTC) — rendement si l'obligation est remboursée dans 5 ans au pair :
>   P_callable = Σₜ₌₁⁵ [5 / (1+YTC)ᵗ] + 100 / (1+YTC)⁵
>   
>   Si P_callable (au moment de l'analyse) = 98,70 € :
>   98,70 = 5/1,ytc + 5/ytc² + ... + 105/ytc⁵
>   
>   Résolution numérique → YTC ≈ 5,35%
>
> Interprétation :
>   L'obligation callable offre un YTM plus élevé (5,2% vs 4,8%) car l'investisseur
>   supporte le "call risk" : si les taux baissent à 3 %, l'émetteur remboursera et
>   l'investisseur devra réinvestir à 3 % (au lieu de continuer à toucher 5 %).
>   La prime de 40 bps est la compensation de ce risque de réinvestissement.
> ```
