import { AbsoluteFill, Sequence } from "remotion";
import { theme, fontFamily, FPS } from "../ui/theme";
import { SceneHook } from "../scenes/01-Hook";
import { SceneLogo } from "../scenes/02-Logo";
import { SceneCreateInvoice } from "../scenes/03-CreateInvoice";

const s = (sec: number) => Math.round(sec * FPS);

export const MainAd: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: theme.bg,
        fontFamily,
        color: theme.text,
      }}
    >
      <Sequence from={0} durationInFrames={s(3)}>
        <SceneHook />
      </Sequence>

      <Sequence from={s(3)} durationInFrames={s(3)}>
        <SceneLogo />
      </Sequence>

      <Sequence from={s(6)} durationInFrames={s(6)}>
        <SceneCreateInvoice />
      </Sequence>

      {/* Placeholder pour les scènes 4-8 à venir */}
    </AbsoluteFill>
  );
};
