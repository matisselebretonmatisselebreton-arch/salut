import { createClient } from "@/lib/supabase/client";
import { compressImage } from "@/lib/image/compress";

export type PhotoBucket = "product-photos" | "qc-photos";

// Buckets are private; objects live under "<user_id>/<random>-<filename>" so
// the storage.objects RLS policy (first path segment == auth.uid()) applies.
export async function uploadPhoto(bucket: PhotoBucket, userId: string, file: File) {
  const supabase = createClient();
  const compressed = await compressImage(file);
  const path = `${userId}/${crypto.randomUUID()}-${file.name}`;

  const { error } = await supabase.storage.from(bucket).upload(path, compressed, {
    contentType: compressed.type,
  });
  if (error) throw error;

  return path;
}

export async function deletePhoto(bucket: PhotoBucket, path: string) {
  const supabase = createClient();
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
}
