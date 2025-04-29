import AppointmentCard from "@/components/appointments/AppointmentCard";
import { getAppointments } from "@/lib/api/appointments/service";
import { Col, Row } from "antd";
import { getStaticProps } from "next/dist/build/templates/pages";
import React from "react";

export async function getStaticProps() {
  const appointments = await getAppointments();
  return { props: { appointments } };
}

const Home = ({ appointments }) => {
  console.log(appointments);
  return (
    <>
      <Row gutter={[16, 16]}>
        {appointments.map((appointment) => {
          return (
            <>
              <Col span={12} key={appointment.id}>
                <AppointmentCard appointment={appointment} />
              </Col>
            </>
          );
        })}
      </Row>
    </>
  );
};

export default Home;
