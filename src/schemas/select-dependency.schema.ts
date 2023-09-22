import { z } from "zod";

export const SelectDependencyShema = z.object({
  uf: z.string().refine((val) => val !== '', {
    message: 'Selecione a UF referente a seu estado',
  }),
  city: z.string().refine((val) => val !== '', {
    message: 'Selecione a sua cidade',
  }),
})

export type SelectDependencyModel = z.infer<typeof SelectDependencyShema>