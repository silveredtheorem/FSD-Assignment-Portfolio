// single source of truth for both GET /api/projects and GET /api/projects/:id.
// `image` is a path served statically by this same server (see app.js) —
// the route handlers turn it into an absolute URL before sending it out.
const projects = [
  {
    id: "melody-lab",
    title: "melody lab",
    year: "2026",
    featured: true,
    tagline:
      "full-stack git-based version control system for collaborative music production. think git, but for DAWs.",
    description:
      "melody lab lets multiple producers work on the same track without emailing .wav files back and forth. " +
      "every edit is a commit against a DAG stored in Postgres, so you get real branching, real history, and real " +
      "merges instead of a folder full of 'final_v3_ACTUALLY_final' files.",
    highlights: [
      "DAG-based version control engine on Postgres with self-referencing commit trees, recursive CTE history traversal, and LCA-based three-way merge conflict detection",
      "real-time multi-user collaboration via Socket.io with a Redis pub/sub adapter for horizontal scaling",
      "async AI layer generation via a BullMQ worker queue; distributed API + worker services deployed on Railway",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "Redis", "Socket.io", "BullMQ", "Zustand", "Zod"],
    links: {
      demo: "https://melodylab.vercel.app",
      github: "https://github.com/silveredtheorem",
    },
    link: "https://melodylab.vercel.app",
    image: "/images/melody-lab.svg",
  },
  {
    id: "whale-sentry",
    title: "whale sentry",
    year: "2025",
    featured: false,
    tagline:
      "real-time anomaly detection system for live cryptocurrency market data across 30+ Binance markets.",
    description:
      "whale sentry watches order book activity across thirty-plus Binance markets and flags statistically " +
      "unusual moves — the kind that usually mean a large holder just woke up — before they show up on a " +
      "candlestick chart.",
    highlights: [
      "real-time detection pipeline computing per-symbol rolling z-scores with O(1) incremental updates; streaming alerts in under 100ms via Socket.io",
      "61 Jest unit tests achieving 98% statement coverage across detection, order book, and statistics modules",
      "SQLite persistence for historical replay",
    ],
    techStack: ["React", "Node.js", "Express", "Socket.io", "SQLite", "Jest"],
    links: {
      github: "https://github.com/silveredtheorem",
    },
    link: "https://github.com/silveredtheorem",
    image: "/images/whale-sentry.svg",
  },
  {
    id: "sybil-detection-vanets",
    title: "label-free sybil detection in VANETs",
    year: "2025–26",
    featured: false,
    tagline:
      "research: a reinforcement learning agent for real-time sybil attack detection in vehicular ad-hoc networks — without ground-truth labels.",
    description:
      "sybil attacks let one malicious node fake dozens of phantom vehicles on a VANET, which is a problem for " +
      "anything that trusts majority-vote traffic data. labelled attack data is expensive to get, so this project " +
      "trains an RL agent against a physics-based oracle instead of hand-labelled examples.",
    highlights: [
      "Advantage Actor-Critic (A2C) agent evaluated on the VeReMi Extension dataset",
      "physics-based oracle generating reward signals via dead-reckoning standard deviation — no labels required",
      "mean ROC-AUC of 0.9960 ± 0.0003 across 5 random seeds",
    ],
    techStack: ["Python", "Reinforcement Learning", "A2C", "VeReMi Dataset"],
    links: {},
    note: "research internship under prof. sarath babu, nit warangal",
    image: "/images/sybil-vanet.svg",
  },
];

module.exports = projects;
