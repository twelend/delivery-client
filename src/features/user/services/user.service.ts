import { api } from "@/shared/api";
import { TypeUserSchema } from "../schemes";

class UserService {
    public async getUser() {
        const res = await api.get('user', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('session')}`
            }
        })

        return res
    }

    public async updateUser(body: TypeUserSchema) {
        const res = await api.put('user', body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('session')}`
            }
        })

        return res
    }
}

export const userService = new UserService();