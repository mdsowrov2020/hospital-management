import AppointmentForm from "@/components/appointments/AppointmentForm";
import { useAuth } from "@/context/AuthProvider";
import React from "react";

const CreateAppointment = () => {
  const { patientProfile } = useAuth();
  const { id } = patientProfile;
  return (
    <AppointmentForm
      patientId={id}
      onSubmit={(data) => {
        console.log("Form submitted:", data);
      }}
    />
  );
};

export default CreateAppointment;
