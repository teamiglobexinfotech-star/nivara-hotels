import { Controller } from "react-hook-form";

import { InputField } from "@/components/shared/InputField";
import { TextareaField } from "@/components/shared/TextareaField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { useUpdateRoomTypeFacade } from "../hooks/useUpdateRoomType";
import type { RoomType } from "../roomType.types";

type UpdateRoomTypeModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roomType: RoomType;
};

export function UpdateRoomTypeModal({
  open,
  onOpenChange,
  roomType,
}: UpdateRoomTypeModalProps) {
  const { handleSubmit, submit, register, errors, isPending, control } =
    useUpdateRoomTypeFacade(roomType.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Update Room Type
          </DialogTitle>
          <DialogDescription>
            Update the room type name, capacity, base price, and description.
            Your changes will be saved immediately after you submit.
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
            {...register("name", { value: roomType.name })}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Base Price"
              placeholder="e.g. 2500"
              error={errors.basePrice?.message}
              disabled={isPending}
              autoComplete={"off"}
              {...register("basePrice", { value: roomType.basePrice })}
            />

            <InputField
              label="Guest Capacity"
              placeholder="e.g. 2"
              error={errors.capacity?.message}
              disabled={isPending}
              autoComplete={"off"}
              {...register("capacity", { value: roomType.capacity })}
            />
          </div>

          <TextareaField
            label="Room Description"
            placeholder="e.g. Spacious room with a king-size bed, private bathroom, and city view."
            error={errors.description?.message}
            disabled={isPending}
            autoComplete={"off"}
            {...register("description", { value: roomType?.description || "" })}
          />

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-1">
              <Label htmlFor="isActive">Active</Label>
              <p className="text-sm text-muted-foreground">
                Enable this room type so it can be assigned to rooms.
              </p>
            </div>

            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <Switch
                  id="isActive"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isPending}
                />
              )}
            />
          </div>

          <DialogFooter className="flex gap-2 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Close
            </Button>

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Saving..." : "Update Room Type"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
