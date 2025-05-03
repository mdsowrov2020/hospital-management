"use client";

import React from "react";
import { Descriptions, Card, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Patient } from "@/lib/api/patients/types";

const { Title } = Typography;

interface PatientDetailProps {
  patient: Patient;
}

const PatientDetail: React.FC<PatientDetailProps> = ({ patient }) => {
  return (
    <Card
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Avatar size={48} icon={<UserOutlined />} />
          <Title level={4} style={{ margin: 0 }}>
            {patient.fullName}
          </Title>
        </div>
      }
      bordered
      style={{ maxWidth: 800, margin: "0 auto", marginTop: 40 }}
    >
      <Descriptions column={1} bordered size="middle">
        <Descriptions.Item label="Full Name">
          {patient.fullName}
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          {patient.User.email}
        </Descriptions.Item>
        <Descriptions.Item label="Date of Birth">
          {new Date(patient.dateOfBirth).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Gender">{patient.gender}</Descriptions.Item>
        <Descriptions.Item label="Blood Type">
          {patient.bloodType}
        </Descriptions.Item>
        <Descriptions.Item label="Phone Number">
          {patient.phoneNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Address">{patient.address}</Descriptions.Item>
        <Descriptions.Item label="Created At">
          {new Date(patient.createdAt).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {new Date(patient.updatedAt).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Updated By">
          {patient.updatedBy}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default PatientDetail;
