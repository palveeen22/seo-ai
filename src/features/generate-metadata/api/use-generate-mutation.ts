'use client'

import { useMutation } from '@tanstack/react-query'
import { generateMetadata, type GenerateInput } from './generate-api'

export function useGenerateMutation() {
  return useMutation({
    mutationFn: (input: GenerateInput) => generateMetadata(input),
  })
}
