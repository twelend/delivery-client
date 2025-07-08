"use client";

import CreateOrder from "@/features/order/CreateOrder";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Tooltip, Typography } from "antd";
import React, { useState } from "react";
import { toast } from "sonner";

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
  const [visibleCreateOrder, setVisibleCreateOrder] = useState(false);
  
  
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
            onClick={() => {
              if (!userInfo.address) {
                toast.error("Для создания заказа необходимо добавить адрес!", {
                  position: "top-center",
                  duration: 3000,
                  style: {
                    backgroundColor: "var(--primary-bg-color)",
                    color: "var(--text-dark)",
                  },
                });
              }
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
            position: "relative",
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
                <Tooltip
                  title={`${!userInfo?.address ? "Для создания заказа необходимо заполнить профиль!" : "Создать новый заказ"}`}
                  placement="top"
                >
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
                    disabled={!userInfo?.address}
                    onClick={() => setVisibleCreateOrder(true)}
                  >
                    Создать новый заказ
                  </Button>
                </Tooltip>
              </Col>
            </Row>
          </div>
        </div>
      )}
      <Modal
        title="Новый заказ"
        open={visibleCreateOrder}
        onCancel={() => setVisibleCreateOrder(false)}
        footer={null}
      >
        <CreateOrder userInfo={userInfo} />
      </Modal>
    </>
  );
}
