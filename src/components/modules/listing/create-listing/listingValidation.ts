import { z } from "zod";

export const listingValidationSchema = z.object({
  propertyTitle: z.string().min(5).max(100),
  areaSize: z.number().positive(),
  houseType: z.enum(["Apartment", "Duplex", "Single Family", "Shared Room", "Penthouse"]),
  rentalHouseLocation: z
    .string()
    .min(1, "Rental house location is required")
    .trim(),
  house_description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description cannot exceed 500 characters")
    .trim()
    .refine(
      (value) => /^[a-zA-Z0-9\s.,'"\-!?()]+$/.test(value),
      "Description can only include letters, numbers, spaces, and basic punctuation"
    ),
  rentAmount: z
    .number()
    .min(1, "Rent amount must be greater than 0")
    .refine(
      (value) => Number.isFinite(value),
      "Rent amount must be a valid number"
    ),
  numberOfBedrooms: z
    .number()
    .int("Number of bedrooms must be an integer")
    .min(1, "Number of bedrooms must be at least 1")
    .max(10, "Number of bedrooms cannot exceed 10"),
  features: z
    .array(z.string())
    .nonempty("At least one feature is required"),
    rentalImages: z.array(z.string()).optional(),
});