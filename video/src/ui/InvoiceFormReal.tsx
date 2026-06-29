import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { theme } from "./theme";

type Props = {
  opacity?: number;
  scale?: number;
  scrollY?: number;             // px, animation de scroll dans la modal
  dropdownOpen?: boolean;
  selectedClientName?: string;   // affiché dans le champ Client
  clientFilled?: number;         // 0..1 — bordure active du select
  descFilled?: number;
  qtyValue?: number;
  puFilled?: number;
  submitting?: boolean;
};

const CLIENTS = [
  "Sélectionner un client",
  "Mairie de Saint-Cloud",
  "Association Sportive Olympique",
  "SARL TechVision",
  "Restaurant Le Gourmet",
  "Cabinet Médical Lévy",
  "Boulangerie Dupont",
];

const TVA_RATE = 0.20;

export const InvoiceFormReal: React.FC<Props> = ({
  opacity = 1,
  scale = 1,
  scrollY = 0,
  dropdownOpen = false,
  selectedClientName = "",
  clientFilled = 0,
  descFilled = 0,
  qtyValue = 1,
  puFilled = 0,
  submitting = false,
}) => {
  const description = "Refonte site web — phase 1";
  const visibleDesc = description.substring(0, Math.floor(description.length * descFilled));
  const pu = Math.round(puFilled * 2400);
  const lineTotal = qtyValue * pu;
  const sousTotal = lineTotal;
  const tva = sousTotal * TVA_RATE;
  const totalTTC = sousTotal + tva;

  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.5)", backdropFilter: "blur(2px)", display: "flex", alignItems: "center", justifyContent: "center", opacity, zIndex: 10 }}>
      <div
        style={{
          width: "82%",
          maxWidth: 720,
          height: "92%",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 30px 80px rgba(0,0,0,0.3)",
          transform: `scale(${scale})`,
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Inner content scrollable via translateY */}
        <div
          style={{
            padding: "24px 26px",
            transform: `translateY(${scrollY}px)`,
            transition: "transform 0.4s ease-out",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 800, color: theme.text, marginBottom: 18, letterSpacing: "-0.02em" }}>
            Nouvelle facture
          </div>

          {/* Row 1 : Client + Date — avec dropdown */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 14, position: "relative" }}>
            <div style={{ position: "relative" }}>
              <FormSelect
                label="Client"
                value={selectedClientName}
                placeholder="Sélectionner un client"
                active={clientFilled > 0}
              />
              {dropdownOpen && (
                <ClientDropdown selectedName={selectedClientName} />
              )}
            </div>
            <FormField label="Date" value="26/06/2026" icon="📅" />
          </div>

          {/* Row 2 : Échéance + Numéro */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 14 }}>
            <FormField label="Échéance" value="26/07/2026" icon="📅" />
            <FormField label="Numéro de facture" value="FAC-2026-014" />
          </div>

          {/* Row 3 : Bon de commande + TVA */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 22 }}>
            <FormField label="Bon de commande / Référence client (optionnel)" value="" placeholder="Ex: PO-2026-0042" small />
            <FormField label="Taux TVA (%)" value="20" />
          </div>

          {/* Lignes */}
          <div style={{ fontSize: 16, fontWeight: 700, color: theme.text, marginBottom: 12 }}>Lignes de facturation</div>
          <div style={{ border: `1px solid ${theme.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 130px 120px 30px", padding: "13px 14px", background: "#F8FAFC", fontSize: 11, fontWeight: 700, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              <div>Description</div>
              <div style={{ textAlign: "center" }}>Qté</div>
              <div style={{ textAlign: "center" }}>Prix unit. (€)</div>
              <div style={{ textAlign: "right" }}>Total</div>
              <div />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 70px 130px 120px 30px",
                padding: "16px 14px",
                alignItems: "center",
                gap: 12,
                background: descFilled > 0 && descFilled < 1 ? "#F5F3FF" : "#fff",
                transition: "background 0.2s",
              }}
            >
              <CellInput value={visibleDesc} placeholder="Prestation" active={descFilled > 0 && descFilled < 1} big />
              <CellInput value={String(qtyValue)} center />
              <CellInput value={pu > 0 ? String(pu) : "0"} center active={puFilled > 0 && puFilled < 1} />
              <div style={{ fontSize: 15, color: lineTotal > 0 ? theme.primary : theme.textMuted, textAlign: "right", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
                {lineTotal > 0 ? `${lineTotal.toLocaleString("fr-FR")},00 €` : "0,00 €"}
              </div>
              <div style={{ color: theme.danger, fontSize: 18, textAlign: "center" }}>×</div>
            </div>
          </div>
          <div style={{ marginBottom: 22 }}>
            <span style={{ display: "inline-block", padding: "9px 16px", border: `1px solid ${theme.border}`, borderRadius: 8, fontSize: 13, color: theme.text, fontWeight: 600 }}>
              + Ajouter une ligne
            </span>
          </div>

          {/* Totaux */}
          <div style={{ marginLeft: "auto", width: 260, fontSize: 14, color: theme.text, marginBottom: 22 }}>
            <TotalLine label="Sous-total HT" value={sousTotal} />
            <TotalLine label="TVA (20%)" value={tva} />
            <div style={{ borderTop: `2px solid ${theme.text}`, marginTop: 8, paddingTop: 10, display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 800 }}>
              <span>Total TTC</span>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{fmt(totalTTC)} €</span>
            </div>
          </div>

          {/* Boutons */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginBottom: 10 }}>
            <button style={{ background: "transparent", color: theme.text, border: `1px solid ${theme.border}`, padding: "10px 22px", borderRadius: 9, fontSize: 14, fontWeight: 600 }}>
              Annuler
            </button>
            <button
              style={{
                background: submitting ? theme.success : theme.primary,
                color: "#fff",
                border: "none",
                padding: "10px 22px",
                borderRadius: 9,
                fontSize: 14,
                fontWeight: 700,
                boxShadow: "0 6px 16px rgba(79,70,229,0.32)",
              }}
            >
              {submitting ? "✓ Création..." : "Créer la facture"}
            </button>
          </div>
        </div>

        {/* Scrollbar fake */}
        <div style={{ position: "absolute", top: 8, right: 4, bottom: 8, width: 6 }}>
          <div
            style={{
              width: 6, height: 60,
              background: "rgba(0,0,0,0.2)",
              borderRadius: 4,
              transform: `translateY(${Math.min(Math.abs(scrollY) * 1.5, 280)}px)`,
              transition: "transform 0.4s ease-out",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const ClientDropdown: React.FC<{ selectedName: string }> = ({ selectedName }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 4px)",
        left: 0,
        right: 0,
        background: "#fff",
        border: `1px solid ${theme.border}`,
        borderRadius: 8,
        boxShadow: "0 12px 30px rgba(15,23,42,0.18)",
        overflow: "hidden",
        zIndex: 20,
      }}
    >
      {CLIENTS.map((c, i) => {
        const isHighlighted = c === selectedName;
        const isPlaceholder = i === 0;
        return (
          <div
            key={c}
            style={{
              padding: "10px 14px",
              fontSize: 14,
              fontWeight: isHighlighted ? 700 : 500,
              color: isPlaceholder ? theme.textMuted : isHighlighted ? "#fff" : theme.text,
              background: isHighlighted ? theme.primary : isPlaceholder ? "#94A3B8" : "#fff",
              borderTop: i ? `1px solid ${theme.border}` : "none",
            }}
          >
            {c}
          </div>
        );
      })}
    </div>
  );
};

const fmt = (v: number) =>
  v.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const TotalLine: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", color: theme.textMuted }}>
    <span>{label}</span>
    <span style={{ color: theme.text, fontVariantNumeric: "tabular-nums" }}>{fmt(value)} €</span>
  </div>
);

const FormField: React.FC<{ label: string; value: string; placeholder?: string; icon?: string; small?: boolean }> = ({ label, value, placeholder, icon, small }) => (
  <div>
    <div style={{ fontSize: small ? 12 : 13, fontWeight: 600, color: theme.text, marginBottom: 6 }}>{label}</div>
    <div style={{ border: `1px solid ${theme.border}`, borderRadius: 8, padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", fontSize: 14 }}>
      <span style={{ color: value ? theme.text : theme.textMuted, fontWeight: value ? 500 : 400 }}>{value || placeholder}</span>
      {icon && <span style={{ fontSize: 14, opacity: 0.6 }}>{icon}</span>}
    </div>
  </div>
);

const FormSelect: React.FC<{ label: string; value: string; placeholder: string; active: boolean }> = ({ label, value, placeholder, active }) => (
  <div>
    <div style={{ fontSize: 13, fontWeight: 600, color: theme.text, marginBottom: 6 }}>{label}</div>
    <div
      style={{
        border: `2px solid ${active ? theme.primary : theme.border}`,
        borderRadius: 8,
        padding: "9px 12px",
        background: active ? "#F5F3FF" : "#fff",
        fontSize: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: active ? "0 0 0 4px rgba(79,70,229,0.12)" : "none",
        transition: "all 0.15s",
      }}
    >
      <span style={{ color: value ? theme.text : theme.textMuted, fontWeight: value ? 600 : 400 }}>{value || placeholder}</span>
      <span style={{ color: theme.textMuted, fontSize: 11 }}>▾</span>
    </div>
  </div>
);

const CellInput: React.FC<{ value: string; placeholder?: string; active?: boolean; center?: boolean; big?: boolean }> = ({ value, placeholder, active, center, big }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const blink = Math.floor((frame / fps) * 2) % 2;
  return (
    <div
      style={{
        border: `${active ? 2 : 1}px solid ${active ? theme.primary : theme.border}`,
        borderRadius: 8,
        padding: big ? "10px 14px" : "8px 10px",
        fontSize: big ? 15 : 14,
        color: value ? theme.text : theme.textMuted,
        textAlign: center ? "center" : "left",
        background: "#fff",
        boxShadow: active ? "0 0 0 4px rgba(79,70,229,0.15)" : "none",
        minHeight: big ? 22 : 18,
        fontWeight: value && big ? 600 : 400,
        transition: "all 0.15s",
      }}
    >
      {value || placeholder}
      {active && (
        <span
          style={{
            display: "inline-block",
            width: 2,
            height: "1em",
            background: theme.primary,
            marginLeft: 2,
            verticalAlign: "middle",
            opacity: blink,
          }}
        />
      )}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _i = interpolate;
