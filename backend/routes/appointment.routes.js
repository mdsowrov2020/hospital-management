import { Router } from "express";
import {
  createAppointment,
  deleteAppointment,
  getAppointment,
  getAppointmentByPatientId,
  getAppointments,
  updateAppointment,
} from "../controllers/appointment.controller.js";

const router = Router();

router.get("/", getAppointments);
router.post("/", createAppointment);
router.get("/:id", getAppointment);
router.get("/by-patient/:patientId", getAppointmentByPatientId);

router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;
