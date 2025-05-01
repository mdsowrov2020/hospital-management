import { useState } from "react";
import { useRouter } from "next/router";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Typography,
  Divider,
  message,
  Row,
  Col,
} from "antd";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Head from "next/head";

const { Title, Text } = Typography;

export default function RegisterPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(values);
      // message.success("Registration successful!");
      // form.resetFields();
      // router.push("/login");
    } catch (error) {
      message.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Register | HMS</title>
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
                Create Your Account
              </Title>
              <Text type="secondary">
                Join our platform to access premium features
              </Text>
            </div>

            <Form
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
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
                  {
                    min: 6,
                    message: "Password must be at least 6 characters!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Password"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Confirm Password"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="isDoctor"
                valuePropName="checked"
                style={{ marginBottom: 24 }}
              >
                <Checkbox>
                  <span
                    style={{ display: "inline-flex", alignItems: "center" }}
                  >
                    <MedicineBoxOutlined
                      style={{ marginRight: 8, color: "#1890ff" }}
                    />
                    I am a medical professional
                  </span>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={loading}
                  style={{ height: 48, fontSize: 16 }}
                >
                  Register
                </Button>
              </Form.Item>

              <Divider>Or</Divider>

              <div style={{ textAlign: "center" }}>
                <Text type="secondary">Already have an account? </Text>
                <Link href="/auth/login" legacyBehavior>
                  <a style={{ fontWeight: 500 }}>Login now</a>
                </Link>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}
