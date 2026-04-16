/**
 * Composition unique qui sélectionne le template (Punchy / Minimal / UGC)
 * en fonction de `templateStyle` dans les props.
 *
 * Branche également la musique de fond et la voix off via BackgroundAudio.
 */
import { AbsoluteFill } from "remotion";

import { BackgroundAudio } from "../components/BackgroundAudio.js";
import { MinimalTemplate } from "../templates/MinimalTemplate.js";
import { PunchyTemplate } from "../templates/PunchyTemplate.js";
import { UgcTemplate } from "../templates/UgcTemplate.js";
import { AdProps } from "../schema.js";

export const MasterAd: React.FC<AdProps> = (props) => {
  const Template = (() => {
    switch (props.templateStyle) {
      case "minimal":
        return MinimalTemplate;
      case "ugc":
        return UgcTemplate;
      case "punchy":
      default:
        return PunchyTemplate;
    }
  })();

  return (
    <AbsoluteFill>
      <Template {...props} />
      <BackgroundAudio
        musicUrl={props.musicUrl}
        voiceOverUrl={props.voiceOverUrl}
      />
    </AbsoluteFill>
  );
};
