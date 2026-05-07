// Experience.jsx
// Work history as a visual vertical timeline

export default function Experience({ experience }) {
  return (
    <section className="section" id="experience">
      <div className="section-inner">
        <div className="section-label">Work Experience</div>
        <div className="timeline">
          {experience.map((job, i) => (
            <div key={i} className="timeline-item reveal">
              <div className="timeline-dot"></div>
              <div className="timeline-line"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <div>
                    <div className="job-title">{job.title}</div>
                    <div className="job-org">{job.org} · {job.location}</div>
                  </div>
                  <div className="job-date">{job.start} – {job.end}</div>
                </div>
                <ul className="job-bullets">
                  {job.bullets.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}