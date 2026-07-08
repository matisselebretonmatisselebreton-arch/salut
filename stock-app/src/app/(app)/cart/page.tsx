import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getActiveCart } from "@/lib/services/cart";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { CartEditor } from "@/components/cart/CartEditor";

interface CartLineRow {
  id: string;
  quantity: number;
  unit_purchase_price: number;
  comment: string | null;
  products: { id: string; name: string; brand: string | null } | null;
}

export default async function CartPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const cart = await getActiveCart(supabase, user!.id);

  const lines = (cart?.lines ?? []) as unknown as CartLineRow[];

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Panier</h1>
        <LinkButton href="/products" variant="secondary">
          + Ajouter depuis le catalogue
        </LinkButton>
      </div>

      {!cart || lines.length === 0 ? (
        <Card>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Ton panier est vide. Va dans le{" "}
            <Link href="/products" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
              catalogue
            </Link>{" "}
            et clique sur « Ajouter au panier ».
          </p>
        </Card>
      ) : (
        <Card>
          <CartEditor
            orderId={cart!.order.id}
            initialLines={lines.map((l) => ({
              id: l.id,
              quantity: l.quantity,
              unitPurchasePrice: l.unit_purchase_price,
              comment: l.comment ?? "",
              productName: l.products?.name ?? "Produit",
              brand: l.products?.brand ?? null,
            }))}
            label={cart!.order.label ?? ""}
            orderDate={cart!.order.order_date}
            shippingEstimated={cart!.order.shipping_france_estimated}
            notes={cart!.order.notes ?? ""}
          />
        </Card>
      )}
    </div>
  );
}
