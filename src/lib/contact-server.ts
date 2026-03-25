import { createServerFn } from '@tanstack/react-start'
import { contactSchema } from '#/lib/contact-schema'

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW = 5 * 60 * 1000 // 5 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = rateLimitMap.get(ip) || []
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW)
  rateLimitMap.set(ip, recent)
  if (recent.length >= RATE_LIMIT_MAX) return true
  recent.push(now)
  rateLimitMap.set(ip, recent)
  return false
}

// Normalize subject to PT for spreadsheet consistency
const subjectMap: Record<string, string> = {
  Proposal: 'Proposta',
  Consulting: 'Consultoria',
  Other: 'Outro',
}

export const submitContact = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => {
    const result = contactSchema.safeParse(data)
    if (!result.success) {
      throw new Error('validation')
    }
    return result.data
  })
  .handler(async ({ data }) => {
    const ip = 'server'
    if (isRateLimited(ip)) {
      return { success: false as const, error: 'rate_limit' }
    }

    const { name, email, subject, message, locale } = data
    const normalizedSubject = subjectMap[subject] || subject
    const timestamp = new Date().toISOString()
    const row = [timestamp, name, email, normalizedSubject, message, locale || 'pt']

    // Google Sheets integration
    const serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    const privateKey = process.env.GOOGLE_PRIVATE_KEY
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID

    if (serviceEmail && privateKey && spreadsheetId) {
      try {
        const { google } = await import('googleapis')
        const auth = new google.auth.JWT(
          serviceEmail,
          undefined,
          privateKey.replace(/\\n/g, '\n'),
          ['https://www.googleapis.com/auth/spreadsheets'],
        )
        const sheets = google.sheets({ version: 'v4', auth })
        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: 'Sheet1!A:F',
          valueInputOption: 'USER_ENTERED',
          requestBody: { values: [row] },
        })
      } catch (err) {
        console.error('[Contact] Google Sheets error:', err)
        return { success: false as const, error: 'server_error' }
      }
    } else {
      console.log('[Contact] Google Sheets not configured. Form data:', row)
    }

    return { success: true as const }
  })
