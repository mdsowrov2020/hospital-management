import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  Button,
  Card,
  Typography,
  message,
} from "antd";
import dayjs from "dayjs";
import axios from "axios"; // Replace with your fetch if needed
import { useForm } from "antd/es/form/Form";
import { getDoctors } from "@/lib/api/doctors/service";
import { Doctor } from "@/lib/api/doctors/types";

const { Title } = Typography;

interface AppointmentFormProps {
  patientId: number;
  onSubmit: (data: any) => void;
  initialValues?: any;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  patientId,
  onSubmit,
  initialValues,
}) => {
  const [form] = useForm();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch doctor list
    const fetchDoctors = async () => {
      try {
        const res = await getDoctors(); // Update endpoint as needed
        console.log("Doctors list: ", res);
        setDoctors(res);
      } catch (err) {
        message.error("Failed to load doctors");
      }
    };

    fetchDoctors();
  }, []);

  const handleFinish = (values: any) => {
    const payload = {
      ...values,
      patientId,
      appointmentDate: values.appointmentDate.format("YYYY-MM-DD"),
      appointmentTime: values.appointmentTime.format("HH:mm:ss"),
    };
    onSubmit(payload);
  };

  return (
    <Card style={{ maxWidth: 600, margin: "0 auto", borderRadius: 12 }}>
      <Title level={4} style={{ textAlign: "center", marginBottom: 24 }}>
        Schedule Appointment
      </Title>

      <Form
        layout="vertical"
        form={form}
        initialValues={{
          ...initialValues,
          appointmentDate: initialValues?.appointmentDate
            ? dayjs(initialValues.appointmentDate)
            : null,
          appointmentTime: initialValues?.appointmentTime
            ? dayjs(initialValues.appointmentTime, "HH:mm:ss")
            : null,
        }}
        onFinish={handleFinish}
      >
        <Form.Item
          name="doctorId"
          label="Select Doctor"
          rules={[{ required: true, message: "Please select a doctor" }]}
        >
          <Select
            placeholder="Choose a doctor"
            options={doctors?.map((doc) => ({
              label: doc.fullName,
              value: doc.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="appointmentDate"
          label="Appointment Date"
          rules={[{ required: true, message: "Please pick a date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="appointmentTime"
          label="Appointment Time"
          rules={[{ required: true, message: "Please select a time" }]}
        >
          <TimePicker style={{ width: "100%" }} format="HH:mm" />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select a status" }]}
        >
          <Select
            options={[
              { label: "Scheduled", value: "scheduled" },
              { label: "Completed", value: "completed" },
              { label: "Cancelled", value: "cancelled" },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="reason"
          label="Reason for Appointment"
          rules={[{ required: true, message: "Please enter a reason" }]}
        >
          <Input.TextArea
            rows={3}
            placeholder="e.g. Post-operative follow-up"
          />
        </Form.Item>

        <Form.Item name="notes" label="Additional Notes">
          <Input.TextArea rows={3} placeholder="Optional" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            className="custom-button submit"
            loading={loading}
          >
            Book Appointment
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AppointmentForm;
