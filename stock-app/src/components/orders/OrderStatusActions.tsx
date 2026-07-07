"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { updateOrderStatusAction, receiveOrderAction } from "@/app/(app)/orders/actions";
import type { OrderStatus } from "@/types/database";

export function OrderStatusActions({ orderId, status }: { orderId: string; status: OrderStatus }) {
  const [isPending, startTransition] = useTransition();

  if (status === "ordered") {
    return (
      <Button
        disabled={isPending}
        onClick={() => startTransition(() => updateOrderStatusAction(orderId, "in_transit"))}
      >
        Marquer en transit
      </Button>
    );
  }

  if (status === "in_transit") {
    return (
      <Button disabled={isPending} onClick={() => startTransition(() => receiveOrderAction(orderId))}>
        Marquer reçue (génère les exemplaires)
      </Button>
    );
  }

  return null;
}
