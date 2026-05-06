import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const TARGET_EMAIL = 'rafpolelektric@gmail.com'

const SERVICE_LABELS: Record<string, string> = {
  elektryczne: 'Instalacje Elektryczne',
  foto: 'Fotowoltaika',
  energia: 'Magazyny Energii',
  pompa: 'Pompy Ciepła',
  sanitarne: 'Instalacje Sanitarne',
  wezly: 'Węzły Ciepła i Chłodu',
  kotlownie: 'Kotłownie Gazowe',
  wentylacja: 'Wentylacja i Klimatyzacja',
}

function validatePhone(value: string) {
  const stripped = value.replace(/[\s-]/g, '')
  return /^(\+48)?[0-9]{9}$/.test(stripped)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, service, message } = body

    // Server-side validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Imię i nazwisko jest wymagane.' }, { status: 400 })
    }
    if (!phone || typeof phone !== 'string' || !validatePhone(phone)) {
      return NextResponse.json({ error: 'Podaj prawidłowy numer telefonu.' }, { status: 400 })
    }
    if (!service || typeof service !== 'string') {
      return NextResponse.json({ error: 'Wybierz rodzaj usługi.' }, { status: 400 })
    }

    const serviceLabel = SERVICE_LABELS[service] ?? service
    const messageText = (message && typeof message === 'string') ? message.trim() : ''

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #0F172A; color: white; padding: 24px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0; font-size: 20px;">Nowe zapytanie ze strony</h2>
          <p style="margin: 4px 0 0 0; color: #F59E0B; font-size: 14px;">rafpolelektric.pl</p>
        </div>
        <div style="background-color: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1e293b; width: 140px;">Imię i Nazwisko:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1e293b;">Telefon:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                <a href="tel:${escapeHtml(phone)}" style="color: #D97706; font-weight: bold; font-size: 18px; text-decoration: none;">${escapeHtml(phone)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1e293b;">Rodzaj usługi:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${escapeHtml(serviceLabel)}</td>
            </tr>
            ${messageText ? `
            <tr>
              <td style="padding: 12px 0; font-weight: bold; color: #1e293b; vertical-align: top;">Wiadomość:</td>
              <td style="padding: 12px 0; color: #1e293b; white-space: pre-wrap;">${escapeHtml(messageText)}</td>
            </tr>
            ` : ''}
          </table>
        </div>
      </div>
    `

    const text = `
NOWE ZAPYTANIE - RAFPOL ELEKTRIC

Imię i Nazwisko: ${name}
Telefon: ${phone}
Rodzaj usługi: ${serviceLabel}
${messageText ? `\nWiadomość:\n${messageText}` : ''}
    `.trim()

    const { data, error } = await resend.emails.send({
      from: 'Rafpol Elektric <onboarding@resend.dev>',
      to: [TARGET_EMAIL],
      replyTo: phone.includes('@') ? phone : undefined,
      subject: `Nowe zapytanie - ${serviceLabel} - ${name}`,
      html,
      text,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Błąd wysyłki. Proszę spróbować ponownie.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Błąd serwera. Proszę spróbować ponownie.' }, { status: 500 })
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}