"use client";
import {
  Modal,
  Tabs,
  Card,
  Checkbox,
  Button,
  Badge,
  Space,
  Typography,
  Divider,
  Row,
  Col,
  Tag,
  App,
} from "antd";
import {
  ShoppingCartOutlined,
  ClearOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { MenuModalProps, SelectedItems } from "@/types";
import { Input } from "antd";
import { useCreateOrderMutation } from "@/hooks/order/useCreateOrderMutation";

const { TextArea } = Input;

const { Title, Text } = Typography;

const categoryNames: Record<string, string> = {
  breakfast: "Завтрак",
  snack: "Перекус",
  lunch: "Обед",
  afternoon_snack: "Полдник",
  dinner: "Ужин",
  second_snack: "Второй перекус",
};

const categoryIcons: Record<string, string> = {
  breakfast: "🌅",
  snack: "🥗",
  lunch: "🍽️",
  afternoon_snack: "🍎",
  dinner: "🌙",
  second_snack: "☕",
};

const categoryColors: Record<string, string> = {
  breakfast: "#859d63",
  snack: "#5c7fa3",
  lunch: "#9d635c",
  afternoon_snack: "#639d7a",
  dinner: "#635c9d",
  second_snack: "#5c9d95",
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

interface SelectedDish {
  id: string;
  quantity: number;
}

export default function OrderModal({
  isOpen,
  onClose,
  menuData,
}: MenuModalProps) {
  const { modal } = App.useApp();
  const [selectedItems, setSelectedItems] = useState<
    Record<string, Record<string, SelectedDish[]>>
  >({});
  const [dayComments, setDayComments] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState("0");
  const { create, isLoadingCreate } = useCreateOrderMutation();

  const toggleItemSelection = (
    dayDate: string,
    category: string,
    itemId: string
  ) => {
    setSelectedItems((prev) => {
      const daySelections = prev[dayDate] || {};
      const categorySelections = daySelections[category] || [];

      const isSelected = categorySelections.some((item) => item.id === itemId);
      let newCategorySelections: SelectedDish[];
      if (isSelected) {
        newCategorySelections = categorySelections.filter(
          (item) => item.id !== itemId
        );
      } else {
        newCategorySelections = [
          ...categorySelections,
          { id: itemId, quantity: 1 },
        ];
      }

      return {
        ...prev,
        [dayDate]: {
          ...daySelections,
          [category]: newCategorySelections,
        },
      };
    });
  };

  const handleDayCommentChange = (dayDate: string, comment: string) => {
    setDayComments((prev) => ({ ...prev, [dayDate]: comment }));
  };

  const isItemSelected = (
    dayDate: string,
    category: string,
    itemId: string
  ) => {
    return (
      selectedItems[dayDate]?.[category]?.some((item) => item.id === itemId) ||
      false
    );
  };

  const getTotalSelectedItems = () => {
    let total = 0;
    Object.values(selectedItems).forEach((daySelections) => {
      Object.values(daySelections).forEach((categorySelections) => {
        total += categorySelections.length;
      });
    });
    return total;
  };

  const getCategorySelectedCount = (dayDate: string, category: string) => {
    return selectedItems[dayDate]?.[category]?.length || 0;
  };

  const handleClearAll = () => {
    modal.confirm({
      title: "Очистить все выбранные блюда?",
      content: "Это действие нельзя отменить",
      okText: "Да, очистить",
      cancelText: "Отмена",
      onOk: () => {
        setSelectedItems({});
        setDayComments({});
      },
    });
  };

  const handleSubmitOrder = () => {
    const order = Object.entries(selectedItems).map(([date, categories]) => ({
      date,
      comment: dayComments[date] || "",
      items: Object.values(categories)
        .flat()
        .map((item) => ({
          dish_id: item.id,
          quantity: 1,
        })),
    }));
    create(order);

    setSelectedItems({});
    setDayComments({});
    onClose();
  };

  const tabItems = (menuData || []).map((day, index) => ({
    key: index.toString(),
    label: (
      <Space>
        <CalendarOutlined />
        {formatDate(day.date)}
      </Space>
    ),
    children: (
      <div
        style={{
          maxHeight: "60vh",
          overflowY: "auto",
          scrollbarWidth: "none",
          padding: "16px 8px",
        }}
      >
        <Row gutter={[16, 16]}>
          {day.dishes?.map((category) => (
            <Col
              xs={24}
              sm={12}
              lg={8}
              key={`${day.date}-${category.category}`}
            >
              <Badge.Ribbon
                text={`${getCategorySelectedCount(
                  day.date,
                  category.category
                )} выбрано`}
                color={categoryColors[category.category]}
                style={{
                  display:
                    getCategorySelectedCount(day.date, category.category) > 0
                      ? "block"
                      : "none",
                }}
              >
                <Card
                  size="small"
                  title={
                    <Space>
                      <span style={{ fontSize: "18px" }}>
                        {categoryIcons[category.category] || "🍴"}
                      </span>
                      <Text strong>
                        {categoryNames[category.category] || category.category}
                      </Text>
                    </Space>
                  }
                  styles={{
                    header: {
                      backgroundColor: "#fafafa",
                      borderBottom: `2px solid ${
                        categoryColors[category.category]
                      }20`,
                    },
                    body: { padding: "12px" },
                  }}
                  hoverable
                >
                  <Space
                    direction="vertical"
                    style={{ width: "100%" }}
                    size="small"
                  >
                    {category.items.map((item) => {
                      const isSelected = isItemSelected(
                        day.date,
                        category.category,
                        item.id
                      );
                      return (
                        <div
                          key={item.id}
                          style={{
                            borderRadius: "6px",
                            backgroundColor: isSelected ? "#f6ffed" : "#fafafa",
                            border: isSelected
                              ? "1px solid #b7eb8f"
                              : "1px solid #f0f0f0",
                            transition: "all 0.2s",
                          }}
                        >
                          <Checkbox
                            checked={isSelected}
                            style={{
                              width: "100%",
                              padding: "8px",
                              borderRadius: "6px",
                            }}
                            onChange={() =>
                              toggleItemSelection(
                                day.date,
                                category.category,
                                item.id
                              )
                            }
                          >
                            <Text
                              style={{
                                fontSize: "13px",
                                color: isSelected ? "#389e0d" : "#595959",
                                fontWeight: isSelected ? 500 : 400,
                              }}
                            >
                              {item.name}
                            </Text>
                          </Checkbox>
                        </div>
                      );
                    })}
                  </Space>
                </Card>
              </Badge.Ribbon>
            </Col>
          ))}
        </Row>
        <div style={{ marginTop: 16 }}>
          <TextArea
            placeholder="Комментарий к заказу на этот день"
            value={dayComments[day.date] || ""}
            onChange={(e) => handleDayCommentChange(day.date, e.target.value)}
            style={{ fontSize: 13 }}
            autoSize
          />
        </div>
      </div>
    ),
  }));

  return (
    <Modal
      title={
        <Space>
          <ShoppingCartOutlined style={{ color: "#52c41a" }} />
          <Title level={4} style={{ margin: 0 }}>
            Выбор меню на неделю
          </Title>
        </Space>
      }
      open={isOpen}
      onCancel={() => {
        setSelectedItems({});
        setDayComments({});
        onClose();
      }}
      width="95%"
      style={{ maxWidth: "1200px", top: 20 }}
      footer={null}
      destroyOnHidden
    >
      <Divider style={{ margin: "16px 0" }} />

      <Tabs
        className="tabs"
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        size="small"
        tabPosition="top"
        style={{ minHeight: "400px" }}
      />

      <Divider style={{ margin: "16px 0" }} />

      <div
        style={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "white",
          padding: "16px 0",
          borderTop: "1px solid #f0f0f0",
          marginTop: "16px",
        }}
      >
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "12px" }}
        >
          <Col>
            <Space>
              <ShoppingCartOutlined style={{ color: "var(--primary-color)" }} />
              <Text type="secondary">Выбрано блюд:</Text>
              <Tag color="var(--primary-color)" style={{ margin: 0 }}>
                {getTotalSelectedItems()}
              </Tag>
            </Space>
          </Col>
          <Col>
            <Button
              type="text"
              size="small"
              icon={<ClearOutlined />}
              onClick={handleClearAll}
              disabled={getTotalSelectedItems() === 0}
            >
              Очистить все
            </Button>
          </Col>
        </Row>

        <Button
          type="primary"
          size="large"
          block
          icon={<CheckCircleOutlined />}
          onClick={handleSubmitOrder}
          disabled={getTotalSelectedItems() === 0}
          style={{
            height: "48px",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          {getTotalSelectedItems() > 0
            ? `Отправить заказ (${getTotalSelectedItems()})`
            : "Выберите блюда"}
        </Button>
      </div>
    </Modal>
  );
}
