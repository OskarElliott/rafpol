'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Plus, Trash2, Save, LogOut, ChevronDown, ChevronUp, Upload, ImageIcon } from 'lucide-react'

interface Service {
  id: string
  name: string
  subtitle: string
  description: string
  expanded: string
  icon: string
}

interface Testimonial {
  quote: string
  author: string
  location: string
}

interface Project {
  label: string
  location: string
  alt: string
  image: string
}

interface Certificate {
  id: number
  url: string
  alt: string
}

interface SiteData {
  services: Service[]
  testimonials: Testimonial[]
  projects: Project[]
  certificates: Certificate[]
}

type Tab = 'services' | 'testimonials' | 'projects' | 'certificates'

const INPUT_CLASS = 'w-full bg-brand-navy border border-white/20 rounded px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-amber'
const TEXTAREA_CLASS = 'w-full bg-brand-navy border border-white/20 rounded px-4 py-3 text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-amber'
const LABEL_CLASS = 'text-white/60 text-xs uppercase tracking-wider block mb-1.5'

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('services')
  const [data, setData] = useState<SiteData | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null)
  const [uploadingCertIndex, setUploadingCertIndex] = useState<number | null>(null)
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([])
  const certInputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    fetch('/api/admin/load')
      .then((r) => {
        if (r.status === 401) { router.push('/admin'); return null }
        return r.json()
      })
      .then((d) => { if (d) setData(d) })
  }, [router])

  const handleSave = async () => {
    if (!data) return
    setSaving(true)
    const res = await fetch('/api/admin/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setSaving(false)
    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin')
  }

  const addService = () => {
    const newService: Service = {
      id: `service-${Date.now()}`,
      name: 'Nowa usługa',
      subtitle: 'New Service',
      description: '',
      expanded: '',
      icon: 'Zap',
    }
    setData({ ...data!, services: [...data!.services, newService] })
    setOpenSection(newService.id)
  }

  const removeService = (i: number) => {
    setData({ ...data!, services: data!.services.filter((_, idx) => idx !== i) })
  }

  const updateService = (i: number, field: keyof Service, value: string) => {
    const updated = [...data!.services]
    updated[i] = { ...updated[i], [field]: value }
    setData({ ...data!, services: updated })
  }

  const handleImageUpload = async (i: number, file: File) => {
    setUploadingIndex(i)
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
    setUploadingIndex(null)
    if (res.ok) {
      const { url } = await res.json()
      const updated = [...data!.projects]
      updated[i] = { ...updated[i], image: url }
      setData({ ...data!, projects: updated })
    }
  }

  const handleCertUpload = async (i: number, file: File) => {
    setUploadingCertIndex(i)
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
    setUploadingCertIndex(null)
    if (res.ok) {
      const { url } = await res.json()
      const updated = [...data!.certificates]
      updated[i] = { ...updated[i], url }
      setData({ ...data!, certificates: updated })
    }
  }

  const addCertificate = () => {
    const newCert: Certificate = {
      id: Date.now(),
      url: '',
      alt: `Certyfikat ${(data?.certificates.length ?? 0) + 1}`,
    }
    setData({ ...data!, certificates: [...(data?.certificates ?? []), newCert] })
  }

  const removeCertificate = (i: number) => {
    setData({ ...data!, certificates: data!.certificates.filter((_, idx) => idx !== i) })
  }

  if (!data) return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center">
      <p className="text-white/60">Ładowanie...</p>
    </div>
  )

  const TAB_CLASS = (t: Tab) =>
    `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
      tab === t
        ? 'bg-brand-amber text-brand-navy'
        : 'text-white/60 hover:text-white hover:bg-white/10'
    }`

  return (
    <div className="min-h-screen bg-brand-navy">
      <header className="bg-brand-navyMid border-b border-white/10 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Image src="/images/logo.png" alt="Rafpol" width={100} height={34} className="h-8 w-auto object-contain" />
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-brand-amber text-brand-navy font-bold px-4 py-2 rounded-lg hover:bg-brand-amberDark transition-colors disabled:opacity-60 text-sm"
            >
              <Save size={15} />
              {saving ? 'Zapisywanie...' : saved ? 'Zapisano!' : 'Zapisz zmiany'}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-white/60 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <LogOut size={15} />
              Wyloguj
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          <button className={TAB_CLASS('services')} onClick={() => setTab('services')}>Usługi</button>
          <button className={TAB_CLASS('testimonials')} onClick={() => setTab('testimonials')}>Opinie</button>
          <button className={TAB_CLASS('projects')} onClick={() => setTab('projects')}>Realizacje</button>
          <button className={TAB_CLASS('certificates')} onClick={() => setTab('certificates')}>Certyfikaty</button>
        </div>

        {/* SERVICES */}
        {tab === 'services' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-white/50 text-sm">Edytuj usługi. Rozwinięty opis pojawia się po kliknięciu "Dowiedz się więcej".</p>
              <button onClick={addService} className="flex items-center gap-2 text-brand-amber text-sm font-medium hover:text-brand-amberDark transition-colors">
                <Plus size={15} /> Dodaj usługę
              </button>
            </div>
            {data.services.map((s, i) => (
              <div key={s.id} className="bg-brand-navyMid rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenSection(openSection === s.id ? null : s.id)}
                >
                  <span className="text-white font-semibold">{s.name}</span>
                  <div className="flex items-center gap-3">
                    <button onClick={(e) => { e.stopPropagation(); removeService(i) }} className="text-red-400 hover:text-red-300 transition-colors p-1">
                      <Trash2 size={14} />
                    </button>
                    {openSection === s.id ? <ChevronUp size={16} className="text-white/50" /> : <ChevronDown size={16} className="text-white/50" />}
                  </div>
                </button>
                {openSection === s.id && (
                  <div className="px-6 pb-6 flex flex-col gap-4 border-t border-white/10 pt-4">
                    <div>
                      <label className={LABEL_CLASS}>Nazwa usługi</label>
                      <input value={s.name} onChange={(e) => updateService(i, 'name', e.target.value)} className={INPUT_CLASS} />
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>Podtytuł (po angielsku)</label>
                      <input value={s.subtitle} onChange={(e) => updateService(i, 'subtitle', e.target.value)} className={INPUT_CLASS} />
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>Krótki opis (na karcie)</label>
                      <textarea rows={2} value={s.description} onChange={(e) => updateService(i, 'description', e.target.value)} className={TEXTAREA_CLASS} />
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>Rozwinięty opis (po kliknięciu)</label>
                      <textarea rows={4} value={s.expanded} placeholder="Dodaj szczegółowy opis usługi..." onChange={(e) => updateService(i, 'expanded', e.target.value)} className={TEXTAREA_CLASS + ' placeholder:text-white/30'} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TESTIMONIALS */}
        {tab === 'testimonials' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-white/50 text-sm">Zarządzaj opiniami klientów.</p>
              <button
                onClick={() => setData({ ...data, testimonials: [...data.testimonials, { quote: '', author: '', location: '' }] })}
                className="flex items-center gap-2 text-brand-amber text-sm font-medium hover:text-brand-amberDark transition-colors"
              >
                <Plus size={15} /> Dodaj opinię
              </button>
            </div>
            {data.testimonials.map((t, i) => (
              <div key={i} className="bg-brand-navyMid rounded-xl p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Opinia #{i + 1}</span>
                  <button onClick={() => setData({ ...data, testimonials: data.testimonials.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-300 transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
                <div>
                  <label className={LABEL_CLASS}>Treść opinii</label>
                  <textarea rows={3} value={t.quote} onChange={(e) => { const updated = [...data.testimonials]; updated[i] = { ...t, quote: e.target.value }; setData({ ...data, testimonials: updated }) }} className={TEXTAREA_CLASS} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL_CLASS}>Autor</label>
                    <input value={t.author} onChange={(e) => { const updated = [...data.testimonials]; updated[i] = { ...t, author: e.target.value }; setData({ ...data, testimonials: updated }) }} className={INPUT_CLASS} />
                  </div>
                  <div>
                    <label className={LABEL_CLASS}>Miasto</label>
                    <input value={t.location} onChange={(e) => { const updated = [...data.testimonials]; updated[i] = { ...t, location: e.target.value }; setData({ ...data, testimonials: updated }) }} className={INPUT_CLASS} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROJECTS */}
        {tab === 'projects' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-white/50 text-sm">Zarządzaj realizacjami. Kliknij "Dodaj zdjęcie" aby wgrać zdjęcie z telefonu lub komputera.</p>
              <button
                onClick={() => setData({ ...data, projects: [...data.projects, { label: '', location: '', alt: '', image: '' }] })}
                className="flex items-center gap-2 text-brand-amber text-sm font-medium hover:text-brand-amberDark transition-colors"
              >
                <Plus size={15} /> Dodaj realizację
              </button>
            </div>
            {data.projects.map((p, i) => (
              <div key={i} className="bg-brand-navyMid rounded-xl p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Realizacja #{i + 1}</span>
                  <button onClick={() => setData({ ...data, projects: data.projects.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-300 transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
                <div>
                  <label className={LABEL_CLASS}>Zdjęcie</label>
                  <div className="flex items-center gap-4">
                    {p.image ? (
                      <div className="relative w-24 h-16 rounded overflow-hidden flex-shrink-0">
                        <Image src={p.image} alt={p.alt || 'Realizacja'} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-24 h-16 rounded bg-brand-navy border border-white/10 flex items-center justify-center flex-shrink-0">
                        <ImageIcon size={20} className="text-white/20" />
                      </div>
                    )}
                    <input type="file" accept="image/*" ref={(el) => { fileInputRefs.current[i] = el }} className="hidden"
                      onChange={(e) => { const file = e.target.files?.[0]; if (file) handleImageUpload(i, file) }} />
                    <button onClick={() => fileInputRefs.current[i]?.click()} disabled={uploadingIndex === i}
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-lg transition-colors disabled:opacity-60">
                      <Upload size={14} />
                      {uploadingIndex === i ? 'Wgrywanie...' : p.image ? 'Zmień zdjęcie' : 'Dodaj zdjęcie'}
                    </button>
                  </div>
                </div>
                <div>
                  <label className={LABEL_CLASS}>Nazwa realizacji</label>
                  <input value={p.label} onChange={(e) => { const updated = [...data.projects]; updated[i] = { ...p, label: e.target.value }; setData({ ...data, projects: updated }) }} className={INPUT_CLASS} />
                </div>
                <div>
                  <label className={LABEL_CLASS}>Lokalizacja</label>
                  <input value={p.location} onChange={(e) => { const updated = [...data.projects]; updated[i] = { ...p, location: e.target.value }; setData({ ...data, projects: updated }) }} className={INPUT_CLASS} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CERTIFICATES */}
        {tab === 'certificates' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-white/50 text-sm">Zarządzaj certyfikatami i uprawnieniami.</p>
              <button onClick={addCertificate} className="flex items-center gap-2 text-brand-amber text-sm font-medium hover:text-brand-amberDark transition-colors">
                <Plus size={15} /> Dodaj certyfikat
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {data.certificates.map((cert, i) => (
                <div key={cert.id} className="bg-brand-navyMid rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-xs">#{i + 1}</span>
                    <button onClick={() => removeCertificate(i)} className="text-red-400 hover:text-red-300 transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <div className="relative aspect-[3/4] rounded overflow-hidden bg-brand-navy border border-white/10">
                    {cert.url ? (
                      <Image src={cert.url} alt={cert.alt} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon size={24} className="text-white/20" />
                      </div>
                    )}
                  </div>
                  <input type="file" accept="image/*" ref={(el) => { certInputRefs.current[i] = el }} className="hidden"
                    onChange={(e) => { const file = e.target.files?.[0]; if (file) handleCertUpload(i, file) }} />
                  <button onClick={() => certInputRefs.current[i]?.click()} disabled={uploadingCertIndex === i}
                    className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-2 rounded-lg transition-colors disabled:opacity-60 w-full">
                    <Upload size={12} />
                    {uploadingCertIndex === i ? 'Wgrywanie...' : cert.url ? 'Zmień' : 'Wgraj zdjęcie'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}