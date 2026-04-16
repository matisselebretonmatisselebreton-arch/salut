/**
 * Template "Minimal" — typographie épurée, fond clair, animations sobres.
 * Conçu pour les marques premium (beauty, lifestyle, tech haut de gamme).
 */
import { AbsoluteFill, Sequence } from "remotion";

import { AnimatedText } from "../components/AnimatedText.js";
import { BenefitList } from "../components/BenefitList.js";
import { PriceTag } from "../components/PriceTag.js";
import { ProductImage } from "../components/ProductImage.js";
import { AdProps, SCENE_FRAMES } from "../schema.js";

export const MinimalTemplate: React.FC<AdProps> = ({
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
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      {/* Scène 1 — Hook (typographie centrée sur fond uni) */}
      <Sequence from={SCENE_FRAMES.hook.start} durationInFrames={SCENE_FRAMES.hook.end - SCENE_FRAMES.hook.start}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 100,
          }}
        >
          <AnimatedText
            text={hookText}
            from={SCENE_FRAMES.hook.start + 4}
            entrance="fade"
            style={{
              fontSize: 78,
              fontWeight: 300,
              color: colors.foreground,
              textAlign: "center",
              lineHeight: 1.2,
              letterSpacing: -1,
              fontFamily: "serif",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scène 2 — Produit pleine page + bénéfices superposés en bas */}
      <Sequence from={SCENE_FRAMES.product.start} durationInFrames={SCENE_FRAMES.product.end - SCENE_FRAMES.product.start}>
        <AbsoluteFill>
          {heroImage ? (
            <ProductImage
              src={heroImage}
              from={SCENE_FRAMES.product.start}
              duration={SCENE_FRAMES.product.end - SCENE_FRAMES.product.start}
              pan="in"
            />
          ) : null}
          <AbsoluteFill
            style={{
              justifyContent: "flex-end",
              padding: 60,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 50%)",
            }}
          >
            <BenefitList
              items={benefits}
              from={SCENE_FRAMES.product.start + 18}
              colors={{ ...colors, foreground: "#FFFFFF" }}
            />
          </AbsoluteFill>
        </AbsoluteFill>
      </Sequence>

      {/* Scène 3 — Prix sur fond crème */}
      <Sequence from={SCENE_FRAMES.price.start} durationInFrames={SCENE_FRAMES.price.end - SCENE_FRAMES.price.start}>
        <AbsoluteFill
          style={{
            backgroundColor: colors.background,
            justifyContent: "center",
            alignItems: "center",
            padding: 100,
          }}
        >
          <AnimatedText
            text={productName}
            from={SCENE_FRAMES.price.start + 4}
            entrance="fade"
            style={{
              fontSize: 54,
              fontWeight: 400,
              color: colors.foreground,
              fontFamily: "serif",
              fontStyle: "italic",
              marginBottom: 60,
            }}
          />
          <PriceTag
            priceBefore={priceBefore}
            priceAfter={priceAfter}
            from={SCENE_FRAMES.price.start + 18}
            colors={colors}
          />
          <AnimatedText
            text={ctaText}
            from={SCENE_FRAMES.price.start + 80}
            entrance="fade"
            style={{
              marginTop: 80,
              padding: "20px 50px",
              border: `2px solid ${colors.foreground}`,
              color: colors.foreground,
              fontSize: 36,
              fontWeight: 500,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scène 4 — Brand outro minimaliste */}
      <Sequence from={SCENE_FRAMES.outro.start} durationInFrames={SCENE_FRAMES.outro.end - SCENE_FRAMES.outro.start}>
        <AbsoluteFill
          style={{
            backgroundColor: colors.background,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AnimatedText
            text={brandName}
            from={SCENE_FRAMES.outro.start + 4}
            entrance="fade"
            style={{
              fontSize: 90,
              fontWeight: 200,
              color: colors.foreground,
              letterSpacing: 12,
              fontFamily: "serif",
            }}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
