// Skills.jsx
// Skills grid with tag cards per category

export default function Skills({ skills }) {
  return (
    <section className="section section-alt" id="skills">
      <div className="section-inner">
        <div className="section-label">Skills &amp; Expertise</div>
        <div className="skills-tag-grid">
          {skills.map((group, i) => (
            <div key={group.category} className={`skill-tag-card reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}>
              <div className="skill-tag-label">{group.category}</div>
              <div className="skill-tags">
                {group.items.map((item) => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}