import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost' | 'outline'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  asChild?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-amber text-brand-navy font-bold hover:bg-brand-amberDark shadow-button ' +
    'focus-visible:ring-2 focus-visible:ring-brand-amber focus-visible:ring-offset-2',
  ghost:
    'bg-transparent text-white border border-white/30 font-semibold hover:bg-white/10 ' +
    'focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2',
  outline:
    'bg-transparent text-brand-navy border border-brand-navy font-semibold hover:bg-brand-navy hover:text-white ' +
    'focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2',
}

const sizeClasses: Record<Size, string> = {
  sm: 'py-2 px-4 text-sm rounded',
  md: 'py-2.5 px-5 text-sm rounded-lg',
  lg: 'py-3.5 px-7 text-base rounded-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-all duration-200 min-h-[44px]',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
)

Button.displayName = 'Button'
