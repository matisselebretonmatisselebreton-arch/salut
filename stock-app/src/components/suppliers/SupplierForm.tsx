"use client";

import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Field";
import type { Supplier } from "@/types/database";

export function SupplierForm({
  supplier,
  action,
  submitLabel,
}: {
  supplier?: Supplier;
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-4">
      <Input id="name" name="name" label="Nom" required defaultValue={supplier?.name} />

      <Input
        id="platform"
        name="platform"
        label="Plateforme"
        placeholder="1688, Taobao, Alibaba…"
        defaultValue={supplier?.platform ?? ""}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="contact_wechat"
          name="contact_wechat"
          label="WeChat"
          defaultValue={supplier?.contact_wechat ?? ""}
        />
        <Input
          id="contact_phone"
          name="contact_phone"
          label="Téléphone"
          defaultValue={supplier?.contact_phone ?? ""}
        />
      </div>

      <Input
        id="contact_link"
        name="contact_link"
        label="Lien boutique"
        defaultValue={supplier?.contact_link ?? ""}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          id="status"
          name="status"
          label="Statut"
          defaultValue={supplier?.status ?? "to_test"}
        >
          <option value="to_test">En test</option>
          <option value="validated">Validé</option>
          <option value="to_avoid">À éviter</option>
        </Select>

        <Select
          id="reliability_score"
          name="reliability_score"
          label="Note de fiabilité"
          defaultValue={supplier?.reliability_score?.toString() ?? ""}
        >
          <option value="">—</option>
          {[1, 2, 3, 4, 5].map((score) => (
            <option key={score} value={score}>
              {score} / 5
            </option>
          ))}
        </Select>
      </div>

      <Input
        id="first_order_date"
        name="first_order_date"
        label="Date de première commande"
        type="date"
        defaultValue={supplier?.first_order_date ?? ""}
      />

      <Textarea
        id="notes"
        name="notes"
        label="Commentaires (délais, qualité, problèmes rencontrés…)"
        defaultValue={supplier?.notes ?? ""}
      />

      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
