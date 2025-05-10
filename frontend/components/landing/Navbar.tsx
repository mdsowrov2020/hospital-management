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
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const createAppointment = () => {
    if (isAuthenticated && user?.role === "patient") {
      router.push("/appointments/create");
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
          {!isAuthenticated ? (
            <Button
              type="default"
              size="large"
              className="login-button"
              onClick={() => router.push("/auth/login")}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 1.5rem",
                borderRadius: "8px",
                border: "2px solid #1890ff",
                color: "#1890ff",
                fontWeight: "bold",
                letterSpacing: "0.5px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#e6f7ff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              LOGIN
            </Button>
          ) : (
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
          )}
        </div>
      </Header>
    </div>
  );
};

export default Navbar;
