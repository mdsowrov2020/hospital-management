import { Card, Avatar, Typography, Row, Col } from "antd";
import { PhoneOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const DoctorProfileCard = ({ profile }) => {
  console.log(profile);

  const {
    fullName,
    specialization,
    availableDays,
    availableHours,
    licenseNumber,
  } = profile;
  return (
    <Card
      style={{ maxWidth: 350, margin: "auto", borderRadius: 12 }}
      bodyStyle={{ padding: 0 }}
      cover={
        <div
          style={{ background: "#000", padding: "70px 0", textAlign: "center" }}
        >
          <Title style={{ color: "#fff", marginBottom: 0 }} level={4}>
            {fullName}
          </Title>
          <Text style={{ color: "#ccc" }}>{specialization}</Text>
        </div>
      }
    >
      <div style={{ textAlign: "center", marginTop: -40 }}>
        <Avatar
          size={80}
          src="/path-to-your-profile-image.png"
          style={{ border: "3px solid white" }}
        />
        <div style={{ marginTop: 12 }}>
          <Text>
            456, Estern evenue, Courtage area,
            <br />
            New York
          </Text>
        </div>
        <div style={{ marginTop: 10 }}>
          <PhoneOutlined /> <Text>264-625-2583</Text>
        </div>
        <Row gutter={16} justify="center" style={{ marginTop: 20 }}>
          <Col span={8}>
            <Text strong>564</Text>
            <br />
            <Text type="secondary">Following</Text>
          </Col>
          <Col span={8}>
            <Text strong>18k</Text>
            <br />
            <Text type="secondary">Followers</Text>
          </Col>
          <Col span={8}>
            <Text strong>565</Text>
            <br />
            <Text type="secondary">Post</Text>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default DoctorProfileCard;
