import { z } from 'zod'

// Accept both PT and EN subject values — normalized to PT on server for spreadsheet consistency
export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.enum([
    'Proposta',
    'Consultoria',
    'Outro',
    'Proposal',
    'Consulting',
    'Other',
  ]),
  message: z.string().min(10),
  locale: z.enum(['pt', 'en']).optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>

// Localized error messages — used by the Contact component, not the schema itself
export const contactErrors = {
  pt: {
    name: 'Nome é obrigatório (mín. 2 caracteres)',
    email: 'Email inválido',
    subject: 'Selecione um assunto',
    message: 'Mensagem muito curta (mín. 10 caracteres)',
  },
  en: {
    name: 'Name is required (min. 2 characters)',
    email: 'Invalid email',
    subject: 'Please select a subject',
    message: 'Message too short (min. 10 characters)',
  },
} as const
