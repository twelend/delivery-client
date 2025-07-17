import { Card, Col, Row, Select, Skeleton, Space, Typography } from "antd";
import {
  UserOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  SettingOutlined,
  LogoutOutlined,
  PayCircleOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { Input } from "antd";
import { Form } from "antd";
import { Avatar } from "antd";
import { useEffect, useState } from "react";
import PhoneInputField from "@/shared/PhoneInputField";
import { useUpdateMutation } from "@/hooks/user/useUpdateMutation";
import { authService } from "@/features/auth/services/auth.service";
import TextArea from "antd/es/input/TextArea";
import { userService } from "../services/user.service";

const { Text, Title, Paragraph } = Typography;

export const ProfileContentTab = ({
  isMobile,
  userInfo,
}: {
  isMobile?: boolean;
  userInfo: any;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phone || "");
  const [showMore, setShowMore] = useState(true);
  const { updateUser, isLoadingUpdateUser } = useUpdateMutation();
  const [intervals, setIntervals] = useState<{
    id: number;
    from: string;
    to: string;
  }[]>([]);

  const handleSave = (values: any) => {
    setIsEditing(false);
    updateUser({
      full_name: values.full_name || null,
      phone: values.phone || null,
      address: values.address || null,
      delivery_interval_id: values.delivery_interval_id || 1,
      delivery_type: values.delivery_type || "contact",
      peculiarities: values.peculiarities || null,
      plastic_recycling: values.plastic_recycling || false,
      payment_method: values.payment_method || "cash",
      cutlery_and_napkins: values.cutlery_and_napkins || false,
    });
  };

  useEffect(() => {
    userService.getIntervals().then((res) => {
      setIntervals(res.data);
    });
  }, []);

  useEffect(() => {
    if (isEditing && userInfo) {
      form.setFieldsValue({
        full_name: userInfo.full_name,
        phone: userInfo.phone,
        address: userInfo.address,
        delivery_interval_id: userInfo.delivery_interval_id,
        delivery_type: userInfo.delivery_type,
        peculiarities: userInfo.peculiarities,
        plastic_recycling: userInfo.plastic_recycling || false,
        payment_method: userInfo.payment_method,
        cutlery_and_napkins: userInfo.cutlery_and_napkins || false,
      });
    }
  }, [isEditing, userInfo, form]);

  const handleCancel = () => {
    if (userInfo) {
      form.setFieldsValue({
        full_name: userInfo.full_name,
        phone: userInfo.phone,
        address: userInfo.address,
        delivery_interval_id: userInfo.delivery_interval_id,
        delivery_type: userInfo.delivery_type,
        peculiarities: userInfo.peculiarities,
        plastic_recycling: userInfo.plastic_recycling || false,
        payment_method: userInfo.payment_method,
        cutlery_and_napkins: userInfo.cutlery_and_napkins || false,
      });
    }
    setIsEditing(false);
  };

  const paymentMethod = (method: string) => {
    switch (method) {
      case "cash":
        return "Наличными";
      case "terminal":
        return "При получении";
      case "transfer":
        return "Переводом";
      case "qr":
        return "QR-кодом";
      case "invoice":
        return "Счет";
      default:
        return "Не указан";
    }
  };

  const paymentMethods = [
    { label: "Наличными", value: "cash" },
    { label: "При получении", value: "terminal" },
    { label: "Переводом", value: "transfer" },
    { label: "QR-кодом", value: "qr" },
    { label: "Счет", value: "invoice" },
  ];

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
                loading={isLoadingUpdateUser}
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
                  loading={isLoadingUpdateUser}
                  icon={<SaveOutlined />}
                  onClick={() => form.submit()}
                  style={{ backgroundColor: "#88ba55", borderColor: "#88ba55" }}
                >
                  {isMobile ? "" : "Сохранить"}
                </Button>
                <Button
                  loading={isLoadingUpdateUser}
                  icon={<CloseOutlined />}
                  onClick={handleCancel}
                >
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
                    <Input size="large" disabled={isLoadingUpdateUser} />
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
                <Input disabled={true} size="large" prefix={<MailOutlined />} />
              </Form.Item>
              <Form.Item
                name="address"
                label="Адрес доставки"
                rules={[{ required: true, message: "Введите адрес доставки" }]}
              >
                <Input
                  size="large"
                  prefix={<EnvironmentOutlined />}
                  disabled={isLoadingUpdateUser}
                  placeholder="Улица, дом, квартира, этаж, подъезд, код домофона"
                />
              </Form.Item>
              <Row gutter={16}>
                <Col xs={24} md={8}>
                  <Form.Item name="plastic_recycling" label="Сбор пластика">
                    <Select
                      options={[
                        { label: "Да", value: true },
                        { label: "Нет", value: false },
                      ].map((method) => ({
                        label: method.label,
                        value: method.value,
                      }))}
                      size="large"
                      disabled={isLoadingUpdateUser}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    name="payment_method"
                    label="Способ оплаты"
                    rules={[
                      { required: true, message: "Выберите способ оплаты" },
                    ]}
                  >
                    <Select
                      options={paymentMethods.map((method) => ({
                        label: method.label,
                        value: method.value,
                      }))}
                      size="large"
                      disabled={isLoadingUpdateUser}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    name="delivery_type"
                    label="Способ доставки"
                    rules={[
                      { required: true, message: "Выберите способ доставки" },
                    ]}
                  >
                    <Select
                      options={[
                        { label: "Получить лично", value: "contact" },
                        { label: "Оставить у двери", value: "without_contact" },
                      ].map((method) => ({
                        label: method.label,
                        value: method.value,
                      }))}
                      size="large"
                      disabled={isLoadingUpdateUser}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item name="cutlery_and_napkins" label="Приборы">
                    <Select
                      options={[
                        { label: "Да", value: true },
                        { label: "Нет", value: false },
                      ].map((method) => ({
                        label: method.label,
                        value: method.value,
                      }))}
                      size="large"
                      disabled={isLoadingUpdateUser}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="delivery_interval_id"
                    label="Интервалы доставки"
                  >
                    <Select
                      options={intervals.map((interval) => ({
                        label: `${interval.from} - ${interval.to}`,
                        value: interval.id,
                      }))}
                      size="large"
                      disabled={isLoadingUpdateUser}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="peculiarities" label="Предпочтения">
                <TextArea
                  size="large"
                  disabled={isLoadingUpdateUser}
                  placeholder="Аллергии, ограничения, предпочтения"
                  rows={4}
                />
              </Form.Item>
            </Form>
          ) : isLoadingUpdateUser ? (
            <Skeleton active />
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
                    {userInfo && userInfo.full_name ? (
                      userInfo.full_name
                    ) : userInfo ? (
                      "Не указан"
                    ) : (
                      <Skeleton.Input />
                    )}
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
                    {userInfo && userInfo.phone ? (
                      userInfo.phone
                    ) : userInfo ? (
                      "Не указан"
                    ) : (
                      <Skeleton.Input />
                    )}
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
                    {userInfo && userInfo.email ? (
                      userInfo.email
                    ) : userInfo ? (
                      "Не указан"
                    ) : (
                      <Skeleton.Input />
                    )}
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
                    {userInfo && userInfo.address ? (
                      userInfo.address
                    ) : userInfo ? (
                      "Не указан"
                    ) : (
                      <Skeleton.Input />
                    )}
                  </Paragraph>
                </div>
              </Col>
              {(!isMobile || (isMobile && !showMore)) && (
                <>
                  <Col xs={24} md={12}>
                    <div>
                      <Text type="secondary">
                        <HeartOutlined style={{ marginRight: 8 }} />
                        Сбор пластика
                      </Text>
                      <Paragraph style={{ fontSize: 16, margin: "4px 0 0 0" }}>
                        {userInfo && userInfo.plastic_recycling ? (
                          userInfo.plastic_recycling ? (
                            "Да"
                          ) : (
                            "Нет"
                          )
                        ) : userInfo ? (
                          "Не указан"
                        ) : (
                          <Skeleton.Input />
                        )}
                      </Paragraph>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div>
                      <Text type="secondary">
                        <PayCircleOutlined style={{ marginRight: 8 }} />
                        Способ оплаты
                      </Text>
                      <Paragraph style={{ fontSize: 16, margin: "4px 0 0 0" }}>
                        {userInfo && userInfo.payment_method ? (
                          paymentMethod(userInfo.payment_method)
                        ) : userInfo ? (
                          "Не указан"
                        ) : (
                          <Skeleton.Input />
                        )}
                      </Paragraph>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div>
                      <Text type="secondary">
                        <SettingOutlined style={{ marginRight: 8 }} />
                        Способ доставки
                      </Text>
                      <Paragraph style={{ fontSize: 16, margin: "4px 0 0 0" }}>
                        {userInfo && userInfo.delivery_type ? (
                          userInfo.delivery_type === "contact" ? (
                            "Получить лично"
                          ) : (
                            "Оставить у двери"
                          )
                        ) : userInfo ? (
                          "Не указано"
                        ) : (
                          <Skeleton.Input />
                        )}
                      </Paragraph>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div>
                      <Text type="secondary">
                        <SettingOutlined style={{ marginRight: 8 }} />
                        Предпочтения
                      </Text>
                      <Paragraph style={{ fontSize: 16, margin: "4px 0 0 0" }}>
                        {userInfo && userInfo.peculiarities ? (
                          userInfo.peculiarities
                        ) : userInfo ? (
                          "Не указан"
                        ) : (
                          <Skeleton.Input />
                        )}
                      </Paragraph>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div>
                      <Text type="secondary">
                        <SettingOutlined style={{ marginRight: 8 }} />
                        Приборы
                      </Text>
                      <Paragraph style={{ fontSize: 16, margin: "4px 0 0 0" }}>
                        {userInfo &&
                        userInfo.cutlery_and_napkins !== undefined ? (
                          userInfo.cutlery_and_napkins ? (
                            "Да"
                          ) : (
                            "Нет"
                          )
                        ) : userInfo ? (
                          "Не указан"
                        ) : (
                          <Skeleton.Input />
                        )}
                      </Paragraph>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div>
                      <Text type="secondary">
                        <ClockCircleOutlined style={{ marginRight: 8 }} />
                        Интервал доставки
                      </Text>
                      <Paragraph style={{ fontSize: 16, margin: "4px 0 0 0" }}>
                        {userInfo &&
                        userInfo.delivery_interval_id !== undefined ? (
                          userInfo.delivery_interval_id ? (
                            intervals.find(
                              (interval) =>
                                interval.id === userInfo.delivery_interval_id
                            )?.from + " - " + intervals.find(
                              (interval) =>
                                interval.id === userInfo.delivery_interval_id
                            )?.to
                          ) : (
                            "Не указан"
                          )
                        ) : userInfo ? (
                          "Не указан"
                        ) : (
                          <Skeleton.Input />
                        )}
                      </Paragraph>
                    </div>
                  </Col>
                </>
              )}
              {isMobile && (
                <Col xs={24} md={24}>
                  <div style={{ textAlign: "center" }}>
                    <Button
                      type="text"
                      onClick={() => setShowMore(!showMore)}
                      style={{ color: "var(--primary-color)" }}
                    >
                      {showMore ? "Показать всю информацию" : "Свернуть"}
                      {showMore ? (
                        <ArrowDownOutlined style={{ fontSize: 16 }} />
                      ) : (
                        <ArrowUpOutlined style={{ fontSize: 16 }} />
                      )}
                    </Button>
                  </div>
                </Col>
              )}
            </Row>
          )}
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={() => {
              authService.logout();
            }}
            style={{
              position: "absolute",
              top: 66,
              right: 24,
            }}
          >
            Выйти
          </Button>
        </Card>
      </Col>

      <Col xs={24} lg={8}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Card>
            <div style={{ textAlign: "center", position: "relative" }}>
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
                    .slice(0, 2)
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
