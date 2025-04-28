import { Card, List, Typography, Tag, Space } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs"; // Use dayjs for consistent date formatting
import AppointmentCard from "@/components/appointments/AppointmentCard";

const { Title, Text } = Typography;

const appointmentsData = [
  {
    id: 1,
    doctorId: 1,
    patientId: 1,
    appointmentDate: "2023-12-20T00:00:00.000Z",
    appointmentTime: "10:15:00",
    status: "scheduled",
    reason: "Post-operative follow-up",
    notes: "Check incision healing progress",
    Doctor: {
      id: 1,
      userId: 7,
      specialization: "Cardiology",
      licenseNumber: "MD-123456",
      department: "Heart Center",
      availableDays: ["Monday", "Wednesday", "Friday"],
      availableHours: "09:00-17:00",
      User: { firstName: "Ayaan", lastName: "Khadem" },
    },
    Patient: {
      id: 1,
      userId: 1,
      dateOfBirth: "1985-05-15T00:00:00.000Z",
      gender: "female",
      bloodType: "A+",
      address: "123 Main St, Anytown, USA",
      phoneNumber: "+15551234567",
      User: { firstName: "Md", lastName: "Sowrov" },
    },
  },
  {
    id: 2,
    doctorId: 2,
    patientId: 3,
    appointmentDate: "2023-12-20T00:00:00.000Z",
    appointmentTime: "10:15:00",
    status: "scheduled",
    reason: "Post-operative follow-up",
    notes: "Check incision healing progress",
    Doctor: {
      id: 2,
      userId: 8,
      specialization: "Pediatrics",
      licenseNumber: "PD-987654",
      department: "Children's Hospital",
      availableDays: ["Monday", "Tuesday", "Thursday"],
      availableHours: "08:00-15:00",
      User: { firstName: "Afsan", lastName: "Khadem" },
    },
    Patient: {
      id: 3,
      userId: 12,
      dateOfBirth: "2018-03-10T00:00:00.000Z",
      gender: "female",
      bloodType: "B+",
      address: "789 Playground Lane, Kidsville",
      phoneNumber: "+15551112222",
      User: { firstName: "Sophia", lastName: "Rodriguez" },
    },
  },
];

const Appointments = () => {
  const [formattedAppointments, setFormattedAppointments] = useState<any[]>([]);

  // Format dates consistently on the client side
  useEffect(() => {
    const formattedData = appointmentsData.map((appointment) => ({
      ...appointment,
      formattedDate: dayjs(appointment.appointmentDate).format("MM/DD/YYYY"), // Format date consistently
    }));
    setFormattedAppointments(formattedData);
  }, []);

  return (
    <div style={{ maxWidth: 1200, margin: "2rem auto", padding: "1rem" }}>
      <Title level={2}>All Appointments</Title>

      <List
        grid={{ gutter: 24, column: 2 }}
        dataSource={formattedAppointments}
        renderItem={(appointment) => (
          <AppointmentCard appointment={appointment} />
        )}
      />
    </div>
  );
};

export default Appointments;
