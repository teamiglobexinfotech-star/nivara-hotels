import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { amenityMutationKeys } from "../amenity.keys";
import { amenityService } from "../amenity.service";
import {
  type CreateAmenity,
  createAmenitySchema,
} from "../schema/createAmenity.schema";

export function useCreateAmenity() {
  return useMutation({
    mutationKey: amenityMutationKeys.create,
    mutationFn: (data: CreateAmenity) => amenityService.create(data),
    onSuccess: (res) => {
      toast.success(res?.message || "Amenity created successfully.");
    },
    onError: notifyError,
  });
}

export function useCreateAmenityFacade() {
  const { mutate, isPending, isSuccess } = useCreateAmenity();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm<CreateAmenity>({
    resolver: zodResolver(createAmenitySchema),
    defaultValues: {
      name: "",
      description: "",
      iconKey: "",
      isActive: true,
    },
  });

  return {
    submit: (data: CreateAmenity) => mutate(data),
    isPending,
    isSuccess,
    register,
    handleSubmit,
    errors,
    getValues,
    reset,
  };
}
