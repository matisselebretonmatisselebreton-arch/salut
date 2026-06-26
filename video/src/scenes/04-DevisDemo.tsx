import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../ui/theme";
import { Cursor } from "../components/Cursor";

/**
 * Scène 4 — 5 s (150 frames).
 * Devis → Facture en 1 clic — la killer feature.
 *
 *  0-20    AppShell Devis, liste avec DEV-2026-007 "Accepté" highlight
 *  20-50   curseur descend sur l'action "Convertir en facture"
 *  50-65   clic
 *  65-100  morphing : badge DEVIS → FACTURE, numéro DEV-2026-007 → FAC-2026-015
 *  100-130 toast vert "Facture créée depuis devis"
 *  130-150 banner "Devis → Facture en 1 clic"
 */
export const SceneDevisDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const shellIn = spring({ frame, fps, config: { damping: 18, stiffness: 100 }, durationInFrames: 16 });
  const shellY = interpolate(shellIn, [0, 1], [40, 0]);
  const shellOpacity = shellIn;

  // Transformation devis → facture entre 65 et 100
  const morph = interpolate(frame, [65, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const showToast = frame >= 100;
  const showBanner = frame >= 125;

  // Curseur : arrive sur le bouton "Convertir en facture"
  const cursorPath = [
    { at: 0, x: 60, y: 90 },
    { at: 50, x: 72, y: 44, click: true },
    { at: 150, x: 72, y: 44 },
  ];

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

      {/* Banner haut */}
      {showBanner && <TopBanner frame={frame - 125} />}

      <div
        style={{
          position: "relative",
          width: isVertical ? "94%" : "86%",
          aspectRatio: "16 / 10",
          maxHeight: isVertical ? "62%" : "82%",
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

        <div style={{ position: "relative", flex: 1, overflow: "hidden", display: "flex" }}>
          {/* Sidebar */}
          <DevisSidebar />

          {/* Main : page Devis */}
          <div style={{ flex: 1, padding: "20px 28px", minWidth: 0, background: theme.bg }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: theme.text, margin: 0, letterSpacing: "-0.02em" }}>
                Devis
              </h1>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ background: "#fff", color: theme.text, border: `1px solid ${theme.border}`, padding: "8px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600 }}>
                  Tous
                </button>
                <button style={{ background: theme.primary, color: "#fff", border: "none", padding: "8px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                  + Nouveau devis
                </button>
              </div>
            </div>

            {/* Liste de devis */}
            <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${theme.border}`, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "130px 1fr 130px 90px 110px 160px", padding: "10px 16px", background: "#F8FAFC", fontSize: 10, fontWeight: 700, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: `1px solid ${theme.border}` }}>
                <div>Numéro</div><div>Client</div><div>Date</div><div>Total</div><div>Statut</div><div style={{ textAlign: "right" }}>Action</div>
              </div>
              {[
                { num: "DEV-2026-005", client: "Boulangerie Dupont", date: "12/06", total: "850 €", st: "Brouillon", target: false },
                { num: "DEV-2026-006", client: "Restaurant Le Gourmet", date: "16/06", total: "1 450 €", st: "Envoyé", target: false },
                { num: "DEV-2026-007", client: "SARL TechVision", date: "22/06", total: "2 400 €", st: "Accepté", target: true },
                { num: "DEV-2026-008", client: "Mairie Saint-Cloud", date: "24/06", total: "4 200 €", st: "Envoyé", target: false },
              ].map((r, i) => (
                <DevisRow key={i} r={r} morph={morph} />
              ))}
            </div>

            {/* KPI mini en bas */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 14 }}>
              <MiniKpi label="Devis émis" value="13" />
              <MiniKpi label="Acceptés" value="8" color={theme.success} />
              <MiniKpi label="Taux transfo." value="62%" color={theme.primary} />
            </div>
          </div>

          {/* Toast */}
          {showToast && <DevisToast frame={frame - 100} />}

          <Cursor path={cursorPath} size={40} color="#0F172A" />
        </div>
      </div>

      {/* Sous-titre */}
      <div
        style={{
          color: theme.text,
          fontSize: isVertical ? 38 : 44,
          fontWeight: 900,
          textAlign: "center",
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
          padding: "0 40px",
          opacity: interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        Du devis à la facture,{" "}
        <span style={{ color: theme.primary }}>en 1 clic</span>
      </div>
    </AbsoluteFill>
  );
};

const DevisSidebar: React.FC = () => (
  <aside
    style={{
      width: 200,
      background: "#0F172A",
      color: "#fff",
      padding: "18px 12px",
      display: "flex",
      flexDirection: "column",
      gap: 3,
      flexShrink: 0,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 8px 18px" }}>
      <div
        style={{
          width: 28, height: 28, borderRadius: 7,
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`,
        }}
      />
      <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: "-0.02em" }}>InvoicePilot</span>
    </div>
    {["Tableau de bord", "Devis", "Factures & Avoirs", "Récurrences", "Clients", "Fournisseurs", "Dépenses", "Performance", "Comptabilité", "Mon abonnement"].map(
      (label) => {
        const active = label === "Devis";
        return (
          <div
            key={label}
            style={{
              padding: "8px 10px",
              borderRadius: 7,
              fontSize: 12,
              fontWeight: active ? 700 : 500,
              color: active ? "#fff" : "rgba(255,255,255,0.65)",
              background: active ? "rgba(79,70,229,0.55)" : "transparent",
            }}
          >
            {label}
          </div>
        );
      }
    )}
  </aside>
);

