import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../ui/theme";

/**
 * Scène 5 — 5 s (150 frames).
 * Dashboard fidèle au site : alerte retards, 4 KPI colorés, santé financière, prévisionnel.
 */
export const SceneDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const shellIn = spring({ frame, fps, config: { damping: 18, stiffness: 100 }, durationInFrames: 16 });
  const shellY = interpolate(shellIn, [0, 1], [40, 0]);

  const titleIn = spring({ frame: frame - 4, fps, config: { damping: 16, stiffness: 110 }, durationInFrames: 22 });
  const titleY = interpolate(titleIn, [0, 1], [24, 0]);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #E0E7FF 0%, #FAFBFC 50%, #DBEAFE 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        gap: 24,
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

      <div
        style={{
          color: theme.text,
          fontSize: isVertical ? 42 : 50,
          fontWeight: 900,
          textAlign: "center",
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
          transform: `translateY(${titleY}px)`,
          opacity: titleIn,
          padding: "0 40px",
          zIndex: 5,
        }}
      >
        Toute votre activité,{" "}
        <span style={{ color: theme.primary }}>en un coup d'œil</span>
      </div>

      <div
        style={{
          position: "relative",
          width: isVertical ? "94%" : "86%",
          aspectRatio: "16 / 10",
          maxHeight: isVertical ? "62%" : "78%",
          background: "#fff",
          borderRadius: 18,
          overflow: "hidden",
          boxShadow:
            "0 40px 100px rgba(15,23,42,0.25), 0 12px 36px rgba(79,70,229,0.18), 0 2px 8px rgba(0,0,0,0.08)",
          border: `1px solid ${theme.border}`,
          opacity: shellIn,
          transform: `translateY(${shellY}px)`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <BrowserChrome />
        <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
          <DashSidebar />
          <div style={{ flex: 1, padding: "16px 22px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 12, background: theme.bg }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: theme.text, margin: 0, letterSpacing: "-0.02em" }}>Tableau de bord</h1>
              <button style={{ background: theme.primary, color: "#fff", border: "none", padding: "8px 14px", borderRadius: 9, fontSize: 12, fontWeight: 700 }}>
                + Nouvelle facture
              </button>
            </div>

            {/* Alerte retards */}
            <AlertBanner frame={frame} />

            {/* 4 KPI cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
              <KpiCard topColor={theme.primary} label="CHIFFRE D'AFFAIRES" value={14160} suffix=" €" frame={frame} delay={14} link={false} chart />
              <KpiCard topColor={theme.success} label="PAYÉES" value={18} frame={frame} delay={20} link />
              <KpiCard topColor={theme.warning} label="EN ATTENTE" value={5} frame={frame} delay={26} link />
              <KpiCard topColor={theme.danger} label="EN RETARD" value={2} frame={frame} delay={32} link />
            </div>

            {/* Bas : Santé + Tréso */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 10, flex: 1, minHeight: 0 }}>
              <SanteFinanciere frame={frame} />
              <PrevisionnelTreso frame={frame} />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const BrowserChrome: React.FC = () => (
  <div style={{ height: 30, background: "#F1F5F9", borderBottom: `1px solid ${theme.border}`, display: "flex", alignItems: "center", padding: "0 12px", gap: 6, flexShrink: 0 }}>
    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
  </div>
);

const DashSidebar: React.FC = () => (
  <aside
    style={{
      width: 188,
      background: "#0F172A",
      color: "#fff",
      padding: "16px 10px",
      display: "flex",
      flexDirection: "column",
      gap: 3,
      flexShrink: 0,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 8px 16px" }}>
      <div style={{ width: 26, height: 26, borderRadius: 7, background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})` }} />
      <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "-0.02em" }}>InvoicePilot</span>
    </div>
    {["Tableau de bord", "Devis", "Factures & Avoirs", "Récurrences", "Clients", "Fournisseurs", "Dépenses", "Performance", "Comptabilité", "Mon abonnement"].map((label) => {
      const active = label === "Tableau de bord";
      return (
        <div
          key={label}
          style={{
            padding: "7px 10px",
            borderRadius: 6,
            fontSize: 11,
            fontWeight: active ? 700 : 500,
            color: active ? "#fff" : "rgba(255,255,255,0.6)",
            background: active ? "rgba(79,70,229,0.55)" : "transparent",
          }}
        >
          {label}
        </div>
      );
    })}
  </aside>
);

const AlertBanner: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [8, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const x = interpolate(frame, [8, 22], [-20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        background: "#FEF2F2",
        border: `1px solid #FECACA`,
        borderRadius: 10,
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        opacity,
        transform: `translateX(${x}px)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: theme.text }}>
        <span style={{ fontSize: 16 }}>⚠️</span>
        <span>
          <strong style={{ color: theme.danger }}>2 factures en retard</strong> à relancer — <strong>3 000,00 €</strong> en attente de règlement.
        </span>
      </div>
      <span style={{ color: theme.danger, fontWeight: 700, fontSize: 12 }}>Voir →</span>
    </div>
  );
};

const KpiCard: React.FC<{
  topColor: string;
  label: string;
  value: number;
  suffix?: string;
  frame: number;
  delay: number;
  link: boolean;
  chart?: boolean;
}> = ({ topColor, label, value, suffix = "", frame, delay, link, chart }) => {
  const inSpring = spring({ frame: frame - delay, fps: 30, config: { damping: 15, stiffness: 110 }, durationInFrames: 20 });
  const y = interpolate(inSpring, [0, 1], [16, 0]);
  const cardOpacity = inSpring;

  const t = interpolate(frame, [delay + 4, delay + 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const eased = 1 - Math.pow(1 - t, 3);
  const display = Math.round(value * eased);

  const displayStr = suffix === " €" ? display.toLocaleString("fr-FR") + ",00 €" : display.toLocaleString("fr-FR") + suffix;

  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${theme.border}`,
        borderRadius: 10,
        overflow: "hidden",
        opacity: cardOpacity,
        transform: `translateY(${y}px)`,
        boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ height: 4, background: topColor }} />
      <div style={{ padding: "10px 14px 12px", display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        <div style={{ fontSize: 9, color: theme.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: theme.text, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
          {displayStr}
        </div>
        {chart && (
          <svg viewBox="0 0 100 24" width="100%" height="22" preserveAspectRatio="none" style={{ marginTop: 4 }}>
            <polyline
              points="0,18 14,14 28,16 42,10 56,12 70,8 84,6 100,4"
              fill="none"
              stroke={topColor}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {link && (
          <div style={{ fontSize: 10, color: theme.textMuted, fontWeight: 600, marginTop: "auto" }}>Voir le détail →</div>
        )}
      </div>
    </div>
  );
};

const SanteFinanciere: React.FC<{ frame: number }> = ({ frame }) => {
  const inSpring = spring({ frame: frame - 40, fps: 30, config: { damping: 18, stiffness: 100 }, durationInFrames: 22 });
  const y = interpolate(inSpring, [0, 1], [20, 0]);

  const score = Math.round(interpolate(frame, [50, 90], [0, 92], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const encaissement = interpolate(frame, [55, 95], [0, 86], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ponctualite = interpolate(frame, [60, 100], [0, 95], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${theme.border}`,
        borderRadius: 10,
        padding: "12px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        opacity: inSpring,
        transform: `translateY(${y}px)`,
        minHeight: 0,
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>Santé financière</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span style={{ fontSize: 38, fontWeight: 900, color: theme.success, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em", lineHeight: 1 }}>{score}</span>
        <span style={{ fontSize: 16, color: theme.textMuted, fontWeight: 600 }}>/100</span>
      </div>
      <div style={{ fontSize: 12, color: theme.success, fontWeight: 700 }}>Bonne santé</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 2 }}>
        <BarLine label="Encaissement" pct={encaissement} color={theme.primary} />
        <BarLine label="Ponctualité de paiement" pct={ponctualite} color={theme.success} />
      </div>
    </div>
  );
};

const BarLine: React.FC<{ label: string; pct: number; color: string }> = ({ label, pct, color }) => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: theme.text, marginBottom: 4 }}>
      <span>{label}</span>
      <span style={{ fontWeight: 700, color: theme.text }}>{Math.round(pct)}%</span>
    </div>
    <div style={{ width: "100%", height: 5, background: "#E2E8F0", borderRadius: 3, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 3 }} />
    </div>
  </div>
);

const PrevisionnelTreso: React.FC<{ frame: number }> = ({ frame }) => {
  const inSpring = spring({ frame: frame - 48, fps: 30, config: { damping: 18, stiffness: 100 }, durationInFrames: 22 });
  const y = interpolate(inSpring, [0, 1], [20, 0]);

  const tresho = (target: number, delay: number) => {
    const t = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return Math.round(target * (1 - Math.pow(1 - t, 3)));
  };

  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${theme.border}`,
        borderRadius: 10,
        padding: "12px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        opacity: inSpring,
        transform: `translateY(${y}px)`,
        minHeight: 0,
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>Prévisionnel de trésorerie</div>
      <div style={{ fontSize: 10, color: theme.textMuted }}>Encaissements attendus (factures en attente + récurrences à venir)</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 4 }}>
        <TreshoCell label="30 jours" value={tresho(9660, 54)} />
        <TreshoCell label="60 jours" value={tresho(10380, 60)} />
        <TreshoCell label="90 jours" value={tresho(11460, 66)} highlight />
      </div>
    </div>
  );
};

const TreshoCell: React.FC<{ label: string; value: number; highlight?: boolean }> = ({ label, value, highlight }) => (
  <div
    style={{
      background: highlight ? theme.primarySoft : "#F8FAFC",
      borderRadius: 8,
      padding: "9px 10px",
      border: highlight ? `1px solid ${theme.primary}33` : "none",
    }}
  >
    <div style={{ fontSize: 9, color: theme.textMuted, fontWeight: 700 }}>{label}</div>
    <div style={{ fontSize: 14, fontWeight: 800, color: highlight ? theme.primary : theme.text, fontVariantNumeric: "tabular-nums", marginTop: 2, letterSpacing: "-0.01em" }}>
      {value.toLocaleString("fr-FR")},00 €
    </div>
  </div>
);
