import {
  Zap, Wrench, Waves, Shield, Sun, Battery,
  CheckCircle, Phone, Mail, MapPin, Clock,
  ChevronRight, Menu, X, ArrowRight,
  Thermometer, Droplets, Flame, Wind, Gauge,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Wrench,
  Waves,
  Shield,
  Sun,
  Battery,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Thermometer,
  Droplets,
  Flame,
  Wind,
  Gauge,
}

interface IconProps {
  name: string
  size?: number
  className?: string
  strokeWidth?: number
}

export function Icon({ name, size = 20, className, strokeWidth = 1.75 }: IconProps) {
  const LucideComponent = iconMap[name]
  if (!LucideComponent) return null

  return (
    <LucideComponent
      size={size}
      strokeWidth={strokeWidth}
      className={cn(className)}
      aria-hidden="true"
    />
  )
}