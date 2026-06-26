import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "./theme";

type Props = {
  opacity?: number;
  scale?: number;
  clientFilled?: number;     // 0..1
  descFilled?: number;       // 0..1
  qtyValue?: number;
  puFilled?: number;         // 0..1, anime 0 → 2400
  submitting?: boolean;
};

const TVA_RATE = 0.20;

export const InvoiceFormReal: React.FC<Props> = ({
  opacity = 1,
  scale = 1,
  clientFilled = 0,
  descFilled = 0,
  qtyValue = 1,
  puFilled = 0,
  submitting = false,
}) => {
  const clientName = "Marketing Studio SARL";
  const description = "Refonte site web — phase 1";
  const visibleClient = clientFilled >= 1 ? clientName : clientFilled > 0.5 ? clientName : "";
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
          width: "80%",
          maxWidth: 700,
          maxHeight: "92%",
          background: "#fff",
          borderRadius: 16,
          padding: "24px 26px",
          boxShadow: "0 30px 80px rgba(0,0,0,0.3)",
          transform: `scale(${scale})`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 16, letterSpacing: "-0.02em" }}>
          Nouvelle facture
        </div>

        {/* Row 1 : Client + Date */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 12 }}>
          <FormSelect label="Client" value={visibleClient} placeholder="Sélectionner un client" active={clientFilled > 0 && clientFilled < 1} hasArrow />
          <FormField label="Date" value="26/06/2026" icon="📅" />
        </div>

        {/* Row 2 : Échéance + Numéro */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 12 }}>
          <FormField label="Échéance" value="26/07/2026" icon="📅" />
          <FormField label="Numéro de facture" value="FAC-2026-012" />
        </div>

        {/* Row 3 : Bon de commande + TVA */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
          <FormField label="Bon de commande / Référence client (optionnel)" value="" placeholder="Ex: PO-2026-0042" small />
          <FormField label="Taux TVA (%)" value="20" />
        </div>

        {/* Lignes */}
        <div style={{ fontSize: 13, fontWeight: 700, color: theme.text, marginBottom: 8 }}>Lignes de facturation</div>
        <div style={{ border: `1px solid ${theme.border}`, borderRadius: 8, overflow: "hidden", marginBottom: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 100px 90px 26px", padding: "9px 12px", background: "#F8FAFC", fontSize: 10, fontWeight: 700, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            <div>Description</div>
            <div style={{ textAlign: "center" }}>Qté</div>
            <div style={{ textAlign: "center" }}>Prix unit. (€)</div>
            <div style={{ textAlign: "right" }}>Total</div>
            <div />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 100px 90px 26px", padding: "10px 12px", alignItems: "center", gap: 8, background: descFilled > 0 && descFilled < 1 ? "#FAFBFF" : "#fff" }}>
            <CellInput value={visibleDesc} placeholder="Prestation" active={descFilled > 0 && descFilled < 1} />
            <CellInput value={String(qtyValue)} center />
            <CellInput value={pu > 0 ? String(pu) : "0"} center active={puFilled > 0 && puFilled < 1} />
            <div style={{ fontSize: 13, color: lineTotal > 0 ? theme.text : theme.textMuted, textAlign: "right", fontWeight: 600 }}>
              {lineTotal > 0 ? `${lineTotal.toLocaleString("fr-FR")},00 €` : "0,00 €"}
            </div>
            <div style={{ color: theme.danger, fontSize: 14, textAlign: "center" }}>×</div>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <span style={{ display: "inline-block", padding: "6px 12px", border: `1px dashed ${theme.border}`, borderRadius: 8, fontSize: 12, color: theme.textMuted, fontWeight: 600 }}>
            + Ajouter une ligne
          </span>
        </div>

        {/* Totaux */}
        <div style={{ marginLeft: "auto", width: 240, fontSize: 13, color: theme.text }}>
          <TotalLine label="Sous-total HT" value={sousTotal} />
          <TotalLine label="TVA (20%)" value={tva} />
          <div style={{ borderTop: `2px solid ${theme.text}`, marginTop: 6, paddingTop: 8, display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 800 }}>
            <span>Total TTC</span>
            <span style={{ fontVariantNumeric: "tabular-nums" }}>{fmt(totalTTC)} €</span>
          </div>
        </div>

        {/* Boutons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 18 }}>
          <button style={{ background: "transparent", color: theme.text, border: `1px solid ${theme.border}`, padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
            Annuler
          </button>
          <button
            style={{
              background: submitting ? theme.success : theme.primary,
              color: "#fff",
              border: "none",
              padding: "9px 20px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              boxShadow: "0 6px 16px rgba(79,70,229,0.32)",
              transition: "background 0.2s",
            }}
          >
            {submitting ? "✓ Création..." : "Créer la facture"}
          </button>
        </div>
      </div>
    </div>
  );
};

const fmt = (v: number) =>
  v.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const TotalLine: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", color: theme.textMuted }}>
    <span>{label}</span>
    <span style={{ color: theme.text, fontVariantNumeric: "tabular-nums" }}>{fmt(value)} €</span>
  </div>
);

const FormField: React.FC<{ label: string; value: string; placeholder?: string; icon?: string; small?: boolean }> = ({ label, value, placeholder, icon, small }) => (
  <div>
    <div style={{ fontSize: small ? 11 : 12, fontWeight: 600, color: theme.text, marginBottom: 5 }}>{label}</div>
    <div style={{ border: `1px solid ${theme.border}`, borderRadius: 8, padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", fontSize: 13 }}>
      <span style={{ color: value ? theme.text : theme.textMuted, fontWeight: value ? 500 : 400 }}>{value || placeholder}</span>
      {icon && <span style={{ fontSize: 14, opacity: 0.6 }}>{icon}</span>}
    </div>
  </div>
);

const FormSelect: React.FC<{ label: string; value: string; placeholder: string; active: boolean; hasArrow: boolean }> = ({ label, value, placeholder, active }) => (
  <div>
    <div style={{ fontSize: 12, fontWeight: 600, color: theme.text, marginBottom: 5 }}>{label}</div>
    <div style={{ border: `2px solid ${active ? theme.primary : theme.border}`, borderRadius: 8, padding: "8px 12px", background: active ? "#F5F3FF" : "#fff", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ color: value ? theme.text : theme.textMuted, fontWeight: value ? 600 : 400 }}>{value || placeholder}</span>
      <span style={{ color: theme.textMuted, fontSize: 11 }}>▾</span>
    </div>
  </div>
);

const CellInput: React.FC<{ value: string; placeholder?: string; active?: boolean; center?: boolean }> = ({ value, placeholder, active, center }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const blink = Math.floor((frame / fps) * 2) % 2;
  return (
    <div style={{ border: `1px solid ${active ? theme.primary : theme.border}`, borderRadius: 6, padding: "6px 8px", fontSize: 13, color: value ? theme.text : theme.textMuted, textAlign: center ? "center" : "left", background: active ? "#F5F3FF" : "#fff", minHeight: 16 }}>
      {value || placeholder}
      {active && (
        <span style={{ display: "inline-block", width: 1.5, height: "1em", background: theme.primary, marginLeft: 2, verticalAlign: "middle", opacity: blink }} />
      )}
    </div>
  );
};
