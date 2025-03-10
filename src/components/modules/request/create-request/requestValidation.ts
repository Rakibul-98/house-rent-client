import { z } from "zod";

export const requestValidationSchema = z.object({
    listing: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid listing ID")
      .min(1, "Listing ID is required"),
    message:z.string()
    .min(1, "Tenant ID is required")
    .optional(),
    totalAmount: z
      .number()
      .nonnegative("Total amount must be a non-negative number")
      .min(1, "Total amount must be at least 1"),
    phone: z.string().min(1, "Phone number is required")
});