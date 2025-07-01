import { z } from "zod";

export const UserSchema = z.object({
  full_name: z.string().min(1, {
    message: "Введите ФИО",
  }),
  phone: z.string().min(1, {
    message: "Введите свой номер телефона",
  }),
  address: z.string().min(1, {
    message: "Введите адрес",
  })
});

export type TypeUserSchema = z.infer<typeof UserSchema>;
