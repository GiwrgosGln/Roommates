import { z } from "zod";

export const createHouseholdSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(10, "Household name must be at least 2 characters")
      .max(50, "Household name must not exceed 100 characters"),
    address: z.string().optional(),
    city: z.string().optional(),
  }),
});
