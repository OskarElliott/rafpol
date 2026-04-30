import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const SERVICE_LABELS: Record<string, string> = {
  elektryczne: 'Instalacje Elektryczne',
  foto: 'Fotowoltaika',
  energia: 'Magazyny Energii',
  pompa: 'Pompy Ciepła',
  sanitarne: 'Instalacje Sanitarne',
  wezly: 'Węzły Ciepła i Chłodu',
  kotlownie: 'Kotłownie Gazowe',
}

function validatePhone(value: string) {
  const stripped = value.replace(/[\s-]/g, '')
  return /^(\+48)?[0-9]{9}$/.test(stripped)
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Nieprawidłowe dane.' }, { status: 400 })
  }

  const { name, phone, service, message } = body as Record<string, string>

  if (!name?.trim()) {
    return NextResponse.json({ error: 'Imię i nazwisko jest wymagane.' }, { status: 400 })
  }
  if (!phone?.trim() || !validatePhone(phone)) {
    return NextResponse.json({ error: 'Podaj prawidłowy numer telefonu.' }, { status: 400 })
  }
  if (!service || !SERVICE_LABELS[service]) {
    return NextResponse.json({ error: 'Wybierz rodzaj usługi.' }, { status: 400 })
  }

  const serviceLabel = SERVICE_LABELS[service]

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a2744; border-bottom: 3px solid #f59e0b; padding-bottom: 8px;">
        Nowe zapytanie — Rafpol Elektric
      </h2>

      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr style="background: #f3f4f6;">
          <td style="padding: 12px 16px; font-weight: bold; width: 160px; color: #374151;">Imię i Nazwisko</td>
          <td style="padding: 12px 16px; color: #111827;">${name.trim()}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-weight: bold; color: #374151;">Numer telefonu</td>
          <td style="padding: 12px 16px; font-size: 20px; font-weight: bold; color: #f59e0b;">${phone.trim()}</td>
        </tr>
        <tr style="background: #f3f4f6;">
          <td style="padding: 12px 16px; font-weight: bold; color: #374151;">Rodzaj usługi</td>
          <td style="padding: 12px 16px; color: #111827;">${serviceLabel}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-weight: bold; color: #374151; vertical-align: top;">Wiadomość</td>
          <td style="padding: 12px 16px; color: #111827; white-space: pre-wrap;">${message?.trim() || '—'}</td>
        </tr>
      </table>

      <p style="margin-top: 24px; font-size: 13px; color: #6b7280;">
        Wiadomość wysłana przez formularz kontaktowy na rafpolelektric.pl
      </p>
    </div>
  `

  const { error } = await resend.emails.send({
    from: 'Rafpol Elektric <kontakt@rafpolelektric.pl>',
    to: 'rafpolelektric@gmail.com',
    subject: 'Nowe zapytanie - Rafpol Elektric',
    html,
    replyTo: undefined,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Nie udało się wysłać wiadomości. Spróbuj ponownie.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
