// Education.jsx
// Education history and additional info

export default function Education({ education, additional }) {
  return (
    <section className="section" id="education">
      <div className="section-inner">
        <div className="section-label">Education</div>

        {education.map((edu, i) => (
          <div key={i} className={`edu-item reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}>
            <div className="edu-date">{edu.end}</div>
            <div>
              <div className="edu-degree">{edu.degree}</div>
              <div className="edu-school">{edu.school} · {edu.detail}</div>
              {edu.courses && (
                <div className="edu-courses">{edu.courses}</div>
              )}
            </div>
          </div>
        ))}

        <div style={{ marginTop: '2.5rem' }}>
          <div className="section-label">Additional</div>
          <div className="additional-grid">
            {additional.map((item, i) => (
              <div key={i} className={`additional-item reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}>
                <div className="additional-dot"></div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}