// Hero.jsx
import { useEffect, useState } from 'react'

const roles = [
  '2nd Year Data Analytics & IoT Student - Griffith University',
  'Two years experience in Human Resources'
]

export default function Hero({ data, onCopyEmail }) {
  const [text, setText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIndex + 1))
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), 2000)
        } else {
          setCharIndex((c) => c + 1)
        }
      } else {
        setText(current.slice(0, charIndex - 1))
        if (charIndex - 1 === 0) {
          setDeleting(false)
          setRoleIndex((r) => (r + 1) % roles.length)
          setCharIndex(0)
        } else {
          setCharIndex((c) => c - 1)
        }
      }
    }, deleting ? 40 : 70)
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, roleIndex])

  const handleDownload = () => {
  const link = document.createElement('a')
  link.href = 'assets/Hamouda_Jasmine_Resume_2026.pdf'
  link.download = 'Hamouda_Jasmine_Resume_2026.pdf'
  link.click()
}

  return (
    <section id="hero">
      <div className="hero-dots" aria-hidden="true"></div>
      <div className="hero-inner">

        <div className="headshot-wrap">
          <div className="headshot">
            <img
              src="assets/images/photo.png"
              alt={data.name + ' — IT professional based in Brisbane'}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        <div className="hero-text">
          <h1>{data.name}</h1>
          <p className="hero-subtitle">
            {text}<span className="cursor">|</span>
          </p>
          <div className="hero-badges">
            {data.badges.map((badge) => (
              <span key={badge} className="badge">{badge}</span>
            ))}
          </div>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">Get in Touch</a>
            <a href="#experience" className="btn-secondary">View Experience</a>
            <button className="btn-secondary" onClick={onCopyEmail}>Copy Email</button>
            <button className="btn-secondary" onClick={handleDownload}>Download CV</button>
          </div>
        </div>

      </div>
    </section>
  )
}