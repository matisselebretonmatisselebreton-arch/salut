import { createClient } from "@/lib/supabase/server";
import { listSuppliers } from "@/lib/services/suppliers";
import { Card } from "@/components/ui/Card";
import { OrderForm } from "@/components/orders/OrderForm";
import { createOrderAction } from "@/app/(app)/orders/actions";

export default async function NewOrderPage() {
  const supabase = await createClient();

  const [suppliers, { data: products, error }] = await Promise.all([
    listSuppliers(supabase),
    supabase.from("products").select("id, name, supplier_id").order("name"),
  ]);
  if (error) throw error;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Nouvelle commande
      </h1>
      <Card>
        {suppliers.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Crée d&apos;abord un fournisseur et au moins un produit avant de passer une commande.
          </p>
        ) : (
          <OrderForm suppliers={suppliers} products={products ?? []} action={createOrderAction} />
        )}
      </Card>
    </div>
  );
}
