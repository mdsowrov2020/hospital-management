import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

const PatientForm = () => {
  return (
    <>
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item hasFeedback label="First name" name="firstName">
              <Input placeholder="Validate required onBlur" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item hasFeedback label="Last name" name="lastName">
              <Input placeholder="Last name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item hasFeedback label="Gender" name="gender">
              <Select
                options={[
                  { value: "male", label: <span>Male</span> },
                  { value: "female", label: <span>Female</span> },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item hasFeedback label="Mobile" name="phoneNumber">
              <Input placeholder="Mobile" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item hasFeedback label="Date of birth" name="dateOfBirth">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item hasFeedback label="Email" name="email">
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item hasFeedback label="Blood group" name="bloodType">
              <Input placeholder="Blood group" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item hasFeedback label="Address" name="address">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default PatientForm;
