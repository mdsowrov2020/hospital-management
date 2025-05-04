import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const {
    isAuthenticated,
    loading,
    profileLoading,
    profileLoaded,
    profileError,
    user,
  } = useAuth();
  const router = useRouter();

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(`/auth/login?redirect=${encodeURIComponent(router.asPath)}`);
    }
  }, [isAuthenticated, loading, router]);

  if (loading || (!isAdmin && profileLoading)) {
    return <div>Loading authentication and profile...</div>;
  }

  if (!isAdmin && profileError) {
    return <div>Error loading profile: {profileError}</div>;
  }

  if (!isAuthenticated) return null;

  return children;
};

export default ProtectedRoute;
