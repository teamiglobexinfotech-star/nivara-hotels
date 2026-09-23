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
import { useRoomTypeList } from "@/features/roomTypes/hooks/useRoomTypeList";

import { useCreateRoomFacade } from "../hooks/useCreateRoom";

export function NewRoomModal({ children }: { children: ReactNode }) {
  const { handleSubmit, submit, register, errors, isPending, control } =
    useCreateRoomFacade();
  const { items } = useRoomTypeList();
  const roomTypeOptions = items?.map((i) => ({
    id: i.id,
    name: i.name,
  }));

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Create New Room
          </DialogTitle>
          <DialogDescription>
            Add a new room by entering its number, type, floor, and an optional
            description.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-4 overflow-y-scroll"
        >
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Room Name"
              placeholder="e.g. Deluxe Garden View"
              {...register("name")}
              disabled={isPending}
              error={errors.name?.message}
            />
            <InputField
              label="Room Number"
              type="number"
              placeholder="e.g. 101"
              {...register("roomNumber")}
              disabled={isPending}
              error={errors.roomNumber?.message}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <SelectField
              name="roomTypeId"
              label="Room Type"
              control={control}
              options={roomTypeOptions}
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

          <DialogFooter className="flex gap-2 sm:flex-row sm:justify-end">
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
