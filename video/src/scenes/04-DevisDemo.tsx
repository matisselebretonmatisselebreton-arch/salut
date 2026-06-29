import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../ui/theme";
import { Cursor } from "../components/Cursor";

/**
 * Scène 4 — 8 s (240 frames).
 * Page Devis fidèle au site. Flow :
 *
 *  0-30    Apparition app, page Devis avec liste complète
 *  30-60   On voit les devis, filtres, statuts
 *  60-100  Curseur descend sur "Accepter" du devis SARL TechVision
 *  100-115 Clic "Accepter" → statut passe "En attente" → "Accepté"
 *  115-160 Curseur glisse vers "Convertir en facture" qui apparaît
 *  160-175 Clic → conversion
 *  175-210 Statut morph "Facturé", toast succès
 *  210-240 Banner "Du devis à la facture, en 1 clic"
 */
export const SceneDevisDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const shellIn = spring({ frame, fps, config: { damping: 18, stiffness: 100 }, durationInFrames: 16 });
  const shellY = interpolate(shellIn, [0, 1], [40, 0]);

  // Phases
  const accepted = frame >= 105;
  const showConvert = frame >= 115;
  const converted = frame >= 170;
  const showToast = frame >= 178;
  const showBanner = frame >= 210;

  const cursorPath = [
    { at: 0, x: 50, y: 90 },
    { at: 60, x: 50, y: 90 },
    { at: 95, x: 82, y: 53, click: true },   // clic "Accepter" sur TechVision
    { at: 120, x: 82, y: 53 },
    { at: 155, x: 82, y: 53, click: true },   // clic "Convertir en facture"
    { at: 240, x: 82, y: 53 },
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
        gap: 20,
      }}
    >
      <div style={{ position: "absolute", inset: 0, opacity: 0.5, backgroundImage: "radial-gradient(circle at 25% 25%, rgba(79,70,229,0.10) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(129,140,248,0.10) 0%, transparent 50%)" }} />

      {/* Titre sous la fenêtre */}
      <SubTitle frame={frame} isVertical={isVertical} showBanner={showBanner} />

      {/* App frame */}
      <div
        style={{
          position: "relative",
          width: isVertical ? "94%" : "86%",
          aspectRatio: "16 / 10",
          maxHeight: isVertical ? "62%" : "78%",
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
        <BrowserBar />
        <div style={{ position: "relative", flex: 1, overflow: "hidden", display: "flex" }}>
          <Sidebar />
          <MainContent accepted={accepted} showConvert={showConvert} converted={converted} frame={frame} />
          {showToast && <Toast frame={frame - 178} />}
          <Cursor path={cursorPath} size={40} color="#0F172A" />
        </div>
      </div>

      {showBanner && <Banner frame={frame - 210} />}
    </AbsoluteFill>
  );
};

const SubTitle: React.FC<{ frame: number; isVertical: boolean; showBanner: boolean }> = ({ frame, isVertical, showBanner }) => {
  const opacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        color: theme.text,
        fontSize: isVertical ? 38 : 44,
        fontWeight: 900,
        textAlign: "center",
        lineHeight: 1.05,
        letterSpacing: "-0.025em",
        padding: "0 40px",
        opacity: showBanner ? 0 : opacity,
        zIndex: 5,
      }}
    >
      Du devis à la facture,{" "}
      <span style={{ color: theme.primary }}>en 1 clic</span>
    </div>
  );
};

const BrowserBar: React.FC = () => (
  <div style={{ height: 30, background: "#F1F5F9", borderBottom: `1px solid ${theme.border}`, display: "flex", alignItems: "center", padding: "0 12px", gap: 6, flexShrink: 0 }}>
    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
  </div>
);

