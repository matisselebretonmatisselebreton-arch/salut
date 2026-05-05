# Chapitre 3 — Gestion du risque de change en entreprise

## Introduction

Une entreprise qui effectue des transactions en devises étrangères est exposée au **risque de change** : une variation défavorable du taux de change peut réduire ses marges ou la valeur de ses actifs. La gestion du risque de change est une composante essentielle de la trésorerie internationale.

---

## 1. Les trois types d'exposition au risque de change

### 1.1 Exposition de transaction

Risque lié aux flux en devises déjà contractualisés (commandes, factures) mais pas encore réglés.

**Exemple** : un exportateur français a une créance de 1 M$ payable dans 90 jours. Si l'euro s'apprécie de 5 %, il encaissera moins d'euros.

### 1.2 Exposition de conversion (comptable)

Risque lié à la **traduction** des états financiers de filiales étrangères en devise fonctionnelle du groupe.

**Exemple** : une filiale américaine d'un groupe français. Si le USD s'affaiblit, la valeur en euros de l'actif net de la filiale diminue.

### 1.3 Exposition économique (opérationnelle)

Risque sur la **compétitivité future** de l'entreprise en raison des variations de change (impact sur la valeur de l'entreprise, pas seulement sur les flux actuels).

**Exemple** : Airbus vend en dollars mais produit en euros. Si l'euro s'apprécie, ses coûts augmentent en dollars → perte de compétitivité face à Boeing.

---

## 2. Techniques de couverture interne (naturelle)

### 2.1 Netting

Compenser les entrées et sorties dans une même devise pour ne couvrir que le solde net.

**Exemple** :
- Exportations vers USA : +2 M$
- Importations depuis USA : -1,5 M$
- Exposition nette : +0,5 M$ (à couvrir)

### 2.2 Matching

Financer des actifs en devise avec de la dette dans la même devise → les flux se compensent naturellement.

**Exemple** : une entreprise française possède une filiale au Royaume-Uni. Elle se finance en GBP pour que les flux de dividendes en GBP servent à rembourser la dette en GBP.

### 2.3 Leading et Lagging

- **Leading** : accélérer les paiements si l'on anticipe une appréciation de la devise de paiement.
- **Lagging** : retarder les paiements si l'on anticipe une dépréciation de la devise de paiement.

### 2.4 Clause monétaire contractuelle

Inclure dans les contrats commerciaux des clauses indexant les prix sur le taux de change.

---

## 3. Instruments de couverture externe

### 3.1 Vente (ou achat) à terme — Forward

L'entreprise fixe aujourd'hui le taux de change auquel elle échangera ses devises à une date future.

**Exemple** :
- Exportateur français : créance 1 M$ dans 90 jours.
- EUR/USD spot = 1,10 ; forward 90 jours = 1,09.
- L'exportateur vend 1 M$ à terme à 1,09 → encaissera **917 431 €** certains.

```
Avantages : certitude, pas de prime
Inconvénients : rigide, pas de participation à un mouvement favorable
```

### 3.2 Options de change

L'entreprise **achète un put USD / call EUR** pour se protéger contre la baisse du dollar, tout en bénéficiant d'une appréciation.

```
Avantages : asymétrique, participation aux mouvements favorables
Inconvénients : coût de la prime
```

**Exemple** :
- Exportateur achète un put USD K = 1,08 (droit de vendre 1 M$ à 1,08).
- Prime : 15 000 €.
- Si EUR/USD monte à 1,15 → il exerce son put, encaisse 1 M$ / 1,08 = 925 926 € - prime.
- Si EUR/USD tombe à 1,05 → il ne l'exerce pas, échange au cours spot (plus favorable).

### 3.3 Swap de devises (Cross-Currency Swap)

Échange de flux dans deux devises sur toute la durée d'un financement. Utilisé pour les expositions longues (financement d'actifs étrangers).

### 3.4 Tunnel (Risk Reversal)

Combinaison d'achat de put et de vente de call pour limiter le coût :
- Achat put K₁ (protection en dessous de K₁)
- Vente call K₂ (renonce aux gains au-delà de K₂)
- Prime nette réduite voire nulle

```
Gain
  |        ___________K₂
  |       /
──|──────/──────────────── Spot
  |     K₁
  |____/
```

---

## 4. Politique de couverture

### 4.1 Questions stratégiques

| Question | Réponse courante |
|---------|-----------------|
| Doit-on couvrir systématiquement ? | Débat : MM → couverture inutile si investisseurs peuvent se couvrir eux-mêmes. En pratique : couvrir car coûts de détresse réels. |
| Quel horizon couvrir ? | Exposition de transaction : 3–12 mois. Exposition économique : 1–3 ans. |
| Quel taux de couverture ? | 50–100 % de l'exposition nette confirmée. |
| Quel instrument ? | Forward pour certitude ; options pour optionalité. |

### 4.2 Politique de trésorerie internationale — centralisation

Les grands groupes centralisent la gestion du change dans une **trésorerie centrale** (in-house bank) qui :
1. Collecte les positions de toutes les filiales.
2. Effectue le netting intragroupe.
3. Couvre le solde résiduel sur le marché.

---

## 5. Exercices

### Exercice 1
Une entreprise française importe pour 800 000 $ payables dans 6 mois. EUR/USD spot = 1,08, forward 6 mois = 1,06. Quel est son risque ? Comment le couvrir ? Quel est le coût en euros de la couverture ?

> **Correction** :
> **Risque** : l'euro se déprécie → le dollar devient plus cher → la facture en euros augmente.
>
> **Couverture** : achat de dollars à terme (forward) à 1,06.
> Coût couvert = 800 000 / 1,06 = **754 717 €**
>
> Sans couverture, si EUR/USD tombe à 1,02 :
> Coût non couvert = 800 000 / 1,02 = 784 314 € → économie de 784 314 - 754 717 = 29 597 € grâce à la couverture.

### Exercice 2
Un exportateur reçoit 500 000 $ dans 3 mois. Il hésite entre un forward (EUR/USD = 1,10) et un put dollar K = 1,12 (prime = 8 000 €). Comparez les deux stratégies si le cours à l'échéance est : (a) 1,15 ; (b) 1,05.

> **Correction** :
>
> **Forward** : encaissement = 500 000 / 1,10 = **454 545 €** (certain)
>
> **(a) Cours à l'échéance = 1,15 (euro apprécié)** :
> - Forward : 454 545 € (le forward l'a pénalisé vs spot)
> - Put K=1,12 : non exercé → vente au spot 1,15 = 500 000 / 1,15 = 434 783 € - 8 000 = **426 783 €**
> → Forward meilleur dans ce scénario (il aurait fallu ne pas se couvrir du tout)
>
> **(b) Cours à l'échéance = 1,05 (euro déprécié)** :
> - Forward : 454 545 € ✓
> - Put K=1,12 : exercé → 500 000 / 1,12 = 446 429 € - 8 000 = **438 429 €**
> → Forward meilleur encore (protection plus complète)

---

## Points clés à retenir

- L'exposition de transaction est la plus urgente à couvrir ; l'exposition économique est la plus stratégique.
- La couverture interne (netting, matching) doit précéder la couverture externe.
- Le forward donne la certitude du taux mais supprime la participation aux mouvements favorables.
- L'option de change offre une assurance asymétrique au coût d'une prime.
- Le tunnel réduit le coût de couverture en bornant à la fois le risque et le gain potentiel.
