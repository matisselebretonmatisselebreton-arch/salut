import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { OrderForm } from "@/components/orders/OrderForm";
import { createOrderAction } from "@/app/(app)/orders/actions";

export default async function NewOrderPage() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, brand, category, reference_purchase_price")
    .order("category")
    .order("name");
  if (error) throw error;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Nouvelle commande
      </h1>
      <Card>
        {(products ?? []).length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Ajoute d&apos;abord des produits au catalogue avant de créer une commande.
          </p>
        ) : (
          <OrderForm products={products ?? []} action={createOrderAction} />
        )}
      </Card>
    </div>
  );
}
