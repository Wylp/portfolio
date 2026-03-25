import { createFileRoute } from '@tanstack/react-router'
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

export const Route = createFileRoute('/api/contact')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          // Rate limiting
          const ip =
            request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown'
          if (isRateLimited(ip)) {
            return Response.json(
              { success: false, error: 'rate_limit' },
              { status: 429 },
            )
          }

          // Parse and validate
          const body = await request.json()
          const result = contactSchema.safeParse(body)
          if (!result.success) {
            return Response.json(
              {
                success: false,
                error: 'validation',
                details: result.error.flatten(),
              },
              { status: 400 },
            )
          }

          const { name, email, subject, message, locale } = result.data
          const normalizedSubject = subjectMap[subject] || subject
          const timestamp = new Date().toISOString()
          const row = [
            timestamp,
            name,
            email,
            normalizedSubject,
            message,
            locale || 'pt',
          ]

          // Google Sheets integration
          const serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
          const privateKey = process.env.GOOGLE_PRIVATE_KEY
          const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID

          if (serviceEmail && privateKey && spreadsheetId) {
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
          } else {
            console.log(
              '[Contact] Google Sheets not configured. Form data:',
              row,
            )
          }

          return Response.json({ success: true })
        } catch (error) {
          console.error('[Contact] Error:', error)
          return Response.json(
            { success: false, error: 'server_error' },
            { status: 500 },
          )
        }
      },
    },
  },
})
