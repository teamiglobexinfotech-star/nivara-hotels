import z from "zod";
import { email, password } from "./signup.schema";

export const LoginSchema = z
  .object({
    email,
    password,
  })
  .strict();

export type Login = z.infer<typeof LoginSchema>;
