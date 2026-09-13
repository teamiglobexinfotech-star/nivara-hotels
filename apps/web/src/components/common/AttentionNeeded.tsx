import { AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type AttentionStatus = "urgent" | "in-progress" | "pending" | "resolved";

export type AttentionItem = {
  id: string;
  title: string;
  room: string;
  reportedBy: string;
  time: string;
  status: AttentionStatus;
  actionLabel: string;
  icon?: React.ReactNode;
};

type AttentionNeededProps = {
  title?: string;
  items: AttentionItem[];
  onAction?: (item: AttentionItem) => void;
  onViewAll?: () => void;
  className?: string;
};

const statusConfig: Record<
  AttentionStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  urgent: {
    label: "Urgent",
    variant: "destructive",
  },
  "in-progress": {
    label: "In progress",
    variant: "secondary",
  },
  pending: {
    label: "Pending",
    variant: "outline",
  },
  resolved: {
    label: "Resolved",
    variant: "default",
  },
};

function AttentionItemRow({
  item,
  onAction,
}: {
  item: AttentionItem;
  onAction?: (item: AttentionItem) => void;
}) {
  const status = statusConfig[item.status];

  return (
    <div className="flex items-center gap-3 px-4 py-4">
      {/* Icon */}
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-md",
          item.status === "urgent" && "bg-destructive/10 text-destructive",
          item.status === "in-progress" && "bg-primary/10 text-primary",
          item.status === "pending" && "bg-muted text-muted-foreground",
          item.status === "resolved" && "bg-muted text-muted-foreground"
        )}
      >
        {item.icon ?? <AlertCircle className="size-4" />}
      </div>

      {/* Main content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate text-sm font-medium text-foreground">
            {item.title}
          </p>

          <Badge
            variant={status.variant}
            className="h-5 px-2 text-[11px] capitalize"
          >
            {status.label}
          </Badge>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
          <span>{item.room}</span>

          <span aria-hidden="true">·</span>

          <span>{item.reportedBy}</span>

          <span aria-hidden="true">·</span>

          <span>{item.time}</span>
        </div>
      </div>

      {/* Action */}
      <Button
        variant={item.status === "pending" ? "secondary" : "outline"}
        size="sm"
        className="shrink-0"
        onClick={() => onAction?.(item)}
      >
        {item.actionLabel}
      </Button>
    </div>
  );
}

export function AttentionNeeded({
  title = "Attention Needed",
  items,
  onAction,
  onViewAll,
  className,
}: AttentionNeededProps) {
  return (
    <Card
      className={cn("h-fit w-full overflow-hidden rounded-xl py-0", className)}
    >
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b bg-muted/30 px-5 py-4">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-semibold tracking-tight">
            {title}
          </CardTitle>
          <Badge
            variant="destructive"
            className="rounded-full px-2 py-0.5 text-[11px]"
          >
            {items.length} items
          </Badge>
        </div>

        {onViewAll && (
          <Button
            type="button"
            variant="link"
            onClick={onViewAll}
            className="shrink-0 px-0 text-sm font-semibold"
          >
            View All
            <span aria-hidden="true">→</span>
          </Button>
        )}
      </CardHeader>

      {/* Items */}
      <CardContent className="p-0">
        {items.map((item, index) => (
          <div key={item.id}>
            <AttentionItemRow item={item} onAction={onAction} />

            {index < items.length - 1 && <Separator />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
