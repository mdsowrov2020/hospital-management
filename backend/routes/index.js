import { Router } from "express";
import userRoutes from "./user.routes.js";
import appointmentRoutes from "./appointment.routes.js";
import medicalRoutes from "./medical.routes.js";
import doctorRoutes from "./doctor.routes.js";
import patientRoutes from "./patient.routes.js";
const router = Router();

router.use("/users", userRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/medical-records", medicalRoutes);
router.use("/doctors", doctorRoutes);
router.use("/patients", patientRoutes);

export default router;
