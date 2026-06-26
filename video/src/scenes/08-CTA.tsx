import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../ui/theme";

/**
 * Scène 8 — 4 s (120 frames).
 * CTA finale : logo + tagline + bouton + URL.
 */
export const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const logoIn = spring({ frame, fps, config: { damping: 13, stiffness: 110, mass: 0.7 }, durationInFrames: 22 });
  const logoScale = interpolate(logoIn, [0, 1], [0.5, 1]);
  const logoOpacity = logoIn;

  const tagIn = spring({ frame: frame - 12, fps, config: { damping: 18, stiffness: 90 }, durationInFrames: 22 });
  const tagY = interpolate(tagIn, [0, 1], [24, 0]);

  const ctaIn = spring({ frame: frame - 26, fps, config: { damping: 12, stiffness: 130 }, durationInFrames: 24 });
  const ctaScale = interpolate(ctaIn, [0, 1], [0.7, 1]);

  const urlIn = spring({ frame: frame - 40, fps, config: { damping: 18, stiffness: 100 }, durationInFrames: 20 });
  const urlY = interpolate(urlIn, [0, 1], [16, 0]);

  // Pulse continu du bouton après son apparition
  const pulse = 1 + 0.04 * Math.sin(((frame - 50) / 8) * Math.PI);
  const buttonScale = frame > 50 ? ctaScale * pulse : ctaScale;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${theme.primaryDark} 0%, ${theme.primary} 50%, ${theme.primaryLight} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        padding: isVertical ? "0 50px" : "0 100px",
        gap: 28,
      }}
    >
      {/* Pattern */}
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
          gap: 18,
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
        }}
      >
        <div
          style={{
            width: isVertical ? 86 : 96,
            height: isVertical ? 86 : 96,
            background: "#fff",
            borderRadius: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
          }}
        >
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
            <path d="M10 9H8" />
          </svg>
        </div>
        <div style={{ color: "#fff", fontSize: isVertical ? 60 : 70, fontWeight: 800, letterSpacing: "-0.03em" }}>
          InvoicePilot
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          color: "#fff",
          fontSize: isVertical ? 44 : 50,
          fontWeight: 800,
          textAlign: "center",
          lineHeight: 1.1,
          letterSpacing: "-0.025em",
          transform: `translateY(${tagY}px)`,
          opacity: tagIn,
          maxWidth: 900,
        }}
      >
        Commencez{" "}
        <span
          style={{
            background: theme.accent,
            color: theme.text,
            padding: "0 14px",
            borderRadius: 12,
            display: "inline-block",
            transform: "rotate(-1deg)",
          }}
        >
          gratuitement
        </span>
        <br />
        en moins de 2 minutes
      </div>

      {/* CTA Button */}
      <div
        style={{
          background: "#fff",
          color: theme.primary,
          fontSize: isVertical ? 32 : 36,
          fontWeight: 800,
          padding: isVertical ? "20px 44px" : "22px 56px",
          borderRadius: 100,
          boxShadow: "0 20px 60px rgba(0,0,0,0.35), 0 0 0 6px rgba(255,255,255,0.18)",
          transform: `scale(${buttonScale})`,
          opacity: ctaIn,
          letterSpacing: "-0.02em",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        Essayer InvoicePilot
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>

      {/* URL */}
      <div
        style={{
          color: "rgba(255,255,255,0.95)",
          fontSize: isVertical ? 24 : 26,
          fontWeight: 700,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          letterSpacing: "0.02em",
          transform: `translateY(${urlY}px)`,
          opacity: urlIn,
          marginTop: 4,
        }}
      >
        invoicepilot.fr
      </div>
    </AbsoluteFill>
  );
};
