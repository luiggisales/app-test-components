'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import FileUpload from "@/components/upload-drop";
import { HomeData, HomeSchema } from "@/schemas/home-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

function HomeTemplate() {
  const [dataView, setDataView] = useState<HomeData>()
  const { toast } = useToast()
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<HomeData>({
    mode: 'all',
    resolver: zodResolver(HomeSchema),
  });

  function onSubmit(data: HomeData){
    console.log(data);
    setDataView(data)
    toast({
      variant: 'success',
      title: "Formulário",
      description: "Seus dados foram enviados",
      action: (
        <ToastAction altText="obrigado" className="hover:bg-white hover:text-primary">Obrigado</ToastAction>
      ),
    })
  }  
  return (
    <div className='w-full flex flex-col m-auto min-h-screen p-4 items-center'>
      <h1 className='font-bold text-3xl text-slate-600'>Bem vindo</h1>
      <h3 className="text-lg text-slate-500">Componente de Upload de Arquivos em Formulários</h3>
      <div className="max-w-xl w-full my-4">
        <form onSubmit={handleSubmit(onSubmit)} className="m-auto flex flex-col justify-between items-center gap-2">
          <div className="w-full m-auto">
            <Label className="block text-gray-600 font-bold mb-2">
              Upload de Arquivos
            </Label>
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <FileUpload onFileUpload={(files) => field.onChange(files)} />
              )}
            />
            {errors.file && (
              <p className="text-red-500 text-sm mt-2">{errors.file.message}</p>
            )}
          </div>
          <div className="w-full m-auto mt-2">
            <Label className="block text-gray-600 font-bold mb-2">
              Nome
            </Label>
            <Input type="text" {...register('name')} placeholder="Digite seu nome completo" />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
            )}
          </div>
          <div className="mt-2 text-center w-full flex justify-between items-center gap-x-4">
            <Button
              type="submit"
              className="w-full"
            >
              Enviar
            </Button>
          </div>
        </form>
      </div>
      <div className="mt-2 max-w-xl w-full">
        {dataView && <pre className="w-full">{JSON.stringify(dataView,null,2)}</pre>}
      </div>
    </div>
  )
}

export default HomeTemplate
