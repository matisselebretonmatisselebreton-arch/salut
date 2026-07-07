"use client";

import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { DEFAULT_CATEGORIES } from "@/lib/services/products";
import type { Product, Supplier } from "@/types/database";

export function ProductForm({
  product,
  suppliers,
  categories,
  action,
  submitLabel,
}: {
  product?: Product;
  suppliers: Pick<Supplier, "id" | "name">[];
  categories: string[];
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  // Default categories first, then any others already used on the site, deduped.
  const categoryOptions = Array.from(new Set([...DEFAULT_CATEGORIES, ...categories]));

  return (
    <form action={action} className="space-y-4">
      <Input id="name" name="name" label="Nom / description" required defaultValue={product?.name} />

      <Select
        id="supplier_id"
        name="supplier_id"
        label="Fournisseur"
        required
        defaultValue={product?.supplier_id ?? ""}
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

      <div>
        <label htmlFor="category" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Catégorie
        </label>
        <input
          id="category"
          name="category"
          list="category-suggestions"
          placeholder="Chaussures, Vêtements, Accessoire, Produit électronique…"
          defaultValue={product?.category ?? ""}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
        <datalist id="category-suggestions">
          {categoryOptions.map((category) => (
            <option key={category} value={category} />
          ))}
        </datalist>
        <p className="mt-1 text-xs text-zinc-400">
          Choisis une catégorie ou saisis-en une nouvelle.
        </p>
      </div>

      <Input
        id="product_url"
        name="product_url"
        label="Lien (fournisseur / boutique)"
        type="url"
        inputMode="url"
        placeholder="https://…"
        defaultValue={product?.product_url ?? ""}
      />

      <Select
        id="validation_status"
        name="validation_status"
        label="Statut de validation"
        defaultValue={product?.validation_status ?? "pending_test"}
      >
        <option value="pending_test">En attente de test</option>
        <option value="validated">Validé</option>
        <option value="rejected">Refusé</option>
      </Select>

      <Textarea
        id="description"
        name="description"
        label="Description"
        defaultValue={product?.description ?? ""}
      />

      <Textarea
        id="quality_notes"
        name="quality_notes"
        label="Commentaires qualité générale"
        defaultValue={product?.quality_notes ?? ""}
      />

      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
