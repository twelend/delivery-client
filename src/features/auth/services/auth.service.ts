import { api } from "@/shared/api";
import { TypeRegisterSchema } from "../schemes";
import { TypeLoginSchema } from "../schemes/login.schema";

interface LoginResponse {
  data: any;
  headers: {
    authorization?: string;
    Authorization?: string;
    token?: string;
    [key: string]: string | undefined;
  };
}

class AuthService {
  public async register(body: TypeRegisterSchema) {
    const headers = undefined;

    const response = await api.post<LoginResponse>("registration", body, { headers });
    const token = response.headers?.['token'];

    if (token) {
      localStorage.setItem('session', token);
      console.log('Токен сохранен в localStorage');
    } else {
      console.log('Токен не найден в заголовках');
    }


    return response;
  }

  public async login(body: TypeLoginSchema) {
    const headers = undefined;

    const response = await api.post<LoginResponse>("login", body, { headers });

    const token = response.headers?.['token'];
    
    if (token) {
      localStorage.setItem('session', token);
      console.log('Токен сохранен в localStorage');
    } else {
      console.log('Токен не найден в заголовках');
    }

    return response;
  }

  public async logout() {
    const response = await api.post("logout", {});

    return response;
  }

}

export const authService = new AuthService();