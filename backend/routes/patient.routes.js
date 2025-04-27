import { Router } from "express";
import {
  createPatient,
  deletePatient,
  getAllPatients,
  getPatient,
  upatePatient,
} from "../controllers/patient.controller.js";
const router = Router();

router.get("/", getAllPatients);
router.get("/:id", getPatient);
router.post("/", createPatient);
router.put("/:id", upatePatient);
router.delete("/:id", deletePatient);
export default router;
