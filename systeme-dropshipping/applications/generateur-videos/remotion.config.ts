/**
 * Configuration Remotion — chargée automatiquement par le CLI.
 * Doc : https://www.remotion.dev/docs/config
 */
import { Config } from "@remotion/cli/config";

// Qualité encodage par défaut (équilibre taille/qualité pour TikTok/Reels)
Config.setVideoImageFormat("jpeg");
Config.setConcurrency(1);
Config.setOverwriteOutput(true);
Config.setPixelFormat("yuv420p");
Config.setCodec("h264");
// Crf 18 = visuellement sans perte. 23 = défaut raisonnable pour réseaux sociaux.
Config.setCrf(20);

// Dossier de sortie par défaut
Config.setOutputLocation("out/");

// Résolution ESM moderne :
//  - extensionAlias mappe les imports `./foo.js` vers `./foo.ts(x)` (norme TS bundler).
//  - extensions ajoute .ts/.tsx aux résolutions implicites (pour modules/commun).
Config.overrideWebpackConfig((currentConfiguration) => {
  return {
    ...currentConfiguration,
    resolve: {
      ...currentConfiguration.resolve,
      extensionAlias: {
        ".js": [".ts", ".tsx", ".js"],
      },
      extensions: [
        ...(currentConfiguration.resolve?.extensions ?? []),
        ".ts",
        ".tsx",
      ],
    },
  };
});
