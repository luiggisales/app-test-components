import { z } from "zod";

export const inputCustomSchema = z.object({
  name: z.string().min(1, { message: 'Preencha o campo de nome' }),
  email: z.string().email({ message: 'Forneça uma email válido'}).min(1, { message: 'Preencha o campo de email' }),
  password: z.string().min(8, { message: 'A senha requer no mínimo 8 caracteres' }),
})

export type inputCustomModel = z.infer<typeof inputCustomSchema>