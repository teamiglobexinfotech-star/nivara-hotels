export const roomTypeKeys = {
  all: ["roomTypes"] as const,
  list: () => ["roomTypes", "list"] as const,
} as const;

export const roomTypeMutationKeys = {
  create: ["roomTypes", "create"] as const,
  update: ["roomTypes", "update"] as const,
  delete: ["roomTypes", "delete"] as const,
} as const;
