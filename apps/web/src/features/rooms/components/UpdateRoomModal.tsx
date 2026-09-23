import { Controller } from "react-hook-form";

import { InputField } from "@/components/shared/InputField";
import { SelectField } from "@/components/shared/SelectField";
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
import { HOUSEKEEPING_STATUS, OCCUPANCY_STATUS } from "@/constants";
import { useRoomTypeList } from "@/features/roomTypes/hooks/useRoomTypeList";

import { useUpdateRoomFacade } from "../hooks/useUpdateRoom";
import type { RoomList } from "../room.types";

type UpdateRoomModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  room: RoomList;
};

export function UpdateRoomModal({
  open,
  onOpenChange,
  room,
}: UpdateRoomModalProps) {
  const { handleSubmit, submit, register, errors, isPending, control } =
    useUpdateRoomFacade(room.id);
  const { items } = useRoomTypeList();
  const roomTypeOptions = items?.map((i) => ({
    id: i.id,
    name: i.name,
  }));
  const occupancyOptions = OCCUPANCY_STATUS?.map((o) => ({
    id: o,
    name: o[0] + o.slice(1).toLowerCase().replaceAll("_", " "),
  }));
  const housekeepingOptions = HOUSEKEEPING_STATUS?.map((h) => ({
    id: h,
    name: h[0] + h.slice(1).toLowerCase().replaceAll("_", " "),
  }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Update Room
          </DialogTitle>
          <DialogDescription>
            Update the room name, capacity, base price, and description. Your
            changes will be saved immediately after you submit.
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
              {...register("name", { value: room.name || "" })}
              disabled={isPending}
              error={errors.name?.message}
            />
            <InputField
              label="Room Number"
              type="number"
              placeholder="e.g. 101"
              {...register("roomNumber", { value: room.roomNumber })}
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
              {...register("floor", { value: room.floor })}
              disabled={isPending}
              error={errors.floor?.message}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <SelectField
              name="occupancyStatus"
              label="Occupancy Status"
              control={control}
              options={occupancyOptions}
              error={errors.occupancyStatus?.message}
              disabled={isPending}
            />

            <SelectField
              name="housekeepingStatus"
              label="Housekeeping Status"
              control={control}
              options={housekeepingOptions}
              error={errors.occupancyStatus?.message}
              disabled={isPending}
            />
          </div>

          <TextareaField
            label="Description"
            placeholder="Add any notes about this room (optional)"
            {...register("description", { value: room.description || "" })}
            disabled={isPending}
            error={errors.description?.message}
          />

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-1">
              <Label htmlFor="isActive">Active</Label>
              <p className="text-sm text-muted-foreground">
                Enable this room so it can be assigned to rooms.
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
