import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type FieldType = 'text' | 'tel' | 'email' | 'textarea' | 'select'

interface FormFieldBaseProps {
  label: string
  id: string
  error?: string
  fieldType?: FieldType
  required?: boolean
  children?: React.ReactNode
}

type InputProps = FormFieldBaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>

type TextareaProps = FormFieldBaseProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'>

type SelectProps = FormFieldBaseProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'>

type FormFieldProps = InputProps | TextareaProps | SelectProps

const baseInputClass =
  'w-full bg-brand-navy/50 border rounded px-4 py-3 text-white text-sm ' +
  'placeholder:text-white/40 transition-colors duration-200 min-h-[44px] ' +
  'focus:outline-none focus:ring-2 focus:ring-brand-amber focus:border-transparent'

export const FormField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  FormFieldProps
>(({ label, id, error, fieldType = 'text', required, children, ...rest }, ref) => {
  const borderClass = error ? 'border-red-400' : 'border-white/20 hover:border-white/40'
  const describedBy = error ? `${id}-error` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-white/80 text-sm font-medium"
      >
        {label}
        {required && <span className="text-brand-amber ml-0.5">*</span>}
      </label>

      {fieldType === 'textarea' ? (
        <textarea
          id={id}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          rows={4}
          aria-required={required}
          aria-describedby={describedBy}
          className={cn(baseInputClass, borderClass, 'resize-none')}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : fieldType === 'select' ? (
        <select
          id={id}
          ref={ref as React.Ref<HTMLSelectElement>}
          aria-required={required}
          aria-describedby={describedBy}
          className={cn(baseInputClass, borderClass, 'appearance-none')}
          {...(rest as SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {children}
        </select>
      ) : (
        <input
          id={id}
          type={fieldType}
          ref={ref as React.Ref<HTMLInputElement>}
          aria-required={required}
          aria-describedby={describedBy}
          className={cn(baseInputClass, borderClass)}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-red-400 text-sm"
        >
          {error}
        </p>
      )}
    </div>
  )
})

FormField.displayName = 'FormField'
