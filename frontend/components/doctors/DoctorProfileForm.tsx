// pages/doctor-profile.tsx
import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Radio,
  Button,
  Row,
  Col,
  Card,
  Typography,
} from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import { updateDoctorProfile } from "@/lib/api/profile/service";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const { Option } = Select;
const { Title } = Typography;

const DoctorProfileForm: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      console.log("Received values of form: ", values);
      const response = await updateDoctorProfile(values);

      if (response) {
        toast.success("Profile successfully created");
        router.push("/profile/doctor");
      } else {
        toast.error("Failed to create profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  // const initialValues = {
  //   fullName: "Dr. Sarah Wilson",
  //   specialization: "Neurology",
  //   licenseNumber: "MD-789012",
  //   dateOfBirth: dayjs("1985-08-20"),
  //   department: "Neuroscience",
  //   consultationFee: 180,
  //   gender: "female",
  //   availableDays: ["Tuesday", "Thursday"],
  //   availableHours: "10:00 AM - 4:00 PM",
  // };
  const initialValues = {
    fullName: null,
    specialization: null,
    licenseNumber: null,
    dateOfBirth: null,
    department: null,
    consultationFee: null,
    gender: null,
    availableDays: null,
    availableHours: null,
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <Card
        title={
          <Title level={3} style={{ color: "#1890ff", margin: 0 }}>
            Provide proper information
          </Title>
        }
        bordered={false}
        style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[
                  { required: true, message: "Please input your full name!" },
                ]}
              >
                <Input size="large" placeholder="Dr. John Doe" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Specialization"
                name="specialization"
                rules={[
                  {
                    required: true,
                    message: "Please input your specialization!",
                  },
                ]}
              >
                <Input size="large" placeholder="Cardiology" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="License Number"
                name="licenseNumber"
                rules={[
                  { required: true, message: "License number is required!" },
                ]}
              >
                <Input size="large" placeholder="MD-123456" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Date of Birth"
                name="dateOfBirth"
                rules={[
                  {
                    required: true,
                    message: "Please select your date of birth!",
                  },
                ]}
              >
                <DatePicker
                  onChange={onDateChange}
                  style={{ width: "100%" }}
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Department"
                name="department"
                rules={[
                  { required: true, message: "Please select your department!" },
                ]}
              >
                <Select size="large" placeholder="Select department">
                  <Option value="Neuroscience">Neuroscience</Option>
                  <Option value="Cardiology">Cardiology</Option>
                  <Option value="Pediatrics">Pediatrics</Option>
                  <Option value="Oncology">Oncology</Option>
                  <Option value="Orthopedics">Orthopedics</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Consultation Fee ($)"
                name="consultationFee"
                rules={[
                  { required: true, message: "Please input consultation fee!" },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  size="large"
                  min={0}
                  formatter={(value) => `$ ${value}`}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  { required: true, message: "Please select your gender!" },
                ]}
              >
                <Radio.Group>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="other">Other</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Available Days"
                name="availableDays"
                rules={[
                  { required: true, message: "Please select available days!" },
                ]}
              >
                <Select mode="multiple" size="large" placeholder="Select days">
                  <Option value="Monday">Monday</Option>
                  <Option value="Tuesday">Tuesday</Option>
                  <Option value="Wednesday">Wednesday</Option>
                  <Option value="Thursday">Thursday</Option>
                  <Option value="Friday">Friday</Option>
                  <Option value="Saturday">Saturday</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Available Hours"
            name="availableHours"
            rules={[
              { required: true, message: "Please input available hours!" },
            ]}
          >
            <Input size="large" placeholder="9:00 AM - 5:00 PM" />
          </Form.Item>

          <Form.Item style={{ marginTop: "32px" }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ marginRight: "16px" }}
            >
              Submit Profile
            </Button>
            <Button htmlType="button" onClick={onReset} size="large">
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default DoctorProfileForm;
