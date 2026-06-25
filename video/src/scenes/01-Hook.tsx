import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../ui/theme";
import { TextReveal } from "../components/TextReveal";

export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;
  const sz = isVertical ? 1 : 0.75;

  // Gradient ring pulse derrière le texte
  const ringScale = interpolate(frame, [0, 90], [0.85, 1.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ringOpacity = interpolate(frame, [0, 20], [0, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ligne de réponse "On a la solution."
  const answerIn = spring({
    frame: frame - 55,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.6 },
    durationInFrames: 22,
  });
  const answerY = interpolate(answerIn, [0, 1], [30, 0]);
  const answerOpacity = answerIn;

  return (
    <AbsoluteFill
      style={{
        background: theme.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        overflow: "hidden",
      }}
    >
      {/* Subtle gradient orb */}
      <div
        style={{
          position: "absolute",
          width: isVertical ? 800 : 900,
          height: isVertical ? 800 : 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.primarySoft} 0%, transparent 70%)`,
          opacity: ringOpacity,
          transform: `scale(${ringScale})`,
        }}
      />

      {/* Floating dots pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          backgroundImage: `radial-gradient(circle, ${theme.primary} 1.5px, transparent 1.5px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div
        style={{
          textAlign: "center",
          maxWidth: isVertical ? 920 : 1400,
          padding: isVertical ? "0 60px" : "0 140px",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36 * sz,
        }}
      >
        {/* Petit badge */}
        <PillBadge frame={frame} fps={fps} sz={sz} />

        {/* Texte principal */}
        <TextReveal
          text="Tu en as marre de te prendre la tête avec tes factures, tes devis ou encore ta comptabilité ?"
          fontSize={isVertical ? 72 : 80}
          highlight={["factures", "devis", "comptabilité"]}
          highlightColor={theme.primary}
          stagger={2}
          fontWeight={800}
          lineHeight={1.15}
          style={{ letterSpacing: "-0.025em" }}
        />

        {/* Réponse */}
        <div
          style={{
            opacity: answerOpacity,
            transform: `translateY(${answerY}px)`,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 48 * sz,
              height: 48 * sz,
              borderRadius: 14,
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(79,70,229,0.3)",
            }}
          >
            <svg
              width={24 * sz}
              height={24 * sz}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 34 * sz,
              fontWeight: 700,
              color: theme.text,
              letterSpacing: "-0.02em",
            }}
          >
            On a la solution.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const PillBadge: React.FC<{ frame: number; fps: number; sz: number }> = ({
  frame,
  fps,
  sz,
}) => {
  const badgeIn = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 140, mass: 0.4 },
    durationInFrames: 18,
  });
  const badgeScale = interpolate(badgeIn, [0, 1], [0.6, 1]);
  const badgeOpacity = badgeIn;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: `${8 * sz}px ${20 * sz}px`,
        background: theme.primarySoft,
        borderRadius: 999,
        fontSize: 16 * sz,
        fontWeight: 700,
        color: theme.primary,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        opacity: badgeOpacity,
        transform: `scale(${badgeScale})`,
      }}
    >
      <span style={{ fontSize: 14 * sz }}>💡</span>
      Freelances & auto-entrepreneurs
    </div>
  );
};
