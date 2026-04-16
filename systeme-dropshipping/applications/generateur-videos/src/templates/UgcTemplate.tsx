/**
 * Template "UGC" — style témoignage authentique avec captions en bas
 * (façon TikTok native), polaroid, fond brut.
 */
import { AbsoluteFill, Sequence } from "remotion";

import { AnimatedText } from "../components/AnimatedText.js";
import { BenefitList } from "../components/BenefitList.js";
import { PriceTag } from "../components/PriceTag.js";
import { ProductImage } from "../components/ProductImage.js";
import { AdProps, SCENE_FRAMES } from "../schema.js";

const captionStyle = (color: string): React.CSSProperties => ({
  fontSize: 56,
  fontWeight: 800,
  color: "#FFFFFF",
  textAlign: "center",
  padding: "16px 28px",
  background: color,
  borderRadius: 12,
  display: "inline-block",
  textShadow: "0 2px 0 rgba(0,0,0,0.4)",
  lineHeight: 1.2,
});

export const UgcTemplate: React.FC<AdProps> = ({
  brandName,
  productName,
  productImages,
  hookText,
  benefits,
  ctaText,
  priceBefore,
  priceAfter,
  colors,
}) => {
  const heroImage = productImages[0] ?? "";

  return (
    <AbsoluteFill style={{ backgroundColor: "#111111" }}>
      {/* Image produit en arrière-plan permanent (style POV) */}
      {heroImage ? (
        <AbsoluteFill style={{ opacity: 0.55 }}>
          <ProductImage
            src={heroImage}
            from={0}
            duration={SCENE_FRAMES.outro.end}
            pan="left"
          />
        </AbsoluteFill>
      ) : null}

      {/* Scène 1 — Caption hook style TikTok */}
      <Sequence from={SCENE_FRAMES.hook.start} durationInFrames={SCENE_FRAMES.hook.end - SCENE_FRAMES.hook.start}>
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            padding: 80,
            paddingBottom: 320,
          }}
        >
          <AnimatedText
            text={hookText}
            from={SCENE_FRAMES.hook.start + 4}
            entrance="slide-up"
            style={captionStyle(colors.primary)}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scène 2 — Polaroid produit + captions bénéfices */}
      <Sequence from={SCENE_FRAMES.product.start} durationInFrames={SCENE_FRAMES.product.end - SCENE_FRAMES.product.start}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 80,
          }}
        >
          {heroImage ? (
            <div
              style={{
                background: "#FFFFFF",
                padding: 24,
                paddingBottom: 80,
                transform: "rotate(-3deg)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
                marginBottom: 60,
              }}
            >
              <div style={{ width: 720, height: 720, overflow: "hidden" }}>
                <ProductImage
                  src={heroImage}
                  from={SCENE_FRAMES.product.start}
                  duration={SCENE_FRAMES.product.end - SCENE_FRAMES.product.start}
                  pan="in"
                />
              </div>
            </div>
          ) : null}
          <BenefitList
            items={benefits}
            from={SCENE_FRAMES.product.start + 24}
            colors={{ ...colors, foreground: "#FFFFFF", accent: colors.primary }}
            style={{ width: "100%", maxWidth: 800 }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scène 3 — Caption prix + CTA */}
      <Sequence from={SCENE_FRAMES.price.start} durationInFrames={SCENE_FRAMES.price.end - SCENE_FRAMES.price.start}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 60,
            backgroundColor: "rgba(0,0,0,0.55)",
          }}
        >
          <AnimatedText
            text={productName}
            from={SCENE_FRAMES.price.start + 4}
            entrance="slide-up"
            style={{ ...captionStyle(colors.secondary), marginBottom: 40 }}
          />
          <PriceTag
            priceBefore={priceBefore}
            priceAfter={priceAfter}
            from={SCENE_FRAMES.price.start + 20}
            colors={{ ...colors, foreground: "#FFFFFF" }}
          />
          <AnimatedText
            text={ctaText}
            from={SCENE_FRAMES.price.start + 80}
            entrance="scale"
            style={{ ...captionStyle(colors.accent), marginTop: 60, color: colors.secondary }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scène 4 — Brand handle (style @brand) */}
      <Sequence from={SCENE_FRAMES.outro.start} durationInFrames={SCENE_FRAMES.outro.end - SCENE_FRAMES.outro.start}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.secondary,
          }}
        >
          <AnimatedText
            text={`@${brandName.toLowerCase().replace(/\s+/g, "")}`}
            from={SCENE_FRAMES.outro.start + 4}
            entrance="slide-up"
            style={{
              fontSize: 100,
              fontWeight: 800,
              color: colors.accent,
            }}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
