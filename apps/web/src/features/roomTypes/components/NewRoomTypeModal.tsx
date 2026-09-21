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

export function NewAmenityModal({ children }: { children: ReactNode }) {
  const { handleSubmit, submit, register, errors, isPending } =
    useCreateRoomTypeFacade();

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Create New Room Type
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new room type
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-4 overflow-y-scroll"
        >
          <InputField
            label="Amenity Name"
            placeholder="e.g. Free Wi-Fi"
            error={errors.name?.message}
            disabled={isPending}
            {...register("name")}
          />

          <TextareaField
            label="Description"
            placeholder="Briefly describe this amenity..."
            error={errors.description?.message}
            disabled={isPending}
            {...register("description")}
          />

          <DialogFooter className="flex gap-2 sm:flex-row sm:justify-end">
            <DialogClose>
              <Button type="button" variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
