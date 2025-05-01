import api from "../base/base";
import endpoints from "../base/endpoint";
import { CreatePatientData, Patient } from "./types";

export const getPatients = async (): Promise<Patient[]> => {
  const response = await api.get(endpoints.patients.list);
  return response.data;
};

export const getPatientById = async (id: number): Promise<Patient> => {
  const response = await api.get(`${endpoints.patients.detail}/${String(id)}`);
  return response.data;
};

export const createPatient = async (
  patientData: CreatePatientData
): Promise<Patient> => {
  const response = await api.post(endpoints.patients.create, patientData);
  return response.data;
};

export const updatePatient = async (
  id: number,
  patientData: Partial<CreatePatientData>
): Promise<Patient> => {
  const response = await api.put(
    `${endpoints.patients.update}/${String(id)}`,
    patientData
  );
  return response.data;
};
