import { createClient } from "@/lib/supabase/server";
import { listBrands } from "@/lib/services/products";
import { Card } from "@/components/ui/Card";
import { ProductForm } from "@/components/products/ProductForm";
import { createProductAction } from "@/app/(app)/products/actions";

export default async function NewProductPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const brands = await listBrands(supabase, user!.id);

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Nouveau produit
      </h1>
      <Card>
        <ProductForm brands={brands} action={createProductAction} submitLabel="Ajouter au catalogue" />
      </Card>
    </div>
  );
}
