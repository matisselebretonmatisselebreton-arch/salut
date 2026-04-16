/**
 * Template "Punchy" — montage rapide, couleurs vives, gros texte.
 * Conçu pour TikTok / Reels : capter l'attention en < 1s.
 */
import { AbsoluteFill, Sequence } from "remotion";

import { AnimatedText } from "../components/AnimatedText.js";
import { BenefitList } from "../components/BenefitList.js";
import { PriceTag } from "../components/PriceTag.js";
import { ProductImage } from "../components/ProductImage.js";
import { AdProps, SCENE_FRAMES } from "../schema.js";

export const PunchyTemplate: React.FC<AdProps> = ({
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
    <AbsoluteFill style={{ backgroundColor: colors.secondary }}>
      {/* Image de fond floutée constante */}
      {heroImage ? (
        <AbsoluteFill style={{ opacity: 0.25, filter: "blur(30px)" }}>
          <ProductImage src={heroImage} from={0} duration={SCENE_FRAMES.outro.end} />
        </AbsoluteFill>
      ) : null}

      {/* Scène 1 — Hook */}
      <Sequence from={SCENE_FRAMES.hook.start} durationInFrames={SCENE_FRAMES.hook.end - SCENE_FRAMES.hook.start}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 80,
            backgroundColor: colors.primary,
          }}
        >
          <AnimatedText
            text={hookText}
            from={SCENE_FRAMES.hook.start + 4}
            entrance="scale"
            style={{
              fontSize: 110,
              fontWeight: 900,
              color: "#FFFFFF",
              textAlign: "center",
              lineHeight: 1.05,
              textShadow: `0 8px 0 ${colors.secondary}`,
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scène 2 — Produit + bénéfices */}
      <Sequence from={SCENE_FRAMES.product.start} durationInFrames={SCENE_FRAMES.product.end - SCENE_FRAMES.product.start}>
        <AbsoluteFill style={{ flexDirection: "column", padding: 60 }}>
          {heroImage ? (
            <div style={{ flex: 1.4, borderRadius: 32, overflow: "hidden", marginBottom: 40 }}>
              <ProductImage
                src={heroImage}
                from={SCENE_FRAMES.product.start}
                duration={SCENE_FRAMES.product.end - SCENE_FRAMES.product.start}
                pan="in"
              />
            </div>
          ) : null}
          <div
            style={{
              flex: 1,
              backgroundColor: colors.background,
              borderRadius: 32,
              padding: 40,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <BenefitList
              items={benefits}
              from={SCENE_FRAMES.product.start + 12}
              colors={colors}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scène 3 — Prix + CTA */}
      <Sequence from={SCENE_FRAMES.price.start} durationInFrames={SCENE_FRAMES.price.end - SCENE_FRAMES.price.start}>
        <AbsoluteFill
          style={{
            backgroundColor: colors.background,
            justifyContent: "center",
            alignItems: "center",
            padding: 80,
          }}
        >
          <AnimatedText
            text={productName}
            from={SCENE_FRAMES.price.start + 4}
            entrance="slide-up"
            style={{
              fontSize: 60,
              fontWeight: 800,
              color: colors.foreground,
              marginBottom: 40,
              textAlign: "center",
            }}
          />
          <PriceTag
            priceBefore={priceBefore}
            priceAfter={priceAfter}
            from={SCENE_FRAMES.price.start + 24}
            colors={colors}
          />
          <AnimatedText
            text={ctaText}
            from={SCENE_FRAMES.price.start + 80}
            entrance="scale"
            style={{
              marginTop: 60,
              padding: "28px 60px",
              backgroundColor: colors.primary,
              color: "#FFFFFF",
              fontSize: 48,
              fontWeight: 900,
              borderRadius: 999,
              textTransform: "uppercase",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scène 4 — Outro brand */}
      <Sequence from={SCENE_FRAMES.outro.start} durationInFrames={SCENE_FRAMES.outro.end - SCENE_FRAMES.outro.start}>
        <AbsoluteFill
          style={{
            backgroundColor: colors.secondary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AnimatedText
            text={brandName}
            from={SCENE_FRAMES.outro.start + 4}
            entrance="scale"
            style={{
              fontSize: 130,
              fontWeight: 900,
              color: colors.accent,
              letterSpacing: 4,
            }}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
