import React from "react";

import Sidebar from "./Sidebar";
import { Layout, theme } from "antd";
import TopHeader from "./TopHeader";

const { Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ padding: 0, margin: 0 }}>
      <Sidebar />

      <Layout>
        <TopHeader />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height: "80vh",
              overflowY: "auto",
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Developed by Md Sowrov</Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
