var RE_VALUATION_SCENARIOS = [
    {
        name: "Tour Horizon",
        type: "Bureaux",
        location: "La Défense, Paris",
        description: "Tour de bureaux de 25 000 m² livrée en 2015. Locataire unique (banque) avec bail ferme 9 ans restant. État impeccable.",
        surface: 25000, loyer_m2: 450, tof: 100, charges_m2: 80,
        loyerTotal: 11250000, chargesTotal: 2000000,
        capexAnnuel: 500000, fraisGestion: 5,
        peerCapRates: [4.2, 4.5, 4.8, 4.0],
        peerNames: ["Tour Alpha (Défense)", "Tour Beta (Défense)", "Cœur Défense-like", "Tour Pacific-like"],
        cashflows: [9200000, 9400000, 9600000, 9800000, 10000000],
        difficulty: "beginner",
        hint: "Actif core avec locataire solide et bail long. Le taux de capi devrait être autour de 4-5%. La valeur se calcule : Loyer net / Taux de capi."
    },
    {
        name: "Centre Commercial Les Halles du Sud",
        type: "Commerce",
        location: "Toulouse (périphérie)",
        description: "Centre commercial de 18 000 m² avec 45 cellules. Mix locatif : alimentaire (30%), textile (40%), restauration (20%), services (10%). TOF en baisse.",
        surface: 18000, loyer_m2: 280, tof: 88, charges_m2: 60,
        loyerTotal: 4435200, chargesTotal: 1080000,
        capexAnnuel: 400000, fraisGestion: 6,
        peerCapRates: [6.0, 6.5, 7.0, 5.8],
        peerNames: ["CC Leclerc Blagnac", "Retail Park Labège", "CC Carrefour Purpan", "Galerie Esplanade"],
        cashflows: [3000000, 2900000, 2800000, 2850000, 2900000],
        difficulty: "intermediate",
        hint: "Le TOF de 88% pèse sur les revenus. Pour le commerce périphérique, les taux de capi sont plus élevés (6-7%). Attention à la tendance baissière du retail physique."
    },
    {
        name: "Parc Tertiaire Innova",
        type: "Bureaux",
        location: "Lyon Part-Dieu",
        description: "Immeuble de bureaux récent (2019) de 8 000 m² avec certification HQE. Multi-locataires (6 baux). Durée résiduelle moyenne : 4,5 ans.",
        surface: 8000, loyer_m2: 320, tof: 95, charges_m2: 55,
        loyerTotal: 2432000, chargesTotal: 440000,
        capexAnnuel: 150000, fraisGestion: 5,
        peerCapRates: [5.0, 5.3, 5.5, 4.8],
        peerNames: ["Oxygène Part-Dieu", "Sky 56-like", "Silex²-like", "Tour Incity-like"],
        cashflows: [1900000, 1950000, 2000000, 2050000, 2100000],
        difficulty: "beginner",
        hint: "Lyon Part-Dieu est un marché prime régional. Les taux de capi sont un peu plus élevés qu'à Paris (5-5.5%). La certification HQE est un plus pour la valorisation."
    },
    {
        name: "Retail Park Les Oliviers",
        type: "Commerce",
        location: "Aix-en-Provence",
        description: "Retail park de 12 000 m² avec 15 cellules. Locomotive alimentaire (Carrefour Market). Zone de chalandise : 120 000 habitants.",
        surface: 12000, loyer_m2: 200, tof: 92, charges_m2: 40,
        loyerTotal: 2208000, chargesTotal: 480000,
        capexAnnuel: 200000, fraisGestion: 5.5,
        peerCapRates: [5.8, 6.2, 6.5, 5.5],
        peerNames: ["RP Plan de Campagne", "RP Les Milles", "RP Vitrolles", "RP La Valentine"],
        cashflows: [1600000, 1580000, 1620000, 1650000, 1680000],
        difficulty: "intermediate",
        hint: "Le retail park résiste mieux que le centre commercial classique. La locomotive alimentaire sécurise le flux. Taux de capi autour de 5.5-6.5%."
    },
    {
        name: "Immeuble Haussmann",
        type: "Bureaux",
        location: "Paris 8ème (QCA)",
        description: "Immeuble haussmannien de 3 500 m² de bureaux dans le Quartier Central des Affaires. Rénové en 2020. 3 locataires (avocats, conseil, luxe).",
        surface: 3500, loyer_m2: 750, tof: 100, charges_m2: 100,
        loyerTotal: 2625000, chargesTotal: 350000,
        capexAnnuel: 200000, fraisGestion: 4,
        peerCapRates: [3.2, 3.5, 3.8, 3.0],
        peerNames: ["Bd Haussmann-like", "Rue Royale-like", "Avenue Montaigne-like", "Rue du Fg St-Honoré-like"],
        cashflows: [2100000, 2150000, 2200000, 2250000, 2300000],
        difficulty: "intermediate",
        hint: "Actif ultra-prime dans le QCA. Les taux de capi sont les plus bas de France (3-4%). La rareté du foncier et la qualité de l'emplacement justifient le premium."
    },
    {
        name: "Entrepôt logistique XXL",
        type: "Logistique",
        location: "Île-de-France (A86)",
        description: "Entrepôt logistique de 40 000 m² construit en 2021. Locataire unique (e-commerce) avec bail ferme 12 ans. Hauteur libre 12m, quais 30.",
        surface: 40000, loyer_m2: 65, tof: 100, charges_m2: 15,
        loyerTotal: 2600000, chargesTotal: 600000,
        capexAnnuel: 150000, fraisGestion: 4,
        peerCapRates: [4.0, 4.3, 4.5, 3.8],
        peerNames: ["Prologis Roissy-like", "Goodman Gennevilliers-like", "Segro Orly-like", "WDP Évry-like"],
        cashflows: [1900000, 1950000, 2000000, 2050000, 2100000],
        difficulty: "beginner",
        hint: "La logistique est le secteur star de l'immobilier post-Covid. Les taux de capi se sont compressés fortement (4-4.5% en IDF). Le bail long sécurise les cash flows."
    },
    {
        name: "Portefeuille Santé",
        type: "Santé",
        location: "Multi-régions France",
        description: "Portefeuille de 5 cliniques et EHPAD totalisant 30 000 m². Baux triple net de 12 ans en moyenne. Opérateurs de santé reconnus.",
        surface: 30000, loyer_m2: 180, tof: 100, charges_m2: 0,
        loyerTotal: 5400000, chargesTotal: 0,
        capexAnnuel: 300000, fraisGestion: 3,
        peerCapRates: [5.0, 5.3, 5.5, 4.8],
        peerNames: ["Icade Santé-like", "Cofinimmo-like", "Primonial REIM Santé", "Gecina Santé-like"],
        cashflows: [5000000, 5100000, 5200000, 5300000, 5400000],
        difficulty: "advanced",
        hint: "L'immobilier de santé offre une grande visibilité (baux triple net très longs). Les taux de capi sont autour de 5-5.5%. Les charges sont au locataire (triple net)."
    },
    {
        name: "Campus Tertiaire Green",
        type: "Bureaux",
        location: "Bordeaux Euratlantique",
        description: "Campus de bureaux neuf de 15 000 m² (RE2020, BREEAM Excellent). 4 locataires tech/digital. Parkings, rooftop, services. Livré en 2023.",
        surface: 15000, loyer_m2: 250, tof: 85, charges_m2: 45,
        loyerTotal: 3187500, chargesTotal: 675000,
        capexAnnuel: 200000, fraisGestion: 5,
        peerCapRates: [5.5, 5.8, 6.0, 5.2],
        peerNames: ["Campus Mérignac-like", "Quai 8.2-like", "Euratlantique lot A", "Bassins à Flot-like"],
        cashflows: [2200000, 2350000, 2500000, 2600000, 2700000],
        difficulty: "advanced",
        hint: "Bordeaux est un marché dynamique mais le TOF de 85% pèse. Le potentiel de reversion à la hausse et les certifications environnementales sont des atouts. Taux de capi : 5.5-6%."
    }
];

