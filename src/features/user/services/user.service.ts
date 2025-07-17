import { api } from "@/shared/api";
import { TypeUserSchema } from "../schemes";
import { tokenUtils } from "@/shared/utils/token.utils";
import { DeliveryIntervalResponse, LoginResponse } from "@/types";

class UserService {
  private token: string | null = tokenUtils.getToken();
  public async updateUser(body: TypeUserSchema) {
    const res = await api.put<LoginResponse>("user", body, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    const responseToken = res.data?.token;
    if (responseToken) {
      tokenUtils.setToken(responseToken);
    } else {
      console.log("Токен не найден в ответе");
    }

    return res;
  }

  public async getIntervals() {
    const res = await api.get<DeliveryIntervalResponse>("delivery-interval", {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return res;
  }
}

export const userService = new UserService();
