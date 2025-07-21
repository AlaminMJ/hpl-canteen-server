import { z } from 'zod';

export const mealConsumptionCreateSchema = z.object({
  employee_Id: z.string().length(24),
  meal_type: z.string().length(24),
  date: z.string().refine((d) => !isNaN(Date.parse(d)), { message: 'Invalid date' }),
  status: z.enum(['Consume', 'Pending']).optional(),
  deviceinfo: z.object({
    floor: z.string().min(1),
  }),
});
