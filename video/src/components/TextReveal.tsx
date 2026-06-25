import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  text: string;
  delay?: number;
  stagger?: number;
  fontSize?: number | string;
  fontWeight?: number;
  color?: string;
  lineHeight?: number;
  style?: React.CSSProperties;
  highlight?: string;
  highlightColor?: string;
};

/** Révèle un texte mot par mot avec un effet spring & blur. */
export const TextReveal: React.FC<Props> = ({
  text,
  delay = 0,
  stagger = 3,
  fontSize = 84,
  fontWeight = 800,
  color = "#0F172A",
  lineHeight = 1.05,
  style,
  highlight,
  highlightColor = "#4F46E5",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.25em",
        justifyContent: "center",
        fontSize,
        fontWeight,
        color,
        lineHeight,
        letterSpacing: "-0.02em",
        ...style,
      }}
    >
      {words.map((w, i) => {
        const localFrame = frame - delay - i * stagger;
        const progress = spring({
          frame: localFrame,
          fps,
          config: { damping: 16, stiffness: 120, mass: 0.5 },
          durationInFrames: 20,
        });
        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const translateY = interpolate(progress, [0, 1], [40, 0]);
        const blur = interpolate(progress, [0, 1], [12, 0]);
        const isHi = highlight && w.toLowerCase().includes(highlight.toLowerCase());
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: `translateY(${translateY}px)`,
              opacity,
              filter: `blur(${blur}px)`,
              color: isHi ? highlightColor : "inherit",
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};
