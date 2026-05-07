// Projects.jsx
// Project cards grid

export default function Projects({ projects }) {
  return (
    <section className="section section-alt" id="projects">
      <div className="section-inner">
        <div className="section-label">Projects</div>
        <div className="projects-grid">
          {projects.map((project, i) => (
            <div key={i} className={`project-card reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}>
              {project.badge && (
                <div className="project-badge">{project.badge}</div>
              )}
              <div className="project-name">{project.name}</div>
              <div className="project-meta">{project.org} · {project.year}</div>
              <div className="project-desc">{project.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}