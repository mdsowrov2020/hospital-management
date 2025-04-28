import { apirequest } from "@/utils/apiHelpers";
import { Doctor, CreateDoctorDto, UpdateDoctorDto } from "./types";
import endpoints from "../base/endpoint";

export const getDoctors = async (): Promise<Doctor[]> => {
  return apirequest<Doctor[]>(endpoints.doctors.list);
};

export const getDoctor = async (id: number): Promise<Doctor> => {
  return apirequest<Doctor>(endpoints.doctors.detail(id.toString()));
};

export const createDoctor = async (
  doctorData: CreateDoctorDto
): Promise<Doctor> => {
  return apirequest<Doctor>(endpoints.doctors.base, {
    method: "POST",
    body: doctorData,
  });
};

export const updateDoctor = async (
  id: number,
  doctorData: UpdateDoctorDto
): Promise<Doctor> => {
  return apirequest<Doctor>(endpoints.doctors.detail(id.toString()), {
    method: "PUT",
    body: doctorData,
  });
};

export const deleteDoctor = async (id: number): Promise<void> => {
  return apirequest<void>(endpoints.doctors.detail(id.toString()), {
    method: "DELETE",
  });
};

// Additional specialized endpoints
export const getDoctorsByDepartment = async (
  department: string
): Promise<Doctor[]> => {
  return apirequest<Doctor[]>(
    `${endpoints.doctors.base}?department=${department}`
  );
};

export const getAvailableDoctors = async (
  day: string,
  hour: string
): Promise<Doctor[]> => {
  return apirequest<Doctor[]>(
    `${endpoints.doctors.base}/availability?day=${day}&hour=${hour}`
  );
};
