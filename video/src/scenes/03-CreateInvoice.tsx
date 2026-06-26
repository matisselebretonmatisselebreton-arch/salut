import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../ui/theme";
import { AppShell } from "../ui/AppShell";
import { NouveauDocModal } from "../ui/NouveauDocModal";
import { InvoiceFormReal } from "../ui/InvoiceFormReal";
import { Cursor } from "../components/Cursor";

/**
 * Scène 3 — 8 s (240 frames @30fps).
 * L'app est toujours rendue en 16:10 paysage. Sur les formats verticaux
 * / carrés, on voit l'environnement bureau autour (gradient + ombre).
 *
 * Timeline :
 *  0-15    AppShell apparaît, curseur arrive
 *  15-22   clic "+ Nouveau document"
 *  22-45   choice modal visible, curseur descend
 *  40-50   clic "Facture libre"
 *  50-65   form modal apparaît
 *  65-95   curseur Client dropdown, remplissage
 *  95-135  curseur Description, typing
 *  135-160 curseur Prix unit., 0 → 2400 + totaux live
 *  160-185 curseur "Créer la facture", clic
 *  185-205 form fade, toast "✓ Facture créée"
 *  205-240 hold
 */
export const SceneCreateInvoice: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  // Animation entrée
  const shellIn = spring({ frame, fps, config: { damping: 18, stiffness: 100 }, durationInFrames: 16 });
  const shellY = interpolate(shellIn, [0, 1], [40, 0]);
  const shellOpacity = shellIn;

  // Stage gating
  const inChoice = frame >= 22 && frame < 65;
  const inForm = frame >= 50 && frame < 205;
  const showToast = frame >= 190;

  // Modals
  const choiceOpacity = interpolate(frame, [22, 32, 60, 65], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const choiceScale = interpolate(frame, [22, 32, 60, 65], [0.92, 1, 1, 0.92], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const choiceHover = frame >= 32 ? 1 : -1;

  const formOpacity = interpolate(frame, [50, 60, 198, 205], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const formScale = interpolate(frame, [50, 60], [0.92, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Form inputs progression
  const clientFilled = interpolate(frame, [78, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const descFilled = interpolate(frame, [108, 135], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const puFilled = interpolate(frame, [142, 160], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const submitting = frame >= 180 && frame < 200;

  // Curseur — coords en % du SCREEN de l'app (zone sous la browser bar).
  // Mesures basées sur AppShell :
  //   - sidebar = 220px ≈ 14% en horizontal
  //   - button "+ Nouveau document" au top-right du main → (93, 8)
  //   - choice modal centrée à 50% → item "Facture libre" 2e sur 4 → (50, 47)
  //   - form modal centrée :
  //       - Client (col gauche, row 1) → (33, 22)
  //       - Cellule Description (ligne facturation) → (29, 61)
  //       - Cellule Prix unit. → (55, 61)
  //       - Bouton "Créer la facture" → (72, 89)
  const cursorPath = [
    { at: 0, x: 60, y: 95 },
    { at: 18, x: 93, y: 8, click: true },
    { at: 30, x: 93, y: 8 },
    { at: 45, x: 50, y: 47, click: true },
    { at: 60, x: 50, y: 47 },
    { at: 78, x: 33, y: 22, click: true },
    { at: 108, x: 29, y: 61, click: true },
    { at: 142, x: 55, y: 61, click: true },
    { at: 175, x: 72, y: 89, click: true },
    { at: 240, x: 72, y: 89 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #E0E7FF 0%, #FAFBFC 50%, #DBEAFE 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        padding: 0,
      }}
    >
      {/* Ambiance desk : ombres + dégradé */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.5,
          backgroundImage: `radial-gradient(circle at 30% 20%, rgba(79,70,229,0.10) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(129,140,248,0.10) 0%, transparent 50%)`,
        }}
      />

      <DeviceFrame
        isVertical={isVertical}
        shellOpacity={shellOpacity}
        shellY={shellY}
      >
        <BrowserBar />
        <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
          <AppShell pageTitle="Factures & Avoirs" newDocPulse={frame >= 5 && frame < 22} />

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
          {showToast && <SuccessToast frame={frame - 190} />}

          {/* Curseur dans la zone d'app — coords précises */}
          <Cursor path={cursorPath} size={28} />
        </div>
      </DeviceFrame>
    </AbsoluteFill>
  );
};

/** Cadre paysage 16:10 toujours, peu importe le format de sortie. */
const DeviceFrame: React.FC<{ isVertical: boolean; shellOpacity: number; shellY: number; children: React.ReactNode }> = ({ isVertical, shellOpacity, shellY, children }) => {
  return (
    <div
      style={{
        position: "relative",
        width: isVertical ? "94%" : "86%",
        aspectRatio: "16 / 10",
        maxHeight: "88%",
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
};

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
