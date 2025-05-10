import { Router } from "express";
import {
  createAppointment,
  deleteAppointment,
  getAppointment,
  getAppointments,
  getAppointmentsByDoctorID,
  getAppointmentsByPatientId,
  updateAppointment,
  updateStatusByID,
} from "../controllers/appointment.controller.js";

const router = Router();

router.get("/", getAppointments);
router.post("/", createAppointment);
router.get("/:id", getAppointment);
router.get("/by-patient/:patientId", getAppointmentsByPatientId);
router.get("/by-doctor/:doctorId", getAppointmentsByDoctorID);

router.put("/:id", updateAppointment);
router.put("/:id/change-status", updateStatusByID);
router.delete("/:id", deleteAppointment);

export default router;
