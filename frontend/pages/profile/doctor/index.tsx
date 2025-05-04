// pages/profile/index.tsx
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DoctorProfileCard from "@/components/doctors/DoctorProfileCard";
import { useAuth } from "@/context/AuthProvider";

const DoctorProfile = () => {
  const { isAuthenticated, profileLoaded, doctorProfile, user } = useAuth();

  if (!isAuthenticated) return null;

  if (user?.role !== "doctor") {
    return <p>This page is for doctors only.</p>;
  }

  if (!profileLoaded) {
    return <p>Loading profile...</p>;
  }

  if (!doctorProfile) {
    return <p>No doctor profile available.</p>;
  }

  return <DoctorProfileCard profile={doctorProfile} />;
};

export default function DoctorProfilePage() {
  return <DoctorProfile />;
}
