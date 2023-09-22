'use client'

import { useToast } from "@/components/ui/use-toast";
import { useCitiesUF } from "@/hooks/useCitiesUF";
import { useUF } from "@/hooks/useUF";
import { SelectSearchModel, SelectSearchShema } from "@/schemas/select-search.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { cn } from "@/lib/utils"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


function SelectSearchTemplate() {
  const { toast } = useToast()

  const form = useForm<SelectSearchModel>({
    mode: 'all',
    resolver: zodResolver(SelectSearchShema),
  })

  const selectedUF = form.watch('uf') // Capturar a uf selecionada
  const { ufs } = useUF() // Retorna todas as UF
  const { citiesUF } = useCitiesUF({ ufSelected: selectedUF }) // Retorna as cidades a partir da UF selecionada
  
  function onSubmit(data: SelectSearchModel){
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
      <h3 className="text-lg text-slate-500">Componente de select com um campo de pesquisa</h3>
      <div className="max-w-xl w-full my-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="m-auto flex flex-col justify-between items-center gap-2 gap-y-4">
            {/* Estadado */}
            <FormField
              name="uf"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full flex flex-col">
                  <FormLabel>UF</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? ufs.find((uf) => uf.sigla.toLowerCase() === field.value)?.sigla : "Selecione uma uf"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[36rem] p-0">
                      <Command>
                        <CommandInput placeholder="Procure por uma uf..." className="h-9"/>
                        <CommandEmpty>Nenhuma UF encontrada</CommandEmpty>
                        <CommandGroup>
                          <ScrollArea className="h-72 rounded-md border">
                            {ufs.map((uf) => (
                              <CommandItem key={uf.id} value={uf.sigla.toLowerCase()}
                              onSelect={(currentValue => (
                                form.setValue('uf', currentValue),
                                form.clearErrors('uf')
                              ))}>
                                {uf.sigla}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    uf.sigla.toLowerCase() === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </ScrollArea>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Selecione o seu estado, para que possamos disponibilizar a sua cidade
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Cidade */}
            <FormField
              name="city"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full flex flex-col mt-4">
                  <FormLabel>Cidade</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? citiesUF.find((city) => city.nome.toLowerCase() === field.value)?.nome : "Selecione sua cidade"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[36rem] p-0">
                      <Command>
                        <CommandInput placeholder="Procure por uma cidade..." className="h-9"/>
                        <CommandEmpty>Nenhuma cidade encontrada</CommandEmpty>
                        <CommandGroup>
                          <ScrollArea className="h-72 rounded-md border">
                            {citiesUF.map((city) => (
                              <CommandItem key={city.id} value={city.nome.toLowerCase()}
                              onSelect={(currentValue => (
                                form.setValue('city', currentValue),
                                form.clearErrors('city')
                              ))}>
                                {city.nome}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    city.nome.toLowerCase() === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </ScrollArea>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Selecione a sua cidade de acordo com seu estado
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Enviar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default SelectSearchTemplate
