import { KpiCard } from "@/components/shared/KpiCard";

import { roomKpisData } from "../room.mock";

export function RoomKpi() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {roomKpisData.map((item) => (
        <KpiCard key={item.id} item={item} />
      ))}
    </div>
  );
}
