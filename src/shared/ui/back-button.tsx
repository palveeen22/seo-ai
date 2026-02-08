import { Button } from '@/shared/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface BackButtonProps {
  href?: string
  label?: string
}

export function BackButton({ 
  href = '/', 
  label = 'Back to Home' 
}: BackButtonProps) {
  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className="gap-2 hover:gap-3 transition-all"
    >
      <Link href={href}>
        <ArrowLeft className="size-4" />
        {label}
      </Link>
    </Button>
  )
}