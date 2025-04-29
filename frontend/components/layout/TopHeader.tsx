import React, { useState } from "react";
import { Layout, Dropdown, Avatar, Menu, theme } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";

const { Header } = Layout;

const TopHeader = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleMenuClick = (e) => {
    if (e.key === "logout") {
      // Handle logout logic here
      console.log("Logout clicked");
    } else if (e.key === "editProfile") {
      // Handle edit profile logic here
      console.log("Edit Profile clicked");
    }
    setDropdownVisible(false);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="editProfile">Edit Profile</Menu.Item>
      <Menu.Item key="settings">Settings</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

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
            John Doe
          </span>
          <DownOutlined style={{ color: "rgba(0, 0, 0, 0.65)" }} />
        </div>
      </Dropdown>
    </Header>
  );
};

export default TopHeader;
