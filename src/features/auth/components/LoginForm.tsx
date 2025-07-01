"use client";

import React from "react";
import { AuthWrapper } from "./AuthWrapper";
import { Button, Form, Input } from "antd";
import { useLoginMutation } from "@/hooks/auth/useLoginMutation";
import { TypeLoginSchema } from "../schemes/login.schema";

const SERVER_URL = process.env.SERVER_URL;

export default function LoginForm() {
  const [form] = Form.useForm();

  const { login, isLoadingLogin } = useLoginMutation();

  const onFinish = async (values: TypeLoginSchema) => {
    // login({ values });
    
    const res = await fetch(`https://yarden.tech/webhook/izhgoodfood/login`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("res headers", res.headers);
  };
  return (
    <div className="flex justify-center items-center h-screen p-2">
      <AuthWrapper
        heading="Войти"
        description="Ваши любимые блюда ждут вас! Осталось только ввести почту и пароль"
        backButtonLabel="Зарегистрироваться"
        backButtonHref="/auth/register/"
      >
        <Form
          form={form}
          name="login"
          style={{ width: "100%" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="on"
          requiredMark={false}
        >
          <Form.Item
            label="Email"
            name="email"
            required
            tooltip="Обязательное поле!"
            rules={[{ required: true, message: "Пожалуйста, введите email" }]}
          >
            <Input
              disabled={isLoadingLogin}
              style={{
                fontSize: "14px",
                fontWeight: "600",
              }}
              type="email"
              placeholder="example@example.com"
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            required
            tooltip="Обязательное поле!"
            rules={[{ required: true, message: "Пожалуйста, введите пароль" }]}
          >
            <Input
              disabled={isLoadingLogin}
              style={{
                fontSize: "14px",
                fontWeight: "600",
              }}
              type="password"
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
              className="w-full h-12 flex items-center justify-center"
              loading={isLoadingLogin}
            >
              <span className="mr-2">Войти</span>
            </Button>
          </Form.Item>
        </Form>
      </AuthWrapper>
    </div>
  );
}
