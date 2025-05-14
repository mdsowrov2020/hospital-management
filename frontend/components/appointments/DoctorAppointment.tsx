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
  Form,
  Modal,
  Collapse,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import { useAuth } from "@/context/AuthProvider";
import {
  changeStatusOfAppointment,
  getAppointmentByDoctorId,
} from "@/lib/api/appointments/service";
import {
  createMedicalRecord,
  getMedicalRecordsByPatient,
} from "@/lib/api/medical-records/service";
import toast from "react-hot-toast";
import CustomeTable from "@/components/ui/CustomeTable";
import MedicalRecordForm from "@/components/medical-records/MedicalRecordForm";

const { Title } = Typography;
const { Panel } = Collapse;

type Appointment = {
  id: number;
  appointmentDate: string;
  reason?: string;
  status?: "scheduled" | "confirmed" | "completed" | "cancelled" | "no-show";
  Patient?: {
    id: number;
    fullName?: string;
    phoneNumber?: string;
    User?: {
      email?: string;
    };
  };
};

type MedicalRecord = {
  id: number;
  diagnosis: string;
  treatment: string;
  medications: string;
  notes: string;
  date: string;
  Patient?: {
    id: number;
    fullName?: string;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null
  );
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedMedicalRecord, setSelectedMedicalRecord] =
    useState<MedicalRecord | null>(null);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [medicalRecordsMap, setMedicalRecordsMap] = useState<
    Record<number, MedicalRecord[]>
  >({});

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

        const completedPatientIds = Array.from(
          new Set(
            res
              .filter((a) => a.status === "completed")
              .map((a) => a.Patient?.id)
              .filter(Boolean)
          )
        ) as number[];

        const records: Record<number, MedicalRecord[]> = {};
        for (const id of completedPatientIds) {
          const result = await getMedicalRecordsByPatient(String(id));
          if (Array.isArray(result)) {
            records[id] = result.sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
          }
        }
        setMedicalRecordsMap(records);
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

  const handleStatusChange = async (
    id: number,
    status: string,
    patientId?: number
  ) => {
    const result = await changeStatusOfAppointment(String(id), status);
    if (typeof result === "string") {
      toast.error(result);
    } else {
      toast.success(`Appointment ${status.toUpperCase()}`);
      await fetchAppointments();

      if (status === "completed" && patientId) {
        setSelectedPatientId(patientId);
        form.resetFields();
        setIsModalOpen(true);
      }
    }
  };

  const handleCreateMedicalRecord = async (values: any) => {
    if (!selectedPatientId) return;
    setSubmitting(true);
    const payload = { ...values, patientId: selectedPatientId };
    const result = await createMedicalRecord(payload);

    if (typeof result === "string") {
      toast.error(result);
    } else {
      toast.success("Medical record created");
      setIsModalOpen(false);

      const newRecords = await getMedicalRecordsByPatient(
        String(selectedPatientId)
      );
      if (Array.isArray(newRecords)) {
        setMedicalRecordsMap((prev) => ({
          ...prev,
          [selectedPatientId]: newRecords.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          ),
        }));
        setSelectedMedicalRecord(newRecords[0]);
        setViewModalOpen(true);
      }
    }
    setSubmitting(false);
  };

  const handleViewMedicalRecord = async (patientId: number) => {
    let records = medicalRecordsMap[patientId];

    if (!records || records.length === 0) {
      const result = await getMedicalRecordsByPatient(String(patientId));
      if (Array.isArray(result) && result.length > 0) {
        records = result.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setMedicalRecordsMap((prev) => ({
          ...prev,
          [patientId]: records!,
        }));
      } else {
        toast.error("No medical records found for this patient.");
        return;
      }
    }

    setSelectedMedicalRecord(records[0]);
    setSelectedPatientId(patientId);
    setViewModalOpen(true);
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
    },
    {
      title: "Email",
      dataIndex: ["Patient", "User", "email"],
    },
    {
      title: "Phone",
      dataIndex: ["Patient", "phoneNumber"],
    },
    {
      title: "Reason",
      dataIndex: "reason",
      render: (text: string) => text || "N/A",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => getStatusTag(status),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Appointment) => {
        const patientId = record.Patient?.id;
        const isCompleted = record.status === "completed";
        const hasMedicalRecord =
          patientId && medicalRecordsMap[patientId]?.length > 0;

        return (
          <Space>
            {!isCompleted && record.status !== "cancelled" && (
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                size="small"
                onClick={() =>
                  handleStatusChange(record.id, "completed", patientId)
                }
              >
                Mark Complete
              </Button>
            )}

            {record.status === "cancelled" ? (
              <Button
                type="primary"
                size="small"
                onClick={() => handleStatusChange(record.id, "scheduled")}
              >
                Reschedule
              </Button>
            ) : (
              !isCompleted && (
                <Button
                  danger
                  type="primary"
                  size="small"
                  icon={<CloseCircleOutlined />}
                  onClick={() => handleStatusChange(record.id, "cancelled")}
                >
                  Cancel
                </Button>
              )
            )}

            {isCompleted && patientId && (
              <Button
                type="default"
                icon={<EyeOutlined />}
                size="small"
                onClick={() => handleViewMedicalRecord(patientId)}
              >
                View Medical Record
              </Button>
            )}
          </Space>
        );
      },
    },
  ];

  const selectedAppointments = appointmentsByDate[selectedDate] || [];

  return (
    <>
      <div style={{ padding: 24 }}>
        <Title level={2}>Appointment Calendar</Title>
        <Card style={{ marginBottom: 24 }}>
          <Calendar fullscreen cellRender={cellRender} onSelect={onSelect} />
        </Card>
        <Card title={`Appointments on ${selectedDate}`}>
          {loading ? (
            <Spin />
          ) : selectedAppointments.length > 0 ? (
            <CustomeTable dataSource={selectedAppointments} columns={columns} />
          ) : (
            <Empty />
          )}
        </Card>
      </div>

      <Modal
        title="Create Medical Record"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <MedicalRecordForm
          form={form}
          onFinish={handleCreateMedicalRecord}
          submitting={submitting}
        />
      </Modal>

      <Modal
        title={`Medical Records for ${
          selectedMedicalRecord?.Patient?.fullName || "Patient"
        }`}
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={null}
        width={800}
      >
        {selectedMedicalRecord && selectedPatientId ? (
          <div>
            <div style={{ marginBottom: 24 }}>
              <Title level={4} style={{ marginBottom: 16 }}>
                Current Record (
                {dayjs(selectedMedicalRecord.date).format("MMMM D, YYYY")})
              </Title>
              <Card>
                <p>
                  <strong>Diagnosis:</strong> {selectedMedicalRecord.diagnosis}
                </p>
                <p>
                  <strong>Treatment:</strong> {selectedMedicalRecord.treatment}
                </p>
                <p>
                  <strong>Medications:</strong>{" "}
                  {selectedMedicalRecord.medications}
                </p>
                <p>
                  <strong>Notes:</strong> {selectedMedicalRecord.notes}
                </p>
              </Card>
            </div>

            {medicalRecordsMap[selectedPatientId]?.length > 1 && (
              <div>
                <Title level={4}>Previous Records</Title>
                <Collapse accordion>
                  {medicalRecordsMap[selectedPatientId]
                    .filter((record) => record.id !== selectedMedicalRecord.id)
                    .map((record) => (
                      <Panel
                        header={`Record from ${dayjs(record.date).format(
                          "MMMM D, YYYY"
                        )}`}
                        key={record.id}
                        extra={
                          <Button
                            type="link"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMedicalRecord(record);
                            }}
                          >
                            View Details
                          </Button>
                        }
                      >
                        <div style={{ padding: 16 }}>
                          <p>
                            <strong>Diagnosis:</strong> {record.diagnosis}
                          </p>
                          <p>
                            <strong>Treatment:</strong> {record.treatment}
                          </p>
                          <p>
                            <strong>Medications:</strong> {record.medications}
                          </p>
                          <p>
                            <strong>Notes:</strong> {record.notes}
                          </p>
                        </div>
                      </Panel>
                    ))}
                </Collapse>
              </div>
            )}
          </div>
        ) : (
          <Empty description="No medical records found" />
        )}
      </Modal>
    </>
  );
};

export default DoctorAppointment;
