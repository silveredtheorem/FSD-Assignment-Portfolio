import Skills from "../components/Skills";
import "./About.css";

export default function About() {
  return (
    <>
      <section className="section" aria-labelledby="about-heading">
        <div className="container">
          <h2 id="about-heading" className="section__heading">
            about me
          </h2>
          <div className="about__grid">
            <div className="about__text">
              <p>
                i'm a first-year B.Tech student in Computer Science at{" "}
                <strong>National Institute of Technology, Warangal</strong> (CGPA: 9.44), with a minor in Applied
                and Computational Mathematics.
              </p>
              <p>
                most of my time goes into full-stack web development, distributed systems design, and occasionally
                reinforcement learning research. i interned at <strong>Base</strong> as an SDE intern where i shipped
                production React/TypeScript pages, built an agentic AI citation-retrieval pipeline, and instrumented
                analytics across the codebase. i'm also an incoming SDE intern at{" "}
                <strong>AQR Capital Management</strong> for summer 2027.
              </p>
              <p>
                outside of code i'm an executive member of the software development club's coding wing and part of
                the music club at college. i've also solved <strong>500+ DSA problems</strong> across LeetCode,
                HackerRank, GeeksforGeeks, and Codeforces.
              </p>
              <p>
                i was awarded the <strong>Merit-cum-Means Certificate</strong> by the Department of Computer Science
                — given to the top 3 students based on relative academic performance within the batch.
              </p>
            </div>

            <aside className="about__card" aria-label="quick facts about sharan deepak">
              <h3 className="about__card-heading">at a glance</h3>
              <dl className="about__dl">
                <dt>degree</dt>
                <dd>B.Tech CSE</dd>
                <dt>institute</dt>
                <dd>NIT Warangal</dd>
                <dt>cgpa</dt>
                <dd>9.44 / 10</dd>
                <dt>minor</dt>
                <dd>Applied &amp; Computational Mathematics</dd>
                <dt>batch</dt>
                <dd>2024 – 2028</dd>
                <dt>location</dt>
                <dd>Warangal, India</dd>
                <dt>next up</dt>
                <dd>SDE @ AQR Capital, summer 2027</dd>
              </dl>
              <div className="about__links">
                <a href="https://github.com/silveredtheorem" target="_blank" rel="noopener noreferrer" className="about__link">
                  github ↗
                </a>
                <a href="https://linkedin.com/in/sharan-deepak" target="_blank" rel="noopener noreferrer" className="about__link">
                  linkedin ↗
                </a>
                <a href="mailto:silvered.theorem@gmail.com" className="about__link">
                  email ↗
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="skills-heading">
        <div className="container">
          <h2 id="skills-heading" className="section__heading">
            skills
          </h2>
          <Skills />
        </div>
      </section>
    </>
  );
}