const DevisRow: React.FC<{
  r: { num: string; client: string; date: string; total: string; st: string; target: boolean };
  morph: number;
}> = ({ r, morph }) => {
  const isAccepted = r.st === "Accepté";
  const transformed = r.target && morph > 0.5;
  const num = transformed ? "FAC-2026-015" : r.num;
  const isFacture = transformed;
  const highlight = r.target;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "130px 1fr 130px 90px 110px 160px",
        padding: "12px 16px",
        fontSize: 12,
        color: theme.text,
        borderTop: `1px solid ${theme.border}`,
        alignItems: "center",
        background: highlight ? `rgba(79,70,229,${0.05 + 0.05 * morph})` : "#fff",
        transition: "background 0.3s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span
          style={{
            padding: "2px 7px",
            background: isFacture ? "#D1FAE5" : theme.primarySoft,
            color: isFacture ? "#065F46" : theme.primary,
            borderRadius: 6,
            fontSize: 10,
            fontWeight: 700,
            transition: "all 0.3s",
          }}
        >
          {isFacture ? "FACTURE" : "DEVIS"}
        </span>
      </div>
      <div style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{num}</div>
      <div style={{ color: theme.textMuted }}>{r.client}</div>
      <div style={{ color: theme.textMuted }}>{r.date}</div>
      <div style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{r.total}</div>
      <div style={{ textAlign: "right" }}>
        {isAccepted && !transformed ? (
          <span
            style={{
              padding: "5px 10px",
              background: highlight ? theme.primary : "#fff",
              color: highlight ? "#fff" : theme.primary,
              border: `1.5px solid ${theme.primary}`,
              borderRadius: 7,
              fontSize: 11,
              fontWeight: 700,
              boxShadow: highlight ? "0 6px 14px rgba(79,70,229,0.3), 0 0 0 4px rgba(79,70,229,0.12)" : "none",
              transition: "all 0.3s",
            }}
          >
            → Convertir en facture
          </span>
        ) : transformed ? (
          <span style={{ padding: "5px 10px", background: "#D1FAE5", color: "#065F46", borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
            ✓ Convertie
          </span>
        ) : (
          <span
            style={{
              padding: "3px 8px",
              background: r.st === "Brouillon" ? "#F1F5F9" : "#FEF3C7",
              color: r.st === "Brouillon" ? theme.textMuted : "#92400E",
              borderRadius: 6,
              fontSize: 10,
              fontWeight: 700,
            }}
          >
            {r.st}
          </span>
        )}
      </div>
    </div>
  );
};

const MiniKpi: React.FC<{ label: string; value: string; color?: string }> = ({ label, value, color }) => (
  <div style={{ background: "#fff", border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px 14px" }}>
    <div style={{ fontSize: 10, color: theme.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
    <div style={{ fontSize: 20, fontWeight: 800, color: color || theme.text, fontVariantNumeric: "tabular-nums", marginTop: 2 }}>{value}</div>
  </div>
);

const DevisToast: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(frame, [0, 12], [-20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        right: 24,
        background: "#fff",
        border: `1px solid ${theme.border}`,
        borderLeft: `4px solid ${theme.success}`,
        padding: "12px 18px",
        borderRadius: 10,
        boxShadow: "0 12px 30px rgba(15,23,42,0.15)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        opacity,
        transform: `translateY(${y}px)`,
        zIndex: 20,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: theme.success,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 800,
          fontSize: 16,
        }}
      >
        ✓
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>Facture créée</div>
        <div style={{ fontSize: 11, color: theme.textMuted }}>FAC-2026-015 — depuis DEV-2026-007</div>
      </div>
    </div>
  );
};

const TopBanner: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        top: 24,
        left: "50%",
        transform: "translateX(-50%)",
        background: theme.success,
        color: "#fff",
        padding: "10px 22px",
        borderRadius: 999,
        fontSize: 16,
        fontWeight: 800,
        letterSpacing: "-0.01em",
        boxShadow: "0 16px 40px rgba(16,185,129,0.4)",
        opacity,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span style={{ fontSize: 18 }}>⚡</span>
      Conversion automatique en 1 clic
    </div>
  );
};
