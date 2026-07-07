import { Card } from "@/components/ui/Card";
import { SupplierForm } from "@/components/suppliers/SupplierForm";
import { createSupplierAction } from "@/app/(app)/suppliers/actions";

export default function NewSupplierPage() {
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Nouveau fournisseur
      </h1>
      <Card>
        <SupplierForm action={createSupplierAction} submitLabel="Créer le fournisseur" />
      </Card>
    </div>
  );
}
