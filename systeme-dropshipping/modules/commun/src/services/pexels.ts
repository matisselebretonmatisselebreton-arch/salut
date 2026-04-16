/**
 * Client Pexels API — recherche de vidéos b-roll libres de droits.
 * Utilisé par creative-generator si le produit n'a pas assez d'images
 * propres.
 */
import { fetchJson } from "../utilitaires/http.js";
import { requireEnv } from "../utilitaires/env.js";
import { createLogger } from "../utilitaires/logger.js";

const log = createLogger("pexels");

export interface PexelsConfig {
  apiKey?: string;
}

export interface PexelsVideoFile {
  id: number;
  quality: "hd" | "sd" | "hls" | "uhd" | string;
  file_type: string;
  width: number;
  height: number;
  link: string;
}

export interface PexelsVideo {
  id: number;
  width: number;
  height: number;
  duration: number;
  url: string;
  image: string;
  user: { id: number; name: string; url: string };
  video_files: PexelsVideoFile[];
}

export interface PexelsService {
  searchVideos(options: {
    query: string;
    perPage?: number;
    orientation?: "portrait" | "landscape" | "square";
    size?: "small" | "medium" | "large";
  }): Promise<PexelsVideo[]>;
}

export function createPexelsService(config: PexelsConfig = {}): PexelsService {
  const apiKey = config.apiKey ?? requireEnv("PEXELS_API_KEY");
  const headers = { Authorization: apiKey };

  return {
    async searchVideos({ query, perPage = 10, orientation, size }) {
      const url = new URL("https://api.pexels.com/videos/search");
      url.searchParams.set("query", query);
      url.searchParams.set("per_page", String(perPage));
      if (orientation) url.searchParams.set("orientation", orientation);
      if (size) url.searchParams.set("size", size);

      log.debug({ query, perPage, orientation }, "pexels searchVideos");
      const res = await fetchJson<{ videos: PexelsVideo[] }>(url.toString(), {
        method: "GET",
        headers,
      });
      return res.videos;
    },
  };
}