var SCPI_SCENARIOS = [
    {
        name: "Épargne Pierre",
        type: "Bureaux diversifiée",
        description: "SCPI diversifiée à dominante bureaux. Patrimoine de 250 immeubles en France et Europe. Capitalisation : 2,8 Mds€.",
        capitalisation: 2800, prixPart: 208, rendement: 5.28, tof: 93.7,
        collecte: 450, distribution: 10.98, patrimoine: 250,
        evolution1an: 0, evolution3ans: -2.5, evolution5ans: 3.2,
        fraisSouscription: 10, fraisGestion: 10,
        zoneGeo: "France 70%, Europe 30%",
        typologies: "Bureaux 55%, Commerce 20%, Logistique 15%, Santé 10%",
        endettement: 18,
        recommendation: "ACHETER",
        hint: "SCPI de grande taille avec bonne diversification. Le rendement de 5.28% est attractif. Le TOF de 93.7% est correct. Attention à la baisse du prix de part sur 3 ans."
    },
    {
        name: "Corum Origin",
        type: "Diversifiée européenne",
        description: "SCPI opportuniste investie dans 13 pays européens. Stratégie de rendement élevé avec une gestion active du patrimoine.",
        capitalisation: 2500, prixPart: 1090, rendement: 6.06, tof: 96.8,
        collecte: 380, distribution: 66.05, patrimoine: 160,
        evolution1an: 0, evolution3ans: 0, evolution5ans: 2.1,
        fraisSouscription: 12, fraisGestion: 12,
        zoneGeo: "Pays-Bas 20%, Irlande 15%, Italie 12%, Finlande 10%, Autres 43%",
        typologies: "Bureaux 45%, Commerce 30%, Logistique 15%, Hôtels 10%",
        endettement: 8,
        recommendation: "ACHETER",
        hint: "Rendement élevé grâce à la diversification européenne. Prix de part stable. Frais élevés (12%) mais rendement net attractif. Faible endettement."
    },
    {
        name: "Immorente",
        type: "Commerce",
        description: "SCPI historique à dominante commerce. Patrimoine de 350 actifs dont beaucoup de murs de boutiques en centre-ville. Créée en 1988.",
        capitalisation: 3800, prixPart: 340, rendement: 4.82, tof: 95.2,
        collecte: 200, distribution: 16.39, patrimoine: 350,
        evolution1an: -1.5, evolution3ans: -5.2, evolution5ans: -3.8,
        fraisSouscription: 9.6, fraisGestion: 10,
        zoneGeo: "France 75%, Europe 25%",
        typologies: "Commerce 65%, Bureaux 20%, Hôtels 10%, Autres 5%",
        endettement: 15,
        recommendation: "ACHETER",
        hint: "SCPI historique solide mais le poids du commerce pèse. La baisse du prix de part reflète la correction du marché retail. Le rendement reste correct grâce aux loyers de centre-ville."
    },
    {
        name: "Primopierre",
        type: "Bureaux",
        description: "SCPI de bureaux franciliens gérée par Primonial REIM. Patrimoine concentré sur l'Île-de-France avec des actifs de grande taille.",
        capitalisation: 3200, prixPart: 180, rendement: 4.12, tof: 88.5,
        collecte: 50, distribution: 7.42, patrimoine: 55,
        evolution1an: -8, evolution3ans: -18, evolution5ans: -22,
        fraisSouscription: 9, fraisGestion: 10,
        zoneGeo: "Île-de-France 85%, Régions 15%",
        typologies: "Bureaux 90%, Activité 10%",
        endettement: 25,
        recommendation: "ÉVITER",
        hint: "SCPI en difficulté : baisse massive du prix de part (-22% sur 5 ans), TOF faible (88.5%), endettement élevé (25%). La concentration sur les bureaux IDF hors QCA est un risque."
    },
    {
        name: "Pierval Santé",
        type: "Santé",
        description: "SCPI thématique investie en immobilier de santé (cliniques, EHPAD, cabinets médicaux) en France et en Europe.",
        capitalisation: 1800, prixPart: 200, rendement: 5.10, tof: 98.2,
        collecte: 350, distribution: 10.20, patrimoine: 120,
        evolution1an: 0, evolution3ans: 1.5, evolution5ans: 4.2,
        fraisSouscription: 10.8, fraisGestion: 9,
        zoneGeo: "France 55%, Irlande 15%, Allemagne 12%, Autres 18%",
        typologies: "Cliniques 40%, EHPAD 25%, Cabinets médicaux 20%, Autres santé 15%",
        endettement: 12,
        recommendation: "ACHETER",
        hint: "Thématique défensive par excellence. Le TOF de 98.2% est excellent (baux longs en santé). Prix de part en hausse. Bonne diversification géographique."
    },
    {
        name: "Activimmo",
        type: "Logistique",
        description: "Première SCPI dédiée à la logistique et aux locaux d'activité. Bénéficie du boom du e-commerce.",
        capitalisation: 1200, prixPart: 610, rendement: 5.52, tof: 97.5,
        collecte: 300, distribution: 33.66, patrimoine: 85,
        evolution1an: 0, evolution3ans: 2.0, evolution5ans: 5.5,
        fraisSouscription: 10, fraisGestion: 9,
        zoneGeo: "France 90%, Europe 10%",
        typologies: "Logistique 60%, Locaux d'activité 30%, Messagerie 10%",
        endettement: 20,
        recommendation: "ACHETER",
        hint: "Thématique porteuse (logistique / e-commerce). Rendement élevé, TOF excellent. Attention à l'endettement de 20% et à la concentration France."
    },
    {
        name: "Novaxia Neo",
        type: "Résidentiel / Transformation",
        description: "SCPI sans frais d'entrée spécialisée dans la transformation de bureaux obsolètes en logements. Stratégie value-add unique.",
        capitalisation: 500, prixPart: 187, rendement: 6.51, tof: 99,
        collecte: 180, distribution: 12.17, patrimoine: 30,
        evolution1an: -4, evolution3ans: -2, evolution5ans: 0,
        fraisSouscription: 0, fraisGestion: 15,
        zoneGeo: "France 100%",
        typologies: "Bureaux en transformation 50%, Résidentiel 30%, Mixte 20%",
        endettement: 30,
        recommendation: "ACHETER",
        hint: "Modèle innovant (0% frais d'entrée). Rendement très élevé mais risque de transformation. L'endettement de 30% est élevé. Frais de gestion de 15% pour compenser l'absence de frais d'entrée."
    },
    {
        name: "Patrimmo Commerce",
        type: "Commerce",
        description: "SCPI de commerce de centre-ville. Patrimoine concentré sur les grandes artères commerçantes. Gestion par Praemia REIM.",
        capitalisation: 600, prixPart: 160, rendement: 3.80, tof: 90.5,
        collecte: -30, distribution: 6.08, patrimoine: 45,
        evolution1an: -10, evolution3ans: -20, evolution5ans: -28,
        fraisSouscription: 10, fraisGestion: 10,
        zoneGeo: "France 100%",
        typologies: "Commerce centre-ville 80%, Retail park 15%, Autres 5%",
        endettement: 22,
        recommendation: "ÉVITER",
        hint: "SCPI en grande difficulté. Collecte négative, prix en chute libre, TOF faible. Le commerce physique de centre-ville souffre structurellement. Rendement faible ne compensant pas la perte en capital."
    }
];

