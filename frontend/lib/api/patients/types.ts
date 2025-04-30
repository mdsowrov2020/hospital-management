import { User } from "../users/type";

export interface Patient {
  id: number;
  userId: number;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  bloodType?: string;
  address?: string;
  phoneNumber: string;
  user?: User;
}

export interface CreatePatientData {
  userId: number;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  bloodType?: string;
  address?: string;
  phoneNumber: string;
}
