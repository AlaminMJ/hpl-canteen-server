import { Router } from "express";
import {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/department.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createDepartmentSchema } from "../schemas/department.schema";

const router = Router();

router.use(authenticate);

router.get("/", getAllDepartments);
router.post(
  "/",
  authorize("admin"),
  validate(createDepartmentSchema),
  createDepartment
);
router.put(
  "/:id",
  authorize("admin"),
  validate(createDepartmentSchema),
  updateDepartment
);
router.delete("/:id", authorize("admin"), deleteDepartment);

export default router;
