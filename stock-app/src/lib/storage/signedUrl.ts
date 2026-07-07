import { createClient } from "@/lib/supabase/server";
import type { PhotoBucket } from "@/lib/storage/upload";

const SIGNED_URL_TTL_SECONDS = 60 * 60; // 1 hour, plenty for a page render

export async function getSignedPhotoUrl(bucket: PhotoBucket, path: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, SIGNED_URL_TTL_SECONDS);
  if (error) throw error;
  return data.signedUrl;
}

export async function getSignedPhotoUrls(bucket: PhotoBucket, paths: string[]) {
  if (paths.length === 0) return [];
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrls(paths, SIGNED_URL_TTL_SECONDS);
  if (error) throw error;
  return data.map((entry) => entry.signedUrl ?? "");
}
