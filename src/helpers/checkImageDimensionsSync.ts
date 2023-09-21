type Props = {
  file: File | null | undefined,
  maxWidth: number
  maxHeight: number
}
export function checkImageDimensionsSync({ file, maxWidth, maxHeight}: Props): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    // O campo é opcional, então é válido se for null ou undefined
    if (!file) {
      resolve(true);
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      // Verifique as dimensões da imagem aqui
      if (width <= maxWidth && height <= maxHeight) {
        console.log('A imagem atende aos critérios de resolução');
        resolve(true); // A imagem atende aos critérios de resolução
      } else {
        console.log('A imagem não atende aos critérios de resolução');
        resolve(false); // A imagem não atende aos critérios de resolução
      }
    };

    img.onerror = () => {
      console.log('Erro ao carregar a imagem');
      resolve(false); // Erro ao carregar a imagem
    };
  });
}