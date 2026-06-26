import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../ui/theme";
import { AppShell } from "../ui/AppShell";
import { NouveauDocModal } from "../ui/NouveauDocModal";
import { InvoiceFormReal } from "../ui/InvoiceFormReal";
import { Cursor } from "../components/Cursor";

/**
 * Scène 3 — 12 s (360 frames @30fps). Allongée pour bien voir chaque étape.
 *
 *  0-20    AppShell apparaît, curseur arrive sur "+ Nouveau document"
 *  20-30   clic sur le bouton
 *  30-70   modal de choix visible, curseur descend vers "Facture libre"
 *  55-65   clic "Facture libre"
 *  65-90   modal formulaire apparaît
 *  90-130  curseur sur Client, sélection du client
 *  130-190 curseur sur Description, typing bien visible
 *  190-240 curseur sur Prix unit., total qui monte
 *  240-280 curseur descend vers "Créer la facture", clic
 *  280-310 form fade out, toast "✓ Facture créée"
 *  310-360 hold final
 */
export const SceneCreateInvoice: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const shellIn = spring({ frame, fps, config: { damping: 18, stiffness: 100 }, durationInFrames: 16 });
  const shellY = interpolate(shellIn, [0, 1], [40, 0]);
  const shellOpacity = shellIn;

  // Stages
  const inChoice = frame >= 30 && frame < 85;
  const inForm = frame >= 65 && frame < 305;
  const showToast = frame >= 290;

  // Choice modal
  const choiceOpacity = interpolate(frame, [30, 42, 75, 85], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const choiceScale = interpolate(frame, [30, 42, 75, 85], [0.92, 1, 1, 0.92], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const choiceHover = frame >= 45 ? 1 : -1;

  // Form modal
  const formOpacity = interpolate(frame, [65, 80, 295, 305], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const formScale = interpolate(frame, [65, 80], [0.92, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Form inputs — more time for each
  const clientFilled = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const descFilled = interpolate(frame, [145, 190], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const puFilled = interpolate(frame, [205, 240], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const submitting = frame >= 270 && frame < 300;

  // Cursor — inside app zone, bigger for visibility
  const cursorPath = [
    { at: 0, x: 60, y: 90 },
    { at: 22, x: 93, y: 8, click: true },          // clic "+ Nouveau document"
    { at: 38, x: 93, y: 8 },
    { at: 58, x: 50, y: 47, click: true },          // clic "Facture libre"
    { at: 80, x: 50, y: 47 },
    { at: 100, x: 33, y: 22, click: true },         // clic Client
    { at: 145, x: 29, y: 61, click: true },         // clic Description
    { at: 205, x: 55, y: 61, click: true },         // clic Prix unit.
    { at: 260, x: 72, y: 89, click: true },         // clic Créer la facture
    { at: 360, x: 72, y: 89 },
  ];

  // Chrono : 0:00 → 0:35
  const seconds = Math.floor(interpolate(frame, [0, 280], [0, 35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const chronoColor = frame >= 280 ? theme.success : theme.primary;
  const chronoOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #E0E7FF 0%, #FAFBFC 50%, #DBEAFE 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
      }}
    >
      {/* Ambiance desk */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.5,
          backgroundImage: "radial-gradient(circle at 30% 20%, rgba(79,70,229,0.10) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(129,140,248,0.10) 0%, transparent 50%)",
        }}
      />

      {/* Chrono flottant en haut */}
      <div
        style={{
          position: "absolute",
          top: isVertical ? 60 : 24,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "10px 24px",
          background: "#fff",
          borderRadius: 999,
          boxShadow: "0 10px 30px rgba(15,23,42,0.10)",
          border: `1px solid ${theme.border}`,
          zIndex: 30,
          opacity: chronoOpacity,
        }}
      >
        <span style={{ fontSize: 22 }}>⏱️</span>
        <span style={{ fontSize: 14, color: theme.textMuted, fontWeight: 600 }}>Création facture</span>
        <span
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: chronoColor,
            fontVariantNumeric: "tabular-nums",
            minWidth: 50,
          }}
        >
          0:{seconds.toString().padStart(2, "0")}
        </span>
        {frame >= 280 && (
          <span style={{ fontSize: 13, fontWeight: 700, color: theme.success }}>✓ créée !</span>
        )}
      </div>

      <DeviceFrame isVertical={isVertical} shellOpacity={shellOpacity} shellY={shellY}>
        <BrowserBar />
        <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
          <AppShell pageTitle="Factures & Avoirs" newDocPulse={frame >= 8 && frame < 25} />

          {inChoice && (
            <NouveauDocModal hoveredIndex={choiceHover} opacity={choiceOpacity} scale={choiceScale} />
          )}
          {inForm && (
            <InvoiceFormReal
              opacity={formOpacity}
              scale={formScale}
              clientFilled={clientFilled}
              descFilled={descFilled}
              puFilled={puFilled}
              submitting={submitting}
            />
          )}
          {showToast && <SuccessToast frame={frame - 290} />}

          {/* Curseur : gros, contrasté, DANS la zone d'app */}
          <Cursor path={cursorPath} size={38} color="#0F172A" />
        </div>
      </DeviceFrame>
    </AbsoluteFill>
  );
};

const DeviceFrame: React.FC<{ isVertical: boolean; shellOpacity: number; shellY: number; children: React.ReactNode }> = ({ isVertical, shellOpacity, shellY, children }) => (
  <div
    style={{
      position: "relative",
      width: isVertical ? "94%" : "86%",
      aspectRatio: "16 / 10",
      maxHeight: isVertical ? "65%" : "88%",
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
    {children}
  </div>
);

const BrowserBar: React.FC = () => (
  <div
    style={{
      height: 32,
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
    <span style={{ marginLeft: 14, fontSize: 11, color: theme.textMuted, fontFamily: "ui-monospace, monospace", background: "#fff", border: `1px solid ${theme.border}`, padding: "2px 10px", borderRadius: 6 }}>
      🔒 app.invoicepilot.fr
    </span>
  </div>
);

const SuccessToast: React.FC<{ frame: number }> = ({ frame }) => {
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
        boxShadow: "0 10px 30px rgba(15,23,42,0.12)",
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
          width: 28, height: 28, borderRadius: "50%",
          background: theme.success,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontWeight: 800, fontSize: 16,
        }}
      >
        ✓
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>Facture créée</div>
        <div style={{ fontSize: 12, color: theme.textMuted }}>FAC-2026-012 — 2 880,00 € TTC</div>
      </div>
    </div>
  );
};
