import api from "../base/base";
import endpoints from "../base/endpoint";
import { Appointment } from "./types";

export const createAppointment = async (
  appointment: Appointment
): Promise<Appointment | string> => {
  try {
    const response = await api.post(endpoints.appointments.create, appointment);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    } else if (error.response) {
      return error.response.statusText || "An error occurred";
    } else if (error.request) {
      return "No response from server";
    } else {
      return error.message || "An unknown error occurred";
    }
  }
};

export const getAppointmentByDoctorId = async (
  id: string,
  date?: string
): Promise<Appointment[] | string> => {
  try {
    const query = date ? `?date=${encodeURIComponent(date)}` : "";
    const response = await api.get(
      `${endpoints.appointments.getByDoctor(id)}${query}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    } else if (error.response) {
      return error.response.statusText || "An error occurred";
    } else if (error.request) {
      return "No response from server";
    } else {
      return error.message || "An unknown error occurred";
    }
  }
};

export const getAppointmentByPatientId = async (
  id: string,
  date?: string
): Promise<Appointment[] | string> => {
  try {
    const query = date ? `?date=${encodeURIComponent(date)}` : "";
    const response = await api.get(
      `${endpoints.appointments.getByPatient(id)}${query}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    } else if (error.response) {
      return error.response.statusText || "An error occurred";
    } else if (error.request) {
      return "No response from server";
    } else {
      return error.message || "An unknown error occurred";
    }
  }
};

export const changeStatusOfAppointment = async (
  appointmentId: string,
  status: string
): Promise<Appointment | string> => {
  try {
    const payload = { status };

    const response = await api.put(
      endpoints.appointments.updateStatus(appointmentId),
      payload
    );

    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    } else if (error.response) {
      return error.response.statusText || "An error occurred";
    } else if (error.request) {
      return "No response from server";
    } else {
      return error.message || "An unknown error occurred";
    }
  }
};
