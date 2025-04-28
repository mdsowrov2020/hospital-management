export type AppointmentStatus = "scheduled" | "completed" | "cancelled";

export interface Appointment {
  id: number;
  doctorId: number;
  patientId: number;
  appointmentDate: string;
  appointmentTime: string;
  status: AppointmentStatus;
  reason?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAppointmentDto {
  doctorId: number;
  patientId: number;
  appointmentDate: string;
  appointmentTime: string;
  reason?: string;
  notes?: string;
}

export interface UpdateAppointmentDto {
  doctorId?: number;
  patientId?: number;
  appointmentDate?: string;
  appointmentTime?: string;
  status?: AppointmentStatus;
  reason?: string;
  notes?: string;
}

export interface AppointmentFilter {
  doctorId?: number;
  patientId?: number;
  dateRange?: {
    start: string;
    end: string;
  };
  status?: AppointmentStatus;
}
