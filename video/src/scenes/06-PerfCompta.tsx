import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../ui/theme";

/**
 * Scène 6 — 6 s (180 frames).
 * Deux vraies pages : Performance commerciale (0-90) + Comptabilité (90-180).
 */
export const ScenePerfCompta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const showCompta = frame >= 90;

  const shellIn = spring({ frame, fps, config: { damping: 18, stiffness: 100 }, durationInFrames: 16 });
  const shellY = interpolate(shellIn, [0, 1], [40, 0]);

  // Crossfade entre Perf et Compta
  const perfOpacity = interpolate(frame, [0, 12, 86, 96], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const comptaOpacity = interpolate(frame, [86, 96, 180], [0, 1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const titleA = "Performance commerciale";
  const titleB = "Comptabilité automatique";
  const subA = "Devis, taux de transformation, top clients";
  const subB = "Résultat, bilan & URSSAF — sans saisie";

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #DBEAFE 0%, #FAFBFC 50%, #E0E7FF 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        gap: 22,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.5,
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(79,70,229,0.10) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(16,185,129,0.10) 0%, transparent 50%)",
        }}
      />

      {/* Titre */}
      <div
        style={{
          color: theme.text,
          fontSize: isVertical ? 38 : 44,
          fontWeight: 900,
          textAlign: "center",
          letterSpacing: "-0.025em",
          padding: "0 40px",
          zIndex: 5,
          lineHeight: 1.05,
        }}
      >
        {showCompta ? titleB : titleA}
        <div style={{ fontSize: isVertical ? 20 : 22, fontWeight: 600, color: theme.textMuted, marginTop: 6 }}>
          {showCompta ? subB : subA}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          width: isVertical ? "94%" : "84%",
          aspectRatio: "16 / 10",
          maxHeight: isVertical ? "60%" : "72%",
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
        <div style={{ flex: 1, display: "flex", minHeight: 0, position: "relative" }}>
          <PerfComptaSidebar active={showCompta ? "Comptabilité" : "Performance"} />
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, opacity: perfOpacity }}>
              {!showCompta && <PerfPage frame={frame} />}
            </div>
            <div style={{ position: "absolute", inset: 0, opacity: comptaOpacity }}>
              {showCompta && <ComptaPage frame={frame - 90} />}
            </div>
          </div>
        </div>
      </div>

      {/* Indicateur 1/2 - 2/2 */}
      <div style={{ display: "flex", gap: 8, zIndex: 5 }}>
        <div style={{ width: showCompta ? 8 : 24, height: 8, borderRadius: 4, background: showCompta ? theme.border : theme.primary, transition: "all 0.3s" }} />
        <div style={{ width: showCompta ? 24 : 8, height: 8, borderRadius: 4, background: showCompta ? theme.primary : theme.border, transition: "all 0.3s" }} />
      </div>
    </AbsoluteFill>
  );
};

const BrowserChrome: React.FC = () => (
  <div style={{ height: 28, background: "#F1F5F9", borderBottom: `1px solid ${theme.border}`, display: "flex", alignItems: "center", padding: "0 12px", gap: 6, flexShrink: 0 }}>
    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
  </div>
);

const PerfComptaSidebar: React.FC<{ active: string }> = ({ active }) => (
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
      <span style={{ fontSize: 13, fontWeight: 800 }}>InvoicePilot</span>
    </div>
    {["Tableau de bord", "Devis", "Factures & Avoirs", "Récurrences", "Clients", "Fournisseurs", "Dépenses", "Performance", "Comptabilité", "Mon abonnement"].map((label) => {
      const a = label === active;
      return (
        <div
          key={label}
          style={{
            padding: "7px 10px",
            borderRadius: 6,
            fontSize: 11,
            fontWeight: a ? 700 : 500,
            color: a ? "#fff" : "rgba(255,255,255,0.6)",
            background: a ? "rgba(79,70,229,0.55)" : "transparent",
            transition: "all 0.3s",
          }}
        >
          {label}
        </div>
      );
    })}
  </aside>
);

