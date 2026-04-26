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
    { label: 'Instalacja elektryczna — dom jednorodzinny', location: 'Krakow, Bronowice', alt: 'Instalacja elektryczna w Krakowie' },
    { label: 'Fotowoltaika 8kWp', location: 'Krakow, Krowodrza', alt: 'Fotowoltaika w Krakowie' },
    { label: 'Powietrzna pompa ciepla', location: 'Wieliczka', alt: 'Pompa ciepla w Wieliczce' },
    { label: 'Serwis AGD', location: 'Krakow, Stare Miasto', alt: 'Serwis AGD w Krakowie' },
    { label: 'Rozdzielnica elektryczna', location: 'budynek komercyjny, Krakow', alt: 'Rozdzielnica w Krakowie' },
    { label: 'Pompa ciepla powietrze-woda', location: 'Krakow, Nowa Huta', alt: 'Pompa ciepla w Krakowie' },
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
      return NextResponse.json(JSON.parse(decoded))
    }
  } catch {}

  return NextResponse.json(fallback)
}
