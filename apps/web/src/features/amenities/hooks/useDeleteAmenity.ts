import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { amenityKeys, amenityMutationKeys } from "../amenity.keys";
import { amenityService } from "../amenity.service";

export function useDeleteAmenity() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: amenityMutationKeys.delete,
    mutationFn: amenityService.delete,
    onSuccess: (res) => {
      toast.success(res?.message || "Amenity deleted successfully.");

      queryClient.invalidateQueries({
        queryKey: amenityKeys.all,
      });
    },
    onError: notifyError,
  });

  return {
    isPending,
    handleDelete: (id: string) => mutate(id),
  };
}
