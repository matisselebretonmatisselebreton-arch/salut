import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fontFamily } from "../ui/theme";
import { TextReveal } from "../components/TextReveal";

export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  // background pulse + zoom
  const bgPulse = spring({ frame, fps, config: { damping: 14, stiffness: 60 }, durationInFrames: 30 });
  const bgScale = interpolate(bgPulse, [0, 1], [1.05, 1]);

  // Glitch on existing tools (60-75 frames)
  const glitch = Math.sin(frame * 1.2) * (frame > 50 && frame < 75 ? 8 : 0);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 40%, ${theme.primarySoft} 0%, ${theme.bg} 70%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        transform: `scale(${bgScale})`,
        padding: isVertical ? "0 60px" : "0 120px",
      }}
    >
      {/* Floating crossed-out icons */}
      <div style={{ position: "absolute", top: "18%", left: "12%", opacity: 0.4, transform: `translate(${glitch}px, 0)` }}>
        <CrossedTool label="Word" emoji="📄" />
      </div>
      <div style={{ position: "absolute", top: "20%", right: "10%", opacity: 0.4, transform: `translate(${-glitch}px, 0)` }}>
        <CrossedTool label="Excel" emoji="📊" />
      </div>
      <div style={{ position: "absolute", bottom: "20%", left: "14%", opacity: 0.4, transform: `translate(${glitch / 2}px, 0)` }}>
        <CrossedTool label="Post-it" emoji="📝" />
      </div>

      <div style={{ textAlign: "center", maxWidth: 900, zIndex: 2 }}>
        <TextReveal
          text="Tu factures encore sur Word ?"
          fontSize={isVertical ? 92 : 110}
          highlight="Word"
          highlightColor={theme.danger}
          stagger={4}
        />
        <div style={{ marginTop: 28, opacity: interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp" }) }}>
          <span style={{
            display: "inline-block",
            padding: "10px 22px",
            background: theme.text,
            color: "#fff",
            borderRadius: 999,
            fontSize: isVertical ? 26 : 28,
            fontWeight: 700,
            letterSpacing: "-0.01em",
          }}>
            🛑 Il existe 100× mieux.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const CrossedTool: React.FC<{ label: string; emoji: string }> = ({ label, emoji }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
      fontSize: 14,
      fontWeight: 600,
      color: theme.textMuted,
    }}
  >
    <div style={{ position: "relative", fontSize: 64 }}>
      {emoji}
      <div style={{ position: "absolute", top: "50%", left: "-10%", width: "120%", height: 4, background: theme.danger, transform: "rotate(-20deg)", borderRadius: 4 }} />
    </div>
    {label}
  </div>
);
