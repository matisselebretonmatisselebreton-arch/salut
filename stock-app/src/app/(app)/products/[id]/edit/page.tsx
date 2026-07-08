import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProduct, listBrands } from "@/lib/services/products";
import { getSignedPhotoUrls } from "@/lib/storage/signedUrl";
import { Card } from "@/components/ui/Card";
import { ProductForm } from "@/components/products/ProductForm";
import { ProductPhotos } from "@/components/products/ProductPhotos";
import { DeleteProductButton } from "@/components/products/DeleteProductButton";
import { updateProductAction } from "@/app/(app)/products/actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let product;
  try {
    product = await getProduct(supabase, id);
  } catch {
    notFound();
  }

  const brands = await listBrands(supabase, user!.id);

  const images = [...(product.product_images ?? [])].sort((a, b) => a.position - b.position);
  const urls = await getSignedPhotoUrls(
    "product-photos",
    images.map((img) => img.storage_path)
  );
  const existingPhotos = images.map((img, i) => ({ id: img.id, url: urls[i] }));
  const imagePaths = Object.fromEntries(images.map((img) => [img.id, img.storage_path]));

  const updateAction = updateProductAction.bind(null, product.id);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href={`/products/${product.id}`} className="text-sm text-zinc-500 hover:underline">
            ← Retour à l&apos;annonce
          </Link>
          <h1 className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Modifier — {product.name}
          </h1>
        </div>
        <DeleteProductButton productId={product.id} />
      </div>

      <Card>
        <h2 className="mb-4 font-medium text-zinc-900 dark:text-zinc-50">Photos</h2>
        <ProductPhotos
          productId={product.id}
          userId={user!.id}
          existingPhotos={existingPhotos}
          imagePaths={imagePaths}
        />
      </Card>

      <Card>
        <h2 className="mb-4 font-medium text-zinc-900 dark:text-zinc-50">Informations</h2>
        <ProductForm
          product={product}
          brands={brands}
          action={updateAction}
          submitLabel="Enregistrer"
        />
      </Card>
    </div>
  );
}
