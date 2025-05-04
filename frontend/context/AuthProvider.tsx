// context/AuthProvider.tsx
import { getCurrentUser } from "@/lib/api/auth/service";
import { User } from "@/lib/api/users/type";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { DoctorProfile, PatientProfile } from "./types";
import { getProfile } from "@/lib/api/profile/service";

type AuthContextType = {
  user: User | null;
  token: string | null;
  patientProfile: PatientProfile | null;
  doctorProfile: DoctorProfile | null;
  loading: boolean;
  profileLoading: boolean;
  profileLoaded: boolean;
  profileError: string | null;
  login: (token: string, userData: User) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
  fetchProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile | null>(
    null
  );
  const [patientProfile, setPatientProfile] = useState<PatientProfile | null>(
    null
  );
  const [profileError, setProfileError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  function isValidDoctorProfile(response: any): response is DoctorProfile {
    return (
      response &&
      typeof response.fullName === "string" &&
      typeof response.specialization === "string"
    );
  }

  function isValidPatientProfile(response: any): response is PatientProfile {
    return (
      response &&
      typeof response.fullName === "string" &&
      typeof response.dateOfBirth === "string"
    );
  }

  const fetchProfileWithUser = async (userToUse: User) => {
    if (userToUse.role === "admin") {
      setProfileLoaded(true);
      return;
    }
    setProfileLoading(true);
    try {
      const response = await getProfile();

      if (userToUse.role === "doctor") {
        if (!isValidDoctorProfile(response)) {
          console.error("Invalid doctor profile structure");
          setProfileLoaded(false);
          return;
        }
        setDoctorProfile(response);
      } else if (userToUse.role === "patient") {
        if (!isValidPatientProfile(response)) {
          console.error("Invalid patient profile structure");
          setProfileLoaded(false);
          return;
        }
        setPatientProfile(response);
      }
      setProfileLoaded(true);
    } catch (error) {
      setProfileError("Failed to load profile");
      setProfileLoaded(false);
    } finally {
      setProfileLoading(false);
    }
  };

  const fetchProfile = async () => {
    if (user) {
      await fetchProfileWithUser(user);
    }
  };

  const refreshUser = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
      await fetchProfileWithUser(userData);
    } catch (err) {
      logout();
    }
  };

  const initializeAuth = async () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setLoading(false);
      return;
    }

    try {
      const userData = await getCurrentUser();
      setUser(userData);
      setToken(storedToken);
      await fetchProfileWithUser(userData);
    } catch (error) {
      console.error("Initialization failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeAuth();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token") {
        if (e.newValue === null) {
          setToken(null);
          setUser(null);
          setDoctorProfile(null);
          setPatientProfile(null);
        } else if (e.newValue !== token) {
          initializeAuth();
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = async (token: string, userData: User) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(userData);
    await fetchProfileWithUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setDoctorProfile(null);
    setPatientProfile(null);
    router.push("/auth/login");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        profileLoading,
        patientProfile,
        doctorProfile,
        profileLoaded,
        profileError,
        loading,
        login,
        logout,
        refreshUser,
        isAuthenticated,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
