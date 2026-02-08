import { apiClient } from '@/shared/api'
import type { MetadataResult } from '@/shared/lib/metadata'

export interface GenerateInput {
  url?: string
  prompt?: string
}

export async function generateMetadata(input: GenerateInput): Promise<MetadataResult> {
  return apiClient<MetadataResult>('/generate', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}
