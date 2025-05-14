// components/common/UserMenu.tsx
import React, { useEffect, useState } from "react";
import { Dropdown, Avatar, Menu, Spin } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/router";
import { getProfile } from "@/lib/api/profile/service";

const UserMenu = () => {
  const [profile, setProfile] = useState();
  const { user, logout, doctorProfile, patientProfile } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleMenuClick = async (e: any) => {
    if (e.key === "logout") {
      setIsLoggingOut(true);
      try {
        await logout();
      } finally {
        setIsLoggingOut(false);
      }
    } else if (e.key === "profile") {
      router.push("/profile");
    } else if (e.key === "settings") {
      router.push("/settings");
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
      <Menu.Item key="profile">Profile</Menu.Item>
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
  );
};

export default UserMenu;
