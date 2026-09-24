import { z } from "zod";

export const prioritySchema = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"], {
  error: "Please select a valid priority.",
});
export const categorySchema = z.enum(
  ["ELECTRICAL", "PLUMBING", "HVAC", "FURNITURE", "APPLIANCE", "OTHER"],
  {
    error: "Please select a valid category.",
  }
);
export const description = z
  .string()
  .trim()
  .min(1, "Please provide a description of the issue.")
  .min(10, "Please provide a little more detail about the issue.")
  .max(500, "Please provide a little less detail about the issue.");
export const roomNumber = z.coerce
  .number()
  .int("Room number must be a whole number.")
  .positive("Please enter a valid room number.")
  .min(1, "Room number must be at least 1.")
  .max(1000, "Room number must be at most 1000.");

export const createReportSchema = z.object({
  category: categorySchema,
  priority: prioritySchema,
  description,
  roomNumber,
});

export type CreateReport = z.infer<typeof createReportSchema>;
