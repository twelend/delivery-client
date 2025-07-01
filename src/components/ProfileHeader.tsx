import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import React from "react";

const { Title, Text } = Typography;

export default function ProfileHeader({
  title,
  userInfo,
  isMobile,
}: {
  title: string;
  userInfo: any;
  isMobile: boolean;
}) {
  return (
    <>
      {isMobile ? (
        <div
          style={{
            background: "var(--primary-color)",
            color: "white",
            padding: "24px 16px 32px",
          }}
        >
          <Title
            level={2}
            style={{ color: "white", textAlign: "center", marginBottom: 24 }}
          >
            Мой профиль
          </Title>

          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            block
            style={{
              backgroundColor: "white",
              color: "var(--primary-color)",
              borderColor: "var(--primary-color)",
              fontWeight: 600,
              height: 48,
              fontSize: 16,
            }}
          >
            Создать новый заказ
          </Button>
        </div>
      ) : (
        <div
          style={{
            background: "var(--primary-color)",
            color: "white",
            padding: "40px 0",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <Row align="middle" justify="space-between">
              <Col>
                <Title level={1} style={{ color: "white", margin: 0 }}>
                  Мой профиль
                </Title>
                <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 16 }}>
                  Управляйте своими данными и заказами
                </Text>
              </Col>
              <Col>
                <Button
                  type="primary"
                  size="large"
                  icon={<PlusOutlined />}
                  style={{
                    backgroundColor: "white",
                    color: "var(--primary-color)",
                    borderColor: "white",
                    fontWeight: 600,
                    height: 48,
                    fontSize: 16,
                    paddingLeft: 24,
                    paddingRight: 24,
                  }}
                >
                  Создать новый заказ
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  );
}
