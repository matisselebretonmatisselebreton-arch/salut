const LBO_SCENARIOS = [
    {
        name: "MedTech Solutions",
        sector: "Dispositifs médicaux",
        description: "Fabricant de dispositifs médicaux de niche avec une forte récurrence (consommables). Position de leader sur 3 segments en Europe.",
        revenue: 150,
        ebitda: 30,
        ebitdaMargin: 20,
        netDebt: 10,
        capexPercent: 4,
        nwcPercent: 15,
        taxRate: 25,
        fcfConversion: 70,
        hint: "Business résilient avec des marges élevées. Le levier peut être confortable grâce à la récurrence du CA."
    },
    {
        name: "LogiFlow",
        sector: "Logistique / SaaS",
        description: "Plateforme SaaS de gestion logistique pour PME. ARR en croissance de 25%/an, mais EBITDA encore modeste. Très faible churn (3%).",
        revenue: 40,
        ebitda: 8,
        ebitdaMargin: 20,
        netDebt: 0,
        capexPercent: 8,
        nwcPercent: 5,
        taxRate: 25,
        fcfConversion: 60,
        hint: "Profil croissance. Le multiple d'entrée sera élevé. La thèse repose sur l'expansion de l'EBITDA."
    },
    {
        name: "Groupe Artisan Boulanger",
        sector: "Agroalimentaire / Retail",
        description: "Chaîne de 85 boulangeries artisanales en France. Marques reconnues, base de clients fidèle. Croissance par ouverture de points de vente.",
        revenue: 120,
        ebitda: 18,
        ebitdaMargin: 15,
        netDebt: 25,
        capexPercent: 6,
        nwcPercent: 8,
        taxRate: 25,
        fcfConversion: 65,
        hint: "Business capex-intensive (ouvertures). Attention à la capacité de remboursement de dette."
    },
    {
        name: "CyberShield",
        sector: "Cybersécurité",
        description: "Éditeur de solutions de cybersécurité pour ETI. Revenus récurrents (licences + maintenance). Croissance organique de 15%/an.",
        revenue: 60,
        ebitda: 15,
        ebitdaMargin: 25,
        netDebt: 5,
        capexPercent: 3,
        nwcPercent: 10,
        taxRate: 25,
        fcfConversion: 80,
        hint: "Très beau profil : marges élevées, bonne conversion cash, marché porteur. Multiple d'entrée potentiellement élevé."
    },
    {
        name: "IndustriePro",
        sector: "Industrie spécialisée",
        description: "Fabricant de composants industriels pour l'aéronautique. Carnet de commandes de 2 ans. Clients grands comptes (Airbus, Safran).",
        revenue: 200,
        ebitda: 32,
        ebitdaMargin: 16,
        netDebt: 40,
        capexPercent: 7,
        nwcPercent: 20,
        taxRate: 25,
        fcfConversion: 55,
        hint: "Cycle long, capex élevé, BFR important. La dette doit rester modérée. Upside via l'amélioration opérationnelle."
    },
    {
        name: "VetCare Group",
        sector: "Santé animale",
        description: "Réseau de 40 cliniques vétérinaires en consolidation. Forte croissance externe possible. EBITDA en progression de 12%/an.",
        revenue: 80,
        ebitda: 16,
        ebitdaMargin: 20,
        netDebt: 15,
        capexPercent: 3,
        nwcPercent: 5,
        taxRate: 25,
        fcfConversion: 75,
        hint: "Thèse de build-up classique. Le rendement viendra de la croissance externe et des synergies."
    },
    {
        name: "EduTech France",
        sector: "EdTech / Formation",
        description: "Plateforme de formation professionnelle B2B. 500 entreprises clientes. Taux de renouvellement de 90%.",
        revenue: 35,
        ebitda: 9,
        ebitdaMargin: 26,
        netDebt: 0,
        capexPercent: 5,
        nwcPercent: 8,
        taxRate: 25,
        fcfConversion: 72,
        hint: "Petit mais très rentable. La croissance organique sera clé pour justifier un multiple élevé."
    },
    {
        name: "GreenPack",
        sector: "Emballage durable",
        description: "Fabricant d'emballages écologiques pour l'industrie alimentaire. Croissance tirée par la réglementation anti-plastique.",
        revenue: 95,
        ebitda: 14,
        ebitdaMargin: 15,
        netDebt: 20,
        capexPercent: 8,
        nwcPercent: 18,
        taxRate: 25,
        fcfConversion: 50,
        hint: "Tailwind réglementaire fort mais capex élevé pour accompagner la croissance. FCF conversion à surveiller."
    }
];

