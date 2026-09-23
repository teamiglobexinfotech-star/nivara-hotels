import type { ReactNode } from "react";
import { Controller } from "react-hook-form";

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
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-tight">
            New Room
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-4 overflow-y-scroll"
        >
          <InputField
            label="Room Number"
            type="number"
            placeholder="Room Number"
            {...register("roomNumber")}
            disabled={isPending}
            error={errors.roomNumber?.message}
          />

          <div className="grid grid-cols-2 gap-4">
            <SelectField
              name="roomTypeId"
              label="Select Room Type"
              control={control}
              options={dummyRoomTypes}
            />
            <InputField
              label="Floor"
              type="number"
              placeholder="Floor"
              {...register("floor")}
              disabled={isPending}
              error={errors.roomNumber?.message}
            />
          </div>

          <TextareaField
            label="Description"
            placeholder="Enter description"
            {...register("description")}
            disabled={isPending}
            error={errors.description?.message}
          />

          <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <DialogClose>
              <Button type="button" variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
