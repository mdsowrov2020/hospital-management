import AppLayout from "@/components/layout/AppLayout";
import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        token: {},
        components: {
          Button: {},
        },
      }}
    >
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ConfigProvider>
  );
  // return <Component {...pageProps} />;
}
