/**
 * Liste de bénéfices avec apparition staggerée (un par un).
 */
import { CSSProperties } from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

import { AdColors } from "../schema.js";

export interface BenefitListProps {
  items: string[];
  /** Frame d'apparition du 1er item. */
  from: number;
  /** Délai entre chaque item (en frames). */
  staggerFrames?: number;
  colors: AdColors;
  style?: CSSProperties;
}

export const BenefitList: React.FC<BenefitListProps> = ({
  items,
  from,
  staggerFrames = 12,
  colors,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 18,
        ...style,
      }}
    >
      {items.map((item, idx) => {
        const itemFrom = from + idx * staggerFrames;
        const local = frame - itemFrom;
        const progress = spring({
          frame: Math.max(0, local),
          fps,
          config: { damping: 14, stiffness: 140 },
        });
        const opacity = progress;
        const translateX = (1 - progress) * 40;
        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            style={{
              opacity,
              transform: `translateX(${translateX}px)`,
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontSize: 38,
              fontWeight: 600,
              color: colors.foreground,
            }}
          >
            <span
              style={{
                width: 38,
                height: 38,
                borderRadius: 999,
                backgroundColor: colors.accent,
                color: colors.secondary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                flexShrink: 0,
              }}
            >
              ✓
            </span>
            <span>{item}</span>
          </div>
        );
      })}
    </div>
  );
};
