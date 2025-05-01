import { Patient } from "../patients/types";

export interface MedicalRecord {
  id: number;
  patientId: number;
  diagnosis: string;
  treatment?: string;
  medications?: string;
  allergies?: string;
  notes?: string;
  date: string;
  patient?: Patient;
}

export interface CreateMedicalRecordData {
  patientId: number;
  diagnosis: string;
  treatment?: string;
  medications?: string;
  allergies?: string;
  notes?: string;
}
