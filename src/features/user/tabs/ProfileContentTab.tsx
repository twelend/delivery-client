import { Card, Col, Row, Skeleton, Space, Typography } from "antd";
import {
  UserOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  StarOutlined,
  HeartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { Input } from "antd";
import { Form } from "antd";
import { Avatar } from "antd";
import { useState } from "react";
import PhoneInputField from "@/shared/PhoneInputField";
import { TypeUserSchema } from "../schemes";

const { Text, Title, Paragraph } = Typography;

export const ProfileContentTab = ({
  orderHistory,
  currentOrder,
  isMobile,
  userInfo,
  setUserInfo,
}: {
  orderHistory: any;
  currentOrder: any;
  isMobile?: boolean;
  userInfo: any;
  setUserInfo: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phone || "");
  const handleSave = (values: TypeUserSchema) => {
    setUserInfo(values);
    setIsEditing(false);
  };

  const handleCancel = () => {
    form.setFieldsValue(userInfo);
    setIsEditing(false);
  };

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} lg={16}>
        <Card
          title={
            <Space>
              <UserOutlined />
              Личная информация
            </Space>
          }
          extra={
            !isEditing ? (
              <Button
                type="primary"
                ghost
                icon={<EditOutlined />}
                onClick={() => {
                  setIsEditing(true);
                  form.setFieldsValue(userInfo);
                }}
                style={{
                  borderColor: "var(--primary-color)",
                  color: "var(--primary-color)",
                }}
              >
                {isMobile ? "" : "Изменить"}
              </Button>
            ) : (
              <Space>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={() => form.submit()}
                  style={{ backgroundColor: "#88ba55", borderColor: "#88ba55" }}
                >
                  {isMobile ? "" : "Сохранить"}
                </Button>
                <Button icon={<CloseOutlined />} onClick={handleCancel}>
                  {isMobile ? "" : "Отмена"}
                </Button>
              </Space>
            )
          }
          style={{ height: "100%" }}
        >
          {isEditing ? (
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSave}
              initialValues={userInfo}
            >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="full_name"
                    label="ФИО"
                    rules={[{ required: true, message: "Введите ФИО" }]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="phone"
                    label="Телефон"
                    rules={[
                      { required: true, message: "Введите номер телефона" },
                    ]}
                  >
                    <PhoneInputField
                      value={phoneNumber}
                      onChange={(value) => setPhoneNumber(value)}
                      placeholder="Номер телефона*"
                      size="large"
                      className="border-gray-300"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Введите email" },
                  { type: "email", message: "Введите корректный email" },
                ]}
              >
                <Input size="large" prefix={<MailOutlined />} />
              </Form.Item>
              <Form.Item
                name="address"
                label="Адрес доставки"
                rules={[{ required: true, message: "Введите адрес доставки" }]}
              >
                <Input size="large" prefix={<EnvironmentOutlined />} />
              </Form.Item>
            </Form>
          ) : (
            <Row gutter={[16, 24]}>
              <Col xs={24} md={12}>
                <div>
                  <Text type="secondary">ФИО</Text>
                  <Paragraph
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      margin: "4px 0 0 0",
                    }}
                  >
                    {userInfo ? userInfo.full_name : <Skeleton.Input />}
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div>
                  <Text type="secondary">
                    <PhoneOutlined style={{ marginRight: 8 }} />
                    Телефон
                  </Text>
                  <Paragraph style={{ fontSize: 16, margin: "4px 0 0 0" }}>
                    {userInfo ? userInfo.phone : <Skeleton.Input />}
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div>
                  <Text type="secondary">
                    <MailOutlined style={{ marginRight: 8 }} />
                    Email
                  </Text>
                  <Paragraph style={{ fontSize: 16, margin: "4px 0 0 0" }}>
                    {userInfo ? userInfo.email : <Skeleton.Input />}
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div>
                  <Text type="secondary">
                    <EnvironmentOutlined style={{ marginRight: 8 }} />
                    Адрес доставки
                  </Text>
                  <Paragraph style={{ fontSize: 16, margin: "4px 0 0 0" }}>
                    {userInfo ? userInfo.address : <Skeleton.Input />}
                  </Paragraph>
                </div>
              </Col>
            </Row>
          )}
        </Card>
      </Col>

      <Col xs={24} lg={8}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Card>
            <div style={{ textAlign: "center" }}>
              {userInfo ? (
                <Avatar
                  size={80}
                  style={{
                    backgroundColor: "var(--primary-color)",
                    fontSize: 32,
                  }}
                >
                  {userInfo.full_name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </Avatar>
              ) : (
                <Skeleton.Avatar active size={80} />
              )}
              <Title level={4} style={{ margin: "16px 0 8px 0" }}>
                {userInfo ? userInfo.full_name : <Skeleton.Input />}
              </Title>
              <Text type="secondary">Клиент</Text>
            </div>
          </Card>

          {/* <Card title="Статистика">
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text>Всего заказов:</Text>
                <Text strong>{orderHistory.length + 1}</Text>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text>Потрачено:</Text>
                <Text strong>
                  {(
                    orderHistory.reduce(
                      (sum: number, order: any) => sum + order.total,
                      0
                    ) + currentOrder.total
                  ).toLocaleString()}{" "}
                  ₽
                </Text>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text>Средний рейтинг:</Text>
                <Space>
                  <StarOutlined style={{ color: "#faad14" }} />
                  <Text strong>4.7</Text>
                </Space>
              </div>
            </Space>
          </Card>

          <Card title="Тут можно еще что-то запихать">
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <Button
                block
                icon={<HeartOutlined />}
                type="text"
                style={{ textAlign: "left" }}
              >
                Типо избранные блюда
              </Button>
              <Button
                block
                icon={<SettingOutlined />}
                type="text"
                style={{ textAlign: "left" }}
              >
                Типо настройки какие-нибудь
              </Button>
            </Space>
          </Card> */}
        </Space>
      </Col>
    </Row>
  );
};
