import type { ReactNode } from "react";

import { InputField } from "@/components/shared/InputField";
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

import { useCreateRoomTypeFacade } from "../hooks/useCreateRoomType";

export function NewRoomTypeModal({ children }: { children: ReactNode }) {
  const { handleSubmit, submit, register, errors, isPending } =
    useCreateRoomTypeFacade();
  console.log(errors);
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Create New Room Type
          </DialogTitle>
          <DialogDescription>
            Add the room type details, pricing, capacity, and description below.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-4 overflow-y-scroll"
        >
          <InputField
            label="Room Type Name"
            placeholder="e.g. Deluxe King Room"
            error={errors.name?.message}
            disabled={isPending}
            autoComplete={"off"}
            {...register("name")}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Base Price"
              placeholder="e.g. 2500"
              error={errors.basePrice?.message}
              disabled={isPending}
              autoComplete={"off"}
              {...register("basePrice")}
            />

            <InputField
              label="Guest Capacity"
              placeholder="e.g. 2"
              error={errors.capacity?.message}
              disabled={isPending}
              autoComplete={"off"}
              {...register("capacity")}
            />
          </div>

          <TextareaField
            label="Room Description"
            placeholder="e.g. Spacious room with a king-size bed, private bathroom, and city view."
            error={errors.description?.message}
            disabled={isPending}
            autoComplete={"off"}
            {...register("description")}
          />

          <DialogFooter className="flex gap-2 sm:flex-row sm:justify-end">
            <DialogClose>
              <Button type="button" variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Saving..." : "Create Room Type"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
