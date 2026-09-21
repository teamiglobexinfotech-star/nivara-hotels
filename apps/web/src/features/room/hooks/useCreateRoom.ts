import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { notifyError } from "@/lib/notification";
import { CreateRoomSchema, type CreateRoom } from "../schema/createRoom.schema";
import { roomService } from "../room.service";
import { roomKeys, roomMutationKeys } from "../room.keys";
import type { z } from "zod";

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
