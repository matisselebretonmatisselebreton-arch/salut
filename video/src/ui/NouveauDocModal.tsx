import React from "react";
import { theme } from "./theme";

type Props = {
  hoveredIndex?: number; // 0..3 quel item est survolé/sélectionné
  opacity?: number;
  scale?: number;
};

const options = [
  { title: "Facture depuis un devis accepté", desc: "Convertir un devis validé en facture" },
  { title: "Facture libre", desc: "Créer une facture from scratch" },
  { title: "Acompte ou échéancier", desc: "Diviser un devis en acompte/solde ou en plusieurs échéances" },
  { title: "Avoir", desc: "Annuler tout ou partie d'une facture payée" },
];

export const NouveauDocModal: React.FC<Props> = ({ hoveredIndex = -1, opacity = 1, scale = 1 }) => {
  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.5)", backdropFilter: "blur(2px)", display: "flex", alignItems: "center", justifyContent: "center", opacity, zIndex: 10 }}>
      <div
        style={{
          width: "70%",
          maxWidth: 560,
          background: "#fff",
          borderRadius: 16,
          padding: "26px 28px",
          boxShadow: "0 30px 80px rgba(0,0,0,0.3)",
          transform: `scale(${scale})`,
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 18, letterSpacing: "-0.02em" }}>
          Nouveau document
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {options.map((o, i) => {
            const isHi = i === hoveredIndex;
            return (
              <div
                key={i}
                style={{
                  border: `2px solid ${isHi ? theme.primary : theme.border}`,
                  background: isHi ? "#F5F3FF" : "#fff",
                  borderRadius: 10,
                  padding: "12px 16px",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 2 }}>{o.title}</div>
                <div style={{ fontSize: 12, color: theme.textMuted }}>{o.desc}</div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
          <button style={{ background: "transparent", color: theme.textMuted, border: `1px solid ${theme.border}`, padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
