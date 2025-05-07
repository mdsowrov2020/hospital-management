import { Router } from "express";
import {
  createDoctor,
  deleteDoctor,
  getAvailableDaysById,
  getDoctor,
  getDoctors,
  updateDoctor,
} from "../controllers/doctor.controller.js";

const router = Router();
router.get("/", getDoctors);
router.get("/:id", getDoctor);
router.get("/:id/available-days", getAvailableDaysById);
router.post("/", createDoctor);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);
export default router;
