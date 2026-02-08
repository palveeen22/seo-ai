'use client'

import { formatUrl } from "@/shared/lib"
import { CopyButton, ImagePreview } from "@/shared/ui"


interface MetadataFieldProps {
  label: string
  value?: string
  type?: 'text' | 'url' | 'image'
  className?: string
}

export function MetadataField({
  label,
  value,
  type = 'text',
  className = '',
}: MetadataFieldProps) {
  if (!value && type !== 'text') return null

  return (
    <div className={`space-y-2 ${className}`}>
      <div className='flex items-center justify-between gap-2'>
        <h3 className='font-medium text-primary'>{label}</h3>
        <CopyButton content={value} />
      </div>
      {type === 'text' && (
        <p className='text-sm text-muted-foreground wrap-break-word'>
          {value || 'Not found'}
        </p>
      )}
      {type === 'url' && (
        <div className='text-sm text-muted-foreground'>{formatUrl(value)}</div>
      )}
      {type === 'image' && (
        <>
          <div className='text-sm text-muted-foreground mb-2'>
            {formatUrl(value)}
          </div>
          <ImagePreview src={value} alt={`${label} Preview`} />
        </>
      )}
    </div>
  )
}
