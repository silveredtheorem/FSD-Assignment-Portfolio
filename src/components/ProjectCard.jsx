import { useState } from "react";
import { Link } from "react-router-dom";
import TechStackList from "./TechStackList";
import "./ProjectCard.css";

// every prop here comes straight from one entry in the GET /api/projects response — the
// Projects page maps over that array and spreads each object into a <ProjectCard>. nothing
// in this component is hardcoded, which is what makes it reusable across all three cards.
export default function ProjectCard({
  id,
  title,
  year,
  featured,
  tagline,
  highlights,
  techStack,
  links,
  note,
  image,
}) {
  // scoped to this exact card instance — expanding "melody lab" never touches "whale sentry"
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <article className={`project-card ${featured ? "project-card--featured" : ""}`} aria-label={`${title} project`}>
      <img className="project-card__banner" src={image} alt="" />

      <header className="project-card__header">
        <h3 className="project-card__title">{title}</h3>
        <time className="project-card__year">{year}</time>
      </header>

      <p className="project-card__desc">{tagline}</p>

      <TechStackList techStack={techStack} />

      <button
        type="button"
        className="project-card__details-toggle"
        onClick={() => setDetailsOpen((open) => !open)}
        aria-expanded={detailsOpen}
      >
        {detailsOpen ? "hide details −" : "view details +"}
      </button>

      {detailsOpen && (
        <ul className="project-card__highlights" aria-label="key highlights">
          {highlights.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}

      <footer className="project-card__links">
        {links?.demo && (
          <a href={links.demo} target="_blank" rel="noopener noreferrer" className="btn btn--sm btn--primary">
            live demo
          </a>
        )}
        {links?.github && (
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn btn--sm btn--ghost">
            github
          </a>
        )}
        <Link to={`/projects/${id}`} className="btn btn--sm btn--secondary">
          full case study →
        </Link>
        {note && <p className="project-card__note">{note}</p>}
      </footer>
    </article>
  );
}
