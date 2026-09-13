import { type LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type KpiVariant = "primary" | "secondary" | "accent" | "destructive";

interface KpiCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  description: string;
  variant?: KpiVariant;
}

const gradientStyles: Record<KpiVariant, string> = {
  primary: "from-primary/15 via-primary/5 to-transparent",

  secondary: "from-secondary/25 via-secondary/10 to-transparent",

  accent: "from-accent/25 via-accent/10 to-transparent",

  destructive: "from-destructive/10 via-destructive/5 to-transparent",
};

const iconStyles: Record<KpiVariant, string> = {
  primary: "bg-primary/10 text-primary",

  secondary: "bg-secondary text-secondary-foreground",

  accent: "bg-accent text-accent-foreground",

  destructive: "bg-destructive/10 text-destructive",
};

export function KpiCard({
  icon: Icon,
  value,
  label,
  description,
  variant = "primary",
}: KpiCardProps) {
  return (
    <Card
      className={
        [
          "overflow-hidden",
          "border-border/60",
          "bg-linear-to-br",
          gradientStyles[variant],
          "shadow-sm",
          "transition-all duration-200",
          "hover:-translate-y-0.5 hover:shadow-md",
        ].join(" ") + " py-0"
      }
    >
      <CardContent className="p-5">
        {/* Icon */}
        <div
          className={[
            "flex h-10 w-10 items-center justify-center",
            "rounded-lg",
            iconStyles[variant],
          ].join(" ")}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>

        {/* Value */}
        <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {value}
        </p>

        {/* Label */}
        <p className="mt-1 text-sm font-medium text-foreground">{label}</p>

        {/* Small text */}
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
