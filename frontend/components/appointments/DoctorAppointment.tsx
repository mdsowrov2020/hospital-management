import React, { useEffect, useState } from "react";
import {
  Calendar,
  Badge,
  Card,
  Typography,
  Spin,
  Empty,
  Button,
  Space,
  Tag,
} from "antd";

import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import { useAuth } from "@/context/AuthProvider";
import {
  changeStatusOfAppointment,
  getAppointmentByDoctorId,
} from "@/lib/api/appointments/service";
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

const DoctorAppointment = () => {
  const { doctorProfile } = useAuth();
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
    } catch {
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

  const handleStatusChange = async (id: number, status: string) => {
    const result = await changeStatusOfAppointment(String(id), status);

    if (typeof result === "string") {
      toast.error(result);
    } else {
      toast.success(`Appointment ${status.toUpperCase()}`);
      fetchAppointments(); // Refresh data
    }
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
      render: (_: any, record: Appointment) => (
        <Space>
          {record.status === "completed" || record.status === "cancelled" ? (
            ""
          ) : (
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              size="small"
              style={{ backgroundColor: "#52c41a", borderRadius: 8 }}
              onClick={() => handleStatusChange(record.id, "completed")}
            >
              Mark Complete
            </Button>
          )}

          {record.status === "cancelled" ? (
            <Button
              type="primary"
              icon={<CloseCircleOutlined />}
              size="small"
              style={{ borderRadius: 8 }}
              onClick={() => handleStatusChange(record.id, "scheduled")}
            >
              Confirm Schedule
            </Button>
          ) : (
            <>
              {record.status === "completed" ? (
                ""
              ) : (
                <Button
                  type="primary"
                  danger
                  icon={<CloseCircleOutlined />}
                  size="small"
                  style={{ borderRadius: 8 }}
                  onClick={() => handleStatusChange(record.id, "cancelled")}
                >
                  Cancel
                </Button>
              )}
            </>
          )}
        </Space>
      ),
    },
  ];

  const selectedAppointments = appointmentsByDate[selectedDate] || [];

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

export default DoctorAppointment;
