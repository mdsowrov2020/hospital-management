import { Card, Row, Col, Statistic, Table } from "antd";
import Layout from "../components/layout/AppLayout";

// Custom card styling with different colors
const cardStyles = [
  { background: "#f6ffed", borderColor: "#b7eb8f", color: "#389e0d" }, // Green
  { background: "#e6f7ff", borderColor: "#91d5ff", color: "#1890ff" }, // Blue
  { background: "#fff2e8", borderColor: "#ffbb96", color: "#fa541c" }, // Orange
  { background: "#f9f0ff", borderColor: "#d3adf7", color: "#722ed1" }, // Purple
];

export default function Dashboard() {
  return (
    <>
      <Row gutter={16}>
        <Col span={6}>
          <Card
            bordered={true}
            style={cardStyles[0]}
            headStyle={{
              borderBottom: `1px solid ${cardStyles[0].borderColor}`,
            }}
          >
            <Statistic
              title="Total Patients"
              value={1254}
              valueStyle={{ color: cardStyles[0].color }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            bordered={true}
            style={cardStyles[1]}
            headStyle={{
              borderBottom: `1px solid ${cardStyles[1].borderColor}`,
            }}
          >
            <Statistic
              title="Active Doctors"
              value={48}
              valueStyle={{ color: cardStyles[1].color }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            bordered={true}
            style={cardStyles[2]}
            headStyle={{
              borderBottom: `1px solid ${cardStyles[2].borderColor}`,
            }}
          >
            <Statistic
              title="Today's Appointments"
              value={32}
              valueStyle={{ color: cardStyles[2].color }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            bordered={true}
            style={cardStyles[3]}
            headStyle={{
              borderBottom: `1px solid ${cardStyles[3].borderColor}`,
            }}
          >
            <Statistic
              title="Pending Records"
              value={5}
              valueStyle={{ color: cardStyles[3].color }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Recent Appointments" style={{ marginTop: 24 }}>
        <h2>I am dashboard</h2>
      </Card>
    </>
  );
}
