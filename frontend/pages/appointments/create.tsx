import AppointmentForm from "@/components/appointments/AppointmentForm";
import { useAuth } from "@/context/AuthProvider";
import { createAppointment } from "@/lib/api/appointments/service";
import React from "react";
import toast from "react-hot-toast";

const CreateAppointment = () => {
  const { patientProfile } = useAuth();
  const { id } = patientProfile;

  const handleSubmit = async (data) => {
    try {
      if (!data) return;
      const res = await createAppointment(data);

      if (typeof res === "string") {
        toast.error(res); // This is an error message
      } else {
        toast.success("Appointment created successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return <AppointmentForm patientId={id} onSubmit={handleSubmit} />;
};

export default CreateAppointment;
