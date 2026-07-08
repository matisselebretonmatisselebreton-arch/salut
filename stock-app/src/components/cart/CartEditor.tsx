"use client";

import { useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Field";
import { formatEuros } from "@/lib/utils/currency";
import {
  saveCartAction,
  validateCartAction,
  removeCartLineAction,
} from "@/app/(app)/cart/actions";

interface CartLine {
  id: string;
  quantity: number;
  unitPurchasePrice: number;
  comment: string;
  productName: string;
  brand: string | null;
}

export function CartEditor({
  orderId,
  initialLines,
  label,
  orderDate,
  shippingEstimated,
  notes,
}: {
  orderId: string;
  initialLines: CartLine[];
  label: string;
  orderDate: string;
  shippingEstimated: number;
  notes: string;
}) {
  const [lines, setLines] = useState<CartLine[]>(initialLines);
  const [isPending, startTransition] = useTransition();
  const hiddenRef = useRef<HTMLInputElement>(null);
  const saveAction = saveCartAction.bind(null, orderId);
  const validateAction = validateCartAction.bind(null, orderId);

  function updateLine(id: string, patch: Partial<CartLine>) {
    setLines((cur) => cur.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }

  function removeLine(id: string) {
    setLines((cur) => cur.filter((l) => l.id !== id));
    startTransition(() => removeCartLineAction(id));
  }

  const [shipping, setShipping] = useState(shippingEstimated);
  const articlesTotal = lines.reduce((s, l) => s + l.quantity * l.unitPurchasePrice, 0);

  function serialize() {
    if (hiddenRef.current) {
      hiddenRef.current.value = JSON.stringify(
        lines.map((l) => ({
          id: l.id,
          quantity: l.quantity,
          unitPurchasePrice: l.unitPurchasePrice,
          comment: l.comment || null,
        }))
      );
    }
  }

  return (
    <form action={saveAction} onSubmit={serialize} className="space-y-6">
      <input ref={hiddenRef} type="hidden" name="lines_json" />

      <div className="space-y-3">
        {lines.map((line) => (
          <div key={line.id} className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium text-zinc-900 dark:text-zinc-50">
                {line.brand ? `${line.brand} · ` : ""}
                {line.productName}
              </span>
              <button
                type="button"
                onClick={() => removeLine(line.id)}
                className="text-zinc-400 hover:text-red-600"
                aria-label="Retirer"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <label className="text-xs text-zinc-500">
                Quantité
                <input
                  type="number"
                  min="1"
                  value={line.quantity}
                  onChange={(e) => updateLine(line.id, { quantity: Number(e.target.value) })}
                  className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                />
              </label>
              <label className="text-xs text-zinc-500">
                Prix d&apos;achat (€)
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={line.unitPurchasePrice}
                  onChange={(e) => updateLine(line.id, { unitPurchasePrice: Number(e.target.value) })}
                  className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                />
              </label>
              <label className="col-span-2 text-xs text-zinc-500 sm:col-span-1">
                Commentaire
                <input
                  value={line.comment}
                  onChange={(e) => updateLine(line.id, { comment: e.target.value })}
                  placeholder="taille, modèle…"
                  className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input id="label" name="label" label="Nom du panier" defaultValue={label} placeholder="ex. Commande mars" />
        <Input id="order_date" name="order_date" label="Date" type="date" required defaultValue={orderDate} />
      </div>

      <Input
        id="shipping_france_estimated"
        name="shipping_france_estimated"
        label="Livraison France estimée (€)"
        type="number"
        step="0.01"
        min="0"
        value={shipping}
        onChange={(e) => setShipping(Number(e.target.value))}
      />

      <Textarea id="notes" name="notes" label="Notes" defaultValue={notes} />

      <div className="rounded-lg bg-zinc-50 p-4 text-sm dark:bg-zinc-900">
        <div className="flex justify-between">
          <span className="text-zinc-500">Articles</span>
          <span className="text-zinc-900 dark:text-zinc-50">{formatEuros(articlesTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">Livraison estimée</span>
          <span className="text-zinc-900 dark:text-zinc-50">{formatEuros(shipping)}</span>
        </div>
        <div className="mt-1 flex justify-between border-t border-zinc-200 pt-1 font-medium dark:border-zinc-800">
          <span className="text-zinc-900 dark:text-zinc-50">Total estimé</span>
          <span className="text-zinc-900 dark:text-zinc-50">{formatEuros(articlesTotal + shipping)}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="submit" variant="secondary" disabled={isPending}>
          Enregistrer le panier
        </Button>
        <Button type="submit" formAction={validateAction} disabled={isPending || lines.length === 0}>
          Valider la commande
        </Button>
      </div>
    </form>
  );
}
