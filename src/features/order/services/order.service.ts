import { api } from "@/shared/api";
import { tokenUtils } from "@/shared/utils/token.utils";

class OrderService {
  private token = tokenUtils.getToken();

  public async getCurrentMenu() {
    const res = await api.get("menu/current", {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return res;
  }

  public async getLastOrders() {
    const res = await api.get("order", {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return res;
  }

  public async createOrder(body: any) {
    const res = await api.post("order", body, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return res;
  }
}

export const orderService = new OrderService();
