import { z } from "zod";

export const LoginSchema = z
  .object({
    email: z.string().email({
      message: "Некорректная почта",
    }),
    password: z.string().min(4, {
      message: "Пароль минимум 4 символа",
    }),
  })

export type TypeLoginSchema = z.infer<typeof LoginSchema>
