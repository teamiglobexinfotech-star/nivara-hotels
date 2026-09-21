import type { ListParams } from "@/types/shared.types";

export const roomKeys = {
  all: ["rooms"] as const,
  lists: () => ["rooms", "list"] as const,
  list: (params: ListParams) => ["rooms", "list", params] as const,
  detail: (id: string) => ["rooms", "detail", id] as const,
} as const;

export const roomMutationKeys = {
  create: ["rooms", "create"] as const,
} as const;
