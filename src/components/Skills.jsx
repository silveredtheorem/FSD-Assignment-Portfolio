import "./Skills.css";

const skillGroups = [
  { heading: "languages", items: ["JavaScript / TypeScript", "Python", "C++", "Java", "HTML / CSS"] },
  { heading: "frameworks", items: ["React", "Express.js", "Socket.IO", "Zod", "Prisma ORM"] },
  { heading: "databases & cloud", items: ["PostgreSQL", "MySQL", "Redis", "SQLite", "AWS"] },
  { heading: "tooling", items: ["Git / GitHub Actions", "Docker", "BullMQ", "Postman", "AWS Smithy"] },
];

export default function Skills() {
  return (
    <div className="skills__grid">
      {skillGroups.map((group) => (
        <div className="skill-group" key={group.heading}>
          <h3 className="skill-group__heading">{group.heading}</h3>
          <ul className="skill-list" role="list">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
