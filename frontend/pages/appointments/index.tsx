import React, { useEffect, useState } from "react";
import {
  Calendar,
  Badge,
  Card,
  Typography,
  Spin,
  Empty,
  Button,
  Tag,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useAuth } from "@/context/AuthProvider";
import { getAppointmentByDoctorId } from "@/lib/api/appointments/service";
import toast from "react-hot-toast";
import CustomeTable from "@/components/ui/CustomeTable";

const { Title } = Typography;

type Appointment = {
  id: number;
  appointmentDate: string;
  reason?: string;
  status?: "scheduled" | "confirmed" | "completed" | "cancelled" | "no-show";
  Patient?: {
    fullName?: string;
    phoneNumber?: string;
    User?: {
      email?: string;
    };
  };
};

const AppointmentCalendar = () => {
  const { doctorProfile, user } = useAuth();
  const doctorId = doctorProfile?.id;

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentsByDate, setAppointmentsByDate] = useState<
    Record<string, Appointment[]>
  >({});
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    if (!doctorId) return;
    setLoading(true);
    try {
      const res = await getAppointmentByDoctorId(doctorId);
      if (Array.isArray(res)) {
        setAppointments(res);
        const grouped: Record<string, Appointment[]> = {};
        res.forEach((appt) => {
          const date = dayjs(appt.appointmentDate).format("YYYY-MM-DD");
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(appt);
        });
        setAppointmentsByDate(grouped);
      } else {
        toast.error(
          typeof res === "string" ? res : "Error fetching appointments"
        );
      }
    } catch (err: any) {
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [doctorId]);

  const cellRender = (value: Dayjs) => {
    const dateStr = value.format("YYYY-MM-DD");
    const dayAppointments = appointmentsByDate[dateStr] || [];
    return dayAppointments.length > 0 ? (
      <Badge
        count={dayAppointments.length}
        style={{ backgroundColor: "#52c41a" }}
      />
    ) : null;
  };

  const onSelect = (date: Dayjs) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
  };

  const getStatusTag = (status: string) => {
    switch (status?.toLowerCase()) {
      case "scheduled":
        return <Tag color="blue">SCHEDULED</Tag>;
      case "confirmed":
        return <Tag color="green">CONFIRMED</Tag>;
      case "completed":
        return <Tag color="purple">COMPLETED</Tag>;
      case "cancelled":
        return <Tag color="red">CANCELLED</Tag>;
      case "no-show":
        return <Tag color="orange">NO SHOW</Tag>;
      default:
        return <Tag color="default">PENDING</Tag>;
    }
  };

  const columns = [
    {
      title: "Patient Name",
      dataIndex: ["Patient", "fullName"],
      key: "name",
      render: (text: string) => text || "Unnamed Patient",
    },
    {
      title: "Email",
      dataIndex: ["Patient", "User", "email"],
      key: "email",
      render: (text: string) => text || "N/A",
    },
    {
      title: "Phone",
      dataIndex: ["Patient", "phoneNumber"],
      key: "phone",
      render: (text: string) => text || "N/A",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      render: (text: string) => text || "Not specified",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => getStatusTag(status),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button type="primary" size="small">
          Change Status
        </Button>
      ),
    },
  ];

  const selectedAppointments = appointmentsByDate[selectedDate] || [];
  if (user?.role === "patient") return <p>Patient appointment list</p>;
  if (user?.role === "doctor")
    return (
      <div style={{ padding: 24, background: "#fff", minHeight: "100vh" }}>
        <Title level={2}>Appointment Calendar</Title>

        <Card bordered style={{ borderRadius: 12, marginBottom: 24 }}>
          <Calendar fullscreen cellRender={cellRender} onSelect={onSelect} />
        </Card>

        <Card
          title={`Patients on ${dayjs(selectedDate).format("MMMM D, YYYY")}`}
          bordered
          style={{ borderRadius: 12 }}
        >
          {loading ? (
            <div style={{ textAlign: "center", padding: 40 }}>
              <Spin size="large" />
            </div>
          ) : selectedAppointments.length > 0 ? (
            <CustomeTable dataSource={selectedAppointments} columns={columns} />
          ) : (
            <Empty description="No Patients Scheduled" />
          )}
        </Card>
      </div>
    );
};

export default AppointmentCalendar;
