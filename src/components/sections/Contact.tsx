'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, MapPin, Zap, CheckCircle } from 'lucide-react'
import { SectionLabel } from '@/components/atoms/SectionLabel'
import { FormField } from '@/components/molecules/FormField'
import {
  slideLeftVariant,
  slideRightVariant,
  staggerContainer,
  fadeUpVariant,
  viewportConfig,
} from '@/lib/animations'
import { SERVICES } from '@/lib/constants'

const PHONE = '+48 503 445 333'
const EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? 'kontakt@rafpol.pl'

interface FormState {
  name: string
  phone: string
  service: string
  message: string
}

interface FormErrors {
  name?: string
  phone?: string
  service?: string
}

function validatePhone(value: string) {
  const stripped = value.replace(/[\s-]/g, '')
  return /^(\+48)?[0-9]{9}$/.test(stripped)
}

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', phone: '', service: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const validate = (): FormErrors => {
    const e: FormErrors = {}
    if (!form.name.trim()) e.name = 'Imie i nazwisko jest wymagane.'
    if (!form.phone.trim()) {
      e.phone = 'Numer telefonu jest wymagany.'
    } else if (!validatePhone(form.phone)) {
      e.phone = 'Podaj prawidlowy numer telefonu.'
    }
    if (!form.service) e.service = 'Wybierz rodzaj uslugi.'
    return e
  }

  const handleBlur = (field: keyof FormErrors) => {
    const e = validate()
    setErrors((prev) => ({ ...prev, [field]: e[field] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitting(true)
    await new Promise((res) => setTimeout(res, 800))
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <section id="kontakt" className="bg-brand-navy py-16 md:py-24" aria-label="Kontakt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left column */}
          <motion.div
            variants={slideLeftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <SectionLabel>Skontaktuj się</SectionLabel>
            <h2 className="text-3xl md:text-[2.25rem] font-bold text-white mt-3 leading-[1.2]">
              Napisz lub zadzwoń — odpowiemy szybko
            </h2>
            <p className="text-white/70 text-base leading-relaxed mt-4">
              Obsługujemy Kraków i okolice w promieniu 50 km. Niezależnie od tego, czy chodzi
              o awarie, instalacje czy serwis — skontaktuj się z nami, a odpowiemy tego samego dnia.
            </p>

            <a
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="text-4xl font-extrabold text-brand-amber block mt-6 hover:text-brand-amberDark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber rounded-sm"
            >
              {PHONE}
            </a>

            <a
              href={`mailto:${EMAIL}`}
              className="text-white/80 text-base mt-2 block hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber rounded-sm"
            >
              {EMAIL}
            </a>

            <ul className="mt-8 flex flex-col gap-4" role="list">
              {[
                { icon: Clock,  label: 'Dostepny: Pn-Sb 7:00-20:00' },
                { icon: MapPin, label: 'Obszar: Krakow i okolice' },
                { icon: Zap,    label: 'Czas reakcji: do 24h' },
              ].map(({ icon: IconComp, label }) => (
                <li key={label} className="flex items-center gap-3 text-white/70 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <IconComp size={15} className="text-brand-amber" aria-hidden="true" />
                  </div>
                  {label}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right column — form */}
          <motion.div
            variants={slideRightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.15 }}
            className="bg-brand-navyMid rounded-xl p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center text-center py-8 gap-4" role="status" aria-live="polite">
                <CheckCircle size={48} className="text-brand-amber" aria-hidden="true" />
                <h3 className="text-white font-bold text-xl">Wiadomość wysłana!</h3>
                <p className="text-white/70 text-sm max-w-xs">
                  Dziękujemy za kontakt. Odezwiemy się do Ciebie w ciągu 24 godzin.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Formularz kontaktowy">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                  className="flex flex-col gap-5"
                >
                  <motion.div variants={fadeUpVariant}>
                    <FormField
                      label="Imie i Nazwisko"
                      id="contact-name"
                      fieldType="text"
                      placeholder="Jan Kowalski"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: (e.target as HTMLInputElement).value }))}
                      onBlur={() => handleBlur('name')}
                      error={errors.name}
                    />
                  </motion.div>

                  <motion.div variants={fadeUpVariant}>
                    <FormField
                      label="Numer telefonu"
                      id="contact-phone"
                      fieldType="tel"
                      placeholder="+48 600 000 000"
                      required
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: (e.target as HTMLInputElement).value }))}
                      onBlur={() => handleBlur('phone')}
                      error={errors.phone}
                    />
                  </motion.div>

                  <motion.div variants={fadeUpVariant}>
                    <FormField
                      label="Rodzaj uslugi"
                      id="contact-service"
                      fieldType="select"
                      required
                      value={form.service}
                      onChange={(e) => setForm((f) => ({ ...f, service: (e.target as HTMLSelectElement).value }))}
                      onBlur={() => handleBlur('service')}
                      error={errors.service}
                    >
                      <option value="" disabled>Wybierz usługę</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </FormField>
                  </motion.div>

                  <motion.div variants={fadeUpVariant}>
                    <FormField
                      label="Wiadomosc"
                      id="contact-message"
                      fieldType="textarea"
                      placeholder="Opisz krotko czego potrzebujesz..."
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: (e.target as HTMLTextAreaElement).value }))}
                    />
                  </motion.div>

                  <motion.div variants={fadeUpVariant}>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-brand-amber text-brand-navy font-bold py-3 rounded-lg transition-all duration-200 min-h-[44px] hover:bg-brand-amberDark focus-visible:ring-2 focus-visible:ring-brand-amber focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Wysylanie...' : 'Wyślij wiadomość'}
                    </button>
                  </motion.div>
                </motion.div>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
