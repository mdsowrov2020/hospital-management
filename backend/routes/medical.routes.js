import { Router } from "express";
import {
  createMedicalRecord,
  deleteMedicalRecord,
  getMedicalRecord,
  getMedicalRecords,
  updateMedicalRecord,
} from "../controllers/medical.controller.js";

const router = Router();

router.post("/", createMedicalRecord);
router.get("/:patientId/medical-records", getMedicalRecords);
router.get("/:id", getMedicalRecord);
router.put("/:id", updateMedicalRecord);
router.delete("/:id", deleteMedicalRecord);

export default router;
