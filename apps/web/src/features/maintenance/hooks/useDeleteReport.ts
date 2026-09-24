import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { maintenanceKeys, maintenanceMutationKeys } from "../maintenance.keys";
import { maintenanceService } from "../maintenance.service";

export function useDeleteReport() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: maintenanceMutationKeys.delete,
    mutationFn: maintenanceService.delete,

    onSuccess: (res) => {
      toast.success(res?.message || "Report deleted successfully");

      queryClient.invalidateQueries({
        queryKey: maintenanceKeys.lists(),
      });
    },

    onError: notifyError,
  });

  return {
    isDeleting: isPending,
    handleDelete: (id: string) => mutate(id),
  };
}
