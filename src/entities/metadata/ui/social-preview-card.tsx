import { formatUrl } from '@/shared/lib'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ImagePreview,
} from '@/shared/ui'
import Image from 'next/image'

interface SocialPreviewCardProps {
  platform: 'Open Graph' | 'Twitter' | 'Discord' | 'Slack'
  title?: string
  description?: string
  image?: string
  url?: string
}

export function SocialPreviewCard({
  platform,
  title,
  description,
  image,
  url,
}: SocialPreviewCardProps) {
  const noData = <span className="italic text-muted-foreground/60">No data available</span>

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">{platform} Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-lg border">
          <ImagePreview src={image} alt={`${title} Preview`} />
          <div className="space-y-1 p-3">
            <p className="truncate text-xs text-muted-foreground">
              {url || noData}
            </p>
            <p className="line-clamp-2 text-sm font-semibold">
              {title || noData}
            </p>
            <p className="line-clamp-3 text-xs text-muted-foreground">
              {description || noData}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
