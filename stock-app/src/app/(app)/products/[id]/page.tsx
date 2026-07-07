import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProductWithImages, listCategories } from "@/lib/services/products";
import { listSuppliers } from "@/lib/services/suppliers";
import { getSignedPhotoUrls } from "@/lib/storage/signedUrl";
import { Card } from "@/components/ui/Card";
import { ProductForm } from "@/components/products/ProductForm";
import { ProductPhotos } from "@/components/products/ProductPhotos";
import { updateProductAction } from "@/app/(app)/products/actions";

export default async function ProductDetailPage({
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
    product = await getProductWithImages(supabase, id);
  } catch {
    notFound();
  }

  const [suppliers, categories] = await Promise.all([
    listSuppliers(supabase),
    listCategories(supabase, user!.id),
  ]);

  const images = [...(product.product_images ?? [])].sort((a, b) => a.position - b.position);
  const urls = await getSignedPhotoUrls(
    "product-photos",
    images.map((img) => img.storage_path)
  );
  const existingPhotos = images.map((img, index) => ({ id: img.id, url: urls[index] }));
  const imagePaths = Object.fromEntries(images.map((img) => [img.id, img.storage_path]));

  const updateAction = updateProductAction.bind(null, product.id);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{product.name}</h1>
        {product.product_url && (
          <a
            href={product.product_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block break-all text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            {product.product_url} ↗
          </a>
        )}
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
          suppliers={suppliers}
          categories={categories}
          action={updateAction}
          submitLabel="Enregistrer"
        />
      </Card>
    </div>
  );
}
