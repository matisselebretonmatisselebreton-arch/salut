"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import type { Product, Supplier } from "@/types/database";

interface LineDraft {
  productId: string;
  quantity: number;
  unitPurchasePrice: number;
  shippingCostAllocated: number;
}

const EMPTY_LINE: LineDraft = {
  productId: "",
  quantity: 1,
  unitPurchasePrice: 0,
  shippingCostAllocated: 0,
};

export function OrderForm({
  suppliers,
  products,
  action,
}: {
  suppliers: Pick<Supplier, "id" | "name">[];
  products: Pick<Product, "id" | "name" | "supplier_id">[];
  action: (formData: FormData) => void;
}) {
  const [supplierId, setSupplierId] = useState("");
  const [lines, setLines] = useState<LineDraft[]>([{ ...EMPTY_LINE }]);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const availableProducts = supplierId
    ? products.filter((p) => p.supplier_id === supplierId)
    : products;

  function updateLine(index: number, patch: Partial<LineDraft>) {
    setLines((current) => current.map((line, i) => (i === index ? { ...line, ...patch } : line)));
  }

  const total =
    lines.reduce((sum, line) => sum + line.quantity * line.unitPurchasePrice, 0);

  return (
    <form
      action={action}
      onSubmit={() => {
        if (hiddenInputRef.current) {
          hiddenInputRef.current.value = JSON.stringify(lines);
        }
      }}
      className="space-y-4"
    >
      <input ref={hiddenInputRef} type="hidden" name="lines_json" />

      <Select
        id="supplier_id"
        name="supplier_id"
        label="Fournisseur"
        required
        value={supplierId}
        onChange={(e) => setSupplierId(e.target.value)}
      >
        <option value="" disabled>
          Choisir un fournisseur
        </option>
        {suppliers.map((supplier) => (
          <option key={supplier.id} value={supplier.id}>
            {supplier.name}
          </option>
        ))}
      </Select>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input id="order_date" name="order_date" label="Date de commande" type="date" required />
        <Input
          id="shipping_cost"
          name="shipping_cost"
          label="Frais de livraison Chine → moi (€)"
          type="number"
          step="0.01"
          min="0"
          defaultValue="0"
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Articles commandés
        </p>
        <div className="space-y-3">
          {lines.map((line, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-2 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800 sm:grid-cols-5"
            >
              <select
                value={line.productId}
                onChange={(e) => updateLine(index, { productId: e.target.value })}
                className="col-span-2 rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900 sm:col-span-2"
              >
                <option value="">Produit…</option>
                {availableProducts.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
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
                placeholder="Prix unitaire €"
                value={line.unitPurchasePrice}
                onChange={(e) => updateLine(index, { unitPurchasePrice: Number(e.target.value) })}
                className="rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Livraison ligne €"
                  value={line.shippingCostAllocated}
                  onChange={(e) =>
                    updateLine(index, { shippingCostAllocated: Number(e.target.value) })
                  }
                  className="w-full rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                />
                <button
                  type="button"
                  onClick={() => setLines((current) => current.filter((_, i) => i !== index))}
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
          onClick={() => setLines((current) => [...current, { ...EMPTY_LINE }])}
          className="mt-2 text-sm font-medium text-zinc-600 hover:underline dark:text-zinc-300"
        >
          + Ajouter une ligne
        </button>
      </div>

      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Total articles : {total.toFixed(2)} € (hors livraison)
      </p>

      <Textarea id="notes" name="notes" label="Notes" />

      <Button type="submit">Créer la commande</Button>
    </form>
  );
}
