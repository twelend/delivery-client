import { api } from "@/shared/api";
import { TypeRegisterSchema } from "../schemes";
import { TypeLoginSchema } from "../schemes/login.schema";
import { tokenUtils } from "@/shared/utils/token.utils";
import { LoginResponse } from "@/types";


class AuthService {
  public async register(body: TypeRegisterSchema) {
    const headers = undefined;

    const response = await api.post<LoginResponse>("registration", body, { headers });
    const token = response.data?.token;

    if (token) {
      tokenUtils.setToken(token);
    } else {
      console.log('Токен не найден в ответе');
    }

    return response;
  }

  public async login(body: TypeLoginSchema) {
    const headers = undefined;

    const response = await api.post<LoginResponse>("login", body, { headers });
    const token = response.data?.token;
    
    if (token) {
      tokenUtils.setToken(token);
    } else {
      console.log('Токен не найден в ответе');
    }

    return response;
  }

  public async logout() {
    tokenUtils.removeToken();
    return window.location.reload();
  }

}

export const authService = new AuthService();