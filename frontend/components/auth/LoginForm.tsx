import { useState } from "react";
import { useRouter } from "next/router";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Divider,
  message,
  Row,
  Col,
} from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import Head from "next/head";
import { useAuth } from "@/context/AuthProvider";
import { loginUser } from "@/lib/api/auth/service";
import toast from "react-hot-toast";
import { getProfile } from "@/lib/api/profile/service";

const { Title, Text } = Typography;

export default function LoginPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await loginUser({
        email: values.email,
        password: values.password,
      });
      login(response.token, response.user);
      const profile = await getProfile();
      toast.success("Successfully logged in..");
      if (response.user.role === "doctor") {
        if (profile.fullName !== null || profile.licenseNumber !== null) {
          router.push("/profile/doctor");
        } else {
          router.push("/profile/patient/create");
        }
      }
      if (response.user.role === "patient") {
        if (profile.fullName !== null) {
          router.push("/profile/patient");
        } else {
          router.push("/profile/patient/create");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login | HMS</title>
      </Head>

      <Row
        justify="center"
        align="middle"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <Card
            bordered={false}
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
            bodyStyle={{ padding: 40 }}
          >
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <Title level={3} style={{ color: "#1890ff", marginBottom: 8 }}>
                Welcome Back
              </Title>
              <Text type="secondary">Sign in to access your account</Text>
            </div>

            <Form
              form={form}
              name="login"
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email!",
                  },
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="your@email.com"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Password"
                  size="large"
                />
              </Form.Item>

              <div style={{ marginBottom: 24, textAlign: "right" }}>
                <Link href="/forgot-password" legacyBehavior>
                  <a style={{ fontSize: 14 }}>Forgot password?</a>
                </Link>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={loading}
                  style={{ height: 48, fontSize: 16 }}
                >
                  Login
                </Button>
              </Form.Item>

              <Divider>New to HealthConnect?</Divider>

              <div style={{ textAlign: "center" }}>
                <Link href="/auth/signup" legacyBehavior>
                  <Button type="default" size="large">
                    Create an account
                  </Button>
                </Link>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}
