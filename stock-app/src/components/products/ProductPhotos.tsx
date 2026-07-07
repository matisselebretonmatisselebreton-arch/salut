"use client";

import { PhotoUploader, type ExistingPhoto } from "@/components/ui/PhotoUploader";
import { addProductImageAction, removeProductImageAction } from "@/app/(app)/products/actions";

export function ProductPhotos({
  productId,
  userId,
  existingPhotos,
  imagePaths,
}: {
  productId: string;
  userId: string;
  existingPhotos: ExistingPhoto[];
  imagePaths: Record<string, string>;
}) {
  return (
    <PhotoUploader
      bucket="product-photos"
      userId={userId}
      existingPhotos={existingPhotos}
      onUpload={(path) => addProductImageAction(productId, path)}
      onRemove={(imageId) => removeProductImageAction(productId, imageId, imagePaths[imageId])}
    />
  );
}
