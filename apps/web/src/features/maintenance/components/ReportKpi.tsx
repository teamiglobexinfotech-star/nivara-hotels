import { KpiCard } from "@/components/shared/KpiCard";
import { iconsList } from "@/features/amenities/amenity.constants";
import type { KpiItem } from "@/types/shared.types";

import { useReportKpi } from "../hooks/useReportKpi";

export function ReportKpi() {
  const { data } = useReportKpi();

  const items: KpiItem[] =
    data?.map((k) => ({
      ...k,
      iconKey: iconsList[k.iconKey.toString().toLocaleLowerCase()],
    })) || [];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <KpiCard key={item.id} item={item} />
      ))}
    </div>
  );
}
