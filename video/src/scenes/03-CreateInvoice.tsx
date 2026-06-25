import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../ui/theme";
import { AppFrame } from "../components/AppFrame";
import { InvoiceForm } from "../ui/InvoiceForm";
import { Cursor } from "../components/Cursor";

/**
 * 6 secondes (180 frames @30fps).
 * Timeline :
 *  0-15   : curseur arrive sur le champ Client, fade-in du formulaire
 *  15-45  : remplissage Client (typing) — 1s
 *  45-60  : curseur va sur la ligne, click
 *  60-95  : remplissage description + qty + PU
 *  95-110 : curseur descend sur "Envoyer"
 *  110-125 : click → success state, total monte 0 → 2 400
 *  125-180 : badge "0:32" final, confettis
 */
export const SceneCreateInvoice: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const formIn = spring({ frame, fps, config: { damping: 18, stiffness: 100 }, durationInFrames: 18 });
  const formY = interpolate(formIn, [0, 1], [40, 0]);
  const formOpacity = formIn;

  const clientFilled = interpolate(frame, [15, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const itemFilled = interpolate(frame, [60, 95], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const total = interpolate(frame, [95, 120], [0, 2400], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const showSuccess = frame >= 120;

  const cursorPath = [
    { at: 0, x: 90, y: 90 },
    { at: 15, x: 32, y: 22, click: true },
    { at: 45, x: 50, y: 22 },
    { at: 55, x: 50, y: 47, click: true },
    { at: 95, x: 70, y: 47 },
    { at: 110, x: 18, y: 88, click: true },
    { at: 180, x: 18, y: 88 },
  ];

  // Timer en haut : compte de 0:00 à 0:32
  const seconds = Math.floor(interpolate(frame, [0, 130], [0, 32], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const timerColor = frame >= 120 ? theme.success : theme.primary;

  // Confettis simples
  const confetti = frame >= 122 ? new Array(18).fill(0) : [];

  return (
    <AbsoluteFill
      style={{
        background: theme.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        gap: 28,
        padding: isVertical ? "60px 40px" : "40px 80px",
      }}
    >
      {/* Timer overhead */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "10px 22px",
          background: "#fff",
          borderRadius: 999,
          boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
          border: `1px solid ${theme.border}`,
        }}
      >
        <span style={{ fontSize: 26 }}>⏱️</span>
        <span style={{ fontSize: 14, color: theme.textMuted, fontWeight: 600 }}>Création facture</span>
        <span
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: timerColor,
            fontVariantNumeric: "tabular-nums",
            transition: "color 0.3s",
          }}
        >
          0:{seconds.toString().padStart(2, "0")}
        </span>
        {frame >= 130 && (
          <span style={{ fontSize: 13, fontWeight: 700, color: theme.success, marginLeft: 4 }}>✓ envoyée</span>
        )}
      </div>

      <div
        style={{
          position: "relative",
          width: isVertical ? "92%" : "70%",
          maxWidth: 900,
          transform: `translateY(${formY}px)`,
          opacity: formOpacity,
        }}
      >
        <AppFrame title="app.invoicepilot.fr/factures/nouvelle">
          <InvoiceForm
            clientFilled={clientFilled}
            itemFilled={itemFilled}
            total={total}
            showSuccess={showSuccess}
          />
        </AppFrame>

        {/* Curseur par-dessus le frame */}
        <Cursor path={cursorPath} size={isVertical ? 44 : 36} />
      </div>

      {/* Confettis */}
      {confetti.map((_, i) => {
        const angle = (i / confetti.length) * Math.PI * 2;
        const dist = interpolate(frame - 122, [0, 50], [0, 400], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const cx = 50 + Math.cos(angle) * dist * 0.1;
        const cy = 70 + Math.sin(angle) * dist * 0.05;
        const colors = [theme.primary, theme.accent, theme.success, theme.primaryLight];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${cx}%`,
              top: `${cy}%`,
              width: 10,
              height: 14,
              background: colors[i % colors.length],
              transform: `rotate(${frame * 8 + i * 30}deg)`,
              opacity: interpolate(frame - 122, [0, 30, 55], [1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              borderRadius: 2,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
