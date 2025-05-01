import { Doctor } from "../doctors/types";
import { Patient } from "../patients/types";

export interface Appointment {
  id: number;
  doctorId: number;
  patientId: number;
  appointmentDate: string;
  appointmentTime: string;
  status: "scheduled" | "completed" | "cancelled";
  reason?: string;
  notes?: string;
  doctor?: Doctor;
  patient?: Patient;
}

export interface CreateAppointmentData {
  doctorId: number;
  patientId: number;
  appointmentDate: string;
  appointmentTime: string;
  reason?: string;
}

export interface UpdateAppointmentData {
  status?: "scheduled" | "completed" | "cancelled";
  notes?: string;
}
