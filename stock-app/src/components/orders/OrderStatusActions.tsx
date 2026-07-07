"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { formatEuros } from "@/lib/utils/currency";
import {
  updateOrderStatusAction,
  setShippingActualAction,
  receiveOrderAction,
} from "@/app/(app)/orders/actions";
import type { OrderStatus } from "@/types/database";

export function OrderStatusActions({
  orderId,
  status,
  shippingEstimated,
  shippingActual,
}: {
  orderId: string;
  status: OrderStatus;
  shippingEstimated: number;
  shippingActual: number | null;
}) {
  const [isPending, startTransition] = useTransition();
  const [actual, setActual] = useState(shippingActual?.toString() ?? shippingEstimated.toString());
  const shippingAction = setShippingActualAction.bind(null, orderId);

  return (
    <div className="space-y-4">
      {status === "draft" && (
        <Button
          disabled={isPending}
          onClick={() => startTransition(() => updateOrderStatusAction(orderId, "ordered"))}
        >
          Valider la commande (payée)
        </Button>
      )}

      {(status === "ordered" || status === "at_warehouse") && (
        <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
          <p className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Réévaluation de la livraison France (à l&apos;entrepôt)
          </p>
          <p className="mb-3 text-xs text-zinc-500">
            Estimée à la commande : {formatEuros(shippingEstimated)}
          </p>
          <form action={shippingAction} className="flex gap-2">
            <input
              type="number"
              step="0.01"
              min="0"
              name="shipping_actual"
              value={actual}
              onChange={(e) => setActual(e.target.value)}
              className="w-40 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            />
            <Button type="submit" variant="secondary">
              Enregistrer le prix réel
            </Button>
          </form>
        </div>
      )}

      {(status === "ordered" || status === "at_warehouse") && (
        <Button
          variant="secondary"
          disabled={isPending}
          onClick={() => startTransition(() => updateOrderStatusAction(orderId, "in_transit"))}
        >
          Marquer en transit vers la France
        </Button>
      )}

      {status === "in_transit" && (
        <Button disabled={isPending} onClick={() => startTransition(() => receiveOrderAction(orderId))}>
          Réceptionner (génère les articles)
        </Button>
      )}
    </div>
  );
}
