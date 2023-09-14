'use client'

import FileUpload from "@/components/upload-drop";
import { HomeData, HomeSchema } from "@/schemas/home-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

function HomeTemplate() {
  const [dataView, setDataView] = useState<HomeData>()
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
    
  }  
  return (
    <div className='w-full flex flex-col m-auto min-h-screen p-4 items-center'>
      <h1 className='font-bold text-3xl text-slate-600'>Bem vindo</h1>
      <h3 className="text-lg text-slate-500">Componente de Upload de Arquivos em Formulários</h3>
      <div className="max-w-xl w-full my-4">
        <form onSubmit={handleSubmit(onSubmit)} className="m-auto flex flex-col justify-between items-center gap-2">
          <div className="w-full m-auto">
            <label className="block text-gray-600 font-bold mb-2">
              Upload de Arquivos
            </label>
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
          <div className="w-full m-auto">
            <label className="block text-gray-600 font-bold mb-2">
              Nome
            </label>
            <input type="text" {...register('name')} placeholder="Digite seu nome completo" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            {errors.name && (
              <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
            )}
          </div>
          <div className="mt-2 text-center w-full flex justify-between items-center gap-x-4">
            <button
              type="submit"
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Enviar
            </button>
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
