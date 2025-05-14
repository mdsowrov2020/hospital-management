import React from "react";
import { Button, Layout, Menu } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/router";
import UserMenu from "../common/UserMenu";

const { Header } = Layout;

const items = [
  { key: "home", label: <span className="menu-item">HOME</span> },
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
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        padding: "0 24px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        height: "64px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Left: Menu */}
      <Menu
        mode="horizontal"
        selectedKeys={["home"]}
        items={items}
        style={{
          borderBottom: "none",
          fontWeight: 500,
          fontSize: "16px",
          backgroundColor: "transparent",
          height: "64px",
          display: "flex",
          alignItems: "center",
        }}
      />

      {/* Right: Buttons and UserMenu */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {!isAuthenticated ? (
          <Button
            type="default"
            size="large"
            onClick={() => router.push("/auth/login")}
            style={{
              padding: "0 20px",
              borderRadius: "8px",
              border: "2px solid #1890ff",
              color: "#1890ff",
              fontWeight: 600,
              transition: "0.3s",
              height: "40px",
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
          <>
            {user?.role === "patient" && (
              <Button
                type="primary"
                size="large"
                className="custom-button"
                icon={<PlusOutlined />}
                onClick={createAppointment}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0 20px",
                  borderRadius: "8px",
                  height: "40px",
                  fontWeight: 600,
                }}
              >
                GET APPOINTMENT
              </Button>
            )}
            <UserMenu />
          </>
        )}
      </div>
    </Header>
  );
};

export default Navbar;