const VALUATION_SCENARIOS = [
    {
        name: "DataViz Corp",
        sector: "Software / Analytics",
        revenue: 50,
        ebitda: 12,
        ebitdaMargin: 24,
        netDebt: -5,
        growth: 18,
        fcf: [8, 9.5, 11, 13, 15],
        peerEvEbitda: [14, 16, 12, 15],
        peerEvRevenue: [3.5, 4.0, 3.0, 3.8],
        peerNames: ["Tableau-like", "Qlik-like", "Sisense-like", "Looker-like"],
        description: "Éditeur de logiciel de data visualisation pour entreprises. Croissance forte, marges en expansion."
    },
    {
        name: "PharmaCo Generics",
        sector: "Pharmaceutique",
        revenue: 300,
        ebitda: 60,
        ebitdaMargin: 20,
        netDebt: 80,
        growth: 3,
        fcf: [40, 41, 42, 43, 44],
        peerEvEbitda: [9, 10, 8.5, 11],
        peerEvRevenue: [1.8, 2.0, 1.5, 2.2],
        peerNames: ["Teva-like", "Mylan-like", "Sandoz-like", "Accord-like"],
        description: "Producteur de médicaments génériques. Business mature avec des cash flows stables."
    },
    {
        name: "FastFood Chain",
        sector: "Restauration rapide",
        revenue: 180,
        ebitda: 27,
        ebitdaMargin: 15,
        netDebt: 35,
        growth: 8,
        fcf: [15, 17, 19, 21, 23],
        peerEvEbitda: [11, 13, 10, 12],
        peerEvRevenue: [1.5, 1.8, 1.2, 1.6],
        peerNames: ["QSR Peer A", "QSR Peer B", "QSR Peer C", "QSR Peer D"],
        description: "Chaîne de restauration rapide premium avec 150 points de vente en France et Benelux."
    },
    {
        name: "CloudSecure",
        sector: "Cybersécurité SaaS",
        revenue: 25,
        ebitda: 5,
        ebitdaMargin: 20,
        netDebt: -8,
        growth: 35,
        fcf: [3, 4.5, 6.5, 9, 12],
        peerEvEbitda: [25, 30, 20, 28],
        peerEvRevenue: [8, 10, 7, 9],
        peerNames: ["CrowdStrike-like", "Zscaler-like", "SentinelOne-like", "Fortinet-like"],
        description: "Solution cloud-native de sécurité. Hyper-croissance, net retention rate > 130%."
    },
    {
        name: "BuildIt Materials",
        sector: "Matériaux de construction",
        revenue: 400,
        ebitda: 48,
        ebitdaMargin: 12,
        netDebt: 60,
        growth: 4,
        fcf: [28, 29, 30, 31, 32],
        peerEvEbitda: [7, 8, 6.5, 7.5],
        peerEvRevenue: [0.8, 1.0, 0.7, 0.9],
        peerNames: ["Saint-Gobain-like", "Holcim-like", "CRH-like", "Wienerberger-like"],
        description: "Distributeur de matériaux de construction. Réseau dense de 200 agences. Business cyclique."
    }
];

