"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { formatEuros } from "@/lib/utils/currency";
import {
  listForSaleAction,
  sellItemAction,
  unlistAction,
  cancelSaleAction,
} from "@/app/(app)/stock/actions";
import type { Item } from "@/types/database";

export function ItemSaleForm({ item }: { item: Item }) {
  const [isPending, startTransition] = useTransition();
  const [soldPrice, setSoldPrice] = useState(
    (item.sold_price ?? item.asking_price ?? "").toString()
  );
  const [vintedFee, setVintedFee] = useState(item.vinted_fee.toString());

  const listAction = listForSaleAction.bind(null, item.id);
  const sellAction = sellItemAction.bind(null, item.id);

  const cost = item.purchase_price + item.shipping_cost_in;

  // Sold: summary + net margin.
  if (item.stock_status === "sold") {
    return (
      <div className="space-y-3 text-sm">
        <p className="text-zinc-700 dark:text-zinc-300">
          Vendu le {item.sale_date} {item.sale_channel && `via ${item.sale_channel}`} —{" "}
          {formatEuros(item.sold_price)} (frais {formatEuros(item.vinted_fee)})
        </p>
        <p className="font-medium text-zinc-900 dark:text-zinc-50">
          Marge nette : {formatEuros(item.margin)}
        </p>
        <Button
          variant="secondary"
          disabled={isPending}
          onClick={() => startTransition(() => cancelSaleAction(item.id))}
        >
          Annuler la vente
        </Button>
      </div>
    );
  }

  // For sale: enter final sale + Vinted fee.
  if (item.stock_status === "for_sale") {
    const previewMargin =
      soldPrice === "" ? null : Number(soldPrice) - cost - Number(vintedFee || 0);
    return (
      <div className="space-y-4">
        <p className="text-sm text-zinc-500">
          En vente {item.sale_channel && `sur ${item.sale_channel}`} au prix demandé{" "}
          <span className="font-medium text-zinc-900 dark:text-zinc-50">
            {formatEuros(item.asking_price)}
          </span>
        </p>
        <form action={sellAction} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              id="sold_price"
              name="sold_price"
              label="Prix final encaissé (€)"
              type="number"
              step="0.01"
              min="0"
              required
              value={soldPrice}
              onChange={(e) => setSoldPrice(e.target.value)}
            />
            <Input
              id="vinted_fee"
              name="vinted_fee"
              label="Frais Vinted (€)"
              type="number"
              step="0.01"
              min="0"
              value={vintedFee}
              onChange={(e) => setVintedFee(e.target.value)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              id="sale_channel"
              name="sale_channel"
              label="Canal"
              defaultValue={item.sale_channel ?? "Vinted"}
            />
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
            <p className="text-sm text-zinc-500">
              Marge nette estimée :{" "}
              <span className="font-medium text-zinc-900 dark:text-zinc-50">
                {formatEuros(previewMargin)}
              </span>
            </p>
          )}
          <div className="flex gap-2">
            <Button type="submit">Marquer comme vendu</Button>
            <Button
              type="button"
              variant="secondary"
              disabled={isPending}
              onClick={() => startTransition(() => unlistAction(item.id))}
            >
              Retirer de la vente
            </Button>
          </div>
        </form>
      </div>
    );
  }

  // Received: put up for sale.
  return (
    <form action={listAction} className="space-y-4">
      <p className="text-sm text-zinc-500">Coût de revient : {formatEuros(cost)}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="asking_price"
          name="asking_price"
          label="Prix demandé (€)"
          type="number"
          step="0.01"
          min="0"
          required
          defaultValue={item.asking_price ?? ""}
        />
        <Input id="sale_channel" name="sale_channel" label="Canal" defaultValue="Vinted" />
      </div>
      <Button type="submit">Mettre en vente</Button>
    </form>
  );
}
