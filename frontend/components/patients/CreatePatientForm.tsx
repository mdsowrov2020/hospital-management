import React from "react";
import { Form, Input, Button, DatePicker, Select, Row, Col, Card } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const CreatePatientForm: React.FC<{ onSubmit: (values: any) => void }> = ({
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    const formatted = {
      ...values,
      dateOfBirth: values.dateOfBirth ? values.dateOfBirth.toISOString() : null,
    };
    onSubmit(formatted);
  };

  return (
    <Card
      title="Create Patient Profile"
      style={{ maxWidth: 800, margin: "40px auto", borderRadius: 12 }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ gender: null, bloodType: null }}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[{ required: true, message: "Please enter full name" }]}
            >
              <Input placeholder="Enter full name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="dateOfBirth"
              label="Date of Birth"
              rules={[
                { required: true, message: "Please select date of birth" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please select gender" }]}
            >
              <Select placeholder="Select gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="bloodType"
              label="Blood Type"
              rules={[{ required: true, message: "Please select blood type" }]}
            >
              <Select placeholder="Select blood type">
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (type) => (
                    <Option key={type} value={type}>
                      {type}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter phone number" },
                { pattern: /^[0-9]{10,15}$/, message: "Invalid phone number" },
              ]}
            >
              <Input placeholder="e.g. 0123456789" />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Please enter address" }]}
            >
              <Input.TextArea rows={3} placeholder="Enter full address" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Create Profile
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreatePatientForm;
