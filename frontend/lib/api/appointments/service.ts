import { apirequest } from "@/utils/apiHelpers";
import endpoints from "../base/endpoint";
import {
  Appointment,
  CreateAppointmentDto,
  UpdateAppointmentDto,
  AppointmentFilter,
  AppointmentStatus,
} from "./types";

export const getAppointments = async (
  filter?: AppointmentFilter
): Promise<Appointment[]> => {
  let url = endpoints.appointments.list;

  if (filter) {
    const params = new URLSearchParams();
    if (filter.doctorId) params.append("doctorId", filter.doctorId.toString());
    if (filter.patientId)
      params.append("patientId", filter.patientId.toString());
    if (filter.status) params.append("status", filter.status);
    if (filter.dateRange) {
      params.append("startDate", filter.dateRange.start);
      params.append("endDate", filter.dateRange.end);
    }

    url += `?${params.toString()}`;
  }

  return apirequest<Appointment[]>(url);
};

export const getAppointment = async (id: number): Promise<Appointment> => {
  return apirequest<Appointment>(endpoints.appointments.detail(id.toString()));
};

export const createAppointment = async (
  appointmentData: CreateAppointmentDto
): Promise<Appointment> => {
  return apirequest<Appointment>(endpoints.appointments.base, {
    method: "POST",
    body: appointmentData,
  });
};

export const updateAppointment = async (
  id: number,
  appointmentData: UpdateAppointmentDto
): Promise<Appointment> => {
  return apirequest<Appointment>(endpoints.appointments.detail(id.toString()), {
    method: "PATCH",
    body: appointmentData,
  });
};

export const cancelAppointment = async (id: number): Promise<Appointment> => {
  return apirequest<Appointment>(
    `${endpoints.appointments.detail(id.toString())}/cancel`,
    { method: "POST" }
  );
};

export const completeAppointment = async (id: number): Promise<Appointment> => {
  return apirequest<Appointment>(
    `${endpoints.appointments.detail(id.toString())}/complete`,
    { method: "POST" }
  );
};

// Specialized queries
export const getDoctorAppointments = async (
  doctorId: number,
  dateRange?: { start: string; end: string }
): Promise<Appointment[]> => {
  let url = `${endpoints.appointments.base}/doctor/${doctorId}`;

  if (dateRange) {
    url += `?start=${dateRange.start}&end=${dateRange.end}`;
  }

  return apirequest<Appointment[]>(url);
};

export const getPatientAppointments = async (
  patientId: number,
  status?: AppointmentStatus
): Promise<Appointment[]> => {
  let url = `${endpoints.appointments.base}/patient/${patientId}`;

  if (status) {
    url += `?status=${status}`;
  }

  return apirequest<Appointment[]>(url);
};
