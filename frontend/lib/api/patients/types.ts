import { User } from "../users/type";

export interface Patient {
  id: number;
  userId: number;
  fullName: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  bloodType?: string;
  address?: string;
  phoneNumber: string;
  User: User;
}

export interface CreatePatientData {
  userId: number;
  fullName: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  bloodType?: string;
  address?: string;
  phoneNumber: string;
}
