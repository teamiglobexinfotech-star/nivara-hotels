import { Check } from "lucide-react";
import { useState } from "react";

import { InputField } from "@/components/shared/InputField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDebounce } from "@/hooks/useDebounce";

import { useHousekeeperList } from "../hooks/useHousekeeperList";
import { useSaveTaskFacade } from "../hooks/useSaveTask";
import type { Report } from "../maintenance.types";

type AssignTaskModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: Report;
};

export function AssignTaskModal({
  open,
  onOpenChange,
  report,
}: AssignTaskModalProps) {
  const [search, setSearch] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { handleSubmit, register, submit, isPending } = useSaveTaskFacade();
  const query = useDebounce(search, 400);
  const { housekeepers } = useHousekeeperList(query);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Assign Task
          </DialogTitle>
          <DialogDescription>
            Select a housekeeper to assign this task.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <InputField
            label="Search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="max-h-72 overflow-y-scroll">
            {housekeepers.map((housekeeper) => {
              const isSelected = selectedId === housekeeper.id;

              return (
                <button
                  key={housekeeper.id}
                  type="button"
                  onClick={() => setSelectedId(housekeeper.id)}
                  className={[
                    "flex w-full items-center gap-3 rounded-md p-3 text-left",
                    "transition-colors",
                    "hover:bg-muted",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                    isSelected && "bg-muted",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {/* Selection indicator */}
                  <div
                    className={[
                      "flex size-5 shrink-0 items-center justify-center rounded-full border",
                      isSelected &&
                        "border-primary bg-primary text-primary-foreground",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {isSelected && <Check className="size-3" />}
                  </div>

                  {/* Housekeeper */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {housekeeper.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {housekeeper.totalTasks}{" "}
                      {housekeeper.totalTasks === 1
                        ? "active task"
                        : "active tasks"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <DialogFooter>
          <form onSubmit={handleSubmit(submit)}>
            {selectedId && (
              <>
                <input
                  type="hidden"
                  defaultValue={selectedId}
                  {...register("housekeeperId")}
                />
                <br />
                <input
                  type="hidden"
                  {...register("maintenanceId", { value: report.id })}
                />
                <br />
              </>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>

            <Button type="submit" disabled={!selectedId || isPending}>
              Assign Task
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
