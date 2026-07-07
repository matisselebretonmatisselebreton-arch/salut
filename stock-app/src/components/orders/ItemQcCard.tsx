"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, QC_STATUS_BADGE } from "@/components/ui/Badge";
import { PhotoUploader, type ExistingPhoto } from "@/components/ui/PhotoUploader";
import {
  updateItemQcAction,
  addItemImageAction,
  removeItemImageAction,
} from "@/app/(app)/orders/actions";
import type { QcStatus } from "@/types/database";

export function ItemQcCard({
  orderId,
  itemId,
  productName,
  unitNumber,
  qcStatus,
  qcNotes,
  userId,
  existingPhotos,
  imagePaths,
}: {
  orderId: string;
  itemId: string;
  productName: string;
  unitNumber: number;
  qcStatus: QcStatus;
  qcNotes: string | null;
  userId: string;
  existingPhotos: ExistingPhoto[];
  imagePaths: Record<string, string>;
}) {
  const [status, setStatus] = useState<QcStatus>(qcStatus);
  const [notes, setNotes] = useState(qcNotes ?? "");
  const [isPending, startTransition] = useTransition();
  const badge = QC_STATUS_BADGE[status];

  return (
    <Card>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium text-zinc-900 dark:text-zinc-50">
          {productName} — exemplaire #{unitNumber}
        </h3>
        <Badge color={badge.color}>{badge.label}</Badge>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as QcStatus)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        >
          <option value="pending">À contrôler</option>
          <option value="conforming">Conforme</option>
          <option value="minor_defect">Défaut mineur</option>
          <option value="rejected">Refusé</option>
          <option value="to_return">À retourner</option>
        </select>
        <input
          placeholder="Commentaire qualité"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <div className="mt-3">
        <Button
          variant="secondary"
          disabled={isPending}
          onClick={() =>
            startTransition(() => updateItemQcAction(orderId, itemId, status, notes || null))
          }
        >
          Enregistrer le contrôle
        </Button>
      </div>

      <div className="mt-4">
        <PhotoUploader
          bucket="qc-photos"
          userId={userId}
          existingPhotos={existingPhotos}
          onUpload={(path) => addItemImageAction(orderId, itemId, path)}
          onRemove={(imageId) => removeItemImageAction(orderId, imageId, imagePaths[imageId])}
        />
      </div>
    </Card>
  );
}
