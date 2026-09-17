import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { KpiCard } from "@/types/shared.types";

export function KpiCard({ item, className }: KpiCard) {
  const Icon = item.icon;

  return (
    <Card
      className={cn(
        // Dynamic gradient using theme tokens (subtle transition from card background to muted/accent)
        "relative overflow-hidden border bg-linear-to-br from-card via-card to-muted/40",
        "transition-all duration-300 hover:border-primary/50 hover:shadow-lg",
        className
      )}
    >
      <CardContent className="flex flex-col justify-between gap-4 p-6">
        {/* Top: Title and Icon */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium tracking-wide text-muted-foreground">
            {item.title}
          </span>
          <div className="rounded-xl bg-primary/10 p-2 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        </div>

        {/* Center Left: Value */}
        <div className="flex items-baseline">
          <span className="font-serif text-2xl font-normal tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {item.value}
          </span>
        </div>

        {/* Bottom: Detail */}
        <div className="text-xs font-medium text-muted-foreground/80">
          {item.detail}
        </div>
      </CardContent>
    </Card>
  );
}
