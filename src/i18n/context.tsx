import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import pt from './pt.json'
import en from './en.json'

type Locale = 'pt' | 'en'
type Translations = typeof pt

const translations: Record<Locale, Translations> = { pt, en }

interface I18nContextType {
  locale: Locale
  t: Translations
  toggleLocale: () => void
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'pt'
    return (localStorage.getItem('locale') as Locale) || 'pt'
  })

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === 'pt' ? 'en' : 'pt'
      localStorage.setItem('locale', next)
      document.documentElement.lang = next === 'pt' ? 'pt-BR' : 'en'
      return next
    })
  }, [])

  return (
    <I18nContext.Provider value={{ locale, t: translations[locale], toggleLocale }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within I18nProvider')
  return context
}
