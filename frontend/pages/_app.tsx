import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";
import { AuthProvider } from "@/context/AuthProvider";
import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isPublicRoute = [
    "/auth/login",
    "/auth/signup",
    "/auth/forgot-password",
    "/",
  ].includes(router.pathname);

  return (
    <ConfigProvider
      theme={{
        token: {},
        components: {
          Button: {},
        },
      }}
    >
      <AuthProvider>
        {isPublicRoute ? (
          <Component {...pageProps} />
        ) : (
          <AppLayout>
            <ProtectedRoute>
              <Component {...pageProps} />
            </ProtectedRoute>
          </AppLayout>
        )}
      </AuthProvider>
    </ConfigProvider>
  );
}
