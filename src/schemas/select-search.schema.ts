import { z } from "zod";

export const SelectSearchShema = z.object({
  uf: z.string({
    required_error: 'Selecione a UF referente a seu estado'
  }),
  city: z.string({
    required_error: 'Selecione a sua cidade'
  })
})

export type SelectSearchModel = z.infer<typeof SelectSearchShema>