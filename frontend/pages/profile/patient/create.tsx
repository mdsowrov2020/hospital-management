import CreatePatientForm from "@/components/patients/CreatePatientForm";
import PatientProfileForm from "@/components/patients/PatientForm";
import { useAuth } from "@/context/AuthProvider";
import { updatePatientProfile } from "@/lib/api/profile/service";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CreatePatientProfile = () => {
  const { refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleCreate = async (data: any) => {
    try {
      const response = await updatePatientProfile(data);

      if (response) {
        await refreshUser();
        toast.success("Profile successfully created");
        router.push("/profile");
      } else {
        toast.error("Failed to create profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An unexpected error occurred.");
    }
  };
  return <CreatePatientForm onSubmit={handleCreate} />;
};

export default CreatePatientProfile;
