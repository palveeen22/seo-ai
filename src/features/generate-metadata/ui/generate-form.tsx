'use client'

import { type FormEvent, useState } from 'react'
import { Button, Input, Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui'
import { Loader2, Sparkles, Link2, MessageSquare, XCircle } from 'lucide-react'
import { cn } from '@/shared/lib'

interface GenerateFormProps {
  isPending?: boolean
  onSubmit: (input: { url?: string; prompt?: string }) => void
  errorMessage?: string
}

export function GenerateForm({ isPending, onSubmit, errorMessage }: GenerateFormProps) {
  const [url, setUrl] = useState('')
  const [prompt, setPrompt] = useState('')
  const [mode, setMode] = useState<'url' | 'prompt'>('url')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (mode === 'url') {
      if (!url.trim()) return
      let normalizedUrl = url.trim()
      if (!/^https?:\/\//.test(normalizedUrl)) {
        normalizedUrl = `https://${normalizedUrl}`
      }
      onSubmit({ url: normalizedUrl })
    } else {
      if (!prompt.trim()) return
      onSubmit({ prompt: prompt.trim() })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
      <Tabs value={mode} onValueChange={(v) => setMode(v as 'url' | 'prompt')}>
        <TabsList className="mb-4 w-full">
          <TabsTrigger value="url" className="flex-1 gap-2">
            <Link2 className="size-4" />
            From URL
          </TabsTrigger>
          <TabsTrigger value="prompt" className="flex-1 gap-2">
            <MessageSquare className="size-4" />
            From Prompt
          </TabsTrigger>
        </TabsList>

        <TabsContent value="url">
          <div className="relative flex items-center">
            <div className="pointer-events-none absolute left-4 flex items-center">
              <Link2 className="size-4 text-muted-foreground" />
            </div>
            <Input
              type="url"
              placeholder="Enter URL to optimize (e.g. https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isPending}
              className={cn(
                'h-12 pl-10 pr-36',
                errorMessage && 'border-destructive focus-visible:ring-destructive'
              )}
              required={mode === 'url'}
            />
            <Button
              className="absolute right-2 h-8 gap-2 px-4"
              type="submit"
              disabled={isPending || !url.trim()}
            >
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  <Sparkles className="size-4" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="prompt">
          <div className="space-y-3">
            <textarea
              placeholder="Describe your page content (e.g. 'A landing page for a SaaS project management tool targeting remote teams')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isPending}
              rows={4}
              className={cn(
                'flex w-full rounded-md border border-input bg-background px-3 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
                errorMessage && 'border-destructive focus-visible:ring-destructive'
              )}
            />
            <Button
              className="w-full gap-2"
              type="submit"
              disabled={isPending || !prompt.trim()}
            >
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  <Sparkles className="size-4" />
                  Generate with AI
                </>
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {errorMessage && (
        <p className="mt-2 flex items-center gap-2 text-sm text-destructive">
          <XCircle className="size-4" />
          {errorMessage}
        </p>
      )}
    </form>
  )
}
