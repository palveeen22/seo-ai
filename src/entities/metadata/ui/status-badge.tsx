import { Badge } from '@/shared/ui'

interface StatusBadgeProps {
  exists: boolean
  label: string
}

export function StatusBadge({ exists, label }: StatusBadgeProps) {
  return (
    <Badge variant={exists ? 'default' : 'secondary'}>
      {exists ? '\u2713' : '\u2717'} {label}
    </Badge>
  )
}
