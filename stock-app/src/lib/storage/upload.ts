import { createClient } from "@/lib/supabase/client";
import { compressImage } from "@/lib/image/compress";

export type PhotoBucket = "product-photos" | "qc-photos";

// Supabase Storage keys reject spaces, accents and many symbols, so we never
// reuse the original filename (e.g. "Capture d'écran ….png" → "Invalid key").
// The key is "<user_id>/<random>.<ext>" — the first segment satisfies the
// storage.objects RLS policy (first path segment == auth.uid()).
function extensionFor(file: File, compressedType: string): string {
  const fromType = compressedType.split("/")[1];
  if (fromType) return fromType.replace(/[^a-z0-9]/gi, "").toLowerCase();
  const fromName = file.name.split(".").pop();
  return (fromName ?? "jpg").replace(/[^a-z0-9]/gi, "").toLowerCase() || "jpg";
}

export async function uploadPhoto(bucket: PhotoBucket, userId: string, file: File) {
  const supabase = createClient();
  const compressed = await compressImage(file);
  const ext = extensionFor(file, compressed.type);
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;

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
