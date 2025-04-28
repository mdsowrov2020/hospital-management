// import { Card, List, Typography, Tag, Space } from "antd";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import AppointmentCard from "@/components/appointments/AppointmentCard";

// const { Title, Text } = Typography;

// const appointmentsData = [
//   {
//     id: 1,
//     doctorId: 1,
//     patientId: 1,
//     appointmentDate: "2023-12-20T00:00:00.000Z",
//     appointmentTime: "10:15:00",
//     status: "scheduled",
//     reason: "Post-operative follow-up",
//     notes: "Check incision healing progress",
//     Doctor: {
//       id: 1,
//       userId: 7,
//       specialization: "Cardiology",
//       licenseNumber: "MD-123456",
//       department: "Heart Center",
//       availableDays: ["Monday", "Wednesday", "Friday"],
//       availableHours: "09:00-17:00",
//       User: { firstName: "Ayaan", lastName: "Khadem" },
//     },
//     Patient: {
//       id: 1,
//       userId: 1,
//       dateOfBirth: "1985-05-15T00:00:00.000Z",
//       gender: "female",
//       bloodType: "A+",
//       address: "123 Main St, Anytown, USA",
//       phoneNumber: "+15551234567",
//       User: { firstName: "Md", lastName: "Sowrov" },
//     },
//   },
//   {
//     id: 2,
//     doctorId: 2,
//     patientId: 3,
//     appointmentDate: "2023-12-20T00:00:00.000Z",
//     appointmentTime: "10:15:00",
//     status: "scheduled",
//     reason: "Post-operative follow-up",
//     notes: "Check incision healing progress",
//     Doctor: {
//       id: 2,
//       userId: 8,
//       specialization: "Pediatrics",
//       licenseNumber: "PD-987654",
//       department: "Children's Hospital",
//       availableDays: ["Monday", "Tuesday", "Thursday"],
//       availableHours: "08:00-15:00",
//       User: { firstName: "Afsan", lastName: "Khadem" },
//     },
//     Patient: {
//       id: 3,
//       userId: 12,
//       dateOfBirth: "2018-03-10T00:00:00.000Z",
//       gender: "female",
//       bloodType: "B+",
//       address: "789 Playground Lane, Kidsville",
//       phoneNumber: "+15551112222",
//       User: { firstName: "Sophia", lastName: "Rodriguez" },
//     },
//   },
// ];

// const Appointments = () => {
//   const [formattedAppointments, setFormattedAppointments] = useState<any[]>([]);

//   useEffect(() => {
//     const formattedData = appointmentsData.map((appointment) => ({
//       ...appointment,
//       formattedDate: dayjs(appointment.appointmentDate).format("MM/DD/YYYY"), // Format date consistently
//     }));
//     setFormattedAppointments(formattedData);
//   }, []);

//   return (
//     <div style={{ maxWidth: 1200, margin: "2rem auto", padding: "1rem" }}>
//       <Title level={2}>All Appointments</Title>

//       <List
//         grid={{ gutter: 24, column: 2 }}
//         dataSource={formattedAppointments}
//         renderItem={(appointment) => (
//           <AppointmentCard appointment={appointment} />
//         )}
//       />
//     </div>
//   );
// };

// export default Appointments;

// ======================================================================================

import { useState, useEffect } from "react";
import { Table, Tag, Space, Button, DatePicker, Select } from "antd";
import {
  getAppointments,
  cancelAppointment,
  completeAppointment,
  updateAppointment,
} from "@/lib/api/appointments/service";
import { Appointment, AppointmentStatus } from "@/lib/api/appointments/types";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Option } = Select;

const statusColors: Record<AppointmentStatus, string> = {
  scheduled: "blue",
  completed: "green",
  cancelled: "red",
};

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{
    status?: AppointmentStatus;
    dateRange?: [string, string];
  }>({});

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments({
          status: filters.status,
          dateRange: filters.dateRange
            ? {
                start: filters.dateRange[0],
                end: filters.dateRange[1],
              }
            : undefined,
        });
        setAppointments(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch appointments"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [filters]);

  const handleStatusChange = (status: AppointmentStatus) => {
    setFilters((prev) => ({ ...prev, status }));
  };

  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    setFilters((prev) => ({ ...prev, dateRange: dateStrings }));
  };

  const handleCancel = async (id: number) => {
    try {
      await updateAppointment(id, { status: "cancelled" });
      setAppointments((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: "cancelled" } : app
        )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to cancel appointment"
      );
    }
  };

  const handleComplete = async (id: number) => {
    try {
      await updateAppointment(id, { status: "completed" });
      setAppointments((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: "completed" } : app
        )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to complete appointment"
      );
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Doctor ID",
      dataIndex: "doctorId",
      key: "doctorId",
    },
    {
      title: "Patient ID",
      dataIndex: "patientId",
      key: "patientId",
    },
    {
      title: "Date & Time",
      key: "datetime",
      render: (record: Appointment) => (
        <span>
          {dayjs(record.appointmentDate).format("YYYY-MM-DD")} at{" "}
          {record.appointmentTime}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: AppointmentStatus) => (
        <Tag color={statusColors[status]}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Appointment) => (
        <Space size="middle">
          {record.status === "scheduled" && (
            <>
              <Button
                type="primary"
                size="small"
                onClick={() => handleComplete(record.id)}
              >
                Complete
              </Button>
              <Button
                danger
                size="small"
                onClick={() => handleCancel(record.id)}
              >
                Cancel
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  if (loading) return <div>Loading appointments...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Select
            placeholder="Filter by status"
            style={{ width: 200 }}
            onChange={handleStatusChange}
            allowClear
          >
            <Option value="scheduled">Scheduled</Option>
            <Option value="completed">Completed</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
          <RangePicker onChange={handleDateChange} style={{ width: 250 }} />
        </Space>
      </div>
      <Table columns={columns} dataSource={appointments} rowKey="id" bordered />
    </div>
  );
}
