"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { addToCartAction } from "@/app/(app)/cart/actions";

export function AddToCartButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);

  return (
    <Button
      variant="primary"
      className="flex-1"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await addToCartAction(productId);
          setAdded(true);
          setTimeout(() => setAdded(false), 1500);
        })
      }
    >
      {added ? "✓ Ajouté" : "Ajouter au panier"}
    </Button>
  );
}
