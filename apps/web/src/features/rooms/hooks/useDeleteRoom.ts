import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { roomKeys, roomMutationKeys } from "../room.keys";
import { roomService } from "../room.service";

export function useDeleteRoom() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: roomMutationKeys.delete,
    mutationFn: roomService.delete,

    onSuccess: (res) => {
      toast.success(res?.message || "Room deleted successfully.");

      queryClient.invalidateQueries({
        queryKey: roomKeys.lists(),
      });
    },

    onError: notifyError,
  });

  return {
    isDeleting: isPending,
    handleDelete: (id: string) => mutate(id),
  };
}
