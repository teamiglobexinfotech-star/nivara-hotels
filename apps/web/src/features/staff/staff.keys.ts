import type { ListParams } from "@/types/shared.types";

export const staffKeys = {
  all: ["staff"] as const,
  lists: () => ["staff", "list"] as const,
  list: (params?: ListParams) => ["staff", "list", params] as const,
  detail: (id: string) => ["staff", "detail", id] as const,
} as const;

export const staffMutationKeys = {
  create: ["staff", "create"] as const,
  update: ["staff", "update"] as const,
  delete: ["staff", "delete"] as const,
} as const;
