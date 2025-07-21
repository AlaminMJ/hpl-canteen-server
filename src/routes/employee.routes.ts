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

router.get('/',  getAllEmployees);
router.get('/:id', getEmployeeById);
router.post('/', authorize(['admin']), validate(createEmployeeSchema), createEmployee);
router.put('/:id', authorize(['admin']), validate(createEmployeeSchema), updateEmployee);
router.delete('/:id', authorize(['admin']), deleteEmployee); // Only admin can delete

export default router;
