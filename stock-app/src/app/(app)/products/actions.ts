"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import * as productsService from "@/lib/services/products";
import { deletePhoto } from "@/lib/storage/upload";
import type { ProductValidationStatus } from "@/types/database";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non authentifié.");
  return { supabase, userId: user.id };
}

export async function createProductAction(formData: FormData) {
  const { supabase, userId } = await requireUser();

  const product = await productsService.createProduct(supabase, userId, {
    name: String(formData.get("name")),
    supplier_id: String(formData.get("supplier_id")),
    category: (formData.get("category") as string) || null,
    description: (formData.get("description") as string) || null,
    validation_status: (formData.get("validation_status") as ProductValidationStatus) || "pending_test",
    quality_notes: (formData.get("quality_notes") as string) || null,
  });

  revalidatePath("/products");
  redirect(`/products/${product.id}`);
}

export async function updateProductAction(id: string, formData: FormData) {
  const { supabase } = await requireUser();

  await productsService.updateProduct(supabase, id, {
    name: String(formData.get("name")),
    supplier_id: String(formData.get("supplier_id")),
    category: (formData.get("category") as string) || null,
    description: (formData.get("description") as string) || null,
    validation_status: (formData.get("validation_status") as ProductValidationStatus) || "pending_test",
    quality_notes: (formData.get("quality_notes") as string) || null,
  });

  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
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
