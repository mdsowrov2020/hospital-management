import { Router } from "express";
import {
  createMedicalRecord,
  getMedicalRecords,
} from "../controllers/medical.controller.js";

const router = Router();

router.post("/", createMedicalRecord);
router.get("/", getMedicalRecords);

export default router;
