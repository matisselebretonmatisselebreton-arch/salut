import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../ui/theme";
import { AppShell } from "../ui/AppShell";
import { NouveauDocModal } from "../ui/NouveauDocModal";
import { InvoiceFormReal } from "../ui/InvoiceFormReal";
import { Cursor } from "../components/Cursor";

/**
 * 8 secondes (240 frames @30fps). Flux fidèle à la vraie app :
 *
 *  0-15    AppShell visible, curseur arrive
 *  15-22   clic sur "+ Nouveau document"
 *  22-40   modal de choix apparaît, curseur descend
 *  40-50   clic sur "Facture libre"
 *  50-65   modal formulaire apparaît (choice fade out)
 *  65-95   curseur sélectionne le client (champ Client)
 *  95-135  curseur sur description, typing
 *  135-160 curseur sur Prix unit., 0 → 2400, totaux montent live
 *  160-185 curseur sur "Créer la facture", clic
 *  185-205 form fade out, toast "✓ Facture créée" apparaît
 *  205-240 hold avec toast
 */
export const SceneCreateInvoice: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  // Stage gating
  const inChoice = frame >= 22 && frame < 65;
  const inForm = frame >= 50 && frame < 200;
  const showToast = frame >= 190;

  // Opacities & scales
  const shellIn = spring({ frame, fps, config: { damping: 18, stiffness: 100 }, durationInFrames: 16 });
  const shellY = interpolate(shellIn, [0, 1], [40, 0]);
  const shellOpacity = shellIn;

  const choiceOpacity = interpolate(frame, [22, 32, 60, 65], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const choiceScale = interpolate(frame, [22, 32, 60, 65], [0.92, 1, 1, 0.92], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const choiceHover = frame >= 35 ? 1 : -1; // "Facture libre" highlighted dès 35

  const formOpacity = interpolate(frame, [50, 60, 195, 205], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const formScale = interpolate(frame, [50, 60], [0.92, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Form inputs progression
  const clientFilled = interpolate(frame, [70, 95], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const descFilled = interpolate(frame, [100, 135], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const puFilled = interpolate(frame, [140, 160], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const submitting = frame >= 178 && frame < 200;

  // Cursor path (coords en % de la zone visible). On change selon le stage.
  // Coords cibles approximatives :
  //  - bouton "+ Nouveau document" : top droite, x≈85 y≈8
  //  - "Facture libre" item : centre, y≈48
  //  - champ Client dans le form : x≈30 y≈25
  //  - champ Description : x≈30 y≈55
  //  - champ Prix unit. : x≈55 y≈58
  //  - bouton "Créer la facture" : x≈75 y≈85
  const cursorPath = [
    { at: 0, x: 50, y: 95 },
    { at: 15, x: 87, y: 8, click: true },                 // clic "+ Nouveau document"
    { at: 28, x: 87, y: 8 },
    { at: 40, x: 50, y: 48, click: true },                // clic "Facture libre"
    { at: 65, x: 50, y: 48 },
    { at: 80, x: 30, y: 23, click: true },                // sélection Client
    { at: 105, x: 30, y: 58, click: true },               // clic Description
    { at: 140, x: 50, y: 58, click: true },               // clic Prix unit.
    { at: 170, x: 78, y: 86, click: true },               // clic Créer la facture
    { at: 240, x: 78, y: 86 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: theme.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        padding: isVertical ? "40px 24px" : "40px 80px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: isVertical ? "98%" : "88%",
          maxWidth: 1200,
          height: isVertical ? "90%" : "92%",
          background: "#fff",
          borderRadius: 22,
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(15,23,42,0.18), 0 8px 24px rgba(79,70,229,0.12)",
          border: `1px solid ${theme.border}`,
          opacity: shellOpacity,
          transform: `translateY(${shellY}px)`,
        }}
      >
        {/* Browser bar minimal */}
        <div style={{ height: 32, background: "#F1F5F9", borderBottom: `1px solid ${theme.border}`, display: "flex", alignItems: "center", padding: "0 12px", gap: 6, flexShrink: 0 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
          <span style={{ marginLeft: 14, fontSize: 11, color: theme.textMuted, fontFamily: "ui-monospace, monospace", background: "#fff", border: `1px solid ${theme.border}`, padding: "2px 10px", borderRadius: 6 }}>
            🔒 app.invoicepilot.fr
          </span>
        </div>

        <div style={{ position: "absolute", inset: "32px 0 0 0" }}>
          <AppShell pageTitle="Factures & Avoirs" newDocPulse={frame >= 5 && frame < 20} />

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

          {/* Toast succès */}
          {showToast && <SuccessToast frame={frame - 190} />}
        </div>

        {/* Curseur par-dessus */}
        <Cursor path={cursorPath} size={isVertical ? 30 : 28} />
      </div>
    </AbsoluteFill>
  );
};

const SuccessToast: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [0, 10, 40, 50], [0, 1, 1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
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
