import imageCompression from "browser-image-compression";

// Keeps photos well under the Supabase Storage free tier quota: resized to a
// reasonable max dimension and compressed before they ever leave the browser.
export async function compressImage(file: File): Promise<File> {
  return imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1600,
    useWebWorker: true,
    initialQuality: 0.8,
  });
}
