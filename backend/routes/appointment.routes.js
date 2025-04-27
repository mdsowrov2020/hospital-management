import { Router } from "express";
import {
  deleteAppointment,
  getAppointment,
  getAppointments,
  updateAppointment,
} from "../controllers/appointment.controller.js";

const router = Router();

router.get("/", getAppointments);
router.get("/:id", getAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;
