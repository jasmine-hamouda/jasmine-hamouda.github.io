// Nav.jsx
// Sticky navigation bar with dark mode toggle and active link tracking

import { useState, useEffect } from 'react'

const links = ['about', 'skills', 'experience', 'projects', 'education', 'softskills', 'contact']

export default function Nav({ name }) {
  const [active, setActive] = useState('')
  const [dark, setDark] = useState(false)

  // Track which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    links.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Dark mode — default light, persists in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      setDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

    return (
    <nav>
      <a href="#hero" className="nav-name">{name}</a>
      <div className="nav-right">
        <ul className="nav-links">
          {links.map((id) => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? 'active' : ''}>
                {id === 'softskills' ? 'EI & Soft Skills' : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="dark-toggle"
          onClick={toggleDark}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {dark ? 'Light' : 'Dark'}
        </button>
      </div>
    </nav>
  )
}