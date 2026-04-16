/**
 * Image produit avec effet "Ken Burns" (zoom lent + léger pan).
 */
import { CSSProperties } from "react";
import { Img, interpolate, useCurrentFrame } from "remotion";

export interface ProductImageProps {
  src: string;
  /** Frame d'entrée dans la composition. */
  from: number;
  /** Durée de la séquence (en frames). */
  duration: number;
  /** Direction du Ken Burns. */
  pan?: "in" | "out" | "left" | "right";
  style?: CSSProperties;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  from,
  duration,
  pan = "in",
  style,
}) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, Math.min(duration, frame - from));
  const t = local / duration;

  const scale = (() => {
    if (pan === "in") return interpolate(t, [0, 1], [1.0, 1.15]);
    if (pan === "out") return interpolate(t, [0, 1], [1.2, 1.0]);
    return 1.1;
  })();

  const translateX = (() => {
    if (pan === "left") return interpolate(t, [0, 1], [40, -40]);
    if (pan === "right") return interpolate(t, [0, 1], [-40, 40]);
    return 0;
  })();

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        ...style,
      }}
    >
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translateX(${translateX}px)`,
          transition: "none",
        }}
      />
    </div>
  );
};
