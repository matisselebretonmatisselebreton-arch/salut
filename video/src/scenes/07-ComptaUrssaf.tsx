import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../ui/theme";

/**
 * Scène 7 — 8 s (240 frames).
 * Comptabilité + URSSAF — la vraie valeur du plan Pro.
 *
 *  0-120   Page Comptabilité : résultat net, trésorerie
 *  120-240 Page URSSAF : déclaration trimestrielle, cotisations, impôt
 */
export const SceneComptaUrssaf: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const shellIn = spring({ frame, fps, config: { damping: 18, stiffness: 100 }, durationInFrames: 16 });
  const shellY = interpolate(shellIn, [0, 1], [40, 0]);

  const showUrssaf = frame >= 120;

  // Crossfade
  const comptaOpacity = interpolate(frame, [0, 12, 112, 125], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const urssafOpacity = interpolate(frame, [115, 130, 240], [0, 1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const titleText = showUrssaf ? "Déclaration URSSAF automatique" : "Comptabilité en temps réel";
  const subText = showUrssaf
    ? "Estimation cotisations & impôt, suivi trimestriel"
    : "Résultat net, bilan simplifié, trésorerie";

  const titleIn = spring({ frame: showUrssaf ? frame - 120 : frame, fps, config: { damping: 16, stiffness: 110 }, durationInFrames: 22 });
  const titleY = interpolate(titleIn, [0, 1], [24, 0]);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #DBEAFE 0%, #FAFBFC 50%, #E0E7FF 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        gap: 20,
      }}
    >
      <div style={{ position: "absolute", inset: 0, opacity: 0.5, backgroundImage: "radial-gradient(circle at 30% 20%, rgba(79,70,229,0.10) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(16,185,129,0.10) 0%, transparent 50%)" }} />

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
          transform: `translateY(${titleY}px)`,
          opacity: titleIn,
        }}
      >
        {titleText}
        <div style={{ fontSize: isVertical ? 18 : 20, fontWeight: 600, color: theme.textMuted, marginTop: 6 }}>{subText}</div>
      </div>

      {/* Progress dots */}
      <div style={{ display: "flex", gap: 8, zIndex: 5 }}>
        <div style={{ width: showUrssaf ? 8 : 24, height: 8, borderRadius: 4, background: showUrssaf ? theme.border : theme.primary, transition: "all 0.3s" }} />
        <div style={{ width: showUrssaf ? 24 : 8, height: 8, borderRadius: 4, background: showUrssaf ? theme.primary : theme.border, transition: "all 0.3s" }} />
      </div>

      {/* App frame */}
      <div
        style={{
          position: "relative",
          width: isVertical ? "94%" : "84%",
          aspectRatio: "16 / 10",
          maxHeight: isVertical ? "58%" : "72%",
          background: "#fff",
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: "0 40px 100px rgba(15,23,42,0.25), 0 12px 36px rgba(79,70,229,0.18), 0 2px 8px rgba(0,0,0,0.08)",
          border: `1px solid ${theme.border}`,
          opacity: shellIn,
          transform: `translateY(${shellY}px)`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <BrowserChrome />
        <div style={{ flex: 1, display: "flex", minHeight: 0, position: "relative" }}>
          <ComptaSidebar active={showUrssaf ? "Comptabilité" : "Comptabilité"} />
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, opacity: comptaOpacity }}>
              <ComptaPage frame={frame} />
            </div>
            <div style={{ position: "absolute", inset: 0, opacity: urssafOpacity }}>
              {showUrssaf && <UrssafPage frame={frame - 120} />}
            </div>
          </div>
        </div>
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

