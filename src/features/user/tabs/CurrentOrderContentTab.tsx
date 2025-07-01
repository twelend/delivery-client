import { Card, Col, Empty, Row, Space, Tag, Typography } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { CarOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getStatusConfig } from "@/utils/getStatusConfig";

const { Text, Title } = Typography;

export const CurrentOrderContentTab = ({
  currentOrder,
}: {
  currentOrder: any;
}) => (
  <Row gutter={[24, 24]}>
    <Col xs={24} lg={16}>
      {currentOrder ? (
        <Card>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Tag
                color={getStatusConfig(currentOrder.status).color}
                icon={getStatusConfig(currentOrder.status).icon}
                style={{
                  fontSize: 14,
                  padding: "6px 16px",
                  borderRadius: 20,
                }}
              >
                {getStatusConfig(currentOrder.status).text}
              </Tag>
              <Text type="secondary">#{currentOrder.id}</Text>
            </div>

            <Title level={2} style={{ margin: 0 }}>
              {currentOrder.restaurant}
            </Title>

            <Card
              size="small"
              style={{
                backgroundColor: "#f8f9fa",
                border: "1px solid #e9ecef",
              }}
              title={<Text strong>Состав заказа:</Text>}
            >
              <Row gutter={[16, 8]}>
                {currentOrder.items.map((item: any, index: number) => (
                  <Col xs={24} sm={12} key={index}>
                    <Text>• {item}</Text>
                  </Col>
                ))}
              </Row>
            </Card>

            <div style={{ display: "flex", alignItems: "center" }}>
              <EnvironmentOutlined
                style={{ marginRight: 12, color: "#666", fontSize: 16 }}
              />
              <Text style={{ fontSize: 15 }}>{currentOrder.address}</Text>
            </div>

            <Divider />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18 }}>Итого:</Text>
              <Title level={1} style={{ margin: 0, color: "#ff6b35" }}>
                {currentOrder.total} ₽
              </Title>
            </div>
          </Space>
        </Card>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Нет активных заказов"
          style={{ padding: "60px 20px" }}
        >
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            style={{ backgroundColor: "#ff6b35", borderColor: "#ff6b35" }}
          >
            Создать заказ
          </Button>
        </Empty>
      )}
    </Col>

    <Col xs={24} lg={8}>
      <Card title="Отслеживание заказа" style={{ height: "100%" }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "#e6f7ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <CarOutlined style={{ fontSize: 32, color: "#1890ff" }} />
            </div>
            <Title level={4}>Заказ в пути</Title>
            <Text type="secondary">Ожидаемое время доставки: 25-30 мин</Text>
          </div>

          <div>
            <Text strong>Курьер:</Text>
            <br />
            <Text>Иван Петров</Text>
            <br />
            <Text type="secondary">+7 (999) 888-77-66</Text>
          </div>
        </Space>
      </Card>
    </Col>
  </Row>
);
