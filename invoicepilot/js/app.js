(function () {
    "use strict";

    // --- Storage helpers (localStorage as backend for MVP) ---
    function load(key) {
        try { return JSON.parse(localStorage.getItem("ip_" + key)) || null; } catch { return null; }
    }
    function save(key, data) {
        localStorage.setItem("ip_" + key, JSON.stringify(data));
    }

    // --- State ---
    var state = {
        user: load("user"),
        profile: load("profile") || {},
        clients: load("clients") || [],
        invoices: load("invoices") || []
    };

    function persist() {
        save("user", state.user);
        save("profile", state.profile);
        save("clients", state.clients);
        save("invoices", state.invoices);
    }

    // --- Auth ---
    var authScreen = document.getElementById("auth-screen");
    var appScreen = document.getElementById("app-screen");
    var isSignup = window.location.hash === "#signup";

    function showAuth() {
        authScreen.style.display = "";
        appScreen.style.display = "none";
        updateAuthUI();
    }

    function showApp() {
        authScreen.style.display = "none";
        appScreen.style.display = "";
        document.getElementById("user-display-name").textContent = state.user.name || state.user.email;
        navigate("dashboard");
    }

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

    document.getElementById("auth-form").addEventListener("submit", function (e) {
        e.preventDefault();
        var email = document.getElementById("auth-email").value.trim();
        var password = document.getElementById("auth-password").value;
        if (!email || !password) return;

        if (isSignup) {
            var name = document.getElementById("auth-name").value.trim();
            state.user = { email: email, name: name, createdAt: new Date().toISOString() };
            save("ip_pwd_" + email, password);
        } else {
            var stored = localStorage.getItem("ip_pwd_" + email);
            if (!stored) {
                alert("Aucun compte trouvé avec cet email.");
                return;
            }
            if (stored !== password) {
                alert("Mot de passe incorrect.");
                return;
            }
            state.user = load("user") || { email: email, name: email };
        }
        persist();
        showApp();
    });

    document.getElementById("logout-btn").addEventListener("click", function (e) {
        e.preventDefault();
        state.user = null;
        persist();
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
            if (inv.status === "paid") { paid++; revenue += inv.totalTTC; }
            else if (new Date(inv.dueDate) < now) { overdue++; }
            else { pending++; }
        });
        document.getElementById("stat-revenue").textContent = formatMoney(revenue);
        document.getElementById("stat-paid").textContent = paid;
        document.getElementById("stat-pending").textContent = pending;
        document.getElementById("stat-overdue").textContent = overdue;

        var recent = state.invoices.slice().sort(function (a, b) { return new Date(b.date) - new Date(a.date); }).slice(0, 5);
        renderInvoiceTable("dashboard-invoices-list", recent);
    }

    // --- Invoices ---
    function renderInvoices() {
        var sorted = state.invoices.slice().sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
        renderInvoiceTable("invoices-list", sorted);
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
            var client = state.clients.find(function (c) { return c.id === inv.clientId; });
            var statusClass, statusLabel;
            if (inv.status === "paid") { statusClass = "status-paid"; statusLabel = "Payée"; }
            else if (new Date(inv.dueDate) < now) { statusClass = "status-overdue"; statusLabel = "En retard"; }
            else { statusClass = "status-pending"; statusLabel = "En attente"; }

            html += '<tr>';
            html += '<td><strong>' + esc(inv.number) + '</strong></td>';
            html += '<td>' + esc(client ? client.name : "—") + '</td>';
            html += '<td>' + formatDate(inv.date) + '</td>';
            html += '<td>' + formatMoney(inv.totalTTC) + '</td>';
            html += '<td><span class="status ' + statusClass + '"><span class="status-dot"></span>' + statusLabel + '</span></td>';
            html += '<td>';
            if (inv.status !== "paid") {
                html += '<button class="btn btn-sm btn-outline" onclick="markPaid(\'' + inv.id + '\')">Marquer payée</button> ';
            }
            html += '<button class="btn btn-sm btn-outline" onclick="deleteInvoice(\'' + inv.id + '\')">Suppr.</button>';
            html += '</td></tr>';
        });
        html += '</tbody></table>';
        container.innerHTML = html;
    }

    window.markPaid = function (id) {
        var inv = state.invoices.find(function (i) { return i.id === id; });
        if (inv) { inv.status = "paid"; persist(); navigate("invoices"); }
    };

    window.deleteInvoice = function (id) {
        if (!confirm("Supprimer cette facture ?")) return;
        state.invoices = state.invoices.filter(function (i) { return i.id !== id; });
        persist();
        navigate("invoices");
    };

    // --- Clients ---
    function renderClients() {
        var container = document.getElementById("clients-list");
        if (state.clients.length === 0) {
            container.innerHTML = '<div class="empty-state"><div class="empty-icon">&#128101;</div><p>Aucun client pour le moment</p><button class="btn btn-primary" onclick="document.getElementById(\'btn-new-client\').click()">Ajouter un client</button></div>';
            return;
        }
        var html = '<table><thead><tr><th>Nom</th><th>Email</th><th>Ville</th><th>Factures</th><th>Actions</th></tr></thead><tbody>';
        state.clients.forEach(function (c) {
            var invCount = state.invoices.filter(function (i) { return i.clientId === c.id; }).length;
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

    window.deleteClient = function (id) {
        if (!confirm("Supprimer ce client ?")) return;
        state.clients = state.clients.filter(function (c) { return c.id !== id; });
        persist();
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
        document.getElementById("prof-tva").value = p.tvaNumber || "";
        document.getElementById("prof-tva-rate").value = p.tvaRate != null ? p.tvaRate : 20;
        document.getElementById("prof-mentions").value = p.mentions || "";
    }

    document.getElementById("profile-form").addEventListener("submit", function (e) {
        e.preventDefault();
        state.profile = {
            name: document.getElementById("prof-name").value.trim(),
            siret: document.getElementById("prof-siret").value.trim(),
            address: document.getElementById("prof-address").value.trim(),
            city: document.getElementById("prof-city").value.trim(),
            email: document.getElementById("prof-email").value.trim(),
            phone: document.getElementById("prof-phone").value.trim(),
            tvaNumber: document.getElementById("prof-tva").value.trim(),
            tvaRate: parseFloat(document.getElementById("prof-tva-rate").value),
            mentions: document.getElementById("prof-mentions").value.trim()
        };
        persist();
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

    document.getElementById("client-form").addEventListener("submit", function (e) {
        e.preventDefault();
        var client = {
            id: uid(),
            name: document.getElementById("client-name").value.trim(),
            email: document.getElementById("client-email").value.trim(),
            address: document.getElementById("client-address").value.trim(),
            city: document.getElementById("client-city").value.trim(),
            siret: document.getElementById("client-siret").value.trim()
        };
        state.clients.push(client);
        persist();
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

        var year = new Date().getFullYear();
        var yearInvoices = state.invoices.filter(function (i) { return i.number && i.number.startsWith(year + "-"); });
        var nextNum = yearInvoices.length + 1;
        document.getElementById("inv-number").value = year + "-" + String(nextNum).padStart(3, "0");

        var rate = state.profile.tvaRate != null ? state.profile.tvaRate : 20;
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
        var rate = state.profile.tvaRate != null ? state.profile.tvaRate : 20;
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

    document.getElementById("invoice-form").addEventListener("submit", function (e) {
        e.preventDefault();
        var items = [];
        document.querySelectorAll("#invoice-items tr").forEach(function (row) {
            var desc = row.querySelector(".item-desc").value.trim();
            var qty = parseFloat(row.querySelector(".item-qty").value) || 0;
            var price = parseFloat(row.querySelector(".item-price").value) || 0;
            if (desc && qty > 0) items.push({ description: desc, quantity: qty, unitPrice: price, total: qty * price });
        });
        if (items.length === 0) { alert("Ajoutez au moins une ligne."); return; }

        var subtotal = items.reduce(function (s, i) { return s + i.total; }, 0);
        var rate = state.profile.tvaRate != null ? state.profile.tvaRate : 20;
        var tva = subtotal * rate / 100;

        var invoice = {
            id: uid(),
            number: document.getElementById("inv-number").value,
            clientId: document.getElementById("inv-client").value,
            date: document.getElementById("inv-date").value,
            dueDate: document.getElementById("inv-due-date").value,
            items: items,
            subtotalHT: subtotal,
            tvaRate: rate,
            tvaAmount: tva,
            totalTTC: subtotal + tva,
            status: "pending",
            createdAt: new Date().toISOString()
        };

        state.invoices.push(invoice);
        persist();
        closeModal("modal-invoice");
        navigate("invoices");
    });

    // --- Helpers ---
    function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
    function esc(s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; }
    function formatMoney(n) { return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €"; }
    function formatDate(d) {
        var parts = d.split("-");
        return parts[2] + "/" + parts[1] + "/" + parts[0];
    }

    // --- Init ---
    if (state.user) { showApp(); } else { showAuth(); }

})();