const SCREENING_DEALS = [
    {
        name: "AquaPure Technologies",
        sector: "Traitement de l'eau",
        description: "Leader français du traitement de l'eau pour collectivités locales. Contrats long terme (7-15 ans), récurrence >80%.",
        revenue: 90, ebitda: 22, ebitdaMargin: 24, growth: 6,
        askingMultiple: 12,
        strengths: ["Récurrence élevée (contrats long terme)", "Barrières réglementaires fortes", "Marché en croissance structurelle (normes environnementales)", "Position de leader sur son segment"],
        weaknesses: ["Multiple d'entrée élevé (12x)", "Dépendance aux collectivités locales", "Capex de renouvellement significatif"],
        recommendation: "GO",
        rationale: "Business de très haute qualité avec une visibilité exceptionnelle. La récurrence et les barrières réglementaires justifient le premium de valorisation. Le potentiel de croissance via les nouvelles normes environnementales est un catalyseur supplémentaire."
    },
    {
        name: "FashionRetail Group",
        sector: "Mode / Retail",
        description: "Chaîne de prêt-à-porter milieu de gamme. 200 boutiques en France. CA en légère baisse depuis 2 ans.",
        revenue: 250, ebitda: 20, ebitdaMargin: 8, growth: -3,
        askingMultiple: 7,
        strengths: ["Marque connue avec historique", "Réseau de boutiques dense", "Valorisation raisonnable (7x)"],
        weaknesses: ["Marges faibles et en baisse", "Décroissance du CA", "Concurrence e-commerce intense", "Risque de disruption du modèle", "Baux commerciaux rigides"],
        recommendation: "NO-GO",
        rationale: "Secteur en disruption structurelle. La baisse du CA et des marges suggère un problème fondamental de positionnement. Même à 7x, le risque de destruction de valeur est trop élevé sans plan de transformation crédible."
    },
    {
        name: "LabConnect",
        sector: "Santé / Diagnostic",
        description: "Réseau de 25 laboratoires d'analyses médicales. Consolidation en cours du secteur. EBITDA margin > 20%.",
        revenue: 70, ebitda: 16, ebitdaMargin: 23, growth: 10,
        askingMultiple: 14,
        strengths: ["Secteur défensif et en consolidation", "Marges élevées et stables", "Potentiel de build-up significatif", "Barrières réglementaires"],
        weaknesses: ["Multiple très élevé (14x)", "Risque de régulation des prix", "Compétition sur les cibles de build-up"],
        recommendation: "GO",
        rationale: "Le secteur des labos est un cas d'école du PE (consolidation + récurrence + marges). Le multiple est élevé mais justifié par le potentiel de build-up et les synergies. Attention cependant au risque de surpayer les bolt-ons."
    },
    {
        name: "TruckFleet Services",
        sector: "Transport / Logistique",
        description: "Entreprise de transport routier avec une flotte de 500 camions. Contrats avec la grande distribution.",
        revenue: 180, ebitda: 14, ebitdaMargin: 8, growth: 2,
        askingMultiple: 6,
        strengths: ["Prix d'entrée bas (6x)", "Contrats long terme avec grands distributeurs", "Taille critique de la flotte"],
        weaknesses: ["Marges très faibles", "Business très capitalistique", "Risque conducteurs (pénurie)", "Volatilité du prix du carburant", "Risque de transition énergétique (renouvellement flotte)"],
        recommendation: "NO-GO",
        rationale: "Business trop capitalistique avec des marges insuffisantes pour absorber le service de la dette. La pénurie de chauffeurs et la transition vers les véhicules électriques créent des risques majeurs. Le potentiel d'amélioration des marges est limité structurellement."
    },
    {
        name: "NutriSnack",
        sector: "Agroalimentaire",
        description: "Fabricant de snacks sains et bio. Marque forte chez les millennials. Distribution en GMS et e-commerce. Croissance de 20%/an.",
        revenue: 45, ebitda: 7, ebitdaMargin: 16, growth: 20,
        askingMultiple: 11,
        strengths: ["Forte croissance organique", "Tendance de fond favorable (santé, bio)", "Marque à forte notoriété chez les jeunes", "Potentiel d'expansion international"],
        weaknesses: ["Taille encore modeste", "Marges à améliorer vs. concurrents", "Dépendance à la GMS pour la distribution", "Mode potentiellement passagère ?"],
        recommendation: "GO",
        rationale: "Le profil croissance est très attractif dans un marché porteur. La marque forte est un actif clé. L'enjeu sera d'améliorer les marges via l'effet taille et de diversifier la distribution. Le risque de mode est mitigé par la tendance structurelle santé/bio."
    },
    {
        name: "PrintMedia Corp",
        sector: "Médias / Impression",
        description: "Imprimeur traditionnel pour la presse magazine et les catalogues. CA en baisse de 8%/an depuis 5 ans.",
        revenue: 120, ebitda: 10, ebitdaMargin: 8, growth: -8,
        askingMultiple: 4,
        strengths: ["Valorisation très basse (4x)", "Génération de cash à court terme", "Potentiel de consolidation sectorielle"],
        weaknesses: ["Déclin structurel du marché", "Marges faibles et en compression", "Capex de maintenance élevé", "Aucun relais de croissance visible", "Risque social (restructurations)"],
        recommendation: "NO-GO",
        rationale: "Malgré la valorisation basse, c'est un piège de valeur classique. Le déclin est structurel et irréversible (digitalisation). La génération de cash va se dégrader, et les coûts de restructuration viendront absorber les éventuels gains."
    }
];

