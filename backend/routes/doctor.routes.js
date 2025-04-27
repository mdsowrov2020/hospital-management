import { Router } from "express";
import {
  createDoctor,
  deleteDoctor,
  getDoctor,
  getDoctors,
  updateDoctor,
} from "../controllers/doctor.controller.js";

const router = Router();
router.get("/", getDoctors);
router.get("/:id", getDoctor);
router.post("/", createDoctor);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);
export default router;
