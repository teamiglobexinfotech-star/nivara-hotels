import { KpiCard } from "@/components/shared/KpiCard";

import { customerKpiData } from "../customer.mock";

export function CustomerKpi() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {customerKpiData.map((item) => (
        <KpiCard key={item.id} item={item} />
      ))}
    </div>
  );
}
