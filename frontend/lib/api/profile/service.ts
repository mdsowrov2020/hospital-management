import api from "../base/base";
import endpoints from "../base/endpoint";
import { CreateDoctorData, Doctor } from "../doctors/types";
import { CreatePatientData, Patient } from "../patients/types";

export const updatePatientProfile = async (
  patientData: Partial<CreatePatientData>
): Promise<Patient> => {
  const response = await api.put(`${endpoints.profile.update}`, patientData);
  return response.data;
};

export const updateDoctorProfile = async (
  doctorData: Partial<CreateDoctorData>
): Promise<Doctor> => {
  const response = await api.put(`${endpoints.profile.update}`, doctorData);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get(`${endpoints.profile.get}`);
  return response.data;
};
