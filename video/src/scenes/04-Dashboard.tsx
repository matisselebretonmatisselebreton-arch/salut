import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../ui/theme";

/**
 * Scène 4 — 5 s (150 frames).
 * Vue dashboard de pilotage : KPI animés, graphique CA mensuel, factures récentes.
 * Tagline overlay : "Pilotez votre activité d'un coup d'œil"
 */
export const SceneDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const shellIn = spring({ frame, fps, config: { damping: 18, stiffness: 100 }, durationInFrames: 16 });
  const shellY = interpolate(shellIn, [0, 1], [40, 0]);
  const shellOpacity = shellIn;

  const titleIn = spring({ frame: frame - 6, fps, config: { damping: 16, stiffness: 110 }, durationInFrames: 22 });
  const titleY = interpolate(titleIn, [0, 1], [30, 0]);
  const titleOpacity = titleIn;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #E0E7FF 0%, #FAFBFC 50%, #DBEAFE 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        gap: 32,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.5,
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(79,70,229,0.10) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(129,140,248,0.10) 0%, transparent 50%)",
        }}
      />

      {/* Titre */}
      <div
        style={{
          color: theme.text,
          fontSize: isVertical ? 56 : 64,
          fontWeight: 900,
          textAlign: "center",
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          padding: "0 40px",
          zIndex: 5,
        }}
      >
        Pilotez votre activité{" "}
        <span style={{ color: theme.primary }}>d'un coup d'œil</span>
      </div>

      {/* App frame horizontal */}
      <div
        style={{
          position: "relative",
          width: isVertical ? "94%" : "82%",
          aspectRatio: "16 / 10",
          maxHeight: isVertical ? "55%" : "70%",
          background: "#fff",
          borderRadius: 18,
          overflow: "hidden",
          boxShadow:
            "0 40px 100px rgba(15,23,42,0.25), 0 12px 36px rgba(79,70,229,0.18), 0 2px 8px rgba(0,0,0,0.08)",
          border: `1px solid ${theme.border}`,
          opacity: shellOpacity,
          transform: `translateY(${shellY}px)`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Browser bar */}
        <div
          style={{
            height: 30,
            background: "#F1F5F9",
            borderBottom: `1px solid ${theme.border}`,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            gap: 6,
            flexShrink: 0,
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
        </div>

        {/* Dashboard content */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* Sidebar mini */}
          <div
            style={{
              width: 56,
              background: theme.ink,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "12px 0",
              gap: 14,
            }}
          >
            <div style={{ width: 28, height: 28, borderRadius: 7, background: theme.primary }} />
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: i === 1 ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)",
                }}
              />
            ))}
          </div>

          {/* Main */}
          <div
            style={{
              flex: 1,
              padding: "18px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              background: "#FAFBFC",
              overflow: "hidden",
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 800, color: theme.text, letterSpacing: "-0.02em" }}>
              Tableau de bord
            </div>

            {/* KPI row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
              <KPI label="CA encaissé" value={42800} suffix=" €" color={theme.primary} frame={frame} delay={10} />
              <KPI label="En attente" value={8650} suffix=" €" color={theme.warning} frame={frame} delay={16} />
              <KPI label="Factures" value={47} color={theme.success} frame={frame} delay={22} />
              <KPI label="Clients" value={28} color={theme.primaryLight} frame={frame} delay={28} />
            </div>

            {/* Chart + side */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 10, flex: 1, minHeight: 0 }}>
              <ChartCard frame={frame} />
              <RecentList frame={frame} />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const KPI: React.FC<{ label: string; value: number; suffix?: string; color: string; frame: number; delay: number }> = ({
  label,
  value,
  suffix = "",
  color,
  frame,
  delay,
}) => {
  const t = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const eased = 1 - Math.pow(1 - t, 3);
  const display = Math.round(value * eased);
  const cardIn = interpolate(frame, [delay - 4, delay + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${theme.border}`,
        borderRadius: 10,
        padding: "12px 14px",
        opacity: cardIn,
        transform: `translateY(${(1 - cardIn) * 14}px)`,
        boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
      }}
    >
      <div style={{ fontSize: 10, color: theme.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: 20, fontWeight: 800, color, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>
        {display.toLocaleString("fr-FR")}
        {suffix}
      </div>
    </div>
  );
};

const ChartCard: React.FC<{ frame: number }> = ({ frame }) => {
  const bars = [28, 35, 42, 38, 48, 52, 60, 55, 68, 72, 80, 92];
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${theme.border}`,
        borderRadius: 10,
        padding: "12px 14px",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: theme.text }}>Chiffre d'affaires 2026</div>
        <div style={{ fontSize: 11, color: theme.success, fontWeight: 700 }}>↗ +24% vs 2025</div>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 4, minHeight: 0 }}>
        {bars.map((h, i) => {
          const t = interpolate(frame, [36 + i * 3, 56 + i * 3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const ease = 1 - Math.pow(1 - t, 3);
          return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%" }}>
              <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                <div
                  style={{
                    width: "100%",
                    height: `${h * ease}%`,
                    background: `linear-gradient(180deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`,
                    borderRadius: "4px 4px 0 0",
                  }}
                />
              </div>
              <div style={{ fontSize: 9, color: theme.textMuted, fontWeight: 600 }}>{months[i]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RecentList: React.FC<{ frame: number }> = ({ frame }) => {
  const items = [
    { name: "SARL TechVision", amount: "2 880 €", status: "Payée", color: theme.success },
    { name: "Mairie Saint-Cloud", amount: "4 200 €", status: "En attente", color: theme.warning },
    { name: "Restaurant Le Gourmet", amount: "1 450 €", status: "Payée", color: theme.success },
    { name: "Cabinet Médical Lévy", amount: "3 100 €", status: "Payée", color: theme.success },
  ];
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${theme.border}`,
        borderRadius: 10,
        padding: "10px 12px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        minHeight: 0,
        overflow: "hidden",
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 700, color: theme.text, marginBottom: 2 }}>Factures récentes</div>
      {items.map((it, i) => {
        const t = interpolate(frame, [50 + i * 8, 70 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "6px 8px",
              borderRadius: 6,
              background: i % 2 ? "#F8FAFC" : "transparent",
              opacity: t,
              transform: `translateX(${(1 - t) * 20}px)`,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: theme.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {it.name}
              </div>
              <div style={{ fontSize: 9, color: it.color, fontWeight: 700 }}>{it.status}</div>
            </div>
            <div style={{ fontSize: 10, fontWeight: 800, color: theme.text, fontVariantNumeric: "tabular-nums" }}>{it.amount}</div>
          </div>
        );
      })}
    </div>
  );
};
