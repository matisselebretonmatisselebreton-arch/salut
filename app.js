(function () {
    const state = {
        exercises: 0,
        scores: [],
        streak: 0,
        screeningDecision: null,
        quizCurrent: 0,
        quizCorrect: 0,
        quizAnswered: 0,
        quizQuestions: [],
    };

    function loadStats() {
        try {
            const saved = JSON.parse(localStorage.getItem("pe_stats"));
            if (saved) {
                state.exercises = saved.exercises || 0;
                state.scores = saved.scores || [];
                state.streak = saved.streak || 0;
            }
        } catch (_) {}
        updateStatsDisplay();
    }

    function saveStats() {
        localStorage.setItem("pe_stats", JSON.stringify({ exercises: state.exercises, scores: state.scores, streak: state.streak }));
    }

    function updateStatsDisplay() {
        document.getElementById("stat-exercises").textContent = state.exercises;
        const avg = state.scores.length ? Math.round(state.scores.reduce((a, b) => a + b, 0) / state.scores.length) : 0;
        document.getElementById("stat-score").textContent = avg + "%";
        document.getElementById("stat-streak").textContent = state.streak;
    }

    function recordResult(scorePercent) {
        state.exercises++;
        state.scores.push(scorePercent);
        if (state.scores.length > 50) state.scores.shift();
        if (scorePercent >= 60) state.streak++;
        else state.streak = 0;
        saveStats();
        updateStatsDisplay();
    }

    // Navigation
    document.querySelectorAll("[data-section]").forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            showSection(this.dataset.section);
        });
    });

    document.querySelectorAll("[data-target]").forEach(function (card) {
        card.addEventListener("click", function () {
            showSection(this.dataset.target);
        });
    });

    function showSection(id) {
        document.querySelectorAll(".section").forEach(function (s) { s.classList.remove("active"); });
        document.getElementById(id).classList.add("active");
        document.querySelectorAll("[data-section]").forEach(function (a) {
            a.classList.toggle("active", a.dataset.section === id);
        });
        if (id === "lbo") generateLBO();
        if (id === "valuation") generateValuation();
        if (id === "screening") generateScreening();
        if (id === "quiz") startQuiz();
    }

    // ===== LBO MODULE =====
    let currentLBO = null;

    function generateLBO() {
        currentLBO = LBO_SCENARIOS[Math.floor(Math.random() * LBO_SCENARIOS.length)];
        const s = currentLBO;
        document.getElementById("lbo-scenario").innerHTML =
            "<h3>" + s.name + " — " + s.sector + "</h3>" +
            "<p>" + s.description + "</p>" +
            "<p><span class='kpi'>CA: " + s.revenue + "M€</span> " +
            "<span class='kpi'>EBITDA: " + s.ebitda + "M€</span> " +
            "<span class='kpi'>Marge: " + s.ebitdaMargin + "%</span> " +
            "<span class='kpi'>Dette nette: " + s.netDebt + "M€</span> " +
            "<span class='kpi'>Capex: " + s.capexPercent + "% du CA</span> " +
            "<span class='kpi'>BFR: " + s.nwcPercent + "% du CA</span></p>" +
            "<p><em>" + s.hint + "</em></p>";
        document.getElementById("lbo-results").classList.add("hidden");
        ["lbo-entry-multiple", "lbo-leverage", "lbo-interest-rate", "lbo-exit-multiple", "lbo-ebitda-growth", "lbo-hold-period"].forEach(function (id) {
            document.getElementById(id).value = "";
        });
    }

    document.getElementById("lbo-calculate").addEventListener("click", calculateLBO);
    document.getElementById("lbo-next").addEventListener("click", generateLBO);

    function calculateLBO() {
        var s = currentLBO;
        var entryMult = parseFloat(document.getElementById("lbo-entry-multiple").value);
        var leverage = parseFloat(document.getElementById("lbo-leverage").value);
        var rate = parseFloat(document.getElementById("lbo-interest-rate").value) / 100;
        var exitMult = parseFloat(document.getElementById("lbo-exit-multiple").value);
        var growth = parseFloat(document.getElementById("lbo-ebitda-growth").value) / 100;
        var years = parseInt(document.getElementById("lbo-hold-period").value);

        if ([entryMult, leverage, rate, exitMult, growth, years].some(isNaN)) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        var ev = entryMult * s.ebitda;
        var debt = leverage * s.ebitda;
        var equity = ev - debt;
        if (equity <= 0) {
            showLBOResult("Erreur : le levier est trop élevé, les fonds propres sont négatifs.", "error", 0);
            return;
        }

        var ebitda = s.ebitda;
        var totalDebtRepaid = 0;
        var yearlyData = [];

        for (var y = 1; y <= years; y++) {
            ebitda = ebitda * (1 + growth);
            var revenue = s.revenue * Math.pow(1 + growth, y);
            var interest = (debt - totalDebtRepaid) * rate;
            var capex = revenue * (s.capexPercent / 100);
            var taxableIncome = ebitda - interest - capex;
            var tax = Math.max(0, taxableIncome * s.taxRate / 100);
            var fcf = ebitda - interest - tax - capex;
            totalDebtRepaid += Math.max(0, Math.min(fcf * 0.7, debt - totalDebtRepaid));
            yearlyData.push({ year: y, ebitda: ebitda.toFixed(1), fcf: fcf.toFixed(1), debtRemaining: (debt - totalDebtRepaid).toFixed(1) });
        }

        var exitEV = exitMult * ebitda;
        var remainingDebt = debt - totalDebtRepaid;
        var exitEquity = exitEV - remainingDebt;
        var moic = exitEquity / equity;
        var irr = (Math.pow(moic, 1 / years) - 1) * 100;

        var score = 0;
        if (irr >= 25) score = 100;
        else if (irr >= 20) score = 80;
        else if (irr >= 15) score = 60;
        else if (irr >= 10) score = 40;
        else score = 20;

        if (leverage > 6) score = Math.max(0, score - 20);

        var html = "<h4>Résultats de votre LBO</h4>" +
            "<div class='result-row'><span class='label'>Valeur d'entreprise (entrée)</span><span class='value'>" + ev.toFixed(0) + "M€</span></div>" +
            "<div class='result-row'><span class='label'>Dette initiale</span><span class='value'>" + debt.toFixed(0) + "M€</span></div>" +
            "<div class='result-row'><span class='label'>Equity investi</span><span class='value'>" + equity.toFixed(0) + "M€</span></div>" +
            "<div class='result-row'><span class='label'>EBITDA de sortie</span><span class='value'>" + ebitda.toFixed(1) + "M€</span></div>" +
            "<div class='result-row'><span class='label'>EV de sortie</span><span class='value'>" + exitEV.toFixed(0) + "M€</span></div>" +
            "<div class='result-row'><span class='label'>Dette résiduelle</span><span class='value'>" + remainingDebt.toFixed(0) + "M€</span></div>" +
            "<div class='result-row'><span class='label'>Equity de sortie</span><span class='value'>" + exitEquity.toFixed(0) + "M€</span></div>" +
            "<div class='result-row'><span class='label'>MOIC</span><span class='value " + (moic >= 2.5 ? "correct" : moic >= 2 ? "" : "incorrect") + "'>" + moic.toFixed(2) + "x</span></div>" +
            "<div class='result-row'><span class='label'>TRI (IRR)</span><span class='value " + (irr >= 20 ? "correct" : irr >= 15 ? "" : "incorrect") + "'>" + irr.toFixed(1) + "%</span></div>" +
            "<hr style='margin:0.8rem 0'>" +
            "<h4>Évolution annuelle</h4>" +
            "<table style='width:100%;font-size:0.85rem;border-collapse:collapse'><tr><th>Année</th><th>EBITDA</th><th>FCF</th><th>Dette restante</th></tr>";
        yearlyData.forEach(function (d) {
            html += "<tr><td>" + d.year + "</td><td>" + d.ebitda + "M€</td><td>" + d.fcf + "M€</td><td>" + d.debtRemaining + "M€</td></tr>";
        });
        html += "</table><hr style='margin:0.8rem 0'>";

        if (irr >= 25) html += "<p class='correct'><strong>Excellent !</strong> Ce LBO génère un TRI supérieur à 25%. Le deal est très attractif pour un fonds PE.</p>";
        else if (irr >= 20) html += "<p class='correct'><strong>Bon rendement.</strong> Un TRI de ~20% atteint le seuil minimum pour la plupart des fonds PE.</p>";
        else if (irr >= 15) html += "<p><strong>Rendement modéré.</strong> Un TRI de 15-20% peut être insuffisant pour un fonds PE classique.</p>";
        else html += "<p class='incorrect'><strong>Rendement insuffisant.</strong> Un TRI inférieur à 15% ne justifie généralement pas le risque d'un LBO.</p>";

        if (leverage > 5.5) html += "<p class='incorrect'>Attention : un levier de " + leverage.toFixed(1) + "x est agressif. Les prêteurs pourraient refuser ce niveau d'endettement.</p>";

        var cls = irr >= 20 ? "success" : irr >= 15 ? "warning" : "error";
        showLBOResult(html, cls, score);
    }

    function showLBOResult(html, cls, score) {
        var box = document.getElementById("lbo-results");
        box.innerHTML = html;
        box.className = "results-box " + cls;
        box.classList.remove("hidden");
        if (score > 0) recordResult(score);
    }

    // ===== VALUATION MODULE =====
    let currentVal = null;

    // Tabs
    document.querySelectorAll(".tab").forEach(function (tab) {
        tab.addEventListener("click", function () {
            document.querySelectorAll(".tab").forEach(function (t) { t.classList.remove("active"); });
            document.querySelectorAll(".tab-content").forEach(function (c) { c.classList.remove("active"); });
            this.classList.add("active");
            document.getElementById("tab-" + this.dataset.tab).classList.add("active");
        });
    });

    function generateValuation() {
        currentVal = VALUATION_SCENARIOS[Math.floor(Math.random() * VALUATION_SCENARIOS.length)];
        var s = currentVal;
        var peersHtml = "<table style='width:100%;font-size:0.85rem;border-collapse:collapse;margin-top:0.5rem'>" +
            "<tr><th>Comparable</th><th>EV/EBITDA</th><th>EV/Revenue</th></tr>";
        for (var i = 0; i < s.peerNames.length; i++) {
            peersHtml += "<tr><td>" + s.peerNames[i] + "</td><td>" + s.peerEvEbitda[i].toFixed(1) + "x</td><td>" + s.peerEvRevenue[i].toFixed(1) + "x</td></tr>";
        }
        peersHtml += "</table>";

        var fcfHtml = s.fcf.map(function (f, i) { return "Année " + (i + 1) + ": " + f + "M€"; }).join(" | ");

        document.getElementById("valuation-scenario").innerHTML =
            "<h3>" + s.name + " — " + s.sector + "</h3>" +
            "<p>" + s.description + "</p>" +
            "<p><span class='kpi'>CA: " + s.revenue + "M€</span> " +
            "<span class='kpi'>EBITDA: " + s.ebitda + "M€</span> " +
            "<span class='kpi'>Marge: " + s.ebitdaMargin + "%</span> " +
            "<span class='kpi'>Dette nette: " + s.netDebt + "M€</span> " +
            "<span class='kpi'>Croissance: " + s.growth + "%</span></p>" +
            "<h4>Comparables boursiers</h4>" + peersHtml +
            "<h4 style='margin-top:0.8rem'>FCF projetés (pour DCF)</h4><p style='font-size:0.85rem'>" + fcfHtml + "</p>";

        document.getElementById("valuation-results").classList.add("hidden");
        ["val-ev-ebitda", "val-ev-revenue", "val-ev", "val-equity", "dcf-wacc", "dcf-terminal-growth", "dcf-terminal-value", "dcf-ev"].forEach(function (id) {
            document.getElementById(id).value = "";
        });
    }

    document.getElementById("val-check-multiples").addEventListener("click", checkMultiples);
    document.getElementById("dcf-check").addEventListener("click", checkDCF);
    document.getElementById("valuation-next").addEventListener("click", generateValuation);

    function checkMultiples() {
        var s = currentVal;
        var userEvEbitda = parseFloat(document.getElementById("val-ev-ebitda").value);
        var userEvRev = parseFloat(document.getElementById("val-ev-revenue").value);
        var userEV = parseFloat(document.getElementById("val-ev").value);
        var userEquity = parseFloat(document.getElementById("val-equity").value);

        if ([userEvEbitda, userEvRev, userEV, userEquity].some(isNaN)) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        var avgEvEbitda = s.peerEvEbitda.reduce(function (a, b) { return a + b; }, 0) / s.peerEvEbitda.length;
        var avgEvRev = s.peerEvRevenue.reduce(function (a, b) { return a + b; }, 0) / s.peerEvRevenue.length;
        var impliedEV_ebitda = avgEvEbitda * s.ebitda;
        var impliedEV_rev = avgEvRev * s.revenue;
        var impliedEV = (impliedEV_ebitda + impliedEV_rev) / 2;
        var impliedEquity = impliedEV - s.netDebt;

        var evDiff = Math.abs(userEV - impliedEV) / impliedEV * 100;
        var eqDiff = Math.abs(userEquity - impliedEquity) / impliedEquity * 100;
        var multDiff1 = Math.abs(userEvEbitda - avgEvEbitda) / avgEvEbitda * 100;
        var multDiff2 = Math.abs(userEvRev - avgEvRev) / avgEvRev * 100;

        var score = 100 - (evDiff + eqDiff + multDiff1 + multDiff2) / 4;
        score = Math.max(0, Math.min(100, Math.round(score)));

        var cls = score >= 70 ? "success" : score >= 40 ? "warning" : "error";

        var html = "<h4>Résultats — Méthode des Multiples</h4>" +
            "<div class='result-row'><span class='label'>EV/EBITDA médian des peers</span><span class='value'>" + avgEvEbitda.toFixed(1) + "x</span></div>" +
            "<div class='result-row'><span class='label'>Votre EV/EBITDA</span><span class='value " + (multDiff1 < 15 ? "correct" : "incorrect") + "'>" + userEvEbitda.toFixed(1) + "x</span></div>" +
            "<div class='result-row'><span class='label'>EV/Revenue médian des peers</span><span class='value'>" + avgEvRev.toFixed(1) + "x</span></div>" +
            "<div class='result-row'><span class='label'>Votre EV/Revenue</span><span class='value " + (multDiff2 < 15 ? "correct" : "incorrect") + "'>" + userEvRev.toFixed(1) + "x</span></div>" +
            "<hr style='margin:0.8rem 0'>" +
            "<div class='result-row'><span class='label'>EV implicite (moyenne méthodes)</span><span class='value'>" + impliedEV.toFixed(0) + "M€</span></div>" +
            "<div class='result-row'><span class='label'>Votre EV</span><span class='value " + (evDiff < 15 ? "correct" : "incorrect") + "'>" + userEV.toFixed(0) + "M€ (" + (evDiff < 15 ? "±" + evDiff.toFixed(0) + "%" : "écart de " + evDiff.toFixed(0) + "%") + ")</span></div>" +
            "<div class='result-row'><span class='label'>Equity Value implicite</span><span class='value'>" + impliedEquity.toFixed(0) + "M€</span></div>" +
            "<div class='result-row'><span class='label'>Votre Equity Value</span><span class='value " + (eqDiff < 15 ? "correct" : "incorrect") + "'>" + userEquity.toFixed(0) + "M€</span></div>" +
            "<p style='margin-top:0.8rem'><strong>Score : " + score + "/100</strong></p>";

        var box = document.getElementById("valuation-results");
        box.innerHTML = html;
        box.className = "results-box " + cls;
        box.classList.remove("hidden");
        recordResult(score);
    }

    function checkDCF() {
        var s = currentVal;
        var wacc = parseFloat(document.getElementById("dcf-wacc").value) / 100;
        var termGrowth = parseFloat(document.getElementById("dcf-terminal-growth").value) / 100;
        var userTV = parseFloat(document.getElementById("dcf-terminal-value").value);
        var userEV = parseFloat(document.getElementById("dcf-ev").value);

        if ([wacc, termGrowth, userTV, userEV].some(isNaN)) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        if (wacc <= termGrowth) {
            alert("Le WACC doit être supérieur au taux de croissance terminal.");
            return;
        }

        var lastFCF = s.fcf[s.fcf.length - 1];
        var correctTV = (lastFCF * (1 + termGrowth)) / (wacc - termGrowth);
        var pvFCF = 0;
        for (var i = 0; i < s.fcf.length; i++) {
            pvFCF += s.fcf[i] / Math.pow(1 + wacc, i + 1);
        }
        var pvTV = correctTV / Math.pow(1 + wacc, s.fcf.length);
        var correctEV = pvFCF + pvTV;

        var tvDiff = Math.abs(userTV - correctTV) / correctTV * 100;
        var evDiff = Math.abs(userEV - correctEV) / correctEV * 100;

        var score = 100 - (tvDiff + evDiff) / 2;
        score = Math.max(0, Math.min(100, Math.round(score)));
        var cls = score >= 70 ? "success" : score >= 40 ? "warning" : "error";

        var html = "<h4>Résultats — DCF</h4>" +
            "<div class='result-row'><span class='label'>WACC utilisé</span><span class='value'>" + (wacc * 100).toFixed(1) + "%</span></div>" +
            "<div class='result-row'><span class='label'>Taux de croissance terminal</span><span class='value'>" + (termGrowth * 100).toFixed(1) + "%</span></div>" +
            "<div class='result-row'><span class='label'>Valeur terminale correcte</span><span class='value'>" + correctTV.toFixed(0) + "M€</span></div>" +
            "<div class='result-row'><span class='label'>Votre valeur terminale</span><span class='value " + (tvDiff < 15 ? "correct" : "incorrect") + "'>" + userTV.toFixed(0) + "M€</span></div>" +
            "<div class='result-row'><span class='label'>VA des FCF</span><span class='value'>" + pvFCF.toFixed(0) + "M€</span></div>" +
            "<div class='result-row'><span class='label'>VA de la valeur terminale</span><span class='value'>" + pvTV.toFixed(0) + "M€</span></div>" +
            "<div class='result-row'><span class='label'>EV (DCF) correcte</span><span class='value'>" + correctEV.toFixed(0) + "M€</span></div>" +
            "<div class='result-row'><span class='label'>Votre EV</span><span class='value " + (evDiff < 15 ? "correct" : "incorrect") + "'>" + userEV.toFixed(0) + "M€</span></div>" +
            "<p style='margin-top:0.8rem'><strong>Score : " + score + "/100</strong></p>";

        var box = document.getElementById("valuation-results");
        box.innerHTML = html;
        box.className = "results-box " + cls;
        box.classList.remove("hidden");
        recordResult(score);
    }

    // ===== SCREENING MODULE =====
    let currentDeal = null;

    function generateScreening() {
        currentDeal = SCREENING_DEALS[Math.floor(Math.random() * SCREENING_DEALS.length)];
        var d = currentDeal;
        document.getElementById("screening-scenario").innerHTML =
            "<h3>" + d.name + " — " + d.sector + "</h3>" +
            "<p>" + d.description + "</p>" +
            "<p><span class='kpi'>CA: " + d.revenue + "M€</span> " +
            "<span class='kpi'>EBITDA: " + d.ebitda + "M€</span> " +
            "<span class='kpi'>Marge: " + d.ebitdaMargin + "%</span> " +
            "<span class='kpi'>Croissance: " + d.growth + "%</span> " +
            "<span class='kpi'>Multiple demandé: " + d.askingMultiple + "x</span></p>" +
            "<h4>Points forts</h4><ul>" + d.strengths.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ul>" +
            "<h4>Points faibles / Risques</h4><ul>" + d.weaknesses.map(function (w) { return "<li>" + w + "</li>"; }).join("") + "</ul>";

        state.screeningDecision = null;
        document.getElementById("screen-go").classList.remove("selected");
        document.getElementById("screen-nogo").classList.remove("selected");
        document.getElementById("screen-rationale").value = "";
        document.getElementById("screening-results").classList.add("hidden");
        ["screen-business", "screen-barriers", "screen-growth", "screen-ops", "screen-mgmt", "screen-valuation"].forEach(function (id) {
            document.getElementById(id).value = "";
        });
    }

    document.getElementById("screen-go").addEventListener("click", function () {
        state.screeningDecision = "GO";
        this.classList.add("selected");
        document.getElementById("screen-nogo").classList.remove("selected");
    });

    document.getElementById("screen-nogo").addEventListener("click", function () {
        state.screeningDecision = "NO-GO";
        this.classList.add("selected");
        document.getElementById("screen-go").classList.remove("selected");
    });

    document.getElementById("screen-submit").addEventListener("click", submitScreening);
    document.getElementById("screening-next").addEventListener("click", generateScreening);

    function submitScreening() {
        if (!state.screeningDecision) {
            alert("Veuillez choisir GO ou NO-GO.");
            return;
        }

        var selects = ["screen-business", "screen-barriers", "screen-growth", "screen-ops", "screen-mgmt", "screen-valuation"];
        var allFilled = selects.every(function (id) { return document.getElementById(id).value !== ""; });
        if (!allFilled) {
            alert("Veuillez remplir tous les critères d'évaluation.");
            return;
        }

        var d = currentDeal;
        var correct = state.screeningDecision === d.recommendation;
        var score = correct ? 80 : 30;
        var rationale = document.getElementById("screen-rationale").value.trim();
        if (rationale.length > 30) score += 20;
        score = Math.min(100, score);

        var html = "<h4>" + (correct ? "Bonne décision !" : "Décision incorrecte") + "</h4>" +
            "<div class='result-row'><span class='label'>Votre décision</span><span class='value " + (correct ? "correct" : "incorrect") + "'>" + state.screeningDecision + "</span></div>" +
            "<div class='result-row'><span class='label'>Décision recommandée</span><span class='value'>" + d.recommendation + "</span></div>" +
            "<hr style='margin:0.8rem 0'>" +
            "<h4>Analyse de référence</h4>" +
            "<p>" + d.rationale + "</p>" +
            "<p style='margin-top:0.8rem'><strong>Score : " + score + "/100</strong></p>";

        var box = document.getElementById("screening-results");
        box.innerHTML = html;
        box.className = "results-box " + (correct ? "success" : "error");
        box.classList.remove("hidden");
        recordResult(score);
    }

    // ===== QUIZ MODULE =====
    function startQuiz() {
        state.quizCurrent = 0;
        state.quizCorrect = 0;
        state.quizAnswered = 0;
        state.quizQuestions = shuffle(QUIZ_QUESTIONS.slice()).slice(0, 10);
        document.getElementById("quiz-final").classList.add("hidden");
        document.getElementById("quiz-restart").classList.add("hidden");
        showQuizQuestion();
    }

    function shuffle(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        }
        return arr;
    }

    function showQuizQuestion() {
        if (state.quizCurrent >= state.quizQuestions.length) {
            showQuizFinal();
            return;
        }

        var q = state.quizQuestions[state.quizCurrent];
        document.getElementById("quiz-counter").textContent = "Question " + (state.quizCurrent + 1) + "/" + state.quizQuestions.length;
        document.getElementById("quiz-progress-fill").style.width = (state.quizCurrent / state.quizQuestions.length * 100) + "%";
        document.getElementById("quiz-score-display").textContent = "Score: " + state.quizCorrect + "/" + state.quizAnswered;
        document.getElementById("quiz-question").innerHTML = "<h3>Question " + (state.quizCurrent + 1) + "</h3><p>" + q.question + "</p>";

        var optionsDiv = document.getElementById("quiz-options");
        optionsDiv.innerHTML = "";
        q.options.forEach(function (opt, i) {
            var div = document.createElement("div");
            div.className = "quiz-option";
            div.textContent = opt;
            div.addEventListener("click", function () { answerQuiz(i); });
            optionsDiv.appendChild(div);
        });

        document.getElementById("quiz-feedback").classList.add("hidden");
        document.getElementById("quiz-next").classList.add("hidden");
    }

    function answerQuiz(selected) {
        var q = state.quizQuestions[state.quizCurrent];
        var options = document.querySelectorAll(".quiz-option");
        options.forEach(function (opt, i) {
            opt.classList.add("disabled");
            if (i === q.correct) opt.classList.add("correct");
            if (i === selected && i !== q.correct) opt.classList.add("incorrect");
        });

        state.quizAnswered++;
        var correct = selected === q.correct;
        if (correct) state.quizCorrect++;

        var fb = document.getElementById("quiz-feedback");
        fb.innerHTML = "<h4>" + (correct ? "Correct !" : "Incorrect") + "</h4><p>" + q.explanation + "</p>";
        fb.className = "results-box " + (correct ? "success" : "error");
        fb.classList.remove("hidden");

        document.getElementById("quiz-score-display").textContent = "Score: " + state.quizCorrect + "/" + state.quizAnswered;
        document.getElementById("quiz-next").classList.remove("hidden");
    }

    document.getElementById("quiz-next").addEventListener("click", function () {
        state.quizCurrent++;
        showQuizQuestion();
    });

    document.getElementById("quiz-restart").addEventListener("click", startQuiz);

    function showQuizFinal() {
        var pct = Math.round(state.quizCorrect / state.quizQuestions.length * 100);
        document.getElementById("quiz-progress-fill").style.width = "100%";
        document.getElementById("quiz-question").innerHTML = "";
        document.getElementById("quiz-options").innerHTML = "";
        document.getElementById("quiz-feedback").classList.add("hidden");
        document.getElementById("quiz-next").classList.add("hidden");

        var msg = pct >= 80 ? "Excellent ! Vous maîtrisez les fondamentaux du PE." :
                  pct >= 60 ? "Bon niveau. Quelques révisions suffiront." :
                  pct >= 40 ? "Des bases à consolider. Revoyez les concepts clés." :
                  "Il est temps de réviser les fondamentaux du Private Equity.";

        document.getElementById("quiz-final").innerHTML =
            "<h4>Quiz terminé !</h4>" +
            "<p>Score final : <strong>" + state.quizCorrect + "/" + state.quizQuestions.length + " (" + pct + "%)</strong></p>" +
            "<p>" + msg + "</p>";
        document.getElementById("quiz-final").className = "results-box " + (pct >= 60 ? "success" : pct >= 40 ? "warning" : "error");
        document.getElementById("quiz-final").classList.remove("hidden");
        document.getElementById("quiz-restart").classList.remove("hidden");
        recordResult(pct);
    }

    // Init
    loadStats();
})();
