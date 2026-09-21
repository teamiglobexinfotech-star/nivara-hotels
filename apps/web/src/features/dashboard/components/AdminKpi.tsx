import { KpiCard } from "@/components/shared/KpiCard";

import { adminKpi } from "../mock/adminKpi.mock";

export function AdminKpi() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {adminKpi?.map((item) => (
        <KpiCard key={item.id} item={item} />
      ))}
    </div>
  );
}
