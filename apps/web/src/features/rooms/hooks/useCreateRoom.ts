import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { notifyError } from "@/lib/notification";

import { roomKeys, roomMutationKeys } from "../room.keys";
import { roomService } from "../room.service";
import { type CreateRoom,CreateRoomSchema } from "../schema/createRoom.schema";

function useCreateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: roomMutationKeys.create,
    mutationFn: roomService.create,

    onSuccess: (res) => {
      toast.success(res?.message || "Room created successfully.");

      queryClient.invalidateQueries({
        queryKey: roomKeys.lists(),
      });
    },

    onError: notifyError,
  });
}

export function useCreateRoomFacade() {
  const { mutate, isPending, isSuccess } = useCreateRoom();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm<z.input<typeof CreateRoomSchema>>({
    resolver: zodResolver(CreateRoomSchema),
  });

  return {
    submit: (data: CreateRoom) => mutate(data),
    isPending,
    control,
    isSuccess,
    register,
    handleSubmit,
    errors,
    getValues,
    reset,
  };
}
