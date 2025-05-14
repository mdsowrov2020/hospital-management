import api from "../base/base";
import endpoints from "../base/endpoint";
import { MedicalRecord } from "./types";

export const createMedicalRecord = async (
  record: MedicalRecord
): Promise<MedicalRecord | string> => {
  try {
    const response = await api.post(endpoints.medicalRecords.create, record);
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

export const getMedicalRecordsByPatient = async (
  id: string
): Promise<MedicalRecord | string> => {
  try {
    const response = await api.get(endpoints.medicalRecords.getByPatient(id));
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
