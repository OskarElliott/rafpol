import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full',
        'bg-white/10 text-white text-xs font-medium border border-white/20',
        className,
      )}
    >
      {children}
    </span>
  )
}
