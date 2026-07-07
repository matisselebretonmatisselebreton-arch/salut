"use client";

import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { CATEGORIES, type Product } from "@/types/database";

export function ProductForm({
  product,
  brands,
  action,
  submitLabel,
}: {
  product?: Product;
  brands: string[];
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-4">
      <Input id="name" name="name" label="Nom du produit" required defaultValue={product?.name} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          id="category"
          name="category"
          label="Catégorie"
          required
          defaultValue={product?.category ?? ""}
        >
          <option value="" disabled>
            Choisir…
          </option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>

        <div>
          <label htmlFor="brand" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Marque
          </label>
          <input
            id="brand"
            name="brand"
            list="brand-suggestions"
            placeholder="ex. Nike, Rolex…"
            defaultValue={product?.brand ?? ""}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
          <datalist id="brand-suggestions">
            {brands.map((b) => (
              <option key={b} value={b} />
            ))}
          </datalist>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="reference_purchase_price"
          name="reference_purchase_price"
          label="Prix d'achat de référence (€)"
          type="number"
          step="0.01"
          min="0"
          defaultValue={product?.reference_purchase_price ?? ""}
        />
        <Input
          id="estimated_resale_price"
          name="estimated_resale_price"
          label="Prix de revente estimé (€)"
          type="number"
          step="0.01"
          min="0"
          defaultValue={product?.estimated_resale_price ?? ""}
        />
      </div>

      <Input
        id="product_url"
        name="product_url"
        label="Lien source (boutique)"
        type="url"
        inputMode="url"
        placeholder="https://…"
        defaultValue={product?.product_url ?? ""}
      />

      <Textarea
        id="description"
        name="description"
        label="Description"
        defaultValue={product?.description ?? ""}
      />

      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
