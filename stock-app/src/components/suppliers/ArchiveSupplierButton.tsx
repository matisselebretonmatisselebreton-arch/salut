"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { archiveSupplierAction } from "@/app/(app)/suppliers/actions";

export function ArchiveSupplierButton({ supplierId }: { supplierId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="danger"
      disabled={isPending}
      onClick={() => {
        if (confirm("Archiver ce fournisseur ?")) {
          startTransition(() => archiveSupplierAction(supplierId));
        }
      }}
    >
      Archiver
    </Button>
  );
}
