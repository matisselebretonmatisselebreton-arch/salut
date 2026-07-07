"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import * as productsService from "@/lib/services/products";
import { deletePhoto } from "@/lib/storage/upload";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non authentifié.");
  return { supabase, userId: user.id };
}

function parsePrice(value: FormDataEntryValue | null): number | null {
  if (value === null || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export async function createProductAction(formData: FormData) {
  const { supabase, userId } = await requireUser();

  const product = await productsService.createProduct(supabase, userId, {
    name: String(formData.get("name")),
    category: String(formData.get("category")),
    brand: (formData.get("brand") as string) || null,
    description: (formData.get("description") as string) || null,
    product_url: (formData.get("product_url") as string) || null,
    reference_purchase_price: parsePrice(formData.get("reference_purchase_price")),
    estimated_resale_price: parsePrice(formData.get("estimated_resale_price")),
  });

  revalidatePath("/products");
  redirect(`/products/${product.id}`);
}

export async function updateProductAction(id: string, formData: FormData) {
  const { supabase } = await requireUser();

  await productsService.updateProduct(supabase, id, {
    name: String(formData.get("name")),
    category: String(formData.get("category")),
    brand: (formData.get("brand") as string) || null,
    description: (formData.get("description") as string) || null,
    product_url: (formData.get("product_url") as string) || null,
    reference_purchase_price: parsePrice(formData.get("reference_purchase_price")),
    estimated_resale_price: parsePrice(formData.get("estimated_resale_price")),
  });

  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
}

export async function deleteProductAction(id: string) {
  const { supabase } = await requireUser();
  await productsService.deleteProduct(supabase, id);
  revalidatePath("/products");
  redirect("/products");
}

export async function addProductImageAction(productId: string, storagePath: string) {
  const { supabase, userId } = await requireUser();
  await productsService.addProductImage(supabase, userId, productId, storagePath);
  revalidatePath(`/products/${productId}`);
}

export async function removeProductImageAction(
  productId: string,
  imageId: string,
  storagePath: string
) {
  const { supabase } = await requireUser();
  await productsService.deleteProductImage(supabase, imageId);
  await deletePhoto("product-photos", storagePath);
  revalidatePath(`/products/${productId}`);
}
