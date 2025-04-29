import { getAppointment } from "@/lib/api/appointments/service";

import { Card, Descriptions, Tag } from "antd";
import dayjs from "dayjs";

// Define the props type
type Appointment = {
  id: number;
  doctorId: number;
  patientId: number;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  reason: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

type AppointmentPageProps = {
  appointment: Appointment;
};

export async function getServerSideProps({ params }) {
  const appointment = await getAppointment(params.id);

  return { props: { appointment } };
}

export default function AppointmentPage({ appointment }: AppointmentPageProps) {
  return (
    <div style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
      <Card title="Appointment Details" bordered={false} style={{ width: 600 }}>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Appointment ID">
            {appointment.id}
          </Descriptions.Item>
          <Descriptions.Item label="Doctor ID">
            {appointment.doctorId}
          </Descriptions.Item>
          <Descriptions.Item label="Patient ID">
            {appointment.patientId}
          </Descriptions.Item>
          <Descriptions.Item label="Date">
            {dayjs(appointment.appointmentDate).format("MMMM D, YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Time">
            {dayjs(
              `${appointment.appointmentDate.split("T")[0]}T${
                appointment.appointmentTime
              }`
            ).format("h:mm A")}
          </Descriptions.Item>

          <Descriptions.Item label="Status">
            <Tag color={appointment.status === "completed" ? "green" : "blue"}>
              {appointment.status.toUpperCase()}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Reason">
            {appointment.reason}
          </Descriptions.Item>
          <Descriptions.Item label="Notes">
            {appointment.notes}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {dayjs(appointment.createdAt).format("MMMM D, YYYY h:mm A")}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {dayjs(appointment.updatedAt).format("MMMM D, YYYY h:mm A")}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
