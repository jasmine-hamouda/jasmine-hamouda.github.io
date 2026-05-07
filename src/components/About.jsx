// About.jsx
import { useEffect, useRef, useState } from 'react'

function StatCard({ stat }) {
  const [display, setDisplay] = useState(stat.num)
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

            const numeric = parseFloat(stat.num)
            if (isNaN(numeric)) return

            // Preserve everything after the leading number e.g. "+", " wk", "/99"
            const suffix = stat.num.replace(/^\d+(\.\d+)?/, '')
            const duration = 1500
            const startTime = performance.now()

            const tick = (now) => {
              const elapsed = now - startTime
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              const current = Math.floor(eased * numeric)
              setDisplay(`${current}${suffix}`)
              if (progress < 1) {
                requestAnimationFrame(tick)
              } else {
                setDisplay(stat.num)
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
  }, [stat.num])

  return (
    <div ref={ref} className="stat-card reveal">
      <div className="stat-num">{display}</div>
      <div className="stat-desc">{stat.desc}</div>
    </div>
  )
}

const techStack = [
  { name: 'Python', svg: <svg viewBox="0 0 28 28" fill="none"><path d="M14 3C8.477 3 9 5.5 9 5.5V8h5v1H6.5S2 8.5 2 15s4.024 6.5 4.024 6.5H8v-3.1S7.8 15 10 15h8s2 .1 2-2V7s.3-4-6-4z" fill="#3776AB"/><path d="M14 27c5.523 0 5-2.5 5-2.5V22h-5v-1h7.5S26 21.5 26 15s-4.024-6.5-4.024-6.5H20v3.1s.2 3.4-2 3.4h-8s-2-.1-2 2v6s-.3 4 6 4z" fill="#FFD43B"/><circle cx="11" cy="6.5" r="1" fill="white"/><circle cx="17" cy="23.5" r="1" fill="white"/></svg> },
  { name: 'SQL', svg: <svg viewBox="0 0 28 28" fill="none"><ellipse cx="14" cy="9" rx="10" ry="4" fill="#00758F"/><path d="M4 9v5c0 2.21 4.477 4 10 4s10-1.79 10-4V9" fill="#00758F"/><path d="M4 14v6c0 2.21 4.477 4 10 4s10-1.79 10-4v-6" fill="#F29111" opacity=".85"/></svg> },
  { name: 'MongoDB', svg: <svg viewBox="0 0 28 28" fill="none"><path d="M14 3c0 0-7 8.5-7 13a7 7 0 0 0 14 0C21 11.5 14 3 14 3z" fill="#4DB33D"/><rect x="13" y="19" width="2" height="6" rx="1" fill="#3FA037"/><path d="M14 3c0 0 7 8.5 7 13a7 7 0 0 1-7 7" fill="#3FA037"/></svg> },
  { name: 'R Studio', svg: <svg viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="11" fill="#276DC3"/><text x="7" y="20" fontFamily="Georgia,serif" fontWeight="bold" fontSize="15" fill="white">R</text></svg> },
  { name: 'Excel', svg: <svg viewBox="0 0 28 28" fill="none"><rect x="3" y="3" width="22" height="22" rx="3" fill="#217346"/><path d="M8 9l4 5.5-4 5.5M16 20h5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { name: 'SharePoint', svg: <svg viewBox="0 0 28 28" fill="none"><rect x="3" y="3" width="22" height="22" rx="3" fill="#0078D4"/><text x="6" y="19" fontFamily="sans-serif" fontWeight="bold" fontSize="10" fill="white">SP</text></svg> },
  { name: 'Xero', svg: <svg viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="11" fill="#13B5EA"/><text x="5" y="19" fontFamily="sans-serif" fontWeight="bold" fontSize="12" fill="white">Xe</text></svg> },
  { name: 'GitHub', svg: <svg viewBox="0 0 28 28" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M14 2a12 12 0 0 0-3.794 23.386c.6.111.819-.26.819-.577v-2.165c-3.338.726-4.042-1.609-4.042-1.609-.546-1.386-1.332-1.755-1.332-1.755-1.089-.744.082-.729.082-.729 1.205.085 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.495.998.107-.776.418-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.235-3.221-.123-.304-.535-1.527.117-3.182 0 0 1.008-.322 3.301 1.23A11.49 11.49 0 0 1 14 6.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.655.242 2.878.12 3.182.77.84 1.233 1.911 1.233 3.221 0 4.61-2.807 5.624-5.48 5.921.43.372.823 1.103.823 2.222v3.293c0 .32.218.694.825.576A12 12 0 0 0 14 2z" fill="currentColor"/></svg> },
]

export default function About({ data }) {
  return (
    <section className="section" id="about">
      <div className="section-inner">
        <div className="section-label">About</div>
        <div className="about-top">
          <p className="about-text reveal">{data.about}</p>
          <div className="about-stats">
            {data.stats.map((stat, i) => (
              <StatCard key={i} stat={stat} />
            ))}
          </div>
        </div>
        <div className="tech-stack-section reveal">
          <div className="tech-stack-label">Technologies &amp; Tools</div>
          <div className="tech-logos">
            {techStack.map((tech) => (
              <div key={tech.name} className="tech-logo">
                {tech.svg}
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}