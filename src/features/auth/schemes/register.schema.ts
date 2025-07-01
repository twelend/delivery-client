import { z } from "zod";

export const RegisterSchema = z.object({
  full_name: z.string().min(1, {
    message: "Введите ФИО",
  }),
  phone: z.string().min(1, {
    message: "Введите свой номер телефона",
  }),
  email: z.string().email({
    message: "Некорректная почта",
  }),
  password: z.string().min(4, {
    message: "Пароль минимум 4 символа",
  }),
});

export type TypeRegisterSchema = z.infer<typeof RegisterSchema>;
