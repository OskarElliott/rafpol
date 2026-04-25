export const SERVICES = [
  {
    id: 'elektryczne',
    name: 'Instalacje Elektryczne',
    subtitle: 'Electrical Wiring & Installation',
    description: 'Kompleksowe instalacje elektryczne w domach i budynkach komercyjnych.',
    icon: 'Zap',
  },
  {
    id: 'foto',
    name: 'Fotowoltaika',
    subtitle: 'Solar Panel Installation',
    description: 'Projektowanie i montaz systemow fotowoltaicznych dla domu i firmy.',
    icon: 'Sun',
  },
  {
    id: 'energia',
    name: 'Magazyny Energii',
    subtitle: 'Energy Storage Systems',
    description: 'Instalacja magazynów energii i systemów zarządzania mocą.',
    icon: 'Battery',
  },
  {
    id: 'pompa',
    name: 'Pompy Ciepła',
    subtitle: 'Heat Pump Installation',
    description: 'Montaż i serwis powietrznych pomp ciepła powietrze-woda.',
    icon: 'Thermometer',
  },
  {
    id: 'sanitarne',
    name: 'Instalacje Sanitarne',
    subtitle: 'Plumbing & Heating Systems',
    description: 'Instalacje CO, wod-kan, węzły ciepła i chłodu.',
    icon: 'Droplets',
  },
  {
    id: 'wezly',
    name: 'Węzły Ciepła i Chłodu',
    subtitle: 'Heat & Cooling Nodes',
    description: 'Projektowanie i montaż węzłów cieplnych i chłodniczych.',
    icon: 'Gauge',
  },
  {
    id: 'kotlownie',
    name: 'Kotłownie Gazowe',
    subtitle: 'Gas Boiler Rooms',
    description: 'Kompleksowe projektowanie i montaż kotłowni gazowych.',
    icon: 'Flame',
  },
  {
    id: 'wentylacja',
    name: 'Wentylacja i Klimatyzacja',
    subtitle: 'Ventilation & Air Conditioning',
    description: 'Montaż systemów wentylacji i klimatyzacji dla domów i firm.',
    icon: 'Wind',
  },
] as const

export const STATS = [
  { value: 500, suffix: '+', label: 'Zrealizowanych projektow' },
  { value: 10,  suffix: '+', label: 'Lat doswiadczenia' },
  { value: 480, suffix: '+', label: 'Zadowolonych klientow' },
  { value: 8,   suffix: '',  label: 'Kategorii uslug' },
] as const

export const NAV_LINKS = [
  { label: 'Usługi',     href: '#uslugi' },
  { label: 'O nas',      href: '#o-nas' },
  { label: 'Realizacje', href: '#realizacje' },
  { label: 'Kontakt',    href: '#kontakt' },
] as const

export const TESTIMONIALS = [
  {
    quote: 'Profesjonalna ekipa, szybka realizacja instalacji w nowym domu. Polecam!',
    author: 'Pawel K.',
    location: 'Krakow',
  },
  {
    quote: 'Naprawili pralke w 2 godziny. Przyszli nastepnego dnia po zgloszeniu. Swietna robota.',
    author: 'Anna W.',
    location: 'Wieliczka',
  },
  {
    quote: 'Montaz fotowoltaiki przebiegl sprawnie i zgodnie z harmonogramem. Widze oszczednosci juz od pierwszego miesiaca.',
    author: 'Marcin T.',
    location: 'Niepolomice',
  },
] as const

export const PROJECTS = [
  {
    label: 'Instalacja elektryczna — dom jednorodzinny',
    location: 'Krakow, Bronowice',
    alt: 'Instalacja elektryczna w domu jednorodzinnym w Krakowie',
  },
  {
    label: 'Fotowoltaika 8kWp',
    location: 'Krakow, Krowodrza',
    alt: 'Instalacja fotowoltaiczna 8kWp w Krakowie',
  },
  {
    label: 'Powietrzna pompa ciepla',
    location: 'Wieliczka',
    alt: 'Montaz powietrznej pompy ciepla w Wieliczce',
  },
  {
    label: 'Serwis AGD',
    location: 'Krakow, Stare Miasto',
    alt: 'Serwis sprzetu AGD w centrum Krakowa',
  },
  {
    label: 'Rozdzielnica elektryczna',
    location: 'budynek komercyjny, Krakow',
    alt: 'Rozdzielnica elektryczna w budynku komercyjnym w Krakowie',
  },
  {
    label: 'Pompa ciepla powietrze-woda',
    location: 'Krakow, Nowa Huta',
    alt: 'Instalacja pompy ciepla powietrze-woda w Krakowie',
  },
] as const

export const TRUST_BADGES = [
  { text: 'Ponad 10 lat doswiadczenia' },
  { text: 'Szybka realizacja' },
  { text: 'Gwarancja jakosci' },
] as const

export const CONTACT_META = [
  { label: 'Dostepny: Pn-Sb 7:00-20:00', icon: 'Clock' },
  { label: 'Obszar: Krakow i okolice',    icon: 'MapPin' },
  { label: 'Czas reakcji: do 24h',        icon: 'Zap' },
] as const