import { User } from "../users/type";

export interface Doctor {
  id: number;
  fullName?: string;
  userId: number;
  specialization?: string;
  licenseNumber?: string;
  dateOfBirth?: string;
  department?: string;
  consultationFee?: number;
  gender?: "male" | "female" | "other";
  availableDays?: string[];
  availableHours?: string;
}

export interface CreateDoctorData {
  fullName?: string;
  userId: number;
  specialization?: string;
  licenseNumber?: string;
  dateOfBirth?: string;
  department?: string;
  consultationFee?: number;
  gender?: "male" | "female" | "other";
  availableDays?: string[];
  availableHours?: string;
}
