import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { listSuppliers } from "@/lib/services/suppliers";
import { Badge, SUPPLIER_STATUS_BADGE } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import type { SupplierStatus } from "@/types/database";

export default async function SuppliersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const supabase = await createClient();
  const suppliers = await listSuppliers(supabase, {
    status: (status as SupplierStatus) || undefined,
  });

  const statusFilters: { value: SupplierStatus | undefined; label: string }[] = [
    { value: undefined, label: "Tous" },
    { value: "to_test", label: "En test" },
    { value: "validated", label: "Validé" },
    { value: "to_avoid", label: "À éviter" },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Fournisseurs</h1>
        <LinkButton href="/suppliers/new">Nouveau fournisseur</LinkButton>
      </div>

      <div className="mb-4 flex gap-2">
        {statusFilters.map((filter) => (
          <Link
            key={filter.label}
            href={filter.value ? `/suppliers?status=${filter.value}` : "/suppliers"}
            className={`rounded-full px-3 py-1 text-sm ${
              status === filter.value
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {filter.label}
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {suppliers.map((supplier) => {
          const badge = SUPPLIER_STATUS_BADGE[supplier.status];
          return (
            <Link key={supplier.id} href={`/suppliers/${supplier.id}`}>
              <Card className="h-full transition-colors hover:border-zinc-400 dark:hover:border-zinc-600">
                <div className="flex items-start justify-between">
                  <h2 className="font-medium text-zinc-900 dark:text-zinc-50">{supplier.name}</h2>
                  <Badge color={badge.color}>{badge.label}</Badge>
                </div>
                {supplier.platform && (
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{supplier.platform}</p>
                )}
                {supplier.reliability_score && (
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    Fiabilité : {supplier.reliability_score} / 5
                  </p>
                )}
              </Card>
            </Link>
          );
        })}
        {suppliers.length === 0 && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Aucun fournisseur pour le moment.</p>
        )}
      </div>
    </div>
  );
}
