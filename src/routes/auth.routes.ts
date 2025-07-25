import { Router } from "express";
import {
  login,
  refresh,
  logout,
  getProtectedData,
} from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, refreshSchema } from "../schemas/auth.schema";

const router = Router();
router.get("/me", authenticate, (req, res) => {
  res.json(req.user);
});
router.post("/login", validate(loginSchema), login);
router.post("/refresh", validate(refreshSchema), refresh);
router.post("/logout", logout);
router.get("/data/protected", authenticate, getProtectedData);

export default router;
