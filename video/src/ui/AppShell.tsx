import React from "react";
import { theme } from "../ui/theme";

type NavItem = { label: string; icon: React.ReactNode; active?: boolean };

const navItems: NavItem[] = [
  { label: "Tableau de bord", icon: <Ic d="M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z" /> },
  { label: "Devis", icon: <Ic d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" /> },
  { label: "Factures & Avoirs", icon: <Ic d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8" />, active: true },
  { label: "Récurrences", icon: <Ic d="m17 2 4 4-4 4 M3 11v-1a4 4 0 0 1 4-4h14 M7 22l-4-4 4-4 M21 13v1a4 4 0 0 1-4 4H3" /> },
  { label: "Clients", icon: <Ic d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75" /> },
  { label: "Fournisseurs", icon: <Ic d="M3 21h18 M5 21V7l8-4v18 M19 21V11l-6-4" /> },
  { label: "Dépenses", icon: <Ic d="M3 6h18 M3 12h18 M3 18h12" /> },
  { label: "Performance", icon: <Ic d="M3 3v18h18 M19 9l-5 5-4-4-3 3" /> },
  { label: "Comptabilité", icon: <Ic d="M3 3v18h18 M7 14v3 M12 10v7 M17 6v11" /> },
  { label: "Mon abonnement", icon: <Ic d="M19 14V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v8 M3 14h18l-2 6H5z" /> },
];

type Props = {
  children?: React.ReactNode;
  pageTitle?: string;
  newDocPulse?: boolean;
};

export const AppShell: React.FC<Props> = ({ children, pageTitle = "Factures & Avoirs", newDocPulse = false }) => {
  return (
    <div style={{ display: "flex", width: "100%", height: "100%", background: theme.bg, borderRadius: 22, overflow: "hidden" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          background: "#0F172A",
          color: "#fff",
          padding: "20px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 8px 22px" }}>
          <div
            style={{
              width: 30, height: 30, borderRadius: 8,
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
            </svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.02em" }}>InvoicePilot</span>
        </div>
        {navItems.map((it) => (
          <div
            key={it.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 10px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: it.active ? 700 : 500,
              color: it.active ? "#fff" : "rgba(255,255,255,0.65)",
              background: it.active ? "rgba(79,70,229,0.5)" : "transparent",
            }}
          >
            <span style={{ width: 16, height: 16, display: "inline-flex" }}>{it.icon}</span>
            {it.label}
          </div>
        ))}
        <div style={{ marginTop: "auto", paddingTop: 14, fontSize: 11, color: "rgba(255,255,255,0.5)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>Studio Lumen — Camille Martin</div>
          <div>Plan Pro</div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "20px 28px", minWidth: 0, position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: theme.text, margin: 0, letterSpacing: "-0.02em" }}>{pageTitle}</h1>
          <button
            style={{
              background: theme.primary,
              color: "#fff",
              border: "none",
              padding: "10px 18px",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: newDocPulse
                ? `0 0 0 ${6 + Math.sin(Date.now() / 100) * 2}px rgba(79,70,229,0.25)`
                : "0 6px 18px rgba(79,70,229,0.28)",
              transition: "all 0.2s",
            }}
          >
            + Nouveau document
          </button>
        </div>

        {/* Liste fake en arrière-plan */}
        <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${theme.border}`, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "90px 1fr 130px 100px 100px 120px", padding: "12px 18px", background: "#F8FAFC", fontSize: 11, fontWeight: 700, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: `1px solid ${theme.border}` }}>
            <div>Type</div><div>Numéro</div><div>Client</div><div>Date</div><div>Total</div><div>Statut</div>
          </div>
          {[
            { num: "FAC-2026-011", client: "Acme Inc.", date: "20/06", total: "1 800 €", st: "Payée" },
            { num: "FAC-2026-010", client: "Boutique Nina", date: "18/06", total: "650 €", st: "En attente" },
            { num: "FAC-2026-009", client: "Cabinet Durand", date: "12/06", total: "3 200 €", st: "Payée" },
            { num: "DEV-2026-006", client: "Marketing Studio SARL", date: "10/06", total: "2 400 €", st: "Accepté" },
          ].map((r, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "90px 1fr 130px 100px 100px 120px", padding: "12px 18px", fontSize: 13, color: theme.text, borderTop: i ? `1px solid ${theme.border}` : "none", alignItems: "center" }}>
              <div><span style={{ padding: "2px 8px", background: theme.primarySoft, color: theme.primary, borderRadius: 6, fontSize: 11, fontWeight: 700 }}>{r.num.startsWith("FAC") ? "FACTURE" : "DEVIS"}</span></div>
              <div style={{ fontWeight: 600 }}>{r.num}</div>
              <div style={{ color: theme.textMuted }}>{r.client}</div>
              <div style={{ color: theme.textMuted }}>{r.date}</div>
              <div style={{ fontWeight: 700 }}>{r.total}</div>
              <div>
                <span style={{ padding: "2px 8px", background: r.st === "Payée" || r.st === "Accepté" ? "#D1FAE5" : "#FEF3C7", color: r.st === "Payée" || r.st === "Accepté" ? "#065F46" : "#92400E", borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                  {r.st}
                </span>
              </div>
            </div>
          ))}
        </div>

        {children}
      </main>
    </div>
  );
};

function Ic({ d }: { d: string }) {
  const paths = d.split(" M").map((p, i) => (i === 0 ? p : `M${p}`));
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}
