import AppointmentForm from "@/components/appointments/AppointmentForm";
import { useAuth } from "@/context/AuthProvider";
import React from "react";

const CreateAppointment = () => {
  const { patientProfile } = useAuth();
  const { id } = patientProfile;

  const handleSubmit = (data) => {
    console.log("Form submitted:", data);
  };
  return (
    <AppointmentForm patientId={id} onSubmit={(data) => handleSubmit(data)} />
  );
};

export default CreateAppointment;
