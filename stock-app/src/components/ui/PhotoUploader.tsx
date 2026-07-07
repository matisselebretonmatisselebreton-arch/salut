"use client";

import { useRef, useState, useTransition } from "react";
import type { PhotoBucket } from "@/lib/storage/upload";
import { uploadPhoto } from "@/lib/storage/upload";
import { Button } from "@/components/ui/Button";

export interface ExistingPhoto {
  id: string;
  url: string;
}

interface PhotoUploaderProps {
  bucket: PhotoBucket;
  userId: string;
  existingPhotos: ExistingPhoto[];
  onUpload: (storagePath: string) => Promise<void>;
  onRemove: (imageId: string) => Promise<void>;
}

// Drag & drop or click-to-select multi-photo upload. Compression happens in
// the browser (see lib/image/compress.ts) before the file ever reaches
// Supabase Storage, so the free tier quota doesn't get eaten by raw phone photos.
export function PhotoUploader({ bucket, userId, existingPhotos, onUpload, onRemove }: PhotoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, startUploading] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);

    startUploading(async () => {
      try {
        for (const file of Array.from(files)) {
          const path = await uploadPhoto(bucket, userId, file);
          await onUpload(path);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Échec de l'upload de la photo.");
      }
    });
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center text-sm transition-colors ${
          isDragging
            ? "border-zinc-500 bg-zinc-50 dark:bg-zinc-800"
            : "border-zinc-300 dark:border-zinc-700"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <p className="text-zinc-500 dark:text-zinc-400">
          {isUploading ? "Envoi en cours…" : "Glisser-déposer des photos, ou cliquer pour choisir"}
        </p>
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {existingPhotos.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {existingPhotos.map((photo) => (
            <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="h-full w-full object-cover" />
              <Button
                type="button"
                variant="danger"
                className="absolute right-1 top-1 !px-2 !py-1 text-xs opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => onRemove(photo.id)}
              >
                ✕
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
