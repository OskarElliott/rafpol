import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { siteMetadata, jsonLd } from '@/lib/metadata'

export const metadata = siteMetadata

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={inter.variable}>
      <head>
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Skip link */}
        <a href="#main-content" className="skip-link">
          Przejdź do treści
        </a>

        {/* pt offsets the fixed navbar height: 64px mobile / 80px desktop */}
        <main id="main-content" className="pt-16 md:pt-20">
          {children}
        </main>
      </body>
    </html>
  )
}
