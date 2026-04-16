/**
 * Texte animé : fade + slide + scale au frame d'entrée, fade-out au frame de sortie.
 */
import { CSSProperties } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface AnimatedTextProps {
  text: string;
  /** Frame à partir duquel commence l'animation (absolu dans la composition). */
  from: number;
  /** Frame à partir duquel le texte disparaît. Si omis : reste affiché. */
  until?: number;
  style?: CSSProperties;
  className?: string;
  /** `slide-up` par défaut, `scale` plus punchy, `fade` plus sobre. */
  entrance?: "slide-up" | "scale" | "fade";
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  from,
  until,
  style,
  className,
  entrance = "slide-up",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < from) return null;

  const progress = spring({
    frame: frame - from,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.9 },
  });

  const exitOpacity =
    until !== undefined
      ? interpolate(frame, [until - 10, until], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  const transform = (() => {
    if (entrance === "scale") {
      return `scale(${interpolate(progress, [0, 1], [0.6, 1])})`;
    }
    if (entrance === "slide-up") {
      return `translateY(${interpolate(progress, [0, 1], [60, 0])}px)`;
    }
    return "none";
  })();

  const opacity = interpolate(progress, [0, 1], [0, 1]) * exitOpacity;

  return (
    <div
      className={className}
      style={{
        opacity,
        transform,
        ...style,
      }}
    >
      {text}
    </div>
  );
};
