import { Clock } from "lucide-react";

type KpiItem = {
  id: string;
  label: string;
  value: string;
  detail: string;
  indicator?: "dot" | "text" | "icon";
  indicatorText?: string;
  icon?: React.ReactNode;
};

type KpiSectionProps = {
  items?: KpiItem[];
};

const defaultKpis: KpiItem[] = [
  {
    id: "occupancy",
    label: "Occupancy",
    value: "78.4%",
    detail: "188 of 240 rooms",
    indicator: "text",
    indicatorText: "52 vacant",
  },
  {
    id: "checkins",
    label: "Today's Check-ins",
    value: "28",
    detail: "24 confirmed · 4 pending",
    indicator: "dot",
  },
  {
    id: "checkouts",
    label: "Today's Check-outs",
    value: "16",
    detail: "12 completed · 4 remaining",
    indicator: "icon",
    icon: <Clock className="h-3.5 w-3.5 text-muted-foreground" />,
  },
  {
    id: "revenue",
    label: "Today's Revenue",
    value: "₹2.85L",
    detail: "₹36.6K from hotel services",
    indicator: "text",
    indicatorText: "+14% vs avg",
  },
];

export function KpiSection({ items = defaultKpis }: KpiSectionProps) {
  return (
    <section
      id="kpi-cards-grid"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {items.map((kpi) => (
        <div
          key={kpi.id}
          id={`kpi-card-${kpi.id}`}
          className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-xs transition-colors hover:border-border sm:p-6"
        >
          <div className="space-y-1">
            <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {kpi.label}
            </span>

            <p className="font-serif text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
              {kpi.value}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
            <span>{kpi.detail}</span>

            {kpi.indicator === "text" && (
              <span className="text-[10px] font-medium text-primary">
                {kpi.indicatorText}
              </span>
            )}

            {kpi.indicator === "dot" && (
              <span className="h-2 w-2 rounded-full bg-primary" />
            )}

            {kpi.indicator === "icon" && kpi.icon}
          </div>
        </div>
      ))}
    </section>
  );
}
