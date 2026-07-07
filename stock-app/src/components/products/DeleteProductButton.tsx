"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { deleteProductAction } from "@/app/(app)/products/actions";

export function DeleteProductButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      variant="danger"
      disabled={isPending}
      onClick={() => {
        if (confirm("Supprimer ce produit du catalogue ?")) {
          startTransition(() => deleteProductAction(productId));
        }
      }}
    >
      Supprimer
    </Button>
  );
}
