export const amenityKeys = {
  all: ["amenities"] as const,
  list: () => ["amenities", "list"] as const,
  detail: (id: string) => ["amenities", "detail", id] as const,
} as const;

export const amenityMutationKeys = {
  create: ["amenities", "create"] as const,
  update: ["amenities", "update"] as const,
  delete: ["amenities", "delete"] as const,
} as const;
