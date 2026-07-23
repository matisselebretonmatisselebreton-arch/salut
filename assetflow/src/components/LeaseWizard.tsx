"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import type { LeaseType } from "@/core";
import { createLease, type CreateLeaseResult } from "@/app/(app)/leases/new/actions";

export interface WizardTenant {
  id: string;
  name: string;
}
export interface WizardUnit {
  id: string;
  reference: string;
  isOccupied: boolean;
}
export interface WizardAsset {
  id: string;
  name: string;
  units: WizardUnit[];
}

const LEASE_TYPES: LeaseType[] = [
  "residential_bare",
  "residential_furnished",
  "commercial_369",
  "professional",
  "derogatory",
  "civil",
];

const STEP_KEYS = ["type", "parties", "units", "financial", "clauses", "documents"] as const;

export function LeaseWizard({
  tenants,
  assets,
}: {
  tenants: WizardTenant[];
  assets: WizardAsset[];
}) {
  const { t } = useTranslation();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<CreateLeaseResult | null>(null);

  const [leaseType, setLeaseType] = useState<LeaseType>("residential_bare");
  const [tenantId, setTenantId] = useState("");
  const [assetId, setAssetId] = useState("");
  const [unitIds, setUnitIds] = useState<string[]>([]);
  const [reference, setReference] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [deposit, setDeposit] = useState("");
  const [baseRent, setBaseRent] = useState("");
  const [charges, setCharges] = useState("");
  const [notes, setNotes] = useState("");

  const selectedAsset = useMemo(
    () => assets.find((a) => a.id === assetId),
    [assets, assetId],
  );

  // Validation minimale par étape pour activer "Suivant".
  const canNext = useMemo(() => {
    switch (STEP_KEYS[step]) {
      case "type":
        return !!leaseType;
      case "parties":
        return !!tenantId && !!assetId;
      case "units":
        return unitIds.length > 0;
      case "financial":
        return !!startDate && Number(baseRent) > 0;
      default:
        return true;
    }
  }, [step, leaseType, tenantId, assetId, unitIds, startDate, baseRent]);

  function toggleUnit(id: string) {
    setUnitIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  async function submit() {
    setSubmitting(true);
    const res = await createLease({
      leaseType,
      tenantId,
      assetId,
      unitIds,
      reference: reference || undefined,
      startDate,
      endDate: endDate || undefined,
      depositAmount: deposit ? Number(deposit) : undefined,
      baseRent: Number(baseRent),
      chargesProvision: charges ? Number(charges) : undefined,
      indexType: "none",
      notes: notes || undefined,
    });
    setResult(res);
    setSubmitting(false);
    if (res.ok && !res.demo && res.leaseId) {
      router.push(`/leases/${res.leaseId}`);
    }
  }

  if (result?.ok) {
    return (
      <div className="rounded-xl border border-status-ok/30 bg-status-ok/5 p-6">
        <p className="font-medium text-status-ok">{t("lease:wizard.created")}</p>
        <button
          onClick={() => router.push("/leases")}
          className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white"
        >
          {t("nav.leases")}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Fil des étapes */}
      <ol className="flex flex-wrap gap-2 text-sm">
        {STEP_KEYS.map((key, i) => (
          <li
            key={key}
            className={
              "rounded-full px-3 py-1 " +
              (i === step
                ? "bg-primary text-white"
                : i < step
                  ? "bg-status-ok/10 text-status-ok"
                  : "bg-muted/10 text-muted")
            }
          >
            {i + 1}. {t(`lease:wizard.steps.${key}`)}
          </li>
        ))}
      </ol>

      <div className="rounded-xl border border-border p-6">
        {STEP_KEYS[step] === "type" && (
          <fieldset className="flex flex-col gap-3">
            <legend className="mb-2 font-medium">{t("lease:wizard.chooseType")}</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {LEASE_TYPES.map((lt) => (
                <label
                  key={lt}
                  className={
                    "cursor-pointer rounded-lg border px-4 py-3 " +
                    (leaseType === lt ? "border-primary bg-primary/5" : "border-border")
                  }
                >
                  <input
                    type="radio"
                    name="leaseType"
                    className="mr-2"
                    checked={leaseType === lt}
                    onChange={() => setLeaseType(lt)}
                  />
                  {t(`lease:type.${lt}`)}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {STEP_KEYS[step] === "parties" && (
          <div className="flex flex-col gap-4">
            <Labelled label={t("lease:wizard.chooseTenant")}>
              <select
                value={tenantId}
                onChange={(e) => setTenantId(e.target.value)}
                className="w-full rounded-lg border border-border bg-transparent px-3 py-2"
              >
                <option value="">—</option>
                {tenants.map((tn) => (
                  <option key={tn.id} value={tn.id}>
                    {tn.name}
                  </option>
                ))}
              </select>
            </Labelled>
            <Labelled label={t("lease:wizard.chooseAsset")}>
              <select
                value={assetId}
                onChange={(e) => {
                  setAssetId(e.target.value);
                  setUnitIds([]);
                }}
                className="w-full rounded-lg border border-border bg-transparent px-3 py-2"
              >
                <option value="">—</option>
                {assets.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </Labelled>
          </div>
        )}

        {STEP_KEYS[step] === "units" && (
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 font-medium">{t("lease:wizard.chooseUnits")}</legend>
            {selectedAsset?.units.map((u) => (
              <label
                key={u.id}
                className="flex items-center gap-2 rounded-lg border border-border px-3 py-2"
              >
                <input
                  type="checkbox"
                  checked={unitIds.includes(u.id)}
                  onChange={() => toggleUnit(u.id)}
                />
                <span>{u.reference}</span>
                {u.isOccupied && (
                  <span className="ml-auto text-xs text-status-warn">
                    {t("asset:units.occupied")}
                  </span>
                )}
              </label>
            ))}
          </fieldset>
        )}

        {STEP_KEYS[step] === "financial" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Labelled label={t("lease:fields.reference")}>
              <Input value={reference} onChange={setReference} />
            </Labelled>
            <Labelled label={t("lease:fields.period")}>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-lg border border-border bg-transparent px-3 py-2"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-lg border border-border bg-transparent px-3 py-2"
                />
              </div>
            </Labelled>
            <Labelled label={t("lease:charge.base_rent") + " (€/mois)"}>
              <Input value={baseRent} onChange={setBaseRent} type="number" />
            </Labelled>
            <Labelled label={t("lease:charge.charges_provision") + " (€/mois)"}>
              <Input value={charges} onChange={setCharges} type="number" />
            </Labelled>
            <Labelled label={t("lease:fields.deposit")}>
              <Input value={deposit} onChange={setDeposit} type="number" />
            </Labelled>
          </div>
        )}

        {STEP_KEYS[step] === "clauses" && (
          <Labelled label={t("lease:wizard.steps.clauses")}>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t("lease:wizard.clausesPlaceholder")}
              rows={5}
              className="w-full rounded-lg border border-border bg-transparent px-3 py-2"
            />
          </Labelled>
        )}

        {STEP_KEYS[step] === "documents" && (
          <div className="flex flex-col gap-4">
            <p className="text-muted">{t("lease:wizard.documentsHint")}</p>
            <p className="rounded-lg bg-status-warn/10 px-4 py-3 text-sm text-status-warn">
              {t("lease:wizard.demoNotice")}
            </p>
            {result && !result.ok && (
              <p className="text-sm text-status-urgent">Erreur : {result.error}</p>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="rounded-lg border border-border px-4 py-2 text-sm disabled:opacity-40"
        >
          {t("lease:wizard.prev")}
        </button>
        <span className="text-sm text-muted">
          {t("lease:wizard.step", { current: step + 1, total: STEP_KEYS.length })}
        </span>
        {step < STEP_KEYS.length - 1 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canNext}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            {t("lease:wizard.next")}
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={submitting}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            {t("lease:wizard.submit")}
          </button>
        )}
      </div>
    </div>
  );
}

function Labelled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-muted">{label}</span>
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-border bg-transparent px-3 py-2"
    />
  );
}
