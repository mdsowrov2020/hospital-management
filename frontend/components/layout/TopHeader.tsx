import React, { useEffect, useState } from "react";
import { Layout, Dropdown, Avatar, Menu, theme, Spin } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { getProfile } from "@/lib/api/profile/service";
import { useAuth } from "@/context/AuthProvider";

const { Header } = Layout;

const TopHeader = () => {
  const [profile, setProfile] = useState();
  const { user, logout, loading } = useAuth();
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
      if (user?.role !== "admin") {
        const data = await getProfile();
        setProfile(data);
      }
    };
    fetchProfile();
  }, [user?.role]); // Run only when user's role is available

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
      : profile?.fullName || user?.name || "User";

  return (
    <Header
      style={{
        padding: "0 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
      }}
    >
      <p style={{ color: "rgba(0, 0, 0, 0.85)", margin: 0 }}>I am Header</p>

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
