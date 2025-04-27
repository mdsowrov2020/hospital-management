import { useRouter } from "next/router";
import { Avatar, Dropdown, Layout, Menu, Space, Typography } from "antd";
import React from "react";
const { Header, Content, Sider } = Layout;
const { Text } = Typography;
import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
  MedicineBoxOutlined, // Replaced HospitalIcon with actual Ant Design icon
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const AppLayout = ({ children }) => {
  const router = useRouter();

  // Mock user data - replace with your actual user data
  const currentUser = {
    name: "Dr. John Doe",
    email: "john.doe@example.com",
    role: "admin",
  };

  // Generate user initials
  const userInitials = currentUser.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  // Profile dropdown items
  const profileItems = [
    {
      key: "profile",
      label: (
        <Space>
          <UserOutlined />
          <Text>Profile</Text>
        </Space>
      ),
    },
    {
      key: "settings",
      label: (
        <Space>
          <SettingOutlined />
          <Text>Settings</Text>
        </Space>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: (
        <Space>
          <LogoutOutlined />
          <Text>Logout</Text>
        </Space>
      ),
    },
  ];

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: <DashboardOutlined /> },
    { key: "patients", label: "Patients", icon: <TeamOutlined /> },
    { key: "doctors", label: "Doctors", icon: <UserOutlined /> },
    { key: "appointments", label: "Appointments", icon: <CalendarOutlined /> },
    {
      key: "medical-records",
      label: "Medical Records",
      icon: <FileTextOutlined />,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible theme="light">
        <div
          className="logo"
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MedicineBoxOutlined style={{ fontSize: 24 }} />
          <span style={{ marginLeft: 8, fontWeight: "bold" }}>MediCare</span>
        </div>
        <Menu
          theme="light"
          selectedKeys={[router.pathname.split("/")[1]]}
          items={menuItems}
          onSelect={({ key }) => router.push(`/${key}`)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Dropdown
            menu={{ items: profileItems }}
            placement="bottomRight"
            arrow
          >
            <Space style={{ padding: "0 24px", cursor: "pointer" }}>
              <Avatar style={{ backgroundColor: "#1890ff" }}>
                {userInitials}
              </Avatar>
              <Text strong>{currentUser.name}</Text>
            </Space>
          </Dropdown>
        </Header>
        <Content
          style={{ margin: "24px 16px", padding: 24, background: "#fff" }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
