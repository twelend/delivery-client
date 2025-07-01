import { Card, Col, Row, Space, Tag, Typography } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { getStatusConfig } from "@/utils/getStatusConfig";

const { Text, Title } = Typography;

export const HistoryContentTab = ({ orderHistory }: { orderHistory: any }) => (
  <Row gutter={[16, 16]}>
    {orderHistory.map((order: any) => (
      <Col xs={24} lg={12} xl={8} key={order.id}>
        <Card
          hoverable
          style={{ height: "100%" }}
          actions={[
            <Button type="text" icon={<StarOutlined />} key="rate">
              Оценить
            </Button>,
            <Button type="text" icon={<PlusOutlined />} key="repeat">
              Повторить
            </Button>,
          ]}
        >
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Tag
                color={getStatusConfig(order.status).color}
                icon={getStatusConfig(order.status).icon}
                style={{ fontSize: 12 }}
              >
                {getStatusConfig(order.status).text}
              </Tag>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {new Date(order.date).toLocaleDateString("ru-RU")}
              </Text>
            </div>

            <Title level={5} style={{ margin: "8px 0" }}>
              {order.restaurant}
            </Title>

            <div style={{ minHeight: 60 }}>
              {order.items.slice(0, 2).map((item: any, index: number) => (
                <Text
                  key={index}
                  type="secondary"
                  style={{ fontSize: 13, display: "block" }}
                >
                  • {item}
                </Text>
              ))}
              {order.items.length > 2 && (
                <Text type="secondary" style={{ fontSize: 12 }}>
                  и еще {order.items.length - 2} позиций
                </Text>
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <Title level={4} style={{ margin: 0 }}>
                {order.total} ₽
              </Title>
              {order.rating && (
                <Space>
                  <StarOutlined style={{ color: "#faad14" }} />
                  <Text>{order.rating}</Text>
                </Space>
              )}
            </div>

            <Text type="secondary" style={{ fontSize: 11 }}>
              #{order.id}
            </Text>
          </Space>
        </Card>
      </Col>
    ))}
  </Row>
);
