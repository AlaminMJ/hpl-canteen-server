import { z } from 'zod';

export const createDepartmentSchema = z.object({
  name: z.string().min(2, 'Department name is required'),
});

export type CreateDepartmentInput = z.infer<typeof createDepartmentSchema>;
