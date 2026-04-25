'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin/dashboard')
    } else {
      setError('Nieprawidlowe haslo. Sprobuj ponownie.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center px-4">
      <div className="bg-brand-navyMid rounded-xl p-8 w-full max-w-sm shadow-card-hover">
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo.png"
            alt="Rafpol Elektric"
            width={140}
            height={48}
            className="h-12 w-auto object-contain"
          />
        </div>

        <h1 className="text-white font-bold text-xl text-center mb-6">
          Panel administracyjny
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="password" className="text-white/70 text-sm block mb-1.5">
              Haslo
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brand-navy border border-white/20 rounded px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-amber"
              placeholder="Wprowadz haslo"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-amber text-brand-navy font-bold py-3 rounded-lg hover:bg-brand-amberDark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Logowanie...' : 'Zaloguj sie'}
          </button>
        </form>
      </div>
    </div>
  )
}
