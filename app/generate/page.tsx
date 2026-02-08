import { Suspense } from 'react'
import { GeneratePage } from '@/pages/generate-page'

export default function Page() {
  return (
    <Suspense>
      <GeneratePage />
    </Suspense>
  )
}
