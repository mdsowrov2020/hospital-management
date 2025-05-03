import React from "react";
import { Card, Row, Col, Typography, Tag, Avatar, Divider } from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;

interface PatientProfileProps {
  profile: {
    id: number;
    fullName: string;
    userId: number;
    dateOfBirth: string;
    gender: string;
    bloodType: string;
    address: string;
    phoneNumber: string;
  };
}

const PatientProfile: React.FC<PatientProfileProps> = ({ profile }) => {
  return (
    <Card style={{ maxWidth: 800, margin: "40px auto", borderRadius: 12 }}>
      {/* Header */}
      <Row align="middle" gutter={24}>
        <Col>
          <Avatar
            size={96}
            icon={<UserOutlined />}
            style={{ backgroundColor: "#52c41a" }}
          />
        </Col>
        <Col>
          <Title level={3} style={{ marginBottom: 0 }}>
            {profile.fullName}
          </Title>
          <Tag color="blue">{profile.gender?.toUpperCase()}</Tag>
          <Tag color="red">{profile.bloodType}</Tag>
        </Col>
      </Row>

      <Divider />

      {/* Personal Info */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <CalendarOutlined /> <Text strong>Date of Birth:</Text>{" "}
          {dayjs(profile.dateOfBirth).format("MMMM D, YYYY")}
        </Col>
        <Col xs={24} md={12}>
          <HeartOutlined /> <Text strong>Blood Type:</Text> {profile.bloodType}
        </Col>
      </Row>

      <Divider />

      {/* Contact Info */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <PhoneOutlined /> <Text strong>Phone:</Text> {profile.phoneNumber}
        </Col>
        <Col xs={24} md={12}>
          <EnvironmentOutlined /> <Text strong>Address:</Text> {profile.address}
        </Col>
      </Row>
    </Card>
  );
};

export default PatientProfile;
