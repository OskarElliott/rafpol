export interface Service {
  id: string
  name: string
  subtitle: string
  description: string
  icon: string
}

export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface NavLinkItem {
  label: string
  href: string
}

export interface Testimonial {
  quote: string
  author: string
  location: string
}

export interface Project {
  label: string
  location: string
  alt: string
}

export interface ContactMeta {
  label: string
  icon: string
}
