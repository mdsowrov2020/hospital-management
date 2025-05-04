export interface PatientProfile {
  id: number;
  fullName: string;
  userId: number;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  address: string;
  phoneNumber: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  role: string;
}

type Gender = "male" | "female" | "other";
type UserRole = "patient" | "doctor" | "admin" | "staff";
type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface DoctorProfile {
  id: number;
  fullName: string;
  userId: number;
  specialization: string;
  licenseNumber: string;
  dateOfBirth: string;
  department: string;
  consultationFee: number;
  gender: Gender;
  availableDays: DayOfWeek[];
  availableHours: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  role: UserRole;
}
