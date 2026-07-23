import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // AssetFlow is bilingual (FR/EN). Locale is resolved at runtime by i18next
  // (cookie + Accept-Language), so we do NOT use Next's built-in i18n routing.
  reactStrictMode: true,
};

export default nextConfig;
