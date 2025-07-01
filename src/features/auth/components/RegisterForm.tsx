"use client";

import React, { useState } from "react";
import { AuthWrapper } from "./AuthWrapper";
import { Button, Form, Input } from "antd";
import PhoneInputField from "@/shared/PhoneInputField";
import { useRegistrationMutation } from "@/hooks/auth/useRegistrationMutation";
import { TypeRegisterSchema } from "../schemes";

export default function RegisterForm() {
  const [form] = Form.useForm();
  const [phoneNumber, setPhoneNumber] = useState("");

  const { register, isLoadingRegister } = useRegistrationMutation();

  const onFinish = (values: TypeRegisterSchema) => {
    register({ values });
  };

  return (
    <div className="flex justify-center items-center h-screen p-2">
      <AuthWrapper
        heading="Регистрация"
        // description="Для регистрации заполните все поля"
        backButtonLabel="Уже есть аккаунт? Войти"
        backButtonHref="/auth/login/"
      >
        <Form
          form={form}
          name="register"
          style={{ width: "100%" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="on"
          requiredMark={false}
        >
          <Form.Item
            label="ФИО"
            name="full_name"
            required
            tooltip="Обязательное поле!"
            rules={[
              { required: true, message: "Пожалуйста, введите ФИО" },
            ]}
          >
            <Input
              disabled={isLoadingRegister}
              placeholder="ФИО*"
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Номер телефона"
            name="phone"
            required
            tooltip="Обязательное поле!"
            rules={[
              { required: true, message: "Пожалуйста, введите номер телефона" },
            ]}
          >
            <PhoneInputField
              disabled={isLoadingRegister}
              value={phoneNumber}
              onChange={(value) => setPhoneNumber(value)}
              placeholder="Номер телефона*"
              size="large"
              className="border-gray-300"
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            required
            tooltip="Обязательное поле!"
            rules={[{ required: true, message: "Пожалуйста, введите email" }]}
          >
            <Input
              style={{
                fontSize: "14px",
                fontWeight: "600",
              }}
              type="email"
              disabled={isLoadingRegister}
              placeholder="example@example.com"
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            required
            tooltip="Обязательное поле!"
            rules={[{ required: true, message: "Необходимо придумать пароль" }]}
          >
            <Input
              style={{
                fontSize: "14px",
                fontWeight: "600",
              }}
              type="password"
              disabled={isLoadingRegister}
              placeholder="Пароль*"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{
                fontSize: "18px",
                fontWeight: "600",
              }}
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoadingRegister}
              className="w-full h-12 flex items-center justify-center"
            >
              <span className="mr-2">Зарегистрироваться</span>
            </Button>
          </Form.Item>
        </Form>
      </AuthWrapper>
    </div>
  );
}
