import React from "react";
import { Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const TopHeader = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Header style={{ padding: 0, background: "red" }}>
      <p>I am Header</p>
    </Header>
  );
};

export default TopHeader;
