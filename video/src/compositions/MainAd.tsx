import { AbsoluteFill, Sequence } from "remotion";
import { theme, fontFamily, FPS } from "../ui/theme";
import { SceneHook } from "../scenes/01-Hook";
import { SceneLogo } from "../scenes/02-Logo";
import { SceneCreateInvoice } from "../scenes/03-CreateInvoice";
import { SceneDashboard } from "../scenes/04-Dashboard";
import { SceneFeatures } from "../scenes/05-Features";
import { SceneDifferenciateurs } from "../scenes/06-Differenciateurs";
import { SceneCTA } from "../scenes/07-CTA";

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

      <Sequence from={s(6)} durationInFrames={s(14)}>
        <SceneCreateInvoice />
      </Sequence>

      <Sequence from={s(20)} durationInFrames={s(5)}>
        <SceneDashboard />
      </Sequence>

      <Sequence from={s(25)} durationInFrames={s(5)}>
        <SceneFeatures />
      </Sequence>

      <Sequence from={s(30)} durationInFrames={s(4)}>
        <SceneDifferenciateurs />
      </Sequence>

      <Sequence from={s(34)} durationInFrames={s(4)}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
