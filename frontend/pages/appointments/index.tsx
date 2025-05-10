import React from "react";
import { useAuth } from "@/context/AuthProvider";
import DoctorAppointment from "@/components/appointments/DoctorAppointment";

const AppointmentCalendar = () => {
  const { user } = useAuth();

  if (user?.role === "patient") return <p>Patient appointment list</p>;
  if (user?.role === "doctor") return <DoctorAppointment />;

  return <p>Unauthorized or unknown role</p>;
};

export default AppointmentCalendar;
