import {
  CheckCircleOutlined,
  CarOutlined,
  InboxOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

export const getStatusConfig = (status: string) => {
  switch (status) {
    case "delivered":
      return {
        color: "success",
        text: "Доставлен",
        icon: <CheckCircleOutlined />,
      };
    case "in-progress":
      return { color: "processing", text: "В пути", icon: <CarOutlined /> };
    case "preparing":
      return { color: "warning", text: "Готовится", icon: <InboxOutlined /> };
    default:
      return {
        color: "default",
        text: "Неизвестно",
        icon: <ClockCircleOutlined />,
      };
  }
};
