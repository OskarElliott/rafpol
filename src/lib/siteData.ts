import { SERVICES, TESTIMONIALS, PROJECTS } from './constants'

export interface SiteData {
  services: {
    id: string
    name: string
    subtitle: string
    description: string
    expanded: string
    icon: string
  }[]
  testimonials: {
    quote: string
    author: string
    location: string
  }[]
  projects: {
    label: string
    location: string
    alt: string
    image?: string
  }[]
  certificates: {
    id: number
    url: string
    alt: string
  }[]
}

export async function getSiteData(): Promise<SiteData> {
  try {
    // Cache-bust with timestamp to prevent GitHub CDN caching
    const url = `https://raw.githubusercontent.com/OskarElliott/rafpol/main/src/lib/siteData.json?t=${Date.now()}`
    const res = await fetch(url, { cache: 'no-store' })
    if (res.ok) {
      return await res.json()
    }
  } catch {}

  return {
    services: SERVICES.map((s) => ({ ...s, expanded: '' })),
    testimonials: [...TESTIMONIALS],
    projects: PROJECTS.map((p) => ({ ...p, image: '' })),
    certificates: [],
  }
}