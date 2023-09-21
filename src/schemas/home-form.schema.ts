import { checkImageDimensions } from '@/helpers/checkImageDimensions';
import { checkImageDimensionsSync } from '@/helpers/checkImageDimensionsSync';
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
    const isValidDimensions = await checkImageDimensionsSync({ file: file[0], maxWidth: 640, maxHeight: 640 });

    // Verifica o tipo de arquivo apenas se as dimensões forem válidas
    if (isValidDimensions) {
      return ACCEPTED_IMAGE_TYPES.includes(file[0].type);
    }

    return false;
  }, { message: `Formato inválido ou dimensões da imagem não atendem aos critérios. Formatos aceitos jpeg, jpg, png, webp e ter 640x640px` })
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
    required_error: "A date of birth is required.",
  }),
});
export type HomeData = z.infer<typeof HomeSchema>;

/*

// O arquivo não sendo opcional

file: z.custom<FileList>().refine((files) => {
    // Verifica se o usuário forneceu um arquivo
    if (!files || files.length === 0) {
      return false
    }
    return files
  }, { message: "A imagem de perfil é obrigatória"})
  .refine((files) => {
    // Verifica o tamanho em mb da imagem, e se é um formato aceito
    if (!files || files.length !== 0 && files[0].size > MAX_FILE_SIZE && ACCEPTED_IMAGE_TYPES.includes(files[0].type)){
      return false
    }
    return files
  },{ message: 'A imagem precisa ser até 2mb'})
  .refine((files) => {
    // Verifica se o formato da imagem é aceito
    if (!files || files.length !== 0 && !ACCEPTED_IMAGE_TYPES.includes(files[0].type)){
      return false
    }
    return files
  }, { message: 'Selecione uma imagem entre jpeg, jpg, png, webp'})
  .refine(async (files) => {
    // Verifica a dimensão da imagem, nesse caso, só são aceitos as dimensões  640x640 pixels
    if (!files || files.length !== 0 && !await checkImageDimensions({ file: files[0], resolution: {
      minWidth: 640,
      minHeight: 640
    }})){
      return false
    }
    return files
  },{ message: `Imagem muito grande, a imagem deve ter pelo menos 640x640 pixels`}),

*/

/*
  
// O arquivo sendo opcional

file: z
  .custom<FileList | null | undefined>()
  .optional()
  .refine((file) => {
    if (!file){
      return true; // O campo é opcional, então é válido se for null ou undefined
    }
    // Verifica se é um formato aceito
    if (!ACCEPTED_IMAGE_TYPES.includes(file[0].type)){
      return false
    }
    return true
  }, { message: 'Selecione uma imagem entre jpeg, jpg, png, webp'})
  .refine((file) => {
    if (!file) {
      return true; // O campo é opcional, então é válido se for null ou undefined
    }

    // Verifica o tamanho em MB da imagem e se é um formato aceito
    if (file[0].size > MAX_FILE_SIZE && !ACCEPTED_IMAGE_TYPES.includes(file[0].type)) {
      return false;
    }
    return true;
  }, { message: 'A imagem precisa ser até 2 MB e de um formato aceito' })
  .refine(async (file) => {
    if (!file) {
      return true; // O campo é opcional, então é válido se for null ou undefined
    }

    // Verifica as dimensões da imagem, nesse caso, só são aceitas dimensões de 640x640 pixels
    if (await checkImageDimensions({ file: file[0], resolution: { minWidth: 640, minHeight: 640 }})){
      return false
    }
    return true;
  }, { message: `Imagem muito grande, a imagem deve ter pelo menos 640x640 pixels` }),

*/