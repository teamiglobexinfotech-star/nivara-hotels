import type { ReactNode } from "react";
import { Broom, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type StaffTask = {
  id: string;
  name: string;
  icon?: ReactNode;
  total: number;
  completed?: number;
  pending?: number;
  inProgress?: number;
  totalLabel?: string;
};

type StaffTasksProps = {
  title?: string;
  tasks: StaffTask[];
  onViewAll?: () => void;
  className?: string;
};

const defaultIcons: Record<string, ReactNode> = {
  housekeeping: <Broom className="size-4" />,
  maintenance: <Wrench className="size-4" />,
};

function StaffTaskRow({ task }: { task: StaffTask }) {
  const icon = task.icon ?? defaultIcons[task.name.toLowerCase()] ?? null;

  return (
    <div className="flex items-center gap-4 py-4">
      {/* Category */}
      <div className="flex min-w-32 items-center gap-2">
        <div
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-md",
            "bg-muted text-muted-foreground"
          )}
        >
          {icon}
        </div>

        <span className="text-sm font-medium text-foreground">{task.name}</span>
      </div>

      {/* Statistics */}
      <div className="flex flex-1 flex-wrap items-center gap-x-8 gap-y-2">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-foreground">
            {task.total}
          </span>

          <span className="text-sm text-muted-foreground">
            {task.totalLabel ?? "tasks"}
          </span>
        </div>

        {task.completed !== undefined && (
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-foreground">
              {task.completed}
            </span>

            <span className="text-sm text-muted-foreground">completed</span>
          </div>
        )}

        {task.pending !== undefined && (
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-foreground">
              {task.pending}
            </span>

            <span className="text-sm text-muted-foreground">pending</span>
          </div>
        )}

        {task.inProgress !== undefined && (
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-foreground">
              {task.inProgress}
            </span>

            <span className="text-sm text-muted-foreground">in progress</span>
          </div>
        )}
      </div>
    </div>
  );
}

function StaffTasks({
  title = "Staff & Tasks",
  tasks,
  onViewAll,
  className,
}: StaffTasksProps) {
  return (
    <Card
      className={cn("h-fit w-full overflow-hidden rounded-xl py-0", className)}
    >
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b bg-muted/30 px-5 py-4">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>

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

      <CardContent className="py-1">
        {tasks.map((task, index) => (
          <div key={task.id}>
            <StaffTaskRow task={task} />

            {index < tasks.length - 1 && <Separator />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

const staffTasks: StaffTask[] = [
  {
    id: "housekeeping",
    name: "Housekeeping",
    total: 8,
    completed: 5,
    pending: 3,
  },
  {
    id: "maintenance",
    name: "Maintenance",
    total: 5,
    inProgress: 2,
    totalLabel: "reports",
  },
];

export function DashboardStaffTasks() {
  return (
    <StaffTasks
      tasks={staffTasks}
      onViewAll={() => {
        console.log("Opening all staff tasks...");
      }}
    />
  );
}
