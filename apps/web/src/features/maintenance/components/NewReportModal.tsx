import type { ReactNode } from "react";

import { InputField } from "@/components/shared/InputField";
import { SelectField } from "@/components/shared/SelectField";
import { TextareaField } from "@/components/shared/TextareaField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useCreateReportFacade } from "../hooks/useCreateReport";
import {
  reportCategoryOptions,
  reportPriorityOptions,
} from "../maintenance.constants";

export function NewReportModal({ children }: { children: ReactNode }) {
  const { handleSubmit, register, control, errors, isPending, submit } =
    useCreateReportFacade();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Create a new report
          </DialogTitle>
          <DialogDescription>
            Please provide the details of the report.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-4 overflow-y-scroll"
        >
          <InputField
            label="Room Number"
            placeholder="e.g. 101"
            type="number"
            {...register("roomNumber")}
            disabled={isPending}
            error={errors.roomNumber?.message}
          />
          <div className="grid grid-cols-2 gap-4">
            <SelectField
              name="category"
              label="Category"
              control={control}
              options={reportCategoryOptions}
              error={errors.category?.message}
              disabled={isPending}
            />
            <SelectField
              name="priority"
              label="Priority"
              control={control}
              options={reportPriorityOptions}
              error={errors.priority?.message}
              disabled={isPending}
            />
          </div>
          <TextareaField
            label="Description"
            placeholder="e.g. Electrical issue"
            {...register("description")}
            disabled={isPending}
            error={errors.description?.message}
          />

          <DialogFooter className="flex gap-2 sm:flex-row sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
