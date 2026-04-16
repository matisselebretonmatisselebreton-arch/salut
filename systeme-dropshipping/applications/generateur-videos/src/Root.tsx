/**
 * Racine Remotion — déclare les compositions disponibles.
 * 2 compositions : 9:16 (TikTok / Reels) et 1:1 (feed Meta).
 *
 * Le template effectif (Punchy / Minimal / UGC) est sélectionné par
 * `templateStyle` dans les props — donc une seule composition par format
 * suffit pour rendre les 3 styles.
 */
import { Composition } from "remotion";

import { MasterAd } from "./compositions/MasterAd.js";
import { DEFAULT_AD_PROPS, FPS, TOTAL_FRAMES, adPropsSchema } from "./schema.js";

export { adPropsSchema, type AdProps } from "./schema.js";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Format vertical 9:16 — TikTok / Reels / Shorts */}
      <Composition
        id="MasterAd-Vertical"
        component={MasterAd}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
        schema={adPropsSchema}
        defaultProps={DEFAULT_AD_PROPS}
      />

      {/* Format carré 1:1 — feed Meta */}
      <Composition
        id="MasterAd-Square"
        component={MasterAd}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1080}
        height={1080}
        schema={adPropsSchema}
        defaultProps={DEFAULT_AD_PROPS}
      />
    </>
  );
};
