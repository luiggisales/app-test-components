type Props = {
  file: File,
  maxWidth: number,
  maxHeight: number
}

// Função para verificar as dimensões da imagem após o carregamento
export async function checkImageDimensions({file, maxWidth, maxHeight }: Props): Promise<boolean> {
  if (!file) {
    return true; // O campo é opcional, então é válido se for null ou undefined
  }
  return new Promise<boolean>((resolve) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;

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
    };

    reader.readAsDataURL(file);
  });
}