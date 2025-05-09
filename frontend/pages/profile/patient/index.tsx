import PatientProfile from "@/components/patients/PatientProfile";
import { useAuth } from "@/context/AuthProvider";
import { getProfile } from "@/lib/api/profile/service";
import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";

const PatientProfilePage = () => {
  const { isAuthenticated, loading, user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated && !loading) {
        try {
          setIsLoadingProfile(true);
          const profileData = await getProfile();
          setProfile(profileData);
        } catch (err) {
          setError(err.message || "Failed to fetch profile");
          console.error("Profile fetch error:", err);
        } finally {
          setIsLoadingProfile(false);
        }
      }
    };

    fetchProfile();
  }, [isAuthenticated, loading]);

  if (isLoadingProfile && !isAuthenticated) return <p>Loading ..</p>;
  return (
    <>
      {" "}
      <PatientProfile profile={profile ? profile : {}} />
    </>
  );
};

export default PatientProfilePage;
