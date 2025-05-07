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
import styles from "./Sidebar.module.css"; // Create this CSS module file

const { Sider } = Layout;

const menuItems = [
  {
    key: "1",
    icon: <AppstoreOutlined className={styles.menuIcon} />,
    label: <Link href="/">Dashboard</Link>,
    iconType: "default",
    roles: ["admin"],
  },
  {
    key: "2",
    icon: <UserOutlined className={styles.menuIcon} />,
    label: <Link href="/doctors">Doctors</Link>,
    iconType: "blue",
    roles: ["admin"],
  },
  {
    key: "3",
    icon: <SnippetsOutlined className={styles.menuIcon} />,
    label: <Link href="/appointments">Appointments</Link>,
    iconType: "red",
    roles: ["admin", "doctor", "patient"],
  },
  {
    key: "4",
    icon: <FileOutlined className={styles.menuIcon} />,
    label: <Link href="/medical-records">Medical Records</Link>,
    iconType: "green",
    roles: ["admin", "doctor", "patient"],
  },
  {
    key: "5",
    icon: <UsergroupAddOutlined className={styles.menuIcon} />,
    label: <Link href="/patients">Patients</Link>,
    iconType: "gold",
    roles: ["admin"],
  },
];

const Sidebar = () => {
  const { user } = useAuth();

  const filteredItems = menuItems.filter(
    (item) => !item.roles || (user?.role && item.roles.includes(user.role))
  );

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      width={250}
      className={styles.sidebarContainer}
    >
      <div className={styles.logoContainer}>
        <h2 className={styles.logoText}>HMS</h2>
      </div>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        className={styles.menuContainer}
        items={filteredItems.map((item) => ({
          ...item,
          className: `${styles.menuItem} ${styles[item.iconType + "Icon"]}`,
        }))}
      />
    </Sider>
  );
};

export default Sidebar;
