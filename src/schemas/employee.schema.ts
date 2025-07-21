import { z } from "zod";

export const createEmployeeSchema = z.object({
  name: z.string().min(3),
  rfid: z.number().min(1),
  id: z.number().min(1),
  designation: z.string().min(2),
  department: z.string().length(24), // Mongo ObjectId
  status: z.enum(["active", "inactive"]).optional(),
});

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
