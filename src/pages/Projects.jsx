import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { fetchProjects } from "../lib/api";
import "../components/ProjectCard.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchProjects()
      .then((data) => {
        if (!cancelled) setProjects(data);
      })
      .catch(() => {
        if (!cancelled) setError("couldn't reach the server to load projects. is the API running?");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="section" aria-labelledby="projects-heading">
      <div className="container">
        <h2 id="projects-heading" className="section__heading">
          projects
        </h2>
        <p className="section__subheading">
          a mix of shipped side projects and one research internship. click into any card for the full write-up.
        </p>

        {loading && <p role="status">loading projects…</p>}
        {error && <p role="alert">{error}</p>}

        {!loading && !error && (
          <div className="projects__grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
