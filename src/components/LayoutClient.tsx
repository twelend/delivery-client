"use client";

import { useEffect, useState } from "react";
import { ConfigProvider } from "antd";
import theme from "@/utils/themeConfig";
import LoadSpinner from "@/shared/LoadSpinner";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function LayoutClient({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? (
    <div className="fixed inset-0 flex items-center justify-center bg-primaryBg">
      <LoadSpinner />
    </div>
  ) : (
    <ConfigProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <div className="antialiased">{children}</div>
      </QueryClientProvider>
    </ConfigProvider>
  );
}
