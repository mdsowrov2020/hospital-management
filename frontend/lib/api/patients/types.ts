import { Dayjs } from "dayjs";

export type Gender = "male" | "female" | "other";

export interface Patient {
  id: number;
  userId: number;
  dateOfBirth: string;
  gender: Gender;
  bloodType?: string;
  address?: string;
  phoneNumber: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePatientDto {
  userId: number;
  dateOfBirth: string | Dayjs;
  gender: Gender;
  bloodType?: string;
  address?: string;
  phoneNumber: string;
}

export interface UpdatePatientDto {
  dateOfBirth?: string | Dayjs;
  gender?: Gender;
  bloodType?: string | null;
  address?: string | null;
  phoneNumber?: string;
}

export interface PatientFilter {
  userId?: number;
  gender?: Gender;
  bloodType?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface PatientFormValues {
  userId: number;
  dateOfBirth: Dayjs;
  gender: Gender;
  bloodType?: string;
  address?: string;
  phoneNumber: string;
}
