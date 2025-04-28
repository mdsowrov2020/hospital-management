import DoctorProfileCard from "@/components/doctors/DoctorProfileCard";
import { getDoctors, getDoctorsByDepartment } from "@/lib/api/doctors/service";
import { Doctor } from "@/lib/api/doctors/types";
import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";

const Doctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        let data;
        if (departmentFilter) {
          data = await getDoctorsByDepartment(departmentFilter);
        } else {
          data = await getDoctors();
        }
        setDoctors(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch doctors"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [departmentFilter]);

  if (loading) return <div>Loading doctors...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      Doctors
      <Row gutter={[16, 16]}>
        {doctors.map((doctor) => (
          <Col span={6} key={doctor.id}>
            <DoctorProfileCard doctor={doctor} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Doctors;
