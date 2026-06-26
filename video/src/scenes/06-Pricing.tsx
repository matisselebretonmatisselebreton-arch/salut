import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../ui/theme";

/**
 * Scène 7 — 5 s (150 frames).
 * Tarifs : Gratuit / Standard / Pro avec features par plan.
 */
export const ScenePricing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const titleIn = spring({ frame, fps, config: { damping: 16, stiffness: 110 }, durationInFrames: 22 });
  const titleY = interpolate(titleIn, [0, 1], [24, 0]);

  const plans = [
    {
      name: "Gratuit",
      price: "0 €",
      sub: "/mois",
      features: ["10 factures par mois", "10 devis par mois", "Export PDF conforme", "Gestion clients"],
      cta: "Commencer",
      ctaStyle: "outline",
      delay: 14,
      highlight: false,
      tag: null as string | null,
    },
    {
      name: "Standard",
      price: "14,99 €",
      sub: "/mois",
      features: ["Factures & devis illimités", "Factures récurrentes", "Gestion clients & export PDF", "Multi-devises"],
      cta: "Choisir Standard",
      ctaStyle: "outline",
      delay: 20,
      highlight: false,
      tag: null,
    },
    {
      name: "Pro",
      price: "29,99 €",
      sub: "/mois",
      features: [
        "Factures & devis illimités",
        "Fournisseurs & dépenses",
        "Comptabilité : bilan & résultat",
        "Gestion trésorerie",
        "Suivi TVA & déclaration URSSAF",
      ],
      cta: "Choisir Pro",
      ctaStyle: "filled",
      delay: 26,
      highlight: true,
      tag: "RECOMMANDÉ",
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #FAFBFC 0%, #EEF2FF 50%, #DBEAFE 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        gap: isVertical ? 30 : 36,
        padding: "0 40px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(79,70,229,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(16,185,129,0.10) 0%, transparent 50%)",
        }}
      />

      <div
        style={{
          color: theme.text,
          fontSize: isVertical ? 48 : 56,
          fontWeight: 900,
          textAlign: "center",
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
          transform: `translateY(${titleY}px)`,
          opacity: titleIn,
          zIndex: 5,
        }}
      >
        Choisissez votre formule
        <div style={{ fontSize: isVertical ? 20 : 22, fontWeight: 600, color: theme.textMuted, marginTop: 6 }}>
          Sans engagement · Sans carte bancaire · Changement à tout moment
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: isVertical ? "column" : "row",
          gap: isVertical ? 14 : 18,
          width: "100%",
          maxWidth: 1200,
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {plans.map((p, i) => (
          <PricingCard key={i} {...p} frame={frame} isVertical={isVertical} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const PricingCard: React.FC<{
  name: string;
  price: string;
  sub: string;
  features: string[];
  cta: string;
  ctaStyle: string;
  delay: number;
  highlight: boolean;
  tag: string | null;
  frame: number;
  isVertical: boolean;
}> = ({ name, price, sub, features, cta, ctaStyle, delay, highlight, tag, frame, isVertical }) => {
  const inSpring = spring({ frame: frame - delay, fps: 30, config: { damping: 14, stiffness: 110 }, durationInFrames: 24 });
  const y = interpolate(inSpring, [0, 1], [40, 0]);
  const scale = highlight ? interpolate(inSpring, [0, 1], [0.9, 1.04]) : interpolate(inSpring, [0, 1], [0.9, 1]);

  return (
    <div
      style={{
        flex: 1,
        background: "#fff",
        borderRadius: 18,
        padding: isVertical ? "20px 22px" : "28px 26px",
        border: highlight ? `2px solid ${theme.primary}` : `1px solid ${theme.border}`,
        boxShadow: highlight
          ? `0 30px 70px rgba(79,70,229,0.30), 0 0 0 6px rgba(79,70,229,0.08)`
          : `0 16px 40px rgba(15,23,42,0.08)`,
        position: "relative",
        transform: `translateY(${y}px) scale(${scale})`,
        opacity: inSpring,
        display: "flex",
        flexDirection: "column",
        gap: isVertical ? 12 : 16,
      }}
    >
      {tag && (
        <div
          style={{
            position: "absolute",
            top: -14,
            left: "50%",
            transform: "translateX(-50%)",
            background: theme.primary,
            color: "#fff",
            padding: "4px 14px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.06em",
            boxShadow: "0 6px 16px rgba(79,70,229,0.4)",
          }}
        >
          {tag}
        </div>
      )}

      <div style={{ fontSize: isVertical ? 26 : 28, fontWeight: 800, color: theme.text, letterSpacing: "-0.02em" }}>{name}</div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span
          style={{
            fontSize: isVertical ? 42 : 48,
            fontWeight: 900,
            color: highlight ? theme.primary : theme.text,
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          {price}
        </span>
        <span style={{ fontSize: 16, color: theme.textMuted, fontWeight: 600 }}>{sub}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        {features.map((f, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: isVertical ? 14 : 14, color: theme.text }}>
            <div
              style={{
                width: 18,
                height: 18,
                minWidth: 18,
                borderRadius: "50%",
                background: highlight ? theme.primary : theme.success,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 800,
              }}
            >
              ✓
            </div>
            <span style={{ fontWeight: idx < 2 && highlight ? 700 : 500, lineHeight: 1.3 }}>{f}</span>
          </div>
        ))}
      </div>

      <button
        style={{
          background: ctaStyle === "filled" ? theme.primary : "transparent",
          color: ctaStyle === "filled" ? "#fff" : theme.primary,
          border: ctaStyle === "filled" ? "none" : `1.5px solid ${theme.primary}`,
          padding: "12px 18px",
          borderRadius: 10,
          fontSize: 14,
          fontWeight: 800,
          cursor: "pointer",
          boxShadow: ctaStyle === "filled" ? "0 12px 28px rgba(79,70,229,0.32)" : "none",
          marginTop: 4,
        }}
      >
        {cta}
      </button>
    </div>
  );
};
