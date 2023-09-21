type Props = {
  file: File,
  resolution: {
    minWidth: number,
    minHeight: number
  }
}

// Função para verificar as dimensões da imagem após o carregamento
export async function checkImageDimensions({file, resolution }: Props): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;

      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        
        // Verifique as dimensões da imagem aqui
        if (width <= resolution.minWidth && height <= resolution.minHeight) {
          console.log('A imagem atende aos critérios de resolução');
          resolve(false); // A imagem atende aos critérios de resolução
        } else {
          console.log('A imagem não atende aos critérios de resolução');
          resolve(true); // A imagem não atende aos critérios de resolução
        }
      };
    };

    reader.readAsDataURL(file);
  });
}