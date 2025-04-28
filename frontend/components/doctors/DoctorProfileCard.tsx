"use client";
import { Card, Avatar, Tag, Space } from "antd";
import {
  ClockCircleOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Doctor } from "@/lib/api/doctors/types";

const { Meta } = Card;

export default function DoctorProfileCard({ doctor }) {
  console.log(doctor);
  return (
    <Card
      hoverable
      cover={
        <img
          alt="Heart Center"
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
          style={{
            height: "180px",
            width: "100%",
            objectFit: "cover",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        />
      }
    >
      <Meta
        avatar={<Avatar size="large" icon={<UserOutlined />} />}
        title={`${doctor.User.firstName} ${doctor.User.lastName}`}
        description={doctor.specialization}
      />
      <div style={{ marginTop: 16 }}>
        <Space direction="vertical" size={8}>
          <Tag color="blue">License: {doctor.licenseNumber}</Tag>
          <div>
            <ClockCircleOutlined /> Available: {doctor.availableHours}
          </div>
          <div>
            <strong>Days:</strong> {doctor.availableDays.join(" ")}
          </div>
          <div>
            <MailOutlined /> {doctor.User.email}
          </div>
        </Space>
      </div>
    </Card>
  );
}
