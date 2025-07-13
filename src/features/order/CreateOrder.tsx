"use client";
import { useGetCurrenMenu } from "@/hooks";
import { MenuDay, UserInfo } from "@/types";
import { Spin, App } from "antd";
import React, { useState } from "react";
import OrderModal from "./components/OrderModal";

export default function CreateOrder({
  userInfo,
  isModalOpen,
  setIsModalOpen,
}: {
  userInfo: UserInfo;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}) {
  const { currentMenu, isLoadingCurrentMenu } = useGetCurrenMenu();
  console.log(currentMenu);
  return (
    <App>
      <Spin spinning={isLoadingCurrentMenu}>
        <OrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          menuData={(currentMenu as any)?.data as MenuDay[]}
        />
      </Spin>
    </App>
  );
}
