"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { formatEuros } from "@/lib/utils/currency";
import { unsellItemAction } from "@/app/(app)/stock/actions";
import type { Item } from "@/types/database";

export function SellItemForm({
  item,
  action,
}: {
  item: Item;
  action: (formData: FormData) => void;
}) {
  const [resalePrice, setResalePrice] = useState(item.resale_price?.toString() ?? "");
  const [shippingOut, setShippingOut] = useState(item.shipping_cost_out.toString());
  const [isPending, startTransition] = useTransition();

  const previewMargin =
    resalePrice === ""
      ? null
      : Number(resalePrice) - item.purchase_price - item.shipping_cost_in - Number(shippingOut || 0);

  if (item.stock_status === "sold") {
    return (
      <div className="space-y-3 text-sm">
        <p className="text-zinc-700 dark:text-zinc-300">
          Vendu le {item.sale_date} {item.sale_channel && `via ${item.sale_channel}`} pour{" "}
          {formatEuros(item.resale_price)}.
        </p>
        <p className="font-medium text-zinc-900 dark:text-zinc-50">
          Marge réalisée : {formatEuros(item.margin)}
        </p>
        <Button
          variant="secondary"
          disabled={isPending}
          onClick={() => startTransition(() => unsellItemAction(item.id))}
        >
          Annuler la vente
        </Button>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="resale_price"
          name="resale_price"
          label="Prix de revente (€)"
          type="number"
          step="0.01"
          min="0"
          required
          value={resalePrice}
          onChange={(e) => setResalePrice(e.target.value)}
        />
        <Input
          id="shipping_cost_out"
          name="shipping_cost_out"
          label="Frais de livraison moi → client (€)"
          type="number"
          step="0.01"
          min="0"
          value={shippingOut}
          onChange={(e) => setShippingOut(e.target.value)}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input id="sale_channel" name="sale_channel" label="Canal de vente" placeholder="Vinted, Leboncoin…" />
        <Input
          id="sale_date"
          name="sale_date"
          label="Date de vente"
          type="date"
          required
          defaultValue={new Date().toISOString().slice(0, 10)}
        />
      </div>
      {previewMargin !== null && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Marge estimée : <span className="font-medium text-zinc-900 dark:text-zinc-50">{formatEuros(previewMargin)}</span>
        </p>
      )}
      <Button type="submit">Marquer comme vendu</Button>
    </form>
  );
}
