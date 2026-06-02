(function () {
    var state = {
        exercises: 0, scores: [], streak: 0, bestScore: 0, history: [],
        screeningDecision: null, scpiDecision: null,
        quizCurrent: 0, quizCorrect: 0, quizAnswered: 0, quizQuestions: [],
        valLoaded: false, scpiLoaded: false, screeningLoaded: false, quizStarted: false,
        valSeenIndices: [], scpiSeenIndices: [], screeningSeenIndices: [],
        timerInterval: null, timerSeconds: 0, timerTotal: 0
    };

    function loadStats() {
        try {
            var saved = JSON.parse(localStorage.getItem("re_stats_v2"));
            if (saved) { state.exercises = saved.exercises||0; state.scores = saved.scores||[]; state.streak = saved.streak||0; state.bestScore = saved.bestScore||0; state.history = saved.history||[]; }
        } catch (_) {}
        var theme = localStorage.getItem("pe_theme");
        if (theme === "dark") document.body.setAttribute("data-theme", "dark");
        updateStatsDisplay();
    }

    function saveStats() {
        localStorage.setItem("re_stats_v2", JSON.stringify({ exercises: state.exercises, scores: state.scores, streak: state.streak, bestScore: state.bestScore, history: state.history }));
    }

    function updateStatsDisplay() {
        document.getElementById("stat-exercises").textContent = state.exercises;
        var avg = state.scores.length ? Math.round(state.scores.reduce(function(a,b){return a+b;},0)/state.scores.length) : 0;
        document.getElementById("stat-score").textContent = avg + "%";
        document.getElementById("stat-streak").textContent = state.streak;
        document.getElementById("stat-best").textContent = state.bestScore + "%";
    }

    function recordResult(scorePercent, module, title) {
        state.exercises++;
        state.scores.push(scorePercent);
        if (state.scores.length > 100) state.scores.shift();
        if (scorePercent >= 60) state.streak++; else state.streak = 0;
        if (scorePercent > state.bestScore) state.bestScore = scorePercent;
        state.history.unshift({ date: new Date().toISOString(), module: module, title: title, score: scorePercent });
        if (state.history.length > 50) state.history.pop();
        saveStats(); updateStatsDisplay();
    }

    // Dark mode
    document.getElementById("dark-mode-toggle").addEventListener("click", function () {
        var isDark = document.body.getAttribute("data-theme") === "dark";
        if (isDark) { document.body.removeAttribute("data-theme"); localStorage.setItem("pe_theme", "light"); }
        else { document.body.setAttribute("data-theme", "dark"); localStorage.setItem("pe_theme", "dark"); }
    });

    // Navigation
    document.querySelectorAll("[data-section]").forEach(function (link) {
        link.addEventListener("click", function (e) { e.preventDefault(); showSection(this.dataset.section); });
    });
    document.querySelectorAll("[data-target]").forEach(function (card) {
        card.addEventListener("click", function () { showSection(this.dataset.target); });
    });

    function showSection(id) {
        document.querySelectorAll(".section").forEach(function (s) { s.classList.remove("active"); });
        document.getElementById(id).classList.add("active");
        document.querySelectorAll("[data-section]").forEach(function (a) { a.classList.toggle("active", a.dataset.section === id); });
        if (id === "valuation" && !state.valLoaded) { generateValuation(); state.valLoaded = true; }
        if (id === "scpi" && !state.scpiLoaded) { generateSCPI(); state.scpiLoaded = true; }
        if (id === "screening" && !state.screeningLoaded) { generateScreening(); state.screeningLoaded = true; }
        if (id === "quiz" && !state.quizStarted) { startQuiz(); state.quizStarted = true; }
        if (id === "history") renderHistory();
        if (id === "home") updateStatsDisplay();
    }

    function shuffle(arr) { for(var i=arr.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=arr[i];arr[i]=arr[j];arr[j]=t;} return arr; }
    function median(arr) { var s=arr.slice().sort(function(a,b){return a-b;}); var m=Math.floor(s.length/2); return s.length%2?s[m]:(s[m-1]+s[m])/2; }
    function pickNext(scenarios, seenKey) {
        if (state[seenKey].length >= scenarios.length) state[seenKey] = [];
        var avail = []; for (var i=0;i<scenarios.length;i++) if(state[seenKey].indexOf(i)===-1) avail.push(i);
        var idx = avail[Math.floor(Math.random()*avail.length)];
        state[seenKey].push(idx); return scenarios[idx];
    }
    function pickNextFiltered(scenarios, seenKey, difficulty) {
        var filtered = [];
        for (var i = 0; i < scenarios.length; i++) {
            if (!difficulty || difficulty === "all" || scenarios[i].difficulty === difficulty) filtered.push(i);
        }
        if (!filtered.length) filtered = scenarios.map(function(_, i) { return i; });
        var avail = filtered.filter(function(i) { return state[seenKey].indexOf(i) === -1; });
        if (!avail.length) { state[seenKey] = []; avail = filtered; }
        var idx = avail[Math.floor(Math.random() * avail.length)];
        state[seenKey].push(idx);
        return scenarios[idx];
    }

    // ===== TIMER =====
    function startTimer() {
        stopTimer();
        var mins = parseInt(document.getElementById("val-timer-duration").value) || 20;
        state.timerTotal = mins * 60;
        state.timerSeconds = state.timerTotal;
        var bar = document.getElementById("timer-bar");
        bar.classList.remove("hidden");
        updateTimerDisplay();
        state.timerInterval = setInterval(function () {
            state.timerSeconds--;
            updateTimerDisplay();
            if (state.timerSeconds <= 0) { stopTimer(); alert("Temps écoulé !"); }
        }, 1000);
    }

    function stopTimer() {
        if (state.timerInterval) { clearInterval(state.timerInterval); state.timerInterval = null; }
        document.getElementById("timer-bar").classList.add("hidden");
    }

    function updateTimerDisplay() {
        var m = Math.floor(state.timerSeconds / 60), s = state.timerSeconds % 60;
        document.getElementById("timer-display").textContent = m + ":" + (s < 10 ? "0" : "") + s;
        var pct = (state.timerSeconds / state.timerTotal) * 100;
        var fill = document.getElementById("timer-fill");
        fill.style.width = pct + "%";
        fill.style.background = pct > 25 ? "var(--accent)" : pct > 10 ? "var(--warning)" : "var(--error)";
    }

    document.getElementById("val-timer-toggle").addEventListener("change", function () {
        if (this.checked) startTimer(); else stopTimer();
    });

    document.getElementById("val-difficulty").addEventListener("change", function () {
        state.valLoaded = false;
        generateValuation();
        state.valLoaded = true;
    });

    // ===== VALUATION =====
    var currentVal = null;

    function generateValuation() {
        var diff = document.getElementById("val-difficulty").value;
        currentVal = pickNextFiltered(RE_VALUATION_SCENARIOS, "valSeenIndices", diff);
        var s = currentVal;
        var loyerEffectif = s.loyerTotal * (s.tof / 100);
        var peersHtml = "<table style='width:100%;font-size:0.85rem;border-collapse:collapse;margin-top:0.5rem'><tr><th>Comparable</th><th>Taux de capi</th></tr>";
        for (var i=0;i<s.peerNames.length;i++) peersHtml += "<tr><td>"+s.peerNames[i]+"</td><td>"+s.peerCapRates[i].toFixed(1)+"%</td></tr>";
        peersHtml += "</table>";
        var fcfHtml = s.cashflows.map(function(f,i){return "Année "+(i+1)+": "+f.toLocaleString("fr-FR")+"€";}).join(" | ");

        document.getElementById("val-scenario").innerHTML =
            "<h3>"+s.name+" — "+s.type+"</h3>" +
            "<p><em>"+s.location+"</em></p>" +
            "<p>"+s.description+"</p>" +
            "<p><span class='kpi'>Surface: "+s.surface.toLocaleString("fr-FR")+" m²</span> " +
            "<span class='kpi'>Loyer: "+s.loyer_m2+"€/m²/an</span> " +
            "<span class='kpi'>TOF: "+s.tof+"%</span> " +
            "<span class='kpi'>Loyer total: "+loyerEffectif.toLocaleString("fr-FR")+"€</span> " +
            "<span class='kpi'>Charges proprio: "+s.chargesTotal.toLocaleString("fr-FR")+"€</span> " +
            "<span class='kpi'>Capex annuel: "+s.capexAnnuel.toLocaleString("fr-FR")+"€</span> " +
            "<span class='kpi'>Frais gestion: "+s.fraisGestion+"%</span></p>" +
            "<h4>Comparables (taux de capitalisation)</h4>" + peersHtml +
            "<h4 style='margin-top:0.8rem'>Cash flows nets projetés (pour DCF)</h4><p style='font-size:0.85rem'>"+fcfHtml+"</p>";

        document.getElementById("val-results").classList.add("hidden");
        document.getElementById("val-hints").classList.add("hidden");
        document.getElementById("val-sensitivity").classList.add("hidden");
        ["val-cap-rate","val-loyer-net","val-valeur","val-prix-m2","dcf-re-wacc","dcf-re-terminal-cap","dcf-re-terminal-value","dcf-re-ev"].forEach(function(id){document.getElementById(id).value="";});

        if (document.getElementById("val-timer-toggle").checked) startTimer();
    }

    document.getElementById("val-hint").addEventListener("click", function () {
        var box = document.getElementById("val-hints");
        box.innerHTML = "<strong>Indice :</strong> " + currentVal.hint;
        box.classList.toggle("hidden");
    });

    function buildSensitivityTable(loyerNet, medCapRate, surface) {
        var capRates = [medCapRate - 1, medCapRate - 0.5, medCapRate, medCapRate + 0.5, medCapRate + 1];
        var loyerVars = [-10, -5, 0, 5, 10];
        var html = "<h4 style='margin-top:1rem'>Table de sensibilité (Valeur en M€)</h4>";
        html += "<table class='sensitivity-table'><thead><tr><th>Loyer \\ Cap Rate</th>";
        capRates.forEach(function(cr) { html += "<th>"+cr.toFixed(1)+"%</th>"; });
        html += "</tr></thead><tbody>";
        loyerVars.forEach(function(lv) {
            var adjLoyer = loyerNet * (1 + lv / 100);
            html += "<tr><td>Loyer "+(lv >= 0 ? "+" : "")+lv+"%</td>";
            capRates.forEach(function(cr) {
                var val = adjLoyer / (cr / 100);
                var valM = (val / 1000000).toFixed(1);
                var pM2 = Math.round(val / surface);
                var isMed = Math.abs(cr - medCapRate) < 0.01 && lv === 0;
                html += "<td"+(isMed ? " class='highlight'" : "")+">"+valM+"M<br><small>"+pM2.toLocaleString("fr-FR")+"€/m²</small></td>";
            });
            html += "</tr>";
        });
        html += "</tbody></table>";
        return html;
    }

    document.getElementById("val-check-caprate").addEventListener("click", function () {
        var s = currentVal;
        var userCapRate = parseFloat(document.getElementById("val-cap-rate").value);
        var userLoyerNet = parseFloat(document.getElementById("val-loyer-net").value);
        var userValeur = parseFloat(document.getElementById("val-valeur").value);
        var userPrixM2 = parseFloat(document.getElementById("val-prix-m2").value);
        if ([userCapRate,userLoyerNet,userValeur,userPrixM2].some(isNaN)) { alert("Veuillez remplir tous les champs."); return; }

        var loyerEffectif = s.loyerTotal * (s.tof / 100);
        var fraisGestionMontant = loyerEffectif * (s.fraisGestion / 100);
        var loyerNet = loyerEffectif - s.chargesTotal - s.capexAnnuel - fraisGestionMontant;
        var medCapRate = median(s.peerCapRates);
        var valeurImplicite = loyerNet / (medCapRate / 100);
        var prixM2 = valeurImplicite / s.surface;

        var capDiff = Math.abs(userCapRate - medCapRate) / medCapRate * 100;
        var loyerDiff = Math.abs(userLoyerNet - loyerNet) / loyerNet * 100;
        var valDiff = Math.abs(userValeur - valeurImplicite) / valeurImplicite * 100;
        var prixDiff = Math.abs(userPrixM2 - prixM2) / prixM2 * 100;
        var score = 100 - (capDiff + loyerDiff + valDiff + prixDiff) / 4;
        score = Math.max(0, Math.min(100, Math.round(score)));
        var cls = score >= 70 ? "success" : score >= 40 ? "warning" : "error";

        var html = "<h4>Résultats — Méthode par capitalisation</h4>" +
            "<div class='result-row'><span class='label'>Loyer brut effectif</span><span class='value'>"+loyerEffectif.toLocaleString("fr-FR")+"€</span></div>" +
            "<div class='result-row'><span class='label'>- Charges propriétaire</span><span class='value'>"+s.chargesTotal.toLocaleString("fr-FR")+"€</span></div>" +
            "<div class='result-row'><span class='label'>- Capex annuel</span><span class='value'>"+s.capexAnnuel.toLocaleString("fr-FR")+"€</span></div>" +
            "<div class='result-row'><span class='label'>- Frais de gestion ("+s.fraisGestion+"%)</span><span class='value'>"+Math.round(fraisGestionMontant).toLocaleString("fr-FR")+"€</span></div>" +
            "<div class='result-row'><span class='label'>= Loyer net (correct)</span><span class='value'>"+Math.round(loyerNet).toLocaleString("fr-FR")+"€</span></div>" +
            "<div class='result-row'><span class='label'>Votre loyer net</span><span class='value "+(loyerDiff<15?"correct":"incorrect")+"'>"+Math.round(userLoyerNet).toLocaleString("fr-FR")+"€</span></div>" +
            "<hr style='margin:0.5rem 0'>" +
            "<div class='result-row'><span class='label'>Taux de capi médian peers</span><span class='value'>"+medCapRate.toFixed(2)+"%</span></div>" +
            "<div class='result-row'><span class='label'>Votre taux de capi</span><span class='value "+(capDiff<15?"correct":"incorrect")+"'>"+userCapRate.toFixed(2)+"%</span></div>" +
            "<div class='result-row'><span class='label'>Valeur implicite</span><span class='value'>"+Math.round(valeurImplicite).toLocaleString("fr-FR")+"€</span></div>" +
            "<div class='result-row'><span class='label'>Votre valeur</span><span class='value "+(valDiff<15?"correct":"incorrect")+"'>"+Math.round(userValeur).toLocaleString("fr-FR")+"€ (±"+valDiff.toFixed(0)+"%)</span></div>" +
            "<div class='result-row'><span class='label'>Prix/m² implicite</span><span class='value'>"+Math.round(prixM2).toLocaleString("fr-FR")+"€/m²</span></div>" +
            "<div class='result-row'><span class='label'>Votre prix/m²</span><span class='value "+(prixDiff<15?"correct":"incorrect")+"'>"+Math.round(userPrixM2).toLocaleString("fr-FR")+"€/m²</span></div>" +
            "<p style='margin-top:0.8rem'><strong>Score : "+score+"/100</strong></p>";

        var box = document.getElementById("val-results");
        box.innerHTML = html; box.className = "results-box "+cls; box.classList.remove("hidden");

        var sensBox = document.getElementById("val-sensitivity");
        sensBox.innerHTML = buildSensitivityTable(loyerNet, medCapRate, s.surface);
        sensBox.classList.remove("hidden");

        stopTimer();
        recordResult(score, "Valorisation (Cap Rate)", s.name);
    });

    document.getElementById("dcf-re-check").addEventListener("click", function () {
        var s = currentVal;
        var wacc = parseFloat(document.getElementById("dcf-re-wacc").value) / 100;
        var termCap = parseFloat(document.getElementById("dcf-re-terminal-cap").value) / 100;
        var userTV = parseFloat(document.getElementById("dcf-re-terminal-value").value);
        var userEV = parseFloat(document.getElementById("dcf-re-ev").value);
        if ([wacc,termCap,userTV,userEV].some(isNaN)) { alert("Veuillez remplir tous les champs."); return; }
        if (termCap <= 0) { alert("Le taux de capi terminal doit être positif."); return; }

        var lastCF = s.cashflows[s.cashflows.length-1];
        var correctTV = lastCF / termCap;
        var pvCF = 0;
        for (var i=0;i<s.cashflows.length;i++) pvCF += s.cashflows[i] / Math.pow(1+wacc, i+1);
        var pvTV = correctTV / Math.pow(1+wacc, s.cashflows.length);
        var correctEV = pvCF + pvTV;

        var tvDiff = Math.abs(userTV-correctTV)/correctTV*100;
        var evDiff = Math.abs(userEV-correctEV)/correctEV*100;
        var score = 100-(tvDiff+evDiff)/2;
        score = Math.max(0,Math.min(100,Math.round(score)));
        var cls = score>=70?"success":score>=40?"warning":"error";

        var html = "<h4>Résultats — DCF Immobilier</h4>" +
            "<div class='result-row'><span class='label'>Taux d'actualisation</span><span class='value'>"+(wacc*100).toFixed(1)+"%</span></div>" +
            "<div class='result-row'><span class='label'>Taux de capi terminal</span><span class='value'>"+(termCap*100).toFixed(1)+"%</span></div>" +
            "<div class='result-row'><span class='label'>Valeur terminale correcte</span><span class='value'>"+Math.round(correctTV).toLocaleString("fr-FR")+"€</span></div>" +
            "<div class='result-row'><span class='label'>Votre valeur terminale</span><span class='value "+(tvDiff<15?"correct":"incorrect")+"'>"+Math.round(userTV).toLocaleString("fr-FR")+"€</span></div>" +
            "<div class='result-row'><span class='label'>VA des cash flows</span><span class='value'>"+Math.round(pvCF).toLocaleString("fr-FR")+"€</span></div>" +
            "<div class='result-row'><span class='label'>VA de la valeur terminale</span><span class='value'>"+Math.round(pvTV).toLocaleString("fr-FR")+"€</span></div>" +
            "<div class='result-row'><span class='label'>Valeur DCF correcte</span><span class='value'>"+Math.round(correctEV).toLocaleString("fr-FR")+"€</span></div>" +
            "<div class='result-row'><span class='label'>Votre valeur</span><span class='value "+(evDiff<15?"correct":"incorrect")+"'>"+Math.round(userEV).toLocaleString("fr-FR")+"€</span></div>" +
            "<p style='margin-top:0.8rem'><strong>Score : "+score+"/100</strong></p>";

        var box = document.getElementById("val-results");
        box.innerHTML = html; box.className = "results-box "+cls; box.classList.remove("hidden");
        stopTimer();
        recordResult(score, "Valorisation (DCF Immo)", s.name);
    });

    document.getElementById("val-next").addEventListener("click", function () { state.valLoaded=false; generateValuation(); state.valLoaded=true; });

    // Tabs
    document.querySelectorAll(".tab").forEach(function(tab){
        tab.addEventListener("click", function(){
            document.querySelectorAll(".tab").forEach(function(t){t.classList.remove("active");});
            document.querySelectorAll(".tab-content").forEach(function(c){c.classList.remove("active");});
            this.classList.add("active");
            document.getElementById("tab-"+this.dataset.tab).classList.add("active");
        });
    });

    // ===== SCPI =====
    var currentSCPI = null;

    function generateSCPI() {
        currentSCPI = pickNext(SCPI_SCENARIOS, "scpiSeenIndices");
        var s = currentSCPI;
        document.getElementById("scpi-scenario").innerHTML =
            "<h3>"+s.name+" — "+s.type+"</h3><p>"+s.description+"</p>" +
            "<p><span class='kpi'>Capitalisation: "+s.capitalisation.toLocaleString("fr-FR")+" M€</span> " +
            "<span class='kpi'>Prix de part: "+s.prixPart+"€</span> " +
            "<span class='kpi'>Rendement (TD): "+s.rendement+"%</span> " +
            "<span class='kpi'>TOF: "+s.tof+"%</span></p>" +
            "<p><span class='kpi'>Distribution/part: "+s.distribution+"€</span> " +
            "<span class='kpi'>Collecte nette: "+s.collecte+" M€</span> " +
            "<span class='kpi'>Endettement: "+s.endettement+"%</span></p>" +
            "<p><span class='kpi'>Evol. prix 1an: "+s.evolution1an+"%</span> " +
            "<span class='kpi'>Evol. prix 3ans: "+s.evolution3ans+"%</span> " +
            "<span class='kpi'>Evol. prix 5ans: "+s.evolution5ans+"%</span></p>" +
            "<p><span class='kpi'>Frais souscription: "+s.fraisSouscription+"%</span> " +
            "<span class='kpi'>Frais gestion: "+s.fraisGestion+"%</span></p>" +
            "<p style='font-size:0.85rem'><strong>Géographie :</strong> "+s.zoneGeo+"</p>" +
            "<p style='font-size:0.85rem'><strong>Typologies :</strong> "+s.typologies+"</p>";

        document.getElementById("scpi-results").classList.add("hidden");
        ["scpi-rendement-net","scpi-qualite","scpi-risque","scpi-horizon"].forEach(function(id){document.getElementById(id).value="";});
        state.scpiDecision = null;
        document.getElementById("scpi-buy").classList.remove("selected");
        document.getElementById("scpi-avoid").classList.remove("selected");
        document.getElementById("scpi-rationale").value = "";
    }

    document.getElementById("scpi-buy").addEventListener("click", function () {
        state.scpiDecision = "ACHETER"; this.classList.add("selected"); document.getElementById("scpi-avoid").classList.remove("selected");
    });
    document.getElementById("scpi-avoid").addEventListener("click", function () {
        state.scpiDecision = "ÉVITER"; this.classList.add("selected"); document.getElementById("scpi-buy").classList.remove("selected");
    });

    document.getElementById("scpi-submit").addEventListener("click", function () {
        if (!state.scpiDecision) { alert("Choisissez ACHETER ou ÉVITER."); return; }
        var selects = ["scpi-qualite","scpi-risque","scpi-horizon"];
        if (selects.some(function(id){return document.getElementById(id).value==="";})) { alert("Remplissez tous les critères."); return; }

        var s = currentSCPI;
        var correctDecision = s.recommendation;
        var correct = state.scpiDecision === correctDecision;

        var userRendNet = parseFloat(document.getElementById("scpi-rendement-net").value);
        var realRendNet = s.rendement - (s.fraisGestion * s.rendement / 100);
        var rendNetScore = 0;
        if (!isNaN(userRendNet)) {
            var rendDiff = Math.abs(userRendNet - realRendNet);
            if (rendDiff < 0.3) rendNetScore = 15;
            else if (rendDiff < 0.8) rendNetScore = 8;
        }

        var score = correct ? 65 : 20;
        score += rendNetScore;
        if (document.getElementById("scpi-rationale").value.trim().length > 30) score += 20;
        score = Math.min(100, score);

        var analysis = "";
        if (s.rendement >= 5) analysis += "<li class='correct'>Rendement attractif ("+s.rendement+"%)</li>";
        else if (s.rendement >= 4) analysis += "<li>Rendement correct ("+s.rendement+"%)</li>";
        else analysis += "<li class='incorrect'>Rendement faible ("+s.rendement+"%)</li>";

        if (s.tof >= 95) analysis += "<li class='correct'>TOF excellent ("+s.tof+"%)</li>";
        else if (s.tof >= 90) analysis += "<li>TOF correct ("+s.tof+"%)</li>";
        else analysis += "<li class='incorrect'>TOF préoccupant ("+s.tof+"%)</li>";

        if (s.evolution3ans >= 0) analysis += "<li class='correct'>Prix de part stable/en hausse sur 3 ans ("+s.evolution3ans+"%)</li>";
        else if (s.evolution3ans >= -10) analysis += "<li>Baisse modérée du prix de part ("+s.evolution3ans+"% sur 3 ans)</li>";
        else analysis += "<li class='incorrect'>Forte baisse du prix de part ("+s.evolution3ans+"% sur 3 ans)</li>";

        if (s.endettement <= 15) analysis += "<li class='correct'>Endettement maîtrisé ("+s.endettement+"%)</li>";
        else if (s.endettement <= 25) analysis += "<li>Endettement modéré ("+s.endettement+"%)</li>";
        else analysis += "<li class='incorrect'>Endettement élevé ("+s.endettement+"%)</li>";

        if (s.collecte > 100) analysis += "<li class='correct'>Collecte forte (+"+s.collecte+" M€)</li>";
        else if (s.collecte > 0) analysis += "<li>Collecte positive (+"+s.collecte+" M€)</li>";
        else analysis += "<li class='incorrect'>Collecte négative ("+s.collecte+" M€) — signal d'alarme</li>";

        var rendNetHtml = "";
        if (!isNaN(userRendNet)) {
            rendNetHtml = "<div class='result-row'><span class='label'>Rendement net réel (après frais gestion "+s.fraisGestion+"%)</span><span class='value'>"+realRendNet.toFixed(2)+"%</span></div>" +
                "<div class='result-row'><span class='label'>Votre estimation du rendement net</span><span class='value "+(Math.abs(userRendNet - realRendNet) < 0.5 ? "correct" : "incorrect")+"'>"+userRendNet.toFixed(2)+"%</span></div>";
        }

        var html = "<h4>"+(correct?"Bonne analyse !":"Analyse incorrecte")+"</h4>" +
            "<div class='result-row'><span class='label'>Votre décision</span><span class='value "+(correct?"correct":"incorrect")+"'>"+state.scpiDecision+"</span></div>" +
            "<div class='result-row'><span class='label'>Décision recommandée</span><span class='value'>"+correctDecision+"</span></div>" +
            rendNetHtml +
            "<hr style='margin:0.5rem 0'><h4>Analyse détaillée</h4><ul>"+analysis+"</ul>" +
            "<p style='margin-top:0.5rem'><em>"+s.hint+"</em></p>" +
            "<p style='margin-top:0.8rem'><strong>Score : "+score+"/100</strong></p>";

        var box = document.getElementById("scpi-results");
        box.innerHTML = html; box.className = "results-box "+(correct?"success":"error"); box.classList.remove("hidden");
        recordResult(score, "Analyse SCPI", s.name);
    });

    document.getElementById("scpi-next").addEventListener("click", function () { state.scpiLoaded=false; generateSCPI(); state.scpiLoaded=true; });

    // ===== SCREENING =====
    var currentDeal = null;

    function generateScreening() {
        currentDeal = pickNext(RE_SCREENING_DEALS, "screeningSeenIndices");
        var d = currentDeal;
        var prixM2 = Math.round(d.askingPrice / d.surface);
        document.getElementById("screening-scenario").innerHTML =
            "<h3>"+d.name+" — "+d.type+"</h3><p>"+d.description+"</p>" +
            "<p><span class='kpi'>Surface: "+d.surface.toLocaleString("fr-FR")+" m²</span> " +
            "<span class='kpi'>Loyer net: "+d.loyerNet.toLocaleString("fr-FR")+"€</span> " +
            "<span class='kpi'>TOF: "+d.tof+"%</span> " +
            "<span class='kpi'>Prix demandé: "+d.askingPrice.toLocaleString("fr-FR")+"€</span> " +
            "<span class='kpi'>Prix/m²: "+prixM2.toLocaleString("fr-FR")+"€/m²</span> " +
            "<span class='kpi'>Rendement: "+d.askingYield.toFixed(2)+"%</span></p>" +
            "<h4>Points forts</h4><ul>"+d.strengths.map(function(s){return "<li>"+s+"</li>";}).join("")+"</ul>" +
            "<h4>Points faibles / Risques</h4><ul>"+d.weaknesses.map(function(w){return "<li>"+w+"</li>";}).join("")+"</ul>";

        state.screeningDecision = null;
        document.getElementById("screen-go").classList.remove("selected");
        document.getElementById("screen-nogo").classList.remove("selected");
        document.getElementById("screen-rationale").value = "";
        document.getElementById("screening-results").classList.add("hidden");
        document.getElementById("screening-hints").classList.add("hidden");
        ["screen-location","screen-tenant","screen-asset","screen-market","screen-esg","screen-valuation"].forEach(function(id){document.getElementById(id).value="";});
    }

    document.getElementById("screen-go").addEventListener("click", function () {
        state.screeningDecision = "GO"; this.classList.add("selected"); document.getElementById("screen-nogo").classList.remove("selected");
    });
    document.getElementById("screen-nogo").addEventListener("click", function () {
        state.screeningDecision = "NO-GO"; this.classList.add("selected"); document.getElementById("screen-go").classList.remove("selected");
    });

    document.getElementById("screen-hint").addEventListener("click", function () {
        var box = document.getElementById("screening-hints");
        box.innerHTML = "<strong>Indice :</strong> " + currentDeal.hint;
        box.classList.toggle("hidden");
    });

    document.getElementById("screen-submit").addEventListener("click", function () {
        if (!state.screeningDecision) { alert("Choisissez GO ou NO-GO."); return; }
        var selects = ["screen-location","screen-tenant","screen-asset","screen-market","screen-esg","screen-valuation"];
        if (selects.some(function(id){return document.getElementById(id).value==="";})) { alert("Remplissez tous les critères."); return; }

        var d = currentDeal;
        var correct = state.screeningDecision === d.recommendation;
        var score = correct ? 80 : 30;
        if (document.getElementById("screen-rationale").value.trim().length > 30) score += 20;
        score = Math.min(100, score);

        var html = "<h4>"+(correct?"Bonne décision !":"Décision incorrecte")+"</h4>" +
            "<div class='result-row'><span class='label'>Votre décision</span><span class='value "+(correct?"correct":"incorrect")+"'>"+state.screeningDecision+"</span></div>" +
            "<div class='result-row'><span class='label'>Décision recommandée</span><span class='value'>"+d.recommendation+"</span></div>" +
            "<hr style='margin:0.5rem 0'><h4>Analyse de référence</h4><p>"+d.rationale+"</p>" +
            "<p style='margin-top:0.8rem'><strong>Score : "+score+"/100</strong></p>";

        var box = document.getElementById("screening-results");
        box.innerHTML = html; box.className = "results-box "+(correct?"success":"error"); box.classList.remove("hidden");
        recordResult(score, "Screening Immo", d.name);
    });

    document.getElementById("screening-next").addEventListener("click", function () { state.screeningLoaded=false; generateScreening(); state.screeningLoaded=true; });

    // ===== QUIZ =====
    function startQuiz() {
        state.quizCurrent=0; state.quizCorrect=0; state.quizAnswered=0;
        state.quizQuestions = prepareQuizQuestions();
        document.getElementById("quiz-final").classList.add("hidden");
        document.getElementById("quiz-restart").classList.add("hidden");
        showQuizQuestion();
    }

    function prepareQuizQuestions() {
        var qs = shuffle(RE_QUIZ_QUESTIONS.slice()).slice(0, 10);
        return qs.map(function(q){
            var indices=[]; for(var i=0;i<q.options.length;i++) indices.push(i);
            shuffle(indices);
            return { question:q.question, options:indices.map(function(i){return q.options[i];}), correct:indices.indexOf(q.correct), explanation:q.explanation };
        });
    }

    function showQuizQuestion() {
        if (state.quizCurrent >= state.quizQuestions.length) { showQuizFinal(); return; }
        var q = state.quizQuestions[state.quizCurrent];
        document.getElementById("quiz-counter").textContent = "Question "+(state.quizCurrent+1)+"/"+state.quizQuestions.length;
        document.getElementById("quiz-progress-fill").style.width = (state.quizCurrent/state.quizQuestions.length*100)+"%";
        document.getElementById("quiz-score-display").textContent = "Score: "+state.quizCorrect+"/"+state.quizAnswered;
        document.getElementById("quiz-question").innerHTML = "<h3>Question "+(state.quizCurrent+1)+"</h3><p>"+q.question+"</p>";
        var optDiv = document.getElementById("quiz-options"); optDiv.innerHTML = "";
        q.options.forEach(function(opt,i){
            var div = document.createElement("div"); div.className="quiz-option"; div.textContent=opt;
            div.addEventListener("click", function(){answerQuiz(i);}); optDiv.appendChild(div);
        });
        document.getElementById("quiz-feedback").classList.add("hidden");
        document.getElementById("quiz-next").classList.add("hidden");
    }

    function answerQuiz(selected) {
        var q=state.quizQuestions[state.quizCurrent];
        document.querySelectorAll(".quiz-option").forEach(function(opt,i){
            opt.classList.add("disabled");
            if(i===q.correct) opt.classList.add("correct");
            if(i===selected&&i!==q.correct) opt.classList.add("incorrect");
        });
        state.quizAnswered++; var correct=selected===q.correct; if(correct) state.quizCorrect++;
        var fb=document.getElementById("quiz-feedback");
        fb.innerHTML="<h4>"+(correct?"Correct !":"Incorrect")+"</h4><p>"+q.explanation+"</p>";
        fb.className="results-box "+(correct?"success":"error"); fb.classList.remove("hidden");
        document.getElementById("quiz-score-display").textContent="Score: "+state.quizCorrect+"/"+state.quizAnswered;
        document.getElementById("quiz-next").classList.remove("hidden");
    }

    document.getElementById("quiz-next").addEventListener("click", function(){state.quizCurrent++;showQuizQuestion();});
    document.getElementById("quiz-restart").addEventListener("click", function () { state.quizStarted = false; startQuiz(); state.quizStarted = true; });

    function showQuizFinal() {
        var pct=Math.round(state.quizCorrect/state.quizQuestions.length*100);
        document.getElementById("quiz-progress-fill").style.width="100%";
        document.getElementById("quiz-question").innerHTML="";
        document.getElementById("quiz-options").innerHTML="";
        document.getElementById("quiz-feedback").classList.add("hidden");
        document.getElementById("quiz-next").classList.add("hidden");
        var msg = pct>=80?"Excellent ! Vous maîtrisez l'immobilier d'investissement.":pct>=60?"Bon niveau.":pct>=40?"Des bases à consolider.":"Révisez les fondamentaux de l'immobilier tertiaire.";
        document.getElementById("quiz-final").innerHTML="<h4>Quiz terminé !</h4><p>Score : <strong>"+state.quizCorrect+"/"+state.quizQuestions.length+" ("+pct+"%)</strong></p><p>"+msg+"</p>";
        document.getElementById("quiz-final").className="results-box "+(pct>=60?"success":pct>=40?"warning":"error");
        document.getElementById("quiz-final").classList.remove("hidden");
        document.getElementById("quiz-restart").classList.remove("hidden");
        recordResult(pct, "Quiz Immo", pct+"%");
    }

    // ===== HISTORY =====
    function renderHistory() {
        var list=document.getElementById("history-list"), empty=document.getElementById("history-empty");
        if(!state.history.length){list.innerHTML="";empty.classList.remove("hidden");return;}
        empty.classList.add("hidden");
        list.innerHTML=state.history.map(function(h){
            var cls=h.score>=70?"score-high":h.score>=40?"score-mid":"score-low";
            var d=new Date(h.date);
            var ds=d.toLocaleDateString("fr-FR")+" "+d.toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"});
            var sc=h.score>=70?"var(--success)":h.score>=40?"var(--warning)":"var(--error)";
            return "<div class='history-item "+cls+"'><div class='history-meta'><span class='history-module'>"+h.module+"</span><span class='history-title'>"+h.title+"</span><span class='history-date'>"+ds+"</span></div><span class='history-score' style='color:"+sc+"'>"+h.score+"%</span></div>";
        }).join("");
    }

    document.getElementById("history-clear").addEventListener("click", function(){
        if(confirm("Effacer tout l'historique ?")){state.history=[];state.exercises=0;state.scores=[];state.streak=0;state.bestScore=0;saveStats();updateStatsDisplay();renderHistory();}
    });

    loadStats();
})();
