import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../ui/theme";

export const SceneLogo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const logoIn = spring({ frame, fps, config: { damping: 13, stiffness: 110, mass: 0.7 }, durationInFrames: 25 });
  const logoScale = interpolate(logoIn, [0, 1], [0.4, 1]);
  const logoOpacity = interpolate(logoIn, [0, 1], [0, 1]);
  const logoRotate = interpolate(logoIn, [0, 1], [-30, 0]);

  const taglineIn = spring({ frame: frame - 14, fps, config: { damping: 18, stiffness: 90 }, durationInFrames: 25 });
  const taglineY = interpolate(taglineIn, [0, 1], [30, 0]);
  const taglineOpacity = interpolate(taglineIn, [0, 1], [0, 1]);

  const subIn = spring({ frame: frame - 30, fps, config: { damping: 18, stiffness: 90 }, durationInFrames: 25 });
  const subY = interpolate(subIn, [0, 1], [20, 0]);
  const subOpacity = interpolate(subIn, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${theme.primaryDark} 0%, ${theme.primary} 50%, ${theme.primaryLight} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        padding: isVertical ? "0 60px" : "0 120px",
        gap: 24,
      }}
    >
      {/* Pattern points */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.15,
          backgroundImage: "radial-gradient(circle, #fff 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 22,
          transform: `scale(${logoScale}) rotate(${logoRotate}deg)`,
          opacity: logoOpacity,
        }}
      >
        <div
          style={{
            width: isVertical ? 130 : 140,
            height: isVertical ? 130 : 140,
            background: "#fff",
            borderRadius: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          }}
        >
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
            <path d="M10 9H8" />
          </svg>
        </div>
        <div style={{ color: "#fff", fontSize: isVertical ? 86 : 100, fontWeight: 800, letterSpacing: "-0.03em" }}>
          InvoicePilot
        </div>
      </div>

      {/* Tagline (du site) */}
      <div
        style={{
          color: "#fff",
          fontSize: isVertical ? 64 : 78,
          fontWeight: 800,
          textAlign: "center",
          lineHeight: 1.1,
          letterSpacing: "-0.025em",
          transform: `translateY(${taglineY}px)`,
          opacity: taglineOpacity,
          marginTop: 20,
        }}
      >
        Créez vos factures
        <br />
        en{" "}
        <span
          style={{
            background: theme.accent,
            color: theme.text,
            padding: "0 16px",
            borderRadius: 14,
            display: "inline-block",
            transform: "rotate(-1deg)",
          }}
        >
          30 secondes
        </span>
      </div>

      <div
        style={{
          color: "rgba(255,255,255,0.85)",
          fontSize: isVertical ? 28 : 30,
          fontWeight: 500,
          textAlign: "center",
          maxWidth: 760,
          transform: `translateY(${subY}px)`,
          opacity: subOpacity,
        }}
      >
        Pour les freelances & auto-entrepreneurs français
      </div>
    </AbsoluteFill>
  );
};
