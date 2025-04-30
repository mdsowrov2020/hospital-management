import { Router } from "express";
import userRoutes from "./user.routes.js";
import appointmentRoutes from "./appointment.routes.js";
import medicalRoutes from "./medical.routes.js";
import doctorRoutes from "./doctor.routes.js";
import patientRoutes from "./patient.routes.js";
import authRoutes from "./auth.routes.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

// Public routes (no authentication required)
router.use("/auth", authRoutes);

// Protected routes (require authentication)
// router.use(authenticate);
router.use("/users", userRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/medical-records", medicalRoutes);
router.use("/doctors", doctorRoutes);
router.use("/patients", patientRoutes);

export default router;
