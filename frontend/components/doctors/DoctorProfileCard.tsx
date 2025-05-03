import React from "react";
import { Card, Row, Col, Typography, Tag, Avatar, Divider } from "antd";
import {
  MailOutlined,
  CalendarOutlined,
  IdcardOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  ManOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;

interface DoctorProfileProps {
  profile: {
    fullName: string;
    specialization: string;
    licenseNumber: string;
    dateOfBirth: string;
    department: string;
    consultationFee: number;
    gender: string;
    availableDays: string[];
    availableHours: string;
    createdAt: string;
    updatedAt: string;
    email: string;
  };
}

const DoctorProfileCard: React.FC<{
  profile: DoctorProfileProps["profile"];
}> = ({ profile }) => {
  return (
    <Card style={{ maxWidth: 900, margin: "40px auto", borderRadius: 12 }}>
      {/* Header */}
      <Row align="middle" gutter={24}>
        <Col>
          <Avatar
            size={96}
            icon={<UserOutlined />}
            style={{ backgroundColor: "#1890ff" }}
          />
        </Col>
        <Col>
          <Title level={3} style={{ marginBottom: 0 }}>
            {profile.fullName}
          </Title>
          <Text type="secondary">
            {profile.specialization} • {profile.department}
          </Text>
          <br />
          <Tag color="blue">{profile.gender?.toUpperCase()}</Tag>
        </Col>
      </Row>

      <Divider />

      {/* Basic Information */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <IdcardOutlined /> <Text strong>License:</Text>{" "}
          {profile.licenseNumber}
        </Col>
        <Col xs={24} md={12}>
          <CalendarOutlined /> <Text strong>Birth Date:</Text>{" "}
          {dayjs(profile.dateOfBirth).format("MMM D, YYYY")}
        </Col>
        <Col xs={24} md={12}>
          <DollarOutlined /> <Text strong>Consultation Fee:</Text> $
          {profile.consultationFee}
        </Col>
        <Col xs={24} md={12}>
          <TeamOutlined /> <Text strong>Department:</Text> {profile.department}
        </Col>
      </Row>

      <Divider />

      {/* Availability */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <ClockCircleOutlined /> <Text strong>Available Hours:</Text>{" "}
          {profile.availableHours}
        </Col>
        <Col xs={24} md={12}>
          <Text strong>Available Days:</Text>{" "}
          {profile.availableDays?.map((day) => (
            <Tag key={day} color="green">
              {day}
            </Tag>
          ))}
        </Col>
      </Row>

      <Divider />

      {/* Contact Info */}
      <Row>
        <Col span={24}>
          <MailOutlined /> <Text strong>Email:</Text> {profile.email}
        </Col>
      </Row>
    </Card>
  );
};

export default DoctorProfileCard;
