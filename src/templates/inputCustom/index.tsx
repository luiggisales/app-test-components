'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast";
import { toastPosition } from "@/config/toast-positon.config";
import { cn } from "@/lib/utils";
import { inputCustomModel, inputCustomSchema } from "@/schemas/input-custom.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function InputCustomTemplate() {
  const { toast } = useToast()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<inputCustomModel>({
    mode: 'all',
    resolver: zodResolver(inputCustomSchema),
  });

  function onSubmit(data: inputCustomModel){
    console.log(data);
    toast({
      variant: 'success',
      title: 'Formulário',
      description: 'Seus dados foram enviados com sucesso',
      className: cn(toastPosition.bottomRight)
    })
  }
  return (
    <div className='w-full flex flex-col m-auto min-h-screen p-4 items-center'>
      <h1 className='font-bold text-3xl text-slate-600'>Bem vindo</h1>
      <h3 className="text-lg text-slate-500">Componente de input com adaptação de password</h3>
      <div className="max-w-xl w-full my-4">
        <form onSubmit={handleSubmit(onSubmit)} className="m-auto flex flex-col justify-between items-center gap-2">
          <div className="w-full m-auto">
            <Label className="block text-gray-600 font-bold mb-2">
              Nome
            </Label>
            <Input {...register('name')} placeholder="Digite seu nome completo"/>
            {errors.name && (
              <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
            )}
          </div>
          <div className="w-full m-auto">
            <Label className="block text-gray-600 font-bold mb-2">
              Email
            </Label>
            <Input {...register('email')} placeholder="Digite seu email"/>
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
            )}
          </div>
          <div className="w-full m-auto">
            <Label className="block text-gray-600 font-bold mb-2">
              Senha
            </Label>
            <Input placeholder="Digite sua senha" type="password" {...register('password')}/>
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
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
    </div>
  )
}

export default InputCustomTemplate
