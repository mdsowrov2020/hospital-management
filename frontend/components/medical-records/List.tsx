import { useAuth } from "@/context/AuthProvider";
import { getMedicalRecordsByPatient } from "@/lib/api/medical-records/service";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button, Modal, Descriptions } from "antd";
import CustomeTable from "../ui/CustomeTable";

const List = () => {
  const { patientProfile } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const getMedicalRecords = async () => {
      try {
        setLoading(true);
        const response = await getMedicalRecordsByPatient(
          String(patientProfile?.id)
        );

        if (!response) {
          return toast.error("No medical record found");
        }

        setRecords(response);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMedicalRecords();
  }, [patientProfile?.id]);

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  const columns = [
    {
      title: "Diagnosis",
      dataIndex: "diagnosis",
      key: "diagnosis",
    },
    {
      title: "Treatment",
      dataIndex: "treatment",
      key: "treatment",
    },
    {
      title: "Medications",
      dataIndex: "medications",
      key: "medications",
    },
    {
      title: "Allergies",
      dataIndex: "allergies",
      key: "allergies",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Patient Name",
      dataIndex: ["Patient", "fullName"],
      key: "patientName",
    },
    {
      title: "Patient Email",
      dataIndex: ["Patient", "User", "email"],
      key: "patientEmail",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleViewRecord(record)}>
          View Record
        </Button>
      ),
    },
  ];

  return (
    <div>
      <CustomeTable
        dataSource={records.map((item) => ({ ...item, key: item.id }))}
        columns={columns}
      />

      <Modal
        title="Medical Record Details"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Close
          </Button>,
        ]}
        centered
      >
        {selectedRecord && (
          <Descriptions
            bordered
            column={1}
            size="middle"
            labelStyle={{ fontWeight: 600, width: "30%" }}
          >
            <Descriptions.Item label="Diagnosis">
              {selectedRecord.diagnosis}
            </Descriptions.Item>
            <Descriptions.Item label="Treatment">
              {selectedRecord.treatment}
            </Descriptions.Item>
            <Descriptions.Item label="Medications">
              {selectedRecord.medications}
            </Descriptions.Item>
            <Descriptions.Item label="Allergies">
              {selectedRecord.allergies}
            </Descriptions.Item>
            <Descriptions.Item label="Notes">
              {selectedRecord.notes}
            </Descriptions.Item>
            <Descriptions.Item label="Date">
              {new Date(selectedRecord.date).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Patient Name">
              {selectedRecord.Patient?.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedRecord.Patient?.User?.email}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default List;