const PerfPage: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <div style={{ padding: "16px 22px", display: "flex", flexDirection: "column", gap: 12, background: theme.bg, height: "100%", boxSizing: "border-box", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, margin: 0 }}>Performance commerciale</h1>
          <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>Suivi des devis et taux de transformation</div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["Tout l'historique", "Cette année", "Ce trimestre", "30 j"].map((p, i) => (
            <button
              key={p}
              style={{
                background: i === 0 ? "#fff" : "transparent",
                color: theme.text,
                border: `1px solid ${theme.border}`,
                padding: "5px 10px",
                borderRadius: 6,
                fontSize: 10,
                fontWeight: 600,
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* 4 KPI */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
        <KpiPerf top={theme.primary} label="DEVIS ÉMIS" valueText="13" frame={frame} delay={6} />
        <KpiPerf top={theme.success} label="TAUX DE TRANSFORMATION" valueText="62%" valueColor={theme.success} frame={frame} delay={12} big />
        <KpiPerf top={theme.primary} label="CONVERTIS EN FACTURE" valueText="46%" frame={frame} delay={18} />
        <KpiPerf top={theme.warning} label="MONTANT MOYEN / DEVIS" valueText="3 313,85 €" valueColor={theme.warning} frame={frame} delay={24} />
      </div>

      {/* Entonnoir + Top clients */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, flex: 1, minHeight: 0 }}>
        <Funnel frame={frame} />
        <TopClients frame={frame} />
      </div>
    </div>
  );
};

const KpiPerf: React.FC<{ top: string; label: string; valueText: string; valueColor?: string; frame: number; delay: number; big?: boolean }> = ({
  top,
  label,
  valueText,
  valueColor,
  frame,
  delay,
}) => {
  const inSpring = spring({ frame: frame - delay, fps: 30, config: { damping: 15, stiffness: 110 }, durationInFrames: 20 });
  const y = interpolate(inSpring, [0, 1], [12, 0]);
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${theme.border}`,
        borderRadius: 10,
        overflow: "hidden",
        opacity: inSpring,
        transform: `translateY(${y}px)`,
      }}
    >
      <div style={{ height: 3, background: top }} />
      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontSize: 9, color: theme.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", lineHeight: 1.2 }}>{label}</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: valueColor || theme.text, marginTop: 4, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>
          {valueText}
        </div>
        <div style={{ fontSize: 10, color: theme.textMuted, marginTop: 4 }}>Voir le détail →</div>
      </div>
    </div>
  );
};

const Funnel: React.FC<{ frame: number }> = ({ frame }) => {
  const rows = [
    { label: "Devis émis", count: 13, pct: 100, color: theme.primary },
    { label: "Devis validés", count: 8, pct: 62, color: theme.success },
    { label: "Convertis en facture", count: 6, pct: 46, color: "#0EA5E9" },
    { label: "Refusés", count: 2, pct: 15, color: theme.danger },
  ];
  return (
    <div style={{ background: "#fff", border: `1px solid ${theme.border}`, borderRadius: 10, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: theme.text }}>Entonnoir de conversion</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {rows.map((r, i) => {
          const t = interpolate(frame, [30 + i * 5, 60 + i * 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "120px 1fr 40px", gap: 10, alignItems: "center", fontSize: 11 }}>
              <span style={{ color: theme.text }}>
                {r.label} <strong>{r.count}</strong>
              </span>
              <div style={{ width: "100%", height: 8, background: "#E2E8F0", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${r.pct * t}%`, height: "100%", background: r.color, borderRadius: 4 }} />
              </div>
              <span style={{ textAlign: "right", fontWeight: 700, color: theme.text }}>{Math.round(r.pct * t)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TopClients: React.FC<{ frame: number }> = ({ frame }) => {
  const clients = [
    { name: "SARL TechVision", amount: "8 160,00 €" },
    { name: "Cabinet Médical Lévy", amount: "6 360,00 €" },
    { name: "Mairie de Saint-Cloud", amount: "5 760,00 €" },
    { name: "Restaurant Le Gourmet", amount: "3 360,00 €" },
    { name: "Association Sportive", amount: "3 120,00 €" },
  ];
  return (
    <div style={{ background: "#fff", border: `1px solid ${theme.border}`, borderRadius: 10, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 6, minHeight: 0, overflow: "hidden" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: theme.text, marginBottom: 2 }}>Top clients (devis validés)</div>
      {clients.map((c, i) => {
        const t = interpolate(frame, [40 + i * 6, 60 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "5px 0",
              fontSize: 11,
              opacity: t,
              transform: `translateX(${(1 - t) * 16}px)`,
              borderBottom: i < clients.length - 1 ? `1px solid ${theme.border}` : "none",
            }}
          >
            <span style={{ color: theme.text, fontWeight: 500 }}>{c.name}</span>
            <span style={{ fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{c.amount}</span>
          </div>
        );
      })}
    </div>
  );
};

const ComptaPage: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <div style={{ padding: "16px 22px", display: "flex", flexDirection: "column", gap: 12, background: theme.bg, height: "100%", boxSizing: "border-box", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, margin: 0 }}>Comptabilité</h1>
          <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>Compte de résultat & bilan simplifié</div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button style={{ background: "#fff", color: theme.text, border: `1px solid ${theme.border}`, padding: "5px 10px", borderRadius: 6, fontSize: 10, fontWeight: 600 }}>2026</button>
          <button style={{ background: theme.primary, color: "#fff", border: "none", padding: "5px 12px", borderRadius: 6, fontSize: 10, fontWeight: 700 }}>Export comptable</button>
        </div>
      </div>

      {/* 3 KPI principaux */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        <KpiPerf top={theme.success} label="PRODUITS (ENCAISSÉS)" valueText="11 800,00 €" valueColor={theme.success} frame={frame} delay={4} />
        <KpiPerf top={theme.danger} label="CHARGES" valueText="3 209,94 €" valueColor={theme.danger} frame={frame} delay={10} />
        <KpiPerf top={theme.primary} label="RÉSULTAT NET" valueText="8 590,06 €" valueColor={theme.success} frame={frame} delay={16} />
      </div>

      {/* URSSAF bloc */}
      <UrssafBlock frame={frame} />
    </div>
  );
};

const UrssafBlock: React.FC<{ frame: number }> = ({ frame }) => {
  const inSpring = spring({ frame: frame - 24, fps: 30, config: { damping: 18, stiffness: 100 }, durationInFrames: 22 });
  const y = interpolate(inSpring, [0, 1], [20, 0]);
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${theme.border}`,
        borderRadius: 10,
        padding: "14px 16px",
        opacity: inSpring,
        transform: `translateY(${y}px)`,
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>Déclaration URSSAF & impôt — micro-entrepreneur</div>
      <div style={{ fontSize: 10, color: theme.textMuted }}>
        Base : Prestations libérales (BNC) — <strong>24,6 %</strong> • Déclaration trimestrielle
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {[
          { t: "T1 2026", ca: "9 600,00 €", coti: "2 380,80 €", st: "Déclaré", stColor: theme.success },
          { t: "T2 2026", ca: "2 200,00 €", coti: "545,60 €", st: "À déclarer", stColor: theme.warning },
        ].map((r, i) => {
          const t = interpolate(frame, [30 + i * 6, 50 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 110px",
                padding: "7px 8px",
                fontSize: 11,
                background: i % 2 === 0 ? "transparent" : "#F8FAFC",
                borderRadius: 6,
                alignItems: "center",
                opacity: t,
                transform: `translateX(${(1 - t) * 14}px)`,
              }}
            >
              <span style={{ fontWeight: 600 }}>{r.t}</span>
              <span style={{ color: theme.textMuted, textAlign: "right" }}>CA {r.ca}</span>
              <span style={{ fontWeight: 700, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{r.coti}</span>
              <span style={{ textAlign: "right" }}>
                <span style={{ background: r.stColor + "22", color: r.stColor, padding: "2px 8px", borderRadius: 5, fontSize: 10, fontWeight: 700 }}>● {r.st}</span>
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 4 }}>
        <UrssafCell label="Cotisations sociales 2026" value="2 926,40 €" sub="24,8 % du CA" />
        <UrssafCell label="Impôt sur le revenu" value="0,00 €" sub="barème sur 7 788,00 €" />
        <UrssafCell label="Total prélèvements" value="2 926,40 €" sub="cotisations + impôt" highlight />
      </div>
    </div>
  );
};

const UrssafCell: React.FC<{ label: string; value: string; sub: string; highlight?: boolean }> = ({ label, value, sub, highlight }) => (
  <div style={{ background: highlight ? theme.primarySoft : "#F8FAFC", borderRadius: 8, padding: "8px 10px", border: highlight ? `1px solid ${theme.primary}33` : "none" }}>
    <div style={{ fontSize: 9, color: theme.textMuted, fontWeight: 700 }}>{label}</div>
    <div style={{ fontSize: 15, fontWeight: 800, color: highlight ? theme.primary : theme.text, fontVariantNumeric: "tabular-nums", marginTop: 2 }}>{value}</div>
    <div style={{ fontSize: 9, color: theme.textMuted, marginTop: 1 }}>{sub}</div>
  </div>
);
