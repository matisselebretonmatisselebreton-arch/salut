"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { deleteOrderAction } from "@/app/(app)/orders/actions";

export function DeleteOrderButton({ orderId }: { orderId: string }) {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      variant="danger"
      disabled={isPending}
      onClick={() => {
        if (confirm("Supprimer cette commande et ses articles ?")) {
          startTransition(() => deleteOrderAction(orderId));
        }
      }}
    >
      Supprimer
    </Button>
  );
}
