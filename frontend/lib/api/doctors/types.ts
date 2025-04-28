export interface Doctor {
  id: number;
  userId: number;
  specialization: string;
  licenseNumber: string;
  department: string;
  availableDays: string[];
  availableHours: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateDoctorDto {
  userId: number;
  specialization: string;
  licenseNumber: string;
  department: string;
  availableDays: string[];
  availableHours: string;
}

export type UpdateDoctorDto = Partial<CreateDoctorDto>;
