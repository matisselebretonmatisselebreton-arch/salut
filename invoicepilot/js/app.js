(function () {
    "use strict";

    var cfg = window.IP_CONFIG;
    var sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_KEY);

    // In-memory cache, refreshed from the database
    var state = {
        user: null,
        profile: {},
        clients: [],
        invoices: [],
        quotes: [],
        recurring: []
    };

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
        var results = await Promise.all([
            sb.from("profiles").select("*").eq("id", state.user.id).maybeSingle(),
            sb.from("clients").select("*").order("created_at", { ascending: false }),
            sb.from("invoices").select("*").order("date", { ascending: false }),
            sb.from("quotes").select("*").order("date", { ascending: false }),
            sb.from("recurring_invoices").select("*").order("created_at", { ascending: false })
        ]);
        state.profile = results[0].data || {};
        state.clients = results[1].data || [];
        state.invoices = results[2].data || [];
        state.quotes = results[3].data || [];
        state.recurring = results[4].data || [];
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
    function renderDashboard() {
        var paid = 0, pending = 0, overdue = 0, revenue = 0;
        var now = new Date();
        state.invoices.forEach(function (inv) {
            if (inv.status === "paid") { paid++; revenue += Number(inv.total_ttc); }
            else if (new Date(inv.due_date) < now) { overdue++; }
            else { pending++; }
        });
        document.getElementById("stat-revenue").textContent = formatMoney(revenue);
        document.getElementById("stat-paid").textContent = paid;
        document.getElementById("stat-pending").textContent = pending;
        document.getElementById("stat-overdue").textContent = overdue;
        renderInvoiceTable("dashboard-invoices-list", state.invoices.slice(0, 5));
    }

    // --- Invoices ---
    function renderInvoices() {
        renderInvoiceTable("invoices-list", state.invoices);
    }

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
            if (inv.status === "paid") { statusClass = "status-paid"; statusLabel = "Payée"; }
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
            if (inv.status !== "paid") {
                html += '<button class="btn btn-sm btn-outline" onclick="markPaid(\'' + inv.id + '\')">Marquer payée</button> ';
            }
            html += '<button class="btn btn-sm btn-outline" onclick="deleteInvoice(\'' + inv.id + '\')">Suppr.</button>';
            html += '</td></tr>';
        });
        html += '</tbody></table>';
        container.innerHTML = html;
    }

    window.markPaid = async function (id) {
        var res = await sb.from("invoices").update({ status: "paid" }).eq("id", id);
        if (res.error) { alert("Erreur : " + res.error.message); return; }
        await refreshData();
        navigate("invoices");
    };

    window.deleteInvoice = async function (id) {
        if (!confirm("Supprimer cette facture ?")) return;
        var res = await sb.from("invoices").delete().eq("id", id);
        if (res.error) { alert("Erreur : " + res.error.message); return; }
        await refreshData();
        navigate("invoices");
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

        var html = '<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>' + esc(opts.title) + ' ' + esc(doc.number) + '</title>'
            + '<style>'
            + '*{margin:0;padding:0;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;}'
            + 'body{padding:40px;color:#1E293B;font-size:13px;line-height:1.5;}'
            + '.head{display:flex;justify-content:space-between;margin-bottom:40px;}'
            + '.from h2{font-size:18px;margin-bottom:8px;}'
            + '.from p,.to p{color:#475569;font-size:12px;}'
            + '.to{text-align:right;}'
            + '.to .label{font-size:11px;text-transform:uppercase;color:#94A3B8;margin-bottom:4px;}'
            + '.title{font-size:28px;font-weight:800;color:#4F46E5;margin-bottom:4px;}'
            + '.meta{color:#64748B;font-size:12px;margin-bottom:32px;}'
            + 'table.items{width:100%;border-collapse:collapse;margin-bottom:24px;}'
            + 'table.items th{background:#F1F5F9;text-align:left;padding:10px;font-size:11px;text-transform:uppercase;color:#64748B;}'
            + 'table.items td{padding:10px;border-bottom:1px solid #E2E8F0;}'
            + '.r{text-align:right;}'
            + 'table.totals{margin-left:auto;width:280px;border-collapse:collapse;}'
            + 'table.totals td{padding:6px 10px;}'
            + 'table.totals .grand td{font-weight:800;font-size:15px;border-top:2px solid #1E293B;}'
            + '.mentions{margin-top:40px;padding-top:16px;border-top:1px solid #E2E8F0;color:#94A3B8;font-size:11px;}'
            + '.footer{margin-top:8px;color:#94A3B8;font-size:11px;}'
            + '@media print{body{padding:0;}}'
            + '</style></head><body>'
            + '<div class="head">'
            + '<div class="from"><h2>' + esc(p.name || "Votre entreprise") + '</h2>'
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
            + '<div class="meta">N° ' + esc(doc.number) + ' &bull; Date : ' + formatDate(doc.date) + ' &bull; ' + esc(opts.metaLabel) + ' : ' + formatDate(opts.metaDate) + '</div>'
            + '<table class="items"><thead><tr><th>Description</th><th class="r">Qté</th><th class="r">Prix unit.</th><th class="r">Total HT</th></tr></thead>'
            + '<tbody>' + itemsHtml + '</tbody></table>'
            + '<table class="totals">'
            + '<tr><td>Sous-total HT</td><td class="r">' + formatMoney(Number(doc.subtotal_ht)) + '</td></tr>'
            + tvaLine
            + '<tr class="grand"><td>Total TTC</td><td class="r">' + formatMoney(Number(doc.total_ttc)) + '</td></tr>'
            + '</table>'
            + mentions
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
    function renderQuotes() {
        var container = document.getElementById("quotes-list");
        if (state.quotes.length === 0) {
            container.innerHTML = '<div class="empty-state"><div class="empty-icon">&#128203;</div><p>Aucun devis pour le moment</p><button class="btn btn-primary" onclick="document.getElementById(\'btn-new-quote\').click()">Créer mon premier devis</button></div>';
            return;
        }
        var html = '<table><thead><tr><th>N°</th><th>Client</th><th>Date</th><th>Montant TTC</th><th>Statut</th><th>Actions</th></tr></thead><tbody>';
        state.quotes.forEach(function (q) {
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
        if (!confirm("Supprimer ce devis ?")) return;
        var res = await sb.from("quotes").delete().eq("id", id);
        if (res.error) { alert("Erreur : " + res.error.message); return; }
        await refreshData();
        renderQuotes();
    };

    window.convertToInvoice = async function (id) {
        var q = state.quotes.find(function (x) { return x.id === id; });
        if (!q) return;
        if (!confirm("Convertir ce devis en facture ?")) return;

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
            status: "pending"
        };
        var insertRes = await sb.from("invoices").insert(invoicePayload).select().single();
        if (insertRes.error) { alert("Erreur : " + dbErrorMessage(insertRes.error)); return; }

        var updateRes = await sb.from("quotes")
            .update({ status: "invoiced", converted_invoice_id: insertRes.data.id })
            .eq("id", id);
        if (updateRes.error) { alert("Erreur : " + updateRes.error.message); return; }

        await refreshData();
        navigate("invoices");
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
        // Continuous per-year sequence, seeded from existing invoices and shared
        // across templates so numbers never collide or skip within a year.
        var seqByYear = {};
        function nextNumber(year) {
            if (seqByYear[year] === undefined) {
                seqByYear[year] = maxSeqForYear(state.invoices, year);
            }
            seqByYear[year]++;
            return year + "-" + String(seqByYear[year]).padStart(3, "0");
        }

        for (var i = 0; i < state.recurring.length; i++) {
            var r = state.recurring[i];
            if (!r.active) continue;

            var nextRun = r.next_run;
            var lastGenerated = r.last_generated;
            var didGenerate = false;

            // Generate one invoice per due period, catching up multiple periods.
            while (nextRun <= today) {
                var year = new Date(nextRun).getFullYear();
                var number = nextNumber(year);

                var subtotal = (r.items || []).reduce(function (s, it) { return s + Number(it.total); }, 0);
                var rate = Number(r.tva_rate);
                var tva = subtotal * rate / 100;
                var due = advanceDate(nextRun, "monthly"); // 30-day-ish due window

                var insertRes = await sb.from("invoices").insert({
                    user_id: state.user.id,
                    number: number,
                    client_id: r.client_id,
                    date: nextRun,
                    due_date: due,
                    items: r.items,
                    subtotal_ht: subtotal,
                    tva_rate: rate,
                    tva_amount: tva,
                    total_ttc: subtotal + tva,
                    status: "pending"
                }).select().single();

                if (insertRes.error) break;
                generatedCount++;
                didGenerate = true;
                lastGenerated = nextRun;
                nextRun = advanceDate(nextRun, r.frequency);
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
        if (!confirm("Supprimer cette récurrence ? Les factures déjà générées sont conservées.")) return;
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
    function renderClients() {
        var container = document.getElementById("clients-list");
        if (state.clients.length === 0) {
            container.innerHTML = '<div class="empty-state"><div class="empty-icon">&#128101;</div><p>Aucun client pour le moment</p><button class="btn btn-primary" onclick="document.getElementById(\'btn-new-client\').click()">Ajouter un client</button></div>';
            return;
        }
        var html = '<table><thead><tr><th>Nom</th><th>Email</th><th>Ville</th><th>Factures</th><th>Actions</th></tr></thead><tbody>';
        state.clients.forEach(function (c) {
            var invCount = state.invoices.filter(function (i) { return i.client_id === c.id; }).length;
            html += '<tr>';
            html += '<td><strong>' + esc(c.name) + '</strong></td>';
            html += '<td>' + esc(c.email || "—") + '</td>';
            html += '<td>' + esc(c.city || "—") + '</td>';
            html += '<td>' + invCount + '</td>';
            html += '<td><button class="btn btn-sm btn-outline" onclick="deleteClient(\'' + c.id + '\')">Suppr.</button></td>';
            html += '</tr>';
        });
        html += '</tbody></table>';
        container.innerHTML = html;
    }

    window.deleteClient = async function (id) {
        if (!confirm("Supprimer ce client ?")) return;
        var res = await sb.from("clients").delete().eq("id", id);
        if (res.error) { alert("Erreur : " + res.error.message); return; }
        await refreshData();
        renderClients();
    };

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
    }

    document.getElementById("profile-form").addEventListener("submit", async function (e) {
        e.preventDefault();
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

    // --- New Client ---
    document.getElementById("btn-new-client").addEventListener("click", function () {
        document.getElementById("client-form").reset();
        openModal("modal-client");
    });

    document.getElementById("client-form").addEventListener("submit", async function (e) {
        e.preventDefault();
        var payload = {
            user_id: state.user.id,
            name: document.getElementById("client-name").value.trim(),
            email: document.getElementById("client-email").value.trim(),
            address: document.getElementById("client-address").value.trim(),
            city: document.getElementById("client-city").value.trim(),
            siret: document.getElementById("client-siret").value.trim()
        };
        var res = await sb.from("clients").insert(payload);
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
    function nextInvoiceNumber() {
        var year = new Date().getFullYear();
        return year + "-" + String(maxSeqForYear(state.invoices, year) + 1).padStart(3, "0");
    }
    function nextQuoteNumber() {
        var year = new Date().getFullYear();
        return "DEVIS-" + year + "-" + String(maxSeqForYear(state.quotes, year) + 1).padStart(3, "0");
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
    function esc(s) { var d = document.createElement("div"); d.textContent = s == null ? "" : s; return d.innerHTML; }
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