const ComptaSidebar: React.FC<{ active: string }> = () => (
  <aside style={{ width: 188, background: "#0F172A", color: "#fff", padding: "16px 10px", display: "flex", flexDirection: "column", gap: 3, flexShrink: 0 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 8px 16px" }}>
      <div style={{ width: 26, height: 26, borderRadius: 7, background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})` }} />
      <span style={{ fontSize: 13, fontWeight: 800 }}>InvoicePilot</span>
    </div>
    {["Tableau de bord", "Devis", "Factures & Avoirs", "Récurrences", "Clients", "Fournisseurs", "Dépenses", "Performance", "Comptabilité", "Mon abonnement", "Mon profil"].map((label) => {
      const a = label === "Comptabilité";
      return (
        <div key={label} style={{ padding: "7px 10px", borderRadius: 6, fontSize: 11, fontWeight: a ? 700 : 500, color: a ? "#fff" : "rgba(255,255,255,0.6)", background: a ? "rgba(79,70,229,0.55)" : "transparent" }}>
          {label}
        </div>
      );
    })}
    <div style={{ marginTop: "auto", paddingTop: 10, fontSize: 10, color: "rgba(255,255,255,0.5)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>Studio Lumen — Camille Martin</div>
      <div>Déconnexion</div>
    </div>
  </aside>
);

/* ========== PAGE COMPTABILITÉ ========== */
const ComptaPage: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <div style={{ padding: "16px 22px", display: "flex", flexDirection: "column", gap: 12, background: theme.bg, height: "100%", boxSizing: "border-box", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, margin: 0 }}>Comptabilité</h1>
          <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>Compte de résultat & bilan simplifié</div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <Pill label="Année" />
          <Pill label="2026" />
          <Pill label="Cette année" active />
          <Pill label="Export comptable" primary />
        </div>
      </div>

      {/* 3 KPI produits/charges/résultat */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        <ComptaKpi topColor={theme.success} label="PRODUITS (ENCAISSÉS)" value="11 800,00 €" color={theme.success} frame={frame} delay={8} />
        <ComptaKpi topColor={theme.danger} label="CHARGES" value="3 209,94 €" color={theme.danger} frame={frame} delay={14} />
        <ComptaKpi topColor={theme.primary} label="RÉSULTAT NET" value="8 590,06 €" color={theme.success} frame={frame} delay={20} />
      </div>

      {/* Trésorerie & fonds de roulement */}
      <TresoBlock frame={frame} />
    </div>
  );
};

const Pill: React.FC<{ label: string; active?: boolean; primary?: boolean }> = ({ label, active, primary }) => (
  <span style={{
    padding: "5px 10px",
    borderRadius: 6,
    fontSize: 10,
    fontWeight: 600,
    background: primary ? theme.primary : active ? "#fff" : "transparent",
    color: primary ? "#fff" : theme.text,
    border: primary ? "none" : `1px solid ${theme.border}`,
  }}>
    {label}
  </span>
);

const ComptaKpi: React.FC<{ topColor: string; label: string; value: string; color: string; frame: number; delay: number }> = ({ topColor, label, value, color, frame, delay }) => {
  const inSpring = spring({ frame: frame - delay, fps: 30, config: { damping: 15, stiffness: 110 }, durationInFrames: 20 });
  const y = interpolate(inSpring, [0, 1], [14, 0]);
  return (
    <div style={{ background: "#fff", border: `1px solid ${theme.border}`, borderRadius: 10, overflow: "hidden", opacity: inSpring, transform: `translateY(${y}px)` }}>
      <div style={{ height: 4, background: topColor }} />
      <div style={{ padding: "12px 14px" }}>
        <div style={{ fontSize: 9, color: theme.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
        <div style={{ fontSize: 24, fontWeight: 800, color, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em", marginTop: 4 }}>{value}</div>
        <div style={{ fontSize: 10, color: theme.textMuted, marginTop: 4 }}>Voir le détail →</div>
      </div>
    </div>
  );
};

const TresoBlock: React.FC<{ frame: number }> = ({ frame }) => {
  const inSpring = spring({ frame: frame - 30, fps: 30, config: { damping: 18, stiffness: 100 }, durationInFrames: 22 });
  const y = interpolate(inSpring, [0, 1], [20, 0]);
  return (
    <div style={{ background: "#fff", border: `1px solid ${theme.border}`, borderRadius: 10, padding: "14px 16px", opacity: inSpring, transform: `translateY(${y}px)`, flex: 1, minHeight: 0, display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>Trésorerie & fonds de roulement</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
        <TresoCell label="Trésorerie nette" value="10 320,06 €" sub="Encaissé – décaissé" color={theme.success} />
        <TresoCell label="Créances clients" value="8 940,00 €" sub="Factures émises non réglées" color={theme.warning} />
        <TresoCell label="BFR" value="8 940,00 €" sub="Créances – dettes fournisseurs" />
        <TresoCell label="DSO" value="26 j" sub="Délai moyen d'encaissement" />
      </div>
    </div>
  );
};

const TresoCell: React.FC<{ label: string; value: string; sub: string; color?: string }> = ({ label, value, sub, color }) => (
  <div style={{ background: "#F8FAFC", borderRadius: 8, padding: "10px 12px", border: `1px solid ${theme.border}` }}>
    <div style={{ fontSize: 9, color: theme.textMuted, fontWeight: 700 }}>{label}</div>
    <div style={{ fontSize: 16, fontWeight: 800, color: color || theme.text, fontVariantNumeric: "tabular-nums", marginTop: 3 }}>{value}</div>
    <div style={{ fontSize: 9, color: theme.textMuted, marginTop: 2 }}>{sub}</div>
  </div>
);

/* ========== PAGE URSSAF ========== */
const UrssafPage: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <div style={{ padding: "16px 22px", display: "flex", flexDirection: "column", gap: 12, background: theme.bg, height: "100%", boxSizing: "border-box", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ background: "#fff", border: `1px solid ${theme.border}`, borderRadius: 10, padding: "14px 16px" }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: theme.text, marginBottom: 6 }}>
          Déclaration URSSAF & impôt — micro-entrepreneur
        </div>
        <div style={{ fontSize: 11, color: theme.textMuted, lineHeight: 1.4, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 8, padding: "8px 12px" }}>
          Base : Prestations libérales (BNC) — <strong>24,6 %</strong> • Déclaration trimestrielle • Impôt : barème progressif (abattement 34 %).
        </div>
      </div>

      {/* Trimestres */}
      <div style={{ background: "#fff", border: `1px solid ${theme.border}`, borderRadius: 10, overflow: "hidden" }}>
        {[
          { t: "T1 2026", ca: "9 600,00 €", coti: "2 380,80 €", declared: true },
          { t: "T2 2026", ca: "2 200,00 €", coti: "545,60 €", declared: false },
          { t: "T3 2026", ca: "0,00 €", coti: "0,00 €", declared: null },
          { t: "T4 2026", ca: "0,00 €", coti: "0,00 €", declared: null },
        ].map((r, i) => {
          const inRow = spring({ frame: frame - 6 - i * 6, fps: 30, config: { damping: 16, stiffness: 110 }, durationInFrames: 18 });
          const rowY = interpolate(inRow, [0, 1], [12, 0]);
          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 140px",
                padding: "12px 16px",
                fontSize: 12,
                alignItems: "center",
                borderTop: i ? `1px solid ${theme.border}` : "none",
                background: i === 0 && r.declared ? "rgba(16,185,129,0.04)" : "transparent",
                opacity: inRow,
                transform: `translateX(${rowY}px)`,
              }}
            >
              <span style={{ fontWeight: 700 }}>{r.t}</span>
              <span style={{ textAlign: "right", color: theme.textMuted }}>CA {r.ca}</span>
              <span style={{ textAlign: "right", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{r.coti}</span>
              <span style={{ textAlign: "right" }}>
                {r.declared === true ? (
                  <span style={{ color: theme.success, fontWeight: 700, fontSize: 11 }}>● Déclaré</span>
                ) : r.declared === false ? (
                  <span style={{ padding: "4px 12px", border: `1px solid ${theme.border}`, borderRadius: 6, fontSize: 11, fontWeight: 600 }}>
                    Marquer déclaré
                  </span>
                ) : (
                  <span style={{ color: theme.textMuted, fontSize: 11 }}>—</span>
                )}
              </span>
            </div>
          );
        })}
      </div>

      {/* 3 totaux */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        <UrssafTotal label="Cotisations sociales 2026" value="2 926,40 €" sub="24.8 % du CA" frame={frame} delay={30} />
        <UrssafTotal label="Impôt sur le revenu estimé" value="0,00 €" sub="barème sur 7 788,00 €" frame={frame} delay={36} />
        <UrssafTotal label="Total prélèvements 2026" value="2 926,40 €" sub="cotisations + impôt" frame={frame} delay={42} highlight />
      </div>

      {/* Disclaimer */}
      <div style={{ fontSize: 9, color: theme.textMuted, lineHeight: 1.4, padding: "0 4px" }}>
        Estimation indicative à partir de vos données InvoicePilot et des taux/barèmes en vigueur (1 part fiscale). Ne remplace pas votre expert-comptable.
      </div>
    </div>
  );
};

const UrssafTotal: React.FC<{ label: string; value: string; sub: string; frame: number; delay: number; highlight?: boolean }> = ({ label, value, sub, frame, delay, highlight }) => {
  const inSpring = spring({ frame: frame - delay, fps: 30, config: { damping: 15, stiffness: 110 }, durationInFrames: 20 });
  const y = interpolate(inSpring, [0, 1], [14, 0]);
  return (
    <div
      style={{
        background: highlight ? theme.primarySoft : "#F8FAFC",
        borderRadius: 10,
        padding: "12px 14px",
        border: highlight ? `1.5px solid ${theme.primary}44` : `1px solid ${theme.border}`,
        opacity: inSpring,
        transform: `translateY(${y}px)`,
      }}
    >
      <div style={{ fontSize: 10, color: theme.textMuted, fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 800, color: highlight ? theme.primary : theme.text, fontVariantNumeric: "tabular-nums", marginTop: 3, letterSpacing: "-0.02em" }}>{value}</div>
      <div style={{ fontSize: 10, color: theme.textMuted, marginTop: 2 }}>{sub}</div>
    </div>
  );
};
