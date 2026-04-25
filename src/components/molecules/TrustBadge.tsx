import { CheckCircle } from 'lucide-react'
import { Badge } from '@/components/atoms/Badge'

interface TrustBadgeProps {
  text: string
}

export function TrustBadge({ text }: TrustBadgeProps) {
  return (
    <Badge>
      <CheckCircle size={13} className="text-brand-amber" aria-hidden="true" />
      {text}
    </Badge>
  )
}
