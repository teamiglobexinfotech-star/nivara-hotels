import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { customerKeys, customerMutationKeys } from "../customer.keys";
import { customerService } from "../customer.service";

export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: customerMutationKeys.delete,
    mutationFn: customerService.delete,
    onSuccess: (res) => {
      toast.success(res?.message || "Customer deleted successfully");
      queryClient.invalidateQueries({
        queryKey: customerKeys.lists(),
      });
    },
    onError: notifyError,
  });

  return {
    isDeleting: isPending,
    handleDelete: mutate,
  };
}
