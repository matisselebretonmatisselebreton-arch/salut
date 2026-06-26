import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../ui/theme";

/**
 * Scène 5 — 5 s (150 frames).
 * Carousel rapide de 3 features clés, chacune ~50 frames.
 *  0-50    Devis → Facture en 1 clic
 *  50-100  Comptabilité auto (résultat, bilan, FEC)
 *  100-150 Multi-export (PDF, Excel, UBL, FEC)
 */
export const SceneFeatures: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const features = [
    {
      title: "Devis accepté",
      arrow: "→",
      title2: "Facture en 1 clic",
      desc: "Conversion automatique, numérotation, échéances calculées",
      icon: "convert",
      color: theme.primary,
    },
    {
      title: "Comptabilité automatique",
      arrow: "",
      title2: "Résultat • Bilan • FEC",
      desc: "Compte de résultat, bilan simplifié, export FEC conforme",
      icon: "accounting",
      color: theme.success,
    },
    {
      title: "Exports universels",
      arrow: "",
      title2: "PDF • Excel • UBL • FEC",
      desc: "Facturation conforme 2026, intégrations comptables natives",
      icon: "export",
      color: theme.primaryDark,
    },
  ];

  const dur = 50;
  const idx = Math.min(2, Math.floor(frame / dur));
  const localFrame = frame - idx * dur;
  const feature = features[idx];

  const cardIn = spring({ frame: localFrame, fps, config: { damping: 16, stiffness: 110 }, durationInFrames: 20 });
  const cardScale = interpolate(cardIn, [0, 1], [0.88, 1]);
  const cardOpacity = interpolate(localFrame, [0, 8, 42, 50], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${theme.primaryDark} 0%, ${theme.primary} 50%, ${theme.primaryLight} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        padding: "0 40px",
        gap: 28,
      }}
    >
      {/* Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.12,
          backgroundImage: "radial-gradient(circle, #fff 1.5px, transparent 1.5px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Progress dots */}
      <div style={{ display: "flex", gap: 10, zIndex: 5 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: i === idx ? 32 : 10,
              height: 10,
              borderRadius: 5,
              background: i === idx ? "#fff" : "rgba(255,255,255,0.4)",
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>

      {/* Feature card */}
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          padding: isVertical ? "44px 36px" : "52px 48px",
          width: isVertical ? "90%" : "70%",
          maxWidth: 820,
          boxShadow: "0 40px 100px rgba(15,23,42,0.35)",
          transform: `scale(${cardScale})`,
          opacity: cardOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          textAlign: "center",
        }}
      >
        <FeatureIcon kind={feature.icon} color={feature.color} frame={localFrame} />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          {feature.arrow ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                fontSize: isVertical ? 38 : 44,
                fontWeight: 800,
                letterSpacing: "-0.025em",
                color: theme.text,
                lineHeight: 1.05,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <span>{feature.title}</span>
              <span style={{ color: feature.color, fontSize: isVertical ? 44 : 52 }}>{feature.arrow}</span>
              <span style={{ color: feature.color }}>{feature.title2}</span>
            </div>
          ) : (
            <>
              <div
                style={{
                  fontSize: isVertical ? 36 : 42,
                  fontWeight: 800,
                  letterSpacing: "-0.025em",
                  color: theme.text,
                  lineHeight: 1.05,
                }}
              >
                {feature.title}
              </div>
              <div
                style={{
                  fontSize: isVertical ? 30 : 36,
                  fontWeight: 800,
                  color: feature.color,
                  letterSpacing: "-0.02em",
                }}
              >
                {feature.title2}
              </div>
            </>
          )}
        </div>

        <div
          style={{
            fontSize: isVertical ? 22 : 24,
            color: theme.textMuted,
            fontWeight: 500,
            lineHeight: 1.35,
            maxWidth: 640,
          }}
        >
          {feature.desc}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const FeatureIcon: React.FC<{ kind: string; color: string; frame: number }> = ({ kind, color, frame }) => {
  const pulse = spring({ frame, fps: 30, config: { damping: 10, stiffness: 180 }, durationInFrames: 24 });
  return (
    <div
      style={{
        width: 96,
        height: 96,
        borderRadius: 24,
        background: `linear-gradient(135deg, ${color}22 0%, ${color}11 100%)`,
        border: `2px solid ${color}33`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${0.6 + pulse * 0.4})`,
      }}
    >
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {kind === "convert" && (
          <>
            <path d="M4 4h7l3 3h6v3" />
            <path d="M20 14v6H4V7" />
            <path d="M15 12l4 4-4 4" />
            <path d="M19 16H9" />
          </>
        )}
        {kind === "accounting" && (
          <>
            <path d="M3 3v18h18" />
            <path d="M7 14l4-4 3 3 5-7" />
            <circle cx="7" cy="14" r="1.5" fill={color} />
            <circle cx="11" cy="10" r="1.5" fill={color} />
            <circle cx="14" cy="13" r="1.5" fill={color} />
            <circle cx="19" cy="6" r="1.5" fill={color} />
          </>
        )}
        {kind === "export" && (
          <>
            <path d="M12 3v12" />
            <path d="M7 8l5-5 5 5" />
            <path d="M5 15v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
          </>
        )}
      </svg>
    </div>
  );
};
