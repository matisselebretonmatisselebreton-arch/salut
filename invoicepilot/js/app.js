(function () {
    "use strict";

    var cfg = window.IP_CONFIG;
    var sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_KEY);

    // --- Toast / loading / confirm ---
    function toast(msg, type) {
        var c = document.getElementById("toast-container");
        if (!c) { console.log(msg); return; }
        var t = document.createElement("div");
        t.className = "toast toast-" + (type || "info");
        var span = document.createElement("span");
        span.textContent = String(msg);
        var btn = document.createElement("button");
        btn.className = "toast-close"; btn.setAttribute("aria-label", "Fermer"); btn.textContent = "×";
        var close = function () {
            t.classList.add("toast-leaving");
            setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 200);
        };
        btn.addEventListener("click", close);
        t.appendChild(span); t.appendChild(btn);
        c.appendChild(t);
        setTimeout(close, type === "error" ? 6000 : 3500);
    }
    // Replace blocking alerts: infer level from common French error markers.
    window.alert = function (msg) {
        var s = String(msg || "");
        var type = /erreur|impossible|invalide|échec/i.test(s) ? "error" : (/succès|enregistr|créé|mis à jour/i.test(s) ? "success" : "info");
        toast(s, type);
    };
    window.iconfirm = function (msg) {
        return new Promise(function (resolve) {
            var modal = document.getElementById("confirm-modal");
            document.getElementById("confirm-message").textContent = msg;
            var ok = document.getElementById("confirm-ok");
            var cancel = document.getElementById("confirm-cancel");
            modal.classList.add("open");
            ok.focus();
            function cleanup(val) {
                modal.classList.remove("open");
                ok.removeEventListener("click", onOk);
                cancel.removeEventListener("click", onCancel);
                resolve(val);
            }
            function onOk() { cleanup(true); }
            function onCancel() { cleanup(false); }
            ok.addEventListener("click", onOk);
            cancel.addEventListener("click", onCancel);
        });
    };
    function showLoading(on) {
        var el = document.getElementById("app-loading");
        if (el) el.classList.toggle("active", !!on);
    }
    window.__toast = toast;

    // In-memory cache, refreshed from the database
    var state = {
        user: null,
        profile: {},
        clients: [],
        invoices: [],
        quotes: [],
        recurring: [],
        creditNotes: [],
        expenses: [],
        suppliers: [],
        urssaf: []
    };

    var FREE_INVOICE_LIMIT = 10;
    function planOf() { return (state.profile && state.profile.plan) || "free"; }
    // Pro = accès complet (dépenses + comptabilité). Standard = factures illimitées seulement.
    function isPro() { return planOf() === "pro"; }
    function hasUnlimitedInvoices() { return planOf() === "standard" || planOf() === "pro"; }
    function invoicesThisMonth() {
        var now = new Date();
        var ym = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0");
        return state.invoices.filter(function (inv) {
            return String(inv.date).slice(0, 7) === ym;
        }).length;
    }
    function canCreateInvoice() { return hasUnlimitedInvoices() || invoicesThisMonth() < FREE_INVOICE_LIMIT; }
    function quotaBlockedAlert() {
        alert("Vous avez atteint la limite de " + FREE_INVOICE_LIMIT + " factures ce mois-ci (formule gratuite).\n\nPassez au Standard ou au Pro pour des factures illimitées.");
        navigate("subscription");
    }

    // --- Screens ---
    var authScreen = document.getElementById("auth-screen");
    var appScreen = document.getElementById("app-screen");
    var isSignup = window.location.hash === "#signup";

    function showAuth() {
        authScreen.style.display = "";
        appScreen.style.display = "none";
        updateAuthUI();
    }

    async function showApp() {
        authScreen.style.display = "none";
        appScreen.style.display = "";
        document.getElementById("user-display-name").textContent =
            (state.user.user_metadata && state.user.user_metadata.name) || state.user.email;
        await refreshData();
        await processRecurring();
        navigate("dashboard");
    }

    async function refreshData() {
        showLoading(true);
        try {
            var results = await Promise.all([
                sb.from("profiles").select("*").eq("id", state.user.id).maybeSingle(),
                sb.from("clients").select("*").order("created_at", { ascending: false }),
                sb.from("invoices").select("*").order("date", { ascending: false }),
                sb.from("quotes").select("*").order("date", { ascending: false }),
                sb.from("recurring_invoices").select("*").order("created_at", { ascending: false }),
                sb.from("credit_notes").select("*").order("date", { ascending: false }),
                sb.from("expenses").select("*").order("date", { ascending: false }),
                sb.from("suppliers").select("*").order("created_at", { ascending: false }),
                sb.from("urssaf_declarations").select("*").order("declared_at", { ascending: false })
            ]);
            var errored = results.filter(function (r) { return r.error; });
            if (errored.length) toast("Certaines données n'ont pas pu être chargées. Vérifiez votre connexion.", "warning");
            state.profile = results[0].data || {};
            state.clients = results[1].data || [];
            state.invoices = results[2].data || [];
            state.quotes = results[3].data || [];
            state.recurring = results[4].data || [];
            state.creditNotes = results[5].data || [];
            state.expenses = results[6].data || [];
            state.suppliers = results[7].data || [];
            state.urssaf = results[8].data || [];
            reservedSeq = { invoices: {}, quotes: {} };
        } finally {
            showLoading(false);
        }
    }

    // --- Auth UI ---
    function updateAuthUI() {
        document.getElementById("auth-title").textContent = isSignup ? "Créer un compte" : "Connexion";
        document.getElementById("auth-subtitle").textContent = isSignup
            ? "Commencez à facturer en 30 secondes"
            : "Accédez à votre espace de facturation";
        document.getElementById("auth-name-group").style.display = isSignup ? "" : "none";
        document.getElementById("auth-submit").textContent = isSignup ? "Créer mon compte" : "Se connecter";
        document.getElementById("auth-switch-text").textContent = isSignup ? "Déjà un compte ?" : "Pas encore de compte ?";
        document.getElementById("auth-switch-link").textContent = isSignup ? "Se connecter" : "Créer un compte";
    }

    document.getElementById("auth-switch-link").addEventListener("click", function (e) {
        e.preventDefault();
        isSignup = !isSignup;
        updateAuthUI();
    });

    document.getElementById("auth-form").addEventListener("submit", async function (e) {
        e.preventDefault();
        var btn = document.getElementById("auth-submit");
        var email = document.getElementById("auth-email").value.trim();
        var password = document.getElementById("auth-password").value;
        if (!email || !password) return;

        btn.disabled = true;
        var originalLabel = btn.textContent;
        btn.textContent = "Veuillez patienter…";

        try {
            if (isSignup) {
                var name = document.getElementById("auth-name").value.trim();
                var signupRes = await sb.auth.signUp({
                    email: email,
                    password: password,
                    options: { data: { name: name } }
                });
                if (signupRes.error) { alert(translateAuthError(signupRes.error.message)); return; }
                if (!signupRes.data.session) {
                    alert("Compte créé ! Vérifiez votre email pour confirmer votre inscription, puis connectez-vous.");
                    isSignup = false;
                    updateAuthUI();
                    return;
                }
                state.user = signupRes.data.user;
                await showApp();
            } else {
                var loginRes = await sb.auth.signInWithPassword({ email: email, password: password });
                if (loginRes.error) { alert(translateAuthError(loginRes.error.message)); return; }
                state.user = loginRes.data.user;
                await showApp();
            }
        } catch (err) {
            alert("Une erreur est survenue : " + err.message);
        } finally {
            btn.disabled = false;
            btn.textContent = originalLabel;
        }
    });

    function translateAuthError(msg) {
        if (/already registered|already been registered/i.test(msg)) return "Un compte existe déjà avec cet email.";
        if (/Invalid login credentials/i.test(msg)) return "Email ou mot de passe incorrect.";
        if (/Password should be at least/i.test(msg)) return "Le mot de passe doit contenir au moins 6 caractères.";
        if (/Email not confirmed/i.test(msg)) return "Veuillez confirmer votre email avant de vous connecter.";
        return msg;
    }

    document.getElementById("logout-btn").addEventListener("click", async function (e) {
        e.preventDefault();
        await sb.auth.signOut();
        state.user = null;
        showAuth();
    });

    // --- Navigation ---
    function navigate(page) {
        document.querySelectorAll(".page").forEach(function (el) { el.style.display = "none"; });
        document.getElementById("page-" + page).style.display = "";
        document.querySelectorAll(".sidebar-nav a").forEach(function (a) {
            a.classList.toggle("active", a.dataset.page === page);
        });
        if (page === "dashboard") renderDashboard();
        if (page === "invoices") renderInvoices();
        if (page === "quotes") renderQuotes();
        if (page === "recurring") renderRecurring();
        if (page === "expenses") renderExpenses();
        if (page === "suppliers") renderSuppliers();
        if (page === "performance") renderPerformance();
        if (page === "accounting") renderAccounting();
        if (page === "subscription") renderSubscription();
        if (page === "clients") renderClients();
        if (page === "profile") loadProfile();
    }

    document.querySelectorAll(".sidebar-nav a").forEach(function (a) {
        a.addEventListener("click", function (e) {
            e.preventDefault();
            navigate(this.dataset.page);
        });
    });

    // --- Dashboard ---
    // Net revenue (cashed-in) for a given YYYY-MM: paid invoices minus credit notes.
    function revenueForYM(ym) {
        var v = 0;
        state.invoices.forEach(function (inv) {
            if (inv.credit_note_id || inv.status !== "paid") return;
            if (String(inv.date).slice(0, 7) === ym) v += Number(inv.total_ttc);
        });
        state.creditNotes.forEach(function (cn) {
            if (String(cn.date).slice(0, 7) === ym) v -= Number(cn.total_ttc);
        });
        return v;
    }
    function ymOffset(monthsBack) {
        var d = new Date();
        d.setDate(1);
        d.setMonth(d.getMonth() - monthsBack);
        return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
    }
    function monthlyRevenueForYear(year) {
        var arr = [];
        for (var m = 1; m <= 12; m++) arr.push(revenueForYM(year + "-" + String(m).padStart(2, "0")));
        return arr;
    }

    function renderDashboard() {
        var paid = 0, pending = 0, overdue = 0, revenue = 0;
        var now = new Date();
        var currentYear = String(now.getFullYear());
        state.invoices.forEach(function (inv) {
            if (inv.credit_note_id) return;
            if (inv.status === "paid") {
                paid++;
                if (String(inv.date).slice(0, 4) === currentYear) revenue += Number(inv.total_ttc);
            }
            else if (new Date(inv.due_date) < now) { overdue++; }
            else { pending++; }
        });
        state.creditNotes.forEach(function (cn) {
            if (String(cn.date).slice(0, 4) === currentYear) revenue -= Number(cn.total_ttc);
        });
        document.getElementById("stat-revenue").textContent = formatMoney(revenue);
        document.getElementById("stat-paid").textContent = paid;
        document.getElementById("stat-pending").textContent = pending;
        document.getElementById("stat-overdue").textContent = overdue;

        // Sparkline (6 derniers mois) + variation vs mois précédent.
        var series = [];
        for (var i = 5; i >= 0; i--) series.push(revenueForYM(ymOffset(i)));
        document.getElementById("revenue-spark").innerHTML = sparklineSVG(series);
        var cur = series[5], prev = series[4];
        var deltaEl = document.getElementById("revenue-delta");
        if (prev === 0 && cur === 0) { deltaEl.textContent = ""; }
        else if (prev === 0) { deltaEl.textContent = "+100%"; deltaEl.className = "stat-delta up"; }
        else {
            var pctChange = Math.round((cur - prev) / Math.abs(prev) * 100);
            deltaEl.textContent = (pctChange >= 0 ? "+" : "") + pctChange + "% vs mois préc.";
            deltaEl.className = "stat-delta " + (pctChange >= 0 ? "up" : "down");
        }

        renderUsageCard();
        renderDashRelance();
        renderSmartAlerts();
        renderHealthScore();
        renderTreasuryForecast();
        renderInvoiceTable("dashboard-invoices-list", state.invoices.slice(0, 5));
    }

    // Alertes intelligentes : seuils micro, TVA à déclarer, URSSAF.
    var MICRO_THRESHOLDS = { bic_sales: 188700, bic_services: 77700, bnc: 77700 };
    var TVA_FRANCHISE = { bic_sales: 91900, bic_services: 36800, bnc: 36800 };

    function caForYear(year) {
        var ca = 0;
        state.invoices.forEach(function (inv) {
            if (inv.credit_note_id || inv.status !== "paid") return;
            if (String(inv.date).slice(0, 4) === String(year)) ca += Number(inv.subtotal_ht);
        });
        state.creditNotes.forEach(function (cn) {
            if (String(cn.date).slice(0, 4) === String(year)) ca -= Number(cn.subtotal_ht);
        });
        return ca;
    }

    function renderSmartAlerts() {
        var box = document.getElementById("dash-smart-alerts");
        if (!box) return;
        var alerts = [];
        var p = state.profile || {};
        var year = new Date().getFullYear();
        var ca = caForYear(year);

        // Seuil micro
        if (p.legal_status === "micro" && p.activity_type) {
            var th = MICRO_THRESHOLDS[p.activity_type];
            if (th) {
                var pct = (ca / th) * 100;
                if (pct >= 80) {
                    alerts.push({
                        level: pct >= 100 ? "danger" : "warning",
                        icon: pct >= 100 ? "&#9888;" : "&#9888;",
                        text: pct >= 100
                            ? "<strong>Seuil micro-entreprise dépassé</strong> — CA " + year + " : " + formatMoney(ca) + " / " + formatMoney(th) + ". Passage au régime réel à anticiper."
                            : "<strong>" + Math.round(pct) + "% du seuil micro atteint</strong> — CA " + year + " : " + formatMoney(ca) + " / " + formatMoney(th) + "."
                    });
                }
            }
            // Franchise TVA
            var tvaTh = TVA_FRANCHISE[p.activity_type];
            if (tvaTh && ca >= tvaTh * 0.9 && Number(p.tva_rate) === 0) {
                alerts.push({
                    level: "warning", icon: "&#8520;",
                    text: "<strong>Franchise TVA bientôt dépassée</strong> — vous approchez " + formatMoney(tvaTh) + " HT. À partir de ce seuil, vous devrez facturer la TVA."
                });
            }
        }

        // TVA à déclarer (mensuel : avant le 24 du mois suivant la période)
        if (Number(p.tva_rate) > 0) {
            var now = new Date();
            var dueDay = 24;
            var dueDate = new Date(now.getFullYear(), now.getMonth() + 1, dueDay);
            var diff = (dueDate - now) / 86400000;
            if (diff >= 0 && diff <= 10) {
                alerts.push({
                    level: "warning", icon: "&#128197;",
                    text: "<strong>Déclaration TVA dans " + Math.ceil(diff) + " jour(s)</strong> — pensez à préparer votre télédéclaration avant le " + dueDay + "/" + (now.getMonth() + 2 > 12 ? 1 : now.getMonth() + 2) + "."
                });
            }
        }

        // URSSAF à venir : dernier trimestre/mois non déclaré
        if (p.legal_status === "micro" && p.urssaf_period) {
            var nowU = new Date();
            var declaredLabels = state.urssaf.map(function (d) { return d.period_label; });
            if (p.urssaf_period === "monthly") {
                var prevM = new Date(nowU.getFullYear(), nowU.getMonth() - 1, 1);
                var prevLabel = prevM.getFullYear() + "-" + String(prevM.getMonth() + 1).padStart(2, "0");
                if (declaredLabels.indexOf(prevLabel) === -1 && nowU.getDate() <= 28) {
                    alerts.push({ level: "info", icon: "&#128203;",
                        text: "<strong>Déclaration URSSAF mensuelle</strong> à effectuer pour " + prevM.toLocaleDateString("fr-FR", { month: "long", year: "numeric" }) + "." });
                }
            } else {
                var currQ = Math.floor(nowU.getMonth() / 3);
                var prevQNum = currQ === 0 ? 4 : currQ;
                var prevQYear = currQ === 0 ? nowU.getFullYear() - 1 : nowU.getFullYear();
                var prevQLabel = prevQYear + "-T" + prevQNum;
                if (declaredLabels.indexOf(prevQLabel) === -1 && nowU.getDate() <= 30) {
                    alerts.push({ level: "info", icon: "&#128203;",
                        text: "<strong>Déclaration URSSAF trimestrielle</strong> à effectuer pour " + prevQLabel + "." });
                }
            }
        }

        if (alerts.length === 0) { box.innerHTML = ""; return; }
        box.innerHTML = alerts.map(function (a) {
            return '<div class="smart-alert smart-alert-' + a.level + '"><span class="dash-alert-icon">' + a.icon + '</span><span>' + a.text + '</span></div>';
        }).join("");
    }

    // Bannière "factures à relancer" (en retard).
    function renderDashRelance() {
        var box = document.getElementById("dash-relance");
        if (!box) return;
        var now = new Date();
        var overdue = state.invoices.filter(function (inv) {
            return !inv.credit_note_id && inv.status !== "paid" && new Date(inv.due_date) < now;
        });
        if (overdue.length === 0) { box.innerHTML = ""; return; }
        var total = overdue.reduce(function (s, inv) { return s + Number(inv.total_ttc); }, 0);
        box.innerHTML = '<div class="dash-alert" onclick="gotoInvoices(\'overdue\')">'
            + '<span class="dash-alert-icon">&#9888;</span>'
            + '<span><strong>' + overdue.length + ' facture' + (overdue.length > 1 ? 's' : '') + ' en retard</strong> à relancer — '
            + formatMoney(total) + ' en attente de règlement.</span>'
            + '<span class="dash-alert-cta">Voir &rarr;</span></div>';
    }

    // Indicateur de santé financière (encaissement + ponctualité + trésorerie).
    function renderHealthScore() {
        var box = document.getElementById("dash-health");
        if (!box) return;
        var now = new Date();
        var issuedTTC = 0, paidTTC = 0, overdueTTC = 0;
        state.invoices.forEach(function (inv) {
            if (inv.credit_note_id) return;
            issuedTTC += Number(inv.total_ttc);
            if (inv.status === "paid") paidTTC += Number(inv.total_ttc);
            else if (new Date(inv.due_date) < now) overdueTTC += Number(inv.total_ttc);
        });
        var year = String(now.getFullYear());
        var cashIn = 0, cashOut = 0;
        state.invoices.forEach(function (inv) { if (!inv.credit_note_id && inv.status === "paid" && String(inv.date).slice(0, 4) === year) cashIn += Number(inv.total_ttc); });
        state.creditNotes.forEach(function (cn) { if (String(cn.date).slice(0, 4) === year) cashIn -= Number(cn.total_ttc); });
        state.expenses.forEach(function (x) { if (String(x.date).slice(0, 4) === year) cashOut += Number(x.amount_ttc); });
        var netCash = cashIn - cashOut;

        var encaissement = issuedTTC > 0 ? (paidTTC / issuedTTC) : 1;        // 0..1
        var ponctualite = issuedTTC > 0 ? (1 - overdueTTC / issuedTTC) : 1;  // 0..1
        var tresoOk = netCash >= 0 ? 1 : 0;
        var score = Math.round(encaissement * 50 + ponctualite * 30 + tresoOk * 20);

        var level = score >= 70 ? { c: "var(--success)", l: "Bonne santé" } : (score >= 40 ? { c: "var(--warning)", l: "À surveiller" } : { c: "var(--danger)", l: "Fragile" });
        function bar(label, ratio) {
            var pct = Math.max(0, Math.min(100, Math.round(ratio * 100)));
            return '<div class="health-bar-row"><span>' + label + '</span><span>' + pct + '%</span></div>'
                + '<div class="health-bar"><div class="health-bar-fill" style="width:' + pct + '%"></div></div>';
        }
        box.innerHTML = '<div class="insight-head">Santé financière</div>'
            + '<div class="health-score" style="color:' + level.c + '">' + score + '<span>/100</span></div>'
            + '<div class="health-level" style="color:' + level.c + '">' + level.l + '</div>'
            + bar("Encaissement", encaissement)
            + bar("Ponctualité de paiement", ponctualite)
            + '<div class="health-bar-row" style="margin-top:8px"><span>Trésorerie ' + year + '</span><span style="color:' + (netCash >= 0 ? "var(--success)" : "var(--danger)") + '">' + formatMoney(netCash) + '</span></div>';
    }

    // Prévisionnel de trésorerie : encaissements attendus à 30 / 60 / 90 jours.
    function recurringTTC(r) {
        var sub = (r.items || []).reduce(function (s, it) { return s + Number(it.total); }, 0);
        return sub * (1 + Number(r.tva_rate) / 100);
    }
    function projectedRecurring(r, horizon) {
        if (!r.active || !r.next_run) return 0;
        var today = new Date(); today.setHours(0, 0, 0, 0);
        var d = new Date(r.next_run + "T00:00:00"), count = 0, guard = 0;
        while (d <= horizon && guard < 120) {
            if (d >= today) count++;
            d = new Date(advanceDate(d.toISOString().slice(0, 10), r.frequency) + "T00:00:00");
            guard++;
        }
        return count * recurringTTC(r);
    }
    function forecastInflow(days) {
        var horizon = new Date(); horizon.setDate(horizon.getDate() + days);
        var hStr = horizon.toISOString().slice(0, 10);
        var sum = 0;
        state.invoices.forEach(function (inv) {
            if (inv.credit_note_id || inv.status === "paid") return;
            if (String(inv.due_date).slice(0, 10) <= hStr) sum += Number(inv.total_ttc);
        });
        state.recurring.forEach(function (r) { sum += projectedRecurring(r, horizon); });
        return sum;
    }
    function renderTreasuryForecast() {
        var box = document.getElementById("dash-forecast");
        if (!box) return;
        var d30 = forecastInflow(30), d60 = forecastInflow(60), d90 = forecastInflow(90);
        function col(label, val) {
            return '<div class="forecast-col"><div class="forecast-label">' + label + '</div><div class="forecast-value">' + formatMoney(val) + '</div></div>';
        }
        box.innerHTML = '<div class="insight-head">Prévisionnel de trésorerie</div>'
            + '<p class="insight-sub">Encaissements attendus (factures en attente + récurrences à venir)</p>'
            + '<div class="forecast-grid">' + col("30 jours", d30) + col("60 jours", d60) + col("90 jours", d90) + '</div>'
            + (d30 + d60 + d90 === 0 ? '<p class="insight-sub" style="margin-top:8px">Aucun encaissement projeté — créez des factures ou des récurrences.</p>' : '');
    }

    // Clic sur les cartes du dashboard.
    window.openRevenueDetail = function () { openRevenueModal(); };
    window.gotoInvoices = function (status) {
        invoiceFilter = { type: "invoice", status: status, search: "" };
        var si = document.getElementById("invoice-search");
        if (si) si.value = "";
        navigate("invoices");
    };

    // --- Mini SVG charts (sans dépendance) ---
    function sparklineSVG(values) {
        var w = 120, h = 34, max = Math.max.apply(null, values.concat([1]));
        var min = Math.min.apply(null, values.concat([0]));
        var range = (max - min) || 1;
        var pts = values.map(function (v, i) {
            var x = values.length > 1 ? (i / (values.length - 1)) * w : 0;
            var y = h - ((v - min) / range) * (h - 4) - 2;
            return x.toFixed(1) + "," + y.toFixed(1);
        }).join(" ");
        return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" preserveAspectRatio="none">'
            + '<polyline fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="' + pts + '"/></svg>';
    }
    function barChartSVG(values, labels, prevValues) {
        var w = 640, h = 280, pad = 36, topPad = 24, n = values.length;
        var allVals = values.concat(prevValues || []);
        var max = Math.max.apply(null, allVals.concat([1]));
        var bw = (w - pad * 2) / n * (prevValues ? 0.4 : 0.55);
        var gap = (w - pad * 2) / n;
        var bars = "", lbls = "", valLabels = "";
        var gridLines = "";
        for (var g = 0; g <= 4; g++) {
            var gy = h - pad - (g / 4) * (h - pad - topPad);
            var gv = max * g / 4;
            gridLines += '<line x1="' + pad + '" y1="' + gy.toFixed(1) + '" x2="' + (w - pad) + '" y2="' + gy.toFixed(1) + '" stroke="#E2E8F0" stroke-dasharray="4,3"/>';
            gridLines += '<text x="' + (pad - 4) + '" y="' + (gy + 3) + '" text-anchor="end" font-size="9" fill="#94A3B8">' + formatCompact(gv) + '</text>';
        }
        values.forEach(function (v, i) {
            var bh = max > 0 ? (v / max) * (h - pad - topPad) : 0;
            var xOffset = prevValues ? gap * 0.08 : 0;
            var x = pad + i * gap + (gap - bw * (prevValues ? 2.2 : 1)) / 2 + xOffset;
            var y = h - pad - bh;
            bars += '<rect class="chart-bar" data-idx="' + i + '" x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + Math.max(bh, 0).toFixed(1) + '" rx="3" fill="url(#barGrad)" style="cursor:pointer"/>';
            if (v > 0) {
                valLabels += '<text class="bar-label" x="' + (x + bw / 2).toFixed(1) + '" y="' + (y - 6).toFixed(1) + '">' + formatCompact(v) + '</text>';
            }
            if (prevValues) {
                var pbh = max > 0 ? ((prevValues[i] || 0) / max) * (h - pad - topPad) : 0;
                var px = x + bw * 1.15;
                var py = h - pad - pbh;
                bars += '<rect x="' + px.toFixed(1) + '" y="' + py.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + Math.max(pbh, 0).toFixed(1) + '" rx="3" fill="#CBD5E1" opacity=".6"/>';
            }
            lbls += '<text x="' + (pad + i * gap + gap / 2).toFixed(1) + '" y="' + (h - pad + 16) + '" text-anchor="middle" font-size="10" fill="#94A3B8">' + esc(labels[i]) + '</text>';
        });
        return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="100%" preserveAspectRatio="xMidYMid meet" id="rev-svg">'
            + '<defs><linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6366F1"/><stop offset="100%" stop-color="#A5B4FC"/></linearGradient></defs>'
            + gridLines + bars + valLabels + lbls + '</svg>';
    }
    function formatCompact(v) {
        if (v >= 1000) return (v / 1000).toFixed(v >= 10000 ? 0 : 1) + "k";
        return v === 0 ? "0" : v.toFixed(0);
    }

    function openRevenueModal() {
        // Années disponibles (factures + avoirs).
        var years = {};
        state.invoices.forEach(function (i) { years[String(i.date).slice(0, 4)] = true; });
        state.creditNotes.forEach(function (cn) { years[String(cn.date).slice(0, 4)] = true; });
        years[String(new Date().getFullYear())] = true;
        var sorted = Object.keys(years).sort().reverse();
        var ysel = document.getElementById("rev-year");
        ysel.innerHTML = sorted.map(function (y) { return '<option value="' + y + '">' + y + '</option>'; }).join("");
        ysel.value = String(new Date().getFullYear());
        document.getElementById("rev-mode").value = "month";
        renderRevenueChart();
        openModal("modal-revenue");
    }
    window.renderRevenueChartFromUI = function () { renderRevenueChart(); };
    function quarterlyRevenueForYear(year) {
        var monthly = monthlyRevenueForYear(year);
        return [
            monthly[0] + monthly[1] + monthly[2],
            monthly[3] + monthly[4] + monthly[5],
            monthly[6] + monthly[7] + monthly[8],
            monthly[9] + monthly[10] + monthly[11]
        ];
    }
    function renderRevenueChart() {
        var mode = document.getElementById("rev-mode").value;
        var showN1 = document.getElementById("rev-compare-toggle").checked;
        document.getElementById("rev-year").style.display = mode === "year" ? "none" : "";
        var container = document.getElementById("rev-chart");
        var totalEl = document.getElementById("rev-total");
        var labelEl = document.getElementById("rev-total-label");
        var compareEl = document.getElementById("rev-compare");
        var labels, data, prevData = null, totalCA, prevTotalCA = 0;

        if (mode === "year") {
            labels = []; data = [];
            var cy = new Date().getFullYear();
            for (var y = cy - 4; y <= cy; y++) {
                labels.push(String(y));
                data.push(monthlyRevenueForYear(y).reduce(function (s, v) { return s + v; }, 0));
            }
            totalCA = data[data.length - 1];
            labelEl.textContent = "CA " + cy;
        } else if (mode === "quarter") {
            var year = document.getElementById("rev-year").value || String(new Date().getFullYear());
            labels = ["T1", "T2", "T3", "T4"];
            data = quarterlyRevenueForYear(year);
            if (showN1) prevData = quarterlyRevenueForYear(String(Number(year) - 1));
            totalCA = data.reduce(function (s, v) { return s + v; }, 0);
            if (prevData) prevTotalCA = prevData.reduce(function (s, v) { return s + v; }, 0);
            labelEl.textContent = "CA " + year;
        } else {
            var year = document.getElementById("rev-year").value || String(new Date().getFullYear());
            labels = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"];
            data = monthlyRevenueForYear(year);
            if (showN1) prevData = monthlyRevenueForYear(String(Number(year) - 1));
            totalCA = data.reduce(function (s, v) { return s + v; }, 0);
            if (prevData) prevTotalCA = prevData.reduce(function (s, v) { return s + v; }, 0);
            labelEl.textContent = "CA " + year;
        }
        totalEl.textContent = formatMoney(totalCA);
        if (showN1 && prevTotalCA > 0 && mode !== "year") {
            var delta = Math.round((totalCA - prevTotalCA) / prevTotalCA * 100);
            compareEl.innerHTML = '<span style="color:' + (delta >= 0 ? "var(--success)" : "var(--danger)") + ';font-weight:700">'
                + (delta >= 0 ? "+" : "") + delta + '%</span> vs N-1 (' + formatMoney(prevTotalCA) + ')';
        } else {
            compareEl.textContent = "";
        }

        container.innerHTML = barChartSVG(data, labels, showN1 ? prevData : null);

        // Tooltip interactif
        var svg = container.querySelector("svg");
        var tooltip = document.getElementById("rev-chart-tooltip");
        if (svg && tooltip) {
            svg.addEventListener("mousemove", function (e) {
                var bar = e.target.closest(".chart-bar");
                if (!bar) { tooltip.style.display = "none"; return; }
                var idx = parseInt(bar.getAttribute("data-idx"));
                var rect = container.getBoundingClientRect();
                tooltip.innerHTML = '<strong>' + labels[idx] + '</strong><br>' + formatMoney(data[idx])
                    + (prevData ? '<br><span style="opacity:.7">N-1 : ' + formatMoney(prevData[idx] || 0) + '</span>' : '');
                tooltip.style.display = "block";
                tooltip.style.left = (e.clientX - rect.left) + "px";
                tooltip.style.top = (e.clientY - rect.top - 12) + "px";
            });
            svg.addEventListener("mouseleave", function () { tooltip.style.display = "none"; });
        }
    }

    function renderUsageCard() {
        var card = document.getElementById("usage-card");
        if (hasUnlimitedInvoices()) { card.style.display = "none"; return; }
        card.style.display = "";
        var used = invoicesThisMonth();
        var pct = Math.min(100, Math.round(used / FREE_INVOICE_LIMIT * 100));
        document.getElementById("usage-count").textContent = used + " / " + FREE_INVOICE_LIMIT;
        var fill = document.getElementById("usage-fill");
        fill.style.width = pct + "%";
        fill.className = "usage-fill" + (used >= FREE_INVOICE_LIMIT ? " full" : (used >= FREE_INVOICE_LIMIT - 2 ? " warn" : ""));
        var hint = document.getElementById("usage-hint");
        if (used >= FREE_INVOICE_LIMIT) {
            hint.innerHTML = "Limite atteinte. <a href=\"#\" onclick=\"goSubscription();return false\" style=\"color:var(--primary);font-weight:600\">Passez au Standard ou Pro</a> pour des factures illimitées.";
        } else {
            hint.innerHTML = "Formule gratuite — " + (FREE_INVOICE_LIMIT - used) + " facture(s) restante(s) ce mois-ci.";
        }
    }
    window.goSubscription = function () { navigate("subscription"); };

    // --- Invoices & Credit notes (module unifié) ---
    var invoiceFilter = { type: "all", status: "all", search: "" };
    var invoiceSort = { key: "date", dir: "desc" };

    function invoiceStatusOf(inv) {
        if (inv.credit_note_id) return "cancelled";
        if (inv.status === "paid") return "paid";
        if (new Date(inv.due_date) < new Date()) return "overdue";
        return "pending";
    }

    function buildDocuments() {
        // Vue unifiée factures + avoirs.
        var docs = [];
        state.invoices.forEach(function (inv) {
            docs.push({ kind: "invoice", id: inv.id, raw: inv, number: inv.number,
                client_id: inv.client_id, date: inv.date, total: Number(inv.total_ttc),
                status: invoiceStatusOf(inv) });
        });
        state.creditNotes.forEach(function (cn) {
            docs.push({ kind: "credit", id: cn.id, raw: cn, number: cn.number,
                client_id: cn.client_id, date: cn.date, total: -Number(cn.total_ttc),
                status: "credit" });
        });
        return docs;
    }

    function renderInvoices() {
        var docs = buildDocuments();
        var term = invoiceFilter.search.trim().toLowerCase();
        docs = docs.filter(function (d) {
            if (invoiceFilter.type === "invoice" && d.kind !== "invoice") return false;
            if (invoiceFilter.type === "credit" && d.kind !== "credit") return false;
            if (invoiceFilter.status !== "all" && d.status !== invoiceFilter.status) return false;
            if (term) {
                var client = state.clients.find(function (c) { return c.id === d.client_id; });
                var hay = (d.number + " " + (client ? client.name : "")).toLowerCase();
                if (hay.indexOf(term) === -1) return false;
            }
            return true;
        });
        // Tri
        var k = invoiceSort.key, dir = invoiceSort.dir === "asc" ? 1 : -1;
        docs.sort(function (a, b) {
            var va, vb;
            if (k === "client") {
                va = (state.clients.find(function (c) { return c.id === a.client_id; }) || {}).name || "";
                vb = (state.clients.find(function (c) { return c.id === b.client_id; }) || {}).name || "";
                return va.localeCompare(vb) * dir;
            }
            if (k === "amount") { va = a.total; vb = b.total; }
            else if (k === "number") { va = a.number; vb = b.number; return String(va).localeCompare(String(vb)) * dir; }
            else { va = a.date; vb = b.date; }
            return (va < vb ? -1 : va > vb ? 1 : 0) * dir;
        });

        renderInvoiceFilters();
        var container = document.getElementById("invoices-list");
        if (state.invoices.length === 0 && state.creditNotes.length === 0) {
            container.innerHTML = '<div class="empty-state"><div class="empty-icon">&#128196;</div><p>Aucun document pour le moment</p><button class="btn btn-primary" onclick="openNewDocMenu()">Créer ma première facture</button></div>';
            return;
        }
        if (docs.length === 0) { container.innerHTML = '<div class="empty-state"><p>Aucun document ne correspond à ces critères.</p></div>'; return; }

        function arrow(key) { return invoiceSort.key === key ? (invoiceSort.dir === "asc" ? " ↑" : " ↓") : ""; }
        var html = '<table><thead><tr>'
            + '<th>Type</th>'
            + '<th class="sortable" onclick="sortInvoices(\'number\')">N°' + arrow("number") + '</th>'
            + '<th class="sortable" onclick="sortInvoices(\'client\')">Client' + arrow("client") + '</th>'
            + '<th class="sortable" onclick="sortInvoices(\'date\')">Date' + arrow("date") + '</th>'
            + '<th class="sortable" onclick="sortInvoices(\'amount\')">Montant TTC' + arrow("amount") + '</th>'
            + '<th>Statut</th><th>Actions</th></tr></thead><tbody>';
        docs.forEach(function (d) {
            var client = state.clients.find(function (c) { return c.id === d.client_id; });
            html += '<tr>';
            if (d.kind === "credit") html += '<td><span class="doc-type credit">Avoir</span></td>';
            else {
                var dt = d.raw.doc_type;
                if (dt === "deposit") html += '<td><span class="doc-type deposit">Acompte ' + (d.raw.deposit_percent || "") + '%</span></td>';
                else if (dt === "balance") html += '<td><span class="doc-type balance">Solde</span></td>';
                else if (dt === "installment") html += '<td><span class="doc-type installment">Échéance ' + d.raw.installment_index + '/' + d.raw.installment_total + '</span></td>';
                else html += '<td><span class="doc-type invoice">Facture</span></td>';
            }
            html += '<td><strong>' + esc(d.number) + '</strong></td>';
            html += '<td>' + esc(client ? client.name : "—") + '</td>';
            html += '<td>' + formatDate(d.date) + '</td>';
            html += '<td' + (d.kind === "credit" ? ' style="color:var(--danger)"' : '') + '>' + formatMoney(d.total) + '</td>';
            html += '<td>' + statusBadge(d.status) + '</td>';
            html += '<td>' + docActions(d) + '</td>';
            html += '</tr>';
        });
        html += '</tbody></table>';
        container.innerHTML = html;
    }

    function statusBadge(status) {
        var map = {
            paid: { cls: "status-paid", label: "Payée" },
            pending: { cls: "status-pending", label: "En attente" },
            overdue: { cls: "status-overdue", label: "En retard" },
            cancelled: { cls: "status-overdue", label: "Annulée" },
            credit: { cls: "status-pending", label: "Avoir" }
        };
        var s = map[status] || map.pending;
        return '<span class="status ' + s.cls + '"><span class="status-dot"></span>' + s.label + '</span>';
    }

    function docActions(d) {
        if (d.kind === "credit") {
            return '<button class="btn btn-sm btn-outline" onclick="downloadCreditNotePDF(\'' + d.id + '\')">PDF</button>';
        }
        var inv = d.raw;
        var h = '<button class="btn btn-sm btn-outline" onclick="downloadPDF(\'' + inv.id + '\')">PDF</button> ';
        if (inv.credit_note_id) {
            h += '<span style="color:var(--text-muted);font-size:.8rem">→ avoir émis</span>';
        } else if (inv.status === "paid") {
            if (inv.doc_type === "deposit") {
                var hasBalance = state.invoices.some(function (i) { return i.parent_invoice_id === inv.id && i.doc_type === "balance"; });
                if (!hasBalance) h += '<button class="btn btn-sm btn-primary" onclick="createBalanceFor(\'' + inv.id + '\')">Créer le solde</button> ';
            }
            h += '<button class="btn btn-sm btn-outline" onclick="openCreditNote(\'' + inv.id + '\')">Avoir</button>';
        } else {
            h += '<button class="btn btn-sm btn-outline" onclick="markPaid(\'' + inv.id + '\')">Payée</button> ';
            if (d.status === "overdue") h += '<button class="btn btn-sm btn-outline" onclick="sendReminder(\'' + inv.id + '\')">Relancer' + (inv.reminder_count ? ' (' + inv.reminder_count + ')' : '') + '</button> ';
            h += '<button class="btn btn-sm btn-outline" onclick="deleteInvoice(\'' + inv.id + '\')">Suppr.</button>';
        }
        return h;
    }

    window.sortInvoices = function (key) {
        if (invoiceSort.key === key) invoiceSort.dir = invoiceSort.dir === "asc" ? "desc" : "asc";
        else { invoiceSort.key = key; invoiceSort.dir = key === "client" || key === "number" ? "asc" : "desc"; }
        renderInvoices();
    };

    function renderInvoiceFilters() {
        var bar = document.getElementById("invoice-filters");
        if (!bar) return;
        var pills = [
            { t: "all", s: "all", label: "Tous" },
            { t: "invoice", s: "all", label: "Factures" },
            { t: "credit", s: "all", label: "Avoirs" },
            { t: "invoice", s: "paid", label: "Payées" },
            { t: "invoice", s: "pending", label: "En attente" },
            { t: "invoice", s: "overdue", label: "En retard" }
        ];
        bar.innerHTML = pills.map(function (p) {
            var active = invoiceFilter.type === p.t && invoiceFilter.status === p.s;
            return '<button class="filter-pill' + (active ? " active" : "") + '" onclick="setInvoiceFilter(\'' + p.t + '\',\'' + p.s + '\')">' + p.label + '</button>';
        }).join("");
    }
    window.setInvoiceFilter = function (type, status) {
        invoiceFilter.type = type; invoiceFilter.status = status;
        renderInvoices();
    };

    // Conservé pour la liste « Dernières factures » du tableau de bord.
    function renderInvoiceTable(containerId, invoices) {
        var container = document.getElementById(containerId);
        if (invoices.length === 0) {
            container.innerHTML = '<div class="empty-state"><div class="empty-icon">&#128196;</div><p>Aucune facture pour le moment</p><button class="btn btn-primary" onclick="document.getElementById(\'btn-new-invoice\').click()">Créer ma première facture</button></div>';
            return;
        }
        var now = new Date();
        var html = '<table><thead><tr><th>N°</th><th>Client</th><th>Date</th><th>Montant TTC</th><th>Statut</th><th>Actions</th></tr></thead><tbody>';
        invoices.forEach(function (inv) {
            var client = state.clients.find(function (c) { return c.id === inv.client_id; });
            var statusClass, statusLabel;
            if (inv.credit_note_id) { statusClass = "status-overdue"; statusLabel = "Annulée"; }
            else if (inv.status === "paid") { statusClass = "status-paid"; statusLabel = "Payée"; }
            else if (new Date(inv.due_date) < now) { statusClass = "status-overdue"; statusLabel = "En retard"; }
            else { statusClass = "status-pending"; statusLabel = "En attente"; }

            html += '<tr>';
            html += '<td><strong>' + esc(inv.number) + '</strong></td>';
            html += '<td>' + esc(client ? client.name : "—") + '</td>';
            html += '<td>' + formatDate(inv.date) + '</td>';
            html += '<td>' + formatMoney(Number(inv.total_ttc)) + '</td>';
            html += '<td><span class="status ' + statusClass + '"><span class="status-dot"></span>' + statusLabel + '</span></td>';
            html += '<td>';
            html += '<button class="btn btn-sm btn-outline" onclick="downloadPDF(\'' + inv.id + '\')">PDF</button> ';
            if (inv.credit_note_id) {
                html += '<span style="color:var(--text-muted);font-size:.8rem">→ avoir émis</span> ';
            } else if (inv.status === "paid") {
                html += '<button class="btn btn-sm btn-outline" onclick="openCreditNote(\'' + inv.id + '\')">Avoir</button> ';
            } else {
                html += '<button class="btn btn-sm btn-outline" onclick="markPaid(\'' + inv.id + '\')">Marquer payée</button> ';
                html += '<button class="btn btn-sm btn-outline" onclick="deleteInvoice(\'' + inv.id + '\')">Suppr.</button>';
            }
            html += '</td></tr>';
        });
        html += '</tbody></table>';
        container.innerHTML = html;
    }

    window.markPaid = async function (id) {
        var res = await sb.from("invoices").update({ status: "paid", paid_at: new Date().toISOString() }).eq("id", id);
        if (res.error) { alert("Erreur : " + res.error.message); return; }
        await refreshData();
        navigate("invoices");
    };

    window.deleteInvoice = async function (id) {
        if (!await iconfirm("Supprimer cette facture ?")) return;
        var inv = state.invoices.find(function (i) { return i.id === id; });
        var linkedQuote = inv ? state.quotes.find(function (q) { return q.converted_invoice_id === id; }) : null;
        var res = await sb.from("invoices").delete().eq("id", id);
        if (res.error) { alert("Erreur : " + res.error.message); return; }
        if (linkedQuote) {
            await sb.from("quotes").update({ status: "accepted", converted_invoice_id: null }).eq("id", linkedQuote.id);
        }
        await refreshData();
        navigate("invoices");
    };

    // Relance d'une facture en retard : ouvre un email pré-rempli et incrémente le compteur.
    window.sendReminder = async function (id) {
        var inv = state.invoices.find(function (i) { return i.id === id; });
        if (!inv) return;
        var client = state.clients.find(function (c) { return c.id === inv.client_id; }) || {};
        var p = state.profile || {};
        var subject = "Relance — Facture " + inv.number + " en attente de règlement";
        var body = "Bonjour,\n\n"
            + "Sauf erreur de notre part, la facture " + inv.number + " d'un montant de " + formatMoney(Number(inv.total_ttc))
            + " émise le " + formatDate(inv.date) + " (échéance le " + formatDate(inv.due_date) + ") demeure impayée à ce jour.\n\n"
            + "Nous vous remercions de bien vouloir procéder à son règlement dans les meilleurs délais.\n\n"
            + "Cordialement,\n" + (p.name || "");
        var mailto = "mailto:" + encodeURIComponent(client.email || "")
            + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        window.open(mailto, "_blank");
        var res = await sb.from("invoices").update({
            reminder_count: (inv.reminder_count || 0) + 1,
            last_reminder_at: new Date().toISOString()
        }).eq("id", id);
        if (!res.error) { await refreshData(); renderInvoices(); }
    };

    // --- Menu "Nouveau document" (facture depuis devis / facture libre / avoir) ---
    window.openNewDocMenu = function () {
        document.getElementById("newdoc-body").innerHTML =
            '<div class="newdoc-choices">'
            + '<button class="newdoc-choice" onclick="newDocFromQuote()"><strong>Facture depuis un devis accepté</strong><span>Convertir un devis validé en facture</span></button>'
            + '<button class="newdoc-choice" onclick="newDocFree()"><strong>Facture libre</strong><span>Créer une facture from scratch</span></button>'
            + '<button class="newdoc-choice" onclick="newDocDeposit()"><strong>Acompte ou échéancier</strong><span>Diviser un devis en acompte/solde ou en plusieurs échéances</span></button>'
            + '<button class="newdoc-choice" onclick="newDocCredit()"><strong>Avoir</strong><span>Annuler tout ou partie d\'une facture payée</span></button>'
            + '</div>';
        openModal("modal-newdoc");
    };

    window.newDocDeposit = function () {
        var accepted = state.quotes.filter(function (q) { return q.status === "accepted" || q.status === "invoiced"; });
        var body = document.getElementById("newdoc-body");
        if (accepted.length === 0) {
            body.innerHTML = '<p style="color:var(--text-muted)">Aucun devis accepté disponible. Acceptez un devis pour pouvoir créer un acompte ou un échéancier.</p>'
                + '<div class="modal-actions"><button class="btn btn-outline" onclick="openNewDocMenu()">Retour</button></div>';
            return;
        }
        var rows = accepted.map(function (q) {
            var client = state.clients.find(function (c) { return c.id === q.client_id; });
            return '<div class="row"><span>' + esc(q.number) + ' — ' + esc(client ? client.name : "—") + ' <span style="color:var(--text-muted)">' + formatMoney(Number(q.total_ttc)) + '</span></span>'
                + '<button class="btn btn-sm btn-primary" onclick="closeModal(\'modal-newdoc\');openDepositModal(\'' + q.id + '\')">Choisir</button></div>';
        }).join("");
        body.innerHTML = '<div class="detail-list">' + rows + '</div>'
            + '<div class="modal-actions"><button class="btn btn-outline" onclick="openNewDocMenu()">Retour</button></div>';
    };

    window.openDepositModal = function (quoteId) {
        var q = state.quotes.find(function (x) { return x.id === quoteId; });
        if (!q) return;
        document.getElementById("dep-quote-id").value = quoteId;
        var client = state.clients.find(function (c) { return c.id === q.client_id; });
        document.getElementById("dep-quote-info").textContent = q.number + " — " + (client ? client.name : "") + " — " + formatMoney(Number(q.total_ttc));
        document.getElementById("dep-mode").value = "deposit";
        document.getElementById("dep-percent").value = 30;
        document.getElementById("dep-installments").value = 3;
        document.getElementById("dep-frequency").value = 30;
        updateDepositPreview();
        openModal("modal-deposit");
    };

    window.updateDepositPreview = function () {
        var quoteId = document.getElementById("dep-quote-id").value;
        var q = state.quotes.find(function (x) { return x.id === quoteId; });
        if (!q) return;
        var mode = document.getElementById("dep-mode").value;
        document.getElementById("dep-pane-deposit").style.display = mode === "deposit" ? "" : "none";
        document.getElementById("dep-pane-installments").style.display = mode === "installments" ? "" : "none";
        var preview = document.getElementById("dep-preview");
        var total = Number(q.total_ttc);
        if (mode === "deposit") {
            var pct = Math.max(1, Math.min(99, parseFloat(document.getElementById("dep-percent").value) || 30));
            var deposit = total * pct / 100;
            preview.innerHTML = '<div class="row"><span>Facture d\'acompte (' + pct + ' %)</span><strong>' + formatMoney(deposit) + '</strong></div>'
                + '<div class="row"><span>Facture de solde (' + (100 - pct) + ' %)</span><strong>' + formatMoney(total - deposit) + '</strong></div>'
                + '<p style="font-size:.82rem;color:var(--text-muted);margin-top:8px">L\'acompte est émis tout de suite. Le solde sera créé manuellement après réception de la prestation.</p>';
        } else {
            var n = Math.max(2, Math.min(12, parseInt(document.getElementById("dep-installments").value) || 3));
            var freq = parseInt(document.getElementById("dep-frequency").value) || 30;
            var perInst = total / n;
            var rows = "";
            for (var i = 1; i <= n; i++) {
                rows += '<div class="row"><span>Échéance ' + i + '/' + n + (i === 1 ? ' (immédiate)' : ' (J+' + ((i - 1) * freq) + ')') + '</span><strong>' + formatMoney(perInst) + '</strong></div>';
            }
            preview.innerHTML = rows + '<p style="font-size:.82rem;color:var(--text-muted);margin-top:8px">Toutes les factures seront créées en une fois, avec des dates d\'échéance échelonnées.</p>';
        }
    };

    window.submitDeposit = async function () {
        var quoteId = document.getElementById("dep-quote-id").value;
        var q = state.quotes.find(function (x) { return x.id === quoteId; });
        if (!q) return;
        var mode = document.getElementById("dep-mode").value;
        var nNeeded = mode === "deposit" ? 1 : Math.max(2, Math.min(12, parseInt(document.getElementById("dep-installments").value) || 3));
        if (!hasUnlimitedInvoices() && invoicesThisMonth() + nNeeded > FREE_INVOICE_LIMIT) { quotaBlockedAlert(); return; }
        var btn = document.getElementById("dep-submit");
        btn.disabled = true; btn.textContent = "Création…";
        try {
            var today = new Date().toISOString().slice(0, 10);
            if (mode === "deposit") {
                var pct = Math.max(1, Math.min(99, parseFloat(document.getElementById("dep-percent").value) || 30));
                var ratio = pct / 100;
                var dueDeposit = new Date(); dueDeposit.setDate(dueDeposit.getDate() + 15);
                var depositItems = (q.items || []).map(function (it) {
                    var u = round2(Number(it.total) * ratio);
                    return { description: "Acompte " + pct + "% — " + it.description, quantity: 1, unitPrice: u, total: u };
                });
                var subDeposit = round2(Number(q.subtotal_ht) * ratio);
                var tvaDeposit = round2(Number(q.tva_amount) * ratio);
                var totalDeposit = round2(Number(q.total_ttc) * ratio);
                var depositPayload = {
                    user_id: state.user.id, number: nextInvoiceNumber(), client_id: q.client_id,
                    date: today, due_date: dueDeposit.toISOString().slice(0, 10),
                    items: depositItems, subtotal_ht: subDeposit, tva_rate: q.tva_rate, tva_amount: tvaDeposit, total_ttc: totalDeposit,
                    status: "pending", doc_type: "deposit", parent_quote_id: q.id, deposit_percent: pct
                };
                var ins = await sb.from("invoices").insert(depositPayload).select().single();
                if (ins.error) { alert("Erreur : " + dbErrorMessage(ins.error)); return; }
                await sb.from("quotes").update({ status: "invoiced", converted_invoice_id: ins.data.id }).eq("id", q.id);
            } else {
                var n = Math.max(2, Math.min(12, parseInt(document.getElementById("dep-installments").value) || 3));
                var freq = parseInt(document.getElementById("dep-frequency").value) || 30;
                var totalInv = round2(Number(q.total_ttc));
                var subInv = round2(Number(q.subtotal_ht));
                var tvaInv = round2(Number(q.tva_amount));
                var subPart = round2(subInv / n);
                var tvaPart = round2(tvaInv / n);
                var totalPart = round2(totalInv / n);
                var itemTotals = (q.items || []).map(function (it) { return round2(Number(it.total) / n); });
                for (var i = 1; i <= n; i++) {
                    var d = new Date(); d.setDate(d.getDate() + (i - 1) * freq + 15);
                    var label = "Échéance " + i + "/" + n;
                    var isLast = i === n;
                    var sub_i = isLast ? round2(subInv - subPart * (n - 1)) : subPart;
                    var tva_i = isLast ? round2(tvaInv - tvaPart * (n - 1)) : tvaPart;
                    var tot_i = isLast ? round2(totalInv - totalPart * (n - 1)) : totalPart;
                    var items = (q.items || []).map(function (it, idx) {
                        var base = itemTotals[idx];
                        var u = isLast ? round2(Number(it.total) - base * (n - 1)) : base;
                        return { description: label + " — " + it.description, quantity: 1, unitPrice: u, total: u };
                    });
                    var inst = {
                        user_id: state.user.id, number: nextInvoiceNumber(), client_id: q.client_id,
                        date: today, due_date: d.toISOString().slice(0, 10),
                        items: items, subtotal_ht: sub_i, tva_rate: q.tva_rate, tva_amount: tva_i, total_ttc: tot_i,
                        status: "pending", doc_type: "installment", parent_quote_id: q.id,
                        installment_index: i, installment_total: n
                    };
                    var insRes = await sb.from("invoices").insert(inst).select().single();
                    if (insRes.error) { alert("Erreur échéance " + i + " : " + dbErrorMessage(insRes.error)); return; }
                    if (i === 1) await sb.from("quotes").update({ status: "invoiced", converted_invoice_id: insRes.data.id }).eq("id", q.id);
                }
                await refreshData();
            }
            await refreshData();
            closeModal("modal-deposit");
            navigate("invoices");
        } catch (err) {
            alert("Erreur : " + err.message);
        } finally {
            btn.disabled = false; btn.textContent = "Créer";
        }
    };

    window.createBalanceFor = async function (depositInvoiceId) {
        var deposit = state.invoices.find(function (i) { return i.id === depositInvoiceId; });
        if (!deposit || deposit.doc_type !== "deposit") return;
        if (!canCreateInvoice()) { quotaBlockedAlert(); return; }
        if (!await iconfirm("Créer la facture de solde pour cet acompte ?")) return;
        var q = deposit.parent_quote_id ? state.quotes.find(function (x) { return x.id === deposit.parent_quote_id; }) : null;
        if (!q) { alert("Devis lié introuvable."); return; }
        var pct = Number(deposit.deposit_percent) || 30;
        var today = new Date().toISOString().slice(0, 10);
        var due = new Date(); due.setDate(due.getDate() + 30);
        var items = (q.items || []).map(function (it) {
            var depPart = round2(Number(it.total) * (pct / 100));
            var u = round2(Number(it.total) - depPart);
            return { description: "Solde " + (100 - pct) + "% — " + it.description, quantity: 1, unitPrice: u, total: u };
        });
        var subBal = round2(Number(q.subtotal_ht) - Number(deposit.subtotal_ht));
        var tvaBal = round2(Number(q.tva_amount) - Number(deposit.tva_amount));
        var totBal = round2(Number(q.total_ttc) - Number(deposit.total_ttc));
        var payload = {
            user_id: state.user.id, number: nextInvoiceNumber(), client_id: q.client_id,
            date: today, due_date: due.toISOString().slice(0, 10),
            items: items,
            subtotal_ht: subBal, tva_rate: q.tva_rate,
            tva_amount: tvaBal, total_ttc: totBal,
            status: "pending", doc_type: "balance", parent_quote_id: q.id, parent_invoice_id: deposit.id
        };
        var ins = await sb.from("invoices").insert(payload).select().single();
        if (ins.error) { alert("Erreur : " + dbErrorMessage(ins.error)); return; }
        await refreshData();
        renderInvoices();
    };
    window.newDocFree = function () {
        closeModal("modal-newdoc");
        document.getElementById("btn-new-invoice").click();
    };
    window.newDocFromQuote = function () {
        var accepted = state.quotes.filter(function (q) { return q.status === "accepted"; });
        var body = document.getElementById("newdoc-body");
        if (accepted.length === 0) {
            body.innerHTML = '<p style="color:var(--text-muted)">Aucun devis accepté en attente de conversion. Faites accepter un devis dans l\'onglet Devis.</p>'
                + '<div class="modal-actions"><button class="btn btn-outline" onclick="openNewDocMenu()">Retour</button></div>';
            return;
        }
        var rows = accepted.map(function (q) {
            var client = state.clients.find(function (c) { return c.id === q.client_id; });
            return '<div class="row"><span>' + esc(q.number) + ' — ' + esc(client ? client.name : "—") + ' <span style="color:var(--text-muted)">' + formatMoney(Number(q.total_ttc)) + '</span></span>'
                + '<button class="btn btn-sm btn-primary" onclick="convertToInvoice(\'' + q.id + '\')">Convertir</button></div>';
        }).join("");
        body.innerHTML = '<div class="detail-list">' + rows + '</div>'
            + '<div class="modal-actions"><button class="btn btn-outline" onclick="openNewDocMenu()">Retour</button></div>';
    };
    window.newDocCredit = function () {
        var payable = state.invoices.filter(function (i) { return i.status === "paid" && !i.credit_note_id; });
        var body = document.getElementById("newdoc-body");
        if (payable.length === 0) {
            body.innerHTML = '<p style="color:var(--text-muted)">Aucune facture payée à annuler. Un avoir s\'émet sur une facture déjà réglée.</p>'
                + '<div class="modal-actions"><button class="btn btn-outline" onclick="openNewDocMenu()">Retour</button></div>';
            return;
        }
        var rows = payable.map(function (inv) {
            var client = state.clients.find(function (c) { return c.id === inv.client_id; });
            return '<div class="row"><span>' + esc(inv.number) + ' — ' + esc(client ? client.name : "—") + ' <span style="color:var(--text-muted)">' + formatMoney(Number(inv.total_ttc)) + '</span></span>'
                + '<button class="btn btn-sm btn-outline" onclick="closeModal(\'modal-newdoc\');openCreditNote(\'' + inv.id + '\')">Émettre l\'avoir</button></div>';
        }).join("");
        body.innerHTML = '<div class="detail-list">' + rows + '</div>'
            + '<div class="modal-actions"><button class="btn btn-outline" onclick="openNewDocMenu()">Retour</button></div>';
    };

    // --- Credit Notes (avoirs) ---
    function nextCreditNoteNumber() {
        var year = new Date().getFullYear();
        return "AVOIR-" + year + "-" + String(maxSeqForYear(state.creditNotes, year) + 1).padStart(3, "0");
    }

    window.openCreditNote = function (invoiceId) {
        var inv = state.invoices.find(function (i) { return i.id === invoiceId; });
        if (!inv) return;
        document.getElementById("cn-invoice-id").value = inv.id;
        document.getElementById("cn-invoice-ref").value = inv.number + " — " + formatMoney(Number(inv.total_ttc));
        document.getElementById("cn-number").value = nextCreditNoteNumber();
        document.getElementById("cn-total").value = formatMoney(Number(inv.total_ttc));
        document.getElementById("cn-reason").value = "";
        openModal("modal-credit-note");
    };

    document.getElementById("credit-note-form").addEventListener("submit", async function (e) {
        e.preventDefault();
        var invoiceId = document.getElementById("cn-invoice-id").value;
        var inv = state.invoices.find(function (i) { return i.id === invoiceId; });
        if (!inv) return;

        var payload = {
            user_id: state.user.id,
            number: nextCreditNoteNumber(),
            invoice_id: inv.id,
            client_id: inv.client_id,
            date: new Date().toISOString().slice(0, 10),
            items: inv.items,
            subtotal_ht: inv.subtotal_ht,
            tva_rate: inv.tva_rate,
            tva_amount: inv.tva_amount,
            total_ttc: inv.total_ttc,
            reason: document.getElementById("cn-reason").value.trim()
        };

        var insertRes = await sb.from("credit_notes").insert(payload).select().single();
        if (insertRes.error) { alert("Erreur : " + dbErrorMessage(insertRes.error)); return; }

        var linkRes = await sb.from("invoices").update({ credit_note_id: insertRes.data.id }).eq("id", inv.id);
        if (linkRes.error) {
            await sb.from("credit_notes").delete().eq("id", insertRes.data.id);
            alert("Erreur lors de l'association de l'avoir à la facture. L'avoir a été annulé.");
            return;
        }

        await refreshData();
        closeModal("modal-credit-note");
        navigate("invoices");
    });


    window.downloadCreditNotePDF = function (id) {
        var cn = state.creditNotes.find(function (x) { return x.id === id; });
        if (!cn) return;
        var inv = state.invoices.find(function (i) { return i.id === cn.invoice_id; });
        renderDocumentPDF(cn, {
            title: "AVOIR",
            recipientLabel: "Client",
            metaLabel: "Facture d'origine",
            metaDate: inv ? inv.date : cn.date,
            footerNote: "Avoir émis en annulation de la facture " + (inv ? inv.number : "N/A") + ". Motif : " + (cn.reason || "—")
        });
    };

    // --- PDF export (print-to-PDF, dependency-free) ---
    // Generic renderer shared by invoices and quotes.
    // opts = { title, metaLabel, metaDate, footerNote }
    function renderDocumentPDF(doc, opts) {
        var client = state.clients.find(function (c) { return c.id === doc.client_id; }) || {};
        var p = state.profile || {};

        var itemsHtml = (doc.items || []).map(function (it) {
            return '<tr>'
                + '<td>' + esc(it.description) + '</td>'
                + '<td class="r">' + it.quantity + '</td>'
                + '<td class="r">' + formatMoney(it.unitPrice) + '</td>'
                + '<td class="r">' + formatMoney(it.total) + '</td>'
                + '</tr>';
        }).join("");

        // Auto legal mention for the VAT-exempt micro-entrepreneur regime.
        var mentionsText = p.mentions || (Number(doc.tva_rate) === 0 ? "TVA non applicable, art. 293 B du CGI" : "");
        var mentions = mentionsText ? '<p class="mentions">' + esc(mentionsText) + '</p>' : "";
        var tvaLine = Number(doc.tva_rate) > 0
            ? '<tr><td>TVA (' + doc.tva_rate + '%)</td><td class="r">' + formatMoney(Number(doc.tva_amount)) + '</td></tr>'
            : '<tr><td>TVA</td><td class="r">Non applicable</td></tr>';

        var accent = /^#[0-9A-Fa-f]{3,8}$/.test(p.template_color || "") ? p.template_color : "#4F46E5";
        var font = safeCssValue(p.template_font || "Arial");
        var html = '<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>' + esc(opts.title) + ' ' + esc(doc.number) + '</title>'
            + '<style>'
            + '*{margin:0;padding:0;box-sizing:border-box;font-family:' + font + ',Helvetica,sans-serif;}'
            + 'body{padding:40px;color:#1E293B;font-size:13px;line-height:1.5;}'
            + '.head{display:flex;justify-content:space-between;margin-bottom:40px;align-items:flex-start;}'
            + '.from h2{font-size:18px;margin-bottom:8px;}'
            + '.from p,.to p{color:#475569;font-size:12px;}'
            + '.to{text-align:right;}'
            + '.to .label{font-size:11px;text-transform:uppercase;color:#94A3B8;margin-bottom:4px;}'
            + '.title{font-size:28px;font-weight:800;color:' + accent + ';margin-bottom:4px;}'
            + '.logo-img{max-width:140px;max-height:70px;margin-bottom:10px;display:block;}'
            + '.meta{color:#64748B;font-size:12px;margin-bottom:32px;}'
            + 'table.items{width:100%;border-collapse:collapse;margin-bottom:24px;}'
            + 'table.items th{background:#F1F5F9;text-align:left;padding:10px;font-size:11px;text-transform:uppercase;color:#64748B;}'
            + 'table.items td{padding:10px;border-bottom:1px solid #E2E8F0;}'
            + '.r{text-align:right;}'
            + 'table.totals{margin-left:auto;width:280px;border-collapse:collapse;}'
            + 'table.totals td{padding:6px 10px;}'
            + 'table.totals .grand td{font-weight:800;font-size:15px;border-top:2px solid ' + accent + ';color:' + accent + ';}'
            + '.mentions{margin-top:40px;padding-top:16px;border-top:1px solid #E2E8F0;color:#94A3B8;font-size:11px;}'
            + '.bank{margin-top:24px;padding:14px 16px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;font-size:11px;color:#475569;}'
            + '.bank strong{display:block;font-size:12px;color:#1E293B;margin-bottom:4px;}'
            + '.bank .row{display:flex;gap:24px;flex-wrap:wrap;}'
            + '.bank .field{}'
            + '.bank .label{color:#94A3B8;font-size:10px;text-transform:uppercase;letter-spacing:.03em;}'
            + '.footer{margin-top:8px;color:#94A3B8;font-size:11px;}'
            + '@media print{body{padding:0;}}'
            + '</style></head><body>'
            + '<div class="head">'
            + '<div class="from">'
            + (p.template_logo_url && /^(https:\/\/|data:image\/)/.test(p.template_logo_url) ? '<img class="logo-img" src="' + esc(p.template_logo_url) + '" alt="Logo">' : '')
            + '<h2>' + esc(p.name || "Votre entreprise") + '</h2>'
            + '<p>' + esc(p.address || "") + '</p><p>' + esc(p.city || "") + '</p>'
            + (p.siret ? '<p>SIRET : ' + esc(p.siret) + '</p>' : "")
            + (p.tva_number ? '<p>TVA : ' + esc(p.tva_number) + '</p>' : "")
            + (p.email ? '<p>' + esc(p.email) + '</p>' : "")
            + (p.phone ? '<p>' + esc(p.phone) + '</p>' : "")
            + '</div>'
            + '<div class="to"><div class="label">' + esc(opts.recipientLabel) + '</div>'
            + '<p><strong>' + esc(client.name || "") + '</strong></p>'
            + '<p>' + esc(client.address || "") + '</p><p>' + esc(client.city || "") + '</p>'
            + (client.siret ? '<p>SIRET : ' + esc(client.siret) + '</p>' : "")
            + '</div></div>'
            + '<div class="title">' + esc(opts.title) + '</div>'
            + '<div class="meta">N° ' + esc(doc.number) + ' &bull; Date : ' + formatDate(doc.date) + ' &bull; ' + esc(opts.metaLabel) + ' : ' + formatDate(opts.metaDate)
            + (doc.po_number ? ' &bull; Bon de commande : ' + esc(doc.po_number) : "") + '</div>'
            + '<table class="items"><thead><tr><th>Description</th><th class="r">Qté</th><th class="r">Prix unit.</th><th class="r">Total HT</th></tr></thead>'
            + '<tbody>' + itemsHtml + '</tbody></table>'
            + '<table class="totals">'
            + '<tr><td>Sous-total HT</td><td class="r">' + formatMoney(Number(doc.subtotal_ht)) + '</td></tr>'
            + tvaLine
            + '<tr class="grand"><td>Total TTC</td><td class="r">' + formatMoney(Number(doc.total_ttc)) + '</td></tr>'
            + '</table>';

        if (p.iban) {
            html += '<div class="bank"><strong>Règlement par virement</strong><div class="row">'
                + (p.bank_holder ? '<div class="field"><div class="label">Titulaire</div>' + esc(p.bank_holder) + '</div>' : '')
                + (p.bank_name ? '<div class="field"><div class="label">Banque</div>' + esc(p.bank_name) + '</div>' : '')
                + '<div class="field"><div class="label">IBAN</div>' + esc(p.iban) + '</div>'
                + (p.bic ? '<div class="field"><div class="label">BIC</div>' + esc(p.bic) + '</div>' : '')
                + '</div></div>';
        }

        html += mentions
            + '<p class="footer">' + esc(opts.footerNote) + '</p>'
            + '</body></html>';

        var win = window.open("", "_blank");
        if (!win) { alert("Veuillez autoriser les pop-ups pour générer le PDF."); return; }
        win.document.write(html);
        win.document.close();
        win.focus();
        setTimeout(function () { win.print(); }, 300);
    }

    window.downloadPDF = function (id) {
        var inv = state.invoices.find(function (i) { return i.id === id; });
        if (!inv) return;
        renderDocumentPDF(inv, {
            title: "FACTURE",
            recipientLabel: "Facturé à",
            metaLabel: "Échéance",
            metaDate: inv.due_date,
            footerNote: "En cas de retard de paiement, des pénalités de retard sont exigibles (art. L441-10 du Code de commerce). Indemnité forfaitaire pour frais de recouvrement : 40 €."
        });
    };

    // --- Quotes (devis) ---
    var quoteFilter = { status: "all", search: "" };
    var quoteSort = { key: "date", dir: "desc" };

    window.sortQuotes = function (key) {
        if (quoteSort.key === key) quoteSort.dir = quoteSort.dir === "asc" ? "desc" : "asc";
        else { quoteSort.key = key; quoteSort.dir = key === "client" || key === "number" ? "asc" : "desc"; }
        renderQuotes();
    };
    window.setQuoteFilter = function (status) { quoteFilter.status = status; renderQuotes(); };

    function renderQuoteFilters() {
        var bar = document.getElementById("quote-filters");
        if (!bar) return;
        var pills = [
            { s: "all", label: "Tous" },
            { s: "pending", label: "En attente" },
            { s: "accepted", label: "Acceptés" },
            { s: "rejected", label: "Refusés" },
            { s: "invoiced", label: "Facturés" }
        ];
        bar.innerHTML = pills.map(function (p) {
            return '<button class="filter-pill' + (quoteFilter.status === p.s ? " active" : "") + '" onclick="setQuoteFilter(\'' + p.s + '\')">' + p.label + '</button>';
        }).join("");
    }

    function renderQuotes() {
        renderQuoteFilters();
        var container = document.getElementById("quotes-list");
        if (state.quotes.length === 0) {
            container.innerHTML = '<div class="empty-state"><div class="empty-icon">&#128203;</div><p>Aucun devis pour le moment</p><button class="btn btn-primary" onclick="document.getElementById(\'btn-new-quote\').click()">Créer mon premier devis</button></div>';
            return;
        }
        var term = quoteFilter.search.trim().toLowerCase();
        var list = state.quotes.filter(function (q) {
            if (quoteFilter.status !== "all" && q.status !== quoteFilter.status) return false;
            if (term) {
                var client = state.clients.find(function (c) { return c.id === q.client_id; });
                if (((q.number || "") + " " + (client ? client.name : "")).toLowerCase().indexOf(term) === -1) return false;
            }
            return true;
        });
        var k = quoteSort.key, dir = quoteSort.dir === "asc" ? 1 : -1;
        list.sort(function (a, b) {
            var va, vb;
            if (k === "client") {
                va = (state.clients.find(function (c) { return c.id === a.client_id; }) || {}).name || "";
                vb = (state.clients.find(function (c) { return c.id === b.client_id; }) || {}).name || "";
                return va.localeCompare(vb) * dir;
            }
            if (k === "amount") { va = Number(a.total_ttc); vb = Number(b.total_ttc); }
            else if (k === "number") { return String(a.number).localeCompare(String(b.number)) * dir; }
            else { va = a.date; vb = b.date; }
            return (va < vb ? -1 : va > vb ? 1 : 0) * dir;
        });
        if (list.length === 0) { container.innerHTML = '<div class="empty-state"><p>Aucun devis ne correspond à ces critères.</p></div>'; return; }
        function arrow(key) { return quoteSort.key === key ? (quoteSort.dir === "asc" ? " ↑" : " ↓") : ""; }
        var html = '<table><thead><tr>'
            + '<th class="sortable" onclick="sortQuotes(\'number\')">N°' + arrow("number") + '</th>'
            + '<th class="sortable" onclick="sortQuotes(\'client\')">Client' + arrow("client") + '</th>'
            + '<th class="sortable" onclick="sortQuotes(\'date\')">Date' + arrow("date") + '</th>'
            + '<th class="sortable" onclick="sortQuotes(\'amount\')">Montant TTC' + arrow("amount") + '</th>'
            + '<th>Statut</th><th>Actions</th></tr></thead><tbody>';
        list.forEach(function (q) {
            var client = state.clients.find(function (c) { return c.id === q.client_id; });
            var map = {
                pending: { cls: "status-pending", label: "En attente" },
                accepted: { cls: "status-paid", label: "Accepté" },
                rejected: { cls: "status-overdue", label: "Refusé" },
                invoiced: { cls: "status-paid", label: "Facturé" }
            };
            var s = map[q.status] || map.pending;
            html += '<tr>';
            html += '<td><strong>' + esc(q.number) + '</strong></td>';
            html += '<td>' + esc(client ? client.name : "—") + '</td>';
            html += '<td>' + formatDate(q.date) + '</td>';
            html += '<td>' + formatMoney(Number(q.total_ttc)) + '</td>';
            html += '<td><span class="status ' + s.cls + '"><span class="status-dot"></span>' + s.label + '</span></td>';
            html += '<td>';
            html += '<button class="btn btn-sm btn-outline" onclick="downloadQuotePDF(\'' + q.id + '\')">PDF</button> ';
            if (q.status === "pending") {
                html += '<button class="btn btn-sm btn-outline" onclick="setQuoteStatus(\'' + q.id + '\',\'accepted\')">Accepter</button> ';
                html += '<button class="btn btn-sm btn-outline" onclick="setQuoteStatus(\'' + q.id + '\',\'rejected\')">Refuser</button> ';
            }
            if (q.status === "accepted") {
                html += '<button class="btn btn-sm btn-primary" onclick="convertToInvoice(\'' + q.id + '\')">Convertir en facture</button> ';
            }
            if (q.status === "invoiced") {
                html += '<span style="color:var(--text-muted);font-size:.8rem">→ facture créée</span> ';
                if (q.signed_document_url) {
                    html += '<a href="#" class="receipt-link" onclick="viewSignedQuote(\'' + esc(q.signed_document_url) + '\');return false">Devis signé</a> ';
                } else if (q.signature_data) {
                    html += '<a href="#" class="receipt-link" onclick="viewSignaturePreview(\'' + q.id + '\');return false">Signé en ligne</a> ';
                }
            }
            html += '<button class="btn btn-sm btn-outline" onclick="deleteQuote(\'' + q.id + '\')">Suppr.</button>';
            html += '</td></tr>';
        });
        html += '</tbody></table>';
        container.innerHTML = html;
    }

    window.setQuoteStatus = async function (id, status) {
        var res = await sb.from("quotes").update({ status: status }).eq("id", id);
        if (res.error) { alert("Erreur : " + res.error.message); return; }
        await refreshData();
        renderQuotes();
    };

    window.deleteQuote = async function (id) {
        if (!await iconfirm("Supprimer ce devis ?")) return;
        var res = await sb.from("quotes").delete().eq("id", id);
        if (res.error) { alert("Erreur : " + res.error.message); return; }
        await refreshData();
        renderQuotes();
    };

    var sqMode = "sign";
    var sqHasDrawn = false;
    window.setSqMode = function (mode) {
        sqMode = mode;
        document.querySelectorAll(".sq-tab").forEach(function (t, i) {
            t.classList.toggle("active", (i === 0 && mode === "sign") || (i === 1 && mode === "upload"));
        });
        document.getElementById("sq-pane-sign").style.display = mode === "sign" ? "" : "none";
        document.getElementById("sq-pane-upload").style.display = mode === "upload" ? "" : "none";
    };
    window.clearSignature = function () {
        var c = document.getElementById("sq-canvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        sqHasDrawn = false;
    };
    function setupSignaturePad() {
        var c = document.getElementById("sq-canvas");
        if (!c) return;
        var ctx = c.getContext("2d");
        ctx.lineWidth = 2.2; ctx.lineCap = "round"; ctx.strokeStyle = "#1E293B";
        ctx.clearRect(0, 0, c.width, c.height);
        sqHasDrawn = false;
        var drawing = false, lastX = 0, lastY = 0;
        function pos(e) {
            var rect = c.getBoundingClientRect();
            var x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
            var y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
            return { x: x * (c.width / rect.width), y: y * (c.height / rect.height) };
        }
        function start(e) { e.preventDefault(); drawing = true; var p = pos(e); lastX = p.x; lastY = p.y; sqHasDrawn = true; }
        function move(e) {
            if (!drawing) return;
            e.preventDefault();
            var p = pos(e);
            ctx.beginPath(); ctx.moveTo(lastX, lastY); ctx.lineTo(p.x, p.y); ctx.stroke();
            lastX = p.x; lastY = p.y;
        }
        function end() { drawing = false; }
        c.onmousedown = start; c.onmousemove = move; c.onmouseup = end; c.onmouseleave = end;
        c.ontouchstart = start; c.ontouchmove = move; c.ontouchend = end;
    }

    window.convertToInvoice = function (id) {
        var q = state.quotes.find(function (x) { return x.id === id; });
        if (!q) return;
        if (!canCreateInvoice()) { quotaBlockedAlert(); return; }
        document.getElementById("sq-quote-id").value = id;
        document.getElementById("sq-file").value = "";
        document.getElementById("sq-signer-name").value = "";
        setSqMode("sign");
        openModal("modal-signed-quote");
        setTimeout(setupSignaturePad, 50);
    };

    window.submitSignedAndConvert = async function () {
        var id = document.getElementById("sq-quote-id").value;
        var q = state.quotes.find(function (x) { return x.id === id; });
        if (!q) return;

        var btn = document.getElementById("sq-submit");
        btn.disabled = true; btn.textContent = "Envoi en cours…";

        try {
            var quoteUpdate = { status: "invoiced", signed_at: new Date().toISOString() };

            if (sqMode === "sign") {
                if (!sqHasDrawn) { alert("Veuillez signer dans la zone prévue ou choisir l'option upload."); return; }
                var signerName = document.getElementById("sq-signer-name").value.trim();
                if (!signerName) { alert("Veuillez indiquer le nom du signataire."); return; }
                var canvas = document.getElementById("sq-canvas");
                quoteUpdate.signature_data = canvas.toDataURL("image/png");
                quoteUpdate.signer_name = signerName;
            } else {
                var file = document.getElementById("sq-file").files[0];
                if (!file) { alert("Veuillez joindre le devis signé."); return; }
                var ext = file.name.split(".").pop();
                var path = state.user.id + "/devis-signe-" + q.number + "." + ext;
                var uploadRes = await sb.storage.from("signed_quotes").upload(path, file, { upsert: true });
                if (uploadRes.error) { alert("Erreur upload : " + uploadRes.error.message); return; }
                quoteUpdate.signed_document_url = uploadRes.data.path;
            }

            var today = new Date().toISOString().slice(0, 10);
            var due = new Date(); due.setDate(due.getDate() + 30);

            var invoicePayload = {
                user_id: state.user.id,
                number: nextInvoiceNumber(),
                client_id: q.client_id,
                date: today,
                due_date: due.toISOString().slice(0, 10),
                items: q.items,
                subtotal_ht: q.subtotal_ht,
                tva_rate: q.tva_rate,
                tva_amount: q.tva_amount,
                total_ttc: q.total_ttc,
                status: "pending",
                parent_quote_id: q.id
            };
            var insertRes = await sb.from("invoices").insert(invoicePayload).select().single();
            if (insertRes.error) { alert("Erreur : " + dbErrorMessage(insertRes.error)); return; }

            quoteUpdate.converted_invoice_id = insertRes.data.id;
            await sb.from("quotes").update(quoteUpdate).eq("id", id);

            await refreshData();
            closeModal("modal-signed-quote");
            closeModal("modal-newdoc");
            navigate("invoices");
        } catch (err) {
            alert("Erreur : " + err.message);
        } finally {
            btn.disabled = false; btn.textContent = "Convertir en facture";
        }
    };

    window.downloadQuotePDF = function (id) {
        var q = state.quotes.find(function (x) { return x.id === id; });
        if (!q) return;
        renderDocumentPDF(q, {
            title: "DEVIS",
            recipientLabel: "Destinataire",
            metaLabel: "Valable jusqu'au",
            metaDate: q.valid_until,
            footerNote: "Devis valable jusqu'au " + formatDate(q.valid_until) + ". Bon pour accord : date, signature et mention « Bon pour accord » du client."
        });
    };

    // --- New Quote ---
    function setupQuoteModal() {
        var select = document.getElementById("q-client");
        select.innerHTML = '<option value="">Sélectionner un client</option>';
        state.clients.forEach(function (c) {
            select.innerHTML += '<option value="' + c.id + '">' + esc(c.name) + '</option>';
        });

        var today = new Date().toISOString().slice(0, 10);
        document.getElementById("q-date").value = today;
        var valid = new Date(); valid.setDate(valid.getDate() + 30);
        document.getElementById("q-valid-until").value = valid.toISOString().slice(0, 10);

        document.getElementById("q-number").value = nextQuoteNumber();

        var rate = state.profile.tva_rate != null ? state.profile.tva_rate : 20;
        document.getElementById("q-tva-rate-display").textContent = rate;

        document.getElementById("quote-items").innerHTML = itemRow();
        recalcQuote();
    }

    document.getElementById("btn-add-quote-item").addEventListener("click", function () {
        document.getElementById("quote-items").insertAdjacentHTML("beforeend", itemRow());
    });

    document.getElementById("quote-items").addEventListener("input", recalcQuote);
    document.getElementById("quote-items").addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-item")) {
            var rows = document.getElementById("quote-items").querySelectorAll("tr");
            if (rows.length > 1) e.target.closest("tr").remove();
            recalcQuote();
        }
    });

    function recalcQuote() {
        var subtotal = 0;
        document.querySelectorAll("#quote-items tr").forEach(function (row) {
            var qty = parseFloat(row.querySelector(".item-qty").value) || 0;
            var price = parseFloat(row.querySelector(".item-price").value) || 0;
            var total = qty * price;
            subtotal += total;
            row.querySelector(".item-total").textContent = formatMoney(total);
        });
        var rate = state.profile.tva_rate != null ? Number(state.profile.tva_rate) : 20;
        var tva = subtotal * rate / 100;
        document.getElementById("q-subtotal").textContent = formatMoney(subtotal);
        document.getElementById("q-tva-amount").textContent = formatMoney(tva);
        document.getElementById("q-total").textContent = formatMoney(subtotal + tva);
    }

    document.getElementById("btn-new-quote").addEventListener("click", function () {
        if (state.clients.length === 0) {
            alert("Ajoutez d'abord un client avant de créer un devis.");
            navigate("clients");
            return;
        }
        document.getElementById("quote-form").reset();
        setupQuoteModal();
        openModal("modal-quote");
    });

    document.getElementById("quote-form").addEventListener("submit", async function (e) {
        e.preventDefault();
        var items = collectItems("#quote-items tr");
        if (items.length === 0) { alert("Ajoutez au moins une ligne."); return; }

        var subtotal = items.reduce(function (s, i) { return s + i.total; }, 0);
        var rate = state.profile.tva_rate != null ? Number(state.profile.tva_rate) : 20;
        var tva = subtotal * rate / 100;

        var payload = {
            user_id: state.user.id,
            number: nextQuoteNumber(),
            client_id: document.getElementById("q-client").value,
            date: document.getElementById("q-date").value,
            valid_until: document.getElementById("q-valid-until").value,
            items: items,
            subtotal_ht: subtotal,
            tva_rate: rate,
            tva_amount: tva,
            total_ttc: subtotal + tva,
            status: "pending"
        };

        var res = await sb.from("quotes").insert(payload);
        if (res.error) { alert("Erreur : " + dbErrorMessage(res.error)); return; }
        await refreshData();
        closeModal("modal-quote");
        navigate("quotes");
    });

    // --- Recurring invoices ---
    var FREQ_LABEL = { monthly: "Mensuelle", quarterly: "Trimestrielle", yearly: "Annuelle" };

    function advanceDate(isoDate, frequency) {
        var d = new Date(isoDate + "T00:00:00");
        if (frequency === "monthly") d.setMonth(d.getMonth() + 1);
        else if (frequency === "quarterly") d.setMonth(d.getMonth() + 3);
        else if (frequency === "yearly") d.setFullYear(d.getFullYear() + 1);
        return d.toISOString().slice(0, 10);
    }

    // Catch-up generation: create any invoices due since the last run.
    async function processRecurring() {
        var today = new Date().toISOString().slice(0, 10);
        var generatedCount = 0;

        for (var i = 0; i < state.recurring.length; i++) {
            var r = state.recurring[i];
            if (!r.active) continue;
            if (["monthly", "quarterly", "yearly"].indexOf(r.frequency) === -1) continue;

            var nextRun = r.next_run;
            var lastGenerated = r.last_generated;
            var didGenerate = false;
            var safety = 0;

            // Generate one invoice per due period, catching up multiple periods.
            while (nextRun <= today && safety++ < 120) {
                if (!canCreateInvoice()) break;
                var subtotal = round2((r.items || []).reduce(function (s, it) { return s + Number(it.total); }, 0));
                var rate = Number(r.tva_rate);
                var tva = round2(subtotal * rate / 100);
                var due = advanceDate(nextRun, "monthly"); // 30-day-ish due window

                var insertRes = await sb.from("invoices").insert({
                    user_id: state.user.id,
                    number: nextInvoiceNumber(),
                    client_id: r.client_id,
                    date: nextRun,
                    due_date: due,
                    items: r.items,
                    subtotal_ht: subtotal,
                    tva_rate: rate,
                    tva_amount: tva,
                    total_ttc: round2(subtotal + tva),
                    status: "pending"
                }).select().single();

                if (insertRes.error) break;
                state.invoices.unshift(insertRes.data);
                generatedCount++;
                didGenerate = true;
                lastGenerated = nextRun;
                var advanced = advanceDate(nextRun, r.frequency);
                if (advanced === nextRun) break;
                nextRun = advanced;
            }

            if (didGenerate) {
                await sb.from("recurring_invoices")
                    .update({ next_run: nextRun, last_generated: lastGenerated })
                    .eq("id", r.id);
            }
        }

        if (generatedCount > 0) await refreshData();
    }

    function renderRecurring() {
        var container = document.getElementById("recurring-list");
        if (state.recurring.length === 0) {
            container.innerHTML = '<div class="empty-state"><div class="empty-icon">&#128260;</div><p>Aucune facture récurrente</p><button class="btn btn-primary" onclick="document.getElementById(\'btn-new-recurring\').click()">Créer une récurrence</button></div>';
            return;
        }
        var html = '<table><thead><tr><th>Libellé</th><th>Client</th><th>Fréquence</th><th>Prochaine émission</th><th>Montant TTC</th><th>Statut</th><th>Actions</th></tr></thead><tbody>';
        state.recurring.forEach(function (r) {
            var client = state.clients.find(function (c) { return c.id === r.client_id; });
            var subtotal = (r.items || []).reduce(function (s, it) { return s + Number(it.total); }, 0);
            var ttc = subtotal * (1 + Number(r.tva_rate) / 100);
            html += '<tr>';
            html += '<td><strong>' + esc(r.label) + '</strong></td>';
            html += '<td>' + esc(client ? client.name : "—") + '</td>';
            html += '<td>' + (FREQ_LABEL[r.frequency] || r.frequency) + '</td>';
            html += '<td>' + (r.active ? formatDate(r.next_run) : "—") + '</td>';
            html += '<td>' + formatMoney(ttc) + '</td>';
            html += '<td><span class="status ' + (r.active ? "status-paid" : "status-pending") + '"><span class="status-dot"></span>' + (r.active ? "Active" : "En pause") + '</span></td>';
            html += '<td>';
            html += '<button class="btn btn-sm btn-outline" onclick="toggleRecurring(\'' + r.id + '\',' + (!r.active) + ')">' + (r.active ? "Mettre en pause" : "Réactiver") + '</button> ';
            html += '<button class="btn btn-sm btn-outline" onclick="deleteRecurring(\'' + r.id + '\')">Suppr.</button>';
            html += '</td></tr>';
        });
        html += '</tbody></table>';
        container.innerHTML = html;
    }

    window.toggleRecurring = async function (id, active) {
        var res = await sb.from("recurring_invoices").update({ active: active }).eq("id", id);
        if (res.error) { alert("Erreur : " + res.error.message); return; }
        await refreshData();
        if (active) await processRecurring();
        renderRecurring();
    };

    window.deleteRecurring = async function (id) {
        if (!await iconfirm("Supprimer cette récurrence ? Les factures déjà générées sont conservées.")) return;
        var res = await sb.from("recurring_invoices").delete().eq("id", id);
        if (res.error) { alert("Erreur : " + res.error.message); return; }
        await refreshData();
        renderRecurring();
    };

    // --- New Recurring ---
    function setupRecurringModal() {
        var select = document.getElementById("r-client");
        select.innerHTML = '<option value="">Sélectionner un client</option>';
        state.clients.forEach(function (c) {
            select.innerHTML += '<option value="' + c.id + '">' + esc(c.name) + '</option>';
        });
        document.getElementById("r-next-run").value = new Date().toISOString().slice(0, 10);
        var rate = state.profile.tva_rate != null ? state.profile.tva_rate : 20;
        document.getElementById("r-tva-rate-display").textContent = rate;
        document.getElementById("recurring-items").innerHTML = itemRow();
        recalcRecurring();
    }

    document.getElementById("btn-add-recurring-item").addEventListener("click", function () {
        document.getElementById("recurring-items").insertAdjacentHTML("beforeend", itemRow());
    });

    document.getElementById("recurring-items").addEventListener("input", recalcRecurring);
    document.getElementById("recurring-items").addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-item")) {
            var rows = document.getElementById("recurring-items").querySelectorAll("tr");
            if (rows.length > 1) e.target.closest("tr").remove();
            recalcRecurring();
        }
    });

    function recalcRecurring() {
        var subtotal = 0;
        document.querySelectorAll("#recurring-items tr").forEach(function (row) {
            var qty = parseFloat(row.querySelector(".item-qty").value) || 0;
            var price = parseFloat(row.querySelector(".item-price").value) || 0;
            var total = qty * price;
            subtotal += total;
            row.querySelector(".item-total").textContent = formatMoney(total);
        });
        var rate = state.profile.tva_rate != null ? Number(state.profile.tva_rate) : 20;
        var tva = subtotal * rate / 100;
        document.getElementById("r-subtotal").textContent = formatMoney(subtotal);
        document.getElementById("r-tva-amount").textContent = formatMoney(tva);
        document.getElementById("r-total").textContent = formatMoney(subtotal + tva);
    }

    document.getElementById("btn-new-recurring").addEventListener("click", function () {
        if (state.clients.length === 0) {
            alert("Ajoutez d'abord un client avant de créer une récurrence.");
            navigate("clients");
            return;
        }
        document.getElementById("recurring-form").reset();
        setupRecurringModal();
        openModal("modal-recurring");
    });

    document.getElementById("recurring-form").addEventListener("submit", async function (e) {
        e.preventDefault();
        var items = collectItems("#recurring-items tr");
        if (items.length === 0) { alert("Ajoutez au moins une ligne."); return; }
        var rate = state.profile.tva_rate != null ? Number(state.profile.tva_rate) : 20;

        var payload = {
            user_id: state.user.id,
            label: document.getElementById("r-label").value.trim(),
            client_id: document.getElementById("r-client").value,
            items: items,
            tva_rate: rate,
            frequency: document.getElementById("r-frequency").value,
            next_run: document.getElementById("r-next-run").value,
            active: true
        };

        var res = await sb.from("recurring_invoices").insert(payload);
        if (res.error) { alert("Erreur : " + res.error.message); return; }
        await refreshData();
        await processRecurring();
        closeModal("modal-recurring");
        navigate("recurring");
    });

    // --- Clients ---
    function clientBalance(clientId) {
        // Outstanding = unpaid, non-cancelled invoices for this client.
        var invoiced = 0, paid = 0, outstanding = 0;
        state.invoices.forEach(function (inv) {
            if (inv.client_id !== clientId || inv.credit_note_id) return;
            invoiced += Number(inv.total_ttc);
            if (inv.status === "paid") paid += Number(inv.total_ttc);
            else outstanding += Number(inv.total_ttc);
        });
        return { invoiced: invoiced, paid: paid, outstanding: outstanding };
    }

    function renderClients() {
        var container = document.getElementById("clients-list");
        var term = (document.getElementById("client-search").value || "").trim().toLowerCase();
        if (state.clients.length === 0) {
            container.innerHTML = emptyState("&#128101;", "Aucun client pour le moment", "btn-new-client", "Ajouter un client");
            return;
        }
        var list = state.clients.filter(function (c) {
            if (!term) return true;
            return [c.name, c.email, c.city].some(function (v) { return v && String(v).toLowerCase().indexOf(term) !== -1; });
        });
        if (list.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>Aucun client ne correspond à « ' + esc(term) + ' ».</p></div>';
            return;
        }
        var html = '<table><thead><tr><th>Nom</th><th>Email</th><th>Ville</th><th>Factures</th><th>Solde dû</th><th>Actions</th></tr></thead><tbody>';
        list.forEach(function (c) {
            var invCount = state.invoices.filter(function (i) { return i.client_id === c.id; }).length;
            var bal = clientBalance(c.id);
            html += '<tr>';
            html += '<td><a href="#" onclick="openClientDetail(\'' + c.id + '\');return false" style="color:var(--primary);font-weight:600;text-decoration:none">' + esc(c.name) + '</a></td>';
            html += '<td>' + esc(c.email || "—") + '</td>';
            html += '<td>' + esc(c.city || "—") + '</td>';
            html += '<td>' + invCount + '</td>';
            html += '<td' + (bal.outstanding > 0 ? ' style="color:var(--warning);font-weight:600"' : '') + '>' + formatMoney(bal.outstanding) + '</td>';
            html += '<td>';
            html += '<button class="btn btn-sm btn-outline" onclick="openClientDetail(\'' + c.id + '\')">Voir</button> ';
            html += '<button class="btn btn-sm btn-outline" onclick="editClient(\'' + c.id + '\')">Modifier</button> ';
            html += '<button class="btn btn-sm btn-outline" onclick="deleteClient(\'' + c.id + '\')">Suppr.</button>';
            html += '</td>';
            html += '</tr>';
        });
        html += '</tbody></table>';
        container.innerHTML = html;
    }

    document.getElementById("client-search").addEventListener("input", renderClients);
    document.getElementById("invoice-search").addEventListener("input", function () { invoiceFilter.search = this.value; renderInvoices(); });
    document.getElementById("quote-search").addEventListener("input", function () { quoteFilter.search = this.value; renderQuotes(); });

    window.openClientDetail = function (id) {
        var c = state.clients.find(function (x) { return x.id === id; });
        if (!c) return;
        document.getElementById("cd-title").textContent = c.name;
        var bal = clientBalance(id);

        var contact = [c.email, c.city, c.address, c.siret ? "SIRET : " + c.siret : ""]
            .filter(Boolean).map(esc).join(" &bull; ") || "—";

        var quotesPending = state.quotes.filter(function (q) { return q.client_id === id && q.status === "pending"; });
        var quotesValid = state.quotes.filter(function (q) { return q.client_id === id && (q.status === "accepted" || q.status === "invoiced"); });
        var invoices = state.invoices.filter(function (i) { return i.client_id === id; });
        var credits = state.creditNotes.filter(function (cn) { return cn.client_id === id; });

        function line(number, date, right, pdfCall) {
            return '<div class="row"><span>' + esc(number) + ' <span style="color:var(--text-muted)">' + formatDate(date) + '</span></span>'
                + '<span style="display:flex;gap:12px;align-items:center">' + right
                + '<button class="btn btn-sm btn-outline" onclick="' + pdfCall + '">PDF</button></span></div>';
        }
        function emptyRow() { return '<div class="row"><span style="color:var(--text-muted)">Aucun document</span></div>'; }

        function quoteList(arr) {
            if (arr.length === 0) return emptyRow();
            return arr.map(function (q) {
                return line(q.number, q.date, formatMoney(Number(q.total_ttc)), "downloadQuotePDF('" + q.id + "')");
            }).join("");
        }
        var tabPending = quoteList(quotesPending);
        var tabValid = quoteList(quotesValid);
        var tabInvoices = invoices.length === 0 ? emptyRow() : invoices.map(function (inv) {
            var label = inv.credit_note_id ? "Annulée" : (inv.status === "paid" ? "Payée" : "En attente");
            return line(inv.number, inv.date, formatMoney(Number(inv.total_ttc)) + ' <span style="color:var(--text-muted)">' + label + '</span>', "downloadPDF('" + inv.id + "')");
        }).join("");
        var tabCredits = credits.length === 0 ? emptyRow() : credits.map(function (cn) {
            return line(cn.number, cn.date, '<span style="color:var(--danger)">-' + formatMoney(Number(cn.total_ttc)) + '</span>', "downloadCreditNotePDF('" + cn.id + "')");
        }).join("");

        function tabBtn(idx, label, count) {
            return '<button class="cd-tab' + (idx === 0 ? " active" : "") + '" onclick="clientDetailTab(' + idx + ')">' + label + ' <span class="cd-count">' + count + '</span></button>';
        }

        document.getElementById("client-detail-body").innerHTML =
            '<div class="detail-section"><p style="color:var(--text-muted);font-size:.88rem">' + contact + '</p></div>'
            + '<div class="detail-section"><div class="detail-balance">'
            + '<div class="bal"><div class="bal-label">Facturé</div><div class="bal-value">' + formatMoney(bal.invoiced) + '</div></div>'
            + '<div class="bal"><div class="bal-label">Encaissé</div><div class="bal-value" style="color:var(--success)">' + formatMoney(bal.paid) + '</div></div>'
            + '<div class="bal"><div class="bal-label">Solde dû</div><div class="bal-value" style="color:' + (bal.outstanding > 0 ? "var(--warning)" : "var(--text)") + '">' + formatMoney(bal.outstanding) + '</div></div>'
            + '</div></div>'
            + '<div class="detail-section" style="display:flex;gap:10px">'
            + '<button class="btn btn-sm btn-outline" onclick="newQuoteForClient(\'' + id + '\')">+ Nouveau devis</button>'
            + '<button class="btn btn-sm btn-primary" onclick="newInvoiceForClient(\'' + id + '\')">+ Nouvelle facture</button>'
            + '</div>'
            + '<div class="cd-tabs">' + tabBtn(0, "Devis en attente", quotesPending.length) + tabBtn(1, "Devis validés", quotesValid.length) + tabBtn(2, "Factures", invoices.length) + tabBtn(3, "Avoirs", credits.length) + '</div>'
            + '<div class="cd-tab-pane active" data-tab="0"><div class="detail-list">' + tabPending + '</div></div>'
            + '<div class="cd-tab-pane" data-tab="1" style="display:none"><div class="detail-list">' + tabValid + '</div></div>'
            + '<div class="cd-tab-pane" data-tab="2" style="display:none"><div class="detail-list">' + tabInvoices + '</div></div>'
            + '<div class="cd-tab-pane" data-tab="3" style="display:none"><div class="detail-list">' + tabCredits + '</div></div>';

        openModal("modal-client-detail");
    };

    window.clientDetailTab = function (idx) {
        document.querySelectorAll("#client-detail-body .cd-tab").forEach(function (b, i) { b.classList.toggle("active", i === idx); });
        document.querySelectorAll("#client-detail-body .cd-tab-pane").forEach(function (p) {
            p.style.display = String(p.dataset.tab) === String(idx) ? "" : "none";
        });
    };

    window.newQuoteForClient = function (clientId) {
        closeModal("modal-client-detail");
        document.getElementById("quote-form").reset();
        setupQuoteModal();
        document.getElementById("q-client").value = clientId;
        openModal("modal-quote");
    };
    window.newInvoiceForClient = function (clientId) {
        closeModal("modal-client-detail");
        if (!canCreateInvoice()) { quotaBlockedAlert(); return; }
        document.getElementById("invoice-form").reset();
        setupInvoiceModal();
        document.getElementById("inv-client").value = clientId;
        openModal("modal-invoice");
    };

    window.deleteClient = async function (id) {
        if (!await iconfirm("Supprimer ce client ?")) return;
        var res = await sb.from("clients").delete().eq("id", id);
        if (res.error) { alert("Erreur : " + res.error.message); return; }
        await refreshData();
        renderClients();
    };

    // --- Expenses (factures reçues) ---
    function recalcExpense() {
        var ht = parseFloat(document.getElementById("exp-ht").value) || 0;
        var tva = parseFloat(document.getElementById("exp-tva").value) || 0;
        document.getElementById("exp-ttc").textContent = formatMoney(ht + tva);
    }
    document.getElementById("exp-ht").addEventListener("input", recalcExpense);
    document.getElementById("exp-tva").addEventListener("input", recalcExpense);

    document.getElementById("btn-new-expense").addEventListener("click", function () {
        document.getElementById("expense-form").reset();
        document.getElementById("exp-date").value = new Date().toISOString().slice(0, 10);
        // Autocomplétion fournisseurs existants.
        document.getElementById("supplier-datalist").innerHTML =
            state.suppliers.map(function (s) { return '<option value="' + esc(s.name) + '">'; }).join("");
        recalcExpense();
        openModal("modal-expense");
    });

    // Trouve un fournisseur par nom (insensible à la casse) ou le crée. Renvoie son id.
    async function resolveSupplierId(name) {
        if (!name) return null;
        var existing = state.suppliers.find(function (s) { return s.name && s.name.toLowerCase() === name.toLowerCase(); });
        if (existing) return existing.id;
        var res = await sb.from("suppliers").insert({ user_id: state.user.id, name: name }).select().single();
        if (res.error) return null;
        state.suppliers.push(res.data);
        return res.data.id;
    }

    document.getElementById("expense-form").addEventListener("submit", async function (e) {
        e.preventDefault();
        var btn = document.getElementById("exp-submit");
        btn.disabled = true; var lbl = btn.textContent; btn.textContent = "Enregistrement…";
        try {
            var ht = parseFloat(document.getElementById("exp-ht").value) || 0;
            var tva = parseFloat(document.getElementById("exp-tva").value) || 0;

            var filePath = null;
            var fileInput = document.getElementById("exp-file");
            if (fileInput.files && fileInput.files[0]) {
                var f = fileInput.files[0];
                var ext = (f.name.split(".").pop() || "bin").toLowerCase();
                filePath = state.user.id + "/" + Date.now() + "-" + Math.random().toString(36).slice(2, 8) + "." + ext;
                var up = await sb.storage.from("receipts").upload(filePath, f, { upsert: false });
                if (up.error) { alert("Erreur lors de l'envoi du fichier : " + up.error.message); return; }
            }

            var supplierName = document.getElementById("exp-supplier").value.trim();
            var supplierId = isPro() ? await resolveSupplierId(supplierName) : null;
            var payload = {
                user_id: state.user.id,
                supplier: supplierName,
                supplier_id: supplierId,
                date: document.getElementById("exp-date").value,
                category: document.getElementById("exp-category").value,
                amount_ht: ht,
                tva_amount: tva,
                amount_ttc: ht + tva,
                note: document.getElementById("exp-note").value.trim(),
                file_path: filePath
            };
            var res = await sb.from("expenses").insert(payload);
            if (res.error) { alert("Erreur : " + res.error.message); return; }
            await refreshData();
            closeModal("modal-expense");
            renderExpenses();
        } finally {
            btn.disabled = false; btn.textContent = lbl;
        }
    });

    var EXP_CAT_LABEL = {
        achats: "Achats", services: "Services ext.", fournitures: "Fournitures",
        loyer: "Loyer & charges", logiciels: "Logiciels", deplacements: "Déplacements", autre: "Autre"
    };

    function renderExpenses() {
        var container = document.getElementById("expenses-list");
        if (!isPro()) { container.innerHTML = proGateHTML("Les factures reçues et le suivi des dépenses"); return; }
        var term = (document.getElementById("expense-search").value || "").trim().toLowerCase();
        if (state.expenses.length === 0) {
            container.innerHTML = emptyState("&#128722;", "Aucune dépense enregistrée", "btn-new-expense", "Ajouter une dépense");
            return;
        }
        var list = state.expenses.filter(function (x) {
            if (!term) return true;
            return (x.supplier && x.supplier.toLowerCase().indexOf(term) !== -1) || (x.note && x.note.toLowerCase().indexOf(term) !== -1);
        });
        if (list.length === 0) { container.innerHTML = '<div class="empty-state"><p>Aucune dépense ne correspond.</p></div>'; return; }
        var html = '<table><thead><tr><th>Fournisseur</th><th>Date</th><th>Catégorie</th><th>HT</th><th>TVA</th><th>TTC</th><th>Justif.</th><th></th></tr></thead><tbody>';
        list.forEach(function (x) {
            html += '<tr>';
            html += '<td><strong>' + esc(x.supplier || "—") + '</strong>' + (x.note ? '<br><span style="color:var(--text-muted);font-size:.8rem">' + esc(x.note) + '</span>' : '') + '</td>';
            html += '<td>' + formatDate(x.date) + '</td>';
            html += '<td>' + esc(EXP_CAT_LABEL[x.category] || x.category) + '</td>';
            html += '<td>' + formatMoney(Number(x.amount_ht)) + '</td>';
            html += '<td>' + formatMoney(Number(x.tva_amount)) + '</td>';
            html += '<td><strong>' + formatMoney(Number(x.amount_ttc)) + '</strong></td>';
            html += '<td>' + (x.file_path ? '<button class="btn btn-sm btn-outline" onclick="downloadReceipt(\'' + encodeURIComponent(x.file_path) + '\')">Voir</button>' : '—') + '</td>';
            html += '<td><button class="btn btn-sm btn-outline" onclick="deleteExpense(\'' + x.id + '\')">Suppr.</button></td>';
            html += '</tr>';
        });
        html += '</tbody></table>';
        container.innerHTML = html;
    }

    document.getElementById("expense-search").addEventListener("input", renderExpenses);

    window.downloadReceipt = async function (encodedPath) {
        var path = decodeURIComponent(encodedPath);
        var res = await sb.storage.from("receipts").createSignedUrl(path, 120);
        if (res.error) { alert("Erreur : " + res.error.message); return; }
        window.open(res.data.signedUrl, "_blank");
    };

    window.deleteExpense = async function (id) {
        if (!await iconfirm("Supprimer cette dépense ?")) return;
        var x = state.expenses.find(function (e) { return e.id === id; });
        if (x && x.file_path) { await sb.storage.from("receipts").remove([x.file_path]); }
        var res = await sb.from("expenses").delete().eq("id", id);
        if (res.error) { alert("Erreur : " + res.error.message); return; }
        await refreshData();
        renderExpenses();
    };

    // --- Suppliers (fournisseurs, plan Pro) ---
    function expensesOfSupplier(sup) {
        return state.expenses.filter(function (x) {
            if (x.supplier_id) return x.supplier_id === sup.id;
            return x.supplier && sup.name && x.supplier.toLowerCase() === sup.name.toLowerCase();
        });
    }
    function supplierTotal(sup) {
        return expensesOfSupplier(sup).reduce(function (s, x) { return s + Number(x.amount_ttc); }, 0);
    }

    function renderSupplierInsights() {
        var box = document.getElementById("suppliers-insights");
        if (!box) return;
        if (!isPro() || state.suppliers.length === 0 || state.expenses.length === 0) { box.innerHTML = ""; return; }
        var totals = state.suppliers.map(function (s) {
            return { name: s.name, total: supplierTotal(s), count: expensesOfSupplier(s).length };
        }).filter(function (s) { return s.total > 0; }).sort(function (a, b) { return b.total - a.total; });
        if (totals.length === 0) { box.innerHTML = ""; return; }
        var grandTotal = totals.reduce(function (s, x) { return s + x.total; }, 0);
        var top5 = totals.slice(0, 5);
        var dependanceTop1 = grandTotal > 0 ? Math.round(top5[0].total / grandTotal * 100) : 0;
        var dependanceLevel = dependanceTop1 >= 50 ? "danger" : (dependanceTop1 >= 30 ? "warning" : "success");
        var dependanceLabel = dependanceTop1 >= 50 ? "Forte dépendance" : (dependanceTop1 >= 30 ? "Dépendance modérée" : "Bien réparti");

        var rows = top5.map(function (s) {
            var pct = grandTotal > 0 ? (s.total / grandTotal * 100) : 0;
            return '<div class="dep-row"><span class="dep-name">' + esc(s.name) + '</span>'
                + '<span class="dep-bar"><span class="dep-fill" style="width:' + pct.toFixed(1) + '%"></span></span>'
                + '<span class="dep-val">' + formatMoney(s.total) + '</span>'
                + '<span class="dep-pct">' + pct.toFixed(0) + '%</span></div>';
        }).join("");

        box.innerHTML = '<div class="acct-grid">'
            + '<div class="acct-card"><div class="acct-head">Top fournisseurs</div><div class="acct-body">' + rows + '</div></div>'
            + '<div class="acct-card"><div class="acct-head">Dépendance fournisseurs</div><div class="acct-body">'
            + '<div class="dep-score dep-score-' + dependanceLevel + '">' + dependanceTop1 + '%</div>'
            + '<div class="dep-level dep-level-' + dependanceLevel + '">' + dependanceLabel + '</div>'
            + '<p style="font-size:.82rem;color:var(--text-muted);margin-top:8px">Part du fournisseur principal dans vos achats. Au-delà de 50 %, vous êtes vulnérable à un défaut.</p>'
            + '<div style="margin-top:14px;font-size:.85rem">Total achats : <strong>' + formatMoney(grandTotal) + '</strong> sur ' + totals.length + ' fournisseur(s)</div>'
            + '</div></div></div>';
    }

    function renderSuppliers() {
        renderSupplierInsights();
        var container = document.getElementById("suppliers-list");
        if (!isPro()) { container.innerHTML = proGateHTML("Le carnet de fournisseurs"); return; }
        var term = (document.getElementById("supplier-search").value || "").trim().toLowerCase();
        if (state.suppliers.length === 0) {
            container.innerHTML = emptyState("&#127981;", "Aucun fournisseur enregistré", "btn-new-supplier", "Ajouter un fournisseur");
            return;
        }
        var list = state.suppliers.filter(function (s) {
            if (!term) return true;
            return [s.name, s.email, s.city].some(function (v) { return v && String(v).toLowerCase().indexOf(term) !== -1; });
        });
        if (list.length === 0) { container.innerHTML = '<div class="empty-state"><p>Aucun fournisseur ne correspond.</p></div>'; return; }
        var html = '<table><thead><tr><th>Nom</th><th>Email</th><th>Ville</th><th>Dépenses</th><th>Total acheté</th><th>Actions</th></tr></thead><tbody>';
        list.forEach(function (s) {
            var exp = expensesOfSupplier(s);
            html += '<tr>';
            html += '<td><a href="#" onclick="openSupplierDetail(\'' + s.id + '\');return false" style="color:var(--primary);font-weight:600;text-decoration:none">' + esc(s.name) + '</a></td>';
            html += '<td>' + esc(s.email || "—") + '</td>';
            html += '<td>' + esc(s.city || "—") + '</td>';
            html += '<td>' + exp.length + '</td>';
            html += '<td>' + formatMoney(supplierTotal(s)) + '</td>';
            html += '<td>';
            html += '<button class="btn btn-sm btn-outline" onclick="openSupplierDetail(\'' + s.id + '\')">Voir</button> ';
            html += '<button class="btn btn-sm btn-outline" onclick="editSupplier(\'' + s.id + '\')">Modifier</button> ';
            html += '<button class="btn btn-sm btn-outline" onclick="deleteSupplier(\'' + s.id + '\')">Suppr.</button>';
            html += '</td></tr>';
        });
        html += '</tbody></table>';
        container.innerHTML = html;
    }
    document.getElementById("supplier-search").addEventListener("input", renderSuppliers);

    document.getElementById("btn-new-supplier").addEventListener("click", function () {
        document.getElementById("supplier-form").reset();
        document.getElementById("supplier-edit-id").value = "";
        document.getElementById("modal-supplier-title").textContent = "Nouveau fournisseur";
        openModal("modal-supplier");
    });

    window.editSupplier = function (id) {
        var s = state.suppliers.find(function (x) { return x.id === id; });
        if (!s) return;
        document.getElementById("supplier-edit-id").value = s.id;
        document.getElementById("supplier-name").value = s.name || "";
        document.getElementById("supplier-email").value = s.email || "";
        document.getElementById("supplier-address").value = s.address || "";
        document.getElementById("supplier-city").value = s.city || "";
        document.getElementById("supplier-siret").value = s.siret || "";
        document.getElementById("modal-supplier-title").textContent = "Modifier le fournisseur";
        openModal("modal-supplier");
    };

    document.getElementById("supplier-form").addEventListener("submit", async function (e) {
        e.preventDefault();
        var editId = document.getElementById("supplier-edit-id").value;
        var siret = document.getElementById("supplier-siret").value.trim();
        if (!isValidSIRET(siret)) { alert("SIRET invalide (14 chiffres, contrôle Luhn)."); return; }
        var payload = {
            name: document.getElementById("supplier-name").value.trim(),
            email: document.getElementById("supplier-email").value.trim(),
            address: document.getElementById("supplier-address").value.trim(),
            city: document.getElementById("supplier-city").value.trim(),
            siret: siret
        };
        var res;
        if (editId) res = await sb.from("suppliers").update(payload).eq("id", editId);
        else { payload.user_id = state.user.id; res = await sb.from("suppliers").insert(payload); }
        if (res.error) { alert("Erreur : " + res.error.message); return; }
        await refreshData();
        closeModal("modal-supplier");
        renderSuppliers();
    });

    window.deleteSupplier = async function (id) {
        if (!await iconfirm("Supprimer ce fournisseur ? Les dépenses liées sont conservées.")) return;
        var res = await sb.from("suppliers").delete().eq("id", id);
        if (res.error) { alert("Erreur : " + res.error.message); return; }
        await refreshData();
        renderSuppliers();
    };

    window.openSupplierDetail = function (id) {
        var s = state.suppliers.find(function (x) { return x.id === id; });
        if (!s) return;
        document.getElementById("sd-title").textContent = s.name;
        var contact = [s.email, s.city, s.address, s.siret ? "SIRET : " + s.siret : ""]
            .filter(Boolean).map(esc).join(" &bull; ") || "—";
        var exp = expensesOfSupplier(s).sort(function (a, b) { return a.date < b.date ? 1 : -1; });
        var rows = exp.length === 0
            ? '<div class="row"><span style="color:var(--text-muted)">Aucune dépense</span></div>'
            : exp.map(function (x) {
                var receiptLink = "";
                if (x.file_path) {
                    receiptLink = ' <a href="#" class="receipt-link" onclick="viewReceipt(\'' + esc(x.file_path) + '\');return false">Justificatif</a>';
                }
                return '<div class="row"><span>' + formatDate(x.date) + ' — ' + esc(EXP_CAT_LABEL[x.category] || x.category)
                    + (x.note ? ' <span style="color:var(--text-muted)">' + esc(x.note) + '</span>' : '') + receiptLink + '</span><span>' + formatMoney(Number(x.amount_ttc)) + '</span></div>';
            }).join("");
        document.getElementById("supplier-detail-body").innerHTML =
            '<div class="detail-section"><p style="color:var(--text-muted);font-size:.88rem">' + contact + '</p></div>'
            + '<div class="detail-section"><div class="detail-balance">'
            + '<div class="bal"><div class="bal-label">Dépenses</div><div class="bal-value">' + exp.length + '</div></div>'
            + '<div class="bal"><div class="bal-label">Total acheté (TTC)</div><div class="bal-value">' + formatMoney(supplierTotal(s)) + '</div></div>'
            + '</div></div>'
            + '<div class="detail-section"><h3>Historique des achats</h3><div class="detail-list">' + rows + '</div></div>';
        openModal("modal-supplier-detail");
    };

    window.viewReceipt = async function (path) {
        var res = await sb.storage.from("receipts").createSignedUrl(path, 3600);
        if (res.error || !res.data) { alert("Impossible d'ouvrir le justificatif."); return; }
        window.open(res.data.signedUrl, "_blank");
    };

    window.viewSignedQuote = async function (path) {
        var res = await sb.storage.from("signed_quotes").createSignedUrl(path, 3600);
        if (res.error || !res.data) { alert("Impossible d'ouvrir le document signé."); return; }
        window.open(res.data.signedUrl, "_blank");
    };
    window.viewSignaturePreview = function (quoteId) {
        var q = state.quotes.find(function (x) { return x.id === quoteId; });
        if (!q || !q.signature_data) return;
        var w = window.open("", "_blank");
        if (!w) { alert("Pop-up bloquée."); return; }
        w.document.write('<!DOCTYPE html><html><head><title>Signature — ' + esc(q.number) + '</title>'
            + '<style>body{font-family:Arial,sans-serif;padding:40px;background:#F1F5F9;text-align:center}'
            + '.card{background:#fff;padding:30px;border-radius:10px;display:inline-block;box-shadow:0 4px 12px rgba(0,0,0,.1)}'
            + 'h2{margin-bottom:20px}img{border:1px solid #E2E8F0;border-radius:6px;background:#fff;max-width:540px}</style></head><body>'
            + '<div class="card"><h2>Devis ' + esc(q.number) + ' — signature électronique</h2>'
            + (q.signer_name ? '<p style="margin-bottom:14px">Signataire : <strong>' + esc(q.signer_name) + '</strong></p>' : '')
            + (isDataImageUrl(q.signature_data) ? '<img src="' + q.signature_data + '">' : '<p style="color:red">Signature invalide</p>')
            + '<p style="margin-top:14px;color:#64748B;font-size:.85rem">Signé le ' + formatDate(q.signed_at) + '</p>'
            + '</div></body></html>');
        w.document.close();
    };

    // --- Performance (analytics devis) ---
    var perfView = null;
    function renderPerformance() {
        renderRangeControls("performance");
        var b = rangeBounds(rangeState.performance);

        var quotes = state.quotes.filter(function (q) { return dateInBounds(q.date, b); });
        var total = quotes.length;
        var byStatus = { pending: 0, accepted: 0, rejected: 0, invoiced: 0 };
        var amount = 0;
        quotes.forEach(function (q) { byStatus[q.status] = (byStatus[q.status] || 0) + 1; amount += Number(q.total_ttc); });
        var validated = byStatus.accepted + byStatus.invoiced; // devis validés
        var convRate = total ? Math.round(validated / total * 100) : 0;
        var caRate = total ? Math.round(byStatus.invoiced / total * 100) : 0;
        var avg = total ? amount / total : 0;

        perfView = { bounds: b, quotes: quotes, total: total, byStatus: byStatus, validated: validated, avg: avg };

        document.getElementById("perf-total").textContent = total;
        document.getElementById("perf-conv").textContent = convRate + "%";
        document.getElementById("perf-ca").textContent = caRate + "%";
        document.getElementById("perf-avg").textContent = formatMoney(avg);

        // Entonnoir Émis → Acceptés/Facturés → Facturés.
        function funnelRow(label, count, color) {
            var pct = total ? Math.round(count / total * 100) : 0;
            return '<div class="funnel-row"><div class="funnel-label">' + label + ' <strong>' + count + '</strong></div>'
                + '<div class="funnel-bar"><div class="funnel-fill" style="width:' + pct + '%;background:' + color + '"></div></div>'
                + '<div class="funnel-pct">' + pct + '%</div></div>';
        }
        document.getElementById("perf-funnel").innerHTML =
            funnelRow("Devis émis", total, "var(--primary)")
            + funnelRow("Devis validés", validated, "var(--success)")
            + funnelRow("Convertis en facture", byStatus.invoiced, "#0EA5E9")
            + funnelRow("Refusés", byStatus.rejected, "var(--danger)");

        // Devis en attente depuis plus de 30 jours (à relancer).
        var now = new Date();
        var stale = quotes.filter(function (q) {
            return q.status === "pending" && (now - new Date(q.date)) / 86400000 > 30;
        });
        var staleHtml = stale.length === 0
            ? '<p style="color:var(--text-muted);font-size:.88rem">Aucun devis en attente depuis plus de 30 jours.</p>'
            : '<div class="detail-list">' + stale.map(function (q) {
                var client = state.clients.find(function (c) { return c.id === q.client_id; });
                var days = Math.floor((now - new Date(q.date)) / 86400000);
                return '<div class="row"><span>' + esc(q.number) + ' — ' + esc(client ? client.name : "—") + '</span><span style="color:var(--warning)">' + days + ' jours</span></div>';
            }).join("") + '</div>';
        document.getElementById("perf-stale").innerHTML = staleHtml;

        // Top clients par montant de devis validés.
        var byClient = {};
        quotes.forEach(function (q) {
            if (q.status !== "accepted" && q.status !== "invoiced") return;
            byClient[q.client_id] = (byClient[q.client_id] || 0) + Number(q.total_ttc);
        });
        var top = Object.keys(byClient).map(function (cid) {
            var c = state.clients.find(function (x) { return x.id === cid; });
            return { name: c ? c.name : "—", amount: byClient[cid] };
        }).sort(function (a, b) { return b.amount - a.amount; }).slice(0, 5);
        document.getElementById("perf-top-clients").innerHTML = top.length === 0
            ? '<p style="color:var(--text-muted);font-size:.88rem">Aucun devis validé sur la période.</p>'
            : '<div class="detail-list">' + top.map(function (t) {
                return '<div class="row"><span>' + esc(t.name) + '</span><span>' + formatMoney(t.amount) + '</span></div>';
            }).join("") + '</div>';
    }

    var QUOTE_STATUS_LABEL = { pending: "En attente", accepted: "Accepté", rejected: "Refusé", invoiced: "Facturé" };
    // --- Drill-down Performance ---
    window.openPerfDetail = function (which) {
        if (!perfView) return;
        var v = perfView, now = new Date();
        function clientName(id) { var c = state.clients.find(function (x) { return x.id === id; }); return c ? c.name : "—"; }
        function qrow(q, right, color) {
            return '<div class="row"><span>' + esc(q.number) + ' — ' + esc(clientName(q.client_id)) + ' <span style="color:var(--text-muted);font-size:.85rem">' + formatDate(q.date) + '</span></span>'
                + '<span' + (color ? ' style="color:' + color + '"' : '') + '>' + right + '</span></div>';
        }
        var title = "", body = "";
        if (which === "total") {
            title = "Devis émis — " + v.bounds.label;
            var lines = v.quotes.slice().sort(function (a, c) { return a.date < c.date ? 1 : -1; }).map(function (q) {
                return qrow(q, formatMoney(Number(q.total_ttc)) + ' · ' + QUOTE_STATUS_LABEL[q.status]);
            });
            body = listOrEmpty(lines) + totalRow("Total devis émis", String(v.total));
        } else if (which === "conv") {
            title = "Taux de transformation — " + v.bounds.label;
            function bucket(label, statuses, color) {
                var arr = v.quotes.filter(function (q) { return statuses.indexOf(q.status) !== -1; });
                if (arr.length === 0) return "";
                return '<div style="font-weight:700;font-size:.82rem;color:' + color + ';margin:10px 0 4px">' + label + ' (' + arr.length + ')</div>'
                    + arr.map(function (q) { return qrow(q, formatMoney(Number(q.total_ttc))); }).join("");
            }
            body = '<p style="color:var(--text-muted);font-size:.9rem;margin-bottom:6px">Validés : <strong>' + v.validated + '</strong> / ' + v.total + ' devis — taux ' + (v.total ? Math.round(v.validated / v.total * 100) : 0) + ' %.</p>'
                + '<div class="detail-list">'
                + bucket("Validés (acceptés + facturés)", ["accepted", "invoiced"], "var(--success)")
                + bucket("En attente", ["pending"], "var(--warning)")
                + bucket("Refusés", ["rejected"], "var(--danger)")
                + '</div>';
        } else if (which === "ca") {
            title = "Devis convertis en facture — " + v.bounds.label;
            var conv = v.quotes.filter(function (q) { return q.status === "invoiced"; });
            var clines = conv.slice().sort(function (a, c) { return a.date < c.date ? 1 : -1; }).map(function (q) {
                var inv = state.invoices.find(function (i) { return i.id === q.converted_invoice_id; });
                var right = inv ? "→ Facture " + esc(inv.number) : formatMoney(Number(q.total_ttc));
                return qrow(q, right, "#0EA5E9");
            });
            body = listOrEmpty(clines) + totalRow("Convertis en facture", String(conv.length));
        } else {
            title = "Montant moyen / devis — " + v.bounds.label;
            var amounts = v.quotes.map(function (q) { return Number(q.total_ttc); }).sort(function (a, c) { return a - c; });
            var median = amounts.length ? (amounts.length % 2 ? amounts[(amounts.length - 1) / 2] : (amounts[amounts.length / 2 - 1] + amounts[amounts.length / 2]) / 2) : 0;
            var min = amounts.length ? amounts[0] : 0, max = amounts.length ? amounts[amounts.length - 1] : 0;
            body = '<div class="tax-summary">'
                + taxStat("Moyenne", formatMoney(v.avg), v.total + " devis")
                + taxStat("Médiane", formatMoney(median), "valeur centrale")
                + taxStat("Min — Max", formatMoney(min) + " → " + formatMoney(max), "amplitude")
                + '</div>'
                + '<div class="detail-list" style="margin-top:10px">' + v.quotes.slice().sort(function (a, c) { return Number(c.total_ttc) - Number(a.total_ttc); }).map(function (q) {
                    return qrow(q, formatMoney(Number(q.total_ttc)));
                }).join("") + '</div>';
        }
        document.getElementById("detail-title").textContent = title;
        document.getElementById("detail-body").innerHTML = body;
        openModal("modal-detail");
    };

    // --- Sélecteur de plage de dates réutilisable ---
    // Modes : year / quarter / month / custom / all. Utilisé par Comptabilité et Performance.
    var MONTH_NAMES = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    function pad2(n) { return String(n).padStart(2, "0"); }
    function lastDayOfMonth(year, month) { return new Date(Number(year), Number(month), 0).getDate(); }

    function defaultRange() {
        var y = String(new Date().getFullYear());
        return { mode: "year", year: y, quarter: Math.floor(new Date().getMonth() / 3) + 1, month: pad2(new Date().getMonth() + 1), from: y + "-01-01", to: y + "-12-31" };
    }
    var rangeState = { accounting: defaultRange(), performance: { mode: "all", year: String(new Date().getFullYear()), quarter: 1, month: "01", from: "", to: "" } };
    var RANGE_CONTAINER = { accounting: "acct-range", performance: "perf-range" };

    function availableYears() {
        var years = {};
        function add(arr) { arr.forEach(function (d) { if (d && d.date) years[String(d.date).slice(0, 4)] = true; }); }
        add(state.invoices); add(state.quotes); add(state.expenses); add(state.creditNotes);
        years[String(new Date().getFullYear())] = true;
        return Object.keys(years).sort().reverse();
    }

    // Renvoie les bornes inclusives { from, to, label, year } d'une plage.
    function rangeBounds(r) {
        if (r.mode === "all") return { from: "0000-01-01", to: "9999-12-31", label: "Toutes périodes", year: String(new Date().getFullYear()) };
        if (r.mode === "custom") {
            var f = r.from || "0000-01-01", t = r.to || "9999-12-31";
            return { from: f, to: t, label: formatDate(f) + " → " + formatDate(t), year: String(f).slice(0, 4) };
        }
        if (r.mode === "quarter") {
            var qs = (r.quarter - 1) * 3 + 1, qe = qs + 2;
            return { from: r.year + "-" + pad2(qs) + "-01", to: r.year + "-" + pad2(qe) + "-" + lastDayOfMonth(r.year, qe), label: "T" + r.quarter + " " + r.year, year: r.year };
        }
        if (r.mode === "month") {
            var mm = Number(r.month);
            return { from: r.year + "-" + r.month + "-01", to: r.year + "-" + r.month + "-" + lastDayOfMonth(r.year, mm), label: MONTH_NAMES[mm - 1] + " " + r.year, year: r.year };
        }
        return { from: r.year + "-01-01", to: r.year + "-12-31", label: "Année " + r.year, year: r.year };
    }
    function dateInBounds(dateStr, b) { var d = String(dateStr).slice(0, 10); return d >= b.from && d <= b.to; }

    function renderRangeControls(key) {
        var container = document.getElementById(RANGE_CONTAINER[key]);
        if (!container) return;
        var r = rangeState[key];
        var years = availableYears();
        function sel(onchange, options) { return '<select class="range-sel" onchange="' + onchange + '">' + options + '</select>'; }
        function optList(arr, cur) { return arr.map(function (o) { return '<option value="' + o.v + '"' + (String(o.v) === String(cur) ? ' selected' : '') + '>' + o.l + '</option>'; }).join(""); }

        var modeOpts = [{ v: "year", l: "Année" }, { v: "quarter", l: "Trimestre" }, { v: "month", l: "Mois" }, { v: "custom", l: "Personnalisé" }];
        if (key === "performance") modeOpts.unshift({ v: "all", l: "Tout l'historique" });
        var html = sel("rngMode('" + key + "',this.value)", optList(modeOpts, r.mode));

        if (r.mode === "year" || r.mode === "quarter" || r.mode === "month") {
            html += sel("rngYear('" + key + "',this.value)", optList(years.map(function (y) { return { v: y, l: y }; }), r.year));
        }
        if (r.mode === "quarter") {
            html += sel("rngQuarter('" + key + "',this.value)", optList([1, 2, 3, 4].map(function (q) { return { v: q, l: "T" + q }; }), r.quarter));
        }
        if (r.mode === "month") {
            html += sel("rngMonth('" + key + "',this.value)", optList(MONTH_NAMES.map(function (m, i) { return { v: pad2(i + 1), l: m }; }), r.month));
        }
        if (r.mode === "custom") {
            html += '<input type="date" class="range-sel" value="' + (r.from || "") + '" onchange="rngFrom(\'' + key + '\',this.value)">'
                + '<span style="color:var(--text-muted);font-size:.85rem">au</span>'
                + '<input type="date" class="range-sel" value="' + (r.to || "") + '" onchange="rngTo(\'' + key + '\',this.value)">';
        }
        // Raccourcis rapides
        html += '<span class="range-quicks">'
            + '<button class="range-quick" onclick="rngQuick(\'' + key + '\',\'ytd\')">Cette année</button>'
            + '<button class="range-quick" onclick="rngQuick(\'' + key + '\',\'quarter\')">Ce trimestre</button>'
            + '<button class="range-quick" onclick="rngQuick(\'' + key + '\',\'30d\')">30 j</button>'
            + '</span>';
        container.innerHTML = html;
    }

    function applyRangeChange(key) {
        renderRangeControls(key);
        if (key === "accounting") renderAccounting();
        else if (key === "performance") renderPerformance();
    }
    window.rngMode = function (key, v) { rangeState[key].mode = v; applyRangeChange(key); };
    window.rngYear = function (key, v) { rangeState[key].year = v; applyRangeChange(key); };
    window.rngQuarter = function (key, v) { rangeState[key].quarter = Number(v); applyRangeChange(key); };
    window.rngMonth = function (key, v) { rangeState[key].month = v; applyRangeChange(key); };
    window.rngFrom = function (key, v) { rangeState[key].from = v; applyRangeChange(key); };
    window.rngTo = function (key, v) { rangeState[key].to = v; applyRangeChange(key); };
    window.rngQuick = function (key, which) {
        var r = rangeState[key];
        var now = new Date();
        if (which === "ytd") { r.mode = "year"; r.year = String(now.getFullYear()); }
        else if (which === "quarter") { r.mode = "quarter"; r.year = String(now.getFullYear()); r.quarter = Math.floor(now.getMonth() / 3) + 1; }
        else if (which === "30d") {
            r.mode = "custom";
            var from = new Date(); from.setDate(from.getDate() - 30);
            r.from = from.toISOString().slice(0, 10); r.to = now.toISOString().slice(0, 10);
        }
        applyRangeChange(key);
    };

    // --- Accounting ---
    function renderAccounting() {
        var gate = document.getElementById("accounting-pro-gate");
        var content = document.getElementById("accounting-content");
        if (!isPro()) {
            content.style.display = "none";
            gate.style.display = "";
            gate.innerHTML = proGateHTML("La comptabilité (compte de résultat & bilan)");
            return;
        }
        gate.style.display = "none";
        content.style.display = "";

        renderRangeControls("accounting");
        var b = rangeBounds(rangeState.accounting);

        // Produits = factures encaissées (HT), moins avoirs (HT).
        var paidInvoices = state.invoices.filter(function (inv) {
            return !inv.credit_note_id && inv.status === "paid" && dateInBounds(inv.date, b);
        });
        var productsGross = 0, tvaCollected = 0;
        paidInvoices.forEach(function (inv) { productsGross += Number(inv.subtotal_ht); tvaCollected += Number(inv.tva_amount); });
        var credits = state.creditNotes.filter(function (cn) { return dateInBounds(cn.date, b); });
        var creditsHT = credits.reduce(function (s, cn) { return s + Number(cn.subtotal_ht); }, 0);
        var productsHT = productsGross - creditsHT;

        // Charges = dépenses (HT), TVA déductible.
        var periodExpenses = state.expenses.filter(function (x) { return dateInBounds(x.date, b); });
        var chargesHT = 0, tvaDeductible = 0, byCat = {};
        periodExpenses.forEach(function (x) {
            chargesHT += Number(x.amount_ht);
            tvaDeductible += Number(x.tva_amount);
            byCat[x.category] = (byCat[x.category] || 0) + Number(x.amount_ht);
        });

        var result = productsHT - chargesHT;

        // Créances clients (factures émises non payées, non annulées).
        var receivables = state.invoices.filter(function (inv) {
            return !inv.credit_note_id && inv.status !== "paid" && dateInBounds(inv.date, b);
        });
        var outstanding = receivables.reduce(function (s, inv) { return s + Number(inv.total_ttc); }, 0);

        // Mémorise la vue pour les drill-downs.
        acctView = {
            bounds: b, paidInvoices: paidInvoices, credits: credits, expenses: periodExpenses,
            receivables: receivables, byCat: byCat, productsHT: productsHT, productsGross: productsGross,
            creditsHT: creditsHT, chargesHT: chargesHT, result: result
        };

        document.getElementById("acct-products").textContent = formatMoney(productsHT);
        document.getElementById("acct-charges").textContent = formatMoney(chargesHT);
        var resEl = document.getElementById("acct-result");
        resEl.textContent = formatMoney(result);
        resEl.style.color = result >= 0 ? "var(--success)" : "var(--danger)";

        // Income statement
        var is = '';
        is += '<div class="acct-line positive"><span>Produits (ventes encaissées, HT)</span><span class="val">' + formatMoney(productsGross) + '</span></div>';
        if (creditsHT > 0) is += '<div class="acct-line negative"><span>Avoirs émis (HT)</span><span class="val">-' + formatMoney(creditsHT) + '</span></div>';
        Object.keys(byCat).forEach(function (cat) {
            is += '<div class="acct-line negative"><span>' + esc(EXP_CAT_LABEL[cat] || cat) + '</span><span class="val">-' + formatMoney(byCat[cat]) + '</span></div>';
        });
        if (Object.keys(byCat).length === 0) is += '<div class="acct-line negative"><span>Charges</span><span class="val">0,00 €</span></div>';
        is += '<div class="acct-line total"><span>Résultat net</span><span class="val" style="color:' + (result >= 0 ? "var(--success)" : "var(--danger)") + '">' + formatMoney(result) + '</span></div>';
        document.getElementById("acct-income-statement").innerHTML = is;

        // Trésorerie & fonds de roulement
        renderTreasury(b, paidInvoices, periodExpenses, credits, outstanding);

        // Simplified balance sheet
        var bs = '';
        bs += '<div style="font-weight:700;font-size:.8rem;color:var(--text-muted);margin:4px 0 6px">ACTIF</div>';
        bs += '<div class="acct-line"><span>Créances clients (factures impayées TTC)</span><span class="val">' + formatMoney(outstanding) + '</span></div>';
        bs += '<div class="acct-line"><span>Résultat net de la période (HT)</span><span class="val">' + formatMoney(result) + '</span></div>';
        bs += '<div style="font-weight:700;font-size:.8rem;color:var(--text-muted);margin:14px 0 6px">TVA</div>';
        bs += '<div class="acct-line"><span>TVA collectée</span><span class="val">' + formatMoney(tvaCollected) + '</span></div>';
        bs += '<div class="acct-line"><span>TVA déductible</span><span class="val">' + formatMoney(tvaDeductible) + '</span></div>';
        bs += '<div class="acct-line total"><span>TVA à reverser</span><span class="val">' + formatMoney(tvaCollected - tvaDeductible) + '</span></div>';
        document.getElementById("acct-balance-sheet").innerHTML = bs;

        renderTax(b.year);
    }

    var acctView = null;

    // Trésorerie nette, BFR, fonds de roulement, DSO.
    function renderTreasury(b, paidInvoices, periodExpenses, credits, outstanding) {
        var cashIn = paidInvoices.reduce(function (s, inv) { return s + Number(inv.total_ttc); }, 0)
            - credits.reduce(function (s, cn) { return s + Number(cn.total_ttc); }, 0);
        var cashOut = periodExpenses.reduce(function (s, x) { return s + Number(x.amount_ttc); }, 0);
        var netCash = cashIn - cashOut;
        // Dettes fournisseurs non suivies dans l'app → 0 (les dépenses sont saisies une fois réglées).
        var payables = 0;
        var bfr = outstanding - payables;

        // DSO = délai moyen d'encaissement (jours entre émission et paiement), si paid_at connu.
        var dsoDays = 0, dsoCount = 0;
        paidInvoices.forEach(function (inv) {
            if (!inv.paid_at) return;
            var d = (new Date(inv.paid_at) - new Date(inv.date)) / 86400000;
            if (d >= 0) { dsoDays += d; dsoCount++; }
        });
        var dso = dsoCount ? Math.round(dsoDays / dsoCount) : null;

        function card(label, value, color, hint) {
            return '<div class="treasury-card">'
                + '<div class="treasury-label">' + label + '</div>'
                + '<div class="treasury-value"' + (color ? ' style="color:' + color + '"' : '') + '>' + value + '</div>'
                + (hint ? '<div class="treasury-hint">' + hint + '</div>' : '') + '</div>';
        }
        document.getElementById("acct-treasury").innerHTML =
            card("Trésorerie nette de la période", formatMoney(netCash), netCash >= 0 ? "var(--success)" : "var(--danger)", "Encaissé − décaissé")
            + card("Créances clients", formatMoney(outstanding), outstanding > 0 ? "var(--warning)" : null, "Factures émises non réglées")
            + card("BFR", formatMoney(bfr), null, "Créances − dettes fournisseurs")
            + card("DSO", dso == null ? "n/d" : (dso + " j"), dso != null && dso > 45 ? "var(--danger)" : null, "Délai moyen d'encaissement");

        var notes = [];
        if (netCash < 0) notes.push("⚠️ Trésorerie négative sur la période : vos décaissements dépassent vos encaissements.");
        if (dso != null && dso > 45) notes.push("⚠️ Délai d'encaissement élevé (" + dso + " j). Pensez à relancer vos factures en attente.");
        if (dso == null) notes.push("Le DSO sera calculé dès que des factures seront marquées payées (date d'encaissement enregistrée).");
        document.getElementById("acct-treasury-detail").innerHTML = notes.length
            ? '<p style="font-size:.8rem;color:var(--text-muted);margin-top:4px">' + notes.map(esc).join("<br>") + '</p>' : "";
    }

    // --- Drill-down Comptabilité ---
    window.openAcctDetail = function (which) {
        if (!acctView) return;
        var v = acctView, body = "", title = "";
        function clientName(id) { var c = state.clients.find(function (x) { return x.id === id; }); return c ? c.name : "—"; }
        function row(left, sub, right, color) {
            return '<div class="row"><span>' + left + (sub ? ' <span style="color:var(--text-muted);font-size:.85rem">' + sub + '</span>' : '') + '</span>'
                + '<span' + (color ? ' style="color:' + color + '"' : '') + '>' + right + '</span></div>';
        }
        if (which === "products") {
            title = "Produits encaissés — " + v.bounds.label;
            var lines = v.paidInvoices.slice().sort(function (a, c) { return a.date < c.date ? 1 : -1; }).map(function (inv) {
                return row(esc(inv.number) + " — " + esc(clientName(inv.client_id)), formatDate(inv.date), formatMoney(Number(inv.subtotal_ht)) + " HT");
            });
            v.credits.forEach(function (cn) {
                lines.push(row("Avoir " + esc(cn.number) + " — " + esc(clientName(cn.client_id)), formatDate(cn.date), "-" + formatMoney(Number(cn.subtotal_ht)) + " HT", "var(--danger)"));
            });
            body = listOrEmpty(lines) + totalRow("Total produits (HT)", formatMoney(v.productsHT));
        } else if (which === "charges") {
            title = "Charges — " + v.bounds.label;
            var clines = v.expenses.slice().sort(function (a, c) { return a.date < c.date ? 1 : -1; }).map(function (x) {
                return row(esc(x.supplier || "—") + " — " + esc(EXP_CAT_LABEL[x.category] || x.category), formatDate(x.date), formatMoney(Number(x.amount_ht)) + " HT");
            });
            body = listOrEmpty(clines) + totalRow("Total charges (HT)", formatMoney(v.chargesHT));
        } else {
            title = "Résultat net — " + v.bounds.label;
            var cats = Object.keys(v.byCat);
            body = '<div class="detail-list">'
                + row("Produits encaissés (HT)", "", formatMoney(v.productsGross), "var(--success)")
                + (v.creditsHT > 0 ? row("Avoirs émis (HT)", "", "-" + formatMoney(v.creditsHT), "var(--danger)") : "")
                + cats.map(function (cat) { return row(esc(EXP_CAT_LABEL[cat] || cat), "", "-" + formatMoney(v.byCat[cat]), "var(--danger)"); }).join("")
                + (cats.length === 0 ? row("Charges", "", "0,00 €") : "")
                + '</div>'
                + totalRow("Résultat net", formatMoney(v.result), v.result >= 0 ? "var(--success)" : "var(--danger)");
        }
        document.getElementById("detail-title").textContent = title;
        document.getElementById("detail-body").innerHTML = body;
        openModal("modal-detail");
    };
    function listOrEmpty(lines) {
        return lines.length ? '<div class="detail-list">' + lines.join("") + '</div>'
            : '<p style="color:var(--text-muted)">Aucune écriture sur cette période.</p>';
    }
    function totalRow(label, value, color) {
        return '<div class="acct-line total" style="margin-top:10px"><span>' + esc(label) + '</span><span class="val"' + (color ? ' style="color:' + color + '"' : '') + '>' + value + '</span></div>';
    }

    // --- Accompagnement fiscal & social (tous statuts) ---
    // Taux indicatifs 2025/2026 — à confirmer chaque année auprès de l'URSSAF / des impôts.
    var URSSAF_RATES = { bic_sales: 0.123, bic_services: 0.212, bnc: 0.246 };
    var URSSAF_LABELS = {
        bic_sales: "Vente de marchandises (BIC) — 12,3 %",
        bic_services: "Prestations de services (BIC) — 21,2 %",
        bnc: "Prestations libérales (BNC) — 24,6 %"
    };
    // Versement libératoire de l'impôt (option micro).
    var VFL_RATES = { bic_sales: 0.01, bic_services: 0.017, bnc: 0.022 };
    // Abattement forfaitaire micro pour le revenu imposable (barème).
    var MICRO_ABATTEMENT = { bic_sales: 0.71, bic_services: 0.50, bnc: 0.34 };
    var CFP_RATE = { bic_sales: 0.001, bic_services: 0.003, bnc: 0.002 }; // contribution formation pro
    // Cotisations sociales TNS au réel (EI/EURL à l'IR), estimation sur le bénéfice.
    var TNS_RATE = 0.45;
    // Charges sociales dirigeant assimilé salarié (SAS/SASU), part patronale + salariale sur le net.
    var ASSIMILE_RATE = 0.82;

    // Barème de l'impôt sur le revenu 2025 (déclaration 2026), 1 part — estimation indicative.
    var IR_BRACKETS = [
        { up: 11497, rate: 0 },
        { up: 29315, rate: 0.11 },
        { up: 83823, rate: 0.30 },
        { up: 180294, rate: 0.41 },
        { up: Infinity, rate: 0.45 }
    ];
    function incomeTaxBareme(taxable) {
        if (taxable <= 0) return 0;
        var tax = 0, prev = 0;
        for (var i = 0; i < IR_BRACKETS.length; i++) {
            var b = IR_BRACKETS[i];
            if (taxable > b.up) { tax += (b.up - prev) * b.rate; prev = b.up; }
            else { tax += (taxable - prev) * b.rate; break; }
        }
        return tax;
    }
    // Impôt sur les sociétés : 15 % jusqu'à 42 500 €, 25 % au-delà.
    function corporateTax(profit) {
        if (profit <= 0) return 0;
        return profit <= 42500 ? profit * 0.15 : 42500 * 0.15 + (profit - 42500) * 0.25;
    }
    function chargesHTForYear(year) {
        return state.expenses.reduce(function (s, x) {
            return String(x.date).slice(0, 4) === String(year) ? s + Number(x.amount_ht) : s;
        }, 0);
    }
    var TAX_DISCLAIMER = "Estimation indicative à partir de vos données InvoicePilot et des taux/barèmes en vigueur (1 part fiscale, sans tenir compte de votre situation personnelle). Elle ne remplace pas votre expert-comptable ni les simulateurs officiels (urssaf.fr, impots.gouv.fr).";

    function caHTForMonths(year, months) {
        var v = 0;
        state.invoices.forEach(function (inv) {
            if (inv.credit_note_id || inv.status !== "paid") return;
            if (String(inv.date).slice(0, 4) !== String(year)) return;
            if (months.indexOf(parseInt(String(inv.date).slice(5, 7), 10)) !== -1) v += Number(inv.subtotal_ht);
        });
        state.creditNotes.forEach(function (cn) {
            if (String(cn.date).slice(0, 4) !== String(year)) return;
            if (months.indexOf(parseInt(String(cn.date).slice(5, 7), 10)) !== -1) v -= Number(cn.subtotal_ht);
        });
        return v;
    }

    // Routeur principal : choisit l'accompagnement selon le statut juridique.
    function renderTax(year) {
        var box = document.getElementById("acct-urssaf");
        if (!box) return;
        var p = state.profile || {};
        var status = p.legal_status || "";
        if (status === "micro") return renderTaxMicro(box, p, year);
        if (status === "ei" || status === "eurl") return renderTaxTNS(box, p, year, status);
        if (status === "sas") return renderTaxAssimile(box, p, year);
        box.innerHTML = taxCard("Accompagnement fiscal & social",
            '<p style="color:var(--text-muted);font-size:.9rem">Renseignez votre <strong>statut juridique</strong> dans '
            + '<a href="#" onclick="goProfile();return false" style="color:var(--primary)">Mon profil</a> pour activer le calcul de vos cotisations et de votre imposition '
            + '(micro-entrepreneur, EI, EURL, SAS/SASU).</p>');
    }

    function taxCard(head, bodyHtml) {
        return '<div class="acct-card"><div class="acct-head">' + esc(head) + '</div><div class="acct-body">' + bodyHtml
            + '<p style="font-size:.76rem;color:var(--text-muted);margin-top:12px;border-top:1px dashed var(--border);padding-top:10px">' + esc(TAX_DISCLAIMER) + '</p>'
            + '</div></div>';
    }

    // --- Micro-entrepreneur : cotisations sur CA + impôt (VFL ou barème) ---
    function renderTaxMicro(box, p, year) {
        var act = p.activity_type || "bnc";
        var rate = URSSAF_RATES[act] || URSSAF_RATES.bnc;
        var cfp = CFP_RATE[act] || CFP_RATE.bnc;
        var vfl = p.tax_option === "vfl";
        var mode = p.urssaf_period === "monthly" ? "monthly" : "quarterly";
        var periods = [];
        if (mode === "monthly") {
            for (var m = 1; m <= 12; m++) periods.push({ label: year + "-" + pad2(m), title: MONTH_NAMES[m - 1] + " " + year, months: [m] });
        } else {
            for (var q = 1; q <= 4; q++) periods.push({ label: year + "-T" + q, title: "T" + q + " " + year, months: [q * 3 - 2, q * 3 - 1, q * 3] });
        }

        var rows = periods.map(function (per) {
            var ca = caHTForMonths(year, per.months);
            var cot = ca * (rate + cfp);
            var imp = vfl ? ca * (VFL_RATES[act] || 0) : 0;
            var due = cot + imp;
            var declared = state.urssaf.find(function (d) { return d.period_label === per.label; });
            var action = declared
                ? '<span class="status status-paid"><span class="status-dot"></span>Déclaré</span>'
                : (ca > 0 ? '<button class="btn btn-sm btn-outline" onclick="declareUrssaf(\'' + per.label + '\',' + ca.toFixed(2) + ',' + due.toFixed(2) + ')">Marquer déclaré</button>' : '<span style="color:var(--text-muted);font-size:.8rem">—</span>');
            return '<div class="acct-line"><span>' + esc(per.title) + '</span>'
                + '<span style="display:flex;gap:14px;align-items:center">'
                + '<span style="color:var(--text-muted)">CA ' + formatMoney(ca) + '</span>'
                + '<span class="val" style="min-width:90px;text-align:right">' + formatMoney(due) + '</span>'
                + action + '</span></div>';
        }).join("");

        var totalCA = caHTForMonths(year, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        var totalCot = totalCA * (rate + cfp);
        var taxable = totalCA * (1 - (MICRO_ABATTEMENT[act] || 0.34));
        var totalImp = vfl ? totalCA * (VFL_RATES[act] || 0) : incomeTaxBareme(taxable);

        var summary =
            '<div class="tax-summary">'
            + taxStat("Cotisations sociales " + year, formatMoney(totalCot), Math.round((rate + cfp) * 1000) / 10 + " % du CA")
            + taxStat(vfl ? "Impôt (versement libératoire)" : "Impôt sur le revenu estimé", formatMoney(totalImp), vfl ? (Math.round((VFL_RATES[act] || 0) * 1000) / 10 + " % du CA") : "barème sur " + formatMoney(taxable))
            + taxStat("Total prélèvements " + year, formatMoney(totalCot + totalImp), "cotisations + impôt")
            + '</div>';

        box.innerHTML = taxCard("Déclaration URSSAF & impôt — micro-entrepreneur",
            '<p style="font-size:.85rem;color:var(--text-muted);margin-bottom:10px">Base : ' + esc(URSSAF_LABELS[act] || URSSAF_LABELS.bnc)
            + ' &bull; Déclaration ' + (mode === "monthly" ? "mensuelle" : "trimestrielle")
            + ' &bull; Impôt : ' + (vfl ? "versement libératoire" : "barème progressif (abattement " + Math.round((MICRO_ABATTEMENT[act] || 0.34) * 100) + " %)") + '.</p>'
            + '<p style="font-size:.8rem;color:var(--text-muted);margin-bottom:8px">Vous pouvez activer/désactiver le versement libératoire dans <a href="#" onclick="goProfile();return false" style="color:var(--primary)">Mon profil</a>.</p>'
            + rows + summary);
    }
    function taxStat(label, value, hint) {
        return '<div class="tax-stat"><div class="tax-stat-label">' + esc(label) + '</div>'
            + '<div class="tax-stat-value">' + value + '</div>'
            + (hint ? '<div class="tax-stat-hint">' + esc(hint) + '</div>' : '') + '</div>';
    }

    // --- EI / EURL à l'IR : TNS, cotisations sur bénéfice + IR au barème ---
    function renderTaxTNS(box, p, year, status) {
        var products = caHTForMonths(year, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        var charges = chargesHTForYear(year);
        var benefit = products - charges;
        var cotis = Math.max(0, benefit) * TNS_RATE;
        // Revenu imposable ≈ bénéfice après déduction des cotisations sociales obligatoires.
        var taxable = Math.max(0, benefit - cotis);
        var ir = incomeTaxBareme(taxable);
        var perLabel = year + "-ANNUEL";
        var declared = state.urssaf.find(function (d) { return d.period_label === perLabel; });
        var statusLabel = status === "eurl" ? "EURL / SARL (gérant majoritaire TNS, à l'IR)" : "Entreprise individuelle (au réel)";

        var acompteN = p.urssaf_period === "monthly" ? 12 : 4;
        var detail =
            '<div class="acct-line"><span>Produits encaissés (HT)</span><span class="val">' + formatMoney(products) + '</span></div>'
            + '<div class="acct-line"><span>Charges déductibles (HT)</span><span class="val">-' + formatMoney(charges) + '</span></div>'
            + '<div class="acct-line total"><span>Bénéfice</span><span class="val">' + formatMoney(benefit) + '</span></div>';

        var summary = '<div class="tax-summary">'
            + taxStat("Cotisations sociales TNS", formatMoney(cotis), "≈ 45 % du bénéfice")
            + taxStat("Impôt sur le revenu estimé", formatMoney(ir), "barème sur " + formatMoney(taxable))
            + taxStat("Acompte URSSAF " + (acompteN === 12 ? "mensuel" : "trimestriel"), formatMoney(cotis / acompteN), "cotisations / " + acompteN)
            + '</div>';

        var action = declared
            ? '<span class="status status-paid"><span class="status-dot"></span>Déclaration ' + year + ' marquée faite</span>'
            : '<button class="btn btn-sm btn-outline" onclick="declareUrssaf(\'' + perLabel + '\',' + benefit.toFixed(2) + ',' + (cotis + ir).toFixed(2) + ')">Marquer la déclaration ' + year + ' comme faite</button>';

        box.innerHTML = taxCard("Cotisations & impôt — " + statusLabel,
            '<p style="font-size:.85rem;color:var(--text-muted);margin-bottom:10px">Les indépendants au réel cotisent sur leur <strong>bénéfice</strong>. '
            + 'L\'URSSAF prélève des acomptes ' + (acompteN === 12 ? "mensuels" : "trimestriels") + ', régularisés après la déclaration annuelle de revenus.</p>'
            + detail + summary
            + '<div style="margin-top:10px">' + action + '</div>');
    }

    // --- SAS / SASU / SARL à l'IS : président assimilé salarié ---
    function renderTaxAssimile(box, p, year) {
        var products = caHTForMonths(year, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        var charges = chargesHTForYear(year);
        var rem = Number(p.annual_remuneration) || 0; // rémunération nette annuelle du dirigeant
        var social = rem * ASSIMILE_RATE;             // charges patronales + salariales
        var profitBeforeRem = products - charges;
        var profitIS = Math.max(0, profitBeforeRem - rem - social); // résultat imposable à l'IS
        var is = corporateTax(profitIS);

        var detail =
            '<div class="acct-line"><span>Produits encaissés (HT)</span><span class="val">' + formatMoney(products) + '</span></div>'
            + '<div class="acct-line"><span>Charges déductibles (HT)</span><span class="val">-' + formatMoney(charges) + '</span></div>'
            + '<div class="acct-line"><span>Rémunération nette dirigeant</span><span class="val">-' + formatMoney(rem) + '</span></div>'
            + '<div class="acct-line"><span>Charges sociales sur rémunération</span><span class="val">-' + formatMoney(social) + '</span></div>'
            + '<div class="acct-line total"><span>Résultat imposable à l\'IS</span><span class="val">' + formatMoney(profitIS) + '</span></div>';

        var summary = '<div class="tax-summary">'
            + taxStat("Charges sociales dirigeant", formatMoney(social), "≈ 82 % du net (assimilé salarié)")
            + taxStat("Impôt sur les sociétés", formatMoney(is), "15 % puis 25 %")
            + taxStat("Net après IS", formatMoney(profitIS - is), "avant dividendes")
            + '</div>';

        box.innerHTML = taxCard("Cotisations & impôt — SAS / SASU / SARL (à l'IS)",
            '<p style="font-size:.85rem;color:var(--text-muted);margin-bottom:10px">Le dirigeant assimilé salarié est soumis aux charges sociales sur sa rémunération. '
            + 'La société paie l\'<strong>impôt sur les sociétés</strong> sur son résultat. Les dividendes éventuels sont soumis au prélèvement forfaitaire unique (30 %).</p>'
            + '<div class="form-group" style="max-width:340px;margin-bottom:12px"><label style="font-size:.82rem">Rémunération nette annuelle du dirigeant (€)</label>'
            + '<input type="number" min="0" step="100" value="' + rem + '" onchange="saveRemuneration(this.value)" placeholder="0"></div>'
            + detail + summary);
    }
    window.saveRemuneration = async function (val) {
        var res = await sb.from("profiles").upsert({ id: state.user.id, annual_remuneration: Number(val) || 0 }).select().single();
        if (res.error) { alert("Erreur : " + res.error.message); return; }
        state.profile = res.data;
        renderAccounting();
    };

    window.declareUrssaf = async function (label, caBase, cot) {
        var res = await sb.from("urssaf_declarations").insert({
            user_id: state.user.id, period_label: label, ca_base: caBase, cotisation: cot
        });
        if (res.error) { alert("Erreur : " + res.error.message); return; }
        await refreshData();
        renderAccounting();
    };
    window.goProfile = function () { navigate("profile"); };

    // --- Export XLSX esthétique ---
    window.openExportModal = function () {
        if (!acctView) renderAccounting();
        openModal("modal-export");
    };

    function xlsxHeader(ws, p, label) {
        var name = p.name || "Mon Entreprise";
        var info = [p.siret ? "SIRET : " + p.siret : "", p.tva_number || "", p.address || "", p.city || ""].filter(Boolean).join(" — ");
        XLSX.utils.sheet_add_aoa(ws, [[name], [info], ["Période : " + label], []], { origin: "A1" });
        ws["!merges"] = ws["!merges"] || [];
        ws["!merges"].push({ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } });
        ws["!merges"].push({ s: { r: 1, c: 0 }, e: { r: 1, c: 6 } });
        return 4;
    }

    function applyColWidths(ws, widths) {
        ws["!cols"] = widths.map(function (w) { return { wch: w }; });
    }

    function styleCurrency(ws, row, cols) {
        cols.forEach(function (c) {
            var addr = XLSX.utils.encode_cell({ r: row, c: c });
            if (ws[addr]) ws[addr].z = '#,##0.00 €';
        });
    }

    function buildIncomeSheet(v, p) {
        var ws = XLSX.utils.aoa_to_sheet([]);
        var r = xlsxHeader(ws, p, v.bounds.label);
        XLSX.utils.sheet_add_aoa(ws, [
            ["COMPTE DE RÉSULTAT"],
            [],
            ["Poste", "Montant HT"],
            ["Produits d'exploitation (factures encaissées)", v.productsHT],
            [],
            ["Charges d'exploitation", ""],
        ], { origin: "A" + (r + 1) });
        r += 6;
        var catTotals = {};
        v.expenses.forEach(function (x) {
            var cat = EXP_CAT_LABEL[x.category] || x.category;
            catTotals[cat] = (catTotals[cat] || 0) + Number(x.amount_ht);
        });
        Object.keys(catTotals).forEach(function (cat) {
            r++;
            XLSX.utils.sheet_add_aoa(ws, [["  " + cat, catTotals[cat]]], { origin: "A" + (r + 1) });
        });
        r += 2;
        XLSX.utils.sheet_add_aoa(ws, [
            ["Total charges", v.chargesHT],
            [],
            ["RÉSULTAT NET", v.result]
        ], { origin: "A" + (r + 1) });
        applyColWidths(ws, [42, 18]);
        return ws;
    }

    function buildBalanceSheet(v, p) {
        var ws = XLSX.utils.aoa_to_sheet([]);
        var r = xlsxHeader(ws, p, v.bounds.label);
        var cashIn = v.paidInvoices.reduce(function (s, i) { return s + Number(i.total_ttc); }, 0) - v.credits.reduce(function (s, cn) { return s + Number(cn.total_ttc); }, 0);
        var cashOut = v.expenses.reduce(function (s, x) { return s + Number(x.amount_ttc); }, 0);
        var outstanding = v.receivables.reduce(function (s, i) { return s + Number(i.total_ttc); }, 0);
        XLSX.utils.sheet_add_aoa(ws, [
            ["BILAN SIMPLIFIÉ"],
            [],
            ["ACTIF", "", "PASSIF", ""],
            ["Trésorerie nette", cashIn - cashOut, "Capitaux propres", v.result],
            ["Créances clients", outstanding, "", ""],
            [],
            ["Total actif", cashIn - cashOut + outstanding, "Total passif", v.result]
        ], { origin: "A" + (r + 1) });
        applyColWidths(ws, [24, 18, 24, 18]);
        return ws;
    }

    function buildSalesJournal(v, p) {
        var ws = XLSX.utils.aoa_to_sheet([]);
        var b = v.bounds;
        var r = xlsxHeader(ws, p, b.label);
        XLSX.utils.sheet_add_aoa(ws, [
            ["JOURNAL DES VENTES"],
            [],
            ["Date", "N° Facture", "Client", "HT", "TVA", "TTC", "Statut"]
        ], { origin: "A" + (r + 1) });
        r += 3;
        var allInv = state.invoices.filter(function (i) { return !i.credit_note_id && dateInBounds(i.date, b); })
            .sort(function (a, b) { return a.date < b.date ? -1 : 1; });
        allInv.forEach(function (inv) {
            r++;
            var c = state.clients.find(function (x) { return x.id === inv.client_id; });
            XLSX.utils.sheet_add_aoa(ws, [[inv.date, inv.number, c ? c.name : "", Number(inv.subtotal_ht), Number(inv.tva_amount), Number(inv.total_ttc), invoiceStatusOf(inv)]], { origin: "A" + (r + 1) });
        });
        r += 2;
        var totHT = allInv.reduce(function (s, i) { return s + Number(i.subtotal_ht); }, 0);
        var totTVA = allInv.reduce(function (s, i) { return s + Number(i.tva_amount); }, 0);
        var totTTC = allInv.reduce(function (s, i) { return s + Number(i.total_ttc); }, 0);
        XLSX.utils.sheet_add_aoa(ws, [["", "", "TOTAL", totHT, totTVA, totTTC, ""]], { origin: "A" + (r + 1) });
        applyColWidths(ws, [12, 16, 28, 14, 14, 14, 12]);
        return ws;
    }

    function buildPurchaseJournal(v, p) {
        var ws = XLSX.utils.aoa_to_sheet([]);
        var r = xlsxHeader(ws, p, v.bounds.label);
        XLSX.utils.sheet_add_aoa(ws, [
            ["JOURNAL DES ACHATS"],
            [],
            ["Date", "Fournisseur", "Catégorie", "HT", "TVA", "TTC", "Note"]
        ], { origin: "A" + (r + 1) });
        r += 3;
        var sorted = v.expenses.slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; });
        sorted.forEach(function (x) {
            r++;
            XLSX.utils.sheet_add_aoa(ws, [[x.date, x.supplier || "", EXP_CAT_LABEL[x.category] || x.category, Number(x.amount_ht), Number(x.tva_amount), Number(x.amount_ttc), x.note || ""]], { origin: "A" + (r + 1) });
        });
        r += 2;
        var tHT = sorted.reduce(function (s, x) { return s + Number(x.amount_ht); }, 0);
        var tTVA = sorted.reduce(function (s, x) { return s + Number(x.tva_amount); }, 0);
        var tTTC = sorted.reduce(function (s, x) { return s + Number(x.amount_ttc); }, 0);
        XLSX.utils.sheet_add_aoa(ws, [["", "", "TOTAL", tHT, tTVA, tTTC, ""]], { origin: "A" + (r + 1) });
        applyColWidths(ws, [12, 28, 22, 14, 14, 14, 22]);
        return ws;
    }

    function buildAgedBalance(v, p) {
        var ws = XLSX.utils.aoa_to_sheet([]);
        var r = xlsxHeader(ws, p, v.bounds.label);
        var now = new Date();
        XLSX.utils.sheet_add_aoa(ws, [
            ["BALANCE ÂGÉE CLIENTS"],
            [],
            ["Client", "N° Facture", "Date", "Échéance", "Montant TTC", "Retard (jours)"]
        ], { origin: "A" + (r + 1) });
        r += 3;
        var pending = state.invoices.filter(function (i) {
            return !i.credit_note_id && i.status !== "paid" && dateInBounds(i.date, v.bounds);
        }).sort(function (a, b) { return a.due_date < b.due_date ? -1 : 1; });
        pending.forEach(function (inv) {
            r++;
            var c = state.clients.find(function (x) { return x.id === inv.client_id; });
            var days = Math.max(0, Math.round((now - new Date(inv.due_date)) / 86400000));
            XLSX.utils.sheet_add_aoa(ws, [[c ? c.name : "", inv.number, inv.date, inv.due_date, Number(inv.total_ttc), days > 0 ? days : "À venir"]], { origin: "A" + (r + 1) });
        });
        r += 2;
        var total = pending.reduce(function (s, i) { return s + Number(i.total_ttc); }, 0);
        XLSX.utils.sheet_add_aoa(ws, [["", "", "", "TOTAL", total, ""]], { origin: "A" + (r + 1) });
        applyColWidths(ws, [28, 16, 12, 12, 16, 14]);
        return ws;
    }

    function buildVatSheet(v, p) {
        var ws = XLSX.utils.aoa_to_sheet([]);
        var r = xlsxHeader(ws, p, v.bounds.label);
        var tvaCollected = v.paidInvoices.reduce(function (s, i) { return s + Number(i.tva_amount); }, 0);
        var tvaDeductible = v.expenses.reduce(function (s, x) { return s + Number(x.tva_amount); }, 0);
        XLSX.utils.sheet_add_aoa(ws, [
            ["DÉTAIL TVA"],
            [],
            ["TVA collectée (sur ventes)", tvaCollected],
            ["TVA déductible (sur achats)", tvaDeductible],
            [],
            ["TVA nette à reverser", tvaCollected - tvaDeductible],
            [],
            ["DÉTAIL TVA COLLECTÉE PAR FACTURE"],
            [],
            ["Date", "N° Facture", "Client", "Base HT", "TVA"]
        ], { origin: "A" + (r + 1) });
        r += 10;
        v.paidInvoices.forEach(function (inv) {
            r++;
            var c = state.clients.find(function (x) { return x.id === inv.client_id; });
            XLSX.utils.sheet_add_aoa(ws, [[inv.date, inv.number, c ? c.name : "", Number(inv.subtotal_ht), Number(inv.tva_amount)]], { origin: "A" + (r + 1) });
        });
        applyColWidths(ws, [12, 16, 28, 14, 14]);
        return ws;
    }

    function buildUrssafSheet(p) {
        var ws = XLSX.utils.aoa_to_sheet([]);
        var r = xlsxHeader(ws, p, "Historique");
        XLSX.utils.sheet_add_aoa(ws, [
            ["RÉCAPITULATIF URSSAF"],
            [],
            ["Période", "CA déclaré", "Cotisations", "Date déclaration", "Statut"]
        ], { origin: "A" + (r + 1) });
        r += 3;
        state.urssaf.slice().sort(function (a, b) { return (a.period_label || "") < (b.period_label || "") ? -1 : 1; }).forEach(function (d) {
            r++;
            XLSX.utils.sheet_add_aoa(ws, [[d.period_label || "", Number(d.ca_base || 0), Number(d.cotisation || 0), d.declared_at ? d.declared_at.slice(0, 10) : "", "Déclaré"]], { origin: "A" + (r + 1) });
        });
        applyColWidths(ws, [22, 16, 16, 16, 12]);
        return ws;
    }

    window.doExportXLSX = function () {
        if (!acctView) renderAccounting();
        var v = acctView, p = state.profile;
        var checks = document.querySelectorAll("#modal-export .export-opt input:checked");
        var selected = [];
        checks.forEach(function (cb) { selected.push(cb.value); });
        if (selected.length === 0) { alert("Sélectionnez au moins un document."); return; }

        var wb = XLSX.utils.book_new();
        if (selected.indexOf("income") !== -1) XLSX.utils.book_append_sheet(wb, buildIncomeSheet(v, p), "Compte de résultat");
        if (selected.indexOf("balance") !== -1) XLSX.utils.book_append_sheet(wb, buildBalanceSheet(v, p), "Bilan");
        if (selected.indexOf("sales") !== -1) XLSX.utils.book_append_sheet(wb, buildSalesJournal(v, p), "Journal ventes");
        if (selected.indexOf("purchases") !== -1) XLSX.utils.book_append_sheet(wb, buildPurchaseJournal(v, p), "Journal achats");
        if (selected.indexOf("aged") !== -1) XLSX.utils.book_append_sheet(wb, buildAgedBalance(v, p), "Balance âgée");
        if (selected.indexOf("vat") !== -1) XLSX.utils.book_append_sheet(wb, buildVatSheet(v, p), "TVA");
        if (selected.indexOf("urssaf") !== -1) XLSX.utils.book_append_sheet(wb, buildUrssafSheet(p), "URSSAF");

        var tag = v.bounds.label.replace(/[^0-9A-Za-zÀ-ÿ]+/g, "-");
        XLSX.writeFile(wb, "comptabilite-" + tag + ".xlsx");
        closeModal("modal-export");
    };

    // --- Subscription ---
    var PLAN_META = {
        free: { tag: "Gratuit", label: "Gratuit" },
        standard: { tag: "Standard", label: "Standard — 14,99 €/mois" },
        pro: { tag: "Pro", label: "Pro — 29,99 €/mois" }
    };

    function renderSubscription() {
        var plan = planOf();
        var meta = PLAN_META[plan] || PLAN_META.free;
        var banner = document.getElementById("current-plan-banner");
        banner.innerHTML = '<div style="display:inline-flex;align-items:center;gap:10px;background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:12px 18px;box-shadow:var(--shadow)">'
            + '<span class="plan-tag" style="' + (plan === "free" ? 'background:#F1F5F9;color:var(--text-muted)' : '') + '">' + meta.tag + '</span>'
            + '<span style="font-size:.9rem">Formule actuelle : <strong>' + meta.label + '</strong></span></div>';

        ["free", "standard", "pro"].forEach(function (p) {
            document.getElementById("plan-card-" + p).classList.toggle("current-plan", plan === p);
            var btn = document.getElementById("btn-select-" + p);
            if (plan === p) {
                btn.textContent = "Formule actuelle";
                btn.disabled = true;
            } else {
                btn.disabled = false;
                btn.textContent = p === "free" ? "Revenir au gratuit"
                    : (p === "standard" ? "Choisir Standard" : "Passer au Pro");
            }
        });
    }

    async function changePlan(plan) {
        var payload = { id: state.user.id, plan: plan, plan_since: new Date().toISOString() };
        var res = await sb.from("profiles").upsert(payload).select().single();
        if (res.error) { alert("Erreur : " + res.error.message); return; }
        state.profile = res.data;
        renderSubscription();
    }

    document.getElementById("btn-select-pro").addEventListener("click", async function () {
        if (isPro()) return;
        if (!await iconfirm("Activer la formule Pro (29,99 €/mois) ? Le paiement par carte via Stripe sera branché prochainement — l'activation est immédiate pour tester les fonctionnalités Pro.")) return;
        await changePlan("pro");
        toast("Formule Pro activée — factures illimitées, dépenses et comptabilité débloquées.", "success");
    });

    document.getElementById("btn-select-standard").addEventListener("click", async function () {
        if (planOf() === "standard") return;
        if (!await iconfirm("Activer la formule Standard (14,99 €/mois) ? Factures illimitées, sans le module comptabilité.")) return;
        await changePlan("standard");
        toast("Formule Standard activée — factures illimitées.", "success");
    });

    document.getElementById("btn-select-free").addEventListener("click", async function () {
        if (planOf() === "free") return;
        if (!await iconfirm("Revenir à la formule gratuite ? Vous serez limité à " + FREE_INVOICE_LIMIT + " factures par mois et perdrez l'accès aux modules payants.")) return;
        await changePlan("free");
    });

    // --- Profile ---
    function loadProfile() {
        var p = state.profile;
        document.getElementById("prof-name").value = p.name || "";
        document.getElementById("prof-siret").value = p.siret || "";
        document.getElementById("prof-address").value = p.address || "";
        document.getElementById("prof-city").value = p.city || "";
        document.getElementById("prof-email").value = p.email || "";
        document.getElementById("prof-phone").value = p.phone || "";
        document.getElementById("prof-tva").value = p.tva_number || "";
        document.getElementById("prof-tva-rate").value = p.tva_rate != null ? p.tva_rate : 20;
        document.getElementById("prof-mentions").value = p.mentions || "";
        document.getElementById("prof-legal-status").value = p.legal_status || "";
        document.getElementById("prof-activity-type").value = p.activity_type || "bnc";
        document.getElementById("prof-urssaf-period").value = p.urssaf_period || "quarterly";
        document.getElementById("prof-tax-option").value = p.tax_option || "bareme";
        document.getElementById("prof-bank-holder").value = p.bank_holder || "";
        document.getElementById("prof-bank-name").value = p.bank_name || "";
        document.getElementById("prof-iban").value = p.iban || "";
        document.getElementById("prof-bic").value = p.bic || "";
        document.getElementById("prof-template-color").value = p.template_color || "#4F46E5";
        document.getElementById("prof-template-font").value = p.template_font || "Arial";
        document.getElementById("prof-template-logo").value = p.template_logo_url || "";
    }

    document.getElementById("profile-form").addEventListener("submit", async function (e) {
        e.preventDefault();
        var iban = document.getElementById("prof-iban").value.trim();
        var bic = document.getElementById("prof-bic").value.trim();
        var siret = document.getElementById("prof-siret").value.trim();
        if (!isValidIBAN(iban)) { alert("IBAN invalide. Vérifiez les caractères et la longueur."); return; }
        if (!isValidBIC(bic)) { alert("BIC invalide. Format attendu : 8 ou 11 caractères (ex : BNPAFRPP)."); return; }
        if (!isValidSIRET(siret)) { alert("SIRET invalide. Le numéro doit comporter 14 chiffres et passer le contrôle Luhn."); return; }
        var payload = {
            id: state.user.id,
            name: document.getElementById("prof-name").value.trim(),
            siret: document.getElementById("prof-siret").value.trim(),
            address: document.getElementById("prof-address").value.trim(),
            city: document.getElementById("prof-city").value.trim(),
            email: document.getElementById("prof-email").value.trim(),
            phone: document.getElementById("prof-phone").value.trim(),
            tva_number: document.getElementById("prof-tva").value.trim(),
            tva_rate: parseFloat(document.getElementById("prof-tva-rate").value),
            mentions: document.getElementById("prof-mentions").value.trim(),
            legal_status: document.getElementById("prof-legal-status").value || null,
            activity_type: document.getElementById("prof-activity-type").value || null,
            urssaf_period: document.getElementById("prof-urssaf-period").value || null,
            tax_option: document.getElementById("prof-tax-option").value || null,
            bank_holder: document.getElementById("prof-bank-holder").value.trim() || null,
            bank_name: document.getElementById("prof-bank-name").value.trim() || null,
            iban: document.getElementById("prof-iban").value.trim() || null,
            bic: document.getElementById("prof-bic").value.trim() || null,
            template_color: document.getElementById("prof-template-color").value || "#4F46E5",
            template_font: document.getElementById("prof-template-font").value || "Arial",
            template_logo_url: document.getElementById("prof-template-logo").value.trim() || null,
            updated_at: new Date().toISOString()
        };
        var res = await sb.from("profiles").upsert(payload).select().single();
        if (res.error) { alert("Erreur : " + res.error.message); return; }
        state.profile = res.data;
        alert("Profil enregistré !");
    });

    // --- Modals ---
    window.closeModal = function (id) {
        document.getElementById(id).classList.remove("open");
    };

    function openModal(id) {
        document.getElementById(id).classList.add("open");
    }

    document.querySelectorAll(".modal-overlay").forEach(function (overlay) {
        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) overlay.classList.remove("open");
        });
    });

    // Esc to close the topmost open modal/overlay.
    document.addEventListener("keydown", function (e) {
        if (e.key !== "Escape") return;
        var confirmEl = document.getElementById("confirm-modal");
        if (confirmEl && confirmEl.classList.contains("open")) {
            document.getElementById("confirm-cancel").click();
            return;
        }
        var open = document.querySelectorAll(".modal-overlay.open");
        if (open.length === 0) return;
        open[open.length - 1].classList.remove("open");
    });

    // --- New / Edit Client ---
    document.getElementById("btn-new-client").addEventListener("click", function () {
        document.getElementById("client-form").reset();
        document.getElementById("client-edit-id").value = "";
        document.getElementById("modal-client-title").textContent = "Nouveau client";
        openModal("modal-client");
    });

    window.editClient = function (id) {
        var c = state.clients.find(function (x) { return x.id === id; });
        if (!c) return;
        document.getElementById("client-edit-id").value = c.id;
        document.getElementById("client-name").value = c.name || "";
        document.getElementById("client-email").value = c.email || "";
        document.getElementById("client-address").value = c.address || "";
        document.getElementById("client-city").value = c.city || "";
        document.getElementById("client-siret").value = c.siret || "";
        document.getElementById("modal-client-title").textContent = "Modifier le client";
        openModal("modal-client");
    };

    document.getElementById("client-form").addEventListener("submit", async function (e) {
        e.preventDefault();
        var editId = document.getElementById("client-edit-id").value;
        var siret = document.getElementById("client-siret").value.trim();
        if (!isValidSIRET(siret)) { alert("SIRET invalide (14 chiffres, contrôle Luhn)."); return; }
        var payload = {
            name: document.getElementById("client-name").value.trim(),
            email: document.getElementById("client-email").value.trim(),
            address: document.getElementById("client-address").value.trim(),
            city: document.getElementById("client-city").value.trim(),
            siret: siret
        };
        var res;
        if (editId) {
            res = await sb.from("clients").update(payload).eq("id", editId);
        } else {
            payload.user_id = state.user.id;
            res = await sb.from("clients").insert(payload);
        }
        if (res.error) { alert("Erreur : " + res.error.message); return; }
        await refreshData();
        closeModal("modal-client");
        renderClients();
    });

    // --- New Invoice ---
    function setupInvoiceModal() {
        var select = document.getElementById("inv-client");
        select.innerHTML = '<option value="">Sélectionner un client</option>';
        state.clients.forEach(function (c) {
            select.innerHTML += '<option value="' + c.id + '">' + esc(c.name) + '</option>';
        });

        var today = new Date().toISOString().slice(0, 10);
        document.getElementById("inv-date").value = today;
        var due = new Date();
        due.setDate(due.getDate() + 30);
        document.getElementById("inv-due-date").value = due.toISOString().slice(0, 10);

        document.getElementById("inv-number").value = nextInvoiceNumber();

        var rate = state.profile.tva_rate != null ? state.profile.tva_rate : 20;
        document.getElementById("inv-tva-rate-display").textContent = rate;

        document.getElementById("invoice-items").innerHTML = itemRow();
        recalcInvoice();
    }

    function itemRow() {
        return '<tr><td><input type="text" class="item-desc" placeholder="Prestation"></td><td><input type="number" class="item-qty" value="1" min="1"></td><td><input type="number" class="item-price" value="0" min="0" step="0.01"></td><td class="item-total">0,00 €</td><td><button type="button" class="remove-item" title="Supprimer">&times;</button></td></tr>';
    }

    document.getElementById("btn-add-item").addEventListener("click", function () {
        document.getElementById("invoice-items").insertAdjacentHTML("beforeend", itemRow());
    });

    document.getElementById("invoice-items").addEventListener("input", recalcInvoice);
    document.getElementById("invoice-items").addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-item")) {
            var rows = document.getElementById("invoice-items").querySelectorAll("tr");
            if (rows.length > 1) e.target.closest("tr").remove();
            recalcInvoice();
        }
    });

    function recalcInvoice() {
        var subtotal = 0;
        document.querySelectorAll("#invoice-items tr").forEach(function (row) {
            var qty = parseFloat(row.querySelector(".item-qty").value) || 0;
            var price = parseFloat(row.querySelector(".item-price").value) || 0;
            var total = qty * price;
            subtotal += total;
            row.querySelector(".item-total").textContent = formatMoney(total);
        });
        var rate = state.profile.tva_rate != null ? Number(state.profile.tva_rate) : 20;
        var tva = subtotal * rate / 100;
        document.getElementById("inv-subtotal").textContent = formatMoney(subtotal);
        document.getElementById("inv-tva-amount").textContent = formatMoney(tva);
        document.getElementById("inv-total").textContent = formatMoney(subtotal + tva);
    }

    ["btn-new-invoice", "btn-new-invoice-dash"].forEach(function (id) {
        document.getElementById(id).addEventListener("click", function () {
            if (!canCreateInvoice()) { quotaBlockedAlert(); return; }
            if (state.clients.length === 0) {
                alert("Ajoutez d'abord un client avant de créer une facture.");
                navigate("clients");
                return;
            }
            document.getElementById("invoice-form").reset();
            setupInvoiceModal();
            openModal("modal-invoice");
        });
    });

    document.getElementById("invoice-form").addEventListener("submit", async function (e) {
        e.preventDefault();
        if (!canCreateInvoice()) { closeModal("modal-invoice"); quotaBlockedAlert(); return; }
        var items = collectItems("#invoice-items tr");
        if (items.length === 0) { alert("Ajoutez au moins une ligne."); return; }

        var subtotal = items.reduce(function (s, i) { return s + i.total; }, 0);
        var rate = state.profile.tva_rate != null ? Number(state.profile.tva_rate) : 20;
        var tva = subtotal * rate / 100;

        var payload = {
            user_id: state.user.id,
            number: nextInvoiceNumber(),
            client_id: document.getElementById("inv-client").value,
            date: document.getElementById("inv-date").value,
            due_date: document.getElementById("inv-due-date").value,
            po_number: document.getElementById("inv-po").value.trim() || null,
            items: items,
            subtotal_ht: subtotal,
            tva_rate: rate,
            tva_amount: tva,
            total_ttc: subtotal + tva,
            status: "pending"
        };

        var res = await sb.from("invoices").insert(payload);
        if (res.error) { alert("Erreur : " + dbErrorMessage(res.error)); return; }
        await refreshData();
        closeModal("modal-invoice");
        navigate("invoices");
    });

    // --- Helpers ---
    // Highest sequence number used for a given year in a list of documents.
    // Matches both "2026-001" (invoices) and "DEVIS-2026-001" (quotes).
    function maxSeqForYear(list, year) {
        var re = new RegExp("(?:^|-)" + year + "-(\\d+)$");
        var max = 0;
        list.forEach(function (d) {
            var m = d.number && d.number.match(re);
            if (m) { var n = parseInt(m[1], 10); if (!isNaN(n) && n > max) max = n; }
        });
        return max;
    }
    function round2(v) { return Math.round((Number(v) || 0) * 100) / 100; }
    var reservedSeq = { invoices: {}, quotes: {} };
    function reserveSeq(kind, list, year) {
        var prev = reservedSeq[kind][year] || 0;
        var next = Math.max(maxSeqForYear(list, year), prev) + 1;
        reservedSeq[kind][year] = next;
        return next;
    }
    function nextInvoiceNumber() {
        var year = new Date().getFullYear();
        return "FAC-" + year + "-" + String(reserveSeq("invoices", state.invoices, year)).padStart(3, "0");
    }
    function nextQuoteNumber() {
        var year = new Date().getFullYear();
        return "DEVIS-" + year + "-" + String(reserveSeq("quotes", state.quotes, year)).padStart(3, "0");
    }
    function dbErrorMessage(error) {
        if (error && error.code === "23505") return "Ce numéro est déjà utilisé. Veuillez réessayer.";
        return (error && error.message) || "Erreur inconnue.";
    }
    function collectItems(selector) {
        var items = [];
        document.querySelectorAll(selector).forEach(function (row) {
            var desc = row.querySelector(".item-desc").value.trim();
            var qty = parseFloat(row.querySelector(".item-qty").value) || 0;
            var price = parseFloat(row.querySelector(".item-price").value) || 0;
            if (desc && qty > 0) items.push({ description: desc, quantity: qty, unitPrice: price, total: qty * price });
        });
        return items;
    }
    function emptyState(icon, text, btnId, btnLabel) {
        var btn = btnId ? '<button class="btn btn-primary" onclick="document.getElementById(\'' + btnId + '\').click()">' + esc(btnLabel) + '</button>' : '';
        return '<div class="empty-state"><div class="empty-icon">' + icon + '</div><p>' + esc(text) + '</p>' + btn + '</div>';
    }
    function proGateHTML(feature) {
        return '<div class="empty-state">'
            + '<div class="empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>'
            + '<p>' + esc(feature) + ' fait partie de la formule <strong>Pro</strong>.</p>'
            + '<button class="btn btn-primary" onclick="goSubscription()">Passer au Pro — 29,99 €/mois</button>'
            + '</div>';
    }
    // Validation IBAN (mod 97) — accepte les espaces, ignore la casse.
    function isValidIBAN(iban) {
        if (!iban) return true; // optionnel
        var s = String(iban).replace(/\s+/g, "").toUpperCase();
        if (!/^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/.test(s)) return false;
        if (s.length < 15 || s.length > 34) return false;
        var rearranged = s.slice(4) + s.slice(0, 4);
        var num = rearranged.split("").map(function (c) {
            var code = c.charCodeAt(0);
            return code >= 65 ? String(code - 55) : c;
        }).join("");
        var remainder = 0;
        for (var i = 0; i < num.length; i++) remainder = (remainder * 10 + Number(num[i])) % 97;
        return remainder === 1;
    }
    // Validation SIRET (14 chiffres, algorithme de Luhn).
    function isValidSIRET(siret) {
        if (!siret) return true; // optionnel
        var s = String(siret).replace(/\s+/g, "");
        if (!/^\d{14}$/.test(s)) return false;
        var sum = 0;
        for (var i = 0; i < 14; i++) {
            var d = Number(s[i]);
            if (i % 2 === 0) { d *= 2; if (d > 9) d -= 9; }
            sum += d;
        }
        return sum % 10 === 0;
    }
    // Validation BIC (8 ou 11 caractères).
    function isValidBIC(bic) {
        if (!bic) return true;
        return /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(String(bic).replace(/\s+/g, "").toUpperCase());
    }
    function esc(s) { var d = document.createElement("div"); d.textContent = s == null ? "" : s; return d.innerHTML; }
    function safeCssValue(s) { return String(s || "").replace(/[^a-zA-Z0-9 _\-,.#()]/g, ""); }
    function isDataImageUrl(s) { return /^data:image\/(png|jpeg|svg\+xml|webp);base64,[A-Za-z0-9+/=]+$/.test(s || ""); }
    function formatMoney(n) { return Number(n).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €"; }
    function formatDate(d) {
        var parts = String(d).slice(0, 10).split("-");
        return parts[2] + "/" + parts[1] + "/" + parts[0];
    }

    // --- Init: restore session if present ---
    (async function init() {
        var sessionRes = await sb.auth.getSession();
        if (sessionRes.data.session) {
            state.user = sessionRes.data.session.user;
            await showApp();
        } else {
            showAuth();
        }
    })();

})();
