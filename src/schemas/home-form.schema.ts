import { isValidPtBRDate } from '@/helpers/isValidPtBRDate';
import { z } from 'zod';
export const MAX_SIZE_FILE = 2 * 1024 * 1024

export const HomeSchema = z.object({
  file: z
  .array(
    z.object({
      path: z.string(),
      name: z.string().min(1, 'O nome do arquivo deve ter pelo menos 1 caractere.'),
      lastModified: z.number(),
      size: z
        .number()
        .min(1, 'O tamanho do arquivo deve ser maior que 0 bytes.')
        .max(MAX_SIZE_FILE, 'O tamanho máximo do arquivo é de 2MB'),
      type: z
        .string()
        .regex(
          /^(image\/(jpg|jpeg|png|webp))$/,
          'Os arquivos devem ser imagens com as extensões .jpg, .jpeg, .png ou .webp.'
        ),
    })
  )
  .min(1, 'Por favor, faça o upload de pelo menos um arquivo.')
  .transform((files) => files.length > 0 && files[0]),
  name: z.string().min(1, 'Preencha o campo de nome'),
  date: z.date({
    required_error: "A date of birth is required.",
  }),
});
export type HomeData = z.infer<typeof HomeSchema>;
