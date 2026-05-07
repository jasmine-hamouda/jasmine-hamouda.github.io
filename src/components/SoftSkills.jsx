// SoftSkills.jsx
// Genos EI score card and soft skills grid

export default function SoftSkills({ softSkills }) {
  return (
    <section className="section section-alt" id="softskills">
      <div className="section-inner">
        <div className="section-label">Emotional Intelligence &amp; Soft Skills</div>

        <div className="genos-card reveal">
          <div className="genos-left">
            <div className="genos-score-wrap">
              <svg className="genos-ring" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(139,167,204,0.15)" strokeWidth="10"/>
                <circle cx="60" cy="60" r="52" fill="none" stroke="url(#genos-grad)" strokeWidth="10"
                  strokeDasharray="326.7" strokeDashoffset="9.8"
                  strokeLinecap="round" transform="rotate(-90 60 60)"/>
                <defs>
                  <linearGradient id="genos-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2D4A6E"/>
                    <stop offset="100%" stopColor="#8BA7CC"/>
                  </linearGradient>
                </defs>
              </svg>
              <div className="genos-score-inner">
                <div className="genos-score-num">97</div>
                <div className="genos-score-denom">/99</div>
              </div>
            </div>
            <div className="genos-percentile">Top 3% globally</div>
          </div>
          <div className="genos-right">
            <div className="genos-title">Genos Emotional Intelligence Assessment</div>
            <p className="genos-desc">The Genos EI Assessment is a peer-reviewed, psychometrically validated instrument used by leading organisations worldwide. Scoring 97/99 places me in the top 3% of all respondents globally — reflecting an exceptional ability to recognise, understand, and purposefully apply emotions in professional contexts.</p>
            <div className="genos-competencies">
              {['Self-awareness', 'Awareness of others', 'Authenticity', 'Emotional reasoning', 'Self-management', 'Inspiring performance'].map((comp) => (
                <span key={comp} className="genos-comp">{comp}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="soft-skills-grid">
          {softSkills.map((skill, i) => (
            <div key={i} className={`soft-card reveal${i % 3 > 0 ? ` reveal-delay-${i % 3}` : ''}`}>
              <div className="soft-name">{skill.name}</div>
              <div className="soft-desc">{skill.desc}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}