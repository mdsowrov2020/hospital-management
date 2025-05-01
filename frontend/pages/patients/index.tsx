import CustomeTable from "@/components/ui/CustomeTable";
import { getPatients } from "@/lib/api/patients/service";
import { Patient } from "@/lib/api/patients/types";
import { getAge } from "@/utils/dateHelpers";
import { Button, Form, Modal, Space, TableColumnsType, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import PatientForm from "@/components/patients/PatientForm";
import dayjs from "dayjs";

export async function getStaticProps() {
  try {
    const patients: Patient[] = await getPatients();

    return {
      props: {
        patients,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching patients:", error);
    return {
      props: {
        patients: [],
      },
      revalidate: 60,
    };
  }
}

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
}

const Patients: React.FC<PatientsProps> = ({ patients }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const [form] = Form.useForm();
  const dataSource = patients.map((patient) => {
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
      };
    }
  });

  const handleEdit = (data: Patient) => {
    console.log("Edit clicked: ", data);
    const userName = data.fullName;
    form.setFieldsValue({
      fullName: data.fullName,
      gender: data.gender,
      phoneNumber: data.phoneNumber,
      dateOfBirth: dayjs(data.dateOfBirth),
      email: data.User.email,
      bloodType: data.bloodType,
      address: data.address,
    });

    setModalTitle(userName);
    setIsModalOpen(true);
  };

  const handleExternalSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form values from outside:", values);
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };

  const handleModalCancel = () => {
    setModalTitle("");
    setIsModalOpen(false);
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
      title: "Gender",
      dataIndex: "gender",
      render: (gender: string | null) => {
        if (!gender) return "-"; // or return null, or any placeholder you prefer

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
              const item: Patient = patients.find(
                (data) => data.id === record.key
              );
              handleEdit(item);
            }}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => console.log("Delete clicked", record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Modal
        title={`Edit Patient ${modalTitle}`}
        open={isModalOpen}
        okText="Update"
        onCancel={handleModalCancel}
        onOk={handleExternalSubmit}
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
      <CustomeTable dataSource={dataSource} columns={columns} />
    </>
  );
};

export default Patients;
