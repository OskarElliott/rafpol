import type { Metadata } from 'next'

const SITE_URL = 'https://www.rafpolelektric.pl'

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Rafpol Elektric | Elektryk Kraków, Instalacje, Fotowoltaika',
    template: '%s | Rafpol Elektric',
  },
  description:
  'Rafpol Elektric: usługi elektryczne, fotowoltaika, pompy ciepła, instalacje sanitarne i wentylacja w Krakowie. Ponad 10 lat doświadczenia. Tel: 503 445 333.',
  keywords: [
  'elektryk Kraków',
  'usługi elektryczne Kraków',
  'instalacje elektryczne Kraków',
  'fotowoltaika Kraków',
  'magazyny energii Kraków',
  'pompy ciepła Kraków',
  'instalacje sanitarne Kraków',
  'wentylacja Kraków',
  'klimatyzacja Kraków',
  'kotłownie gazowe Kraków',
  'pomiary elektryczne Kraków',
  'elektryk Małopolska',
  ],
  authors: [{ name: 'Rafpol Elektric' }],
  creator: 'Rafpol Elektric',
  publisher: 'Rafpol Elektric',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Rafpol Elektric | Elektryk i instalacje w Krakowie',
    description:
      'Usługi elektryczne, instalacje, fotowoltaika i magazyny energii w Krakowie i okolicach. Ponad 10 lat doświadczenia.',
    url: SITE_URL,
    siteName: 'Rafpol Elektric',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rafpol Elektric — Elektryk i instalacje w Krakowie',
      },
    ],
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rafpol Elektric | Elektryk Kraków',
    description:
      'Usługi elektryczne, instalacje, fotowoltaika i magazyny energii w Krakowie i okolicach.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    // Wklej tutaj kod weryfikacyjny z Google Search Console (po dodaniu właściwości)
    google: 'qwBCOqEZd9YRpN2xxA00RpIJW2FFIUc6yUuan40N3x8',
  },
  category: 'Electrical Services',
}

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ElectricalContractor',
  '@id': `${SITE_URL}/#business`,
  name: 'Rafpol Elektric',
  alternateName: 'Rafpol',
  description:
    'Usługi elektryczne, instalacje, fotowoltaika i magazyny energii w Krakowie i okolicach. Ponad 10 lat doświadczenia.',
  url: SITE_URL,
  telephone: process.env.NEXT_PUBLIC_PHONE ?? '+48503445333',
  email: 'rafpolelektric@gmail.com',
  image: `${SITE_URL}/og-image.jpg`,
  logo: `${SITE_URL}/logo.png`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kraków',
    addressRegion: 'Małopolskie',
    addressCountry: 'PL',
  },
  areaServed: [
    { '@type': 'City', name: 'Kraków' },
    { '@type': 'AdministrativeArea', name: 'powiat krakowski' },
    { '@type': 'AdministrativeArea', name: 'województwo małopolskie' },
  ],
  geo: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 50.0647,
      longitude: 19.945,
    },
    geoRadius: '50000',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '07:00',
      closes: '20:00',
    },
  ],
hasOfferCatalog: {
  '@type': 'OfferCatalog',
  name: 'Usługi Rafpol Elektric',
  itemListElement: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Instalacje elektryczne', areaServed: { '@type': 'City', name: 'Kraków' } } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fotowoltaika', areaServed: { '@type': 'City', name: 'Kraków' } } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Magazyny energii', areaServed: { '@type': 'City', name: 'Kraków' } } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pompy ciepła', areaServed: { '@type': 'City', name: 'Kraków' } } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Instalacje sanitarne', areaServed: { '@type': 'City', name: 'Kraków' } } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Węzły ciepła i chłodu', areaServed: { '@type': 'City', name: 'Kraków' } } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kotłownie gazowe', areaServed: { '@type': 'City', name: 'Kraków' } } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wentylacja i klimatyzacja', areaServed: { '@type': 'City', name: 'Kraków' } } },
  ],
},
  sameAs: [
    // Wklej tutaj URL do Google Business Profile po założeniu
    // np. 'https://maps.app.goo.gl/...'
    // I do innych profili (Facebook, OLX, Pkt.pl) jeśli istnieją
  ],
}