import { useState, useCallback } from 'react'
import { Mail, Github, Phone, Send, Linkedin } from 'lucide-react'
import { SectionLabel } from '#/components/SectionLabel'
import { useI18n } from '#/i18n/context'
import { contactSchema, contactErrors } from '#/lib/contact-schema'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  mail: Mail,
  linkedin: Linkedin,
  github: Github,
  phone: Phone,
  send: Send,
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function Contact() {
  const { locale, t } = useI18n()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateField = useCallback(
    (field: string, value: string) => {
      const partial = { [field]: value }
      const result = contactSchema.pick({ [field]: true } as any).safeParse(partial)
      if (!result.success) {
        setErrors((prev) => ({
          ...prev,
          [field]: contactErrors[locale as 'pt' | 'en'][field as keyof (typeof contactErrors)['pt']],
        }))
      } else {
        setErrors((prev) => {
          const next = { ...prev }
          delete next[field]
          return next
        })
      }
    },
    [locale],
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = { name, email, subject, message, locale }
    const result = contactSchema.safeParse(data)

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string
        fieldErrors[field] =
          contactErrors[locale as 'pt' | 'en'][field as keyof (typeof contactErrors)['pt']]
      }
      setErrors(fieldErrors)
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        if (res.status === 429) {
          setErrors({ form: t.contact.form.rate_limit })
        }
        throw new Error('Failed')
      }

      setStatus('success')
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
      setErrors({})
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-bg-primary border border-border rounded-md px-3 min-h-[44px] text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition'

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-bg-surface py-20">
      <div className="max-w-[900px] mx-auto px-6">
        <SectionLabel>{t.contact.label}</SectionLabel>
        <h2 id="contact-heading" className="text-[28px] font-bold tracking-[-0.5px] text-text-primary mb-3">
          {t.contact.headline}
        </h2>
        <p className="text-[14px] text-text-secondary mb-10">{t.contact.subtitle}</p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label htmlFor="contact-name" className="text-[12px] font-semibold text-text-secondary mb-1.5 block">
                {t.contact.form.name}
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => validateField('name', name)}
                placeholder={t.contact.form.name_placeholder}
                className={inputClass}
              />
              {errors.name && <p className="text-[12px] text-destructive mt-1">{errors.name}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="contact-email" className="text-[12px] font-semibold text-text-secondary mb-1.5 block">
                {t.contact.form.email}
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => validateField('email', email)}
                placeholder={t.contact.form.email_placeholder}
                className={inputClass}
              />
              {errors.email && <p className="text-[12px] text-destructive mt-1">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="contact-subject" className="text-[12px] font-semibold text-text-secondary mb-1.5 block">
                {t.contact.form.subject}
              </label>
              <select
                id="contact-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                onBlur={() => validateField('subject', subject)}
                className={inputClass}
              >
                <option value="" disabled />
                {(t.contact.form.subject_options as string[]).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.subject && (
                <p className="text-[12px] text-destructive mt-1">{errors.subject}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="contact-message" className="text-[12px] font-semibold text-text-secondary mb-1.5 block">
                {t.contact.form.message}
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onBlur={() => validateField('message', message)}
                placeholder={t.contact.form.message_placeholder}
                className={`${inputClass} min-h-[100px] resize-y py-2`}
              />
              {errors.message && (
                <p className="text-[12px] text-destructive mt-1">{errors.message}</p>
              )}
            </div>

            {status === 'success' && (
              <p className="text-[13px] text-success mb-3">{t.contact.form.success}</p>
            )}
            {status === 'error' && (
              <p className="text-[13px] text-destructive mb-3">
                {errors.form || t.contact.form.error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className={`w-full bg-text-primary text-white py-3 rounded-md text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 ${
                status === 'submitting' ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
              }`}
            >
              {status === 'submitting' ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  {t.contact.form.submitting}
                </span>
              ) : (
                t.contact.form.submit
              )}
            </button>

            <p className="text-[11px] text-text-muted mt-3">{t.contact.form.disclaimer}</p>
          </form>

          {/* Direct channels */}
          <div>
            <h3 className="text-[16px] font-semibold mb-4">{t.contact.channels_title}</h3>
            <div className="space-y-2">
              {(t.contact.channels as Array<{ name: string; handle: string; href: string; icon: string; color: string }>).map(
                (channel) => {
                  const Icon = iconMap[channel.icon]
                  const isGreen = channel.color === 'green'
                  return (
                    <a
                      key={channel.name}
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-bg-primary transition-colors focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isGreen ? 'bg-success-light' : 'bg-accent-light'
                        }`}
                      >
                        {Icon && (
                          <Icon
                            size={18}
                            className={isGreen ? 'text-success' : 'text-accent'}
                          />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-text-primary">{channel.name}</div>
                        <div className="text-xs text-text-muted">{channel.handle}</div>
                      </div>
                    </a>
                  )
                },
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
