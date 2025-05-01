import { getCurrentUser } from "@/lib/api/auth/service";
import { User } from "@/lib/api/users/type";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string, userData: User) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUserData = async (): Promise<User> => {
    try {
      return await getCurrentUser();
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      throw err;
    }
  };

  const refreshUser = async () => {
    try {
      const userData = await fetchUserData();
      setUser(userData);
    } catch (err) {
      console.error("Failed to refresh user data:", err);
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
      const userData = await fetchUserData();
      setUser(userData);
      setToken(storedToken);
    } catch (error) {
      console.error("Token verification failed:", error);
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeAuth();

    // Handle storage events (for cross-tab synchronization)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token") {
        if (e.newValue === null) {
          // Token was removed
          setToken(null);
          setUser(null);
        } else if (e.newValue !== token) {
          // Token was updated
          initializeAuth();
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = async (token: string, userData: User) => {
    try {
      localStorage.setItem("token", token);
      setToken(token);
      setUser(userData);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        refreshUser,
        isAuthenticated,
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
