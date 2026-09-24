import type { ListParams } from "@/types/shared.types";

export const customerKeys = {
  all: ["customers"] as const,
  lists: () => ["customers", "list"] as const,
  list: (params?: ListParams) => ["customers", "list", params] as const,
  detail: (id: string) => ["customers", "detail", id] as const,
} as const;

export const customerMutationKeys = {
  create: ["customers", "create"] as const,
  update: ["customers", "update"] as const,
  delete: ["customers", "delete"] as const,
} as const;
