import { Router } from "express";

import { validateLogin, validateRegister } from "../utils/validators.js";
import {
  getCurrentUser,
  login,
  register,
  registerAdminController,
} from "../controllers/auth/auth.controller.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post(
  "/admin/register",
  authenticate,
  authorize(["admin"]),
  registerAdminController
);

router.get("/me", authenticate, getCurrentUser);

export default router;
