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
        recurring: [],
        creditNotes: [],
        expenses: []
    };

    var FREE_INVOICE_LIMIT = 10;
    function isPro() { return state.profile && state.profile.plan === "pro"; }
    function invoicesThisMonth() {
        var now = new Date();
        var ym = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0");
        return state.invoices.filter(function (inv) {
            return String(inv.date).slice(0, 7) === ym;
        }).length;
    }
    function canCreateInvoice() { return isPro() || invoicesThisMonth() < FREE_INVOICE_LIMIT; }
    function quotaBlockedAlert() {
        alert("Vous avez atteint la limite de " + FREE_INVOICE_LIMIT + " factures ce mois-ci (formule gratuite).\n\nPassez au Pro pour des factures illimitées.");
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
        var results = await Promise.all([
            sb.from("profiles").select("*").eq("id", state.user.id).maybeSingle(),
            sb.from("clients").select("*").order("created_at", { ascending: false }),
            sb.from("invoices").select("*").order("date", { ascending: false }),
            sb.from("quotes").select("*").order("date", { ascending: false }),
            sb.from("recurring_invoices").select("*").order("created_at", { ascending: false }),
            sb.from("credit_notes").select("*").order("date", { ascending: false }),
            sb.from("expenses").select("*").order("date", { ascending: false })
        ]);
        state.profile = results[0].data || {};
        state.clients = results[1].data || [];
        state.invoices = results[2].data || [];
        state.quotes = results[3].data || [];
        state.recurring = results[4].data || [];
        state.creditNotes = results[5].data || [];
        state.expenses = results[6].data || [];
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
        if (page === "credit-notes") renderCreditNotes();
        if (page === "expenses") renderExpenses();
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
    function renderDashboard() {
        var paid = 0, pending = 0, overdue = 0, revenue = 0;
        var now = new Date();
        state.invoices.forEach(function (inv) {
            if (inv.credit_note_id) return;
            if (inv.status === "paid") { paid++; revenue += Number(inv.total_ttc); }
            else if (new Date(inv.due_date) < now) { overdue++; }
            else { pending++; }
        });
        state.creditNotes.forEach(function (cn) {
            revenue -= Number(cn.total_ttc);
        });
        document.getElementById("stat-revenue").textContent = formatMoney(revenue);
        document.getElementById("stat-paid").textContent = paid;
        document.getElementById("stat-pending").textContent = pending;
        document.getElementById("stat-overdue").textContent = overdue;
        renderUsageCard();
        renderInvoiceTable("dashboard-invoices-list", state.invoices.slice(0, 5));
    }

    function renderUsageCard() {
        var card = document.getElementById("usage-card");
        if (isPro()) { card.style.display = "none"; return; }
        card.style.display = "";
        var used = invoicesThisMonth();
        var pct = Math.min(100, Math.round(used / FREE_INVOICE_LIMIT * 100));
        document.getElementById("usage-count").textContent = used + " / " + FREE_INVOICE_LIMIT;
        var fill = document.getElementById("usage-fill");
        fill.style.width = pct + "%";
        fill.className = "usage-fill" + (used >= FREE_INVOICE_LIMIT ? " full" : (used >= FREE_INVOICE_LIMIT - 2 ? " warn" : ""));
        var hint = document.getElementById("usage-hint");
        if (used >= FREE_INVOICE_LIMIT) {
            hint.innerHTML = "Limite atteinte. <a href=\"#\" onclick=\"goSubscription();return false\" style=\"color:var(--primary);font-weight:600\">Passez au Pro</a> pour des factures illimitées.";
        } else {
            hint.innerHTML = "Formule gratuite — " + (FREE_INVOICE_LIMIT - used) + " facture(s) restante(s) ce mois-ci.";
        }
    }
    window.goSubscription = function () { navigate("subscription"); };

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

        await sb.from("invoices").update({ credit_note_id: insertRes.data.id }).eq("id", inv.id);

        await refreshData();
        closeModal("modal-credit-note");
        navigate("invoices");
    });

    function renderCreditNotes() {
        var container = document.getElementById("credit-notes-list");
        if (state.creditNotes.length === 0) {
            container.innerHTML = '<div class="empty-state"><div class="empty-icon">&#128203;</div><p>Aucun avoir émis</p></div>';
            return;
        }
        var html = '<table><thead><tr><th>N° Avoir</th><th>Facture</th><th>Client</th><th>Date</th><th>Montant TTC</th><th>Motif</th><th>Actions</th></tr></thead><tbody>';
        state.creditNotes.forEach(function (cn) {
            var inv = state.invoices.find(function (i) { return i.id === cn.invoice_id; });
            var client = state.clients.find(function (c) { return c.id === cn.client_id; });
            html += '<tr>';
            html += '<td><strong>' + esc(cn.number) + '</strong></td>';
            html += '<td>' + esc(inv ? inv.number : "—") + '</td>';
            html += '<td>' + esc(client ? client.name : "—") + '</td>';
            html += '<td>' + formatDate(cn.date) + '</td>';
            html += '<td style="color:var(--danger)">-' + formatMoney(Number(cn.total_ttc)) + '</td>';
            html += '<td>' + esc(cn.reason || "—") + '</td>';
            html += '<td><button class="btn btn-sm btn-outline" onclick="downloadCreditNotePDF(\'' + cn.id + '\')">PDF</button></td>';
            html += '</tr>';
        });
        html += '</tbody></table>';
        container.innerHTML = html;
    }

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
        if (!canCreateInvoice()) { quotaBlockedAlert(); return; }
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

    window.openClientDetail = function (id) {
        var c = state.clients.find(function (x) { return x.id === id; });
        if (!c) return;
        document.getElementById("cd-title").textContent = c.name;
        var bal = clientBalance(id);

        var contact = [c.email, c.city, c.address, c.siret ? "SIRET : " + c.siret : ""]
            .filter(Boolean).map(esc).join(" &bull; ") || "—";

        var invoices = state.invoices.filter(function (i) { return i.client_id === id; });
        var quotes = state.quotes.filter(function (q) { return q.client_id === id; });
        var credits = state.creditNotes.filter(function (cn) { return cn.client_id === id; });

        function docRows(arr, kind) {
            if (arr.length === 0) return '<div class="row"><span style="color:var(--text-muted)">Aucun</span></div>';
            return arr.map(function (d) {
                var right;
                if (kind === "invoice") right = formatMoney(Number(d.total_ttc)) + ' — ' + (d.credit_note_id ? "Annulée" : (d.status === "paid" ? "Payée" : "En attente"));
                else if (kind === "quote") right = formatMoney(Number(d.total_ttc)) + ' — ' + d.status;
                else right = '-' + formatMoney(Number(d.total_ttc));
                return '<div class="row"><span>' + esc(d.number) + ' <span style="color:var(--text-muted)">' + formatDate(d.date) + '</span></span><span>' + right + '</span></div>';
            }).join("");
        }

        document.getElementById("client-detail-body").innerHTML =
            '<div class="detail-section"><p style="color:var(--text-muted);font-size:.88rem">' + contact + '</p></div>'
            + '<div class="detail-section"><div class="detail-balance">'
            + '<div class="bal"><div class="bal-label">Facturé</div><div class="bal-value">' + formatMoney(bal.invoiced) + '</div></div>'
            + '<div class="bal"><div class="bal-label">Encaissé</div><div class="bal-value" style="color:var(--success)">' + formatMoney(bal.paid) + '</div></div>'
            + '<div class="bal"><div class="bal-label">Solde dû</div><div class="bal-value" style="color:' + (bal.outstanding > 0 ? "var(--warning)" : "var(--text)") + '">' + formatMoney(bal.outstanding) + '</div></div>'
            + '</div></div>'
            + '<div class="detail-section"><h3>Factures (' + invoices.length + ')</h3><div class="detail-list">' + docRows(invoices, "invoice") + '</div></div>'
            + '<div class="detail-section"><h3>Devis (' + quotes.length + ')</h3><div class="detail-list">' + docRows(quotes, "quote") + '</div></div>'
            + '<div class="detail-section"><h3>Avoirs (' + credits.length + ')</h3><div class="detail-list">' + docRows(credits, "credit") + '</div></div>';

        openModal("modal-client-detail");
    };

    window.deleteClient = async function (id) {
        if (!confirm("Supprimer ce client ?")) return;
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
        recalcExpense();
        openModal("modal-expense");
    });

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

            var payload = {
                user_id: state.user.id,
                supplier: document.getElementById("exp-supplier").value.trim(),
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
        if (!confirm("Supprimer cette dépense ?")) return;
        var x = state.expenses.find(function (e) { return e.id === id; });
        if (x && x.file_path) { await sb.storage.from("receipts").remove([x.file_path]); }
        var res = await sb.from("expenses").delete().eq("id", id);
        if (res.error) { alert("Erreur : " + res.error.message); return; }
        await refreshData();
        renderExpenses();
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

        // Populate year selector once.
        var sel = document.getElementById("acct-year");
        var years = {};
        state.invoices.forEach(function (i) { years[String(i.date).slice(0, 4)] = true; });
        state.expenses.forEach(function (x) { years[String(x.date).slice(0, 4)] = true; });
        var thisYear = String(new Date().getFullYear());
        years[thisYear] = true;
        var sorted = Object.keys(years).sort().reverse();
        var prev = sel.value;
        sel.innerHTML = sorted.map(function (y) { return '<option value="' + y + '">' + y + '</option>'; }).join("");
        sel.value = (prev && years[prev]) ? prev : thisYear;

        var year = sel.value;

        // Produits = factures encaissées (HT), moins avoirs (HT).
        var productsHT = 0, tvaCollected = 0;
        state.invoices.forEach(function (inv) {
            if (inv.credit_note_id) return;
            if (inv.status !== "paid") return;
            if (String(inv.date).slice(0, 4) !== year) return;
            productsHT += Number(inv.subtotal_ht);
            tvaCollected += Number(inv.tva_amount);
        });
        var creditsHT = 0;
        state.creditNotes.forEach(function (cn) {
            if (String(cn.date).slice(0, 4) !== year) return;
            creditsHT += Number(cn.subtotal_ht);
        });
        productsHT -= creditsHT;

        // Charges = dépenses (HT), TVA déductible.
        var chargesHT = 0, tvaDeductible = 0;
        var byCat = {};
        state.expenses.forEach(function (x) {
            if (String(x.date).slice(0, 4) !== year) return;
            chargesHT += Number(x.amount_ht);
            tvaDeductible += Number(x.tva_amount);
            byCat[x.category] = (byCat[x.category] || 0) + Number(x.amount_ht);
        });

        var result = productsHT - chargesHT;

        document.getElementById("acct-products").textContent = formatMoney(productsHT);
        document.getElementById("acct-charges").textContent = formatMoney(chargesHT);
        var resEl = document.getElementById("acct-result");
        resEl.textContent = formatMoney(result);
        resEl.style.color = result >= 0 ? "var(--success)" : "var(--danger)";

        // Income statement
        var is = '';
        is += '<div class="acct-line positive"><span>Produits (ventes encaissées, HT)</span><span class="val">' + formatMoney(productsHT + creditsHT) + '</span></div>';
        if (creditsHT > 0) is += '<div class="acct-line negative"><span>Avoirs émis (HT)</span><span class="val">-' + formatMoney(creditsHT) + '</span></div>';
        Object.keys(byCat).forEach(function (cat) {
            is += '<div class="acct-line negative"><span>' + esc(EXP_CAT_LABEL[cat] || cat) + '</span><span class="val">-' + formatMoney(byCat[cat]) + '</span></div>';
        });
        if (Object.keys(byCat).length === 0) is += '<div class="acct-line negative"><span>Charges</span><span class="val">0,00 €</span></div>';
        is += '<div class="acct-line total"><span>Résultat net</span><span class="val" style="color:' + (result >= 0 ? "var(--success)" : "var(--danger)") + '">' + formatMoney(result) + '</span></div>';
        document.getElementById("acct-income-statement").innerHTML = is;

        // Simplified balance sheet
        var outstanding = 0;
        state.invoices.forEach(function (inv) {
            if (inv.credit_note_id || inv.status === "paid") return;
            if (String(inv.date).slice(0, 4) !== year) return;
            outstanding += Number(inv.total_ttc);
        });
        var treasury = result; // approximation HT
        var bs = '';
        bs += '<div style="font-weight:700;font-size:.8rem;color:var(--text-muted);margin:4px 0 6px">ACTIF</div>';
        bs += '<div class="acct-line"><span>Créances clients (factures impayées TTC)</span><span class="val">' + formatMoney(outstanding) + '</span></div>';
        bs += '<div class="acct-line"><span>Trésorerie estimée</span><span class="val">' + formatMoney(treasury) + '</span></div>';
        bs += '<div style="font-weight:700;font-size:.8rem;color:var(--text-muted);margin:14px 0 6px">TVA</div>';
        bs += '<div class="acct-line"><span>TVA collectée</span><span class="val">' + formatMoney(tvaCollected) + '</span></div>';
        bs += '<div class="acct-line"><span>TVA déductible</span><span class="val">' + formatMoney(tvaDeductible) + '</span></div>';
        bs += '<div class="acct-line total"><span>TVA à reverser</span><span class="val">' + formatMoney(tvaCollected - tvaDeductible) + '</span></div>';
        document.getElementById("acct-balance-sheet").innerHTML = bs;
    }

    document.getElementById("acct-year").addEventListener("change", renderAccounting);

    // --- Subscription ---
    function renderSubscription() {
        var pro = isPro();
        var banner = document.getElementById("current-plan-banner");
        banner.innerHTML = '<div style="display:inline-flex;align-items:center;gap:10px;background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:12px 18px;box-shadow:var(--shadow)">'
            + '<span class="plan-tag" style="' + (pro ? '' : 'background:#F1F5F9;color:var(--text-muted)') + '">' + (pro ? "Pro" : "Gratuit") + '</span>'
            + '<span style="font-size:.9rem">Formule actuelle : <strong>' + (pro ? "Pro — 29,99 €/mois" : "Gratuit") + '</strong></span></div>';

        document.getElementById("plan-card-free").classList.toggle("current-plan", !pro);
        document.getElementById("plan-card-pro").classList.toggle("current-plan", pro);

        var freeBtn = document.getElementById("btn-select-free");
        var proBtn = document.getElementById("btn-select-pro");
        if (pro) {
            freeBtn.textContent = "Revenir au gratuit";
            freeBtn.disabled = false;
            proBtn.textContent = "Formule actuelle";
            proBtn.disabled = true;
        } else {
            freeBtn.textContent = "Formule actuelle";
            freeBtn.disabled = true;
            proBtn.textContent = "Passer au Pro";
            proBtn.disabled = false;
        }
    }

    async function changePlan(plan) {
        var payload = { id: state.user.id, plan: plan, plan_since: new Date().toISOString() };
        var res = await sb.from("profiles").upsert(payload).select().single();
        if (res.error) { alert("Erreur : " + res.error.message); return; }
        state.profile = res.data;
        renderSubscription();
    }

    document.getElementById("btn-select-pro").addEventListener("click", function () {
        if (isPro()) return;
        if (!confirm("Activer la formule Pro (29,99 €/mois) ?\n\nLe paiement par carte via Stripe sera branché prochainement — pour l'instant l'activation est immédiate afin de tester les fonctionnalités Pro.")) return;
        changePlan("pro").then(function () { alert("Formule Pro activée ! Vous avez maintenant accès aux dépenses et à la comptabilité."); });
    });

    document.getElementById("btn-select-free").addEventListener("click", function () {
        if (!isPro()) return;
        if (!confirm("Revenir à la formule gratuite ? Vous serez limité à " + FREE_INVOICE_LIMIT + " factures par mois et perdrez l'accès aux modules Pro.")) return;
        changePlan("free");
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
        var payload = {
            name: document.getElementById("client-name").value.trim(),
            email: document.getElementById("client-email").value.trim(),
            address: document.getElementById("client-address").value.trim(),
            city: document.getElementById("client-city").value.trim(),
            siret: document.getElementById("client-siret").value.trim()
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
