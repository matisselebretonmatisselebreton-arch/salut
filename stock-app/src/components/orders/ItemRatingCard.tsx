"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PhotoUploader, type ExistingPhoto } from "@/components/ui/PhotoUploader";
import { rateItemAction } from "@/app/(app)/orders/actions";
import { addItemImageAction, removeItemImageAction } from "@/app/(app)/stock/actions";

export function ItemRatingCard({
  orderId,
  itemId,
  productName,
  unitNumber,
  rating,
  ratingComment,
  userId,
  existingPhotos,
  imagePaths,
}: {
  orderId: string;
  itemId: string;
  productName: string;
  unitNumber: number;
  rating: number | null;
  ratingComment: string | null;
  userId: string;
  existingPhotos: ExistingPhoto[];
  imagePaths: Record<string, string>;
}) {
  const [value, setValue] = useState<number | null>(rating);
  const [comment, setComment] = useState(ratingComment ?? "");
  const [isPending, startTransition] = useTransition();

  return (
    <Card>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium text-zinc-900 dark:text-zinc-50">
          {productName} — exemplaire #{unitNumber}
        </h3>
      </div>

      <div className="mb-3 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setValue(star === value ? null : star)}
            className={`text-2xl leading-none ${
              value !== null && star <= value ? "text-amber-500" : "text-zinc-300 dark:text-zinc-600"
            }`}
            aria-label={`${star} étoile${star > 1 ? "s" : ""}`}
          >
            ★
          </button>
        ))}
        <span className="ml-2 text-sm text-zinc-500">{value ? `${value}/5` : "Non noté"}</span>
      </div>

      <input
        placeholder="Commentaire sur l'article (état, défaut…)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
      />

      <div className="mt-3">
        <Button
          variant="secondary"
          disabled={isPending}
          onClick={() =>
            startTransition(() => rateItemAction(orderId, itemId, value, comment || null))
          }
        >
          Enregistrer la note
        </Button>
      </div>

      <div className="mt-4">
        <PhotoUploader
          bucket="qc-photos"
          userId={userId}
          existingPhotos={existingPhotos}
          onUpload={(path) => addItemImageAction(itemId, path)}
          onRemove={(imageId) => removeItemImageAction(imageId, imagePaths[imageId])}
        />
      </div>
    </Card>
  );
}
