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
 *  75-100  modal formulaire apparaît, curseur va sur Client
 *  100-115 clic Client → dropdown s'ouvre
 *  115-160 curseur descend dans la liste vers "SARL TechVision"
 *  155-165 clic → dropdown se ferme, client sélectionné
 *  165-200 form scrolle vers le bas (révèle Lignes + Totaux + Boutons)
 *  200-260 curseur sur Description, typing "Refonte site web — phase 1"
 *  260-320 curseur sur Prix unit., 0 → 2400, totaux montent
 *  320-360 curseur sur "Créer la facture", clic
 *  340-380 form fade out, toast "✓ Facture créée"
 *  380-420 hold final
 */
export const SceneCreateInvoice: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const shellIn = spring({ frame, fps, config: { damping: 18, stiffness: 100 }, durationInFrames: 16 });
  const shellY = interpolate(shellIn, [0, 1], [40, 0]);
  const shellOpacity = shellIn;

  // Stages
  const inChoice = frame >= 22 && frame < 95;
  const inForm = frame >= 75 && frame < 380;
  const showToast = frame >= 365;

  // Choice modal
  const choiceOpacity = interpolate(frame, [22, 35, 85, 95], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const choiceScale = interpolate(frame, [22, 35, 85, 95], [0.92, 1, 1, 0.92], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const choiceHover = frame >= 38 ? 1 : -1;

  // Form modal
  const formOpacity = interpolate(frame, [75, 95, 370, 380], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const formScale = interpolate(frame, [75, 95], [0.92, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Dropdown client : ouvert 110-160
  const dropdownOpen = frame >= 110 && frame < 162;
  const selectedClientName = frame >= 162 ? "SARL TechVision" : "";
  const clientFilled = interpolate(frame, [100, 115, 162, 180], [0, 1, 1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Scroll du form : 0 jusqu'à 165, puis -260 (révèle bas) à partir de 180
  const scrollY = interpolate(frame, [165, 195], [0, -260], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Form inputs
  const descFilled = interpolate(frame, [205, 260], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const puFilled = interpolate(frame, [270, 315], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const submitting = frame >= 348 && frame < 370;

  // Cursor path — coords ajustées pour les différents états (scroll + dropdown)
  //
  // Avant scroll (scrollY=0) :
  //   - Client field : (33, 22)
  //   - Dropdown items (sous le Client) :
  //       0 "Sélectionner" y≈30, 1 Marketing y≈34, 2 Mairie y≈38,
  //       3 Asso y≈42, 4 SARL TechVision y≈46, 5 Restaurant y≈50, 6 Cabinet y≈54
  //   - SARL TechVision est en position 4 → y≈46
  //
  // Après scroll (scrollY=-260) :
  //   - Description cell : (29, 33)
  //   - Prix unit. cell : (55, 33)
  //   - Créer la facture : (75, 82)
  const cursorPath = [
    { at: 0, x: 60, y: 90 },
    { at: 25, x: 93, y: 8, click: true },              // clic "+ Nouveau document"
    { at: 45, x: 93, y: 8 },
    { at: 70, x: 50, y: 47, click: true },             // clic "Facture libre"
    { at: 92, x: 50, y: 47 },
    { at: 112, x: 33, y: 22, click: true },            // clic Client (dropdown s'ouvre)
    { at: 158, x: 33, y: 46, click: true },            // clic "SARL TechVision"
    { at: 175, x: 33, y: 46 },
    { at: 215, x: 29, y: 33, click: true },            // clic Description (après scroll)
    { at: 275, x: 55, y: 33, click: true },            // clic Prix unit.
    { at: 345, x: 75, y: 82, click: true },            // clic "Créer la facture"
    { at: 420, x: 75, y: 82 },
  ];

  // Chrono : 0:00 → 0:38
  const seconds = Math.floor(interpolate(frame, [0, 350], [0, 38], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const chronoColor = frame >= 350 ? theme.success : theme.primary;
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
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.5,
          backgroundImage: "radial-gradient(circle at 30% 20%, rgba(79,70,229,0.10) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(129,140,248,0.10) 0%, transparent 50%)",
        }}
      />

      {/* Chrono */}
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
        <span style={{ fontSize: 24, fontWeight: 800, color: chronoColor, fontVariantNumeric: "tabular-nums", minWidth: 50 }}>
          0:{seconds.toString().padStart(2, "0")}
        </span>
        {frame >= 350 && <span style={{ fontSize: 13, fontWeight: 700, color: theme.success }}>✓ créée !</span>}
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
              scrollY={scrollY}
              dropdownOpen={dropdownOpen}
              selectedClientName={selectedClientName}
              clientFilled={clientFilled}
              descFilled={descFilled}
              puFilled={puFilled}
              submitting={submitting}
            />
          )}
          {showToast && <SuccessToast frame={frame - 365} />}

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
