import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { maintenanceService } from "../maintenance.service";
import {
  type SaveHousekeepingTask,
  SaveHousekeepingTaskSchema,
} from "../schema/save-task.schema";

function useSaveTask() {
  return useMutation({
    mutationKey: ["tasks", "save"],
    mutationFn: maintenanceService.saveTask,

    onSuccess: (res) => {
      toast.success(res?.message || "Task saved successfully");
    },

    onError: notifyError,
  });
}

export function useSaveTaskFacade() {
  const { mutate, isPending, isSuccess } = useSaveTask();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(SaveHousekeepingTaskSchema),
  });

  return {
    submit: (data: SaveHousekeepingTask) => mutate(data),
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
