import { z } from "zod";

export const registrationSchema = z.object({
    user_name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(30, "Must be less than 30 characters")
      .refine((value) => /^[A-Z]/.test(value), {
        message: "Name must start with a capital letter",
      }),
    email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email address"),
    phone_num: z
        .string()
        .min(1, "Phone number is required")
        .refine((value) => /^\d{7,15}$/.test(value), {
            message: "Phone number must be between 7 and 15 digits",
        }),
    password: z
        .string()
        .min(4, "Password must be at least 4 characters long"),
    passwordConfirm: z
        .string({ required_error: "Password Confirmation is required" })
        .min(1),
    role: z
        .string({ required_error: "Role is required" })
        .refine((value) => value === "tenant" || value === "owner", {
            message: 'Role must be either "tenant" or "owner"',
        }),
});
