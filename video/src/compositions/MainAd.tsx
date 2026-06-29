import { AbsoluteFill, Sequence } from "remotion";
import { theme, fontFamily, FPS } from "../ui/theme";
import { SceneHook } from "../scenes/01-Hook";
import { SceneLogo } from "../scenes/02-Logo";
import { SceneCreateInvoice } from "../scenes/03-CreateInvoice";
import { SceneDevisDemo } from "../scenes/04-DevisDemo";
import { SceneDashboard } from "../scenes/05-Dashboard";
import { ScenePricing } from "../scenes/06-Pricing";
import { SceneComptaUrssaf } from "../scenes/07-ComptaUrssaf";
import { SceneCTA } from "../scenes/08-CTA";

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
      {/* 1. Hook — 3s */}
      <Sequence from={0} durationInFrames={s(3)}>
        <SceneHook />
      </Sequence>

      {/* 2. Logo + tagline — 3s */}
      <Sequence from={s(3)} durationInFrames={s(3)}>
        <SceneLogo />
      </Sequence>

      {/* 3. Création facture avec chrono — 14s */}
      <Sequence from={s(6)} durationInFrames={s(14)}>
        <SceneCreateInvoice />
      </Sequence>

      {/* 4. Devis → Facture — 8s */}
      <Sequence from={s(20)} durationInFrames={s(8)}>
        <SceneDevisDemo />
      </Sequence>

      {/* 5. Dashboard — 6s */}
      <Sequence from={s(28)} durationInFrames={s(6)}>
        <SceneDashboard />
      </Sequence>

      {/* 6. Tarifs — 6s (AVANT compta, car compta = Pro) */}
      <Sequence from={s(34)} durationInFrames={s(6)}>
        <ScenePricing />
      </Sequence>

      {/* 7. Comptabilité + URSSAF — 8s */}
      <Sequence from={s(40)} durationInFrames={s(8)}>
        <SceneComptaUrssaf />
      </Sequence>

      {/* 8. CTA finale — 4s */}
      <Sequence from={s(48)} durationInFrames={s(4)}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
