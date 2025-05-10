import React, { useEffect, useState } from "react";
import { Layout, Dropdown, Avatar, Menu, theme, Spin } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { getProfile } from "@/lib/api/profile/service";
import { useAuth } from "@/context/AuthProvider";
import CustomBreadCrumb from "../ui/CustomBreadCrumb";

const { Header } = Layout;

const TopHeader = () => {
  const [profile, setProfile] = useState();
  const { user, logout, loading, doctorProfile, patientProfile } = useAuth();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleMenuClick = async (e) => {
    if (e.key === "logout") {
      setIsLoggingOut(true);
      try {
        await logout();
      } finally {
        setIsLoggingOut(false);
      }
    } else if (e.key === "editProfile") {
      console.log("Edit Profile clicked");
    }
    setDropdownVisible(false);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user || !user.role || user.role === "admin") return;

      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setProfile(undefined);
      }
    };

    fetchProfile();
  }, [user?.role]);

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="editProfile">Edit Profile</Menu.Item>
      <Menu.Item key="settings">Settings</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  const displayName =
    user?.role === "admin"
      ? "Admin"
      : doctorProfile?.fullName ||
        patientProfile?.fullName ||
        user?.email ||
        "User";

  return (
    <Header
      style={{
        padding: "0 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        height: "70px",
      }}
    >
      <CustomBreadCrumb />

      <Spin spinning={isLoggingOut}>
        <Dropdown
          overlay={menu}
          trigger={["click"]}
          visible={dropdownVisible}
          onVisibleChange={(flag) => setDropdownVisible(flag)}
        >
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Avatar
              size="default"
              icon={<UserOutlined />}
              style={{ marginRight: 8 }}
            />
            <span style={{ color: "rgba(0, 0, 0, 0.85)", marginRight: 8 }}>
              {displayName}
            </span>
            <DownOutlined style={{ color: "rgba(0, 0, 0, 0.65)" }} />
          </div>
        </Dropdown>
      </Spin>
    </Header>
  );
};

export default TopHeader;
