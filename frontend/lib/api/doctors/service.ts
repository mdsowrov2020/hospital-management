import api from "../base/base";
import endpoints from "../base/endpoint";
import { Doctor } from "./types";

// Get all doctors
export const getDoctors = async (): Promise<Doctor[]> => {
  const response = await api.get(endpoints.doctors.list);
  return response.data;
};

// Get a doctor by ID
export const getDoctorById = async (id: number): Promise<Doctor> => {
  const response = await api.get(`${endpoints.doctors.detail}/${String(id)}`);
  return response.data;
};

// Create a new doctor
export const createDoctor = async (
  doctorData: Partial<Doctor>
): Promise<Doctor> => {
  const response = await api.post(endpoints.doctors.create, doctorData);
  return response.data;
};

// Update an existing doctor
export const updateDoctor = async (
  id: number,
  doctorData: Partial<Doctor>
): Promise<Doctor> => {
  const response = await api.put(
    endpoints.doctors.update(String(id)),
    doctorData
  );
  return response.data;
};
