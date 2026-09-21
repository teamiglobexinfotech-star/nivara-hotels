import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { notifyError } from "@/lib/notification";
import { roomTypeService } from "../room-type.service";
import { roomTypeKeys, roomTypeMutationKeys } from "../room-type.keys";

export function useDeleteRoomType() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: roomTypeMutationKeys.delete,
    mutationFn: roomTypeService.delete,
    onSuccess: (res) => {
      toast.success(res?.message || "Room type deleted successfully.");

      queryClient.invalidateQueries({
        queryKey: roomTypeKeys.all,
      });
    },
    onError: notifyError,
  });

  return {
    isPending,
    handleDelete: (id: string) => mutate(id),
  };
}
