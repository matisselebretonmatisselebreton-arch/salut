"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";

interface CatalogProduct {
  id: string;
  name: string;
  brand: string | null;
  category: string;
  reference_purchase_price: number | null;
}

interface LineDraft {
  productId: string;
  quantity: number;
  unitPurchasePrice: number;
  comment: string;
}

const EMPTY_LINE: LineDraft = { productId: "", quantity: 1, unitPurchasePrice: 0, comment: "" };

export function OrderForm({
  products,
  action,
}: {
  products: CatalogProduct[];
  action: (formData: FormData) => void;
}) {
  const [lines, setLines] = useState<LineDraft[]>([{ ...EMPTY_LINE }]);
  const hiddenRef = useRef<HTMLInputElement>(null);
  const productById = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);

  function updateLine(index: number, patch: Partial<LineDraft>) {
    setLines((cur) => cur.map((l, i) => (i === index ? { ...l, ...patch } : l)));
  }

  // When a product is picked, prefill its reference purchase price (editable).
  function pickProduct(index: number, productId: string) {
    const ref = productById.get(productId)?.reference_purchase_price ?? 0;
    updateLine(index, { productId, unitPurchasePrice: ref });
  }

  const validLines = lines.filter((l) => l.productId);
  const articlesTotal = validLines.reduce((s, l) => s + l.quantity * l.unitPurchasePrice, 0);

  return (
    <form
      action={action}
      onSubmit={() => {
        if (hiddenRef.current) hiddenRef.current.value = JSON.stringify(validLines);
      }}
      className="space-y-4"
    >
      <input ref={hiddenRef} type="hidden" name="lines_json" />

      <Input id="label" name="label" label="Nom du panier (optionnel)" placeholder="ex. Commande mars" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="order_date"
          name="order_date"
          label="Date"
          type="date"
          required
          defaultValue={new Date().toISOString().slice(0, 10)}
        />
        <Input
          id="shipping_france_estimated"
          name="shipping_france_estimated"
          label="Livraison France estimée (€)"
          type="number"
          step="0.01"
          min="0"
          defaultValue="0"
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">Articles</p>
        <div className="space-y-3">
          {lines.map((line, index) => (
            <div
              key={index}
              className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
            >
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <select
                  value={line.productId}
                  onChange={(e) => pickProduct(index, e.target.value)}
                  className="col-span-2 rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                >
                  <option value="">Produit…</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.category} · {p.brand ? `${p.brand} · ` : ""}
                      {p.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1"
                  placeholder="Qté"
                  value={line.quantity}
                  onChange={(e) => updateLine(index, { quantity: Number(e.target.value) })}
                  className="rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Prix achat €"
                  value={line.unitPurchasePrice}
                  onChange={(e) => updateLine(index, { unitPurchasePrice: Number(e.target.value) })}
                  className="rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                />
              </div>
              <div className="mt-2 flex gap-2">
                <input
                  placeholder="Commentaire (taille, modèle, couleur…)"
                  value={line.comment}
                  onChange={(e) => updateLine(index, { comment: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                />
                <button
                  type="button"
                  onClick={() => setLines((cur) => cur.filter((_, i) => i !== index))}
                  disabled={lines.length === 1}
                  className="rounded-lg px-2 text-zinc-400 hover:text-red-600 disabled:opacity-30"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setLines((cur) => [...cur, { ...EMPTY_LINE }])}
          className="mt-2 text-sm font-medium text-zinc-600 hover:underline dark:text-zinc-300"
        >
          + Ajouter un article
        </button>
      </div>

      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Total articles : {articlesTotal.toFixed(2)} € (hors livraison)
      </p>

      <Textarea id="notes" name="notes" label="Notes" />

      <Select id="status" name="status" label="État" defaultValue="ordered">
        <option value="draft">Panier (brouillon)</option>
        <option value="ordered">Commandée / payée</option>
      </Select>

      <Button type="submit">Enregistrer la commande</Button>
    </form>
  );
}
