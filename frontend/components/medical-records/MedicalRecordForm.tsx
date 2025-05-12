import React from "react";
import { Form, Input, Button } from "antd";
import { MedicalRecord } from "@/lib/api/medical-records/types";

type Props = {
  form: any;
  onFinish: (values: MedicalRecord) => void;
  submitting: boolean;
};

const MedicalRecordForm: React.FC<Props> = ({ form, onFinish, submitting }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ padding: 20 }}
    >
      <Form.Item
        name="diagnosis"
        label="Diagnosis"
        rules={[{ required: true, message: "Please enter a diagnosis" }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item name="treatment" label="Treatment">
        <Input.TextArea rows={2} />
      </Form.Item>

      <Form.Item name="medications" label="Medications">
        <Input.TextArea rows={2} />
      </Form.Item>

      <Form.Item name="allergies" label="Allergies">
        <Input.TextArea rows={2} />
      </Form.Item>

      <Form.Item name="notes" label="Notes">
        <Input.TextArea rows={2} />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={submitting}
          style={{ borderRadius: 8 }}
        >
          Submit Record
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MedicalRecordForm;
