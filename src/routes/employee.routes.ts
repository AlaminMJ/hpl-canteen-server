import { Router } from 'express';
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from '../controllers/employee.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createEmployeeSchema } from '../schemas/employee.schema';

const router = Router();

router.use(authenticate);

router.get('/', authorize('manage_employees'), getAllEmployees);
router.get('/:id', authorize('manage_employees'), getEmployeeById);
router.post('/', authorize('manage_employees'), validate(createEmployeeSchema), createEmployee);
router.put('/:id', authorize('manage_employees'), validate(createEmployeeSchema), updateEmployee);
router.delete('/:id', authorize('admin'), deleteEmployee); // Only admin can delete

export default router;
