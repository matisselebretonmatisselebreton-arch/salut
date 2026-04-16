/**
 * Racine Remotion — déclare toutes les compositions disponibles.
 * Les templates concrets (Punchy/Minimal/UGC) seront branchés à l'étape 4.
 */
import { Composition } from "remotion";
import { z } from "zod";

// Schéma de props partagé par tous les templates (étape 4 complètera).
export const adPropsSchema = z.object({
  productName: z.string().default("Produit"),
  productImages: z.array(z.string().url()).default([]),
  hookText: z.string().default("Le produit qui change tout"),
  benefits: z.array(z.string()).default([]),
  priceBefore: z.string().default("39,99 €"),
  priceAfter: z.string().default("19,99 €"),
  templateStyle: z.enum(["punchy", "minimal", "ugc"]).default("punchy"),
  language: z.enum(["fr", "en"]).default("fr"),
  voiceOverUrl: z.string().url().nullable().default(null),
  musicUrl: z.string().default("/music/upbeat-1.mp3"),
  colors: z
    .object({
      primary: z.string().default("#FF3366"),
      secondary: z.string().default("#0F172A"),
      accent: z.string().default("#FACC15"),
      background: z.string().default("#FFFFFF"),
    })
    .default({}),
});

export type AdProps = z.infer<typeof adPropsSchema>;

// Placeholder provisoire — remplacé par MasterAd à l'étape 4.
const PlaceholderAd: React.FC<AdProps> = ({ productName, hookText }) => {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#0F172A",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        textAlign: "center",
        padding: 40,
      }}
    >
      <div style={{ fontSize: 80, fontWeight: 900 }}>{hookText}</div>
      <div style={{ fontSize: 40, opacity: 0.7, marginTop: 40 }}>
        {productName}
      </div>
      <div style={{ fontSize: 24, opacity: 0.4, marginTop: 80 }}>
        (Template branché à l'étape 4)
      </div>
    </div>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Format vertical 9:16 (TikTok / Reels / Shorts) */}
      <Composition
        id="MasterAd-Vertical"
        component={PlaceholderAd}
        durationInFrames={30 * 30} // 30s à 30fps
        fps={30}
        width={1080}
        height={1920}
        schema={adPropsSchema}
        defaultProps={{
          productName: "Produit",
          productImages: [],
          hookText: "Le produit qui change tout",
          benefits: [],
          priceBefore: "39,99 €",
          priceAfter: "19,99 €",
          templateStyle: "punchy" as const,
          language: "fr" as const,
          voiceOverUrl: null,
          musicUrl: "/music/upbeat-1.mp3",
          colors: {
            primary: "#FF3366",
            secondary: "#0F172A",
            accent: "#FACC15",
            background: "#FFFFFF",
          },
        }}
      />

      {/* Format carré 1:1 (feed Meta) */}
      <Composition
        id="MasterAd-Square"
        component={PlaceholderAd}
        durationInFrames={30 * 30}
        fps={30}
        width={1080}
        height={1080}
        schema={adPropsSchema}
        defaultProps={{
          productName: "Produit",
          productImages: [],
          hookText: "Le produit qui change tout",
          benefits: [],
          priceBefore: "39,99 €",
          priceAfter: "19,99 €",
          templateStyle: "punchy" as const,
          language: "fr" as const,
          voiceOverUrl: null,
          musicUrl: "/music/upbeat-1.mp3",
          colors: {
            primary: "#FF3366",
            secondary: "#0F172A",
            accent: "#FACC15",
            background: "#FFFFFF",
          },
        }}
      />
    </>
  );
};
