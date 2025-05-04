import React from "react";
import { Button, Layout, Menu } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/router";
const { Header } = Layout;
const items = [
  {
    key: "home",
    label: <span className="menu-item">HOME</span>,
  },

  {
    key: "specialization",
    label: <span className="menu-item">SPECIALIZATION</span>,
  },
];

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const createAppointment = () => {
    if (isAuthenticated) {
      router.push("/profile/patient/appointment/create");
    } else {
      router.push("/auth/login");
    }
  };
  return (
    <div>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "transparent",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <div className="navbar">
          <Menu
            mode="horizontal"
            selectedKeys={["home"]}
            items={items}
            className="custom-menu"
          />
        </div>
        <div className="appointment-btn">
          <Button
            type="primary"
            size="large"
            className="custom-button"
            icon={<PlusOutlined />}
            onClick={createAppointment}
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            GET APPOINTMENT
          </Button>
        </div>
      </Header>
    </div>
  );
};

export default Navbar;
