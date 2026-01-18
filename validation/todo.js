import { z } from "zod";

export const createTodoSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters ")
    .trim(),

  description: z
    .string()
    .max(500, "Description must be less than 500 character ")
    .optional(),

  priority: z.enum("low", "medium", "high").default("medium"),
});
