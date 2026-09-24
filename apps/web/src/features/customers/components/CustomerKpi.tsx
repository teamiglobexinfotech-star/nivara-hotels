import { KpiCard } from "@/components/shared/KpiCard";
import { iconsList } from "@/features/amenities/amenity.constants";
import type { KpiItem } from "@/types/shared.types";

import { useCustomerKpi } from "../hooks/useCustomerKpi";

export function CustomerKpi() {
  const { data } = useCustomerKpi();

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
