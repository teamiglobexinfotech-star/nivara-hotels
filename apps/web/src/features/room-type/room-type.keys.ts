export const roomTypeKeys = {
  all: ["room-types"] as const,
} as const;

export const roomTypeMutationKeys = {
  create: ["room-types", "create"] as const,
  delete: ["room-types", "delete"] as const,
  update: ["room-types", "update"] as const,
} as const;
