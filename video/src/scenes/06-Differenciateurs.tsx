import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../ui/theme";

/**
 * Scène 6 — 4 s (120 frames).
 * 3 différenciateurs forts qui apparaissent en cascade.
 */
export const SceneDifferenciateurs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const titleIn = spring({ frame, fps, config: { damping: 16, stiffness: 110 }, durationInFrames: 22 });
  const titleY = interpolate(titleIn, [0, 1], [30, 0]);
  const titleOpacity = titleIn;

  const cards = [
    {
      icon: "shield",
      color: theme.success,
      title: "100% conforme",
      sub: "Législation française 2026",
      detail: "Facturation électronique, FEC, UBL",
    },
    {
      icon: "gift",
      color: theme.primary,
      title: "Gratuit pour commencer",
      sub: "Sans CB, sans engagement",
      detail: "10 factures par mois offertes",
    },
    {
      icon: "rocket",
      color: theme.primaryDark,
      title: "Tout-en-un",
      sub: "Devis · Factures · Compta",
      detail: "Plus besoin de 5 outils différents",
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
        padding: "0 40px",
        gap: isVertical ? 36 : 44,
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
          fontSize: isVertical ? 54 : 60,
          fontWeight: 900,
          textAlign: "center",
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          zIndex: 5,
        }}
      >
        Pourquoi <span style={{ color: theme.primary }}>InvoicePilot</span> ?
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: isVertical ? "column" : "row",
          gap: isVertical ? 18 : 22,
          width: "100%",
          maxWidth: 1100,
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {cards.map((c, i) => (
          <DiffCard key={i} {...c} frame={frame} delay={14 + i * 12} isVertical={isVertical} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const DiffCard: React.FC<{
  icon: string;
  color: string;
  title: string;
  sub: string;
  detail: string;
  frame: number;
  delay: number;
  isVertical: boolean;
}> = ({ icon, color, title, sub, detail, frame, delay, isVertical }) => {
  const inSpring = spring({ frame: frame - delay, fps: 30, config: { damping: 14, stiffness: 110 }, durationInFrames: 22 });
  const y = interpolate(inSpring, [0, 1], [40, 0]);
  const opacity = inSpring;

  return (
    <div
      style={{
        flex: 1,
        background: "#fff",
        borderRadius: 18,
        padding: isVertical ? "22px 24px" : "28px 26px",
        boxShadow: `0 20px 50px rgba(15,23,42,0.10), 0 0 0 1px ${theme.border}`,
        display: "flex",
        flexDirection: isVertical ? "row" : "column",
        alignItems: isVertical ? "center" : "flex-start",
        gap: isVertical ? 18 : 16,
        transform: `translateY(${y}px)`,
        opacity,
      }}
    >
      <div
        style={{
          width: isVertical ? 64 : 60,
          height: isVertical ? 64 : 60,
          minWidth: isVertical ? 64 : 60,
          borderRadius: 16,
          background: `linear-gradient(135deg, ${color}22 0%, ${color}11 100%)`,
          border: `2px solid ${color}33`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DiffIcon kind={icon} color={color} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        <div style={{ fontSize: isVertical ? 22 : 22, fontWeight: 800, color: theme.text, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          {title}
        </div>
        <div style={{ fontSize: isVertical ? 16 : 15, fontWeight: 700, color, lineHeight: 1.2 }}>
          {sub}
        </div>
        <div style={{ fontSize: isVertical ? 14 : 13, color: theme.textMuted, fontWeight: 500, lineHeight: 1.3, marginTop: 2 }}>
          {detail}
        </div>
      </div>
    </div>
  );
};

const DiffIcon: React.FC<{ kind: string; color: string }> = ({ kind, color }) => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    {kind === "shield" && (
      <>
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
        <path d="M9 12l2 2 4-4" />
      </>
    )}
    {kind === "gift" && (
      <>
        <rect x="3" y="8" width="18" height="13" rx="2" />
        <path d="M3 12h18" />
        <path d="M12 8v13" />
        <path d="M12 8c-2-3-6-3-6 0 0 1.5 1.5 2 3 2h3z" />
        <path d="M12 8c2-3 6-3 6 0 0 1.5-1.5 2-3 2h-3z" />
      </>
    )}
    {kind === "rocket" && (
      <>
        <path d="M12 2c4 2 6 6 6 11l-3 2-3-2-3 2-3-2c0-5 2-9 6-11z" />
        <circle cx="12" cy="9" r="1.5" />
        <path d="M9 17l-3 4M15 17l3 4" />
      </>
    )}
  </svg>
);
