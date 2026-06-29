import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  from?: number;
  to: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
  durationFrames?: number;
};

const fmt = (v: number, decimals: number) =>
  v.toLocaleString("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

export const AnimatedNumber: React.FC<Props> = ({
  from = 0,
  to,
  decimals = 0,
  suffix = "",
  prefix = "",
  delay = 0,
  durationFrames = 30,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 80, mass: 0.6 },
    durationInFrames: durationFrames,
  });
  const value = interpolate(progress, [0, 1], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <span>
      {prefix}
      {fmt(value, decimals)}
      {suffix}
    </span>
  );
};
