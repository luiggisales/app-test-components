'use client'

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';
import { cn } from "@/lib/utils";

type CalendarCustomProps = {
  view: Date,
  value: Date
  onChange: (date: Date) => void
}

function CalendarCustom({ view, onChange, value }: CalendarCustomProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal", !view && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {view ? format(view, 'dd/MMM/yyyy', { locale: ptBR }) : <span>Selecione uma Data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className=" w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={value}
          onDayClick={onChange}
          fromYear={1960}
          toYear={2030} />
      </PopoverContent>
    </Popover>
  )
}

export default CalendarCustom
