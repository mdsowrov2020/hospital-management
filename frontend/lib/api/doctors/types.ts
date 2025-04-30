import { User } from "../users/type";

export interface Doctor {
  id: number;
  userId: number;
  specialization: string;
  licenseNumber: string;
  department: string;
  consultationFee?: number;
  availableDays: string[];
  availableHours: string;
  user?: User;
}

export interface CreateDoctorData {
  userId: number;
  specialization: string;
  licenseNumber: string;
  department: string;
  consultationFee?: number;
  availableDays: string[];
  availableHours: string;
}
