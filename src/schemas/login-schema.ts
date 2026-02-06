import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  oneToken: z
    .string()
    .min(6, "One-time token must be exactly 6 digits")
    .max(6, "One-time token must be exactly 6 digits")
    .regex(/^\d+$/, "One-time token must contain only numbers (0-9)")
    .refine((val) => val.length === 6, {
      message: "One-time token must be exactly 6 digits",
    }),
});

export type LoginFormData = z.infer<typeof loginSchema>;