'use client'

import axios from "axios";
import { useEffect, useState } from "react";

interface City {
  id: number,
  nome: string
}

type Props = {
  ufSelected: string
}

export function useCitiesUF({ ufSelected }: Props){
  const [citiesUF, setCitiesUF] = useState<City[]>([])

  useEffect(() => {
    if (ufSelected || ufSelected !== ''){
      axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelected}/municipios`).then((response) => setCitiesUF(response.data))
    }
  },[ufSelected])

  return {
    citiesUF
  }
}