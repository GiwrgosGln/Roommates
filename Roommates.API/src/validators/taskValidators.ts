import { z } from "zod";

export const createTaskSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must not exceed 100 characters"),
    description: z
      .string()
      .max(500, "Description must not exceed 500 characters")
      .optional(),
    household_id: z.number().positive("Household ID must be positive"),
  }),
});
