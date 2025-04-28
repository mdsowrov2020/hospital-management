import React from "react";
import {
  AppstoreOutlined,
  BookOutlined,
  FileOutlined,
  SnippetsOutlined,
  UploadOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Link from "next/link";

const { Sider } = Layout;

const items = [
  {
    key: "1",
    icon: <AppstoreOutlined />,
    label: <Link href="/">Dashboards</Link>,
  },
  {
    key: "2",
    icon: <UserOutlined />,
    label: <Link href="/doctors">Doctors</Link>,
  },
  {
    key: "3",
    icon: <SnippetsOutlined />,
    label: <Link href="/appointments">Appointments</Link>,
  },
  {
    key: "4",
    icon: <FileOutlined />,
    label: <Link href="/medical-records">Medical records</Link>,
  },
  {
    key: "5",
    icon: <UsergroupAddOutlined />,
    label: <Link href="/patients">Patients</Link>,
  },
];

const Sidebar = () => {
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{ background: "white", height: "100vh", border: "none" }}
      width={250}
    >
      <div />
      <Menu
        // theme="dark"
        // mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
        style={{ background: "transparent", border: "none" }}
      />
    </Sider>
  );
};

export default Sidebar;
