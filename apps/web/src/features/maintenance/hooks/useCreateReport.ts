import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { maintenanceKeys, maintenanceMutationKeys } from "../maintenance.keys";
import { maintenanceService } from "../maintenance.service";
import {
  type CreateReport,
  createReportSchema,
} from "../schema/createReport.schema";

function useCreateReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: maintenanceMutationKeys.create,
    mutationFn: maintenanceService.create,

    onSuccess: (res) => {
      toast.success(res?.message || "Report created successfully");

      queryClient.invalidateQueries({
        queryKey: maintenanceKeys.lists(),
      });
    },

    onError: notifyError,
  });
}

export function useCreateReportFacade() {
  const { mutate, isPending, isSuccess } = useCreateReport();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(createReportSchema),
  });

  return {
    submit: (data: CreateReport) => mutate(data),
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
