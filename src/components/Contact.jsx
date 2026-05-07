// Contact.jsx
// Contact section with links and Formspree form

import { useState } from 'react'

export default function Contact({ data }) {
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        setStatus('success')
        e.target.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact">
      <div className="contact-inner">

        <div>
          <div className="contact-heading">Let's connect</div>
          <div className="contact-sub">
            Open to opportunities across IT, data, and HR-tech roles in Brisbane and remote.
          </div>
          <div className="contact-links" style={{ marginTop: '1rem' }}>
            <a href={`mailto:${data.email}`} className="contact-link">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m2 7 10 7 10-7"/>
              </svg>
              {data.email}
            </a>
            <a href={data.linkedin} className="contact-link" target="_blank" rel="noopener noreferrer">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="4"/>
                <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7"/>
              </svg>
              linkedin.com/in/jasminehamouda
            </a>
            <a href={data.github} className="contact-link" target="_blank" rel="noopener noreferrer">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>
              </svg>
              jasmine-hamouda.github.io
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="your@email.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="3" placeholder="What would you like to discuss?" required />
          </div>
          <button
            type="submit"
            className="btn-primary"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>
          {status === 'success' && (
            <p className="form-success" role="status">✓ Message sent! I'll be in touch soon.</p>
          )}
          {status === 'error' && (
            <p className="form-success" style={{ color: '#f87171' }} role="alert">Something went wrong — please try again.</p>
          )}
        </form>

      </div>
    </section>
  )
}