import { checkImageDimensions } from '@/helpers/checkImageDimensions';
import { z } from 'zod';

export const MAX_FILE_SIZE = 2 * 1024 * 1024
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export const HomeSchema = z.object({
  file: z
  .custom<FileList | null | undefined>()
  .optional()
  .refine(async (file) => {
    // O campo é opcional, então é válido se for null ou undefined
    if (!file) return true;

    // Verificar as dimensões da imagem de forma assíncrona
    const isValidDimensions = await checkImageDimensions({ file: file[0], maxWidth: 640, maxHeight: 640 });

    // Verifica o tipo de arquivo apenas se as dimensões forem válidas
    if (isValidDimensions) {
      return ACCEPTED_IMAGE_TYPES.includes(file[0].type);
    }

    return false;
  }, { message: `Formato inválido ou dimensões da imagem não atendem aos critérios. Formatos aceitos [jpeg, jpg, png, webp], ter 640x640px e conter no máxino 2mb` })
  .refine((file) => {
    // O campo é opcional, então é válido se for null ou undefined
    if (!file) return true;

    // Verifique o tamanho em MB da imagem e se é um formato aceito
    return !(file[0].size > MAX_FILE_SIZE);
  }, { message: 'A imagem precisa conter no máximo 2mb.' })
  .transform((file) => {
    // Se o campo for nulo ou indefinido, converta-o para nulo
    if (!file) return null;

    return file;
  }),

  name: z.string().min(1, 'Preencha o campo de nome'),
  date: z.date({
    required_error: 'Informe sua data de aniversário'
  })
  .refine((date) => {
    // Verifica se a idade mínima é de 18 anos
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  
    return date <= eighteenYearsAgo;
  }, {
    message: "Você deve ter pelo menos 18 anos de idade.",
  }),
});
export type HomeData = z.infer<typeof HomeSchema>;
