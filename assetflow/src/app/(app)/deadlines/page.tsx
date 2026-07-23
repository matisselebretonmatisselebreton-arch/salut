import { getRepository } from "@/lib/data";
import { getRequestLocale, getT } from "@/i18n/server";
import { DeadlinesView } from "@/components/DeadlinesView";

export default async function DeadlinesPage() {
  const locale = await getRequestLocale();
  const t = await getT(locale);
  const deadlines = await getRepository().listUpcomingDeadlines();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{t("deadline:title")}</h1>
      <DeadlinesView deadlines={deadlines} locale={locale} />
    </div>
  );
}
