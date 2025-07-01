import "@ant-design/v5-patch-for-react-19";
import type { Metadata } from "next";
import { ConfigProvider } from "antd";
import "./globals.css";
import theme from "../utils/themeConfig";
import "antd/dist/reset.css";
import LayoutClient from "@/components/LayoutClient";

export const metadata: Metadata = {
  title: {
    absolute: "Доставка еды",
    template: "%s | ISHGOODFOOD",
  },
  description: "Быстрая доставка вкусной еды",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConfigProvider theme={theme}>
      <html lang="ru">
        <body className="antialiased p-2">
          <LayoutClient>{children}</LayoutClient>
        </body>
      </html>
    </ConfigProvider>
  );
}
