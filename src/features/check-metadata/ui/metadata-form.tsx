'use client'

import { type FormEvent, useState } from 'react'
import { Button, Input } from '@/shared/ui'
import { Loader2, Search, XCircle } from 'lucide-react'
import { cn } from '@/shared/lib'

interface MetadataFormProps {
  defaultUrl?: string
  isPending?: boolean
  onSubmit: (url: string) => void
  errorMessage?: string
}

export function MetadataForm({ defaultUrl = '', isPending, onSubmit, errorMessage }: MetadataFormProps) {
  const [url, setUrl] = useState(defaultUrl)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!url.trim()) return

    let normalizedUrl = url.trim()
    if (!/^https?:\/\//.test(normalizedUrl)) {
      normalizedUrl = `https://${normalizedUrl}`
    }

    onSubmit(normalizedUrl)
  }

  return (
    <form onSubmit={handleSubmit} className='max-w-2xl mx-auto'>
      <div className='relative flex flex-col gap-2'>
        <div className='relative flex items-center'>
          <div className='absolute left-4 flex items-center pointer-events-none'>
            <Search className='h-4 w-4 text-muted-foreground' />
          </div>

          <Input
            type="url"
            placeholder="Enter URL (e.g. https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isPending}
            className={cn(
              'pl-10 pr-20 h-12',
              errorMessage &&
              'border-destructive focus-visible:ring-destructive'
            )}
            required
          />
          <Button
            className='absolute right-2 px-4 h-8'
            type="submit"
            disabled={isPending || !url.trim()}
          >
            {isPending ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              'Check'
            )}
          </Button>
        </div>
        {errorMessage && (
          <p className='text-sm text-destructive animate-fade-in flex items-center gap-2'>
            <XCircle className='h-4 w-4' />
            {errorMessage}
          </p>
        )}
      </div>

    </form>
  )
}
