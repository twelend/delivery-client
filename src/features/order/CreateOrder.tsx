"use client";
import { useGetCurrenMenu } from "@/hooks";
import { UserInfo } from "@/types";
import { Spin } from "antd";
import React from "react";

export default function CreateOrder({ userInfo }: { userInfo: UserInfo }) {
  const { currentMenu, isLoadingCurrentMenu } = useGetCurrenMenu();
  console.log(currentMenu);
  return (
    <>
      <Spin spinning={isLoadingCurrentMenu}>
        <div>
          <h1>Current Menu</h1>
        </div>
      </Spin>
    </>
  );
}
