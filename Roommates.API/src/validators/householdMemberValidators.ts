import { z } from "zod";

export const createHouseholdMemberSchema = z.object({
  body: z.object({
    user_id: z.number().positive("User ID must be positive"),
    household_id: z.number().positive("Household ID must be positive"),
    role: z
      .string()
      .min(2, "Role must be at least 2 characters")
      .max(50, "Role must not exceed 50 characters"),
  }),
});
