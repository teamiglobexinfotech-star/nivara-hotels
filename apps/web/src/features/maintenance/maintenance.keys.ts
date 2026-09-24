import type { ListParams } from "@/types/shared.types";

export const maintenanceKeys = {
  all: ["maintenance"] as const,
  lists: () => ["maintenance", "list"] as const,
  list: (params?: ListParams) => ["maintenance", "list", params] as const,
  detail: (id: string) => ["maintenance", "detail", id] as const,
} as const;

export const maintenanceMutationKeys = {
  create: ["maintenance", "create"] as const,
  update: ["maintenance", "update"] as const,
  delete: ["maintenance", "delete"] as const,
} as const;
