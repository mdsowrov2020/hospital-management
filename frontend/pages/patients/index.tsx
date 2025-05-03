import CustomeTable from "@/components/ui/CustomeTable";
import { getPatients, updatePatient } from "@/lib/api/patients/service";
import { Patient } from "@/lib/api/patients/types";
import { getAge } from "@/utils/dateHelpers";
import { Button, Form, Modal, Space, TableColumnsType, Tag } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import PatientForm from "@/components/patients/PatientForm";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import PatientDetail from "@/components/patients/PatientDetail";

interface PatientsProps {
  patients: Patient[];
}

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  bloodType: string;
  updatedBy: string;
}

const Patients: React.FC<PatientsProps> = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editModalTitle, setEditModalTitle] = useState("");
  const [viewModalTitle, setViewModalTitle] = useState("");
  const [patientId, setPatientId] = useState<number>();
  const [form] = Form.useForm();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [patient, setPatient] = useState();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();
        setPatients(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch patients");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const dataSource = patients
    .map((patient) => {
      if (patient) {
        return {
          key: patient.id,
          name: patient.fullName,
          age: getAge(patient.dateOfBirth) + "y",
          address: patient.address,
          gender:
            patient.gender?.charAt(0).toUpperCase() + patient.gender?.slice(1),
          bloodGroup: patient.bloodType,
          phoneNumber: patient.phoneNumber,
          updatedBy: patient.updatedBy,
        };
      }
      return null;
    })
    .filter(Boolean);

  const handleEdit = (data: Patient) => {
    setPatientId(data.id);
    form.setFieldsValue({
      ...data,
      dateOfBirth: dayjs(data.dateOfBirth),
      email: data.User?.email,
    });
    setEditModalTitle(data.fullName);
    setIsEditModalOpen(true);
  };

  const viewDetail = (record: Patient) => {
    setPatient(record);
    setViewModalTitle(record.fullName);
    setIsViewModalOpen(true);
  };

  const handleExternalSubmit = async () => {
    try {
      setUpdating(true);
      const values = await form.validateFields();

      if (values && patientId) {
        const updatedPatient = await updatePatient(patientId, values);
        if (updatedPatient) {
          toast.success("Patient updated successfully");
          setIsEditModalOpen(false);
          form.resetFields();

          // Refresh the patients list
          const data = await getPatients();
          setPatients(data);
        }
      }
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
      toast.error("Failed to update patient");
    } finally {
      setUpdating(false);
    }
  };

  const handleEditModalCancel = () => {
    form.resetFields();
    setEditModalTitle("");
    setIsEditModalOpen(false);
  };

  const handleViewModalCancel = () => {
    setViewModalTitle("");
    setIsViewModalOpen(false);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Blood group",
      dataIndex: "bloodGroup",
    },
    {
      title: "Updated by",
      dataIndex: "updatedBy",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      render: (gender: string | null) => {
        if (!gender) return "-";

        const capitalized = gender.charAt(0).toUpperCase() + gender.slice(1);
        let color: string;

        switch (gender.toLowerCase()) {
          case "male":
            color = "blue";
            break;
          case "female":
            color = "magenta";
            break;
          case "other":
            color = "purple";
            break;
          default:
            color = "default";
        }

        return <Tag color={color}>{capitalized}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              const item = patients.find((data) => data.id === record.key);
              if (item) handleEdit(item);
            }}
          >
            Edit
          </Button>
          <Button
            type="link"
            icon={<EyeInvisibleOutlined />}
            onClick={() => {
              const item = patients.find((data) => data.id === record.key);
              if (item) viewDetail(item);
            }}
          >
            View
          </Button>
        </Space>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {/* Edit Patient Modal */}
      <Modal
        title={`Edit Patient - ${editModalTitle}`}
        open={isEditModalOpen}
        okText="Update"
        onCancel={handleEditModalCancel}
        onOk={handleExternalSubmit}
        confirmLoading={updating}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <PatientForm form={form} />
      </Modal>

      {/* Patient Detail Modal */}
      <Modal
        title={`About - ${viewModalTitle}`}
        open={isViewModalOpen}
        okText="Done"
        onCancel={handleViewModalCancel}
        onOk={handleViewModalCancel}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <PatientDetail patient={patient ? patient : {}} />
      </Modal>

      <CustomeTable dataSource={dataSource} columns={columns} />
    </>
  );
};

export default Patients;
