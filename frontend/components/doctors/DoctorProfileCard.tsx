import React from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Avatar,
  Divider,
  Skeleton,
  Tooltip,
} from "antd";
import {
  MailOutlined,
  CalendarOutlined,
  IdcardOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { DoctorProfile } from "@/context/types";

const { Title, Text } = Typography;

interface DoctorProfileProps {
  profile: DoctorProfile | null;
}

const iconStyleBase = {
  fontSize: 18,
  padding: 8,
  borderRadius: "50%",
  marginRight: 10,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const iconStyles = {
  default: {
    ...iconStyleBase,
    background: "#e6f7ff",
    color: "#1890ff",
  },
  red: {
    ...iconStyleBase,
    background: "#fff1f0",
    color: "#f5222d",
  },
  green: {
    ...iconStyleBase,
    background: "#f6ffed",
    color: "#52c41a",
  },
  gold: {
    ...iconStyleBase,
    background: "#fffbe6",
    color: "#faad14",
  },
};

const DoctorProfileCard: React.FC<DoctorProfileProps> = ({ profile }) => {
  if (!profile) {
    return (
      <Card style={{ maxWidth: 900, margin: "40px auto", borderRadius: 12 }}>
        <Skeleton active />
      </Card>
    );
  }

  return (
    <Card style={{ maxWidth: 900, margin: "40px auto", borderRadius: 12 }}>
      <Row align="middle" gutter={24}>
        <Col>
          <Avatar
            size={96}
            icon={<UserOutlined />}
            style={{ backgroundColor: "#1890ff" }}
          />
        </Col>
        <Col>
          <Title level={3} style={{ marginBottom: 4 }}>
            {profile.fullName}
          </Title>
          <Text type="secondary">
            {profile.specialization} • {profile.department}
          </Text>
          <br />
          <Tag className="tag-gender">{profile.gender?.toUpperCase()}</Tag>
        </Col>
      </Row>

      <Divider />

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <IdcardOutlined style={iconStyles.default} />
          <Text strong>License:</Text> {profile.licenseNumber}
        </Col>
        <Col xs={24} md={12}>
          <CalendarOutlined style={iconStyles.red} />
          <Text strong>Birth Date:</Text>{" "}
          {dayjs(profile.dateOfBirth).format("MMM D, YYYY")}
        </Col>
        <Col xs={24} md={12}>
          <DollarOutlined style={iconStyles.gold} />
          <Text strong>Consultation Fee:</Text> ${profile.consultationFee}
        </Col>
        <Col xs={24} md={12}>
          <TeamOutlined style={iconStyles.green} />
          <Text strong>Department:</Text> {profile.department}
        </Col>
      </Row>

      <Divider />

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <ClockCircleOutlined style={iconStyles.default} />
          <Text strong>Available Hours:</Text> {profile.availableHours}
        </Col>
        <Col xs={24} md={12}>
          <Text strong>Available Days:</Text>{" "}
          {profile.availableDays?.map((day) => (
            <Tag
              key={day}
              color="green"
              style={{
                fontWeight: "bold",
                fontSize: 13,
                padding: "2px 10px",
                marginBottom: 4,
              }}
            >
              {day}
            </Tag>
          ))}
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col span={24}>
          <MailOutlined style={iconStyles.default} />
          <Text strong>Email:</Text> {profile.email}
        </Col>
      </Row>
    </Card>
  );
};

export default DoctorProfileCard;
