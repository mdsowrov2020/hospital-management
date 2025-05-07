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

import { useForm } from "antd/es/form/Form";
import {
  getDoctorAvailableDaysByID,
  getDoctors,
} from "@/lib/api/doctors/service";
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
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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

  useEffect(() => {
    const doctorId = form.getFieldValue("doctorId");
    if (doctorId) {
      fetchAvailableDays(doctorId);
    }
  }, [form.getFieldValue("doctorId")]);

  const fetchAvailableDays = async (doctorId: number) => {
    try {
      const data = await getDoctorAvailableDaysByID(doctorId);
      setAvailableDays(data);
      console.log("Available days: ", data);
    } catch (err: any) {
      message.error("Failed to fetch available days");
    }
  };

  const handleDoctorChange = async (doctorId: number) => {
    form.setFieldValue("doctorId", doctorId);
    await fetchAvailableDays(doctorId);
  };

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
            onChange={handleDoctorChange}
          />
        </Form.Item>

        <Form.Item
          name="appointmentDate"
          label="Appointment Date"
          rules={[{ required: true, message: "Please pick a date" }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            disabledDate={(date) => {
              const day = date.format("dddd");
              return !availableDays.includes(day);
            }}
          />
        </Form.Item>

        <Form.Item
          name="appointmentTime"
          label="Appointment Time"
          rules={[{ required: true, message: "Please select a time" }]}
        >
          <TimePicker style={{ width: "100%" }} format="HH:mm" />
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
