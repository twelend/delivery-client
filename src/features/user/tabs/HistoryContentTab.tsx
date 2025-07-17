"use client";
import { Card, Col, Row, Space, Tag, Typography } from "antd";
import {
  CheckCircleOutlined,
  EyeOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { getStatusConfig } from "@/utils/getStatusConfig";
import { useGetHistoryMenu } from "@/hooks/order/useGetHistoryMenu";

const { Text, Title } = Typography;

export const HistoryContentTab = () => {
  const { historyMenu, isLoadingHistoryMenu } = useGetHistoryMenu();
  const data = (historyMenu as { data?: any[] })?.data ?? [];

  const categoryLabels: Record<string, string> = {
    breakfast: "Завтрак",
    lunch: "Обед",
    snack: "Перекус",
    afternoon_snack: "Полдник",
    dinner: "Ужин",
  };

  return (
    <Row gutter={[16, 16]}>
      {[...data].sort((a, b) => Number(b.id) - Number(a.id)).map((order: any) => (
        <Col xs={24} lg={12} xl={8} key={order.id}>
          <Card hoverable style={{ height: "100%" }}>
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text strong>
                  Заказ от{" "}
                  {new Date(order.created_at).toLocaleDateString("ru-RU")}
                </Text>
                <Text type="secondary">#{order.id}</Text>
              </div>
              {order.items.map((day: any, idx: number) => (
                <div
                  key={idx}
                  style={{
                    marginBottom: 8,
                    padding: 8,
                    background: "#fafafa",
                    borderRadius: 6,
                  }}
                >
                  <Text type="secondary" style={{ fontSize: 13 }}>
                    {new Date(day.date).toLocaleDateString("ru-RU")}
                  </Text>
                  {day.dishes.map((dishCat: any, catIdx: number) => (
                    <div key={catIdx} style={{ marginLeft: 8, marginTop: 4 }}>
                      <Text strong style={{ fontSize: 13 }}>
                        {categoryLabels[dishCat.category] || dishCat.category}
                      </Text>
                      <ul style={{ margin: 0, paddingLeft: 16 }}>
                        {dishCat.items.map((dish: any, dishIdx: number) => (
                          <li key={dishIdx}>
                            <Text style={{ fontSize: 13 }}>
                              <CheckCircleOutlined color="green" /> {dish.name}{" "}
                              <Text type="secondary">×{dish.quantity}</Text>
                            </Text>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <hr style={{ margin: "10px 0" }} />
                  <Text type="secondary" style={{ fontSize: 14 }}>
                    Комментарий: {day.comment ? day.comment : "Нет комментария"}
                  </Text>
                </div>
              ))}
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
