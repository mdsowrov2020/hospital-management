import { Button, Col, Row, Typography } from "antd";
import Image from "next/image";
import { PlusOutlined } from "@ant-design/icons";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/router";

const { Title, Paragraph, Text } = Typography;

export default function Hero() {
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
    <div
      style={{
        padding: "60px 40px",
        background: "#fff",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Row
        gutter={[32, 32]}
        justify="center"
        align="middle"
        style={{ width: "100%" }}
      >
        {/* LEFT CONTENT */}
        <Col xs={24} md={8}>
          <Text style={{ color: "#ef7e7e", fontWeight: 600, letterSpacing: 1 }}>
            TOP DOCTORS
          </Text>
          <Title level={1} style={{ fontSize: 48, margin: "16px 0 0" }}>
            Make Your
            <br />
            Life Healthy
          </Title>
          <Paragraph style={{ fontSize: 18, color: "#555", marginTop: 12 }}>
            Trusted by thousands of patients for specialized care and innovation
            in hospital services.
          </Paragraph>
          <Button
            type="primary"
            size="large"
            className="custom-button"
            icon={<PlusOutlined />}
            onClick={createAppointment}
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            GET APPOINTMENT
          </Button>
        </Col>

        {/* CENTER IMAGE */}
        <Col xs={24} md={12} style={{ textAlign: "center" }}>
          <Image
            src="/doctor-banner.png"
            alt="Doctor Hero"
            width={800}
            height={800}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Col>
      </Row>
    </div>
  );
}
