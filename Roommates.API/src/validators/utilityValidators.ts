import { z } from "zod";

export const createUtilitySchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(255, "Title must not exceed 255 characters"),
    amount: z
      .number()
      .positive("Amount must be a positive number")
      .max(999999.99, "Amount must not exceed 999,999.99"),
    due_date: z
      .string()
      .datetime("Due date must be a valid ISO datetime string"),
    household_id: z.number().positive("Household ID must be positive"),
  }),
});