var RE_SCREENING_DEALS = [
    {
        name: "Tour Lumière — La Défense",
        type: "Bureaux prime",
        description: "Tour de bureaux de 30 000 m² rénovée. Occupée à 100% par un locataire investment grade (bail 6/9 ans, 5 ans restant). Loyer légèrement supérieur au marché.",
        surface: 30000, loyerNet: 13500000, tof: 100,
        askingPrice: 310000000, askingYield: 4.35,
        strengths: ["Emplacement prime (Défense)", "Locataire unique investment grade", "Bail résiduel de 5 ans", "Immeuble rénové récemment"],
        weaknesses: ["Risque de vacance à l'échéance du bail", "Loyer au-dessus du marché (risque de réversion négative)", "Taille importante (>300M€) limitant la liquidité", "Marché de La Défense concurrentiel"],
        recommendation: "GO",
        rationale: "L'emplacement et la qualité du locataire justifient l'investissement. Le risque à l'échéance est réel mais 5 ans de cash flows sécurisés permettent de préparer un repositionnement. Le rendement de 4.35% est conforme au marché prime.",
        hint: "Un locataire investment grade avec bail résiduel de 5 ans sécurise les cash flows. La Défense reste un emplacement prime. Comparez le rendement au prime yield du marché."
    },
    {
        name: "Galerie Marchande Le Mérignac",
        type: "Centre commercial",
        description: "Galerie commerciale de 15 000 m² en périphérie de Bordeaux. 40 cellules, dont 8 vacantes. Locomotive alimentaire partie il y a 2 ans.",
        surface: 15000, loyerNet: 1800000, tof: 78,
        askingPrice: 22000000, askingYield: 8.18,
        strengths: ["Rendement élevé (8.18%)", "Prix d'entrée bas (1 467 €/m²)", "Zone de chalandise dense", "Possibilité de repositionnement"],
        weaknesses: ["Perte de la locomotive alimentaire", "TOF très faible (78%)", "8 cellules vacantes", "Travaux importants à prévoir", "Commerce périphérique en difficulté structurelle"],
        recommendation: "NO-GO",
        rationale: "La perte de la locomotive alimentaire est un signal très négatif. Sans elle, le flux client s'effondre et la vacance risque de s'aggraver. Le rendement élevé est un piège : les travaux de repositionnement et la vacance absorberont le différentiel de rendement.",
        hint: "La perte de la locomotive alimentaire est un événement majeur pour un centre commercial. Un TOF de 78% indique une vacance structurelle. Un rendement élevé peut être un piège (value trap)."
    },
    {
        name: "Campus Green Office — Nantes",
        type: "Bureaux neufs",
        description: "Immeuble de bureaux neuf (RE2020) de 6 000 m² sur l'île de Nantes. Certifié BREEAM Outstanding. 3 locataires tech, baux fermes 6 ans.",
        surface: 6000, loyerNet: 1500000, tof: 100,
        askingPrice: 27000000, askingYield: 5.56,
        strengths: ["Neuf avec meilleures certifications (RE2020, BREEAM)", "Marché nantais dynamique", "Locataires tech en croissance", "Baux fermes 6 ans", "Faibles charges (neuf)"],
        weaknesses: ["Marché régional (moins liquide)", "Rendement un peu tendu pour la province", "Risque de dépendance au secteur tech", "Taille modeste limitant l'intérêt institutionnel"],
        recommendation: "GO",
        rationale: "L'actif coche toutes les cases ESG (RE2020, BREEAM Outstanding) ce qui le rend très attractif pour les investisseurs institutionnels. Les baux fermes sécurisent les cash flows. Nantes est l'un des marchés régionaux les plus dynamiques.",
        hint: "Les certifications RE2020 et BREEAM Outstanding sont des atouts majeurs pour la liquidité future. Les baux fermes 6 ans sécurisent le rendement. Nantes est un marché régional dynamique."
    },
    {
        name: "Murs de boutiques — Rue de Rivoli, Paris",
        type: "Commerce prime",
        description: "Lot de 3 boutiques en pied d'immeuble haussmannien, Rue de Rivoli (1er arrondissement). Surface totale : 800 m². Locataires : enseigne de luxe, opticien, restauration.",
        surface: 800, loyerNet: 960000, tof: 100,
        askingPrice: 28000000, askingYield: 3.43,
        strengths: ["Emplacement ultra-prime Paris centre", "Rareté du foncier (irremplaçable)", "Locataires solides", "Valeur patrimoniale forte"],
        weaknesses: ["Rendement très faible (3.43%)", "Prix au m² très élevé (35 000€/m²)", "Risque retail de luxe en cas de récession", "Liquidité limitée (actif atypique)"],
        recommendation: "GO",
        rationale: "Les murs de boutiques ultra-prime Paris sont une classe d'actifs à part. Le rendement faible est compensé par la sécurité et le potentiel de revalorisation à long terme. L'emplacement est irremplaçable. Actif patrimonial par excellence.",
        hint: "Les murs de commerce ultra-prime Paris sont irremplaçables. Le rendement faible est typique de cette classe d'actifs (3-4%). Pensez valeur patrimoniale plutôt que rendement courant."
    },
    {
        name: "Parc Logistique Sénart",
        type: "Logistique",
        description: "Plateforme logistique de 50 000 m² en première couronne IDF. Construite en 2020. Locataire e-commerce, bail ferme 9 ans.",
        surface: 50000, loyerNet: 3250000, tof: 100,
        askingPrice: 75000000, askingYield: 4.33,
        strengths: ["Classe d'actifs en forte demande", "Bail ferme 9 ans", "Emplacement IDF premium", "Actif récent, peu de capex", "Secteur porté par le e-commerce"],
        weaknesses: ["Rendement compressé (4.33%)", "Risque de concentration sur un locataire", "Actif à usage unique (reconversion difficile)", "Valorisation élevée pour de la logistique"],
        recommendation: "GO",
        rationale: "La logistique IDF est l'une des classes d'actifs les plus recherchées. Le bail ferme 9 ans et la qualité de l'actif justifient le rendement compressé. Le risque de locataire unique est mitigé par la demande structurelle du secteur en IDF.",
        hint: "La logistique est la classe d'actifs la plus recherchée post-Covid. Un bail ferme 9 ans sécurise les cash flows. L'IDF est l'emplacement premium pour la logistique française."
    },
    {
        name: "Centre commercial régional en déclin",
        type: "Commerce",
        description: "Centre commercial de 35 000 m² en zone périurbaine d'une ville moyenne (80 000 hab). Construit en 1995, rénové partiellement en 2010. Locomotive Auchan en place.",
        surface: 35000, loyerNet: 4200000, tof: 82,
        askingPrice: 48000000, askingYield: 8.75,
        strengths: ["Rendement attractif (8.75%)", "Locomotive alimentaire en place", "Surface importante", "Prix bas (1 371€/m²)"],
        weaknesses: ["TOF en baisse (82%)", "Ville moyenne avec pouvoir d'achat limité", "Actif vieillissant (travaux lourds nécessaires)", "Concurrence e-commerce et retail parks", "Risque de départ de la locomotive", "Tendance structurelle négative pour les CC régionaux"],
        recommendation: "NO-GO",
        rationale: "Les centres commerciaux de ville moyenne sont la classe d'actifs la plus à risque. La vacance structurelle va s'aggraver (e-commerce, retail parks). Les travaux de rénovation nécessaires (actif de 1995) vont absorber une grande partie du rendement apparent. Le risque de perte en capital est élevé.",
        hint: "Un actif de 1995 en ville moyenne nécessite des travaux lourds. Le TOF de 82% est en baisse tendancielle. Le rendement élevé reflète le risque, pas l'opportunité. Attention à la tendance structurelle du commerce physique."
    },
    {
        name: "Résidence de co-living — Lyon",
        type: "Résidentiel géré",
        description: "Résidence de co-living de 120 unités (4 500 m²) dans le 7ème arrondissement de Lyon. Opérée par un acteur spécialisé. Bail de 10 ans.",
        surface: 4500, loyerNet: 720000, tof: 95,
        askingPrice: 14000000, askingYield: 5.14,
        strengths: ["Thématique porteuse (co-living)", "Bail de 10 ans", "Lyon 7ème, bon quartier étudiant/jeune actif", "Rendement correct pour du résidentiel géré"],
        weaknesses: ["Classe d'actifs récente, peu de track record", "Dépendance à l'opérateur", "Risque réglementaire (statut juridique flou)", "Marché niche, faible liquidité", "Risque de saturation du marché co-living"],
        recommendation: "GO",
        rationale: "Le co-living répond à une tendance structurelle (mobilité, prix du logement, sociabilité). Le bail de 10 ans sécurise les cash flows. Lyon 7ème est bien positionné pour cette cible. Le risque opérateur est le principal point de vigilance.",
        hint: "Le co-living est une tendance émergente soutenue par la mobilité et les prix du logement. Un bail de 10 ans est sécurisant. Lyon 7ème est un quartier adapté à la cible (étudiants, jeunes actifs). Le risque principal est la dépendance à l'opérateur."
    },
    {
        name: "Immeuble de bureaux obsolète — Créteil",
        type: "Bureaux à repositionner",
        description: "Immeuble de bureaux des années 80 de 10 000 m² à Créteil. Non certifié, DPE E. Occupé à 55% par des PME avec des baux courts. Parking de 200 places.",
        surface: 10000, loyerNet: 1100000, tof: 55,
        askingPrice: 12000000, askingYield: 9.17,
        strengths: ["Rendement très élevé (9.17%)", "Prix d'entrée bas (1 200€/m²)", "Potentiel de transformation (résidentiel ?)", "Grand parking valorisable"],
        weaknesses: ["Obsolescence technique et environnementale (DPE E)", "TOF catastrophique (55%)", "Travaux de rénovation massifs nécessaires", "Décret tertiaire : obligation de réduire les consommations", "Localisation secondaire (Créteil)", "Aucune certif environnementale"],
        recommendation: "NO-GO",
        rationale: "L'obsolescence technique (DPE E) et le décret tertiaire rendent une rénovation obligatoire et coûteuse. Avec un TOF de 55% et une localisation secondaire, le risque de vacance structurelle est très élevé. Le coût de remise aux normes (estimé 2 000-3 000€/m², soit 20-30M€) dépasse largement le prix d'acquisition. Seul un projet de transformation urbaine (logement) pourrait avoir du sens, mais c'est un autre métier.",
        hint: "Un DPE E est rédhibitoire avec le décret tertiaire (obligation de -40% de consommation d'ici 2030). Le TOF de 55% indique une vacance structurelle. Estimez le coût de rénovation (2 000-3 000€/m²) et comparez-le au prix d'acquisition."
    }
];

