import React, { useEffect, useState } from "react";

import { Button, Spin, Tag, message } from "antd";
import dayjs from "dayjs";
import { useAuth } from "@/context/AuthProvider";
import { Appointment } from "@/lib/api/appointments/types";
import { getAppointmentByPatientId } from "@/lib/api/appointments/service";
import CustomeTable from "../ui/CustomeTable";
import { useRouter } from "next/router";

const PatientAppointment = () => {
  const { patientProfile } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchAppointments = async () => {
    if (!patientProfile?.id) return;
    setLoading(true);
    const result = await getAppointmentByPatientId(String(patientProfile?.id));
    if (typeof result === "string") {
      message.error(result);
    } else {
      setAppointments(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, [patientProfile?.id]);

  const columns = [
    {
      title: "Doctor ID",
      dataIndex: "doctorId",
      key: "doctorId",
    },
    {
      title: "Date",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
      render: (date: string) => dayjs(date).format("DD MMM YYYY"),
    },
    {
      title: "Time",
      dataIndex: "appointmentTime",
      key: "appointmentTime",
      render: (time: string) => dayjs(time, "HH:mm:ss").format("hh:mm A"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "scheduled"
            ? "blue"
            : status === "completed"
            ? "green"
            : "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      ellipsis: true,
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      ellipsis: true,
    },
  ];

  return loading ? (
    <div className="flex justify-center items-center h-64">
      <Spin size="large" />
    </div>
  ) : (
    <div>
      <Button
        onClick={() => router.push("/appointments/create")}
        style={{ marginBottom: "20px" }}
      >
        Create appoinment
      </Button>
      <CustomeTable
        dataSource={appointments.map((item) => ({ ...item, key: item.id }))}
        columns={columns}
      />
    </div>
  );
};

export default PatientAppointment;
