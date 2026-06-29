import { Composition } from "remotion";
import { MainAd } from "./compositions/MainAd";
import { FPS, DURATION_FRAMES } from "./ui/theme";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="MainAd-Vertical"
        component={MainAd}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="MainAd-Horizontal"
        component={MainAd}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="MainAd-Square"
        component={MainAd}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={1080}
        height={1080}
      />
    </>
  );
};
