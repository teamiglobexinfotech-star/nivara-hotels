import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { notifyError } from "@/lib/notification";

import { roomMutationKeys } from "../room.keys";
import { roomService } from "../room.service";
import {
  type RoomAvailabilityDto,
  roomAvailabilitySchema,
} from "../schema/room-availability.schema";

function useCheckAvailabilityRooms() {
  return useMutation({
    mutationKey: roomMutationKeys.checkAvailability,
    mutationFn: roomService.checkAvailability,
    onError: notifyError,
  });
}

export function useCheckAvailabilityRoomsFacade() {
  const { data, mutate, isPending, isSuccess } = useCheckAvailabilityRooms();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(roomAvailabilitySchema),
  });

  return {
    submit: (data: RoomAvailabilityDto) => mutate(data),
    isPending,
    control,
    isSuccess,
    register,
    handleSubmit,
    errors,
    getValues,
    reset,
    items: data ?? [],
  };
}
