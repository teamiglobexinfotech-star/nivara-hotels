import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { notifyError } from "@/lib/notification";
import { customerService } from "../customer.service";

export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: ["customers", "deleteCustomer"],
    mutationFn: customerService.deleteCustomer,
    onSuccess: (res) => {
      toast.success(res?.message || "Customer deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["customers", "customers"],
      });
    },
    onError: notifyError,
  });

  return {
    isDeleting: isPending,
    deleteCustomer: mutate,
  };
}
