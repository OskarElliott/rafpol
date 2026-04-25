'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  label: string
  className?: string
  onClick?: () => void
}

export function NavLink({ href, label, className, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'relative text-sm font-medium text-white transition-colors duration-200 group',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber focus-visible:ring-offset-2 rounded-sm',
        className,
      )}
    >
      {label}
      {/* Animated underline */}
      <span
        className={
          'absolute -bottom-0.5 left-0 h-[2px] w-0 bg-brand-amber ' +
          'transition-[width] duration-300 group-hover:w-full'
        }
        aria-hidden="true"
      />
    </Link>
  )
}
