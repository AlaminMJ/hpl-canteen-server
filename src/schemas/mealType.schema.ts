import { z } from 'zod';

export const mealTypeSchema = z.object({
  name: z.string().min(3),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid start time"),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid end time"),
  lastRequisition: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid requisition time"),
});

export type MealTypeInput = z.infer<typeof mealTypeSchema>;
