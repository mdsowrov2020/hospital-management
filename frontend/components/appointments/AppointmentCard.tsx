import { Card, List, Typography, Tag, Space } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs"; // Use dayjs for consistent date formatting

const { Title, Text } = Typography;

const getStatusColor = (status: string) => {
  switch (status) {
    case "scheduled":
      return "blue";
    case "completed":
      return "green";
    case "cancelled":
      return "red";
    default:
      return "gray";
  }
};
export default function AppointmentCard({ appointment }) {
  return (
    <List.Item key={appointment.id}>
      <Card
        hoverable
        title={
          <Space direction="vertical">
            <Text strong>
              Dr. {appointment.Doctor.User.firstName}{" "}
              {appointment.Doctor.User.lastName}
            </Text>
            <Text type="secondary">{appointment.Doctor.specialization}</Text>
          </Space>
        }
        extra={
          <Tag
            color={getStatusColor(appointment.status)}
            style={{ fontSize: "14px" }}
          >
            {appointment.status.toUpperCase()}
          </Tag>
        }
        style={{
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Space direction="vertical" size="small">
          <Text>
            <strong>Patient:</strong> {appointment.Patient.User.firstName}{" "}
            {appointment.Patient.User.lastName}
          </Text>
          <Text>
            <strong>Appointment Date:</strong> {appointment.formattedDate} at{" "}
            {appointment.appointmentTime}
          </Text>
          <Text>
            <strong>Reason:</strong> {appointment.reason}
          </Text>
          <Text>
            <strong>Department:</strong> {appointment.Doctor.department}
          </Text>
          <Text>
            <strong>Patient Contact:</strong> {appointment.Patient.phoneNumber}
          </Text>

          {/* Corrected View Details link */}
          <Link href={`/appointments/${appointment.id}`} passHref>
            <Text type="link" style={{ marginTop: "0.5rem" }}>
              View Details
            </Text>
          </Link>
        </Space>
      </Card>
    </List.Item>
  );
}