const QUIZ_QUESTIONS = [
    {
        question: "Quel est l'objectif principal d'un LBO ?",
        options: [
            "Maximiser la croissance du chiffre d'affaires",
            "Générer un rendement élevé sur les fonds propres investis grâce à l'effet de levier",
            "Réduire les impôts de l'entreprise cible",
            "Diversifier le portefeuille d'investissements"
        ],
        correct: 1,
        explanation: "Le LBO utilise la dette pour amplifier le rendement sur les fonds propres (equity). L'effet de levier financier permet de multiplier le TRI si l'entreprise performe bien."
    },
    {
        question: "Qu'est-ce que le \"multiple expansion\" dans un contexte PE ?",
        options: [
            "L'augmentation du nombre de filiales",
            "L'augmentation du multiple de valorisation entre l'entrée et la sortie",
            "L'expansion géographique de l'entreprise",
            "L'augmentation du nombre d'investisseurs dans le fonds"
        ],
        correct: 1,
        explanation: "Le multiple expansion signifie vendre à un multiple EV/EBITDA supérieur à celui d'achat. C'est l'un des 3 leviers de création de valeur en PE (avec la croissance de l'EBITDA et le désendettement)."
    },
    {
        question: "Quel TRI (IRR) minimum un fonds PE vise-t-il généralement ?",
        options: [
            "5-10%",
            "10-15%",
            "20-25%",
            "40-50%"
        ],
        correct: 2,
        explanation: "Les fonds PE visent typiquement un TRI net de 20%+ (brut de 25%+). C'est la prime exigée par les investisseurs pour l'illiquidité et le risque supplémentaire par rapport aux marchés cotés."
    },
    {
        question: "Qu'est-ce qu'un \"covenant\" dans le cadre d'une dette LBO ?",
        options: [
            "Une clause de non-concurrence pour le management",
            "Un engagement financier que l'emprunteur doit respecter vis-à-vis des prêteurs",
            "Le taux d'intérêt de la dette senior",
            "La garantie donnée par le fonds PE"
        ],
        correct: 1,
        explanation: "Les covenants sont des ratios financiers (ex: dette nette / EBITDA < 5x, couverture d'intérêts > 2x) que l'emprunteur doit maintenir. Leur violation peut déclencher un défaut technique."
    },
    {
        question: "Qu'est-ce qu'un \"bolt-on\" ou \"add-on\" en Private Equity ?",
        options: [
            "Un investissement additionnel dans le fonds",
            "Une acquisition complémentaire réalisée par une entreprise du portefeuille",
            "Un refinancement de la dette existante",
            "Un bonus versé au management"
        ],
        correct: 1,
        explanation: "Un bolt-on est une acquisition réalisée par la plateforme (entreprise du portefeuille) pour consolider son marché. C'est une stratégie de build-up classique qui crée de la valeur via les synergies et l'arbitrage de multiple."
    },
    {
        question: "Quelle est la différence entre dette senior et dette mezzanine ?",
        options: [
            "La dette senior a un taux plus élevé",
            "La dette mezzanine est prioritaire en cas de liquidation",
            "La dette senior est remboursée en priorité et a un coût plus faible",
            "Il n'y a pas de différence significative"
        ],
        correct: 2,
        explanation: "La dette senior est prioritaire dans la cascade de paiements (waterfall) et bénéficie de sûretés. Son coût est donc plus faible. La mezzanine, subordonnée, a un taux plus élevé pour compenser le risque supplémentaire."
    },
    {
        question: "Qu'est-ce que le MOIC (Multiple on Invested Capital) ?",
        options: [
            "Le ratio dette/fonds propres",
            "Le rapport entre la valeur de sortie et le capital investi initialement",
            "Le taux de rendement annualisé",
            "Le multiple de valorisation à l'entrée"
        ],
        correct: 1,
        explanation: "Le MOIC mesure combien de fois le capital investi a été multiplié. Un MOIC de 3x signifie que 100M€ investis sont devenus 300M€. Il complète le TRI qui, lui, intègre la dimension temporelle."
    },
    {
        question: "Dans un LBO, d'où provient principalement la création de valeur ?",
        options: [
            "Uniquement de l'effet de levier financier",
            "De la croissance de l'EBITDA, du désendettement, et potentiellement du multiple expansion",
            "Uniquement de la réduction des coûts",
            "De l'augmentation du prix des matières premières"
        ],
        correct: 1,
        explanation: "Les 3 leviers de création de valeur en LBO sont : 1) Croissance de l'EBITDA (organique + acquisitions), 2) Désendettement (remboursement de la dette avec les cash flows), 3) Multiple expansion (vendre plus cher qu'on a acheté en relatif)."
    },
    {
        question: "Qu'est-ce qu'un \"dry powder\" en Private Equity ?",
        options: [
            "Les frais de gestion du fonds",
            "Le capital levé mais pas encore investi",
            "Les dividendes versés aux investisseurs",
            "La trésorerie des entreprises en portefeuille"
        ],
        correct: 1,
        explanation: "Le dry powder représente le capital engagé par les LPs (Limited Partners) mais pas encore déployé par le GP (General Partner). Un dry powder élevé dans l'industrie peut faire monter les valorisations (trop d'argent pour trop peu de deals)."
    },
    {
        question: "Qu'est-ce que le \"carried interest\" (carry) ?",
        options: [
            "Les intérêts de la dette LBO",
            "La commission de performance du GP, typiquement 20% des plus-values au-delà d'un hurdle rate",
            "Le taux d'intérêt porté par les investisseurs",
            "La part de capital investie par les managers"
        ],
        correct: 1,
        explanation: "Le carried interest est la rémunération à la performance du GP. Typiquement 20% des gains au-delà d'un rendement minimum (hurdle rate, souvent 8%). C'est le principal mécanisme d'alignement d'intérêts en PE."
    },
    {
        question: "Qu'est-ce qu'un \"management package\" en LBO ?",
        options: [
            "Le salaire fixe du management",
            "Un programme d'intéressement permettant au management de co-investir et de bénéficier d'un effet de levier sur la création de valeur",
            "Un plan de licenciement des managers",
            "Les frais de conseil en management"
        ],
        correct: 1,
        explanation: "Le management package aligne les intérêts du management avec ceux du fonds PE. Via des outils comme les BSA, les actions de préférence ou l'investissement direct, le management peut capturer une part significative de la création de valeur (ratchet)."
    },
    {
        question: "Quel ratio est le plus utilisé pour mesurer la capacité de remboursement de la dette en LBO ?",
        options: [
            "PER (Price/Earnings Ratio)",
            "Dette nette / EBITDA",
            "Marge brute",
            "ROE (Return on Equity)"
        ],
        correct: 1,
        explanation: "Le ratio Dette nette / EBITDA est le ratio central en LBO. Il mesure en combien d'années l'entreprise pourrait rembourser sa dette avec son EBITDA. Un ratio de 4-5x est typique ; au-delà de 6x, le risque augmente significativement."
    },
    {
        question: "Qu'est-ce qu'un \"LBO secondaire\" (Secondary Buyout - SBO) ?",
        options: [
            "Un LBO réalisé sur une entreprise cotée",
            "La revente d'une entreprise d'un fonds PE à un autre fonds PE",
            "Un deuxième round de financement",
            "Un LBO sur une filiale d'un groupe"
        ],
        correct: 1,
        explanation: "Un SBO est la cession d'une entreprise d'un fonds PE à un autre fonds PE. C'est une voie de sortie très courante. Les critiques soulignent que la création de valeur résiduelle est moindre, mais certains SBO génèrent d'excellents rendements (professionnalisation, build-up, internationalisation)."
    },
    {
        question: "Quelle est la durée de vie typique d'un fonds de Private Equity ?",
        options: [
            "3-4 ans",
            "5-6 ans",
            "10 ans (avec extensions possibles)",
            "20 ans"
        ],
        correct: 2,
        explanation: "Un fonds PE a typiquement une durée de 10 ans : ~5 ans d'investissement puis ~5 ans de gestion et de cessions. Des extensions de 1-2 ans sont possibles avec l'accord des LPs."
    },
    {
        question: "Qu'est-ce que la \"due diligence\" dans un processus d'acquisition ?",
        options: [
            "La négociation du prix",
            "L'audit approfondi de la cible (financier, juridique, opérationnel, commercial, fiscal, social, environnemental)",
            "La rédaction du contrat de vente",
            "La présentation de l'entreprise aux banques"
        ],
        correct: 1,
        explanation: "La due diligence est un processus d'investigation détaillé qui permet de valider les hypothèses d'investissement, identifier les risques, et ajuster le prix. Elle couvre typiquement : finance, juridique, fiscal, social, commercial, IT, environnement."
    },
    {
        question: "Qu'est-ce que le \"vendor due diligence\" (VDD) ?",
        options: [
            "L'audit réalisé par le vendeur sur l'acheteur",
            "Un rapport d'audit commandé par le vendeur et mis à disposition des acheteurs potentiels",
            "La vérification des fournisseurs de l'entreprise",
            "L'évaluation du vendeur par ses pairs"
        ],
        correct: 1,
        explanation: "La VDD est commandée par le vendeur avant le processus de vente. Elle fournit aux acheteurs potentiels une base commune d'information, accélère le processus et permet au vendeur de contrôler le narratif. Les acheteurs réalisent généralement aussi leur propre due diligence (buy-side DD)."
    },
    {
        question: "Qu'est-ce qu'un \"club deal\" en PE ?",
        options: [
            "Un investissement dans le secteur des loisirs",
            "Un investissement conjoint de plusieurs fonds PE dans une même cible",
            "Un fonds réservé aux family offices",
            "Une association de LP"
        ],
        correct: 1,
        explanation: "Un club deal réunit plusieurs fonds PE pour acquérir une cible de grande taille qu'aucun fonds ne pourrait (ou ne voudrait) acquérir seul. Cela permet de partager le risque et de mobiliser plus de capital."
    },
    {
        question: "Qu'est-ce que le \"J-curve\" en Private Equity ?",
        options: [
            "La courbe de croissance du CA d'une cible",
            "La courbe des rendements d'un fonds PE qui commence négatif (frais, investissements) avant de devenir positif (cessions)",
            "La courbe des taux d'intérêt",
            "La forme de la courbe d'apprentissage du management"
        ],
        correct: 1,
        explanation: "La J-curve illustre le profil de rendement d'un fonds PE dans le temps : rendement négatif les premières années (frais de gestion, capital appelé, investissements non encore valorisés) puis positif à mesure que les cessions génèrent des plus-values."
    },
    {
        question: "Comment calcule-t-on la valeur des fonds propres (Equity Value) à partir de l'Enterprise Value ?",
        options: [
            "Equity Value = EV + Dette nette",
            "Equity Value = EV - Dette nette",
            "Equity Value = EV × Multiple",
            "Equity Value = EV / Nombre d'actions"
        ],
        correct: 1,
        explanation: "Equity Value = Enterprise Value - Dette nette (où dette nette = dette financière - trésorerie). C'est le \"bridge\" fondamental entre valeur d'entreprise et valeur pour les actionnaires. On y ajoute parfois des ajustements (provisions retraites, minoritaires, etc.)."
    },
    {
        question: "Qu'est-ce que le \"waterfall\" (cascade de distribution) en PE ?",
        options: [
            "Le plan de remboursement de la dette",
            "L'ordre de priorité dans la distribution des gains entre LP et GP (retour du capital, preferred return, catch-up, carried interest)",
            "La stratégie de sortie progressive",
            "Le calendrier d'appel de fonds"
        ],
        correct: 1,
        explanation: "Le waterfall définit comment les gains sont distribués : 1) Retour du capital investi aux LP, 2) Preferred return (hurdle rate ~8%), 3) Catch-up pour le GP, 4) Split 80/20 (LP/GP). Ce mécanisme protège les LP et aligne les intérêts."
    }
];
