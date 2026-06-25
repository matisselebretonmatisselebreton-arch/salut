import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "./theme";

type Props = {
  clientFilled?: number; // 0 → 1
  itemFilled?: number;   // 0 → 1
  total?: number;        // valeur affichée
  showSuccess?: boolean;
};

/** Réplique stylisée du formulaire "Nouvelle facture" d'InvoicePilot. */
export const InvoiceForm: React.FC<Props> = ({
  clientFilled = 0,
  itemFilled = 0,
  total = 0,
  showSuccess = false,
}) => {
  const client = "Marketing Studio SARL";
  const description = "Refonte site web — phase 1";
  const qty = 1;
  const pu = 2400;

  const visibleClient = client.substring(0, Math.floor(client.length * clientFilled));
  const visibleDesc = description.substring(0, Math.floor(description.length * itemFilled));

  return (
    <div style={{ padding: 32, background: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <div>
          <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Facture
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: theme.text, marginTop: 2 }}>
            FAC-2026-042
          </div>
        </div>
        <span
          style={{
            padding: "4px 12px",
            background: showSuccess ? "#D1FAE5" : "#FEF3C7",
            color: showSuccess ? "#065F46" : "#92400E",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {showSuccess ? "✓ Envoyée" : "Brouillon"}
        </span>
      </div>

      <Field label="Client" value={visibleClient} active={clientFilled > 0 && clientFilled < 1} />

      <div style={{ marginTop: 18 }}>
        <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
          Lignes
        </div>
        <div style={{ border: `1px solid ${theme.border}`, borderRadius: 10, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 110px 110px", background: "#F8FAFC", padding: "10px 14px", fontSize: 11, fontWeight: 700, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            <div>Description</div>
            <div style={{ textAlign: "right" }}>Qté</div>
            <div style={{ textAlign: "right" }}>P.U.</div>
            <div style={{ textAlign: "right" }}>Total</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 110px 110px", padding: "12px 14px", fontSize: 14, alignItems: "center", background: itemFilled > 0 && itemFilled < 1 ? "#F5F3FF" : "#fff" }}>
            <div style={{ color: theme.text, fontWeight: 500 }}>{visibleDesc}<Caret show={itemFilled > 0 && itemFilled < 1} /></div>
            <div style={{ textAlign: "right", color: itemFilled >= 1 ? theme.text : theme.textMuted }}>{itemFilled >= 1 ? qty : "—"}</div>
            <div style={{ textAlign: "right", color: itemFilled >= 1 ? theme.text : theme.textMuted }}>{itemFilled >= 1 ? `${pu.toLocaleString("fr-FR")} €` : "—"}</div>
            <div style={{ textAlign: "right", color: theme.primary, fontWeight: 700 }}>
              {itemFilled >= 1 ? `${(qty * pu).toLocaleString("fr-FR")} €` : "—"}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          style={{
            background: total > 0 ? theme.primary : "#E2E8F0",
            color: total > 0 ? "#fff" : theme.textMuted,
            border: "none",
            padding: "12px 22px",
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: total > 0 ? "0 8px 18px rgba(79,70,229,0.32)" : "none",
            transition: "all 0.2s",
          }}
        >
          {showSuccess ? "✓ Envoyée par email" : "Envoyer la facture"}
        </button>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Total TTC
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, color: theme.text, marginTop: 2, fontVariantNumeric: "tabular-nums" }}>
            {total.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €
          </div>
        </div>
      </div>
    </div>
  );
};

const Field: React.FC<{ label: string; value: string; active: boolean }> = ({ label, value, active }) => (
  <div style={{ marginTop: 6 }}>
    <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
      {label}
    </div>
    <div
      style={{
        border: `2px solid ${active ? theme.primary : theme.border}`,
        background: active ? "#F5F3FF" : "#fff",
        borderRadius: 10,
        padding: "11px 14px",
        fontSize: 15,
        fontWeight: 500,
        color: theme.text,
        minHeight: 22,
        transition: "all 0.2s",
      }}
    >
      {value}
      <Caret show={active} />
    </div>
  </div>
);

const Caret: React.FC<{ show: boolean }> = ({ show }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (!show) return null;
  const blink = Math.floor((frame / fps) * 2) % 2;
  return (
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
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _interp = interpolate;
