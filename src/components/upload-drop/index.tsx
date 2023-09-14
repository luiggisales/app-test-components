import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MAX_SIZE_FILE } from '@/schemas/home-form.schema';
import Image from 'next/image';
import { UploadCloud } from 'lucide-react';
import { FaUser } from 'react-icons/fa'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';

interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isFileAccepted, setIsFileAccepted] = useState(true);


  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Chamado quando os arquivos são aceitos após o upload
    onFileUpload(acceptedFiles);

    // Exiba a pré-visualização da primeira imagem carregada
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string' || reader.result === null) {
          setPreviewImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onFileUpload]);

  function ChangeImage(){
    // Limpar a imagem e permitir que o usuário faça o upload novamente
    setPreviewImage(null);
    setIsFileAccepted(true);
  }

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    maxSize: MAX_SIZE_FILE,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg'],
      'image/jpg': ['.jpg'],
      'image/webp': ['.webp'],
    }, // Defina o tipo de arquivo que deseja aceitar
  });

  return (
    <>
    {/* Preview */}
    <div className='w-full m-auto mb-4 flex flex-col justify-center items-center'>
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground">
        {previewImage ? (
          <Avatar className='w-full h-full'>
            <AvatarFallback>LS</AvatarFallback>
            <AvatarImage src={previewImage}/>
          </Avatar>
        ) : (
          <FaUser size={24} />
        )}
      </div>
    </div>
    {/* Upload */}
    <div
      data-success={isDragAccept}
      data-error={isDragReject}
      className={`flex h-full w-full flex-col items-center justify-center rounded-md border-[3px] border-dashed border-slate-600 bg-slate-200 px-2 py-3
        data-[success=true]:border-green-600 data-[error=true]:border-red-600
      `}>
      <div data-success={isDragAccept} data-error={isDragReject} {...getRootProps()} className={`flex flex-col items-center justify-center text-gray-600 w-full h-full
        data-[success=true]:text-green-600 data-[error=true]:text-red-600  
      `}>
        <Input {...getInputProps()} />
        <div data-success={isDragAccept} data-error={isDragReject} className={`m-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-300 text-root_secondary-200
        data-[success=true]:text-green-600 data-[error=true]:text-red-600  
        `}>
          <UploadCloud size={18} />
        </div>
        {previewImage ? (
        <div className='m-auto flex justify-between items-center gap-x-4'>
          <button
            onClick={ChangeImage}
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Alterar Imagem
          </button>
        </div>
        ) : (
          <>
            <p className="text-lg">Arraste e solte um arquivo aqui</p>
            <p className="text-sm">ou clique para selecionar um arquivo</p>
          </>
        )}
      </div>
      </div>
    </>
  );
};

export default FileUpload;