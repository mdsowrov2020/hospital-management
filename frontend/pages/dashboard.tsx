import { Card, Row, Col, Statistic, Table } from "antd";
import Layout from "../components/layout/AppLayout";

export default function Dashboard() {
  return (
    <>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Patients" value={1254} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Active Doctors" value={48} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Today's Appointments" value={32} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Pending Records" value={5} />
          </Card>
        </Col>
      </Row>

      <Card title="Recent Appointments" style={{ marginTop: 24 }}>
        <h2>I am dashboard</h2>
      </Card>
    </>
  );
}
