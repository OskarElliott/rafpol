import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy:      '#0F172A',
          navyMid:   '#1E3A5F',
          amber:     '#F59E0B',
          amberDark: '#D97706',
          offWhite:  '#F8FAFC',
          slate:     '#1E293B',
          muted:     '#64748B',
          border:    '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['3.75rem', { lineHeight: '1.1', fontWeight: '800' }],
      },
      boxShadow: {
        card:        '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.05)',
        'card-hover':'0 8px 30px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        nav:         '0 1px 3px rgba(0,0,0,0.08)',
        button:      '0 2px 8px rgba(245,158,11,0.35)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
