import { createClient } from "@/lib/supabase/server";
import { listSuppliers } from "@/lib/services/suppliers";
import { listCategories } from "@/lib/services/products";
import { Card } from "@/components/ui/Card";
import { ProductForm } from "@/components/products/ProductForm";
import { createProductAction } from "@/app/(app)/products/actions";

export default async function NewProductPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [suppliers, categories] = await Promise.all([
    listSuppliers(supabase),
    listCategories(supabase, user!.id),
  ]);

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Nouveau produit
      </h1>
      <Card>
        <ProductForm
          suppliers={suppliers}
          categories={categories}
          action={createProductAction}
          submitLabel="Créer le produit"
        />
      </Card>
    </div>
  );
}
