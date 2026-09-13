import z from "zod";

export const email = z.email("Please enter a valid email address");
export const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password must be at most 100 characters");

export const SignupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be at most 100 characters"),
    email,
    password,
  })
  .strict();

export type Signup = z.infer<typeof SignupSchema>;
