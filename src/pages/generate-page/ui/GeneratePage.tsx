'use client'

import { Badge, Skeleton } from '@/shared/ui'
import { GenerateForm, useGenerateMutation } from '@/features/generate-metadata'
import { MetadataDashboard } from '@/widgets/metadata-dashboard'
import { Sparkles } from 'lucide-react'

export function GeneratePage() {
  const { mutate, data, isPending, error } = useGenerateMutation()

  function handleSubmit(input: { url?: string; prompt?: string }) {
    mutate(input)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <header className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-sm">
              <Sparkles className="size-3.5" />
              AI Powered
            </Badge>
          </div>
          <h1 className="text-5xl font-bold tracking-tight">AI SEO Generator</h1>
          <p className="mt-2 text-base text-muted-foreground">
            Generate optimized metadata for your pages using AI.
            Provide a URL to improve existing metadata, or describe your page
            to generate metadata from scratch.
          </p>
        </header>

        <div className="mb-8">
          <GenerateForm
            isPending={isPending}
            onSubmit={handleSubmit}
            errorMessage={error?.message}
          />
        </div>

        {isPending && (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
              <Sparkles className="size-4 animate-pulse" />
              AI is generating optimized metadata...
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        )}

        {data && !isPending && (
          <div>
            <div className="mb-6 flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
              <Sparkles className="size-4 text-primary" />
              <span className="font-medium">AI Generated Suggestions</span>
              <span className="text-muted-foreground">
                — Review and use these optimized metadata for better SEO
              </span>
            </div>
            <MetadataDashboard metadata={data} />
          </div>
        )}
      </div>
    </div>
  )
}
