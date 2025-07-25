import { Router } from "express";
import { createMealConsumption } from "../controllers/mealConsumption.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { mealConsumptionCreateSchema } from "../schemas/mealConsumption.schema";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  authorize("admin"), // roles allowed to create
  validate(mealConsumptionCreateSchema),
  createMealConsumption
);

export default router;
