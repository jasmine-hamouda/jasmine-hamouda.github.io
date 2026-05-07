// Search.jsx
import { useEffect, useState } from 'react'

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
)

export default function Search({ resume }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const items = [
    ...resume.skills.flatMap(g =>
      g.items.map(item => ({ label: item, category: g.category, section: 'skills', href: '#skills' }))
    ),
    ...resume.experience.map(job => ({
      label: job.title, category: job.org, section: 'experience', href: '#experience'
    })),
    ...resume.projects.map(p => ({
      label: p.name, category: p.org, section: 'projects', href: '#projects'
    })),
    ...resume.education.map(e => ({
      label: e.degree, category: e.school, section: 'education', href: '#education'
    })),
  ]

  const results = query.length > 1
    ? items.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : []

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(o => !o)
        setQuery('')
      }
      if (e.key === 'Escape') {
        setOpen(false)
        setQuery('')
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const close = () => {
    setOpen(false)
    setQuery('')
  }

  if (!open) return null

  return (
    <div className="search-overlay" onClick={close}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-input-wrap">
          <SearchIcon />
          <input
            autoFocus
            type="text"
            placeholder="Search skills, experience, projects..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-close" onClick={close}>Esc</button>
        </div>
        {results.length > 0 && (
          <ul className="search-results">
            {results.map((item, i) => (
              <li key={i}>
                <a href={item.href} className="search-result" onClick={close}>
                  <span className="search-result-label">{item.label}</span>
                  <span className="search-result-category">{item.category} · {item.section}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
        {query.length > 1 && results.length === 0 && (
          <div className="search-empty">No results for "{query}"</div>
        )}
      </div>
    </div>
  )
}