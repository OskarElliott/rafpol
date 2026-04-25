import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { NAV_LINKS, SERVICES } from '@/lib/constants'

const PHONE = '+48 503 445 333'
const EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? 'kontakt@rafpol.pl'

const HEADING_CLASS = 'text-white/90 font-semibold text-xs uppercase tracking-wider mb-4'
const LINK_CLASS =
  'text-white/60 text-sm hover:text-white transition-colors duration-200 ' +
  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-amber rounded-sm'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="bg-brand-navy border-t border-white/10"
      aria-label="Stopka strony"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 — Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/logo.png"
                alt="Rafpol Elektric"
                width={120}
                height={40}
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Serwis elektryczny i AGD
            </p>
            <p className="text-white/50 text-sm leading-relaxed mt-1">
              Profesjonalne instalacje, naprawy i energia odnawialna dla domów i firm w Krakowie i okolicach.
            </p>
          </div>

          {/* Col 2 — Nawigacja */}
          <div>
            <p className={HEADING_CLASS}>Nawigacja</p>
            <ul className="flex flex-col gap-2.5" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={LINK_CLASS}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Uslugi */}
          <div>
            <p className={HEADING_CLASS}>Usługi</p>
            <ul className="flex flex-col gap-2.5" role="list">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link href="#uslugi" className={LINK_CLASS}>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Kontakt */}
          <div>
            <p className={HEADING_CLASS}>Kontakt</p>
            <ul className="flex flex-col gap-3" role="list">
              <li>
                <a
                  href={`tel:${PHONE.replace(/\s/g, '')}`}
                  className={`${LINK_CLASS} flex items-center gap-2`}
                >
                  <Phone size={14} className="text-brand-amber flex-shrink-0" aria-hidden="true" />
                  {PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className={`${LINK_CLASS} flex items-center gap-2`}
                >
                  <Mail size={14} className="text-brand-amber flex-shrink-0" aria-hidden="true" />
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin size={14} className="text-brand-amber flex-shrink-0" aria-hidden="true" />
                Kraków i okolice
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <Clock size={14} className="text-brand-amber flex-shrink-0" aria-hidden="true" />
                Pn-Sb 7:00-20:00
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-10 pt-6 flex items-center">
          <p className="text-white/40 text-xs">
            © {year} Rafpol Elektric. Wszelkie prawa zastrzeżone.
          </p>
        </div>

      </div>
    </footer>
  )
}