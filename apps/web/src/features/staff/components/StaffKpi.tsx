import { KpiCard } from "@/components/shared/KpiCard";

import { staffKpiData } from "../staff.mock";

export function StaffKpi() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {staffKpiData.map((item) => (
        <KpiCard key={item.id} item={item} />
      ))}
    </div>
  );
}
