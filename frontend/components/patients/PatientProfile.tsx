import React from "react";
import { Card, Row, Col, Typography, Tag, Avatar, Divider, Button } from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useRouter } from "next/router";

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

const iconStyle = {
  background: "#e6f7ff",
  color: "#1890ff",
  fontSize: 18,
  padding: 8,
  borderRadius: "50%",
  marginRight: 10,
};

const iconStyleRed = {
  ...iconStyle,
  background: "#fff1f0",
  color: "#f5222d",
};

const iconStyleGreen = {
  ...iconStyle,
  background: "#f6ffed",
  color: "#52c41a",
};

const PatientProfile: React.FC<PatientProfileProps> = ({ profile }) => {
  const router = useRouter();
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
          <Tag className="tag-gender">{profile.gender?.toUpperCase()}</Tag>

          <Tag className="tag-blood">{profile.bloodType}</Tag>
        </Col>
      </Row>

      <Divider />

      {/* Personal Info */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <CalendarOutlined style={iconStyle} />
          <Text strong>Date of Birth:</Text>{" "}
          {dayjs(profile.dateOfBirth).format("MMMM D, YYYY")}
        </Col>
        <Col xs={24} md={12}>
          <HeartOutlined style={iconStyleRed} />
          <Text strong>Blood Type:</Text> {profile.bloodType}
        </Col>
      </Row>

      <Divider />

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <PhoneOutlined style={iconStyleGreen} />
          <Text strong>Phone:</Text> {profile.phoneNumber}
        </Col>
        <Col xs={24} md={12}>
          <EnvironmentOutlined style={iconStyle} />
          <Text strong>Address:</Text> {profile.address}
        </Col>
      </Row>
      <Divider />
    </Card>
  );
};

export default PatientProfile;
