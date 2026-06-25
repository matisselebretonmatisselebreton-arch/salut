import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Waypoint = { at: number; x: number; y: number; click?: boolean };

type Props = {
  path: Waypoint[];
  size?: number;
  color?: string;
};

/** Curseur animé qui suit une série de waypoints (positions en %) avec clics. */
export const Cursor: React.FC<Props> = ({ path, size = 32, color = "#0F172A" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Trouve les deux waypoints entre lesquels on est
  let prev = path[0];
  let next = path[path.length - 1];
  for (let i = 0; i < path.length - 1; i++) {
    if (frame >= path[i].at && frame <= path[i + 1].at) {
      prev = path[i];
      next = path[i + 1];
      break;
    }
    if (frame > path[i + 1].at) prev = next = path[i + 1];
  }

  const t =
    prev.at === next.at
      ? 1
      : interpolate(frame, [prev.at, next.at], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  const eased = t * t * (3 - 2 * t); // smoothstep

  const x = prev.x + (next.x - prev.x) * eased;
  const y = prev.y + (next.y - prev.y) * eased;

  // Click pulse
  const clickWp = path.find((w) => w.click && Math.abs(w.at - frame) < 8);
  const clickProgress = clickWp
    ? spring({
        frame: frame - clickWp.at,
        fps,
        config: { damping: 12, stiffness: 200, mass: 0.3 },
        durationInFrames: 15,
      })
    : 0;
  const clickScale = clickWp ? 1 - 0.18 * Math.sin(clickProgress * Math.PI) : 1;

  return (
    <>
      {clickWp && clickProgress > 0 && clickProgress < 1 && (
        <div
          style={{
            position: "absolute",
            left: `${x}%`,
            top: `${y}%`,
            width: size * 2.4,
            height: size * 2.4,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: color,
            opacity: 0.18 * (1 - clickProgress),
            scale: `${0.4 + clickProgress * 1.4}`,
            pointerEvents: "none",
          }}
        />
      )}
      <svg
        viewBox="0 0 24 24"
        style={{
          position: "absolute",
          left: `${x}%`,
          top: `${y}%`,
          width: size,
          height: size,
          transform: `translate(-20%, -10%) scale(${clickScale})`,
          filter: "drop-shadow(0 4px 12px rgba(15,23,42,0.25))",
          pointerEvents: "none",
        }}
      >
        <path
          d="M3 2 L3 18 L7.5 14 L10.5 21 L13 20 L10 13 L17 13 Z"
          fill={color}
          stroke="#fff"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};
