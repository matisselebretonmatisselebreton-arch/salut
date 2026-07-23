"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { alertLevel, daysUntil, formatDate, type AlertLevel, type Locale } from "@/core";
import type { DeadlineDTO } from "@/lib/data";

const ALERT_STYLE: Record<AlertLevel, string> = {
  urgent: "bg-status-urgent/10 text-status-urgent",
  warn: "bg-status-warn/10 text-status-warn",
  info: "bg-primary/10 text-primary",
  none: "bg-muted/10 text-muted",
};
const ALERT_DOT: Record<AlertLevel, string> = {
  urgent: "bg-status-urgent",
  warn: "bg-status-warn",
  info: "bg-primary",
  none: "bg-muted",
};

export function DeadlinesView({
  deadlines,
  locale,
}: {
  deadlines: DeadlineDTO[];
  locale: Locale;
}) {
  const { t } = useTranslation();
  const [view, setView] = useState<"list" | "calendar">("list");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-1 self-start rounded-lg border border-border p-1 text-sm">
        {(["list", "calendar"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={
              "rounded-md px-3 py-1 " +
              (view === v ? "bg-primary text-white" : "text-muted")
            }
          >
            {t(`deadline:view.${v}`)}
          </button>
        ))}
      </div>

      {deadlines.length === 0 ? (
        <p className="text-muted">{t("deadline:empty")}</p>
      ) : view === "list" ? (
        <DeadlineList deadlines={deadlines} locale={locale} t={t} />
      ) : (
        <DeadlineCalendar deadlines={deadlines} locale={locale} t={t} />
      )}
    </div>
  );
}

type TFn = ReturnType<typeof useTranslation>["t"];

function AlertBadge({ date, t }: { date: string; t: TFn }) {
  const level = alertLevel(date);
  const days = daysUntil(date);
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${ALERT_STYLE[level]}`}>
      {t(`deadline:alert.${level}`)}
      {days >= 0 ? ` · ${t("deadline:inDays", { days })}` : ""}
    </span>
  );
}

function DeadlineList({ deadlines, locale, t }: { deadlines: DeadlineDTO[]; locale: Locale; t: TFn }) {
  // Regroupement par mois (YYYY-MM) pour lisibilité.
  const groups = useMemo(() => {
    const map = new Map<string, DeadlineDTO[]>();
    for (const d of deadlines) {
      const key = d.date.slice(0, 7);
      (map.get(key) ?? map.set(key, []).get(key)!).push(d);
    }
    return [...map.entries()];
  }, [deadlines]);

  return (
    <div className="flex flex-col gap-6">
      {groups.map(([month, items]) => (
        <div key={month}>
          <h3 className="mb-2 text-sm font-semibold uppercase text-muted">
            {formatDate(`${month}-01`, locale).replace(/^\d+\s?/, "")}
          </h3>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <tbody>
                {items.map((d, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 whitespace-nowrap">{formatDate(d.date, locale)}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${ALERT_DOT[alertLevel(d.date)]}`} />
                        {t(`deadline:type.${d.type}`)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/leases/${d.leaseId}`} className="text-primary hover:underline">
                        {d.leaseReference ?? "—"}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted">{d.tenantName}</td>
                    <td className="px-4 py-3 text-muted">{d.assetName}</td>
                    <td className="px-4 py-3 text-right">
                      <AlertBadge date={d.date} t={t} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

function DeadlineCalendar({ deadlines, locale, t }: { deadlines: DeadlineDTO[]; locale: Locale; t: TFn }) {
  const months = useMemo(
    () => [...new Set(deadlines.map((d) => d.date.slice(0, 7)))].sort(),
    [deadlines],
  );
  const [monthIdx, setMonthIdx] = useState(0);
  const month = months[monthIdx];

  const byDay = useMemo(() => {
    const map = new Map<number, DeadlineDTO[]>();
    for (const d of deadlines) {
      if (d.date.slice(0, 7) !== month) continue;
      const day = Number(d.date.slice(8, 10));
      (map.get(day) ?? map.set(day, []).get(day)!).push(d);
    }
    return map;
  }, [deadlines, month]);

  const [year, mon] = month.split("-").map(Number);
  const firstDow = (new Date(Date.UTC(year, mon - 1, 1)).getUTCDay() + 6) % 7; // lundi=0
  const daysInMonth = new Date(Date.UTC(year, mon, 0)).getUTCDate();
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setMonthIdx((i) => Math.max(0, i - 1))}
          disabled={monthIdx === 0}
          className="rounded-lg border border-border px-3 py-1 text-sm disabled:opacity-40"
        >
          ←
        </button>
        <span className="font-medium">
          {formatDate(`${month}-01`, locale).replace(/^\d+\s?/, "")}
        </span>
        <button
          onClick={() => setMonthIdx((i) => Math.min(months.length - 1, i + 1))}
          disabled={monthIdx === months.length - 1}
          className="rounded-lg border border-border px-3 py-1 text-sm disabled:opacity-40"
        >
          →
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => (
          <div
            key={i}
            className={
              "min-h-20 rounded-lg border p-1 text-xs " +
              (day ? "border-border" : "border-transparent")
            }
          >
            {day && <div className="mb-1 text-muted">{day}</div>}
            <div className="flex flex-col gap-1">
              {(byDay.get(day ?? -1) ?? []).map((d, j) => (
                <Link
                  key={j}
                  href={`/leases/${d.leaseId}`}
                  className={`truncate rounded px-1 py-0.5 ${ALERT_STYLE[alertLevel(d.date)]}`}
                  title={`${t(`deadline:type.${d.type}`)} — ${d.leaseReference ?? ""}`}
                >
                  {t(`deadline:type.${d.type}`)}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
