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

import { useCreateRoomFacade } from "../hooks/useCreateRoom";
import { dummyRoomTypes } from "../room.mock";

export function NewRoomModal({ children }: { children: ReactNode }) {
  const { handleSubmit, submit, register, errors, isPending, control } =
    useCreateRoomFacade();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="p-0 sm:max-w-120">
        <DialogHeader className="border-b px-6 py-5">
          <DialogTitle className="text-xl">Create New Room</DialogTitle>
          <DialogDescription>
            Add a new room by entering its number, type, floor, and an optional
            description.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)}>
          <div className="max-h-[65vh] space-y-5 overflow-y-auto px-6 py-5">
            <InputField
              label="Room Number"
              type="number"
              placeholder="e.g. 101"
              {...register("roomNumber")}
              disabled={isPending}
              error={errors.roomNumber?.message}
            />

            <div className="grid grid-cols-2 gap-4">
              <SelectField
                name="roomTypeId"
                label="Room Type"
                control={control}
                options={dummyRoomTypes}
                error={errors.roomTypeId?.message}
                disabled={isPending}
              />

              <InputField
                label="Floor"
                type="number"
                placeholder="e.g. 1"
                {...register("floor")}
                disabled={isPending}
                error={errors.floor?.message}
              />
            </div>

            <TextareaField
              label="Description"
              placeholder="Add any notes about this room (optional)"
              {...register("description")}
              disabled={isPending}
              error={errors.description?.message}
            />
          </div>

          <DialogFooter className="sticky bottom-0 border-t bg-background px-6 py-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Room"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
