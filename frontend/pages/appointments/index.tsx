// components/appointments/AppointmentCalendar.tsx
import React from "react";
import { useAuth } from "@/context/AuthProvider";
import DoctorAppointment from "@/components/appointments/DoctorAppointment";
import PatientAppointment from "@/components/appointments/PatientAppointment";

const AppointmentCalendar = () => {
  const { user } = useAuth();

  if (user?.role === "patient") return <PatientAppointment />;
  if (user?.role === "doctor") return <DoctorAppointment />;

  return <p>Unauthorized or unknown role</p>;
};

export default AppointmentCalendar;