var RE_QUIZ_QUESTIONS = [
    {
        question: "Qu'est-ce que le taux de capitalisation (cap rate) en immobilier ?",
        options: [
            "Le rapport entre le loyer net et la valeur de l'actif",
            "Le taux d'intérêt du crédit immobilier",
            "Le pourcentage de fonds propres investis",
            "Le taux de rentabilité du promoteur"
        ],
        correct: 0,
        explanation: "Le taux de capitalisation = Loyer Net / Valeur de l'actif. C'est la métrique fondamentale en immobilier d'investissement. Plus le cap rate est bas, plus l'actif est cher (et théoriquement plus sûr)."
    },
    {
        question: "Qu'est-ce que le TOF en immobilier ?",
        options: [
            "Le Taux d'Offre Foncière",
            "Le Taux d'Occupation Financier, soit le ratio loyers perçus / loyers potentiels",
            "Le Total des Obligations Financières",
            "Le Taux d'Opérations Futures"
        ],
        correct: 1,
        explanation: "Le TOF (Taux d'Occupation Financier) mesure le pourcentage des loyers effectivement perçus par rapport aux loyers théoriques si l'immeuble était occupé à 100%. Un TOF de 95%+ est considéré comme bon."
    },
    {
        question: "Que signifie un bail \"3/6/9\" en immobilier commercial français ?",
        options: [
            "Un bail de 3 ans renouvelable 6 fois",
            "Un loyer révisé tous les 3, 6 et 9 mois",
            "Un bail de 9 ans avec possibilité de résiliation par le locataire tous les 3 ans",
            "3 mois de préavis, 6 mois de franchise, 9 ans de durée"
        ],
        correct: 2,
        explanation: "Le bail 3/6/9 est le bail commercial standard en France. Durée de 9 ans, avec la faculté pour le locataire de donner congé à chaque période triennale (3 ans, 6 ans). Le bailleur, lui, ne peut résilier qu'à l'échéance de 9 ans."
    },
    {
        question: "Qu'est-ce qu'une SCPI ?",
        options: [
            "Un Syndicat de Copropriété pour l'Immobilier",
            "Une Structure Commerciale de Promotion Immobilière",
            "Un Schéma de Contrôle du Patrimoine Immobilier",
            "Une Société Civile de Placement Immobilier, véhicule collectif d'investissement en immobilier"
        ],
        correct: 3,
        explanation: "La SCPI permet à des épargnants d'investir collectivement dans un patrimoine immobilier diversifié. Les investisseurs achètent des parts et perçoivent des revenus (dividendes) issus des loyers collectés, net de frais de gestion."
    },
    {
        question: "Qu'est-ce que le \"prime yield\" en immobilier ?",
        options: [
            "Le taux de rendement d'un actif de haute qualité",
            "Le taux de capitalisation des meilleurs actifs dans les meilleurs emplacements",
            "Le rendement minimum garanti",
            "Le taux d'intérêt préférentiel pour l'immobilier"
        ],
        correct: 1,
        explanation: "Le prime yield est le taux de capitalisation des actifs de meilleure qualité dans les localisations les plus recherchées (ex: bureaux QCA Paris ~3%, logistique IDF ~4%). Il sert de référence pour le marché."
    },
    {
        question: "Quel est l'impact d'une hausse des taux d'intérêt sur les valeurs immobilières ?",
        options: [
            "Les valeurs augmentent (plus d'investisseurs)",
            "Aucun impact direct",
            "Les valeurs baissent (les cap rates se décompressent pour rester attractifs vs. les taux sans risque)",
            "Seul l'immobilier résidentiel est impacté"
        ],
        correct: 2,
        explanation: "Quand les taux montent, les investisseurs exigent un rendement plus élevé (cap rate plus élevé). À loyer constant, un cap rate plus élevé signifie une valeur plus basse. C'est le mécanisme de décompression des taux qui a causé la correction 2022-2024."
    },
    {
        question: "Qu'est-ce que le \"triple net\" (NNN) en immobilier ?",
        options: [
            "Un rendement calculé net de 3 types de frais",
            "Un bail de 3 ans net de franchise",
            "Une transaction sans frais de notaire, d'agence ni de mutation",
            "Un bail où le locataire paie le loyer, les charges, les taxes ET les gros travaux"
        ],
        correct: 3,
        explanation: "Dans un bail triple net (NNN), le locataire supporte l'intégralité des charges : charges courantes, taxes foncières, et gros travaux/entretien. Le propriétaire perçoit un loyer \"net\" de toute charge. Fréquent en santé et logistique."
    },
    {
        question: "Qu'est-ce que le \"spread\" immobilier ?",
        options: [
            "L'écart de loyer entre deux quartiers",
            "La commission de l'agent immobilier",
            "La différence entre le cap rate immobilier et le taux sans risque (OAT 10 ans)",
            "La surface utile vs. la surface brute"
        ],
        correct: 2,
        explanation: "Le spread = Cap rate - Taux sans risque (OAT 10 ans). Il mesure la prime de risque immobilière. Un spread élevé rend l'immobilier attractif vs. les obligations. Historiquement autour de 200-300 bps pour le prime."
    },
    {
        question: "Qu'est-ce que le décret tertiaire (décret éco-énergie) ?",
        options: [
            "Un décret fixant le loyer maximum des bureaux",
            "Une obligation de performance énergétique imposant -40% de consommation d'ici 2030 et -60% d'ici 2050 pour les bâtiments tertiaires > 1000 m²",
            "Une taxe sur les bâtiments de plus de 10 étages",
            "Un label environnemental volontaire"
        ],
        correct: 1,
        explanation: "Le décret tertiaire impose aux bâtiments tertiaires > 1000 m² de réduire leur consommation énergétique de -40% d'ici 2030, -50% d'ici 2040, et -60% d'ici 2050. C'est un facteur majeur d'obsolescence pour les immeubles anciens non rénovés."
    },
    {
        question: "Qu'est-ce que la \"valeur vénale\" d'un bien immobilier ?",
        options: [
            "Le prix de construction du bien",
            "Le prix auquel le bien pourrait être vendu dans des conditions normales de marché",
            "Le montant du loyer annuel",
            "La valeur d'assurance du bien"
        ],
        correct: 1,
        explanation: "La valeur vénale est le prix de marché estimé d'un bien, déterminé par un expert immobilier. Elle est utilisée pour les comptes des foncières, SCPI et fonds immobiliers. Les méthodes d'évaluation principales sont la capitalisation et le DCF."
    },
    {
        question: "Qu'est-ce que le DPE et pourquoi est-il devenu crucial en immobilier tertiaire ?",
        options: [
            "Le Diagnostic de Performance Énergétique, qui classe les bâtiments de A à G et conditionne désormais leur louabilité",
            "Le Document de Propriété et d'Exploitation",
            "Le Droit de Préemption Étendu",
            "La Dotation aux Provisions Exceptionnelles"
        ],
        correct: 0,
        explanation: "Le DPE classe les bâtiments de A (très performant) à G (passoire thermique). Les actifs classés F et G sont progressivement interdits à la location. C'est devenu un critère majeur de valorisation : un actif avec un mauvais DPE subit une décote significative."
    },
    {
        question: "Quelle est la différence entre un fonds core et un fonds value-add en immobilier ?",
        options: [
            "Core = rendement élevé, Value-add = rendement faible",
            "Core = actifs sécurisés à faible rendement, Value-add = actifs à repositionner avec rendement cible plus élevé",
            "Core = Paris uniquement, Value-add = régions",
            "Aucune différence significative"
        ],
        correct: 1,
        explanation: "Core = actifs prime, 100% loués, locataires solides, rendement 3-5%. Value-add = actifs avec un potentiel d'amélioration (vacance, rénovation, repositionnement), rendement cible 8-12%. Opportunistic = encore plus risqué, rendement cible >15%."
    },
    {
        question: "Qu'est-ce que l'ILAT (Indice des Loyers des Activités Tertiaires) ?",
        options: [
            "L'Indice de Liquidité des Actifs Tertiaires",
            "L'indicateur de localisation des actifs tertiaires",
            "L'Indice des Loyers d'Ateliers et Terrains",
            "L'indice de révision des loyers des bureaux et activités tertiaires, publié par l'INSEE"
        ],
        correct: 3,
        explanation: "L'ILAT est l'indice de référence pour la révision annuelle des loyers de bureaux en France. Composé d'indices de prix à la consommation, du coût de la construction et du PIB. Il protège contre l'inflation tout en limitant les hausses excessives."
    },
    {
        question: "Qu'est-ce que le loyer de marché (ERV - Estimated Rental Value) ?",
        options: [
            "Le loyer maximum fixé par l'État",
            "Le loyer théorique qu'un actif pourrait percevoir s'il était reloué aujourd'hui aux conditions de marché",
            "Le loyer moyen des 5 dernières années",
            "Le loyer minimum pour couvrir les charges"
        ],
        correct: 1,
        explanation: "L'ERV est le loyer que l'on pourrait obtenir en relouant le bien aux conditions actuelles du marché. Si le loyer en place est supérieur à l'ERV, on parle de réversion négative (risque de baisse à la relocation). Si inférieur, c'est une réversion positive (potentiel de hausse)."
    },
    {
        question: "Qu'est-ce qu'un fonds OPCI ?",
        options: [
            "Un organisme de promotion de la construction immobilière",
            "Un fonds de placement dans le commerce international",
            "Un fonds immobilier non coté détenant au moins 60% d'immobilier et jusqu'à 40% d'actifs financiers",
            "Un outil de planification du capital immobilier"
        ],
        correct: 2,
        explanation: "L'OPCI (Organisme de Placement Collectif Immobilier) est un véhicule hybride : minimum 60% d'immobilier, maximum 40% de valeurs mobilières. Plus liquide qu'une SCPI car il peut détenir des actifs financiers et offre des rachats réguliers."
    },
    {
        question: "Qu'est-ce que le \"yield on cost\" en développement immobilier ?",
        options: [
            "Le rendement locatif rapporté au coût total du projet (terrain + construction + frais)",
            "Le taux d'intérêt de la dette de construction",
            "Le rendement de la première année seulement",
            "Le ratio charges / loyer"
        ],
        correct: 0,
        explanation: "Yield on cost = Loyer net stabilisé / Coût total du projet. C'est la mesure clé de rentabilité en développement. Un développeur vise un yield on cost supérieur au cap rate de marché pour créer de la valeur (ex: YoC de 6% vs. cap rate de 4.5% = marge de développeur)."
    },
    {
        question: "Qu'est-ce que le ratio LTV (Loan-to-Value) en financement immobilier ?",
        options: [
            "Le ratio entre le loyer et la valeur",
            "Le ratio entre le montant du prêt et la valeur de l'actif",
            "Le taux de vacance acceptable",
            "Le ratio de liquidité des transactions"
        ],
        correct: 1,
        explanation: "LTV = Montant de la dette / Valeur de l'actif. Un LTV de 60% signifie que la dette représente 60% de la valeur. Les banques financent typiquement à 50-65% de LTV pour l'immobilier commercial. Au-delà, le risque augmente significativement."
    },
    {
        question: "Qu'est-ce que la certification BREEAM en immobilier ?",
        options: [
            "Un permis de construire britannique",
            "Un standard de sécurité incendie",
            "Un label de performance environnementale évaluant l'impact écologique des bâtiments, noté de Pass à Outstanding",
            "Un label d'accessibilité handicapé"
        ],
        correct: 2,
        explanation: "BREEAM (Building Research Establishment Environmental Assessment Method) est le label environnemental le plus utilisé en immobilier commercial en Europe. Les niveaux vont de Pass à Outstanding. Il est devenu quasi-obligatoire pour les investisseurs institutionnels."
    },
    {
        question: "Qu'est-ce que le Quartier Central des Affaires (QCA) de Paris ?",
        options: [
            "La zone comprise entre les 1er, 2ème, 8ème et 9ème arrondissements, concentrant les bureaux les plus prestigieux et les plus chers de France",
            "Le quartier de La Défense",
            "L'ensemble de l'Île-de-France",
            "Le quartier autour de la Bourse de Paris"
        ],
        correct: 0,
        explanation: "Le QCA de Paris (grosso modo le triangle d'or et ses abords) est le marché de bureaux le plus cher et le plus liquide de France. Les loyers y dépassent 900€/m²/an et les cap rates sont autour de 3%. C'est la référence du marché français."
    },
    {
        question: "Qu'est-ce que la réversion locative ?",
        options: [
            "Le remboursement du dépôt de garantie",
            "Le retour du bien au propriétaire à la fin du bail",
            "Le reversement des charges au locataire",
            "La différence entre le loyer en place et le loyer de marché (ERV)"
        ],
        correct: 3,
        explanation: "La réversion locative = ERV - Loyer en place. Positive si le loyer de marché est supérieur au loyer en place (potentiel de hausse à la relocation). Négative si le loyer en place est au-dessus du marché (risque de baisse). C'est un indicateur clé de la valorisation future."
    }
];
