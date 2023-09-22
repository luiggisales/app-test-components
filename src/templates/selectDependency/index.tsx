'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { useUF } from "@/hooks/useUF"
import { useCitiesUF } from "@/hooks/useCitiesUF"
import { SelectDependencyModel, SelectDependencyShema } from "@/schemas/select-dependency.schema"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"

function SelectDependencyTemplate() {
  const { toast } = useToast()

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<SelectDependencyModel>({
    mode: 'all',
    resolver: zodResolver(SelectDependencyShema),
  });

  const selectedUF = watch('uf') // Capturar a uf selecionada
  const { ufs } = useUF() // Retorna todas as UF
  const { citiesUF } = useCitiesUF({ ufSelected: selectedUF }) // Retorna as cidades a partir da UF selecionada
  
  function onSubmit(data: SelectDependencyModel){
    toast({
      title: 'Você completou o formulário corretamente:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }  

  return (
    <div className='w-full flex flex-col m-auto min-h-screen p-4 items-center'>
      <h1 className='font-bold text-3xl text-slate-600'>Bem vindo</h1>
      <h3 className="text-lg text-slate-500">Componente de selec com dependencia em alguma informação</h3>
      <div className="max-w-xl w-full my-4">
        <form onSubmit={handleSubmit(onSubmit)} className="m-auto flex flex-col justify-between items-center gap-2 gap-y-4">
          {/* UF */}
          <div className="w-full m-auto my-3">
            <Controller
              name="uf"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} {...field}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma UF" />
                  </SelectTrigger>
                  <SelectContent className="h-auto max-h-[300px] overflow-y-auto">
                    <SelectGroup>
                      <SelectLabel>UF</SelectLabel>
                      {ufs.map(uf => (
                        <SelectItem key={uf.id} value={String(uf.id)}>{uf.sigla}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.uf && (
              <div className="text-red-500 text-sm mt-2 overflow-hidden">{errors.uf.message}</div>
            )}
          </div>
          {/* Cidade */}
          <div className="w-full m-auto my-3">
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} {...field}>
                  <SelectTrigger className="w-full mt-4">
                    <SelectValue placeholder="Selecione uma Cidade" />
                  </SelectTrigger>
                  <SelectContent className="h-auto max-h-[300px] overflow-y-auto">
                    <SelectGroup>
                      <SelectLabel>Cidade</SelectLabel>
                      {citiesUF.map((city) => (
                        <SelectItem key={city.id} value={String(city.nome)}>{city.nome}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.city && (
              <div className="text-red-500 text-sm mt-2 overflow-hidden">{errors.city.message}</div>
            )}
          </div>

          <Button className="w-full" type="submit">
            Enviar
          </Button>
        </form>
      </div>
    </div>
  )
}

export default SelectDependencyTemplate
