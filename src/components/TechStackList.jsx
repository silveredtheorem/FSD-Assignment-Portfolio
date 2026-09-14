// grandchild in the prop-drilling chain: Projects (page) -> ProjectCard -> TechStackList.
// ProjectCard never reads the tags itself, it just forwards project.techStack down a level.
export default function TechStackList({ techStack }) {
  if (!techStack?.length) return null;

  return (
    <ul className="tech-tags" role="list" aria-label="technologies used">
      {techStack.map((tech) => (
        <li key={tech} className="tech-tags__item">
          {tech}
        </li>
      ))}
    </ul>
  );
}
