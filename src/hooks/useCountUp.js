// useCountUp.js
// Animates a number counting up from 0 when it enters the viewport

import { useEffect, useRef, useState } from 'react'

export default function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true

            // Extract numeric value from target (handles "50+", "97/99", "1 wk")
            const numeric = parseFloat(target.replace(/[^0-9.]/g, ''))
            if (isNaN(numeric)) return

            const startTime = performance.now()

            const tick = (now) => {
              const elapsed = now - startTime
              const progress = Math.min(elapsed / duration, 1)
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3)
              const current = Math.floor(eased * numeric)
              setCount(current)

              if (progress < 1) {
                requestAnimationFrame(tick)
              } else {
                setCount(numeric)
              }
            }

            requestAnimationFrame(tick)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}