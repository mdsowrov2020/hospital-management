import { Router } from "express";
import {
  getProfile,
  updateProfile,
} from "../controllers/profile/profile.controller.js";

const router = Router();

// GET /profile - Get current user's profile
router.get("/", getProfile);

// PUT /profile - Update existing profile
router.put("/", updateProfile);

export default router;
