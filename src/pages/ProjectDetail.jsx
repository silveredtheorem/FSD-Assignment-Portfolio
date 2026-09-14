import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TechStackList from "../components/TechStackList";
import { fetchProject } from "../lib/api";
import "./ProjectDetail.css";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);
    setProject(null);

    fetchProject(projectId)
      .then((data) => {
        if (!cancelled) setProject(data);
      })
      .catch(() => {
        if (!cancelled) setError("couldn't reach the server to load this project. is the API running?");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [projectId]);

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <p role="status">loading project…</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <div className="container project-not-found">
          <h2 className="section__heading">something went wrong</h2>
          <p role="alert">{error}</p>
          <Link to="/projects" className="btn btn--secondary">
            ← back to projects
          </Link>
        </div>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="section">
        <div className="container project-not-found">
          <h2 className="section__heading">can't find that one</h2>
          <p>no project matches "{projectId}". it might have been renamed or never existed.</p>
          <Link to="/projects" className="btn btn--secondary">
            ← back to projects
          </Link>
        </div>
      </section>
    );
  }

  const { title, year, description, highlights, techStack, links, note, image } = project;

  return (
    <section className="section" aria-labelledby="detail-heading">
      <div className="container project-detail">
        <Link to="/projects" className="project-detail__back">
          ← all projects
        </Link>

        <img className="project-detail__banner" src={image} alt="" />

        <header className="project-detail__header">
          <h2 id="detail-heading" className="section__heading project-detail__title">
            {title}
          </h2>
          <time className="project-card__year">{year}</time>
        </header>

        <p className="project-detail__description">{description}</p>

        <h3 className="project-detail__subheading">highlights</h3>
        <ul className="project-card__highlights" aria-label="key highlights">
          {highlights.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <h3 className="project-detail__subheading">stack</h3>
        <TechStackList techStack={techStack} />

        <div className="project-detail__links">
          {links?.demo && (
            <a href={links.demo} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
              live demo
            </a>
          )}
          {links?.github && (
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              github
            </a>
          )}
          {note && <p className="project-card__note">{note}</p>}
        </div>
      </div>
    </section>
  );
}
