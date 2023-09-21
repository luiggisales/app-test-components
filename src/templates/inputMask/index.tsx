'use client'

import { InputMask } from '@/components/input-mask';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { toastPosition } from '@/config/toast-positon.config';
import { cn } from '@/lib/utils';
import { inputMaskModel, inputMaskSchema } from '@/schemas/input-mask.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';

function InputMaskTemplate() {
  const { toast } = useToast()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<inputMaskModel>({
    mode: 'all',
    resolver: zodResolver(inputMaskSchema),
  });

  function onSubmit(data: inputMaskModel){
    console.log(data);
    toast({
      variant: 'default',
      title: 'Formulário',
      description: 'Seus dados foram enviados com sucesso',
      className: cn(toastPosition.bottomRight)
    })
  }

  return (
    <div className='w-full flex flex-col m-auto min-h-screen p-4 items-center'>
      <h1 className='font-bold text-3xl text-slate-600'>Bem vindo</h1>
      <h3 className="text-lg text-slate-500">Componente de input com adaptação de mascara</h3>
      <div className="max-w-xl w-full my-4">
        <form onSubmit={handleSubmit(onSubmit)} className="m-auto flex flex-col justify-between items-center gap-2 gap-y-4">
          <div className="w-full m-auto my-3 h-[72px]">
            <Label className="block text-gray-600 font-bold mb-2">
              CPF
            </Label>
            <InputMask {...register('vatNumber')} mask='999.999.999-99'/>
            {errors.vatNumber && (
              <div className="text-red-500 text-sm mt-2 overflow-hidden">{errors.vatNumber.message}</div>
            )}
          </div>
          <div className="w-full m-auto my-3 h-[72px]">
            <Label className="block text-gray-600 font-bold mb-2">
              CEP
            </Label>
            <InputMask {...register('zipCode')} mask='99999-999'/>
            {errors.zipCode && (
              <div className="text-red-500 text-sm mt-2 overflow-hidden">{errors.zipCode.message}</div>
            )}
          </div>
          <div className="w-full m-auto my-3 h-[72px]">
            <Label className="block text-gray-600 font-bold mb-2">
              Celular/Whatsapp
            </Label>
            <InputMask {...register('phoneNumber')} mask='(99) \99999-9999'/>
            {errors.phoneNumber && (
              <div className="text-red-500 text-sm mt-2 overflow-hidden">{errors.phoneNumber.message}</div>
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

export default InputMaskTemplate
