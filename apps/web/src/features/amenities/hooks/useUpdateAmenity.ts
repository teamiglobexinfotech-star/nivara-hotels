import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { amenityKeys, amenityMutationKeys } from "../amenity.keys";
import { amenityService } from "../amenity.service";
import {
  type UpdateAmenity,
  updateAmenitySchema,
} from "../schema/updateAmenity.schema";

function useUpdateAmenity(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: amenityMutationKeys.update,
    mutationFn: (data: UpdateAmenity) => amenityService.update(id, data),
    onSuccess: (res) => {
      toast.success(res?.message || "Amenity updated successfully.");

      queryClient.invalidateQueries({
        queryKey: amenityKeys.all,
      });
    },
    onError: notifyError,
  });
}

export function useUpdateAmenityFacade(id: string) {
  const { mutate, isPending, isSuccess } = useUpdateAmenity(id);

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm<UpdateAmenity>({
    resolver: zodResolver(updateAmenitySchema),
  });

  return {
    submit: (data: UpdateAmenity) => mutate(data),
    isPending,
    isSuccess,
    register,
    handleSubmit,
    errors,
    getValues,
    reset,
  };
}
