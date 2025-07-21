import { Router } from 'express';
import {
  getAllMealTypes,
  getMealTypeById,
  createMealType,
  updateMealType,
  deleteMealType,
} from '../controllers/mealType.controller';
import { mealTypeSchema } from '../schemas/mealType.schema';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', authorize(['admin']), getAllMealTypes);
router.get('/:id', authorize(['admin']), getMealTypeById);
router.post('/', authorize(['admin']), validate(mealTypeSchema), createMealType);
router.put('/:id', authorize(['admin']), validate(mealTypeSchema), updateMealType);
router.delete('/:id', authorize(['admin']), deleteMealType); // Only admin can delete

export default router;
