import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProjects } from "../lib/api";
import "./Home.css";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchProjects()
      .then((projects) => {
        if (cancelled) return;
        setFeatured(projects.find((p) => p.featured) ?? projects[0] ?? null);
      })
      .catch(() => {
        if (!cancelled) setFeatured(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="loading-screen" role="status" aria-live="polite">
        <p className="loading-screen__text">loading portfolio…</p>
      </div>
    );
  }

  return (
    <>
      <section className="section hero" aria-labelledby="hero-heading">
        <div className="container">
          <div className="hero__content">
            <p className="hero__eyebrow">hey, i'm</p>
            <h1 id="hero-heading" className="hero__name">
              sharan deepak
            </h1>
            <p className="hero__tagline">
              software engineer &middot; computer science @ nit warangal &middot; musician &middot; incoming sde
              intern @ aqr capital
            </p>
            <div className="hero__cta">
              <Link to="/projects" className="btn btn--primary">
                view my work
              </Link>
              <Link to="/contact" className="btn btn--secondary">
                get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="teaser-heading">
        <div className="container">
          <h2 id="teaser-heading" className="section__heading">
            currently building
          </h2>
          {featured ? (
            <div className="home-teaser">
              <img className="home-teaser__banner" src={featured.image} alt="" />
              <div>
                <h3 className="home-teaser__title">{featured.title}</h3>
                <p className="home-teaser__desc">{featured.tagline}</p>
                <Link to={`/projects/${featured.id}`} className="btn btn--sm btn--secondary">
                  read the case study →
                </Link>
              </div>
            </div>
          ) : (
            <p role="alert">couldn't load the featured project — the API may be unreachable.</p>
          )}
        </div>
      </section>
    </>
  );
}
