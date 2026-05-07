import { useEffect } from 'react'

export default function useScrollReveal() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.reveal')

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top >= window.innerHeight) {
          el.style.opacity = '0'
          el.style.transform = 'translateY(24px)'
          el.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
        }
      })

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1'
              entry.target.style.transform = 'translateY(0)'
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.05 }
      )

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top >= window.innerHeight) {
          observer.observe(el)
        }
      })

    }, 200)

    return () => clearTimeout(timer)
  }, [])
}