import { useAuth } from "@/context/AuthProvider";
import React from "react";
import PatientProfilePage from "./patient";
import DoctorProfilePage from "./doctor";

const Profilemain = () => {
  const { user } = useAuth();
  return (
    <>
      {user?.role === "patient" ? (
        <PatientProfilePage />
      ) : (
        <DoctorProfilePage />
      )}
    </>
  );
};

export default Profilemain;
