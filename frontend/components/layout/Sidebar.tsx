import React from "react";
import {
  AppstoreOutlined,
  FileOutlined,
  SnippetsOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";

const { Sider } = Layout;

// Helper function to create menu items with proper structure
const createMenuItems = (role) => {
  const allItems = [
    {
      key: "1",
      icon: <AppstoreOutlined />,
      label: <Link href="/">Dashboards</Link>,
      roles: ["admin"],
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: <Link href="/doctors">Doctors</Link>,
      roles: ["admin"],
    },
    {
      key: "3",
      icon: <SnippetsOutlined />,
      label: <Link href="/appointments">Appointments</Link>,
      roles: ["admin", "doctor", "patient"],
    },
    {
      key: "4",
      icon: <FileOutlined />,
      label: <Link href="/medical-records">Medical records</Link>,
      roles: ["admin", "doctor", "patient"],
    },
    {
      key: "5",
      icon: <UsergroupAddOutlined />,
      label: <Link href="/patients">Patients</Link>,
      roles: ["admin"],
    },
  ];

  return allItems
    .filter((item) => !item.roles || (role && item.roles.includes(role)))
    .map((item) => ({
      key: item.key,
      icon: item.icon,
      label: item.label,
    }));
};

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ background: "white", height: "100vh", border: "none" }}
      width={250}
    >
      <div />
      <Menu
        defaultSelectedKeys={["1"]}
        items={createMenuItems(user?.role)}
        style={{ background: "transparent", border: "none" }}
      />
    </Sider>
  );
};

export default Sidebar;
