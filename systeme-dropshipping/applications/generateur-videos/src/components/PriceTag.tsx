/**
 * Affichage prix barré (avant) + prix promo (après) avec apparition séquentielle.
 */
import { CSSProperties } from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

import { AdColors } from "../schema.js";

export interface PriceTagProps {
  priceBefore: string;
  priceAfter: string;
  /** Frame d'apparition. */
  from: number;
  colors: AdColors;
  style?: CSSProperties;
}

export const PriceTag: React.FC<PriceTagProps> = ({
  priceBefore,
  priceAfter,
  from,
  colors,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < from) return null;

  const local = frame - from;
  const beforeIn = spring({ frame: local, fps, config: { damping: 12 } });
  const afterIn = spring({
    frame: Math.max(0, local - 18),
    fps,
    config: { damping: 10, stiffness: 180 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        ...style,
      }}
    >
      <div
        style={{
          opacity: beforeIn * 0.55,
          transform: `translateY(${(1 - beforeIn) * 30}px)`,
          fontSize: 56,
          color: colors.foreground,
          textDecoration: "line-through",
          fontWeight: 600,
        }}
      >
        {priceBefore}
      </div>
      <div
        style={{
          opacity: afterIn,
          transform: `scale(${0.6 + afterIn * 0.4})`,
          fontSize: 140,
          fontWeight: 900,
          color: colors.primary,
          textShadow: `0 6px 0 ${colors.secondary}`,
          letterSpacing: -2,
        }}
      >
        {priceAfter}
      </div>
    </div>
  );
};
