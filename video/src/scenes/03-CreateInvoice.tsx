import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../ui/theme";
import { AppShell } from "../ui/AppShell";
import { NouveauDocModal } from "../ui/NouveauDocModal";
import { InvoiceFormReal } from "../ui/InvoiceFormReal";
import { Cursor } from "../components/Cursor";

/**
 * Scène 3 — 14 s (420 frames @30fps).
 *
 *  0-22    AppShell, curseur arrive sur "+ Nouveau document"
 *  22-32   clic, modal choix apparaît
 *  32-70   curseur descend vers "Facture libre"
 *  65-75   clic "Facture libre"
 *  75-100  modal formulaire apparaît
 *  100-115 clic Client → dropdown s'ouvre
 *  115-155 curseur descend vers "SARL TechVision"
 *  155-165 clic → dropdown se ferme, client sélectionné
 *  165-200 form scrolle vers le bas
 *  200-260 curseur sur Description, typing
 *  260-320 curseur sur Prix unit., 0 → 2400
 *  320-355 curseur sur "Créer la facture", clic
 *  355-385 form fade out, toast + grosse banderole "Facture créée en 38s"
 *  385-420 hold
 */
export const SceneCreateInvoice: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const shellIn = spring({ frame, fps, config: { damping: 18, stiffness: 100 }, durationInFrames: 16 });
  const shellY = interpolate(shellIn, [0, 1], [40, 0]);
  const shellOpacity = shellIn;

  const inChoice = frame >= 22 && frame < 95;
  const inForm = frame >= 75 && frame < 380;
  const showToast = frame >= 360;

  const choiceOpacity = interpolate(frame, [22, 35, 85, 95], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const choiceScale = interpolate(frame, [22, 35, 85, 95], [0.92, 1, 1, 0.92], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const choiceHover = frame >= 38 ? 1 : -1;

  const formOpacity = interpolate(frame, [75, 95, 370, 380], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const formScale = interpolate(frame, [75, 95], [0.92, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Dropdown : ouvert pendant que le curseur descend, fermé après clic
  const dropdownOpen = frame >= 110 && frame < 160;
  // SARL TechVision est en index 3 (après Sélectionner / Mairie / Association)
  // Pré-surligné quand le curseur approche (frame 140+)
  const selectedClientName = frame >= 140 ? "SARL TechVision" : "";
  const clientFilled = interpolate(frame, [100, 115], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Scroll : 0 jusqu'à 165, transition vers -200 entre 165 et 195
  const scrollY = interpolate(frame, [165, 195], [0, -200], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Form inputs
  const descFilled = interpolate(frame, [210, 260], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const puFilled = interpolate(frame, [275, 315], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const submitting = frame >= 343 && frame < 365;

  // Cursor path — coords précises calculées d'après la mise en page :
  //   "+ Nouveau document" (top-right main) : (89, 6)
  //   "Facture libre" (2e item choice modal) : (50, 43)
  //   Client field (row 1 col gauche) : (32, 20)
  //   SARL TechVision (dropdown item 3 sur 7) : (32, 50)
  //   Description (après scroll -200) : (30, 31)
  //   Prix unit. (après scroll -200) : (59, 31)
  //   Créer la facture (après scroll -200) : (75, 68)
  const cursorPath = [
    { at: 0, x: 60, y: 90 },
    { at: 25, x: 89, y: 6, click: true },
    { at: 45, x: 89, y: 6 },
    { at: 70, x: 50, y: 43, click: true },
    { at: 92, x: 50, y: 43 },
    { at: 112, x: 32, y: 20, click: true },          // clic Client → dropdown
    { at: 152, x: 32, y: 50, click: true },          // clic SARL TechVision
    { at: 175, x: 32, y: 50 },
    { at: 220, x: 30, y: 31, click: true },          // clic Description
    { at: 280, x: 59, y: 31, click: true },          // clic Prix unit.
    { at: 340, x: 75, y: 68, click: true },          // clic Créer la facture
    { at: 420, x: 75, y: 68 },
  ];

  // Chrono : 0:00 → 0:38, devient gros et vert à la fin
  const seconds = Math.floor(interpolate(frame, [0, 345], [0, 38], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const chronoFinished = frame >= 345;
  const chronoColor = chronoFinished ? theme.success : theme.primary;
  const chronoOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const chronoSuccessScale = chronoFinished
    ? spring({ frame: frame - 345, fps, config: { damping: 10, stiffness: 200 }, durationInFrames: 18 })
    : 0;
  const chronoScale = 1 + 0.08 * chronoSuccessScale;

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
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.5,
          backgroundImage: "radial-gradient(circle at 30% 20%, rgba(79,70,229,0.10) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(129,140,248,0.10) 0%, transparent 50%)",
        }}
      />

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
              scrollY={scrollY}
              dropdownOpen={dropdownOpen}
              selectedClientName={selectedClientName}
              clientFilled={clientFilled}
              descFilled={descFilled}
              puFilled={puFilled}
              submitting={submitting}
            />
          )}
          {showToast && <SuccessToast frame={frame - 360} />}

          <Cursor path={cursorPath} size={40} color="#0F172A" />
        </div>
      </DeviceFrame>

      {/* Chrono — gros, par-dessus tout, ne peut pas être manqué */}
      <div
        style={{
          position: "absolute",
          top: isVertical ? 80 : 32,
          left: "50%",
          transform: `translateX(-50%) scale(${chronoScale})`,
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: "16px 32px",
          background: "#fff",
          borderRadius: 999,
          boxShadow: chronoFinished
            ? `0 20px 50px rgba(16,185,129,0.4), 0 0 0 6px rgba(16,185,129,0.15)`
            : "0 20px 50px rgba(15,23,42,0.18), 0 4px 12px rgba(79,70,229,0.18)",
          border: `2px solid ${chronoColor}`,
          zIndex: 1000,
          opacity: chronoOpacity,
          transition: "box-shadow 0.3s, border-color 0.3s",
        }}
      >
        <span style={{ fontSize: 32 }}>{chronoFinished ? "🎉" : "⏱️"}</span>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
          <span style={{ fontSize: 12, color: theme.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            {chronoFinished ? "Facture créée en" : "Création facture"}
          </span>
          <span
            style={{
              fontSize: chronoFinished ? 42 : 36,
              fontWeight: 900,
              color: chronoColor,
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "-0.02em",
              transition: "all 0.3s",
            }}
          >
            {chronoFinished ? `${seconds} sec` : `0:${seconds.toString().padStart(2, "0")}`}
          </span>
        </div>
        {chronoFinished && (
          <span style={{ fontSize: 28, fontWeight: 800, color: theme.success, marginLeft: 4 }}>✓</span>
        )}
      </div>
    </AbsoluteFill>
  );
};

const DeviceFrame: React.FC<{ isVertical: boolean; shellOpacity: number; shellY: number; children: React.ReactNode }> = ({ isVertical, shellOpacity, shellY, children }) => (
  <div
    style={{
      position: "relative",
      width: isVertical ? "94%" : "86%",
      aspectRatio: "16 / 10",
      maxHeight: isVertical ? "62%" : "85%",
      background: "#fff",
      borderRadius: 18,
      overflow: "hidden",
      boxShadow: "0 40px 100px rgba(15,23,42,0.25), 0 12px 36px rgba(79,70,229,0.18), 0 2px 8px rgba(0,0,0,0.08)",
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
  <div style={{ height: 32, background: "#F1F5F9", borderBottom: `1px solid ${theme.border}`, display: "flex", alignItems: "center", padding: "0 12px", gap: 6, flexShrink: 0 }}>
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
        top: 16, right: 24,
        background: "#fff",
        border: `1px solid ${theme.border}`,
        borderLeft: `4px solid ${theme.success}`,
        padding: "12px 18px",
        borderRadius: 10,
        boxShadow: "0 10px 30px rgba(15,23,42,0.12)",
        display: "flex", alignItems: "center", gap: 12,
        opacity, transform: `translateY(${y}px)`,
        zIndex: 20,
      }}
    >
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: theme.success, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16 }}>
        ✓
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>Facture créée</div>
        <div style={{ fontSize: 12, color: theme.textMuted }}>FAC-2026-014 — 2 880,00 € TTC</div>
      </div>
    </div>
  );
};