const Sidebar: React.FC = () => (
  <aside style={{ width: 200, background: "#0F172A", color: "#fff", padding: "18px 12px", display: "flex", flexDirection: "column", gap: 3, flexShrink: 0 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 8px 18px" }}>
      <div style={{ width: 28, height: 28, borderRadius: 7, background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})` }} />
      <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: "-0.02em" }}>InvoicePilot</span>
    </div>
    {["Tableau de bord", "Devis", "Factures & Avoirs", "Récurrences", "Clients", "Fournisseurs", "Dépenses", "Performance", "Comptabilité", "Mon abonnement"].map((label) => {
      const active = label === "Devis";
      return (
        <div key={label} style={{ padding: "8px 10px", borderRadius: 7, fontSize: 12, fontWeight: active ? 700 : 500, color: active ? "#fff" : "rgba(255,255,255,0.65)", background: active ? "rgba(79,70,229,0.55)" : "transparent" }}>
          {label}
        </div>
      );
    })}
    <div style={{ marginTop: "auto", paddingTop: 12, fontSize: 10, color: "rgba(255,255,255,0.5)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>Studio Lumen — Camille Martin</div>
      <div>Déconnexion</div>
    </div>
  </aside>
);

const MainContent: React.FC<{ accepted: boolean; showConvert: boolean; converted: boolean; frame: number }> = ({ accepted, showConvert, converted, frame }) => {
  const rows = [
    {
      num: "DEVIS-2026-006",
      client: "Mairie de Saint-Cloud",
      date: "25/06/2026",
      amount: "4 200,00 €",
      status: "Facturé" as const,
      target: false,
    },
    {
      num: "DEVIS-2026-005",
      client: "SARL TechVision",
      date: "10/06/2026",
      amount: "5 400,00 €",
      status: "En attente" as const,
      target: true,
    },
    {
      num: "DEVIS-2026-004",
      client: "Boulangerie Dupont",
      date: "20/05/2026",
      amount: "1 920,00 €",
      status: "En attente" as const,
      target: false,
    },
    {
      num: "DEVIS-2026-003",
      client: "Association Sportive Olympique",
      date: "02/05/2026",
      amount: "3 120,00 €",
      status: "Facturé" as const,
      target: false,
    },
  ];

  return (
    <div style={{ flex: 1, padding: "18px 24px", background: theme.bg, display: "flex", flexDirection: "column", gap: 14, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: theme.text, margin: 0, letterSpacing: "-0.02em" }}>Devis</h1>
        <button style={{ background: theme.primary, color: "#fff", border: "none", padding: "9px 16px", borderRadius: 9, fontSize: 12, fontWeight: 700, boxShadow: "0 6px 18px rgba(79,70,229,0.28)" }}>
          + Nouveau devis
        </button>
      </div>

      {/* Recherche */}
      <div style={{ background: "#fff", border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: theme.textMuted, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 14 }}>🔍</span>
        Rechercher (n° de devis, client)...
      </div>

      {/* Filtres */}
      <div style={{ display: "flex", gap: 8 }}>
        {["Tous", "En attente", "Acceptés", "Refusés", "Facturés"].map((f, i) => (
          <span
            key={f}
            style={{
              padding: "5px 14px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: i === 0 ? 700 : 600,
              background: i === 0 ? theme.primary : "#fff",
              color: i === 0 ? "#fff" : theme.text,
              border: i === 0 ? "none" : `1px solid ${theme.border}`,
            }}
          >
            {f}
          </span>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${theme.border}`, overflow: "hidden", flex: 1, minHeight: 0 }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 120px 110px 100px 1fr", padding: "11px 16px", background: "#F8FAFC", fontSize: 10, fontWeight: 700, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: `1px solid ${theme.border}` }}>
          <div>N°</div>
          <div>Client</div>
          <div>Date</div>
          <div>Montant TTC</div>
          <div>Statut</div>
          <div style={{ textAlign: "right" }}>Actions</div>
        </div>

        {rows.map((r, i) => {
          const isTarget = r.target;
          // Statut dynamique pour la cible
          let status = r.status;
          let actions: React.ReactNode;

          if (isTarget) {
            if (converted) {
              status = "Facturé";
              actions = (
                <div style={{ display: "flex", gap: 6, justifyContent: "flex-end", flexWrap: "wrap" }}>
                  <ActionBtn label="PDF" />
                  <span style={{ fontSize: 11, color: theme.textMuted }}>→ facture créée</span>
                </div>
              );
            } else if (accepted && showConvert) {
              status = "Accepté";
              actions = (
                <div style={{ display: "flex", gap: 6, justifyContent: "flex-end", flexWrap: "wrap" }}>
                  <ActionBtn label="PDF" />
                  <ActionBtn label="Convertir en facture" primary pulse={frame >= 130 && frame < 170} />
                </div>
              );
            } else if (accepted) {
              status = "Accepté";
              actions = (
                <div style={{ display: "flex", gap: 6, justifyContent: "flex-end", flexWrap: "wrap" }}>
                  <ActionBtn label="PDF" />
                </div>
              );
            } else {
              actions = (
                <div style={{ display: "flex", gap: 6, justifyContent: "flex-end", flexWrap: "wrap" }}>
                  <ActionBtn label="PDF" />
                  <ActionBtn label="Accepter" pulse={frame >= 70 && frame < 105} />
                  <ActionBtn label="Refuser" />
                </div>
              );
            }
          } else if (status === "Facturé") {
            actions = (
              <div style={{ display: "flex", gap: 6, justifyContent: "flex-end", flexWrap: "wrap" }}>
                <ActionBtn label="PDF" />
                <span style={{ fontSize: 11, color: theme.textMuted }}>→ facture créée</span>
              </div>
            );
          } else {
            actions = (
              <div style={{ display: "flex", gap: 6, justifyContent: "flex-end", flexWrap: "wrap" }}>
                <ActionBtn label="PDF" />
                <ActionBtn label="Accepter" />
                <ActionBtn label="Refuser" />
              </div>
            );
          }

          const statusColor = status === "Facturé" ? theme.success : status === "Accepté" ? theme.success : theme.warning;
          const statusBg = status === "Facturé" ? "#D1FAE5" : status === "Accepté" ? "#D1FAE5" : "#FEF3C7";

          // Highlight la ligne cible
          const rowBg = isTarget && !converted
            ? (accepted ? "rgba(79,70,229,0.06)" : frame >= 70 ? "rgba(79,70,229,0.04)" : "transparent")
            : "transparent";

          const rowIn = interpolate(frame, [4 + i * 5, 20 + i * 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr 120px 110px 100px 1fr",
                padding: "13px 16px",
                fontSize: 12,
                color: theme.text,
                borderTop: `1px solid ${theme.border}`,
                alignItems: "center",
                background: rowBg,
                opacity: rowIn,
                transform: `translateX(${(1 - rowIn) * 20}px)`,
                transition: "background 0.3s",
              }}
            >
              <div style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{r.num}</div>
              <div style={{ color: theme.text, fontWeight: 500 }}>{r.client}</div>
              <div style={{ color: theme.textMuted }}>{r.date}</div>
              <div style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{r.amount}</div>
              <div>
                <span
                  style={{
                    padding: "3px 10px",
                    background: statusBg,
                    color: statusColor,
                    borderRadius: 999,
                    fontSize: 10,
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    transition: "all 0.3s",
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusColor }} />
                  {status}
                </span>
              </div>
              <div>{actions}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ActionBtn: React.FC<{ label: string; primary?: boolean; pulse?: boolean }> = ({ label, primary, pulse }) => (
  <span
    style={{
      padding: "4px 10px",
      background: primary ? theme.primary : "#fff",
      color: primary ? "#fff" : theme.text,
      border: primary ? "none" : `1px solid ${theme.border}`,
      borderRadius: 6,
      fontSize: 11,
      fontWeight: primary ? 700 : 600,
      boxShadow: pulse
        ? "0 0 0 4px rgba(79,70,229,0.20), 0 4px 12px rgba(79,70,229,0.25)"
        : primary
          ? "0 3px 8px rgba(79,70,229,0.25)"
          : "none",
      transition: "all 0.15s",
      whiteSpace: "nowrap" as const,
    }}
  >
    {label}
  </span>
);

const Toast: React.FC<{ frame: number }> = ({ frame }) => {
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
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: theme.success, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16 }}>
        ✓
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>Facture créée</div>
        <div style={{ fontSize: 11, color: theme.textMuted }}>FAC-2026-015 — depuis DEVIS-2026-005</div>
      </div>
    </div>
  );
};

const Banner: React.FC<{ frame: number }> = ({ frame }) => {
  const inSpring = spring({ frame, fps: 30, config: { damping: 12, stiffness: 150 }, durationInFrames: 18 });
  return (
    <div
      style={{
        position: "absolute",
        bottom: 60,
        left: "50%",
        transform: `translateX(-50%) scale(${0.7 + inSpring * 0.3})`,
        background: theme.success,
        color: "#fff",
        padding: "14px 28px",
        borderRadius: 999,
        fontSize: 18,
        fontWeight: 800,
        letterSpacing: "-0.01em",
        boxShadow: "0 16px 40px rgba(16,185,129,0.4), 0 0 0 6px rgba(16,185,129,0.12)",
        opacity: inSpring,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: 10,
        whiteSpace: "nowrap" as const,
      }}
    >
      ⚡ Devis accepté → Facture créée automatiquement
    </div>
  );
};
