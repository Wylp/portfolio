import { useEffect, useRef } from 'react'

export function useFadeIn<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1'
      el.style.transform = 'none'
      return
    }

    function update() {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Progress: 0 when element bottom enters viewport, 1 when element is 30% visible
      const start = windowHeight
      const end = windowHeight * 0.45
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)))

      el.style.opacity = String(progress)
      el.style.transform = `translateY(${30 * (1 - progress)}px)`
    }

    window.addEventListener('scroll', update, { passive: true })
    update() // initial check

    return () => window.removeEventListener('scroll', update)
  }, [])

  return ref
}
