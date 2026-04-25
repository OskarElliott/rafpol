'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { NavLink } from '@/components/molecules/NavLink'
import { Button } from '@/components/atoms/Button'
import { useScrolled } from '@/hooks/useScrolled'
import { NAV_LINKS } from '@/lib/constants'

const PHONE = '+48 503 445 333'

export function Navbar() {
  const scrolled = useScrolled(60)
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = () => setMobileOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-brand-navy transition-shadow duration-300 ${
        scrolled ? 'shadow-nav' : ''
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20"
        aria-label="Glowna nawigacja"
      >
        <a
          href="#"
          className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber rounded-sm"
          aria-label="Rafpol Elektric — strona glowna"
        >
          <Image
            src="/images/logo.png"
            alt="Rafpol Elektric"
            width={120}
            height={40}
            className="h-9 w-auto object-contain"
            priority
          />
        </a>

        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} label={link.label} />
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center">
          <Button
            variant="primary"
            size="md"
            onClick={() => { window.location.href = `tel:${PHONE.replace(/\s/g, '')}` }}
          >
            Zadzwoń teraz
          </Button>
        </div>

        <button
          className="md:hidden text-white p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Zamknij menu' : 'Otworz menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <motion.div
            animate={{ rotate: mobileOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {mobileOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </motion.div>
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="md:hidden overflow-hidden bg-brand-navy border-t border-white/10"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  onClick={closeMobile}
                  className="text-base py-1"
                />
              ))}
              <Button
                variant="primary"
                size="lg"
                className="w-full mt-2"
                onClick={() => {
                  closeMobile()
                  window.location.href = `tel:${PHONE.replace(/\s/g, '')}`
                }}
              >
                Zadzwoń teraz
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}