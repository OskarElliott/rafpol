import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const REPO_OWNER = 'OskarElliott'
const REPO_NAME = 'rafpol'
const FILE_PATH = 'src/lib/siteData.json'

const fallback = {
  services: [
    { id: 'elektryczne', name: 'Instalacje Elektryczne', subtitle: 'Electrical Wiring & Installation', description: 'Kompleksowe instalacje elektryczne w domach i budynkach komercyjnych.', expanded: '', icon: 'Zap' },
    { id: 'foto', name: 'Fotowoltaika', subtitle: 'Solar Panel Installation', description: 'Projektowanie i montaz systemow fotowoltaicznych dla domu i firmy.', expanded: '', icon: 'Sun' },
    { id: 'energia', name: 'Magazyny Energii', subtitle: 'Energy Storage Systems', description: 'Instalacja magazynow energii i systemow zarzadzania moca.', expanded: '', icon: 'Battery' },
    { id: 'pompa', name: 'Pompy Ciepla', subtitle: 'Heat Pump Installation', description: 'Montaz i serwis powietrznych pomp ciepla powietrze-woda.', expanded: '', icon: 'Thermometer' },
    { id: 'sanitarne', name: 'Instalacje Sanitarne', subtitle: 'Plumbing & Heating Systems', description: 'Instalacje CO, wod-kan, wezly ciepla i chlodu.', expanded: '', icon: 'Droplets' },
    { id: 'wezly', name: 'Wezly Ciepla i Chlodu', subtitle: 'Heat & Cooling Nodes', description: 'Projektowanie i montaz wezlow cieplnych i chlodniczych.', expanded: '', icon: 'Gauge' },
    { id: 'kotlownie', name: 'Kotlownie Gazowe', subtitle: 'Gas Boiler Rooms', description: 'Kompleksowe projektowanie i montaz kotlowni gazowych.', expanded: '', icon: 'Flame' },
    { id: 'wentylacja', name: 'Wentylacja i Klimatyzacja', subtitle: 'Ventilation & Air Conditioning', description: 'Montaz systemow wentylacji i klimatyzacji dla domow i firm.', expanded: '', icon: 'Wind' },
  ],
  testimonials: [
    { quote: 'Profesjonalna ekipa, szybka realizacja instalacji w nowym domu. Polecam!', author: 'Pawel K.', location: 'Krakow' },
    { quote: 'Naprawili pralke w 2 godziny. Przyszli nastepnego dnia po zgloszeniu. Swietna robota.', author: 'Anna W.', location: 'Wieliczka' },
    { quote: 'Montaz fotowoltaiki przebiegl sprawnie i zgodnie z harmonogramem.', author: 'Marcin T.', location: 'Niepolomice' },
  ],
  projects: [
    { label: 'Instalacja elektryczna — dom jednorodzinny', location: 'Krakow, Bronowice', alt: 'Instalacja elektryczna w Krakowie', image: '' },
    { label: 'Fotowoltaika 8kWp', location: 'Krakow, Krowodrza', alt: 'Fotowoltaika w Krakowie', image: '' },
    { label: 'Powietrzna pompa ciepla', location: 'Wieliczka', alt: 'Pompa ciepla w Wieliczce', image: '' },
    { label: 'Serwis AGD', location: 'Krakow, Stare Miasto', alt: 'Serwis AGD w Krakowie', image: '' },
    { label: 'Rozdzielnica elektryczna', location: 'budynek komercyjny, Krakow', alt: 'Rozdzielnica w Krakowie', image: '' },
    { label: 'Pompa ciepla powietrze-woda', location: 'Krakow, Nowa Huta', alt: 'Pompa ciepla w Krakowie', image: '' },
  ],
  certificates: [
    { id: 1, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228404/cert-1_rfmfqr.jpg', alt: 'Certyfikat 1' },
    { id: 2, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228404/cert-2_exftry.jpg', alt: 'Certyfikat 2' },
    { id: 3, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228405/cert-3_fvyphb.jpg', alt: 'Certyfikat 3' },
    { id: 4, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228407/cert-4_dvd08h.jpg', alt: 'Certyfikat 4' },
    { id: 5, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228406/cert-5_qkbxig.jpg', alt: 'Certyfikat 5' },
    { id: 6, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228410/cert-6_hxu7k6.jpg', alt: 'Certyfikat 6' },
    { id: 7, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228404/cert-7_latbl2.jpg', alt: 'Certyfikat 7' },
    { id: 8, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228405/cert-8_vfq4n0.jpg', alt: 'Certyfikat 8' },
    { id: 9, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228407/cert-9_onku42.jpg', alt: 'Certyfikat 9' },
    { id: 10, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228406/cert-10_qwpdqi.jpg', alt: 'Certyfikat 10' },
    { id: 11, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228407/cert-11_ylckbd.jpg', alt: 'Certyfikat 11' },
    { id: 12, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228408/cert-12_klj2l2.jpg', alt: 'Certyfikat 12' },
    { id: 13, url: 'https://res.cloudinary.com/dqa01zvts/image/upload/v1777228409/cert-13_f7t289.jpg', alt: 'Certyfikat 13' },
  ],
}

export async function GET() {
  const cookieStore = cookies()
  const auth = cookieStore.get('admin_auth')
  if (!auth || auth.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=main`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
        },
        cache: 'no-store',
      }
    )
    if (res.ok) {
      const file = await res.json()
      const decoded = Buffer.from(file.content, 'base64').toString('utf-8')
      const parsed = JSON.parse(decoded)
      // Ensure certificates field exists for older siteData.json files
      if (!parsed.certificates) parsed.certificates = fallback.certificates
      return NextResponse.json(parsed)
    }
  } catch {}

  return NextResponse.json(fallback)
}