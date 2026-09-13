import type { ReactNode } from "react";
import {
  AlertTriangle,
  CalendarDays,
  Check,
  CreditCard,
  KeyRound,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type ActivityType =
  | "payment"
  | "booking"
  | "housekeeping"
  | "keycard"
  | "maintenance"
  | "default";

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  type?: ActivityType;
  icon?: ReactNode;
};

type RecentActivityProps = {
  title?: string;
  subtitle?: string;
  activities: ActivityItem[];
  className?: string;
};

const activityConfig: Record<
  ActivityType,
  {
    icon: ReactNode;
    className: string;
  }
> = {
  payment: {
    icon: <CreditCard className="size-4" />,
    className: "bg-primary/10 text-primary",
  },

  booking: {
    icon: <CalendarDays className="size-4" />,
    className: "bg-secondary text-secondary-foreground",
  },

  housekeeping: {
    icon: <Check className="size-4" />,
    className: "bg-muted text-muted-foreground",
  },

  keycard: {
    icon: <KeyRound className="size-4" />,
    className: "bg-muted text-muted-foreground",
  },

  maintenance: {
    icon: <AlertTriangle className="size-4" />,
    className: "bg-destructive/10 text-destructive",
  },

  default: {
    icon: <Check className="size-4" />,
    className: "bg-muted text-muted-foreground",
  },
};

function ActivityRow({ activity }: { activity: ActivityItem }) {
  const config = activityConfig[activity.type ?? "default"];

  return (
    <div className="flex items-center gap-4 px-5 py-3.5">
      {/* Icon */}
      <div
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-full",
          config.className
        )}
      >
        {activity.icon ?? config.icon}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-base leading-5 font-medium text-foreground">
          {activity.title}
        </p>

        <p className="mt-0.5 truncate text-sm leading-5 font-medium text-muted-foreground">
          {activity.description}
          <span className="mx-2">·</span>
          {activity.time}
        </p>
      </div>
    </div>
  );
}

export function RecentActivity({
  title = "Recent Activity",
  subtitle = "Real-time system actions & updates",
  activities,
  className,
}: RecentActivityProps) {
  return (
    <Card className={cn("w-full overflow-hidden rounded-xl py-0", className)}>
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b bg-muted/30 px-5 py-4">
        <div>
          <CardTitle className="text-lg font-semibold tracking-tight">
            {title}
          </CardTitle>

          <p className="text-base text-muted-foreground">{subtitle}</p>
        </div>
      </CardHeader>

      {/* Activities */}
      <CardContent className="p-0">
        {activities.map((activity) => (
          <ActivityRow key={activity.id} activity={activity} />
        ))}
      </CardContent>
    </Card>
  );
}
