import CustomeTable from "@/components/ui/CustomeTable";
import { getPatients } from "@/lib/api/patients/service";
import { Patient } from "@/lib/api/patients/types";
import { getAge } from "@/utils/dateHelpers";
import { Button, Modal, Space, TableColumnsType, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import PatientForm from "@/components/patients/PatientForm";

export async function getStaticProps() {
  try {
    const patients = await getPatients();

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
  console.log("Response : ", patients);
  const dataSource = patients.map((patient) => {
    return {
      key: patient.id,
      name: `${patient.User?.firstName} ${patient.User?.lastName}`,
      age: getAge(patient.dateOfBirth) + "y",
      address: patient.address,
      gender: patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1),
      bloodGroup: patient.bloodType,
      phoneNumber: patient.phoneNumber,
    };
  });

  const handleEdit = (data: Patient) => {
    console.log("Edit clicked: ", data);
    const userName = `${data.User.firstName} ${data.User.lastName}`;
    setModalTitle(userName);
    setIsModalOpen(true);
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
      render: (gender: string) => {
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
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <PatientForm />
      </Modal>
      <CustomeTable dataSource={dataSource} columns={columns} />
    </>
  );
};

export default Patients;
