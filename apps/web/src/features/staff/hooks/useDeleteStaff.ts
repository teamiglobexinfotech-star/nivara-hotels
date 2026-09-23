import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { staffKeys, staffMutationKeys } from "../staff.keys";
import { staffService } from "../staff.service";

export function useDeleteStaff() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: staffMutationKeys.delete,
    mutationFn: staffService.delete,

    onSuccess: (res) => {
      toast.success(res?.message || "Staff deleted successfully.");

      queryClient.invalidateQueries({
        queryKey: staffKeys.lists(),
      });
    },

    onError: notifyError,
  });

  return {
    isDeleting: isPending,
    handleDelete: (id: string) => mutate(id),
  };
}
