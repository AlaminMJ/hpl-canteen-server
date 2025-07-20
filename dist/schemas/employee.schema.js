"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployeeSchema = void 0;
const zod_1 = require("zod");
exports.createEmployeeSchema = zod_1.z.object({
    name: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string().min(6),
    designation: zod_1.z.string().min(2),
    department: zod_1.z.string().length(24), // Mongo ObjectId
    status: zod_1.z.enum(['active', 'inactive']).optional(),
});
