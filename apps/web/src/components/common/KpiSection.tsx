import { KpiCard } from "./KpiCard";

export function KpisSection({ data = [] }: any) {
  return (
    <div
      aria-label="Dashboard KPIs"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {data.map((kpi) => (
        <KpiCard key={kpi.label} {...kpi} />
      ))}
    </div>
  );
}
