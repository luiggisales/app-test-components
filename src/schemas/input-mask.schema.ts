import { z } from "zod";

export const inputMaskSchema = z.object({
  vatNumber: z.string().min(1, { message: 'Preencha o campo de CPF' }),
  zipCode: z.string().min(1, { message: 'Preencha o campo de CEP' }),
  phoneNumber: z.string().min(1, { message: 'Preencha o campo de Número de Telefone' }),
})

export type inputMaskModel = z.infer<typeof inputMaskSchema>