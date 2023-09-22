'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

interface UF {
  id: number
  sigla: string
  nome: string
}


export function useUF(){
  const [ufs, setUFS] = useState<UF[]>([])

  useEffect(() => {
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/`).then((response) => setUFS(response.data))
  },[])

  return {
    ufs
  }
}