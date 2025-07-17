"use client";

import { useState, useEffect } from "react";
import { Tabs, Space, Skeleton } from "antd";
import {
  UserOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { HistoryContentTab, ProfileContentTab } from "./tabs";
import { ProfileHeader } from "@/components";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useProfile } from "@/hooks";

export default function ProfilePage() {
  const [isMobile, setIsMobile] = useState(false);

  const { user, isLoadingUser } = useProfile();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const items = [
    {
      key: "profile",
      label: (
        <Space size={isMobile ? "small" : "middle"}>
          <UserOutlined style={{ fontSize: isMobile ? undefined : 16 }} />
          <span style={{ fontSize: isMobile ? 14 : 16 }}>Профиль</span>
        </Space>
      ),
      children: (
        <div style={{ padding: isMobile ? "16px 0" : "0" }}>
          <ErrorBoundary>
            {isLoadingUser ? (
              <Skeleton active />
            ) : (
              <ProfileContentTab
                isMobile={isMobile}
                userInfo={user}
              />
            )}
          </ErrorBoundary>
        </div>
      ),
    },
    // {
    //   key: "current",
    //   label: (
    //     <Space size={isMobile ? "small" : "middle"}>
    //       <ShoppingOutlined style={{ fontSize: isMobile ? undefined : 16 }} />
    //       <span style={{ fontSize: isMobile ? 14 : 16 }}>Текущий</span>
    //       {currentOrder && (
    //         <Badge
    //           dot
    //           color="var(--primary-color)"
    //           style={{
    //             position: "absolute",
    //             top: 0,
    //             right: 0,
    //           }}
    //         />
    //       )}
    //     </Space>
    //   ),
    //   children: (
    //     <div style={{ padding: isMobile ? "16px 0" : "0" }}>
    //       <ErrorBoundary>
    //         <CurrentOrderContentTab currentOrder={currentOrder} />
    //       </ErrorBoundary>
    //     </div>
    //   ),
    // },
    {
      key: "history",
      label: (
        <Space size={isMobile ? "small" : "middle"}>
          <HistoryOutlined style={{ fontSize: isMobile ? undefined : 16 }} />
          <span style={{ fontSize: isMobile ? 14 : 16 }}>История</span>
        </Space>
      ),
      children: (
        <div style={{ padding: isMobile ? "16px 0" : "0" }}>
          <ErrorBoundary>
            <HistoryContentTab />
          </ErrorBoundary>
        </div>
      ),
    },
  ];

  // Для мобилки
  if (isMobile) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <ProfileHeader
          title="Мой профиль"
          userInfo={user}
          isMobile={isMobile}
        />

        <div style={{ padding: 16, paddingBottom: 80 }}>
          <Tabs
            className="tabs"
            defaultActiveKey="profile"
            centered
            size="large"
            items={items}
            style={{
              borderRadius: 8,
              marginBottom: 16,
            }}
            tabBarStyle={{
              margin: 0,
              padding: "0 16px",
            }}
          />
        </div>
      </div>
    );
  }
  /* Для десктопа */
  return (
    <div style={{ minHeight: "100vh" }}>
      <ErrorBoundary>
        <ProfileHeader
          title="Мой профиль"
          userInfo={user}
          isMobile={isMobile}
        />
      </ErrorBoundary>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
        <Tabs
          className="tabs"
          defaultActiveKey="profile"
          size="large"
          items={items}
          tabBarStyle={{
            marginBottom: 32,
            borderBottom: "2px solid #f0f0f0",
          }}
        />
      </div>
    </div>
  );
}
