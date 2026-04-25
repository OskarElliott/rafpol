import type { Metadata } from 'next'

export const siteMetadata: Metadata = {
  title: 'Rafpol — Serwis Elektryczny i AGD | Kraków i okolice',
  description:
    'Profesjonalny serwis elektryczny i AGD w Krakowie. Instalacje elektryczne, naprawa pralek i sprzętu AGD, fotowoltaika, magazyny energii. Zadzwoń teraz!',
  openGraph: {
    title: 'Rafpol — Serwis Elektryczny i AGD',
    description: 'Instalacje, serwis i energia — kompleksowo, szybko i z gwarancją.',
    url: 'https://rafpol.pl',
    siteName: 'Rafpol',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'pl_PL',
    type: 'website',
  },
}

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Rafpol',
  description: 'Serwis elektryczny i AGD — Kraków i okolice',
  telephone: process.env.NEXT_PUBLIC_PHONE ?? '+48503445333',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kraków',
    addressRegion: 'Małopolskie',
    addressCountry: 'PL',
  },
  openingHours: ['Mo-Sa 07:00-20:00'],
  priceRange: '$$',
  serviceType: ['Instalacje Elektryczne', 'Serwis AGD', 'Fotowoltaika'],
}
